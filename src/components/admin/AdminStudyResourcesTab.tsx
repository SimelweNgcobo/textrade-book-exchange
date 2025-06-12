import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Plus,
  Edit,
  Trash2,
  BookOpen,
  Lightbulb,
  RefreshCw,
  ExternalLink,
  Star,
  Clock,
  Target,
} from "lucide-react";
import { StudyTip, StudyResource } from "@/types/university";
import {
  getAllStudyContent,
  createStudyTip,
  updateStudyTip,
  deleteStudyTip,
  createStudyResource,
  updateStudyResource,
  deleteStudyResource,
} from "@/services/admin/studyResourcesService";
import { toast } from "sonner";
import LoadingSpinner from "@/components/LoadingSpinner";

const AdminStudyResourcesTab = () => {
  const [studyTips, setStudyTips] = useState<StudyTip[]>([]);
  const [studyResources, setStudyResources] = useState<StudyResource[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingTip, setEditingTip] = useState<StudyTip | null>(null);
  const [editingResource, setEditingResource] = useState<StudyResource | null>(
    null,
  );
  const [showTipDialog, setShowTipDialog] = useState(false);
  const [showResourceDialog, setShowResourceDialog] = useState(false);

  // Form states for new/editing content
  const [tipForm, setTipForm] = useState({
    title: "",
    category: "",
    difficulty: "Beginner" as "Beginner" | "Intermediate" | "Advanced",
    estimatedTime: "",
    effectiveness: 80,
    tags: "",
    content: "",
    author: "",
  });

  const [resourceForm, setResourceForm] = useState({
    title: "",
    description: "",
    type: "website" as "pdf" | "video" | "website" | "tool" | "course",
    category: "",
    difficulty: "Beginner" as "Beginner" | "Intermediate" | "Advanced",
    url: "",
    rating: 4.5,
    provider: "",
    duration: "",
    tags: "",
  });

  // Load study content
  const loadStudyContent = async () => {
    try {
      setIsLoading(true);
      const { tips, resources } = await getAllStudyContent();
      setStudyTips(tips);
      setStudyResources(resources);
    } catch (error) {
      console.error("Error loading study content:", error);
      toast.error("Failed to load study content");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadStudyContent();
  }, []);

  // Study Tip handlers
  const handleCreateTip = async () => {
    try {
      setIsSubmitting(true);
      const newTip = await createStudyTip({
        ...tipForm,
        tags: tipForm.tags
          .split(",")
          .map((tag) => tag.trim())
          .filter(Boolean),
      });
      setStudyTips((prev) => [newTip, ...prev]);
      setShowTipDialog(false);
      resetTipForm();
      toast.success("Study tip created successfully");
    } catch (error) {
      console.error("Error creating study tip:", error);
      toast.error("Failed to create study tip");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdateTip = async () => {
    if (!editingTip) return;

    try {
      setIsSubmitting(true);
      const updatedTip = await updateStudyTip(editingTip.id, {
        ...tipForm,
        tags: tipForm.tags
          .split(",")
          .map((tag) => tag.trim())
          .filter(Boolean),
      });
      setStudyTips((prev) =>
        prev.map((tip) => (tip.id === editingTip.id ? updatedTip : tip)),
      );
      setShowTipDialog(false);
      setEditingTip(null);
      resetTipForm();
      toast.success("Study tip updated successfully");
    } catch (error) {
      console.error("Error updating study tip:", error);
      toast.error("Failed to update study tip");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteTip = async (tipId: string) => {
    if (!confirm("Are you sure you want to delete this study tip?")) return;

    try {
      await deleteStudyTip(tipId);
      setStudyTips((prev) => prev.filter((tip) => tip.id !== tipId));
      toast.success("Study tip deleted successfully");
    } catch (error) {
      console.error("Error deleting study tip:", error);
      toast.error("Failed to delete study tip");
    }
  };

  // Study Resource handlers
  const handleCreateResource = async () => {
    try {
      setIsSubmitting(true);
      const newResource = await createStudyResource({
        ...resourceForm,
        tags: resourceForm.tags
          .split(",")
          .map((tag) => tag.trim())
          .filter(Boolean),
      });
      setStudyResources((prev) => [newResource, ...prev]);
      setShowResourceDialog(false);
      resetResourceForm();
      toast.success("Study resource created successfully");
    } catch (error) {
      console.error("Error creating study resource:", error);
      toast.error("Failed to create study resource");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdateResource = async () => {
    if (!editingResource) return;

    try {
      setIsSubmitting(true);
      const updatedResource = await updateStudyResource(editingResource.id, {
        ...resourceForm,
        tags: resourceForm.tags
          .split(",")
          .map((tag) => tag.trim())
          .filter(Boolean),
      });
      setStudyResources((prev) =>
        prev.map((resource) =>
          resource.id === editingResource.id ? updatedResource : resource,
        ),
      );
      setShowResourceDialog(false);
      setEditingResource(null);
      resetResourceForm();
      toast.success("Study resource updated successfully");
    } catch (error) {
      console.error("Error updating study resource:", error);
      toast.error("Failed to update study resource");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteResource = async (resourceId: string) => {
    if (!confirm("Are you sure you want to delete this study resource?"))
      return;

    try {
      await deleteStudyResource(resourceId);
      setStudyResources((prev) =>
        prev.filter((resource) => resource.id !== resourceId),
      );
      toast.success("Study resource deleted successfully");
    } catch (error) {
      console.error("Error deleting study resource:", error);
      toast.error("Failed to delete study resource");
    }
  };

  // Form helpers
  const resetTipForm = () => {
    setTipForm({
      title: "",
      category: "",
      difficulty: "Beginner",
      estimatedTime: "",
      effectiveness: 80,
      tags: "",
      content: "",
      author: "",
    });
  };

  const resetResourceForm = () => {
    setResourceForm({
      title: "",
      description: "",
      type: "website",
      category: "",
      difficulty: "Beginner",
      url: "",
      rating: 4.5,
      provider: "",
      duration: "",
      tags: "",
    });
  };

  const openEditTip = (tip: StudyTip) => {
    setEditingTip(tip);
    setTipForm({
      title: tip.title,
      category: tip.category,
      difficulty: tip.difficulty,
      estimatedTime: tip.estimatedTime,
      effectiveness: tip.effectiveness || 80,
      tags: tip.tags?.join(", ") || "",
      content: tip.content,
      author: tip.author || "",
    });
    setShowTipDialog(true);
  };

  const openEditResource = (resource: StudyResource) => {
    setEditingResource(resource);
    setResourceForm({
      title: resource.title,
      description: resource.description,
      type: resource.type,
      category: resource.category,
      difficulty: resource.difficulty,
      url: resource.url,
      rating: resource.rating || 4.5,
      provider: resource.provider || "",
      duration: resource.duration || "",
      tags: resource.tags?.join(", ") || "",
    });
    setShowResourceDialog(true);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Study Resources Management</h2>
          <p className="text-gray-600">
            Manage study tips and resources for students
          </p>
        </div>
        <Button onClick={loadStudyContent} variant="outline" size="sm">
          <RefreshCw className="h-4 w-4 mr-2" />
          Refresh
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Lightbulb className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-2xl font-bold">{studyTips.length}</p>
                <p className="text-gray-600">Study Tips</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <BookOpen className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-2xl font-bold">{studyResources.length}</p>
                <p className="text-gray-600">Study Resources</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Target className="h-8 w-8 text-purple-600" />
              <div className="ml-4">
                <p className="text-2xl font-bold">
                  {studyTips.length + studyResources.length}
                </p>
                <p className="text-gray-600">Total Items</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="tips" className="space-y-6">
        <TabsList>
          <TabsTrigger value="tips">Study Tips</TabsTrigger>
          <TabsTrigger value="resources">Study Resources</TabsTrigger>
        </TabsList>

        <TabsContent value="tips">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Study Tips</CardTitle>
                  <CardDescription>
                    Manage study tips and learning strategies
                  </CardDescription>
                </div>
                <Dialog open={showTipDialog} onOpenChange={setShowTipDialog}>
                  <DialogTrigger asChild>
                    <Button
                      onClick={() => {
                        resetTipForm();
                        setEditingTip(null);
                      }}
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Study Tip
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>
                        {editingTip ? "Edit" : "Create"} Study Tip
                      </DialogTitle>
                      <DialogDescription>
                        {editingTip
                          ? "Update the study tip details"
                          : "Add a new study tip for students"}
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <Input
                        placeholder="Tip title"
                        value={tipForm.title}
                        onChange={(e) =>
                          setTipForm((prev) => ({
                            ...prev,
                            title: e.target.value,
                          }))
                        }
                      />
                      <div className="grid grid-cols-2 gap-4">
                        <Input
                          placeholder="Category"
                          value={tipForm.category}
                          onChange={(e) =>
                            setTipForm((prev) => ({
                              ...prev,
                              category: e.target.value,
                            }))
                          }
                        />
                        <Select
                          value={tipForm.difficulty}
                          onValueChange={(
                            value: "Beginner" | "Intermediate" | "Advanced",
                          ) =>
                            setTipForm((prev) => ({
                              ...prev,
                              difficulty: value,
                            }))
                          }
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Beginner">Beginner</SelectItem>
                            <SelectItem value="Intermediate">
                              Intermediate
                            </SelectItem>
                            <SelectItem value="Advanced">Advanced</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <Input
                          placeholder="Estimated time (e.g., 15 min)"
                          value={tipForm.estimatedTime}
                          onChange={(e) =>
                            setTipForm((prev) => ({
                              ...prev,
                              estimatedTime: e.target.value,
                            }))
                          }
                        />
                        <Input
                          type="number"
                          placeholder="Effectiveness (1-100)"
                          min="1"
                          max="100"
                          value={tipForm.effectiveness}
                          onChange={(e) =>
                            setTipForm((prev) => ({
                              ...prev,
                              effectiveness: parseInt(e.target.value) || 80,
                            }))
                          }
                        />
                      </div>
                      <Input
                        placeholder="Tags (comma-separated)"
                        value={tipForm.tags}
                        onChange={(e) =>
                          setTipForm((prev) => ({
                            ...prev,
                            tags: e.target.value,
                          }))
                        }
                      />
                      <Input
                        placeholder="Author (optional)"
                        value={tipForm.author}
                        onChange={(e) =>
                          setTipForm((prev) => ({
                            ...prev,
                            author: e.target.value,
                          }))
                        }
                      />
                      <Textarea
                        placeholder="Tip content (supports markdown)"
                        value={tipForm.content}
                        onChange={(e) =>
                          setTipForm((prev) => ({
                            ...prev,
                            content: e.target.value,
                          }))
                        }
                        rows={8}
                      />
                    </div>
                    <DialogFooter>
                      <Button
                        variant="outline"
                        onClick={() => setShowTipDialog(false)}
                      >
                        Cancel
                      </Button>
                      <Button
                        onClick={editingTip ? handleUpdateTip : handleCreateTip}
                        disabled={
                          isSubmitting || !tipForm.title || !tipForm.content
                        }
                      >
                        {isSubmitting ? (
                          <LoadingSpinner />
                        ) : editingTip ? (
                          "Update"
                        ) : (
                          "Create"
                        )}
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {studyTips.map((tip) => (
                  <div key={tip.id} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg">{tip.title}</h3>
                        <div className="flex items-center gap-2 mt-2">
                          <Badge variant="secondary">{tip.category}</Badge>
                          <Badge
                            variant={
                              tip.difficulty === "Beginner"
                                ? "default"
                                : tip.difficulty === "Intermediate"
                                  ? "secondary"
                                  : "destructive"
                            }
                          >
                            {tip.difficulty}
                          </Badge>
                          <div className="flex items-center text-sm text-gray-600">
                            <Clock className="h-3 w-3 mr-1" />
                            {tip.estimatedTime}
                          </div>
                          {tip.effectiveness && (
                            <div className="flex items-center text-sm text-gray-600">
                              <Star className="h-3 w-3 mr-1" />
                              {tip.effectiveness}%
                            </div>
                          )}
                        </div>
                        <p className="text-gray-600 mt-2 line-clamp-2">
                          {tip.content.slice(0, 150)}...
                        </p>
                        {tip.tags && tip.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1 mt-2">
                            {tip.tags.map((tag, index) => (
                              <Badge
                                key={index}
                                variant="outline"
                                className="text-xs"
                              >
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        )}
                      </div>
                      <div className="flex items-center gap-2 ml-4">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => openEditTip(tip)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDeleteTip(tip.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
                {studyTips.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    <Lightbulb className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                    <p>No study tips found. Create your first study tip!</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="resources">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Study Resources</CardTitle>
                  <CardDescription>
                    Manage external study resources and tools
                  </CardDescription>
                </div>
                <Dialog
                  open={showResourceDialog}
                  onOpenChange={setShowResourceDialog}
                >
                  <DialogTrigger asChild>
                    <Button
                      onClick={() => {
                        resetResourceForm();
                        setEditingResource(null);
                      }}
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Resource
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>
                        {editingResource ? "Edit" : "Create"} Study Resource
                      </DialogTitle>
                      <DialogDescription>
                        {editingResource
                          ? "Update the study resource details"
                          : "Add a new study resource for students"}
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <Input
                        placeholder="Resource title"
                        value={resourceForm.title}
                        onChange={(e) =>
                          setResourceForm((prev) => ({
                            ...prev,
                            title: e.target.value,
                          }))
                        }
                      />
                      <Textarea
                        placeholder="Resource description"
                        value={resourceForm.description}
                        onChange={(e) =>
                          setResourceForm((prev) => ({
                            ...prev,
                            description: e.target.value,
                          }))
                        }
                        rows={3}
                      />
                      <div className="grid grid-cols-2 gap-4">
                        <Select
                          value={resourceForm.type}
                          onValueChange={(
                            value:
                              | "pdf"
                              | "video"
                              | "website"
                              | "tool"
                              | "course",
                          ) =>
                            setResourceForm((prev) => ({
                              ...prev,
                              type: value,
                            }))
                          }
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="website">Website</SelectItem>
                            <SelectItem value="video">Video</SelectItem>
                            <SelectItem value="pdf">PDF</SelectItem>
                            <SelectItem value="tool">Tool</SelectItem>
                            <SelectItem value="course">Course</SelectItem>
                          </SelectContent>
                        </Select>
                        <Select
                          value={resourceForm.difficulty}
                          onValueChange={(
                            value: "Beginner" | "Intermediate" | "Advanced",
                          ) =>
                            setResourceForm((prev) => ({
                              ...prev,
                              difficulty: value,
                            }))
                          }
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Beginner">Beginner</SelectItem>
                            <SelectItem value="Intermediate">
                              Intermediate
                            </SelectItem>
                            <SelectItem value="Advanced">Advanced</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <Input
                        placeholder="Category"
                        value={resourceForm.category}
                        onChange={(e) =>
                          setResourceForm((prev) => ({
                            ...prev,
                            category: e.target.value,
                          }))
                        }
                      />
                      <Input
                        placeholder="URL"
                        value={resourceForm.url}
                        onChange={(e) =>
                          setResourceForm((prev) => ({
                            ...prev,
                            url: e.target.value,
                          }))
                        }
                      />
                      <div className="grid grid-cols-3 gap-4">
                        <Input
                          placeholder="Provider"
                          value={resourceForm.provider}
                          onChange={(e) =>
                            setResourceForm((prev) => ({
                              ...prev,
                              provider: e.target.value,
                            }))
                          }
                        />
                        <Input
                          placeholder="Duration"
                          value={resourceForm.duration}
                          onChange={(e) =>
                            setResourceForm((prev) => ({
                              ...prev,
                              duration: e.target.value,
                            }))
                          }
                        />
                        <Input
                          type="number"
                          placeholder="Rating (1-5)"
                          min="1"
                          max="5"
                          step="0.1"
                          value={resourceForm.rating}
                          onChange={(e) =>
                            setResourceForm((prev) => ({
                              ...prev,
                              rating: parseFloat(e.target.value) || 4.5,
                            }))
                          }
                        />
                      </div>
                      <Input
                        placeholder="Tags (comma-separated)"
                        value={resourceForm.tags}
                        onChange={(e) =>
                          setResourceForm((prev) => ({
                            ...prev,
                            tags: e.target.value,
                          }))
                        }
                      />
                    </div>
                    <DialogFooter>
                      <Button
                        variant="outline"
                        onClick={() => setShowResourceDialog(false)}
                      >
                        Cancel
                      </Button>
                      <Button
                        onClick={
                          editingResource
                            ? handleUpdateResource
                            : handleCreateResource
                        }
                        disabled={
                          isSubmitting ||
                          !resourceForm.title ||
                          !resourceForm.url
                        }
                      >
                        {isSubmitting ? (
                          <LoadingSpinner />
                        ) : editingResource ? (
                          "Update"
                        ) : (
                          "Create"
                        )}
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {studyResources.map((resource) => (
                  <div key={resource.id} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg">
                          {resource.title}
                        </h3>
                        <div className="flex items-center gap-2 mt-2">
                          <Badge variant="secondary">{resource.category}</Badge>
                          <Badge variant="outline">{resource.type}</Badge>
                          <Badge
                            variant={
                              resource.difficulty === "Beginner"
                                ? "default"
                                : resource.difficulty === "Intermediate"
                                  ? "secondary"
                                  : "destructive"
                            }
                          >
                            {resource.difficulty}
                          </Badge>
                          {resource.rating && (
                            <div className="flex items-center text-sm text-gray-600">
                              <Star className="h-3 w-3 mr-1" />
                              {resource.rating}
                            </div>
                          )}
                        </div>
                        <p className="text-gray-600 mt-2">
                          {resource.description}
                        </p>
                        <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                          {resource.provider && (
                            <span>Provider: {resource.provider}</span>
                          )}
                          {resource.duration && (
                            <span>Duration: {resource.duration}</span>
                          )}
                          <a
                            href={resource.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center text-blue-600 hover:underline"
                          >
                            <ExternalLink className="h-3 w-3 mr-1" />
                            Visit
                          </a>
                        </div>
                        {resource.tags && resource.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1 mt-2">
                            {resource.tags.map((tag, index) => (
                              <Badge
                                key={index}
                                variant="outline"
                                className="text-xs"
                              >
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        )}
                      </div>
                      <div className="flex items-center gap-2 ml-4">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => openEditResource(resource)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDeleteResource(resource.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
                {studyResources.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    <BookOpen className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                    <p>No study resources found. Create your first resource!</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminStudyResourcesTab;
