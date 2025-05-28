
import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Upload, X, Image } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';

interface ImageUploadProps {
  onImageChange: (imageUrl: string) => void;
  currentImageUrl?: string;
  disabled?: boolean;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ 
  onImageChange, 
  currentImageUrl,
  disabled = false 
}) => {
  const { user } = useAuth();
  const [isUploading, setIsUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(currentImageUrl || null);
  const [imageError, setImageError] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !user) return;

    // Validate file type
    if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
      toast.error('Please select a valid image file (JPEG, PNG, or WebP)');
      return;
    }

    // Validate file size (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image must be smaller than 5MB');
      return;
    }

    setIsUploading(true);
    setImageError(false);

    try {
      // Create a preview URL immediately
      const previewObjectUrl = URL.createObjectURL(file);
      setPreviewUrl(previewObjectUrl);

      // Upload to Supabase Storage
      const fileExt = file.name.split('.').pop();
      const fileName = `${user.id}/${Date.now()}.${fileExt}`;
      
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

      // Clean up the object URL
      URL.revokeObjectURL(previewObjectUrl);
      
      setPreviewUrl(publicUrl);
      onImageChange(publicUrl);
      toast.success('Image uploaded successfully');
    } catch (error) {
      console.error('Upload error:', error);
      toast.error('Failed to upload image');
      setImageError(true);
      // Reset to original preview if upload failed
      if (currentImageUrl) {
        setPreviewUrl(currentImageUrl);
      }
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemoveImage = () => {
    setPreviewUrl(null);
    setImageError(false);
    onImageChange('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleImageError = () => {
    setImageError(true);
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const getImageSrc = () => {
    if (imageError || !previewUrl) {
      return 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=400&h=300&fit=crop&auto=format&q=80';
    }
    return previewUrl;
  };

  return (
    <div className="space-y-4">
      <Label className="text-base font-medium">
        Book Image
      </Label>
      
      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        onChange={handleFileSelect}
        className="hidden"
        disabled={disabled || isUploading}
      />

      {previewUrl ? (
        <div className="relative">
          <div className="relative w-full h-48 border-2 border-gray-300 rounded-lg overflow-hidden">
            <img
              src={getImageSrc()}
              alt="Book preview"
              className="w-full h-full object-cover"
              onError={handleImageError}
            />
            {!disabled && (
              <button
                type="button"
                onClick={handleRemoveImage}
                className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
          <p className="text-sm text-gray-500 mt-2">
            Click the X to remove and upload a different image
          </p>
        </div>
      ) : (
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-book-400 transition-colors">
          <div className="flex flex-col items-center space-y-4">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
              <Image className="h-8 w-8 text-gray-400" />
            </div>
            
            <div className="space-y-2">
              <p className="text-gray-600 font-medium">
                Upload a photo of your book
              </p>
              <p className="text-sm text-gray-500">
                JPEG, PNG or WebP up to 5MB
              </p>
            </div>
            
            <Button
              type="button"
              variant="outline"
              onClick={triggerFileInput}
              disabled={disabled || isUploading}
              className="border-book-600 text-book-600 hover:bg-book-50"
            >
              {isUploading ? (
                <div className="flex items-center space-x-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-book-600"></div>
                  <span>Uploading...</span>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <Upload className="h-4 w-4" />
                  <span>Choose Image</span>
                </div>
              )}
            </Button>
          </div>
        </div>
      )}
      
      <p className="text-xs text-gray-500">
        Adding a clear photo of your book helps buyers make informed decisions and increases your chances of a sale.
      </p>
    </div>
  );
};

export default ImageUpload;
