import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { createBook } from "@/services/book/bookMutations";
import { BookFormData } from "@/types/book";
import { toast } from "sonner";
import { ArrowLeft } from "lucide-react";
import MultiImageUpload from "@/components/MultiImageUpload";
import FirstUploadSuccessDialog from "@/components/FirstUploadSuccessDialog";
import PostListingSuccessDialog from "@/components/PostListingSuccessDialog";
import ShareProfileDialog from "@/components/ShareProfileDialog";
import {
  hasCompletedFirstUpload,
  markFirstUploadCompleted,
} from "@/services/userPreferenceService";
import { BookInformationForm } from "@/components/create-listing/BookInformationForm";
import { PricingSection } from "@/components/create-listing/PricingSection";
import { BookTypeSection } from "@/components/create-listing/BookTypeSection";

const CreateListing = () => {
  const { user, profile } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState<BookFormData>({
    title: "",
    author: "",
    description: "",
    price: 0,
    condition: "Good",
    category: "",
    grade: "",
    universityYear: "",
    university: "",
    imageUrl: "",
    frontCover: "",
    backCover: "",
    insidePages: "",
  });

  const [bookImages, setBookImages] = useState({
    frontCover: "",
    backCover: "",
    insidePages: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [bookType, setBookType] = useState<"school" | "university">("school");
  const [showFirstUploadDialog, setShowFirstUploadDialog] = useState(false);
  const [showPostListingDialog, setShowPostListingDialog] = useState(false);
  const [showShareProfileDialog, setShowShareProfileDialog] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "price" ? parseFloat(value) || 0 : value,
    });

    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });

    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const handleBookTypeChange = (type: "school" | "university") => {
    setBookType(type);
    if (type === "school") {
      setFormData({ ...formData, universityYear: "", university: "" });
    } else {
      setFormData({ ...formData, grade: "" });
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) newErrors.title = "Title is required";
    if (!formData.author.trim()) newErrors.author = "Author is required";
    if (!formData.description.trim())
      newErrors.description = "Description is required";
    if (!formData.price || formData.price <= 0)
      newErrors.price = "Valid price is required (must be greater than 0)";
    if (!formData.category) newErrors.category = "Category is required";
    if (!formData.condition) newErrors.condition = "Condition is required";

    if (bookType === "school" && !formData.grade) {
      newErrors.grade = "Grade is required for school books";
    }

    if (bookType === "university" && !formData.universityYear) {
      newErrors.universityYear =
        "University year is required for university books";
    }

    if (bookType === "university" && !formData.university) {
      newErrors.university = "University is required for university books";
    }

    if (!bookImages.frontCover)
      newErrors.frontCover = "Front cover photo is required";
    if (!bookImages.backCover)
      newErrors.backCover = "Back cover photo is required";
    if (!bookImages.insidePages)
      newErrors.insidePages = "Inside pages photo is required";

    setErrors(newErrors);

    // Log validation results for debugging
    if (Object.keys(newErrors).length > 0) {
      console.log("Form validation failed with errors:", newErrors);
    } else {
      console.log("Form validation passed");
    }

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log("Form submission started");
    console.log("Current form data:", formData);
    console.log("Current book images:", bookImages);

    if (!validateForm()) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (!user) {
      toast.error("You must be logged in to create a listing");
      return;
    }

    setIsSubmitting(true);

    try {
      const bookData = {
        ...formData,
        frontCover: bookImages.frontCover,
        backCover: bookImages.backCover,
        insidePages: bookImages.insidePages,
      };

      console.log("Creating book with complete data:", bookData);

      // Validate that all required images are present
      if (
        !bookData.frontCover ||
        !bookData.backCover ||
        !bookData.insidePages
      ) {
        throw new Error("All three book photos are required");
      }

      const createdBook = await createBook(bookData);

      console.log("Book created successfully:", createdBook);
      toast.success("Book listing created successfully!");

      const hasCompleted = await hasCompletedFirstUpload(user.id);
      if (!hasCompleted) {
        await markFirstUploadCompleted(user.id);
        setShowFirstUploadDialog(true);
      } else {
        setShowPostListingDialog(true);
      }

      // Reset form
      setFormData({
        title: "",
        author: "",
        description: "",
        price: 0,
        condition: "Good",
        category: "",
        grade: "",
        universityYear: "",
        university: "",
        imageUrl: "",
        frontCover: "",
        backCover: "",
        insidePages: "",
      });

      setBookImages({
        frontCover: "",
        backCover: "",
        insidePages: "",
      });

      setErrors({});
    } catch (error) {
      console.error("Error creating listing:", error);
      const errorMessage =
        error instanceof Error ? error.message : "Failed to create listing";
      console.error("Detailed error:", errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!user) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8 text-center">
          <h1 className="text-2xl font-bold mb-4">Please Sign In</h1>
          <p>You need to be signed in to create a listing.</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <Button
          variant="ghost"
          onClick={() => navigate(-1)}
          className="mb-6 text-book-600 hover:text-book-700"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>

        <div className="bg-white rounded-lg shadow-md p-8">
          <h1 className="text-3xl font-bold text-book-800 mb-6 text-center">
            Create New Listing
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <BookInformationForm
                formData={formData}
                errors={errors}
                onInputChange={handleInputChange}
              />

              <div className="space-y-4">
                <PricingSection
                  formData={formData}
                  errors={errors}
                  onInputChange={handleInputChange}
                />

                <BookTypeSection
                  bookType={bookType}
                  formData={formData}
                  errors={errors}
                  onBookTypeChange={handleBookTypeChange}
                  onSelectChange={handleSelectChange}
                />
              </div>
            </div>

            <div>
              <MultiImageUpload
                currentImages={bookImages}
                onImagesChange={(images) =>
                  setBookImages(images as typeof bookImages)
                }
                variant="object"
                maxImages={3}
              />
              {(errors.frontCover ||
                errors.backCover ||
                errors.insidePages) && (
                <div className="mt-2 space-y-1">
                  {errors.frontCover && (
                    <p className="text-sm text-red-500">{errors.frontCover}</p>
                  )}
                  {errors.backCover && (
                    <p className="text-sm text-red-500">{errors.backCover}</p>
                  )}
                  {errors.insidePages && (
                    <p className="text-sm text-red-500">{errors.insidePages}</p>
                  )}
                </div>
              )}
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-book-600 hover:bg-book-700 text-white py-3 text-lg"
            >
              {isSubmitting ? "Creating Listing..." : "Create Listing"}
            </Button>
          </form>
        </div>

        <FirstUploadSuccessDialog
          isOpen={showFirstUploadDialog}
          onClose={() => {
            setShowFirstUploadDialog(false);
            setShowShareProfileDialog(true);
          }}
        />

        <PostListingSuccessDialog
          isOpen={showPostListingDialog}
          onClose={() => setShowPostListingDialog(false)}
          onShareProfile={() => {
            setShowPostListingDialog(false);
            setShowShareProfileDialog(true);
          }}
        />

        <ShareProfileDialog
          isOpen={showShareProfileDialog}
          onClose={() => setShowShareProfileDialog(false)}
          userId={user?.id}
          userProfile={profile}
        />
      </div>
    </Layout>
  );
};

export default CreateListing;
