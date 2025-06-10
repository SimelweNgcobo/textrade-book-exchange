import { useState, useEffect } from "react";
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
  Save,
  X,
  MoreHorizontal,
  Filter,
  Search,
} from "lucide-react";
import {
  StudyTip,
  StudyResource,
  UserSubmittedProgram,
} from "@/types/university";
import { toast } from "sonner";

// Initial data - in real app this would come from your backend
const INITIAL_TIPS: StudyTip[] = [
  {
    id: "tip-1",
    title: "The Pomodoro Technique for Focused Study",
    description: "Boost productivity with 25-minute focused study sessions",
    category: "time-management",
    difficulty: "beginner",
    tags: ["productivity", "focus", "time-management"],
    content: "The Pomodoro Technique is a time management method...",
    isActive: true,
    createdAt: "2024-01-15T10:00:00Z",
    updatedAt: "2024-01-15T10:00:00Z",
  },
  {
    id: "tip-2",
    title: "Active Reading Strategies",
    description: "Transform passive reading into active learning",
    category: "study-techniques",
    difficulty: "intermediate",
    tags: ["reading", "comprehension", "notes"],
    content: "Active reading involves engaging with the text...",
    isActive: true,
    createdAt: "2024-01-16T10:00:00Z",
    updatedAt: "2024-01-16T10:00:00Z",
  },
];

const INITIAL_RESOURCES: StudyResource[] = [
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
  {
    id: "resource-2",
    title: "Mathematics Formula Sheet",
    description: "Essential formulas for Grades 10-12",
    type: "pdf",
    category: "study-guides",
    downloadUrl: "#",
    tags: ["mathematics", "formulas", "reference"],
    isActive: true,
    isFeatured: false,
    createdAt: "2024-01-16T10:00:00Z",
    updatedAt: "2024-01-16T10:00:00Z",
  },
];

const INITIAL_PROGRAMS: UserSubmittedProgram[] = [
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
];

const AdminResourcesTab = () => {
  const [activeTab, setActiveTab] = useState("tips");
  const [tips, setTips] = useState<StudyTip[]>(INITIAL_TIPS);
  const [resources, setResources] =
    useState<StudyResource[]>(INITIAL_RESOURCES);
  const [submittedPrograms, setSubmittedPrograms] =
    useState<UserSubmittedProgram[]>(INITIAL_PROGRAMS);

  // Dialog states
  const [isCreateTipOpen, setIsCreateTipOpen] = useState(false);
  const [isCreateResourceOpen, setIsCreateResourceOpen] = useState(false);
  const [editingTip, setEditingTip] = useState<StudyTip | null>(null);
  const [editingResource, setEditingResource] = useState<StudyResource | null>(
    null,
  );

  // Search and filter states
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");

  // Form states
  const [tipForm, setTipForm] = useState<Partial<StudyTip>>({
    title: "",
    description: "",
    category: "general",
    difficulty: "beginner",
    tags: [],
    content: "",
  });

  const [resourceForm, setResourceForm] = useState<Partial<StudyResource>>({
    title: "",
    description: "",
    type: "pdf",
    category: "study-guides",
    url: "",
    downloadUrl: "",
    tags: [],
    isFeatured: false,
  });

  // Handle tip creation
  const handleCreateTip = () => {
    if (!tipForm.title || !tipForm.description || !tipForm.content) {
      toast.error("Please fill in all required fields");
      return;
    }

    const newTip: StudyTip = {
      id: `tip-${Date.now()}`,
      title: tipForm.title!,
      description: tipForm.description!,
      category: tipForm.category as StudyTip["category"],
      difficulty: tipForm.difficulty as StudyTip["difficulty"],
      tags:
        typeof tipForm.tags === "string"
          ? tipForm.tags.split(",").map((t) => t.trim())
          : tipForm.tags || [],
      content: tipForm.content!,
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setTips([...tips, newTip]);
    setIsCreateTipOpen(false);
    setTipForm({
      title: "",
      description: "",
      category: "general",
      difficulty: "beginner",
      tags: [],
      content: "",
    });
    toast.success("Study tip created successfully!");
  };

  // Handle resource creation
  const handleCreateResource = () => {
    if (!resourceForm.title || !resourceForm.description) {
      toast.error("Please fill in all required fields");
      return;
    }

    const newResource: StudyResource = {
      id: `resource-${Date.now()}`,
      title: resourceForm.title!,
      description: resourceForm.description!,
      type: resourceForm.type as StudyResource["type"],
      category: resourceForm.category as StudyResource["category"],
      url: resourceForm.url,
      downloadUrl: resourceForm.downloadUrl,
      tags:
        typeof resourceForm.tags === "string"
          ? resourceForm.tags.split(",").map((t) => t.trim())
          : resourceForm.tags || [],
      isActive: true,
      isFeatured: resourceForm.isFeatured || false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setResources([...resources, newResource]);
    setIsCreateResourceOpen(false);
    setResourceForm({
      title: "",
      description: "",
      type: "pdf",
      category: "study-guides",
      url: "",
      downloadUrl: "",
      tags: [],
      isFeatured: false,
    });
    toast.success("Resource created successfully!");
  };

  // Handle tip editing
  const handleEditTip = (tip: StudyTip) => {
    setEditingTip(tip);
    setTipForm({
      ...tip,
      tags: tip.tags.join(", "),
    });
    setIsCreateTipOpen(true);
  };

  const handleUpdateTip = () => {
    if (
      !editingTip ||
      !tipForm.title ||
      !tipForm.description ||
      !tipForm.content
    ) {
      toast.error("Please fill in all required fields");
      return;
    }

    const updatedTip: StudyTip = {
      ...editingTip,
      title: tipForm.title!,
      description: tipForm.description!,
      category: tipForm.category as StudyTip["category"],
      difficulty: tipForm.difficulty as StudyTip["difficulty"],
      tags:
        typeof tipForm.tags === "string"
          ? tipForm.tags.split(",").map((t) => t.trim())
          : tipForm.tags || [],
      content: tipForm.content!,
      updatedAt: new Date().toISOString(),
    };

    setTips(tips.map((t) => (t.id === editingTip.id ? updatedTip : t)));
    setIsCreateTipOpen(false);
    setEditingTip(null);
    setTipForm({
      title: "",
      description: "",
      category: "general",
      difficulty: "beginner",
      tags: [],
      content: "",
    });
    toast.success("Study tip updated successfully!");
  };

  // Other handlers
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
      prev.map((t) =>
        t.id === tipId
          ? { ...t, isActive: !t.isActive, updatedAt: new Date().toISOString() }
          : t,
      ),
    );
    toast.success("Tip status updated!");
  };

  const toggleResourceStatus = (resourceId: string) => {
    setResources((prev) =>
      prev.map((r) =>
        r.id === resourceId
          ? { ...r, isActive: !r.isActive, updatedAt: new Date().toISOString() }
          : r,
      ),
    );
    toast.success("Resource status updated!");
  };

  const toggleResourceFeatured = (resourceId: string) => {
    setResources((prev) =>
      prev.map((r) =>
        r.id === resourceId
          ? {
              ...r,
              isFeatured: !r.isFeatured,
              updatedAt: new Date().toISOString(),
            }
          : r,
      ),
    );
    toast.success("Resource featured status updated!");
  };

  const deleteTip = (tipId: string) => {
    if (confirm("Are you sure you want to delete this tip?")) {
      setTips(tips.filter((t) => t.id !== tipId));
      toast.success("Tip deleted successfully!");
    }
  };

  const deleteResource = (resourceId: string) => {
    if (confirm("Are you sure you want to delete this resource?")) {
      setResources(resources.filter((r) => r.id !== resourceId));
      toast.success("Resource deleted successfully!");
    }
  };

  // Filtering
  const filteredTips = tips.filter((tip) => {
    const matchesSearch =
      tip.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tip.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      filterCategory === "all" || tip.category === filterCategory;
    const matchesStatus =
      filterStatus === "all" ||
      (filterStatus === "active" && tip.isActive) ||
      (filterStatus === "inactive" && !tip.isActive);

    return matchesSearch && matchesCategory && matchesStatus;
  });

  const filteredResources = resources.filter((resource) => {
    const matchesSearch =
      resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      filterCategory === "all" || resource.category === filterCategory;
    const matchesStatus =
      filterStatus === "all" ||
      (filterStatus === "active" && resource.isActive) ||
      (filterStatus === "inactive" && !resource.isActive);

    return matchesSearch && matchesCategory && matchesStatus;
  });

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
    <div className="space-y-4 md:space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold">
            Resource Management
          </h2>
          <p className="text-gray-600 text-sm md:text-base">
            Manage study tips, resources, and user-submitted programs
          </p>
        </div>
      </div>

      {/* Search and Filter Bar */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search resources..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <Select value={filterCategory} onValueChange={setFilterCategory}>
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="time-management">
                    Time Management
                  </SelectItem>
                  <SelectItem value="study-techniques">
                    Study Techniques
                  </SelectItem>
                  <SelectItem value="exam-prep">Exam Prep</SelectItem>
                  <SelectItem value="motivation">Motivation</SelectItem>
                  <SelectItem value="study-guides">Study Guides</SelectItem>
                </SelectContent>
              </Select>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-full sm:w-32">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger
            value="tips"
            className="flex items-center gap-1 md:gap-2 text-xs md:text-sm"
          >
            <Lightbulb className="h-3 w-3 md:h-4 md:w-4" />
            <span className="hidden sm:inline">Study Tips</span>
            <span className="sm:hidden">Tips</span>({filteredTips.length})
          </TabsTrigger>
          <TabsTrigger
            value="resources"
            className="flex items-center gap-1 md:gap-2 text-xs md:text-sm"
          >
            <BookOpen className="h-3 w-3 md:h-4 md:w-4" />
            <span className="hidden sm:inline">Resources</span>
            <span className="sm:hidden">Files</span>({filteredResources.length})
          </TabsTrigger>
          <TabsTrigger
            value="submissions"
            className="flex items-center gap-1 md:gap-2 text-xs md:text-sm"
          >
            <AlertCircle className="h-3 w-3 md:h-4 md:w-4" />
            <span className="hidden sm:inline">Submissions</span>
            <span className="sm:hidden">New</span>(
            {submittedPrograms.filter((p) => p.status === "pending").length})
          </TabsTrigger>
        </TabsList>

        {/* Study Tips Tab */}
        <TabsContent value="tips" className="space-y-4 md:space-y-6">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
            <h3 className="text-lg md:text-xl font-semibold">Study Tips</h3>
            <Dialog open={isCreateTipOpen} onOpenChange={setIsCreateTipOpen}>
              <DialogTrigger asChild>
                <Button
                  onClick={() => {
                    setEditingTip(null);
                    setTipForm({
                      title: "",
                      description: "",
                      category: "general",
                      difficulty: "beginner",
                      tags: [],
                      content: "",
                    });
                  }}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  <span className="hidden sm:inline">Add Study Tip</span>
                  <span className="sm:hidden">Add</span>
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>
                    {editingTip ? "Edit Study Tip" : "Create New Study Tip"}
                  </DialogTitle>
                  <DialogDescription>
                    {editingTip
                      ? "Update the study tip information."
                      : "Add a new study tip to help students improve their learning."}
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Title *
                    </label>
                    <Input
                      value={tipForm.title || ""}
                      onChange={(e) =>
                        setTipForm((prev) => ({
                          ...prev,
                          title: e.target.value,
                        }))
                      }
                      placeholder="Enter tip title"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Description *
                    </label>
                    <Input
                      value={tipForm.description || ""}
                      onChange={(e) =>
                        setTipForm((prev) => ({
                          ...prev,
                          description: e.target.value,
                        }))
                      }
                      placeholder="Brief description"
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Category
                      </label>
                      <Select
                        value={tipForm.category || ""}
                        onValueChange={(value) =>
                          setTipForm((prev) => ({
                            ...prev,
                            category: value as StudyTip["category"],
                          }))
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
                        value={tipForm.difficulty || ""}
                        onValueChange={(value) =>
                          setTipForm((prev) => ({
                            ...prev,
                            difficulty: value as StudyTip["difficulty"],
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
                      value={
                        typeof tipForm.tags === "string"
                          ? tipForm.tags
                          : tipForm.tags?.join(", ") || ""
                      }
                      onChange={(e) =>
                        setTipForm((prev) => ({
                          ...prev,
                          tags: e.target.value,
                        }))
                      }
                      placeholder="productivity, focus, time-management"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Content *
                    </label>
                    <Textarea
                      value={tipForm.content || ""}
                      onChange={(e) =>
                        setTipForm((prev) => ({
                          ...prev,
                          content: e.target.value,
                        }))
                      }
                      placeholder="Detailed tip content..."
                      rows={8}
                    />
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button
                      onClick={editingTip ? handleUpdateTip : handleCreateTip}
                      className="flex-1"
                    >
                      <Save className="h-4 w-4 mr-2" />
                      {editingTip ? "Update Tip" : "Create Tip"}
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setIsCreateTipOpen(false);
                        setEditingTip(null);
                      }}
                    >
                      <X className="h-4 w-4 mr-2" />
                      Cancel
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="min-w-[250px]">Title</TableHead>
                      <TableHead className="hidden md:table-cell">
                        Category
                      </TableHead>
                      <TableHead className="hidden lg:table-cell">
                        Difficulty
                      </TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="w-[120px]">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredTips.map((tip) => (
                      <TableRow key={tip.id}>
                        <TableCell>
                          <div className="flex items-start gap-2">
                            {getCategoryIcon(tip.category)}
                            <div className="min-w-0">
                              <div className="font-medium text-sm truncate">
                                {tip.title}
                              </div>
                              <div className="text-xs text-gray-500 line-clamp-2">
                                {tip.description}
                              </div>
                              <div className="flex flex-wrap gap-1 mt-1 md:hidden">
                                <Badge variant="outline" className="text-xs">
                                  {tip.category.replace("-", " ")}
                                </Badge>
                                <Badge
                                  className={`text-xs ${
                                    tip.difficulty === "beginner"
                                      ? "bg-green-100 text-green-800"
                                      : tip.difficulty === "intermediate"
                                        ? "bg-yellow-100 text-yellow-800"
                                        : "bg-red-100 text-red-800"
                                  }`}
                                >
                                  {tip.difficulty}
                                </Badge>
                              </div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          <Badge variant="outline" className="text-xs">
                            {tip.category.replace("-", " ")}
                          </Badge>
                        </TableCell>
                        <TableCell className="hidden lg:table-cell">
                          <Badge
                            className={`text-xs ${
                              tip.difficulty === "beginner"
                                ? "bg-green-100 text-green-800"
                                : tip.difficulty === "intermediate"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-red-100 text-red-800"
                            }`}
                          >
                            {tip.difficulty}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={tip.isActive ? "default" : "secondary"}
                            className="text-xs"
                          >
                            {tip.isActive ? "Active" : "Inactive"}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-1">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleEditTip(tip)}
                            >
                              <Edit className="h-3 w-3" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => toggleTipStatus(tip.id)}
                            >
                              <Eye className="h-3 w-3" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => deleteTip(tip.id)}
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Resources Tab */}
        <TabsContent value="resources" className="space-y-4 md:space-y-6">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
            <h3 className="text-lg md:text-xl font-semibold">
              Study Resources
            </h3>
            <Dialog
              open={isCreateResourceOpen}
              onOpenChange={setIsCreateResourceOpen}
            >
              <DialogTrigger asChild>
                <Button
                  onClick={() => {
                    setEditingResource(null);
                    setResourceForm({
                      title: "",
                      description: "",
                      type: "pdf",
                      category: "study-guides",
                      url: "",
                      downloadUrl: "",
                      tags: [],
                      isFeatured: false,
                    });
                  }}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  <span className="hidden sm:inline">Add Resource</span>
                  <span className="sm:hidden">Add</span>
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Create New Resource</DialogTitle>
                  <DialogDescription>
                    Add a new study resource for students.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Title *
                    </label>
                    <Input
                      value={resourceForm.title || ""}
                      onChange={(e) =>
                        setResourceForm((prev) => ({
                          ...prev,
                          title: e.target.value,
                        }))
                      }
                      placeholder="Enter resource title"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Description *
                    </label>
                    <Textarea
                      value={resourceForm.description || ""}
                      onChange={(e) =>
                        setResourceForm((prev) => ({
                          ...prev,
                          description: e.target.value,
                        }))
                      }
                      placeholder="Brief description"
                      rows={3}
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Type
                      </label>
                      <Select
                        value={resourceForm.type || ""}
                        onValueChange={(value) =>
                          setResourceForm((prev) => ({
                            ...prev,
                            type: value as StudyResource["type"],
                          }))
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pdf">PDF Document</SelectItem>
                          <SelectItem value="video">Video</SelectItem>
                          <SelectItem value="template">Template</SelectItem>
                          <SelectItem value="tool">Tool</SelectItem>
                          <SelectItem value="article">Article</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Category
                      </label>
                      <Select
                        value={resourceForm.category || ""}
                        onValueChange={(value) =>
                          setResourceForm((prev) => ({
                            ...prev,
                            category: value as StudyResource["category"],
                          }))
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="study-guides">
                            Study Guides
                          </SelectItem>
                          <SelectItem value="time-management">
                            Time Management
                          </SelectItem>
                          <SelectItem value="exam-prep">Exam Prep</SelectItem>
                          <SelectItem value="research">Research</SelectItem>
                          <SelectItem value="presentations">
                            Presentations
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      URL (for videos/online resources)
                    </label>
                    <Input
                      value={resourceForm.url || ""}
                      onChange={(e) =>
                        setResourceForm((prev) => ({
                          ...prev,
                          url: e.target.value,
                        }))
                      }
                      placeholder="https://example.com/resource"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Download URL (for files)
                    </label>
                    <Input
                      value={resourceForm.downloadUrl || ""}
                      onChange={(e) =>
                        setResourceForm((prev) => ({
                          ...prev,
                          downloadUrl: e.target.value,
                        }))
                      }
                      placeholder="https://example.com/download"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Tags (comma-separated)
                    </label>
                    <Input
                      value={
                        typeof resourceForm.tags === "string"
                          ? resourceForm.tags
                          : resourceForm.tags?.join(", ") || ""
                      }
                      onChange={(e) =>
                        setResourceForm((prev) => ({
                          ...prev,
                          tags: e.target.value,
                        }))
                      }
                      placeholder="mathematics, formulas, reference"
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="featured"
                      checked={resourceForm.isFeatured || false}
                      onChange={(e) =>
                        setResourceForm((prev) => ({
                          ...prev,
                          isFeatured: e.target.checked,
                        }))
                      }
                    />
                    <label htmlFor="featured" className="text-sm font-medium">
                      Featured Resource
                    </label>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button onClick={handleCreateResource} className="flex-1">
                      <Save className="h-4 w-4 mr-2" />
                      Create Resource
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => setIsCreateResourceOpen(false)}
                    >
                      <X className="h-4 w-4 mr-2" />
                      Cancel
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="min-w-[250px]">Resource</TableHead>
                      <TableHead className="hidden md:table-cell">
                        Type
                      </TableHead>
                      <TableHead className="hidden lg:table-cell">
                        Category
                      </TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="w-[140px]">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredResources.map((resource) => (
                      <TableRow key={resource.id}>
                        <TableCell>
                          <div className="flex items-start gap-2">
                            {getTypeIcon(resource.type)}
                            <div className="min-w-0">
                              <div className="font-medium text-sm flex items-center gap-2">
                                <span className="truncate">
                                  {resource.title}
                                </span>
                                {resource.isFeatured && (
                                  <Star className="h-3 w-3 text-yellow-500 flex-shrink-0" />
                                )}
                              </div>
                              <div className="text-xs text-gray-500 line-clamp-2">
                                {resource.description}
                              </div>
                              <div className="flex flex-wrap gap-1 mt-1 md:hidden">
                                <Badge variant="outline" className="text-xs">
                                  {resource.type}
                                </Badge>
                                <Badge variant="outline" className="text-xs">
                                  {resource.category.replace("-", " ")}
                                </Badge>
                              </div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          <Badge variant="outline" className="text-xs">
                            {resource.type}
                          </Badge>
                        </TableCell>
                        <TableCell className="hidden lg:table-cell">
                          <Badge variant="outline" className="text-xs">
                            {resource.category.replace("-", " ")}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-col gap-1">
                            <Badge
                              variant={
                                resource.isActive ? "default" : "secondary"
                              }
                              className="text-xs"
                            >
                              {resource.isActive ? "Active" : "Inactive"}
                            </Badge>
                            {resource.isFeatured && (
                              <Badge className="bg-yellow-100 text-yellow-800 text-xs">
                                Featured
                              </Badge>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-1">
                            <Button variant="outline" size="sm">
                              <Edit className="h-3 w-3" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() =>
                                toggleResourceFeatured(resource.id)
                              }
                            >
                              <Star className="h-3 w-3" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => toggleResourceStatus(resource.id)}
                            >
                              <Eye className="h-3 w-3" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => deleteResource(resource.id)}
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Program Submissions Tab */}
        <TabsContent value="submissions" className="space-y-4 md:space-y-6">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
            <h3 className="text-lg md:text-xl font-semibold">
              User Program Submissions
            </h3>
            <Badge className="bg-yellow-100 text-yellow-800">
              {submittedPrograms.filter((p) => p.status === "pending").length}{" "}
              Pending Review
            </Badge>
          </div>

          <div className="grid gap-4 md:gap-6">
            {submittedPrograms.map((program) => (
              <Card key={program.id}>
                <CardHeader className="pb-3">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3">
                    <div>
                      <CardTitle className="text-base md:text-lg">
                        {program.programName}
                      </CardTitle>
                      <CardDescription className="text-sm">
                        {program.universityName} - {program.facultyName}
                      </CardDescription>
                    </div>
                    {getStatusBadge(program.status)}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <strong>Duration:</strong> {program.duration}
                    </div>
                    <div>
                      <strong>APS Requirement:</strong> {program.apsRequirement}
                    </div>
                  </div>

                  <div>
                    <strong className="text-sm">Description:</strong>
                    <p className="text-gray-600 mt-1 text-sm">
                      {program.description}
                    </p>
                  </div>

                  <div>
                    <strong className="text-sm">Subject Requirements:</strong>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {program.subjects.map((subject, index) => (
                        <Badge
                          key={index}
                          variant="outline"
                          className="text-xs"
                        >
                          {subject.name} (Level {subject.level})
                          {subject.isRequired && (
                            <span className="text-red-500 ml-1">*</span>
                          )}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <strong className="text-sm">Career Prospects:</strong>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {program.careerProspects.map((career, index) => (
                        <Badge
                          key={index}
                          variant="secondary"
                          className="text-xs"
                        >
                          {career}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="text-xs text-gray-500">
                    Submitted on{" "}
                    {new Date(program.submittedAt).toLocaleDateString()}
                  </div>

                  {program.status === "pending" && (
                    <div className="flex flex-col sm:flex-row gap-3">
                      <Button
                        onClick={() => handleApproveProgram(program.id!)}
                        className="bg-green-600 hover:bg-green-700 w-full sm:w-auto"
                      >
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Approve
                      </Button>
                      <Button
                        variant="outline"
                        className="border-red-300 text-red-600 w-full sm:w-auto"
                        onClick={() => {
                          const reason = prompt(
                            "Please provide a reason for rejection:",
                          );
                          if (reason) handleRejectProgram(program.id!, reason);
                        }}
                      >
                        <X className="h-4 w-4 mr-2" />
                        Reject
                      </Button>
                    </div>
                  )}

                  {program.reviewNotes && (
                    <Alert className="mt-4">
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription className="text-sm">
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
