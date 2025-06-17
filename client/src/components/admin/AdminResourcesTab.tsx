
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import { StudyTip, StudyResource } from "@/types/university";
import {
  Lightbulb,
  BookOpen,
  Plus,
  Save,
  X,
} from "lucide-react";

interface AdminResourcesTabProps {
  className?: string;
}

const AdminResourcesTab = ({ className }: AdminResourcesTabProps) => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<"resources" | "tips">("resources");
  const [isCreating, setIsCreating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedItem, setSelectedItem] = useState<
    StudyResource | StudyTip | null
  >(null);
  const [formData, setFormData] = useState<Partial<StudyResource & StudyTip>>({
    title: "",
    description: "",
    type: "pdf",
    category: "",
    difficulty: "Beginner",
    url: "",
    rating: 0,
    provider: "",
    duration: "",
    tags: [],
    downloadUrl: "",
    isActive: true,
    isFeatured: false,
    isSponsored: false,
    sponsorName: "",
    sponsorLogo: "",
    sponsorUrl: "",
    sponsorCta: "",
    content: "",
    author: "",
    estimatedTime: "",
    effectiveness: 0,
  });

  // Reset form data
  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      type: "pdf",
      category: "",
      difficulty: "Beginner",
      url: "",
      rating: 0,
      provider: "",
      duration: "",
      tags: [],
      downloadUrl: "",
      isActive: true,
      isFeatured: false,
      isSponsored: false,
      sponsorName: "",
      sponsorLogo: "",
      sponsorUrl: "",
      sponsorCta: "",
      content: "",
      author: "",
      estimatedTime: "",
      effectiveness: 0,
    });
  };

  // Handle input changes
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle select changes
  const handleSelectChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });
  };

  // Handle switch changes
  const handleSwitchChange = (name: string, checked: boolean) => {
    setFormData({ ...formData, [name]: checked });
  };

  // Handle tags change - convert string to array
  const handleTagsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const tagsString = e.target.value;
    const tagsArray = tagsString.split(",").map((tag: string) => tag.trim()).filter((tag: string) => tag.length > 0);
    setFormData({ ...formData, tags: tagsArray });
  };

  // Get tags as string for display
  const getTagsAsString = () => {
    if (Array.isArray(formData.tags)) {
      return formData.tags.join(", ");
    }
    return "";
  };

  // Handle create item
  const handleCreateItem = async () => {
    setIsCreating(true);
    try {
      if (activeTab === "resources") {
        // Create study resource with proper typing
        const resourceData = {
          title: formData.title || "",
          description: formData.description || "",
          type: formData.type as "pdf" | "video" | "website" | "tool" | "course",
          category: formData.category || "",
          difficulty: formData.difficulty as "Beginner" | "Intermediate" | "Advanced",
          url: formData.url || "",
          rating: formData.rating || 0,
          provider: formData.provider || "",
          duration: formData.duration || "",
          tags: formData.tags || [],
          downloadUrl: formData.downloadUrl || "",
          isActive: formData.isActive || false,
          isFeatured: formData.isFeatured || false,
          isSponsored: formData.isSponsored || false,
          sponsorName: formData.sponsorName || "",
          sponsorLogo: formData.sponsorLogo || "",
          sponsorUrl: formData.sponsorUrl || "",
          sponsorCta: formData.sponsorCta || "",
        };

        console.log("Creating study resource:", resourceData);
        toast({
          title: "Success",
          description: "Study resource created successfully.",
        });
      } else {
        // Create study tip with proper typing
        const tipData = {
          title: formData.title || "",
          description: formData.description || "",
          category: formData.category || "",
          difficulty: formData.difficulty as "Beginner" | "Intermediate" | "Advanced",
          estimatedTime: formData.estimatedTime || "",
          effectiveness: formData.effectiveness || 0,
          tags: formData.tags || [],
          content: formData.content || "",
          author: formData.author || "",
          isActive: formData.isActive || false,
          isSponsored: formData.isSponsored || false,
          sponsorName: formData.sponsorName || "",
          sponsorLogo: formData.sponsorLogo || "",
          sponsorUrl: formData.sponsorUrl || "",
          sponsorCta: formData.sponsorCta || "",
        };

        console.log("Creating study tip:", tipData);
        toast({
          title: "Success",
          description: "Study tip created successfully.",
        });
      }
      resetForm();
    } catch (error) {
      console.error("Error creating item:", error);
      toast({
        title: "Error",
        description: "Failed to create item.",
        variant: "destructive",
      });
    } finally {
      setIsCreating(false);
    }
  };

  // Handle edit item
  const handleEditItem = (item: StudyResource | StudyTip) => {
    setSelectedItem(item);
    setIsEditing(true);

    setFormData({
      id: item.id,
      title: item.title,
      description: item.description,
      category: item.category,
      difficulty: item.difficulty,
      tags: item.tags || [],
      isActive: item.isActive,
      isSponsored: item.isSponsored,
      sponsorName: item.sponsorName,
      sponsorLogo: item.sponsorLogo,
      sponsorUrl: item.sponsorUrl,
      sponsorCta: item.sponsorCta,
      // Type-specific fields
      ...(activeTab === "resources" && {
        type: (item as StudyResource).type,
        url: (item as StudyResource).url,
        rating: (item as StudyResource).rating,
        provider: (item as StudyResource).provider,
        duration: (item as StudyResource).duration,
        downloadUrl: (item as StudyResource).downloadUrl,
        isFeatured: (item as StudyResource).isFeatured,
      }),
      ...(activeTab === "tips" && {
        content: (item as StudyTip).content,
        author: (item as StudyTip).author,
        estimatedTime: (item as StudyTip).estimatedTime,
        effectiveness: (item as StudyTip).effectiveness,
      }),
    });
  };

  // Handle update item
  const handleUpdateItem = async () => {
    if (!selectedItem?.id) {
      toast({
        title: "Error",
        description: "No item selected for update.",
        variant: "destructive",
      });
      return;
    }

    setIsCreating(true);
    try {
      console.log("Updating item:", formData);
      toast({
        title: "Success",
        description: `Study ${activeTab === "resources" ? "resource" : "tip"} updated successfully.`,
      });
      resetForm();
      setIsEditing(false);
      setSelectedItem(null);
    } catch (error) {
      console.error("Error updating item:", error);
      toast({
        title: "Error",
        description: "Failed to update item.",
        variant: "destructive",
      });
    } finally {
      setIsCreating(false);
    }
  };

  // Cancel edit
  const handleCancelEdit = () => {
    setIsEditing(false);
    setSelectedItem(null);
    resetForm();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <Button
          variant={activeTab === "resources" ? "default" : "outline"}
          onClick={() => setActiveTab("resources")}
        >
          <BookOpen className="mr-2 h-4 w-4" />
          Study Resources
        </Button>
        <Button
          variant={activeTab === "tips" ? "default" : "outline"}
          onClick={() => setActiveTab("tips")}
        >
          <Lightbulb className="mr-2 h-4 w-4" />
          Study Tips
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>
            {isEditing ? "Edit Item" : "Create New"}{" "}
            {activeTab === "resources" ? "Resource" : "Tip"}
          </CardTitle>
          <CardDescription>
            {isEditing
              ? "Update the details of the selected item."
              : "Add a new study resource or tip to the platform."}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                name="title"
                placeholder="Enter title"
                value={formData.title || ""}
                onChange={handleInputChange}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Input
                id="category"
                name="category"
                placeholder="Enter category"
                value={formData.category || ""}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="difficulty">Difficulty</Label>
              <Select
                value={formData.difficulty || "Beginner"}
                onValueChange={(value) =>
                  handleSelectChange("difficulty", value)
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select difficulty" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Beginner">Beginner</SelectItem>
                  <SelectItem value="Intermediate">Intermediate</SelectItem>
                  <SelectItem value="Advanced">Advanced</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {activeTab === "resources" && (
              <div className="space-y-2">
                <Label htmlFor="type">Type</Label>
                <Select
                  value={formData.type || "pdf"}
                  onValueChange={(value) => handleSelectChange("type", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pdf">PDF</SelectItem>
                    <SelectItem value="video">Video</SelectItem>
                    <SelectItem value="website">Website</SelectItem>
                    <SelectItem value="tool">Tool</SelectItem>
                    <SelectItem value="course">Course</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>

          {activeTab === "resources" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="url">URL</Label>
                <Input
                  id="url"
                  name="url"
                  placeholder="Enter URL"
                  value={formData.url || ""}
                  onChange={handleInputChange}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="downloadUrl">Download URL</Label>
                <Input
                  id="downloadUrl"
                  name="downloadUrl"
                  placeholder="Enter Download URL"
                  value={formData.downloadUrl || ""}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          )}

          {activeTab === "tips" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="estimatedTime">Estimated Time</Label>
                <Input
                  id="estimatedTime"
                  name="estimatedTime"
                  placeholder="Enter estimated time"
                  value={formData.estimatedTime || ""}
                  onChange={handleInputChange}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="effectiveness">Effectiveness (0-100)</Label>
                <Input
                  id="effectiveness"
                  name="effectiveness"
                  type="number"
                  placeholder="Enter effectiveness"
                  value={formData.effectiveness || 0}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="tags">Tags (comma separated)</Label>
            <Input
              id="tags"
              name="tags"
              placeholder="Enter tags"
              value={getTagsAsString()}
              onChange={handleTagsChange}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              placeholder="Enter description"
              value={formData.description || ""}
              onChange={handleInputChange}
            />
          </div>

          {activeTab === "tips" && (
            <div className="space-y-2">
              <Label htmlFor="content">Content</Label>
              <Textarea
                id="content"
                name="content"
                placeholder="Enter content"
                value={formData.content || ""}
                onChange={handleInputChange}
                className="min-h-[100px]"
              />
            </div>
          )}

          <Separator />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="isActive">Active</Label>
              <Switch
                id="isActive"
                name="isActive"
                checked={formData.isActive || false}
                onCheckedChange={(checked) =>
                  handleSwitchChange("isActive", checked)
                }
              />
            </div>

            {activeTab === "resources" && (
              <div className="space-y-2">
                <Label htmlFor="isFeatured">Featured</Label>
                <Switch
                  id="isFeatured"
                  name="isFeatured"
                  checked={formData.isFeatured || false}
                  onCheckedChange={(checked) =>
                    handleSwitchChange("isFeatured", checked)
                  }
                />
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="isSponsored">Sponsored</Label>
              <Switch
                id="isSponsored"
                name="isSponsored"
                checked={formData.isSponsored || false}
                onCheckedChange={(checked) =>
                  handleSwitchChange("isSponsored", checked)
                }
              />
            </div>
          </div>

          {formData.isSponsored && (
            <>
              <Separator />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="sponsorName">Sponsor Name</Label>
                  <Input
                    id="sponsorName"
                    name="sponsorName"
                    placeholder="Enter sponsor name"
                    value={formData.sponsorName || ""}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="sponsorLogo">Sponsor Logo URL</Label>
                  <Input
                    id="sponsorLogo"
                    name="sponsorLogo"
                    placeholder="Enter sponsor logo URL"
                    value={formData.sponsorLogo || ""}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="sponsorUrl">Sponsor URL</Label>
                  <Input
                    id="sponsorUrl"
                    name="sponsorUrl"
                    placeholder="Enter sponsor URL"
                    value={formData.sponsorUrl || ""}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="sponsorCta">Sponsor CTA Text</Label>
                  <Input
                    id="sponsorCta"
                    name="sponsorCta"
                    placeholder="Enter sponsor CTA text"
                    value={formData.sponsorCta || ""}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </>
          )}

          <div className="flex justify-end space-x-2">
            {isEditing ? (
              <>
                <Button
                  variant="ghost"
                  onClick={handleCancelEdit}
                  disabled={isCreating}
                >
                  <X className="mr-2 h-4 w-4" />
                  Cancel
                </Button>
                <Button onClick={handleUpdateItem} disabled={isCreating}>
                  <Save className="mr-2 h-4 w-4" />
                  {isCreating ? "Updating..." : "Update Item"}
                </Button>
              </>
            ) : (
              <Button onClick={handleCreateItem} disabled={isCreating}>
                <Plus className="mr-2 h-4 w-4" />
                {isCreating ? "Creating..." : "Create Item"}
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>
            Existing {activeTab === "resources" ? "Resources" : "Tips"}
          </CardTitle>
          <CardDescription>
            Manage and edit existing study resources and tips.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            This section will display a list of existing study resources or tips
            from the database, with options to edit or delete them.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminResourcesTab;
