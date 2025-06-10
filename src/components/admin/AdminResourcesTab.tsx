import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Plus,
  Edit,
  Trash2,
  Eye,
  Star,
  FileText,
  Play,
  Download,
  Target,
  BookOpen,
  Lightbulb,
  Clock,
  Brain,
  TrendingUp,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import {
  StudyTip,
  StudyResource,
  UserSubmittedProgram,
} from "@/types/university";
import { toast } from "sonner";

// Sample data - in real app this would come from your backend
const SAMPLE_TIPS: StudyTip[] = [
  {
    id: "tip-1",
    title: "The Pomodoro Technique for Focused Study",
    description: "Boost productivity with 25-minute focused study sessions",
    category: "time-management",
    difficulty: "beginner",
    tags: ["productivity", "focus", "time-management"],
    content: "Sample content...",
    isActive: true,
    createdAt: "2024-01-15T10:00:00Z",
    updatedAt: "2024-01-15T10:00:00Z",
  },
  // Add more sample tips...
];

const SAMPLE_RESOURCES: StudyResource[] = [
  {
    id: "resource-1",
    title: "Weekly Study Planner Template",
    description: "Comprehensive weekly planner to organize your study schedule",
    type: "template",
    category: "time-management",
    downloadUrl: "#",
    tags: ["planning", "schedule", "organization"],
    isActive: true,
    isFeatured: true,
    createdAt: "2024-01-15T10:00:00Z",
    updatedAt: "2024-01-15T10:00:00Z",
  },
  // Add more sample resources...
];

const SAMPLE_SUBMITTED_PROGRAMS: UserSubmittedProgram[] = [
  {
    id: "prog-1",
    universityId: "uj",
    universityName: "University of Johannesburg",
    facultyId: "engineering",
    facultyName: "Faculty of Engineering",
    programName: "Bachelor of Engineering in Data Science",
    duration: "4 years",
    apsRequirement: 35,
    description:
      "Interdisciplinary program combining engineering principles with data science methodologies.",
    subjects: [
      { name: "Mathematics", level: 6, isRequired: true },
      { name: "Physical Sciences", level: 5, isRequired: true },
      { name: "English", level: 4, isRequired: true },
    ],
    careerProspects: [
      "Data Engineer",
      "Machine Learning Engineer",
      "Analytics Consultant",
    ],
    submittedBy: "user-123",
    submittedAt: "2024-01-20T10:00:00Z",
    status: "pending",
  },
  // Add more sample submissions...
];

const AdminResourcesTab = () => {
  const [activeTab, setActiveTab] = useState("tips");
  const [tips, setTips] = useState<StudyTip[]>(SAMPLE_TIPS);
  const [resources, setResources] = useState<StudyResource[]>(SAMPLE_RESOURCES);
  const [submittedPrograms, setSubmittedPrograms] = useState<
    UserSubmittedProgram[]
  >(SAMPLE_SUBMITTED_PROGRAMS);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);

  // Form state for creating/editing
  const [formData, setFormData] = useState<any>({});

  const handleCreateTip = () => {
    const newTip: StudyTip = {
      id: `tip-${Date.now()}`,
      title: formData.title || "",
      description: formData.description || "",
      category: formData.category || "general",
      difficulty: formData.difficulty || "beginner",
      tags: formData.tags?.split(",").map((t: string) => t.trim()) || [],
      content: formData.content || "",
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setTips([...tips, newTip]);
    setIsCreateDialogOpen(false);
    setFormData({});
    toast.success("Study tip created successfully!");
  };

  const handleCreateResource = () => {
    const newResource: StudyResource = {
      id: `resource-${Date.now()}`,
      title: formData.title || "",
      description: formData.description || "",
      type: formData.type || "article",
      category: formData.category || "study-guides",
      url: formData.url,
      downloadUrl: formData.downloadUrl,
      tags: formData.tags?.split(",").map((t: string) => t.trim()) || [],
      isActive: true,
      isFeatured: formData.isFeatured || false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setResources([...resources, newResource]);
    setIsCreateDialogOpen(false);
    setFormData({});
    toast.success("Resource created successfully!");
  };

  const handleApproveProgram = (programId: string) => {
    setSubmittedPrograms((prev) =>
      prev.map((p) =>
        p.id === programId
          ? {
              ...p,
              status: "approved" as const,
              reviewedAt: new Date().toISOString(),
            }
          : p,
      ),
    );
    toast.success("Program approved successfully!");
  };

  const handleRejectProgram = (programId: string, reason: string) => {
    setSubmittedPrograms((prev) =>
      prev.map((p) =>
        p.id === programId
          ? {
              ...p,
              status: "rejected" as const,
              reviewedAt: new Date().toISOString(),
              reviewNotes: reason,
            }
          : p,
      ),
    );
    toast.success("Program rejected with feedback.");
  };

  const toggleTipStatus = (tipId: string) => {
    setTips((prev) =>
      prev.map((t) => (t.id === tipId ? { ...t, isActive: !t.isActive } : t)),
    );
    toast.success("Tip status updated!");
  };

  const toggleResourceStatus = (resourceId: string) => {
    setResources((prev) =>
      prev.map((r) =>
        r.id === resourceId ? { ...r, isActive: !r.isActive } : r,
      ),
    );
    toast.success("Resource status updated!");
  };

  const toggleResourceFeatured = (resourceId: string) => {
    setResources((prev) =>
      prev.map((r) =>
        r.id === resourceId ? { ...r, isFeatured: !r.isFeatured } : r,
      ),
    );
    toast.success("Resource featured status updated!");
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "pdf":
        return <FileText className="h-4 w-4" />;
      case "video":
        return <Play className="h-4 w-4" />;
      case "template":
        return <Download className="h-4 w-4" />;
      case "tool":
        return <Target className="h-4 w-4" />;
      default:
        return <BookOpen className="h-4 w-4" />;
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "time-management":
        return <Clock className="h-4 w-4" />;
      case "study-techniques":
        return <Brain className="h-4 w-4" />;
      case "exam-prep":
        return <Target className="h-4 w-4" />;
      case "motivation":
        return <TrendingUp className="h-4 w-4" />;
      default:
        return <BookOpen className="h-4 w-4" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>;
      case "approved":
        return <Badge className="bg-green-100 text-green-800">Approved</Badge>;
      case "rejected":
        return <Badge className="bg-red-100 text-red-800">Rejected</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold">Resource Management</h2>
          <p className="text-gray-600">
            Manage study tips, resources, and user-submitted programs
          </p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="tips" className="flex items-center gap-2">
            <Lightbulb className="h-4 w-4" />
            Study Tips ({tips.length})
          </TabsTrigger>
          <TabsTrigger value="resources" className="flex items-center gap-2">
            <BookOpen className="h-4 w-4" />
            Resources ({resources.length})
          </TabsTrigger>
          <TabsTrigger value="submissions" className="flex items-center gap-2">
            <AlertCircle className="h-4 w-4" />
            Program Submissions (
            {submittedPrograms.filter((p) => p.status === "pending").length})
          </TabsTrigger>
        </TabsList>

        {/* Study Tips Tab */}
        <TabsContent value="tips" className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-semibold">Study Tips</h3>
            <Dialog
              open={isCreateDialogOpen}
              onOpenChange={setIsCreateDialogOpen}
            >
              <DialogTrigger asChild>
                <Button onClick={() => setFormData({})}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Study Tip
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Create New Study Tip</DialogTitle>
                  <DialogDescription>
                    Add a new study tip to help students improve their learning.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Title
                    </label>
                    <Input
                      value={formData.title || ""}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          title: e.target.value,
                        }))
                      }
                      placeholder="Enter tip title"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Description
                    </label>
                    <Input
                      value={formData.description || ""}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          description: e.target.value,
                        }))
                      }
                      placeholder="Brief description"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Category
                      </label>
                      <Select
                        value={formData.category || ""}
                        onValueChange={(value) =>
                          setFormData((prev) => ({ ...prev, category: value }))
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="time-management">
                            Time Management
                          </SelectItem>
                          <SelectItem value="study-techniques">
                            Study Techniques
                          </SelectItem>
                          <SelectItem value="exam-prep">
                            Exam Preparation
                          </SelectItem>
                          <SelectItem value="motivation">Motivation</SelectItem>
                          <SelectItem value="general">General</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Difficulty
                      </label>
                      <Select
                        value={formData.difficulty || ""}
                        onValueChange={(value) =>
                          setFormData((prev) => ({
                            ...prev,
                            difficulty: value,
                          }))
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select difficulty" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="beginner">Beginner</SelectItem>
                          <SelectItem value="intermediate">
                            Intermediate
                          </SelectItem>
                          <SelectItem value="advanced">Advanced</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Tags (comma-separated)
                    </label>
                    <Input
                      value={formData.tags || ""}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          tags: e.target.value,
                        }))
                      }
                      placeholder="productivity, focus, time-management"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Content
                    </label>
                    <Textarea
                      value={formData.content || ""}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          content: e.target.value,
                        }))
                      }
                      placeholder="Detailed tip content..."
                      rows={8}
                    />
                  </div>
                  <div className="flex gap-3">
                    <Button onClick={handleCreateTip} className="flex-1">
                      Create Tip
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => setIsCreateDialogOpen(false)}
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Difficulty</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {tips.map((tip) => (
                    <TableRow key={tip.id}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {getCategoryIcon(tip.category)}
                          <div>
                            <div className="font-medium">{tip.title}</div>
                            <div className="text-sm text-gray-500">
                              {tip.description}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">
                          {tip.category.replace("-", " ")}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge
                          className={
                            tip.difficulty === "beginner"
                              ? "bg-green-100 text-green-800"
                              : tip.difficulty === "intermediate"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-red-100 text-red-800"
                          }
                        >
                          {tip.difficulty}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant={tip.isActive ? "default" : "secondary"}>
                          {tip.isActive ? "Active" : "Inactive"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => toggleTipStatus(tip.id)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Resources Tab */}
        <TabsContent value="resources" className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-semibold">Study Resources</h3>
            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Resource
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Create New Resource</DialogTitle>
                  <DialogDescription>
                    Add a new study resource for students.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  {/* Resource form fields similar to tips */}
                  <div className="flex gap-3">
                    <Button onClick={handleCreateResource} className="flex-1">
                      Create Resource
                    </Button>
                    <Button variant="outline">Cancel</Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Resource</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {resources.map((resource) => (
                    <TableRow key={resource.id}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {getTypeIcon(resource.type)}
                          <div>
                            <div className="font-medium flex items-center gap-2">
                              {resource.title}
                              {resource.isFeatured && (
                                <Star className="h-4 w-4 text-yellow-500" />
                              )}
                            </div>
                            <div className="text-sm text-gray-500">
                              {resource.description}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{resource.type}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">
                          {resource.category.replace("-", " ")}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          <Badge
                            variant={
                              resource.isActive ? "default" : "secondary"
                            }
                          >
                            {resource.isActive ? "Active" : "Inactive"}
                          </Badge>
                          {resource.isFeatured && (
                            <Badge className="bg-yellow-100 text-yellow-800">
                              Featured
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => toggleResourceFeatured(resource.id)}
                          >
                            <Star className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => toggleResourceStatus(resource.id)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Program Submissions Tab */}
        <TabsContent value="submissions" className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-semibold">User Program Submissions</h3>
            <Badge className="bg-yellow-100 text-yellow-800">
              {submittedPrograms.filter((p) => p.status === "pending").length}{" "}
              Pending Review
            </Badge>
          </div>

          <div className="grid gap-6">
            {submittedPrograms.map((program) => (
              <Card key={program.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">
                        {program.programName}
                      </CardTitle>
                      <CardDescription>
                        {program.universityName} - {program.facultyName}
                      </CardDescription>
                    </div>
                    {getStatusBadge(program.status)}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <strong>Duration:</strong> {program.duration}
                    </div>
                    <div>
                      <strong>APS Requirement:</strong> {program.apsRequirement}
                    </div>
                  </div>

                  <div className="mb-4">
                    <strong>Description:</strong>
                    <p className="text-gray-600 mt-1">{program.description}</p>
                  </div>

                  <div className="mb-4">
                    <strong>Subject Requirements:</strong>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {program.subjects.map((subject, index) => (
                        <Badge key={index} variant="outline">
                          {subject.name} (Level {subject.level})
                          {subject.isRequired && (
                            <span className="text-red-500">*</span>
                          )}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="mb-4">
                    <strong>Career Prospects:</strong>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {program.careerProspects.map((career, index) => (
                        <Badge key={index} variant="secondary">
                          {career}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="text-sm text-gray-500 mb-4">
                    Submitted on{" "}
                    {new Date(program.submittedAt).toLocaleDateString()}
                  </div>

                  {program.status === "pending" && (
                    <div className="flex gap-3">
                      <Button
                        onClick={() => handleApproveProgram(program.id!)}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Approve
                      </Button>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="outline"
                            className="border-red-300 text-red-600"
                          >
                            Reject
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Reject Program Submission</DialogTitle>
                            <DialogDescription>
                              Please provide a reason for rejecting this program
                              submission.
                            </DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4">
                            <Textarea
                              placeholder="Reason for rejection..."
                              rows={4}
                            />
                            <div className="flex gap-3">
                              <Button
                                variant="destructive"
                                onClick={() =>
                                  handleRejectProgram(
                                    program.id!,
                                    "Sample rejection reason",
                                  )
                                }
                              >
                                Reject Program
                              </Button>
                              <Button variant="outline">Cancel</Button>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
                  )}

                  {program.reviewNotes && (
                    <Alert className="mt-4">
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>
                        <strong>Review Notes:</strong> {program.reviewNotes}
                      </AlertDescription>
                    </Alert>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminResourcesTab;
