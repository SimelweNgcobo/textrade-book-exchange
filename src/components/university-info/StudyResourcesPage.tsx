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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  BookOpen,
  Clock,
  Target,
  Brain,
  Calendar,
  Download,
  Play,
  FileText,
  Lightbulb,
  TrendingUp,
  Users,
  Star,
  Search,
  Filter,
} from "lucide-react";
import { StudyTip, StudyResource } from "@/types/university";

// Sample data - in real app this would come from your backend
const STUDY_TIPS: StudyTip[] = [
  {
    id: "tip-1",
    title: "The Pomodoro Technique for Focused Study",
    description: "Boost productivity with 25-minute focused study sessions",
    category: "time-management",
    difficulty: "beginner",
    tags: ["productivity", "focus", "time-management"],
    content: `The Pomodoro Technique is a time management method that can significantly improve your study efficiency:

**How it works:**
1. Choose a task to work on
2. Set a timer for 25 minutes
3. Work on the task until the timer rings
4. Take a short 5-minute break
5. After 4 pomodoros, take a longer 15-30 minute break

**Benefits:**
- Maintains focus and concentration
- Reduces mental fatigue
- Provides regular breaks to prevent burnout
- Helps track time spent on different subjects

**Tips for success:**
- Turn off all distractions (phone, social media)
- Choose tasks that can be completed in 25 minutes
- Use the breaks to stretch, hydrate, or rest your eyes
- Track your pomodoros to identify your most productive times

This technique is especially effective for subjects that require deep concentration like mathematics, sciences, and essay writing.`,
    isActive: true,
    createdAt: "2024-01-15T10:00:00Z",
    updatedAt: "2024-01-15T10:00:00Z",
  },
  {
    id: "tip-2",
    title: "Active Reading Strategies for Better Comprehension",
    description: "Transform passive reading into active learning",
    category: "study-techniques",
    difficulty: "intermediate",
    tags: ["reading", "comprehension", "note-taking"],
    content: `Active reading involves engaging with the text to improve understanding and retention:

**Pre-reading strategies:**
- Preview the chapter headings and subheadings
- Read the summary or conclusion first
- Look at diagrams, charts, and highlighted text
- Set specific questions you want to answer

**During reading:**
- Take notes in the margins
- Summarize each section in your own words
- Ask questions about the material
- Make connections to previous knowledge
- Highlight key concepts (but don't over-highlight)

**Post-reading strategies:**
- Create a mind map of the main concepts
- Write a summary without looking at the text
- Discuss the material with classmates
- Test yourself on the key points

**Note-taking methods:**
- Cornell Note-Taking System
- Mind mapping
- Outline format
- SQ3R method (Survey, Question, Read, Recite, Review)

Active reading takes more time initially but significantly improves comprehension and retention, especially for humanities and social science subjects.`,
    isActive: true,
    createdAt: "2024-01-16T10:00:00Z",
    updatedAt: "2024-01-16T10:00:00Z",
  },
  {
    id: "tip-3",
    title: "Effective Exam Preparation Strategies",
    description:
      "Systematic approach to preparing for different types of exams",
    category: "exam-prep",
    difficulty: "intermediate",
    tags: ["exams", "preparation", "strategy"],
    content: `Effective exam preparation requires a systematic approach tailored to different exam types:

**6-8 weeks before exams:**
- Create a study timetable
- Gather all study materials
- Identify weak areas that need extra attention
- Start reviewing past exam papers

**4-6 weeks before:**
- Begin intensive revision
- Form study groups for difficult subjects
- Create summary notes and flashcards
- Practice past papers under timed conditions

**2-4 weeks before:**
- Focus on weak areas
- Memorize key formulas, dates, and concepts
- Take practice tests
- Seek help from teachers for unclear concepts

**1-2 weeks before:**
- Light revision only
- Focus on maintaining calm and confidence
- Ensure you know exam venue and times
- Prepare all necessary materials

**Different exam strategies:**

**Multiple Choice:**
- Read questions carefully
- Eliminate obviously wrong answers
- Look for keywords in questions
- Don't spend too much time on difficult questions

**Essay exams:**
- Plan your answer before writing
- Include introduction, body, and conclusion
- Support arguments with evidence
- Manage time carefully between questions

**Practical exams:**
- Practice procedures repeatedly
- Know your equipment
- Follow safety protocols
- Stay calm if something goes wrong

**Memory techniques:**
- Use mnemonics for lists and sequences
- Create visual associations
- Practice spaced repetition
- Teach concepts to others`,
    isActive: true,
    createdAt: "2024-01-17T10:00:00Z",
    updatedAt: "2024-01-17T10:00:00Z",
  },
  {
    id: "tip-4",
    title: "Creating an Effective Study Environment",
    description: "Design your study space for maximum productivity",
    category: "study-techniques",
    difficulty: "beginner",
    tags: ["environment", "productivity", "organization"],
    content: `Your study environment significantly impacts your learning effectiveness:

**Physical setup:**
- Choose a quiet, well-lit space
- Ensure comfortable seating and proper desk height
- Keep the temperature cool (around 20-22°C)
- Minimize clutter and distractions
- Have all necessary materials within reach

**Lighting and ergonomics:**
- Use natural light when possible
- Add a desk lamp for evening study
- Position your screen to avoid glare
- Take regular breaks to prevent eye strain
- Maintain good posture

**Organization systems:**
- Use folders and binders for different subjects
- Keep a calendar for deadlines and exams
- Create a filing system for notes and handouts
- Use digital tools for backing up work

**Minimizing distractions:**
- Turn off phone notifications
- Use website blockers during study time
- Inform family/roommates of your study schedule
- Keep social media closed
- Use noise-cancelling headphones if needed

**Different spaces for different tasks:**
- Quiet desk for reading and writing
- Comfortable chair for reviewing notes
- Open space for group study
- Walking area for memorization

**Digital organization:**
- Create folders for each subject
- Use cloud storage for backup
- Keep devices charged and updated
- Use productivity apps sparingly`,
    isActive: true,
    createdAt: "2024-01-18T10:00:00Z",
    updatedAt: "2024-01-18T10:00:00Z",
  },
  {
    id: "tip-5",
    title: "Staying Motivated Throughout the Academic Year",
    description: "Maintain enthusiasm and drive for long-term academic success",
    category: "motivation",
    difficulty: "intermediate",
    tags: ["motivation", "goals", "mindset"],
    content: `Maintaining motivation is crucial for sustained academic success:

**Set clear goals:**
- Define specific, measurable objectives
- Break large goals into smaller milestones
- Write down your goals and review them regularly
- Celebrate achievements along the way

**Find your 'why':**
- Connect studies to your future career
- Understand how knowledge applies to real life
- Think about the impact you want to make
- Remember why you chose your field of study

**Combat burnout:**
- Take regular breaks and holidays
- Maintain hobbies outside of academics
- Exercise regularly and eat well
- Get adequate sleep (7-9 hours)
- Practice stress management techniques

**Build positive habits:**
- Create consistent daily routines
- Start with small, achievable tasks
- Use positive self-talk
- Surround yourself with motivated people
- Track your progress visually

**Deal with setbacks:**
- View failures as learning opportunities
- Adjust strategies rather than giving up
- Seek support from friends, family, or counselors
- Focus on progress, not perfection
- Remember that setbacks are temporary

**Stay engaged:**
- Participate in class discussions
- Join study groups and academic clubs
- Connect learning to current events
- Seek opportunities for practical application
- Find study partners who motivate you

**Reward systems:**
- Set up small rewards for completed tasks
- Plan bigger rewards for major milestones
- Use apps that gamify studying
- Treat yourself after difficult exams
- Share successes with supportive people`,
    isActive: true,
    createdAt: "2024-01-19T10:00:00Z",
    updatedAt: "2024-01-19T10:00:00Z",
  },
];

const STUDY_RESOURCES: StudyResource[] = [
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
    title: "Effective Note-Taking Methods Guide",
    description:
      "Comprehensive guide covering Cornell, mind mapping, and outline methods",
    type: "pdf",
    category: "study-guides",
    downloadUrl: "#",
    tags: ["note-taking", "techniques", "methods"],
    isActive: true,
    isFeatured: true,
    createdAt: "2024-01-16T10:00:00Z",
    updatedAt: "2024-01-16T10:00:00Z",
  },
  {
    id: "resource-3",
    title: "Memory Palace Technique Video Tutorial",
    description:
      "Learn to build memory palaces for better information retention",
    type: "video",
    category: "study-guides",
    url: "#",
    thumbnail: "/api/placeholder/400/225",
    tags: ["memory", "techniques", "visualization"],
    isActive: true,
    isFeatured: false,
    createdAt: "2024-01-17T10:00:00Z",
    updatedAt: "2024-01-17T10:00:00Z",
  },
  {
    id: "resource-4",
    title: "Research Paper Writing Checklist",
    description:
      "Step-by-step checklist for writing high-quality research papers",
    type: "template",
    category: "research",
    downloadUrl: "#",
    tags: ["research", "writing", "academic"],
    isActive: true,
    isFeatured: false,
    createdAt: "2024-01-18T10:00:00Z",
    updatedAt: "2024-01-18T10:00:00Z",
  },
  {
    id: "resource-5",
    title: "Presentation Skills Masterclass",
    description:
      "Online course covering presentation design and delivery techniques",
    type: "video",
    category: "presentations",
    url: "#",
    tags: ["presentations", "public-speaking", "communication"],
    isActive: true,
    isFeatured: true,
    createdAt: "2024-01-19T10:00:00Z",
    updatedAt: "2024-01-19T10:00:00Z",
  },
];

const StudyResourcesPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedDifficulty, setSelectedDifficulty] = useState("all");

  const filteredTips = STUDY_TIPS.filter((tip) => {
    const matchesSearch =
      tip.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tip.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tip.tags.some((tag) =>
        tag.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    const matchesCategory =
      selectedCategory === "all" || tip.category === selectedCategory;
    const matchesDifficulty =
      selectedDifficulty === "all" || tip.difficulty === selectedDifficulty;

    return matchesSearch && matchesCategory && matchesDifficulty;
  });

  const filteredResources = STUDY_RESOURCES.filter((resource) => {
    const matchesSearch =
      resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.tags.some((tag) =>
        tag.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    const matchesCategory =
      selectedCategory === "all" || resource.category === selectedCategory;

    return matchesSearch && matchesCategory;
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
        return <Clock className="h-5 w-5" />;
      case "study-techniques":
        return <Brain className="h-5 w-5" />;
      case "exam-prep":
        return <Target className="h-5 w-5" />;
      case "motivation":
        return <TrendingUp className="h-5 w-5" />;
      default:
        return <BookOpen className="h-5 w-5" />;
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "beginner":
        return "bg-green-100 text-green-800";
      case "intermediate":
        return "bg-yellow-100 text-yellow-800";
      case "advanced":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-3">
          <Lightbulb className="h-10 w-10 text-yellow-600" />
          <h1 className="text-4xl font-bold">Study Resources & Tips</h1>
        </div>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Master your studies with expert tips, proven techniques, and practical
          resources. From time management to exam preparation, everything you
          need for academic success.
        </p>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search tips and resources..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="flex gap-3">
              <Select
                value={selectedCategory}
                onValueChange={setSelectedCategory}
              >
                <SelectTrigger className="w-48">
                  <Filter className="h-4 w-4 mr-2" />
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
                  <SelectItem value="exam-prep">Exam Preparation</SelectItem>
                  <SelectItem value="motivation">Motivation</SelectItem>
                  <SelectItem value="study-guides">Study Guides</SelectItem>
                  <SelectItem value="research">Research</SelectItem>
                  <SelectItem value="presentations">Presentations</SelectItem>
                </SelectContent>
              </Select>

              <Select
                value={selectedDifficulty}
                onValueChange={setSelectedDifficulty}
              >
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Levels</SelectItem>
                  <SelectItem value="beginner">Beginner</SelectItem>
                  <SelectItem value="intermediate">Intermediate</SelectItem>
                  <SelectItem value="advanced">Advanced</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Content */}
      <Tabs defaultValue="tips" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="tips" className="flex items-center gap-2">
            <Lightbulb className="h-4 w-4" />
            Study Tips ({filteredTips.length})
          </TabsTrigger>
          <TabsTrigger value="resources" className="flex items-center gap-2">
            <BookOpen className="h-4 w-4" />
            Resources ({filteredResources.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="tips" className="space-y-6">
          <div className="grid gap-6">
            {filteredTips.map((tip) => (
              <Card key={tip.id} className="overflow-hidden">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      {getCategoryIcon(tip.category)}
                      <div>
                        <CardTitle className="text-xl">{tip.title}</CardTitle>
                        <CardDescription className="mt-1">
                          {tip.description}
                        </CardDescription>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Badge className={getDifficultyColor(tip.difficulty)}>
                        {tip.difficulty}
                      </Badge>
                      <Badge variant="outline">
                        {tip.category.replace("-", " ")}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>

                <CardContent>
                  <div className="prose max-w-none">
                    <div className="whitespace-pre-line text-gray-700">
                      {tip.content}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mt-4">
                    {tip.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="resources" className="space-y-6">
          {/* Featured Resources */}
          <div>
            <h3 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <Star className="h-6 w-6 text-yellow-500" />
              Featured Resources
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredResources
                .filter((r) => r.isFeatured)
                .map((resource) => (
                  <Card key={resource.id} className="overflow-hidden">
                    <CardHeader className="pb-3">
                      <div className="flex items-center gap-2">
                        {getTypeIcon(resource.type)}
                        <Badge variant="outline" className="text-xs">
                          {resource.type}
                        </Badge>
                      </div>
                      <CardTitle className="text-lg">
                        {resource.title}
                      </CardTitle>
                      <CardDescription>{resource.description}</CardDescription>
                    </CardHeader>

                    <CardContent>
                      <div className="flex flex-wrap gap-1 mb-4">
                        {resource.tags.map((tag) => (
                          <Badge
                            key={tag}
                            variant="secondary"
                            className="text-xs"
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>

                      <Button
                        className="w-full"
                        onClick={() => {
                          if (resource.downloadUrl) {
                            window.open(resource.downloadUrl, "_blank");
                          } else if (resource.url) {
                            window.open(resource.url, "_blank");
                          }
                        }}
                      >
                        {resource.type === "template" ||
                        resource.type === "pdf" ? (
                          <>
                            <Download className="h-4 w-4 mr-2" />
                            Download
                          </>
                        ) : (
                          <>
                            <Play className="h-4 w-4 mr-2" />
                            View
                          </>
                        )}
                      </Button>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </div>

          {/* All Resources */}
          <div>
            <h3 className="text-2xl font-semibold mb-4">All Resources</h3>
            <div className="grid gap-4">
              {filteredResources.map((resource) => (
                <Card key={resource.id}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="p-2 bg-gray-100 rounded-lg">
                          {getTypeIcon(resource.type)}
                        </div>
                        <div>
                          <h4 className="font-semibold">{resource.title}</h4>
                          <p className="text-sm text-gray-600">
                            {resource.description}
                          </p>
                          <div className="flex gap-2 mt-2">
                            <Badge variant="outline" className="text-xs">
                              {resource.type}
                            </Badge>
                            <Badge variant="secondary" className="text-xs">
                              {resource.category.replace("-", " ")}
                            </Badge>
                            {resource.isFeatured && (
                              <Badge className="bg-yellow-100 text-yellow-800 text-xs">
                                Featured
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>

                      <Button
                        variant="outline"
                        onClick={() => {
                          if (resource.downloadUrl) {
                            window.open(resource.downloadUrl, "_blank");
                          } else if (resource.url) {
                            window.open(resource.url, "_blank");
                          }
                        }}
                      >
                        {resource.type === "template" ||
                        resource.type === "pdf" ? (
                          <>
                            <Download className="h-4 w-4 mr-2" />
                            Download
                          </>
                        ) : (
                          <>
                            <Play className="h-4 w-4 mr-2" />
                            View
                          </>
                        )}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>
      </Tabs>

      {/* CTA Section */}
      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50">
        <CardContent className="p-8 text-center">
          <Users className="h-12 w-12 text-blue-600 mx-auto mb-4" />
          <h3 className="text-2xl font-semibold mb-2">
            Join Our Study Community
          </h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Connect with fellow students, share study tips, and get support from
            our community of learners. Together, we can achieve academic
            excellence!
          </p>
          <div className="flex gap-4 justify-center">
            <Button size="lg">Join Community</Button>
            <Button variant="outline" size="lg">
              Share Your Tips
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StudyResourcesPage;
