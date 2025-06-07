
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/contexts/CartContext";
import Layout from "@/components/Layout";
import BookImageSection from "@/components/book-details/BookImageSection";
import BookInfo from "@/components/book-details/BookInfo";
import BookDescription from "@/components/book-details/BookDescription";
import BookActions from "@/components/book-details/BookActions";
import BookPricing from "@/components/book-details/BookPricing";
import SellerInfo from "@/components/book-details/SellerInfo";
import ReportBookDialog from "@/components/ReportBookDialog";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, AlertTriangle, BookOpen } from "lucide-react";
import { useBookDetails } from "@/hooks/useBookDetails";
import { debugBookId, extractBookId } from "@/utils/bookUtils";
import { toast } from "sonner";

const BookDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user, isAdmin } = useAuth();
  const { addToCart } = useCart();
  const [isReportDialogOpen, setIsReportDialogOpen] = useState(false);

  // Validate and debug book ID
  useEffect(() => {
    debugBookId(id);
    const validId = extractBookId(id);

    if (!validId) {
      console.error("Invalid or missing book ID in URL:", id);
      toast.error("Invalid book link - redirecting to browse books");
      navigate("/books");
    }
  }, [id, navigate]);

  const { book, isLoading, error } = useBookDetails(id || "");

  const handleBuyNow = () => {
    if (!user) {
      toast.error("Please log in to purchase books");
      navigate("/login");
      return;
    }

    if (!book) return;

    if (book.sold) {
      toast.error("This book has already been sold");
      return;
    }

    if (user.id === book.seller?.id) {
      toast.error("You cannot buy your own book");
      return;
    }

    navigate(`/checkout/${book.id}`);
  };

  const handleAddToCart = () => {
    if (!user) {
      toast.error("Please log in to add books to cart");
      navigate("/login");
      return;
    }

    if (!book) return;

    if (book.sold) {
      toast.error("This book has already been sold");
      return;
    }

    if (user.id === book.seller?.id) {
      toast.error("You cannot add your own book to cart");
      return;
    }

    addToCart({
      id: book.id,
      bookId: book.id,
      title: book.title,
      author: book.author,
      price: book.price,
      imageUrl: book.frontCover || book.imageUrl,
      sellerId: book.seller?.id || "",
      sellerName: book.seller?.name || "Unknown Seller",
    });

    toast.success("Book added to cart!");
  };

  const handleEditBook = () => {
    if (!book) return;
    navigate(`/edit-book/${book.id}`);
  };

  const handleShare = async () => {
    if (!book) return;

    const shareData = {
      title: `${book.title} by ${book.author}`,
      text: `Check out this book on ReBooked: ${book.title} by ${book.author} for R${book.price}`,
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (error) {
        console.log("Error sharing:", error);
        fallbackShare();
      }
    } else {
      fallbackShare();
    }
  };

  const fallbackShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Link copied to clipboard!");
  };

  const handleViewSellerProfile = () => {
    if (!book?.seller?.id) {
      toast.error("Seller profile not available");
      return;
    }
    navigate(`/user/${book.seller.id}`);
  };

  const handleReportBook = () => {
    if (!user) {
      toast.error("Please log in to report a book");
      navigate("/login");
      return;
    }
    setIsReportDialogOpen(true);
  };

  // Loading state
  if (isLoading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-book-600"></div>
            <p className="text-gray-600">Loading book details...</p>
          </div>
        </div>
      </Layout>
    );
  }

  // Error state with better error handling
  if (error || !book) {
    const errorMessage = error || "Book not found or may have been removed";

    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col items-center justify-center min-h-[400px] max-w-md mx-auto text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
              <AlertTriangle className="h-8 w-8 text-red-600" />
            </div>
            <h2 className="text-2xl font-semibold mb-2 text-gray-800">
              Book Not Available
            </h2>
            <p className="text-gray-600 mb-6">{errorMessage}</p>
            <div className="space-y-3 w-full">
              <Button
                onClick={() => navigate("/books")}
                className="bg-book-600 hover:bg-book-700 w-full min-h-[48px]"
                size="lg"
              >
                <BookOpen className="mr-2 h-4 w-4" />
                Browse All Books
              </Button>
              <Button
                variant="outline"
                onClick={() => navigate(-1)}
                className="w-full min-h-[48px]"
                size="lg"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Go Back
              </Button>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  const isOwner = user?.id === book.seller?.id;
  const showCommissionDetails = isOwner || isAdmin;

  return (
    <Layout>
      <div className="container mx-auto px-4 py-4 sm:py-8 max-w-6xl">
        {/* Back button */}
        <div className="mb-4 sm:mb-6">
          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
            className="text-book-600 hover:bg-book-50 p-2 sm:p-3 min-h-[44px]"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            <span className="hidden sm:inline">Back</span>
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Left column - Images and Content */}
          <div className="lg:col-span-2 space-y-6">
            <BookImageSection book={book} />
            <BookInfo book={book} />
            <BookDescription book={book} />
          </div>

          {/* Right column - Actions and Info */}
          <div className="space-y-6">
            <BookActions
              book={book}
              user={user}
              onBuyNow={handleBuyNow}
              onAddToCart={handleAddToCart}
              onEditBook={handleEditBook}
              onShare={handleShare}
              onViewSellerProfile={handleViewSellerProfile}
            />

            {showCommissionDetails && (
              <BookPricing
                price={book.price}
                commission={book.price * 0.1}
                sellerReceives={book.price * 0.9}
                showCommissionDetails={showCommissionDetails}
              />
            )}

            <SellerInfo
              seller={book.seller}
              onViewProfile={handleViewSellerProfile}
            />

            {!isOwner && (
              <div className="text-center">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleReportBook}
                  className="text-red-600 border-red-600 hover:bg-red-50"
                >
                  Report Issue
                </Button>
              </div>
            )}
          </div>
        </div>

        <ReportBookDialog
          isOpen={isReportDialogOpen}
          onClose={() => setIsReportDialogOpen(false)}
          bookId={book.id}
          bookTitle={book.title}
          sellerId={book.seller?.id}
          sellerName={book.seller?.name}
        />
      </div>
    </Layout>
  );
};

export default BookDetails;
