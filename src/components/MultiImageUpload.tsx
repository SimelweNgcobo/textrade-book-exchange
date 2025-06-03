
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
  images: string[] | BookImages;
  onImagesChange: (images: string[] | BookImages) => void;
  maxImages?: number;
  className?: string;
  variant?: 'array' | 'object';
  currentImages?: BookImages;
}

const MultiImageUpload = ({ 
  images, 
  onImagesChange, 
  maxImages = 3, 
  className = '',
  variant = 'array',
  currentImages
}: MultiImageUploadProps) => {
  const [isUploading, setIsUploading] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  // Convert images to array format for consistent handling
  const getImageArray = (): string[] => {
    if (variant === 'object') {
      const bookImages = (currentImages || images) as BookImages;
      return [bookImages.frontCover, bookImages.backCover, bookImages.insidePages].filter(Boolean);
    }
    return images as string[];
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

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    const remainingSlots = maxImages - imageArray.length;
    if (remainingSlots <= 0) {
      toast.error(`Maximum ${maxImages} images allowed`);
      return;
    }

    const filesToUpload = Array.from(files).slice(0, remainingSlots);
    setIsUploading(true);

    try {
      const uploadPromises = filesToUpload.map(async (file) => {
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

        return publicUrl;
      });

      const uploadedUrls = await Promise.all(uploadPromises);
      const newImages = [...imageArray, ...uploadedUrls];
      setImages(newImages);
      
      toast.success(`${uploadedUrls.length} image(s) uploaded successfully`);
    } catch (error) {
      console.error('Error uploading images:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to upload images';
      toast.error(errorMessage);
    } finally {
      setIsUploading(false);
      // Reset the input
      event.target.value = '';
    }
  };

  const removeImage = (index: number) => {
    const newImages = imageArray.filter((_, i) => i !== index);
    setImages(newImages);
    toast.success('Image removed');
  };

  const canUploadMore = imageArray.length < maxImages;

  const getImageLabels = () => {
    if (variant === 'object') {
      return ['Front Cover', 'Back Cover', 'Inside Pages'];
    }
    return imageArray.map((_, index) => `Image ${index + 1}`);
  };

  const labels = getImageLabels();

  return (
    <div className={`space-y-4 ${className}`}>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <p className="text-sm text-gray-600">
          Upload up to {maxImages} images ({imageArray.length}/{maxImages} uploaded)
        </p>
        {canUploadMore && (
          <div className="relative">
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleFileUpload}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              disabled={isUploading}
            />
            <Button
              type="button"
              variant="outline"
              size="sm"
              disabled={isUploading}
              className="relative w-full sm:w-auto"
            >
              <Upload className="mr-2 h-4 w-4" />
              {isUploading ? 'Uploading...' : 'Add Images'}
            </Button>
          </div>
        )}
      </div>

      {imageArray.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {imageArray.map((imageUrl, index) => (
            <Card key={index} className="relative group">
              <CardContent className="p-2">
                <div className="relative">
                  <img
                    src={imageUrl}
                    alt={labels[index] || `Upload ${index + 1}`}
                    className="w-full h-32 object-cover rounded cursor-pointer"
                    onClick={() => setPreviewImage(imageUrl)}
                  />
                  {variant === 'object' && (
                    <div className="absolute bottom-1 left-1 bg-black/70 text-white text-xs px-2 py-1 rounded">
                      {labels[index]}
                    </div>
                  )}
                </div>
                <div className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    onClick={() => removeImage(index)}
                    className="h-6 w-6 p-0"
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
                <div className="absolute bottom-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button
                    type="button"
                    variant="secondary"
                    size="sm"
                    onClick={() => setPreviewImage(imageUrl)}
                    className="h-6 w-6 p-0"
                  >
                    <Eye className="h-3 w-3" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {!canUploadMore && (
        <div className="text-sm text-amber-600 bg-amber-50 p-3 rounded">
          You have reached the maximum limit of {maxImages} images. Remove an image to add a new one.
        </div>
      )}

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
