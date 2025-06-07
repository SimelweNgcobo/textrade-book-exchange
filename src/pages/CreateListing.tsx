import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { createBook } from "@/services/book/bookMutations";
import {
  calculateCommission,
  calculateSellerReceives,
} from "@/services/book/bookUtils";
import { BookFormData } from "@/types/book";
import { toast } from "sonner";
import { ArrowLeft, School, GraduationCap } from "lucide-react";
import MultiImageUpload from "@/components/MultiImageUpload";
import FirstUploadSuccessDialog from "@/components/FirstUploadSuccessDialog";
import PostListingSuccessDialog from "@/components/PostListingSuccessDialog";
import ShareProfileDialog from "@/components/ShareProfileDialog";
import {
  hasCompletedFirstUpload,
  markFirstUploadCompleted,
} from "@/services/userPreferenceService";
import { BookDeletionService } from "@/services/bookDeletionService";
import { UniversitySelector } from "@/components/ui/university-selector";
import { UNIVERSITY_YEARS } from "@/constants/universities";

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
  const [deleteInProgress, setDeleteInProgress] = useState(false);

  const categories = [
    "Computer Science",
    "Mathematics",
    "Biology",
    "Chemistry",
    "Physics",
    "Economics",
    "Psychology",
    "English",
    "History",
    "Geography",
    "Business Studies",
    "Accounting",
    "Life Sciences",
    "Physical Sciences",
    "Engineering",
    "Medicine",
    "Law",
    "Arts",
    "Languages",
    "Other",
  ];

  const conditions = ["New", "Good", "Better", "Average", "Below Average"];

  const grades = [
    "Grade 1",
    "Grade 2",
    "Grade 3",
    "Grade 4",
    "Grade 5",
    "Grade 6",
    "Grade 7",
    "Grade 8",
    "Grade 9",
    "Grade 10",
    "Grade 11",
    "Grade 12",
  ];

  const universityYears = UNIVERSITY_YEARS;

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

  const commission = calculateCommission(formData.price);
  const sellerReceives = calculateSellerReceives(formData.price);

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
              <div className="space-y-4">
                <div>
                  <Label htmlFor="title" className="text-base font-medium">
                    Book Title <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="Enter book title"
                    className={errors.title ? "border-red-500" : ""}
                    required
                  />
                  {errors.title && (
                    <p className="text-sm text-red-500 mt-1">{errors.title}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="author" className="text-base font-medium">
                    Author <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="author"
                    name="author"
                    value={formData.author}
                    onChange={handleInputChange}
                    placeholder="Enter author name"
                    className={errors.author ? "border-red-500" : ""}
                    required
                  />
                  {errors.author && (
                    <p className="text-sm text-red-500 mt-1">{errors.author}</p>
                  )}
                </div>

                <div>
                  <Label
                    htmlFor="description"
                    className="text-base font-medium"
                  >
                    Description <span className="text-red-500">*</span>
                  </Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Describe the book's content and condition"
                    rows={4}
                    className={errors.description ? "border-red-500" : ""}
                    required
                  />
                  {errors.description && (
                    <p className="text-sm text-red-500 mt-1">
                      {errors.description}
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="price" className="text-base font-medium">
                    Price (R) <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="price"
                    name="price"
                    type="number"
                    value={formData.price}
                    onChange={handleInputChange}
                    placeholder="0"
                    min="0"
                    step="0.01"
                    className={errors.price ? "border-red-500" : ""}
                    required
                  />
                  {errors.price && (
                    <p className="text-sm text-red-500 mt-1">{errors.price}</p>
                  )}

                  {formData.price > 0 && (
                    <div className="mt-2 p-3 bg-gray-50 rounded">
                      <p className="text-sm text-gray-600">
                        Commission (7%): R{commission.toFixed(2)}
                      </p>
                      <p className="text-sm font-medium text-green-600">
                        You receive: R{sellerReceives.toFixed(2)}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <Label className="text-base font-medium">
                    Book Type <span className="text-red-500">*</span>
                  </Label>
                  <RadioGroup
                    value={bookType}
                    onValueChange={(value) =>
                      handleBookTypeChange(value as "school" | "university")
                    }
                    className="flex gap-6 mt-2"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="school" id="school" />
                      <Label
                        htmlFor="school"
                        className="flex items-center cursor-pointer"
                      >
                        <School className="mr-2 h-4 w-4" />
                        School Book
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="university" id="university" />
                      <Label
                        htmlFor="university"
                        className="flex items-center cursor-pointer"
                      >
                        <GraduationCap className="mr-2 h-4 w-4" />
                        University Book
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                <div>
                  <Label htmlFor="category" className="text-base font-medium">
                    Category <span className="text-red-500">*</span>
                  </Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) =>
                      handleSelectChange("category", value)
                    }
                  >
                    <SelectTrigger
                      className={errors.category ? "border-red-500" : ""}
                    >
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.category && (
                    <p className="text-sm text-red-500 mt-1">
                      {errors.category}
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="condition" className="text-base font-medium">
                    Condition <span className="text-red-500">*</span>
                  </Label>
                  <Select
                    value={formData.condition}
                    onValueChange={(value) =>
                      handleSelectChange("condition", value)
                    }
                  >
                    <SelectTrigger
                      className={errors.condition ? "border-red-500" : ""}
                    >
                      <SelectValue placeholder="Select condition" />
                    </SelectTrigger>
                    <SelectContent>
                      {conditions.map((condition) => (
                        <SelectItem key={condition} value={condition}>
                          {condition}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.condition && (
                    <p className="text-sm text-red-500 mt-1">
                      {errors.condition}
                    </p>
                  )}
                </div>

                {bookType === "school" ? (
                  <div>
                    <Label htmlFor="grade" className="text-base font-medium">
                      Grade <span className="text-red-500">*</span>
                    </Label>
                    <Select
                      value={formData.grade}
                      onValueChange={(value) =>
                        handleSelectChange("grade", value)
                      }
                    >
                      <SelectTrigger
                        className={errors.grade ? "border-red-500" : ""}
                      >
                        <SelectValue placeholder="Select a grade" />
                      </SelectTrigger>
                      <SelectContent>
                        {grades.map((grade) => (
                          <SelectItem key={grade} value={grade}>
                            {grade}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.grade && (
                      <p className="text-sm text-red-500 mt-1">
                        {errors.grade}
                      </p>
                    )}
                  </div>
                ) : (
                  <>
                    {/* University Selection */}
                    <div>
                      <Label
                        htmlFor="university"
                        className="text-base font-medium"
                      >
                        University <span className="text-red-500">*</span>
                      </Label>
                      <UniversitySelector
                        value={formData.university || ""}
                        onValueChange={(value) =>
                          handleSelectChange("university", value)
                        }
                        placeholder="Select university..."
                        className={errors.university ? "border-red-500" : ""}
                      />
                      {errors.university && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.university}
                        </p>
                      )}
                    </div>

                    {/* University Year Selection */}
                    <div>
                      <Label
                        htmlFor="universityYear"
                        className="text-base font-medium"
                      >
                        University Year <span className="text-red-500">*</span>
                      </Label>
                      <Select
                        value={formData.universityYear || ""}
                        onValueChange={(value) =>
                          handleSelectChange("universityYear", value)
                        }
                      >
                        <SelectTrigger
                          className={
                            errors.universityYear ? "border-red-500" : ""
                          }
                        >
                          <SelectValue placeholder="Select university year" />
                        </SelectTrigger>
                        <SelectContent>
                          {universityYears.map((year) => (
                            <SelectItem key={year} value={year}>
                              {year}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.universityYear && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.universityYear}
                        </p>
                      )}
                    </div>
                  </>
                )}
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
