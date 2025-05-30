
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Upload, X, Image as ImageIcon, ImageOff } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

interface MultiImageUploadProps {
  onImagesChange: (images: { frontCover: string; backCover: string; insidePages: string }) => void;
  currentImages?: { frontCover: string; backCover: string; insidePages: string };
  disabled?: boolean;
}

const MultiImageUpload = ({ onImagesChange, currentImages, disabled }: MultiImageUploadProps) => {
  const { user } = useAuth();
  const [images, setImages] = useState({
    frontCover: currentImages?.frontCover || '',
    backCover: currentImages?.backCover || '',
    insidePages: currentImages?.insidePages || ''
  });

  const [uploading, setUploading] = useState({
    frontCover: false,
    backCover: false,
    insidePages: false
  });

  const [imageErrors, setImageErrors] = useState<Set<string>>(new Set());

  const handleImageUpload = async (file: File, type: 'frontCover' | 'backCover' | 'insidePages') => {
    if (!file || !user) return;

    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image must be less than 5MB');
      return;
    }

    if (!file.type.startsWith('image/')) {
      toast.error('Please upload an image file');
      return;
    }

    setUploading(prev => ({ ...prev, [type]: true }));

    try {
      // Upload to Supabase Storage
      const fileExt = file.name.split('.').pop();
      const fileName = `${user.id}/${type}-${Date.now()}.${fileExt}`;
      
      const { data, error } = await supabase.storage
        .from('book-images')
        .upload(fileName, file);

      if (error) {
        throw error;
      }

      // Get the public URL
      const { data: { publicUrl } } = supabase.storage
        .from('book-images')
        .getPublicUrl(data.path);
      
      // Verify the image is accessible
      const img = new Image();
      img.onload = () => {
        const newImages = { ...images, [type]: publicUrl };
        setImages(newImages);
        onImagesChange(newImages);
        
        // Remove from error set if it was there
        setImageErrors(prev => {
          const newSet = new Set(prev);
          newSet.delete(publicUrl);
          return newSet;
        });
        
        toast.success(`${getTypeLabel(type)} uploaded successfully`);
      };
      img.onerror = () => {
        console.error('Failed to load uploaded image:', publicUrl);
        toast.error('Image upload failed - image not accessible');
        setImageErrors(prev => new Set(prev).add(publicUrl));
      };
      img.src = publicUrl;
      
    } catch (error) {
      console.error('Upload error:', error);
      toast.error('Failed to upload image');
    } finally {
      setUploading(prev => ({ ...prev, [type]: false }));
    }
  };

  const removeImage = async (type: 'frontCover' | 'backCover' | 'insidePages') => {
    const currentImageUrl = images[type];
    
    // If there's an image URL, try to delete it from storage
    if (currentImageUrl && currentImageUrl.includes('book-images')) {
      try {
        // Extract the file path from the URL
        const urlParts = currentImageUrl.split('/');
        const filePath = urlParts.slice(-2).join('/'); // Get user_id/filename
        
        await supabase.storage
          .from('book-images')
          .remove([filePath]);
      } catch (error) {
        console.error('Error deleting image from storage:', error);
      }
    }
    
    // Remove from error set
    setImageErrors(prev => {
      const newSet = new Set(prev);
      newSet.delete(currentImageUrl);
      return newSet;
    });
    
    const newImages = { ...images, [type]: '' };
    setImages(newImages);
    onImagesChange(newImages);
  };

  const handleImageError = (imageUrl: string) => {
    setImageErrors(prev => new Set(prev).add(imageUrl));
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'frontCover': return 'Front Cover';
      case 'backCover': return 'Back Cover';
      case 'insidePages': return 'Inside Pages';
      default: return 'Image';
    }
  };

  const renderImageUpload = (type: 'frontCover' | 'backCover' | 'insidePages', description: string) => (
    <div key={type} className="space-y-2">
      <Label className="text-sm font-medium">
        {getTypeLabel(type)} <span className="text-red-500">*</span>
      </Label>
      <p className="text-xs text-gray-500">{description}</p>
      
      {images[type] ? (
        <div className="relative">
          {imageErrors.has(images[type]) ? (
            <div className="w-full h-40 bg-gray-100 border border-gray-300 rounded-md flex items-center justify-center">
              <div className="text-center text-gray-500">
                <ImageOff className="h-8 w-8 mx-auto mb-2" />
                <p className="text-sm">Failed to load image</p>
              </div>
            </div>
          ) : (
            <img
              src={images[type]}
              alt={getTypeLabel(type)}
              className="w-full h-40 object-cover rounded-md border"
              onError={() => handleImageError(images[type])}
            />
          )}
          <Button
            type="button"
            variant="destructive"
            size="sm"
            className="absolute top-2 right-2"
            onClick={() => removeImage(type)}
            disabled={disabled}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      ) : (
        <div className="border-2 border-dashed border-gray-300 rounded-md p-4">
          <div className="text-center">
            <ImageIcon className="mx-auto h-8 w-8 text-gray-400" />
            <div className="mt-2">
              <label htmlFor={`image-${type}`}>
                <Button
                  type="button"
                  variant="outline"
                  disabled={disabled || uploading[type]}
                  className="cursor-pointer"
                  asChild
                >
                  <span>
                    {uploading[type] ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Uploading...
                      </>
                    ) : (
                      <>
                        <Upload className="mr-2 h-4 w-4" />
                        Upload Image
                      </>
                    )}
                  </span>
                </Button>
              </label>
              <input
                id={`image-${type}`}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handleImageUpload(file, type);
                }}
                disabled={disabled || uploading[type]}
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">PNG, JPG up to 5MB</p>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div>
      <Label className="text-base font-medium mb-4 block">
        Book Photos <span className="text-red-500">*</span>
      </Label>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {renderImageUpload('frontCover', 'Clear photo of the front cover')}
        {renderImageUpload('backCover', 'Clear photo of the back cover')}
        {renderImageUpload('insidePages', 'Photo of table of contents or sample pages')}
      </div>
      <p className="text-sm text-gray-600 mt-3">
        All three photos are required to create your listing. This helps buyers make informed decisions.
      </p>
    </div>
  );
};

export default MultiImageUpload;
