
import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Upload, X, User, Camera } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';

interface ProfilePictureUploadProps {
  currentImageUrl?: string;
  onImageChange: (imageUrl: string) => void;
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

const ProfilePictureUpload = ({ 
  currentImageUrl, 
  onImageChange, 
  disabled = false,
  size = 'md'
}: ProfilePictureUploadProps) => {
  const { user } = useAuth();
  const [isUploading, setIsUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(currentImageUrl || null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const sizeClasses = {
    sm: 'w-16 h-16',
    md: 'w-24 h-24',
    lg: 'w-32 h-32'
  };

  const iconSizes = {
    sm: 'h-4 w-4',
    md: 'h-6 w-6',
    lg: 'h-8 w-8'
  };

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !user) return;

    if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
      toast.error('Please select a valid image file (JPEG, PNG, or WebP)');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image must be smaller than 5MB');
      return;
    }

    setIsUploading(true);

    try {
      const previewObjectUrl = URL.createObjectURL(file);
      setPreviewUrl(previewObjectUrl);

      const fileExt = file.name.split('.').pop();
      const fileName = `${user.id}/profile-${Date.now()}.${fileExt}`;
      
      const { data, error } = await supabase.storage
        .from('profile-pictures')
        .upload(fileName, file);

      if (error) {
        throw error;
      }

      const { data: { publicUrl } } = supabase.storage
        .from('profile-pictures')
        .getPublicUrl(data.path);

      URL.revokeObjectURL(previewObjectUrl);
      setPreviewUrl(publicUrl);
      onImageChange(publicUrl);
      toast.success('Profile picture uploaded successfully');
    } catch (error) {
      console.error('Upload error:', error);
      toast.error('Failed to upload profile picture');
      if (currentImageUrl) {
        setPreviewUrl(currentImageUrl);
      }
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemoveImage = async () => {
    if (currentImageUrl && currentImageUrl.includes('profile-pictures')) {
      try {
        const urlParts = currentImageUrl.split('/');
        const filePath = urlParts.slice(-2).join('/');
        
        await supabase.storage
          .from('profile-pictures')
          .remove([filePath]);
      } catch (error) {
        console.error('Error deleting image from storage:', error);
      }
    }
    
    setPreviewUrl(null);
    onImageChange('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="flex flex-col items-center space-y-3">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        onChange={handleFileSelect}
        className="hidden"
        disabled={disabled || isUploading}
      />

      <div className={`relative ${sizeClasses[size]} rounded-full overflow-hidden bg-gray-100 border-2 border-gray-200`}>
        {previewUrl ? (
          <>
            <img
              src={previewUrl}
              alt="Profile"
              className="w-full h-full object-cover"
            />
            {!disabled && (
              <button
                type="button"
                onClick={handleRemoveImage}
                className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                disabled={isUploading}
              >
                <X className="h-3 w-3" />
              </button>
            )}
          </>
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <User className={`${iconSizes[size]} text-gray-400`} />
          </div>
        )}
        
        {!disabled && (
          <button
            type="button"
            onClick={triggerFileInput}
            disabled={isUploading}
            className="absolute bottom-0 right-0 bg-book-600 text-white rounded-full p-1.5 hover:bg-book-700 transition-colors"
          >
            {isUploading ? (
              <div className="animate-spin rounded-full h-3 w-3 border-t-2 border-b-2 border-white"></div>
            ) : (
              <Camera className="h-3 w-3" />
            )}
          </button>
        )}
      </div>
    </div>
  );
};

export default ProfilePictureUpload;
