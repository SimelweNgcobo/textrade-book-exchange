
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Upload, X, Eye } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface BookImages {
  frontCover: string;
  backCover: string;
  insidePages: string;
}

interface MultiImageUploadProps {
  images?: string[] | BookImages;
  onImagesChange: (images: string[] | BookImages) => void;
  maxImages?: number;
  className?: string;
  variant?: 'array' | 'object';
  currentImages?: BookImages;
  disabled?: boolean;
}

const MultiImageUpload = ({ 
  images, 
  onImagesChange, 
  maxImages = 3, 
  className = '',
  variant = 'object',
  currentImages,
  disabled = false
}: MultiImageUploadProps) => {
  const [isUploading, setIsUploading] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  // Convert images to array format for consistent handling
  const getImageArray = (): string[] => {
    if (variant === 'object') {
      const bookImages = (currentImages || images) as BookImages;
      if (!bookImages) return [];
      return [bookImages.frontCover, bookImages.backCover, bookImages.insidePages].filter(Boolean);
    }
    return (images || []) as string[];
  };

  // Convert array back to appropriate format
  const setImages = (newImages: string[]) => {
    if (variant === 'object') {
      const bookImages: BookImages = {
        frontCover: newImages[0] || '',
        backCover: newImages[1] || '',
        insidePages: newImages[2] || ''
      };
      onImagesChange(bookImages);
    } else {
      onImagesChange(newImages);
    }
  };

  const imageArray = getImageArray();

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
    if (disabled) return;
    
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploading(true);

    try {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        throw new Error(`${file.name} is not a valid image file`);
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        throw new Error(`${file.name} is too large. Maximum size is 5MB`);
      }

      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `book-images/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('book-images')
        .upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }

      const { data: { publicUrl } } = supabase.storage
        .from('book-images')
        .getPublicUrl(filePath);

      const newImages = [...imageArray];
      newImages[index] = publicUrl;
      setImages(newImages);
      
      toast.success('Image uploaded successfully');
    } catch (error) {
      console.error('Error uploading image:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to upload image';
      toast.error(errorMessage);
    } finally {
      setIsUploading(false);
      // Reset the input
      event.target.value = '';
    }
  };

  const removeImage = (index: number) => {
    if (disabled) return;
    
    const newImages = [...imageArray];
    newImages[index] = '';
    setImages(newImages);
    toast.success('Image removed');
  };

  const imageSlots = [
    { label: 'Front Cover', description: 'Clear photo of the front cover' },
    { label: 'Back Cover', description: 'Clear photo of the back cover' },
    { label: 'Inside Pages', description: 'Photo of table of contents or sample pages' }
  ];

  return (
    <div className={`space-y-6 ${className}`}>
      <div>
        <h3 className="text-lg font-medium mb-2">
          Book Photos <span className="text-red-500">*</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {imageSlots.map((slot, index) => (
            <div key={index} className="space-y-2">
              <div className="text-center">
                <h4 className="font-medium">
                  {slot.label} <span className="text-red-500">*</span>
                </h4>
                <p className="text-sm text-gray-600 mb-3">{slot.description}</p>
              </div>
              
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center min-h-[200px] flex flex-col justify-center">
                {imageArray[index] ? (
                  <div className="relative">
                    <img
                      src={imageArray[index]}
                      alt={slot.label}
                      className="w-full h-32 object-cover rounded mb-3 cursor-pointer"
                      onClick={() => setPreviewImage(imageArray[index])}
                    />
                    <div className="flex gap-2 justify-center">
                      <Button
                        type="button"
                        variant="secondary"
                        size="sm"
                        onClick={() => setPreviewImage(imageArray[index])}
                        className="min-h-[32px]"
                      >
                        <Eye className="h-3 w-3 mr-1" />
                        View
                      </Button>
                      {!disabled && (
                        <Button
                          type="button"
                          variant="destructive"
                          size="sm"
                          onClick={() => removeImage(index)}
                          className="min-h-[32px]"
                        >
                          <X className="h-3 w-3 mr-1" />
                          Remove
                        </Button>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div className="w-16 h-16 bg-gray-100 rounded-lg mx-auto flex items-center justify-center">
                      <Upload className="h-8 w-8 text-gray-400" />
                    </div>
                    <div className="relative">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleFileUpload(e, index)}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        disabled={isUploading || disabled}
                      />
                      <Button
                        type="button"
                        variant="outline"
                        disabled={isUploading || disabled}
                        className="w-full min-h-[44px]"
                      >
                        <Upload className="h-4 w-4 mr-2" />
                        {isUploading ? 'Uploading...' : 'Upload Image'}
                      </Button>
                    </div>
                    <p className="text-xs text-gray-500">PNG, JPG up to 5MB</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
        <p className="text-sm text-gray-600 mt-4 text-center">
          All three photos are required to create your listing. This helps buyers make informed decisions.
        </p>
      </div>

      {/* Image Preview Modal */}
      {previewImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={() => setPreviewImage(null)}
        >
          <div className="max-w-4xl max-h-[90vh] w-full">
            <img
              src={previewImage}
              alt="Preview"
              className="max-w-full max-h-full object-contain rounded mx-auto"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default MultiImageUpload;
