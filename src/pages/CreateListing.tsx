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

    if (!formData.title) newErrors.title = "Title is required";
    if (!formData.author) newErrors.author = "Author is required";
    if (!formData.description)
      newErrors.description = "Description is required";
    if (!formData.price || formData.price <= 0)
      newErrors.price = "Valid price is required";
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
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

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

      console.log("Creating book with data:", bookData);

      const createdBook = await createBook(bookData, user);

      console.log("Book created successfully:", createdBook);

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
      toast.error(
        error instanceof Error ? error.message : "Failed to create listing",
      );
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
              <Label className="text-base font-medium block mb-4">
                Book Photos <span className="text-red-500">*</span>
              </Label>
              <MultiImageUpload
                bookImages={bookImages}
                setBookImages={setBookImages}
                errors={errors}
              />
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
