import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Upload, X, Eye, Loader2, Camera } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { useIsMobile } from '@/hooks/use-mobile';

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
  const [isUploading, setIsUploading] = useState<{[key: number]: boolean}>({});
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const fileInputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const isMobile = useIsMobile();

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

  const validateFile = (file: File): boolean => {
    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast.error(`${file.name} is not a valid image file. Please select a PNG, JPG, or WEBP image.`);
      return false;
    }

    // Validate file size (max 10MB for better mobile support)
    if (file.size > 10 * 1024 * 1024) {
      toast.error(`${file.name} is too large. Maximum size is 10MB.`);
      return false;
    }

    return true;
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
    if (disabled) return;

    const file = event.target.files?.[0];
    if (!file) return;

    if (!validateFile(file)) {
      // Reset the input
      if (event.target) {
        event.target.value = '';
      }
      return;
    }

    setIsUploading(prev => ({ ...prev, [index]: true }));

    try {
      // Create unique filename with timestamp
      const timestamp = Date.now();
      const fileExt = file.name.split('.').pop()?.toLowerCase() || 'jpg';
      const fileName = `book_${timestamp}_${Math.random().toString(36).substring(2, 7)}.${fileExt}`;
      const filePath = `book-images/${fileName}`;

      console.log(`Uploading file: ${fileName}, Size: ${(file.size / 1024 / 1024).toFixed(2)}MB`);

      const { error: uploadError } = await supabase.storage
        .from('book-images')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (uploadError) {
        console.error('Upload error:', uploadError);
        throw new Error(`Upload failed: ${uploadError.message}`);
      }

      const { data: { publicUrl } } = supabase.storage
        .from('book-images')
        .getPublicUrl(filePath);

      if (!publicUrl) {
        throw new Error('Failed to get public URL for uploaded image');
      }

      const newImages = [...imageArray];
      // Ensure we have at least 3 slots
      while (newImages.length < 3) {
        newImages.push('');
      }
      newImages[index] = publicUrl;
      setImages(newImages);

      toast.success('Image uploaded successfully!');
    } catch (error) {
      console.error('Error uploading image:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to upload image. Please try again.';
      toast.error(errorMessage);
    } finally {
      setIsUploading(prev => ({ ...prev, [index]: false }));
      // Reset the input
      if (event.target) {
        event.target.value = '';
      }
    }
  };

  const removeImage = (index: number) => {
    if (disabled) return;

    const newImages = [...imageArray];
    // Ensure we have at least 3 slots
    while (newImages.length < 3) {
      newImages.push('');
    }
    newImages[index] = '';
    setImages(newImages);
    toast.success('Image removed');
  };

  const triggerFileInput = (index: number) => {
    if (disabled || isUploading[index]) return;
    fileInputRefs.current[index]?.click();
  };

  const imageSlots = [
    { label: 'Front Cover', description: 'Clear photo of the front cover' },
    { label: 'Back Cover', description: 'Clear photo of the back cover' },
    { label: 'Inside Pages', description: 'Photo of table of contents or sample pages' }
  ];

  return (
    <div className={`space-y-6 ${className}`}>
      <div>
        <h3 className={`${isMobile ? 'text-base' : 'text-lg'} font-medium mb-2`}>
          Book Photos <span className="text-red-500">*</span>
        </h3>
        <div className={`grid ${isMobile ? 'grid-cols-1 gap-4' : 'grid-cols-1 md:grid-cols-3 gap-6'}`}>
          {imageSlots.map((slot, index) => {
            const hasImage = imageArray[index];
            const isCurrentlyUploading = isUploading[index];

            return (
              <div key={index} className="space-y-2">
                <div className="text-center">
                  <h4 className={`font-medium ${isMobile ? 'text-sm' : 'text-base'}`}>
                    {slot.label} <span className="text-red-500">*</span>
                  </h4>
                  <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-gray-600 mb-3`}>
                    {slot.description}
                  </p>
                </div>

                <Card className="border-2 border-dashed border-gray-300 hover:border-gray-400 transition-colors">
                  <CardContent className={`p-${isMobile ? '4' : '6'} ${isMobile ? 'min-h-[180px]' : 'min-h-[200px]'} flex flex-col justify-center`}>
                    {hasImage ? (
                      <div className="relative">
                        <img
                          src={hasImage}
                          alt={slot.label}
                          className={`w-full ${isMobile ? 'h-24' : 'h-32'} object-cover rounded mb-3 cursor-pointer shadow-sm`}
                          onClick={() => setPreviewImage(hasImage)}
                        />
                        <div className={`flex gap-2 justify-center ${isMobile ? 'flex-col' : 'flex-row'}`}>
                          <Button
                            type="button"
                            variant="secondary"
                            size="sm"
                            onClick={() => setPreviewImage(hasImage)}
                            className={`${isMobile ? 'w-full h-10' : 'min-h-[32px]'}`}
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
                              className={`${isMobile ? 'w-full h-10' : 'min-h-[32px]'}`}
                            >
                              <X className="h-3 w-3 mr-1" />
                              Remove
                            </Button>
                          )}
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        <div className={`${isMobile ? 'w-12 h-12' : 'w-16 h-16'} bg-gray-100 rounded-lg mx-auto flex items-center justify-center`}>
                          {isCurrentlyUploading ? (
                            <Loader2 className={`${isMobile ? 'h-6 w-6' : 'h-8 w-8'} text-blue-500 animate-spin`} />
                          ) : (
                            <Camera className={`${isMobile ? 'h-6 w-6' : 'h-8 w-8'} text-gray-400`} />
                          )}
                        </div>

                        {/* Hidden file input */}
                        <input
                          ref={(el) => (fileInputRefs.current[index] = el)}
                          type="file"
                          accept="image/*,image/heic,image/heif"
                          onChange={(e) => handleFileUpload(e, index)}
                          className="hidden"
                          disabled={isCurrentlyUploading || disabled}
                          capture={isMobile ? "environment" : undefined}
                        />

                        <Button
                          type="button"
                          variant="outline"
                          disabled={isCurrentlyUploading || disabled}
                          onClick={() => triggerFileInput(index)}
                          className={`w-full ${isMobile ? 'h-12 text-sm' : 'min-h-[44px]'} touch-manipulation`}
                        >
                          {isCurrentlyUploading ? (
                            <Loader2 className="h-4 w-4 animate-spin mr-2" />
                          ) : (
                            <Camera className="h-4 w-4 mr-2" />
                          )}
                          {isCurrentlyUploading ? 'Uploading...' : `Add ${slot.label}`}
                        </Button>

                        <p className={`${isMobile ? 'text-xs' : 'text-xs'} text-gray-500 text-center`}>
                          {isMobile ? 'PNG, JPG up to 10MB' : 'PNG, JPG up to 10MB'}
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            );
          })}
        </div>
        <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-gray-600 mt-4 text-center`}>
          All three photos are required to create your listing. This helps buyers make informed decisions.
        </p>
      </div>

      {/* Image Preview Modal */}
      {previewImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
          onClick={() => setPreviewImage(null)}
        >
          <div className="max-w-4xl max-h-[90vh] w-full relative">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setPreviewImage(null)}
              className="absolute top-4 right-4 z-10"
            >
              <X className="h-4 w-4" />
            </Button>
              <img
                src={previewImage}
                alt="Selected file preview"
                width="400"
                height="400"
                className="max-w-full max-h-[400px] object-contain rounded-lg shadow-md"
                loading="lazy"
                decoding="async"
              />
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default MultiImageUpload;