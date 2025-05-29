
import { useState } from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface BookImageCarouselProps {
  images: {
    frontCover?: string;
    backCover?: string;
    insidePages?: string;
  };
  bookTitle: string;
}

const BookImageCarousel = ({ images, bookTitle }: BookImageCarouselProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  // Filter out empty images and create array with labels
  const imageList = [
    { url: images.frontCover, label: 'Front Cover' },
    { url: images.backCover, label: 'Back Cover' },
    { url: images.insidePages, label: 'Inside Pages' }
  ].filter(img => img.url && img.url.trim() !== '');

  // Fallback image if no images available
  const fallbackImage = 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=500&h=600&fit=crop';
  
  if (imageList.length === 0) {
    imageList.push({ url: fallbackImage, label: 'Book Cover' });
  }

  const handlePrevious = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? imageList.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    setCurrentImageIndex((prev) => 
      prev === imageList.length - 1 ? 0 : prev + 1
    );
  };

  const handleThumbnailClick = (index: number) => {
    setCurrentImageIndex(index);
  };

  const currentImage = imageList[currentImageIndex];

  return (
    <div className="relative">
      <Carousel className="w-full">
        <CarouselContent>
          {imageList.map((image, index) => (
            <CarouselItem key={index}>
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <div className="relative cursor-pointer group">
                    <img
                      src={image.url}
                      alt={`${bookTitle} - ${image.label}`}
                      className="rounded-lg shadow-md object-cover w-full h-[500px] transition-transform group-hover:scale-105"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = fallbackImage;
                      }}
                    />
                    <div className="absolute bottom-2 left-2">
                      <Badge variant="secondary" className="bg-black/70 text-white">
                        {image.label}
                      </Badge>
                    </div>
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors rounded-lg flex items-center justify-center">
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity text-white text-sm font-medium bg-black/50 px-3 py-1 rounded">
                        Click to enlarge
                      </div>
                    </div>
                  </div>
                </DialogTrigger>
                <DialogContent className="max-w-4xl w-full p-0">
                  <div className="relative">
                    <img
                      src={currentImage.url}
                      alt={`${bookTitle} - ${currentImage.label}`}
                      className="w-full h-auto max-h-[80vh] object-contain"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = fallbackImage;
                      }}
                    />
                    <div className="absolute bottom-4 left-4">
                      <Badge className="bg-black/70 text-white">
                        {currentImage.label}
                      </Badge>
                    </div>
                    
                    {imageList.length > 1 && (
                      <>
                        <button
                          onClick={handlePrevious}
                          className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
                        >
                          <ChevronLeft className="h-6 w-6" />
                        </button>
                        <button
                          onClick={handleNext}
                          className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
                        >
                          <ChevronRight className="h-6 w-6" />
                        </button>
                      </>
                    )}
                  </div>
                </DialogContent>
              </Dialog>
            </CarouselItem>
          ))}
        </CarouselContent>
        
        {imageList.length > 1 && (
          <>
            <CarouselPrevious className="left-2" />
            <CarouselNext className="right-2" />
          </>
        )}
      </Carousel>
      
      {imageList.length > 1 && (
        <div className="flex justify-center mt-4 space-x-2">
          {imageList.map((image, index) => (
            <button
              key={index}
              onClick={() => handleThumbnailClick(index)}
              className={`w-16 h-16 rounded-md overflow-hidden border-2 transition-all ${
                index === currentImageIndex ? 'border-book-600 ring-2 ring-book-200' : 'border-gray-300'
              }`}
            >
              <img
                src={image.url}
                alt={`${bookTitle} - ${image.label} thumbnail`}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = fallbackImage;
                }}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default BookImageCarousel;
