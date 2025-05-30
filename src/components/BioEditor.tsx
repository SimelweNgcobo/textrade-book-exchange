
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Edit, Save, X } from 'lucide-react';

interface BioEditorProps {
  bio?: string;
  onSave: (bio: string) => Promise<void>;
  disabled?: boolean;
}

const BioEditor = ({ bio = '', onSave, disabled = false }: BioEditorProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedBio, setEditedBio] = useState(bio);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await onSave(editedBio);
      setIsEditing(false);
    } catch (error) {
      console.error('Error saving bio:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setEditedBio(bio);
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className="space-y-3">
        <Textarea
          value={editedBio}
          onChange={(e) => setEditedBio(e.target.value)}
          placeholder="Tell others about yourself..."
          className="min-h-[100px] resize-none"
          maxLength={500}
          disabled={isSaving}
        />
        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-500">
            {editedBio.length}/500 characters
          </span>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleCancel}
              disabled={isSaving}
            >
              <X className="h-4 w-4 mr-1" />
              Cancel
            </Button>
            <Button
              size="sm"
              onClick={handleSave}
              disabled={isSaving}
              className="bg-book-600 hover:bg-book-700"
            >
              {isSaving ? (
                <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-1"></div>
              ) : (
                <Save className="h-4 w-4 mr-1" />
              )}
              Save
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          {bio ? (
            <p className="text-gray-700 whitespace-pre-wrap">{bio}</p>
          ) : (
            <p className="text-gray-500 italic">No bio added yet. Click edit to add one.</p>
          )}
        </div>
        {!disabled && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsEditing(true)}
            className="text-book-600 hover:text-book-700"
          >
            <Edit className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
};

export default BioEditor;
