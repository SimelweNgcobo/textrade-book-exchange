import { Loader2 } from "lucide-react";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  text?: string;
  className?: string;
  variant?: "default" | "overlay" | "inline";
}

const LoadingSpinner = ({
  size = "md",
  text,
  className = "",
  variant = "default",
}) => {
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-8 w-8",
    lg: "h-12 w-12",
  };

  const textSizeClasses = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg",
  };

  const spinner = (
    <Loader2
      className={`animate-spin text-book-600 ${sizeClasses[size]} ${className}`}
    />
  );

  const content = (
    <div className="flex flex-col items-center justify-center space-y-2">
      {spinner}
      {text && (
        <p className={`text-gray-600 ${textSizeClasses[size]}`}>{text}</p>
      )}
    </div>
  );

  switch (variant) {
    case "overlay":
      return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 shadow-lg">{content}</div>
        </div>
      );

    case "inline":
      return (
        <div className="flex items-center space-x-2">
          {spinner}
          {text && (
            <span className={`text-gray-600 ${textSizeClasses[size]}`}>
              {text}
            </span>
          )}
        </div>
      );

    default:
      return (
        <div className="flex items-center justify-center py-8">{content}</div>
      );
  }
};

export default LoadingSpinner;
