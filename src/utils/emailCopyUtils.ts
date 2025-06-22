
export const copyEmailToClipboard = async (email: string): Promise<boolean> => {
  try {
    await navigator.clipboard.writeText(email);
    return true;
  } catch (error) {
    console.error('Failed to copy email to clipboard:', error);
    // Fallback for older browsers
    try {
      const textArea = document.createElement('textarea');
      textArea.value = email;
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      const successful = document.execCommand('copy');
      document.body.removeChild(textArea);
      return successful;
    } catch (fallbackError) {
      console.error('Fallback copy method also failed:', fallbackError);
      return false;
    }
  }
};

export const formatEmailForCopy = (email: string): string => {
  return email.trim().toLowerCase();
};
