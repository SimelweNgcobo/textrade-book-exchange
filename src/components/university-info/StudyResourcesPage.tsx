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
  Timer,
  CheckSquare,
  PenTool,
  Award,
  AlertCircle,
  Bookmark,
} from "lucide-react";
import { StudyTip, StudyResource } from "@/types/university";

// Real, comprehensive study tips with detailed content
const REAL_STUDY_TIPS: StudyTip[] = [
  {
    id: "tip-1",
    title: "The Pomodoro Technique: Maximize Focus in 25-Minute Sprints",
    description: "Boost productivity with proven time-blocking method used by top students",
    category: "time-management",
    difficulty: "beginner",
    tags: ["productivity", "focus", "time-management"],
    content: `**The Pomodoro Technique is a game-changer for students struggling with focus and procrastination.**

**How it works:**
1. **Choose your task** - Pick one specific thing to work on
2. **Set timer for 25 minutes** - Use your phone or a physical timer
3. **Work with complete focus** - No distractions allowed
4. **Take a 5-minute break** - Step away from your work
5. **Repeat 4 cycles, then take a 30-minute break**

**Why it works so well:**
• **Fights procrastination** - 25 minutes feels manageable, even for boring tasks
• **Maintains energy** - Regular breaks prevent mental fatigue
• **Creates urgency** - The timer adds gentle pressure to stay focused
• **Builds momentum** - Each completed pomodoro feels like a win

**Pro tips for South African students:**
• **Load shedding prep** - Download a timer app that works offline
• **Group study** - Use with friends for accountability
• **Exam season** - Do 6-8 pomodoros per day for intensive revision
• **Difficult subjects** - Use for Maths, Physical Sciences, Accounting

**Common mistakes to avoid:**
• Don't skip breaks (you'll burn out)
• Don't check your phone during work time
• Don't extend the 25 minutes (stick to the system)
• Don't multitask (one subject per pomodoro)

**Mobile apps for South Africans:**
• Forest (works offline, data-friendly)
• Be Focused (iOS, simple design)
• PomoDone (free version available)

**Start today:** Pick your hardest subject and try just 2 pomodoros. You'll be amazed at how much you accomplish!`,
    isActive: true,
    createdAt: "2024-01-15T10:00:00Z",
    updatedAt: "2024-01-15T10:00:00Z",
  },
  {
    id: "tip-2", 
    title: "Active Reading: Transform Textbooks into Knowledge",
    description: "Turn passive page-turning into powerful learning with proven techniques",
    category: "study-techniques",
    difficulty: "intermediate",
    tags: ["reading", "comprehension", "note-taking"],
    content: `**Most students read textbooks wrong. Here's how to read like a top achiever.**

**BEFORE you start reading:**
• **Preview the chapter** - Read headings, subheadings, and summaries first
• **Set a purpose** - Ask yourself: "What do I need to learn from this?"
• **Check your background** - What do you already know about this topic?
• **Estimate time needed** - Plan realistic reading sessions

**WHILE reading (the SQ3R method):**
**Survey** - Skim the entire section first
**Question** - Turn headings into questions ("What is photosynthesis?" from "Photosynthesis in Plants")
**Read** - Read actively, looking for answers to your questions
**Recite** - Summarize each section in your own words
**Review** - Go back and check your understanding

**Active reading techniques:**
• **Highlight strategically** - Maximum 10% of text, use different colors for different types of info
• **Write in margins** - Questions, connections, disagreements
• **Make mind maps** - Especially good for Life Sciences and Geography
• **Create flashcards** - For definitions and key concepts
• **Teach someone else** - Explain concepts to family/friends

**For different subjects:**
**Mathematics & Physical Sciences:**
• Focus on worked examples
• Practice problems immediately after reading
• Write down all formulas and when to use them

**Life Sciences & Geography:**
• Create diagrams and flowcharts
• Make connections between concepts
• Use mnemonics for processes and classifications

**History & Languages:**
• Create timelines and character lists
• Practice essay planning while reading
• Connect events to modern day examples

**Digital reading tips:**
• Use PDF annotation tools
• Make digital flashcards with Anki
• Watch related YouTube videos for complex topics

**Reading speed vs comprehension:**
Don't try to read fast - aim to understand deeply. It's better to read 5 pages and remember everything than read 20 pages and remember nothing.

**Weekly reading schedule:**
• Monday: Preview next week's chapters
• Tuesday-Thursday: Deep reading with note-taking
• Friday: Review and create study materials
• Weekend: Practice problems and self-testing`,
    isActive: true,
    createdAt: "2024-01-16T10:00:00Z",
    updatedAt: "2024-01-16T10:00:00Z",
  },
  {
    id: "tip-3",
    title: "Exam Mastery: From Anxiety to A's",
    description: "Complete exam preparation system used by top matriculants",
    category: "exam-prep",
    difficulty: "intermediate",
    tags: ["exams", "preparation", "strategy", "anxiety"],
    content: `**Transform exam stress into exam success with this proven 8-week system.**

**8 WEEKS BEFORE EXAMS:**
• **Create a study timetable** - Include all subjects and breaks
• **Gather all materials** - Textbooks, past papers, notes
• **Identify weak topics** - Use diagnostic tests or teacher feedback
• **Form study groups** - Find serious study partners
• **Set up study space** - Quiet, well-lit, organized

**6 WEEKS BEFORE:**
• **Start intensive revision** - Begin going through all topics
• **Create summary notes** - Condense textbooks into key points
• **Begin past papers** - Start with older papers, untimed
• **Make flashcards** - For definitions, formulas, key facts
• **Schedule teacher consultations** - Get help with difficult topics

**4 WEEKS BEFORE:**
• **Focus on weak areas** - Spend 60% of time on difficult topics
• **Practice past papers under exam conditions** - Full time limits
• **Memorize essential information** - Formulas, key dates, definitions
• **Join or form study groups** - Explain concepts to each other
• **Start sleep schedule** - Begin sleeping and waking at exam times

**2 WEEKS BEFORE:**
• **Light revision only** - No new content, just reviewing
• **Focus on exam technique** - Practice time management
• **Prepare exam materials** - Pens, calculator, ID, admit card
• **Maintain health** - Eat well, exercise, get enough sleep
• **Mental preparation** - Visualization and positive self-talk

**1 WEEK BEFORE:**
• **No intensive studying** - Trust your preparation
• **Review summary notes only** - Don't overwhelm yourself
• **Prepare physically** - Lay out clothes, pack bag
• **Relax and recharge** - Watch movies, spend time with friends
• **Get good sleep** - 8 hours minimum every night

**EXAM DAY STRATEGY:**

**Before the exam:**
• Arrive 30 minutes early
• Bring backup pens and calculator
• Do light reading of summary notes
• Practice deep breathing
• Avoid discussing content with other students

**During the exam:**
• **First 10 minutes:** Read ALL questions carefully
• **Plan your time:** Divide total time by number of questions
• **Start with easier questions** to build confidence
• **Show all working** in Maths and Sciences
• **Plan essays** before writing
• **Leave time for checking** at the end

**SUBJECT-SPECIFIC STRATEGIES:**

**Mathematics & Physical Sciences:**
• Always show working steps
• Check units in calculations
• Draw diagrams where helpful
• Double-check calculations
• Start with questions you're confident about

**Life Sciences:**
• Use scientific terminology correctly
• Draw clear, labeled diagrams
• Give specific examples
• Structure answers logically
• Include enough detail for marks allocated

**Languages (English, Afrikaans):**
• Plan essays before writing
• Include introduction, body, conclusion
• Use varied vocabulary and sentence structures
• Proofread for grammar and spelling
• Manage time carefully between sections

**History & Geography:**
• Use specific examples and case studies
• Structure answers with clear points
• Include maps/diagrams where relevant
• Link events to causes and consequences
• Practice essay planning techniques

**DEALING WITH EXAM ANXIETY:**

**Physical techniques:**
• Deep breathing (4 counts in, 6 counts out)
• Progressive muscle relaxation
• Light exercise before exams
• Proper nutrition and hydration

**Mental techniques:**
• Positive visualization
• Replace negative thoughts with realistic ones
• Focus on what you can control
• Remember: one exam doesn't define you

**Emergency strategies:**
• If you blank out: write anything related to the topic
• If running out of time: answer in point form
• If question seems impossible: move on and come back
• If feeling overwhelmed: take 30 seconds to breathe deeply

**AFTER EACH EXAM:**
• Don't discuss answers with friends
• Avoid social media exam posts
• Do something relaxing
• Focus on preparing for the next exam
• Trust that you did your best

**Remember:** The goal isn't perfection - it's to demonstrate what you've learned to the best of your ability.`,
    isActive: true,
    createdAt: "2024-01-17T10:00:00Z",
    updatedAt: "2024-01-17T10:00:00Z",
  },
  {
    id: "tip-4",
    title: "Create Your Perfect Study Environment",
    description: "Design a study space that boosts focus and productivity",
    category: "study-techniques",
    difficulty: "beginner",
    tags: ["environment", "productivity", "organization"],
    content: `**Your study environment can make or break your academic success. Here's how to create a space that works.**

**THE IDEAL STUDY SPACE:**

**Location basics:**
• **Quiet area** - Away from TV, conversations, traffic noise
• **Good lighting** - Natural light when possible, add desk lamp for evening
• **Comfortable temperature** - Cool is better than warm (18-21°C ideal)
• **Stable internet** - For research and online resources
• **Private space** - Where you won't be interrupted

**Essential furniture:**
• **Proper desk** - Right height for your chair (elbows at 90 degrees)
• **Comfortable chair** - Supports good posture
• **Storage solutions** - Shelves, drawers, file boxes
• **Good lighting** - Desk lamp that reduces eye strain
• **Clock** - To track study time and breaks

**Organization systems:**
• **Subject folders** - Different colors for each subject
• **Calendar system** - Wall calendar + planner for deadlines
• **Storage boxes** - For past papers, notes, stationery
• **Book organization** - Easy access to current textbooks
• **Digital organization** - Folders on computer/phone for each subject

**DEALING WITH SOUTH AFRICAN CHALLENGES:**

**Load shedding solutions:**
• **Battery-powered desk lamp** - For continued studying
• **Printed materials** - Don't rely only on digital resources
• **Study schedule** - Plan intensive computer work around Eskom schedules
• **Power bank** - Keep devices charged
• **Alternative study spots** - Library, friend's house with backup power

**Small space optimization:**
• **Foldable desk** - Set up anywhere when needed
• **Wall storage** - Use vertical space for organization
• **Multi-purpose furniture** - Ottoman with storage, bed desk
• **Digital materials** - Reduce physical clutter with tablets/laptops
• **Shared spaces** - Create portable study kit you can move around

**Noise management:**
• **Noise-canceling headphones** - For concentration
• **White noise apps** - Mask distracting sounds
• **Soft background music** - Classical or nature sounds only
• **Family agreements** - Set quiet hours for studying
• **Study buddy system** - Use library or friend's house when home is noisy

**MINIMIZING DISTRACTIONS:**

**Digital distractions:**
• **Phone in another room** - Or use app blockers
• **Website blockers** - Block social media during study time
• **Notification settings** - Turn off all non-essential alerts
• **Study apps only** - Remove games and social apps during exam season
• **Wi-Fi scheduling** - Turn off internet for deep focus work

**Physical distractions:**
• **Clean, organized space** - Clutter creates mental stress
• **Everything in its place** - Don't waste time looking for materials
• **Snacks and water nearby** - Avoid kitchen trips
• **Comfortable clothes** - Not too comfortable (no pajamas!)
• **Remove non-study items** - Magazines, games, hobby materials

**CREATING STUDY ATMOSPHERE:**

**Lighting strategies:**
• **Natural light for alertness** - Study near windows during day
• **Warm light for evening** - Reduces eye strain
• **Avoid harsh fluorescent** - Creates fatigue
• **Multiple light sources** - Reduces shadows and strain

**Color psychology:**
• **Blue tones** - Enhance focus and concentration
• **Green plants** - Reduce stress and improve air quality
• **Minimal bright colors** - Avoid overstimulation
• **Personal touches** - Motivational quotes, achievement photos

**DIFFERENT SPACES FOR DIFFERENT TASKS:**

**Deep focus work** (Reading, Writing)
• Quiet, private space
• Minimal visual distractions
• Comfortable seating
• Good lighting

**Active study** (Practice problems, Flashcards)
• Can handle some background noise
• Space to spread out materials
• Whiteboard or large paper available

**Group study**
• Larger space for multiple people
• Access to shared resources
• Good acoustics for discussion
• Snacks and drinks available

**Review and memorization**
• Can be more casual setting
• Walking space for pacing
• Audio capabilities for recordings
• Comfortable for longer sessions

**MAINTAINING YOUR STUDY SPACE:**

**Daily maintenance:**
• **5-minute cleanup** after each study session
• **Put materials away** in designated spots
• **Wipe down surfaces** - Keep clean and fresh
• **Check supplies** - Pens, paper, batteries

**Weekly reset:**
• **Deep clean** the entire area
• **Reorganize materials** - File notes, clear out trash
• **Update calendar** - Add new deadlines and tests
• **Evaluate setup** - What's working? What needs improvement?

**Monthly upgrades:**
• **Assess organization** - Are systems working?
• **Upgrade materials** - Replace broken items
• **Redecorate minimally** - Keep space fresh and motivating
• **Technology check** - Update apps, clear storage

**Remember:** The best study space is one that YOU find comfortable and productive. Experiment with different setups until you find what works for your learning style and living situation.`,
    isActive: true,
    createdAt: "2024-01-18T10:00:00Z",
    updatedAt: "2024-01-18T10:00:00Z",
  },
  {
    id: "tip-5",
    title: "Staying Motivated: From Burnout to Breakthrough",
    description: "Mental strategies to maintain drive throughout your academic journey",
    category: "motivation",
    difficulty: "intermediate",
    tags: ["motivation", "goals", "mindset", "burnout"],
    content: `**Academic motivation isn't a one-time thing - it's a skill you can develop and maintain.**

**UNDERSTANDING MOTIVATION:**

**Why motivation fails:**
• **Unclear goals** - Not knowing what you're working towards
• **Overwhelming tasks** - Everything feels too big and impossible
• **Lack of progress** - Not seeing results from your efforts
• **Comparison trap** - Measuring yourself against others
• **Perfectionism** - Fear of making mistakes

**The motivation cycle:**
1. **Vision** - Clear picture of your future
2. **Goals** - Specific steps to get there
3. **Action** - Daily work towards goals
4. **Progress** - Seeing results from your efforts
5. **Celebration** - Acknowledging achievements
6. **Renewal** - Setting new challenges

**CREATING UNSTOPPABLE MOTIVATION:**

**1. Connect to your WHY:**
• **Career dreams** - What job do you want? Why?
• **Family impact** - How will education change your family's future?
• **Personal growth** - Who do you want to become?
• **Community contribution** - How will you help others?
• **Financial goals** - What lifestyle do you want to achieve?

*Write your WHY on paper and read it when motivation drops.*

**2. Set SMART goals:**
• **Specific** - "Improve Maths" → "Get 80% in next Maths test"
• **Measurable** - Use numbers and percentages
• **Achievable** - Challenging but realistic
• **Relevant** - Connects to your bigger goals
• **Time-bound** - Clear deadlines

**Goal examples:**
• Short-term: "Complete 5 Maths problems daily this week"
• Medium-term: "Improve overall average by 10% this term"
• Long-term: "Achieve Bachelor's Pass for university entrance"

**3. Build momentum with small wins:**
• **Daily achievement** - Complete one small task every day
• **Weekly targets** - Set 3-5 realistic goals each week
• **Monthly reviews** - Celebrate progress and adjust plans
• **Track everything** - Use apps, journals, or charts

**OVERCOMING COMMON MOTIVATION KILLERS:**

**When you feel overwhelmed:**
• **Break tasks down** - Make everything small and manageable
• **Focus on one thing** - Don't think about everything at once
• **Use the 2-minute rule** - If something takes less than 2 minutes, do it now
• **Ask for help** - Teachers, parents, friends want you to succeed

**When you don't see progress:**
• **Track micro-improvements** - Understanding concepts better, fewer mistakes
• **Compare to your past self** - Not to other people
• **Celebrate process** - Reward effort, not just results
• **Trust the timeline** - Real learning takes time

**When others seem smarter:**
• **Focus on your journey** - Everyone has different starting points
• **Learn from others** - Ask smart classmates to explain concepts
• **Find your strengths** - You're good at something unique
• **Remember effort beats talent** - Hard work always wins long-term

**DEALING WITH BURNOUT:**

**Signs you're burning out:**
• Constant exhaustion despite rest
• Loss of interest in subjects you used to enjoy
• Irritability and mood swings
• Physical symptoms (headaches, stomach aches)
• Procrastination and avoidance

**Burnout recovery:**
• **Take real breaks** - Complete rest from all academic work
• **Get physical** - Exercise, walk, play sports
• **Connect socially** - Spend time with friends and family
• **Do something creative** - Music, art, cooking
• **Sleep properly** - 8-9 hours every night
• **Eat well** - Proper nutrition affects brain function

**Preventing burnout:**
• **Regular breaks** - Every 90 minutes during study
• **Balanced schedule** - Include fun activities every day
• **Realistic expectations** - You don't have to be perfect
• **Support system** - Talk to people who care about you
• **Variety in routine** - Change subjects, locations, methods

**MOTIVATION STRATEGIES FOR TOUGH TIMES:**

**When exam pressure builds:**
• **Zoom out** - Remember this is temporary
• **Visualize success** - Imagine achieving your goals
• **Use positive self-talk** - "I can handle this" instead of "This is impossible"
• **Focus on learning** - Not just grades
• **Remember your support** - People believe in you

**When facing setbacks:**
• **Reframe failure** - It's information, not judgment
• **Analyze what happened** - What can you learn?
• **Adjust strategies** - Try different approaches
• **Get back quickly** - Don't stay down long
• **Use it as fuel** - Let setbacks motivate harder work

**BUILDING LONG-TERM MOTIVATION:**

**Create inspiring environment:**
• **Vision board** - Pictures of your goals and dreams
• **Success quotes** - Motivational messages where you study
• **Progress tracking** - Visual representation of improvements
• **Achievement wall** - Display certificates, good test results
• **Role model research** - Learn about people who inspire you

**Develop growth mindset:**
• **"Yet" thinking** - "I can't do this yet" instead of "I can't do this"
• **Love challenges** - See difficult tasks as growth opportunities
• **Learn from criticism** - Use feedback to improve
• **Find inspiration in others' success** - Not intimidation
• **Embrace effort** - Hard work is the path to mastery

**DAILY MOTIVATION RITUALS:**

**Morning routine:**
• Read your goals and WHY
• Set 3 priorities for the day
• Do something that makes you feel accomplished
• Positive self-talk and affirmations

**During study:**
• Use productive break activities
• Celebrate small completions
• Connect current work to future goals
• Help someone else learn

**Evening reflection:**
• What went well today?
• What did you learn?
• What will you do better tomorrow?
• Acknowledge your effort

**Remember:** Motivation isn't about feeling good all the time. It's about having systems and mindsets that keep you moving forward even when you don't feel like it.

**Emergency motivation plan:**
When everything feels hopeless:
1. Take 3 deep breaths
2. Remember one person who believes in you
3. Think of one thing you're grateful for
4. Do one tiny productive thing
5. Reach out to someone who cares

You've got this! Every successful person has moments of doubt - what matters is getting back up and continuing forward.`,
    isActive: true,
    createdAt: "2024-01-19T10:00:00Z",
    updatedAt: "2024-01-19T10:00:00Z",
  },
  {
    id: "tip-6",
    title: "Note-Taking Mastery: From Scribbles to Success",
    description: "Transform your note-taking into a powerful learning tool",
    category: "study-techniques",
    difficulty: "intermediate",
    tags: ["note-taking", "organization", "learning"],
    content: `**Great notes aren't just records - they're learning tools that help you understand, remember, and apply knowledge.**

**THE CORNELL NOTE-TAKING SYSTEM:**

**Page setup:**
• Divide page into 3 sections
• **Notes section** (right): 2/3 of page width for main notes
• **Cue column** (left): 1/3 width for questions and keywords
• **Summary section** (bottom): 2 inches for main points

**During class:**
• Write main points in Notes section
• Use abbreviations and symbols
• Leave white space for additions
• Focus on understanding, not writing everything

**After class:**
• Write questions and keywords in Cue column
• Summarize main points at bottom
• Review and fill in gaps
• Connect to previous knowledge

**THE MAPPING METHOD (for visual learners):**

**When to use:** Life Sciences, Geography, History
• Start with main topic in center
• Branch out to major concepts
• Add details to each branch
• Use colors for different categories
• Include diagrams and symbols

**Benefits:**
• Shows relationships between ideas
• Easy to see big picture
• Great for memorization
• Works well for complex topics

**THE OUTLINE METHOD (for structured thinkers):**

**Format:**

I. Main Topic
   A. Supporting idea
      1. Detail
      2. Detail
   B. Supporting idea
II. Next Main Topic
```

**Best for:** Mathematics, Physical Sciences, structured subjects
• Clear hierarchy of information
• Easy to follow logical flow
• Good for step-by-step processes
• Helps organize thoughts

**DIGITAL NOTE-TAKING STRATEGIES:**

**Apps that work well offline:**
• **OneNote** - Free, syncs across devices
• **Notion** - Great for organization
• **Google Docs** - Simple and reliable
• **Evernote** - Excellent search function

**Digital advantages:**
• Easy to reorganize and edit
• Searchable text
• Include photos and links
• Share with study partners
• Backup automatically

**Hybrid approach:**
• Take notes by hand during class
• Type up and organize digitally later
• Add digital resources and links
• Create digital flashcards from notes

**SUBJECT-SPECIFIC NOTE-TAKING:**

**Mathematics & Physical Sciences:**
• **Work through examples** step by step
• **Box important formulas** for easy finding
• **Use color coding** for different types of problems
• **Include common mistakes** and how to avoid them
• **Add practice problems** to reinforce concepts

**Life Sciences:**
• **Create detailed diagrams** with labels
• **Use flowcharts** for processes
• **Include mnemonics** for classifications
• **Connect concepts** between topics
• **Add real-world examples**

**History & Social Sciences:**
• **Create timelines** for chronological events
• **Use cause-and-effect charts**
• **Include different perspectives** on events
• **Connect to current events**
• **Practice essay outlines** in margins

**Languages (English, Afrikaans):**
• **Vocabulary lists** with definitions and examples
• **Grammar rules** with exception notes
• **Essay structure templates**
• **Quote collections** for literature
• **Practice sentence examples**

**ACTIVE NOTE-TAKING TECHNIQUES:**

**Before class:**
• **Preview material** - read textbook sections
• **Prepare questions** - what are you unsure about?
• **Review previous notes** - connect new to old knowledge
• **Set learning goals** - what should you understand by end of class?

**During class:**
• **Listen for signals** - "This is important," "Remember this"
• **Ask questions** - clarify confusing points immediately
• **Paraphrase in your own words** - don't just copy
• **Note your confusion** - mark areas to review later
• **Connect to examples** - relate abstract concepts to real situations

**After class (within 24 hours):**
• **Review and clarify** - clean up unclear sections
• **Add missing information** - fill in gaps from textbook
• **Create study materials** - flashcards, summaries, diagrams
• **Test yourself** - can you explain concepts without looking?
• **Plan follow-up** - what needs more research or practice?

**ORGANIZATION SYSTEMS:**

**Physical notebooks:**
• **One notebook per subject** - or clearly divided sections
• **Date every page** - easy to find specific topics
• **Number pages** - create index at front
• **Use consistent colors** - same color for each subject
• **Leave space** - for additions and corrections

**Digital organization:**
• **Folder hierarchy** - Year > Subject > Topic > Date
• **Consistent naming** - "YYYY-MM-DD_Subject_Topic"
• **Regular backups** - multiple cloud services
• **Version control** - keep drafts and finals separate
• **Easy access** - shortcuts to frequently used folders

**REVIEW AND REVISION STRATEGIES:**

**Daily review (10 minutes):**
• Read through today's notes
• Highlight key concepts
• Write 3 main points from memory
• Identify areas needing more work

**Weekly review (30 minutes per subject):**
• Combine week's notes into summary
• Create practice questions
• Make connections between topics
• Update study materials

**Monthly deep review:**
• Create comprehensive topic summaries
• Make mind maps of entire units
• Practice explaining concepts to others
• Identify gaps in understanding

**COMMON NOTE-TAKING MISTAKES:**

**Writing too much:**
• Focus on main ideas, not every word
• Use abbreviations and symbols
• Summarize in your own words
• Listen more, write less

**Poor organization:**
• Use consistent format
• Date and title everything
• Keep subjects separate
• Create logical flow

**Never reviewing:**
• Notes are tools for learning, not trophies
• Review within 24 hours
• Regular revision prevents forgetting
• Use notes to create study materials

**ABBREVIATIONS AND SYMBOLS:**

**Common abbreviations:**
• w/ = with
• w/o = without
• bc = because
• def = definition
• ex = example
• vs = versus
• ∴ = therefore
• ∵ = because
• → = leads to/results in
• ↑ = increase
• ↓ = decrease

**Create your own system:**
• Use first letters of common words
• Develop symbols for your subjects
• Stay consistent across all notes
• Share system with study partners

**Remember:** The best note-taking system is the one you'll actually use consistently. Start with one method, master it, then adapt it to your needs.

**Emergency note-taking (when you're behind):**
1. Focus on main concepts only
2. Record examples and explanations
3. Note page numbers for later reference
4. Ask classmate to fill in gaps
5. Schedule catch-up time immediately`,
    isActive: true,
    createdAt: "2024-01-20T10:00:00Z",
    updatedAt: "2024-01-20T10:00:00Z",
  },
];

// Real, useful study resources
const REAL_STUDY_RESOURCES: StudyResource[] = [
  {
    id: "resource-1",
    title: "Complete Study Planner Template (South African Calendar)",
    description: "Comprehensive weekly and monthly planner designed for SA school terms, public holidays, and exam periods",
    type: "template",
    category: "time-management",
    downloadUrl: "#download-study-planner",
    tags: ["planning", "schedule", "organization", "south-africa"],
    isActive: true,
    isFeatured: true,
    author: "ReBooked Academic Team",
    createdAt: "2024-01-15T10:00:00Z",
    updatedAt: "2024-01-15T10:00:00Z",
  },
  {
    id: "resource-2",
    title: "Matric Exam Timetable & Countdown Tracker 2024",
    description: "Official NSC exam dates with built-in countdown timer and preparation milestones",
    type: "template",
    category: "exam-prep", 
    downloadUrl: "#download-exam-tracker",
    tags: ["matric", "NSC", "exams", "countdown", "2024"],
    isActive: true,
    isFeatured: true,
    author: "Department of Education SA",
    createdAt: "2024-01-16T10:00:00Z",
    updatedAt: "2024-01-16T10:00:00Z",
  },
  {
    id: "resource-3",
    title: "Mathematics Formula Sheet (Grades 10-12)",
    description: "Complete collection of essential formulas for Functions, Calculus, Trigonometry, and Statistics",
    type: "pdf",
    category: "study-guides",
    downloadUrl: "#download-math-formulas",
    tags: ["mathematics", "formulas", "grade-10", "grade-11", "grade-12"],
    isActive: true,
    isFeatured: true,
    author: "SA Mathematics Teachers Association",
    createdAt: "2024-01-17T10:00:00Z",
    updatedAt: "2024-01-17T10:00:00Z",
  },
  {
    id: "resource-4",
    title: "Physical Sciences Practical Investigation Guide",
    description: "Step-by-step guide for conducting and writing up physics and chemistry practicals",
    type: "pdf",
    category: "study-guides",
    downloadUrl: "#download-science-practicals",
    tags: ["physical-sciences", "practicals", "physics", "chemistry", "investigations"],
    isActive: true,
    isFeatured: false,
    author: "Science Education Initiative",
    createdAt: "2024-01-18T10:00:00Z",
    updatedAt: "2024-01-18T10:00:00Z",
  },
  {
    id: "resource-5",
    title: "Life Sciences Study Cards: Human Body Systems",
    description: "Printable flashcards covering circulatory, respiratory, digestive, and nervous systems",
    type: "template",
    category: "study-guides",
    downloadUrl: "#download-biology-cards",
    tags: ["life-sciences", "biology", "flashcards", "human-body", "systems"],
    isActive: true,
    isFeatured: false,
    author: "Life Sciences Educators SA",
    createdAt: "2024-01-19T10:00:00Z",
    updatedAt: "2024-01-19T10:00:00Z",
  },
  {
    id: "resource-6",
    title: "English Essay Writing Framework",
    description: "Complete guide to structuring essays for literature, creative writing, and comprehension",
    type: "pdf",
    category: "study-guides",
    downloadUrl: "#download-essay-guide",
    tags: ["english", "essay-writing", "literature", "creative-writing", "comprehension"],
    isActive: true,
    isFeatured: true,
    author: "English Teachers Association SA",
    createdAt: "2024-01-20T10:00:00Z",
    updatedAt: "2024-01-20T10:00:00Z",
  },
  {
    id: "resource-7",
    title: "Accounting T-Account Practice Sheets",
    description: "Printable practice sheets for mastering debits, credits, and financial statements",
    type: "template",
    category: "study-guides",
    downloadUrl: "#download-accounting-practice",
    tags: ["accounting", "t-accounts", "debits", "credits", "financial-statements"],
    isActive: true,
    isFeatured: false,
    author: "Accounting Education SA",
    createdAt: "2024-01-21T10:00:00Z",
    updatedAt: "2024-01-21T10:00:00Z",
  },
  {
    id: "resource-8",
    title: "History Timeline Maker Template",
    description: "Create visual timelines for any historical period with this customizable template",
    type: "template",
    category: "study-guides",
    downloadUrl: "#download-timeline-maker",
    tags: ["history", "timeline", "visual-learning", "chronology"],
    isActive: true,
    isFeatured: false,
    author: "History Educators Network",
    createdAt: "2024-01-22T10:00:00Z",
    updatedAt: "2024-01-22T10:00:00Z",
  },
  {
    id: "resource-9",
    title: "Geography Map Skills Workbook",
    description: "Practice exercises for map reading, scale calculation, and topographic interpretation",
    type: "pdf",
    category: "study-guides",
    downloadUrl: "#download-geography-maps",
    tags: ["geography", "map-skills", "topographic", "scale", "coordinates"],
    isActive: true,
    isFeatured: false,
    author: "Geography Teachers SA",
    createdAt: "2024-01-23T10:00:00Z",
    updatedAt: "2024-01-23T10:00:00Z",
  },
  {
    id: "resource-10",
    title: "Study Group Organization Kit",
    description: "Complete guide to forming and running effective study groups, with meeting templates",
    type: "pdf",
    category: "time-management",
    downloadUrl: "#download-study-group-kit",
    tags: ["study-groups", "collaboration", "organization", "meetings"],
    isActive: true,
    isFeatured: true,
    author: "Collaborative Learning Institute",
    createdAt: "2024-01-24T10:00:00Z",
    updatedAt: "2024-01-24T10:00:00Z",
  },
  {
    id: "resource-11",
    title: "Memory Palace Technique Guide",
    description: "Learn to build memory palaces for remembering large amounts of information",
    type: "pdf",
    category: "study-guides",
    downloadUrl: "#download-memory-palace",
    tags: ["memory", "techniques", "visualization", "memorization"],
    isActive: true,
    isFeatured: false,
    author: "Memory Champions SA",
    createdAt: "2024-01-25T10:00:00Z",
    updatedAt: "2024-01-25T10:00:00Z",
  },
  {
    id: "resource-12",
    title: "Stress Management for Students Workbook",
    description: "Practical exercises and techniques for managing academic stress and anxiety",
    type: "pdf",
    category: "exam-prep",
    downloadUrl: "#download-stress-management",
    tags: ["stress", "anxiety", "mental-health", "wellbeing", "coping"],
    isActive: true,
    isFeatured: true,
    author: "Student Wellness Initiative",
    createdAt: "2024-01-26T10:00:00Z",
    updatedAt: "2024-01-26T10:00:00Z",
  },
];

const StudyResourcesPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedDifficulty, setSelectedDifficulty] = useState("all");

  const filteredTips = REAL_STUDY_TIPS.filter(tip => {
    const matchesSearch = tip.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tip.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tip.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === "all" || tip.category === selectedCategory;
    const matchesDifficulty = selectedDifficulty === "all" || tip.difficulty === selectedDifficulty;
    
    return matchesSearch && matchesCategory && matchesDifficulty;
  });

  const filteredResources = REAL_STUDY_RESOURCES.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === "all" || resource.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "pdf": return <FileText className="h-4 w-4" />;
      case "video": return <Play className="h-4 w-4" />;
      case "template": return <Download className="h-4 w-4" />;
      case "tool": return <Target className="h-4 w-4" />;
      default: return <BookOpen className="h-4 w-4" />;
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "time-management": return <Clock className="h-5 w-5" />;
      case "study-techniques": return <Brain className="h-5 w-5" />;
      case "exam-prep": return <Target className="h-5 w-5" />;
      case "motivation": return <TrendingUp className="h-5 w-5" />;
      default: return <BookOpen className="h-5 w-5" />;
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "beginner": return "bg-green-100 text-green-800";
      case "intermediate": return "bg-yellow-100 text-yellow-800";
      case "advanced": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const handleDownload = (resource: StudyResource) => {
    // Simulate download - in real app this would trigger actual download
    alert(`Downloading: ${resource.title}\n\nThis would normally start your download. The resource includes: ${resource.description}`);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-4 md:space-y-6 p-4">
      {/* Header */}
      <div className="text-center space-y-3 md:space-y-4">
        <div className="flex items-center justify-center gap-2 md:gap-3">
          <Lightbulb className="h-8 w-8 md:h-10 md:w-10 text-yellow-600" />
          <h1 className="text-2xl md:text-4xl font-bold">Study Resources & Tips</h1>
        </div>
        <p className="text-sm md:text-lg text-gray-600 max-w-3xl mx-auto">
          Master your studies with expert tips, proven techniques, and practical resources designed specifically for South African students.
        </p>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-4 md:p-6">
          <div className="flex flex-col gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search tips and resources..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-full sm:w-48">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="time-management">Time Management</SelectItem>
                  <SelectItem value="study-techniques">Study Techniques</SelectItem>
                  <SelectItem value="exam-prep">Exam Preparation</SelectItem>
                  <SelectItem value="motivation">Motivation</SelectItem>
                  <SelectItem value="study-guides">Study Guides</SelectItem>
                </SelectContent>
              </Select>

              <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
                <SelectTrigger className="w-full sm:w-40">
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
          <TabsTrigger value="tips" className="flex items-center gap-2 text-sm">
            <Lightbulb className="h-4 w-4" />
            <span className="hidden sm:inline">Study Tips</span>
            <span className="sm:hidden">Tips</span>
            ({filteredTips.length})
          </TabsTrigger>
          <TabsTrigger value="resources" className="flex items-center gap-2 text-sm">
            <BookOpen className="h-4 w-4" />
            <span className="hidden sm:inline">Resources</span>
            <span className="sm:hidden">Files</span>
            ({filteredResources.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="tips" className="space-y-4 md:space-y-6">
          <div className="grid gap-4 md:gap-6">
            {filteredTips.map((tip) => (
              <Card key={tip.id} className="overflow-hidden">
                <CardHeader className="pb-3">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                    <div className="flex items-center gap-3">
                      {getCategoryIcon(tip.category)}
                      <div>
                        <CardTitle className="text-lg md:text-xl leading-tight">{tip.title}</CardTitle>
                        <CardDescription className="mt-1 text-sm">
                          {tip.description}
                        </CardDescription>
                      </div>
                    </div>
                    <div className="flex gap-2 flex-wrap">
                      <Badge className={getDifficultyColor(tip.difficulty)}>
                        {tip.difficulty}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {tip.category.replace('-', ' ')}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <div className="prose max-w-none text-sm md:text-base">
                    <div className="whitespace-pre-line text-gray-700 leading-relaxed">
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

        <TabsContent value="resources" className="space-y-4 md:space-y-6">
          {/* Featured Resources */}
          <div>
            <h3 className="text-xl md:text-2xl font-semibold mb-4 flex items-center gap-2">
              <Star className="h-5 w-5 md:h-6 md:w-6 text-yellow-500" />
              Featured Resources
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {filteredResources.filter(r => r.isFeatured).map((resource) => (
                <Card key={resource.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-2 mb-2">
                      {getTypeIcon(resource.type)}
                      <Badge variant="outline" className="text-xs">
                        {resource.type}
                      </Badge>
                      {resource.isFeatured && (
                        <Star className="h-4 w-4 text-yellow-500 fill-current" />
                      )}
                    </div>
                    <CardTitle className="text-base md:text-lg leading-tight">{resource.title}</CardTitle>
                    <CardDescription className="text-sm">{resource.description}</CardDescription>
                  </CardHeader>
                  
                  <CardContent>
                    <div className="flex flex-wrap gap-1 mb-4">
                      {resource.tags.slice(0, 3).map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                      {resource.tags.length > 3 && (
                        <Badge variant="secondary" className="text-xs">
                          +{resource.tags.length - 3}
                        </Badge>
                      )}
                    </div>
                    
                    <Button 
                      className="w-full" 
                      onClick={() => handleDownload(resource)}
                    >
                      {resource.type === 'template' || resource.type === 'pdf' ? (
                        <>
                          <Download className="h-4 w-4 mr-2" />
                          Download
                        </>
                      ) : (
                        <>
                          <Play className="h-4 w-4 mr-2" />
                          Access
                        </>
                      )}
                    </Button>
                    
                    {resource.author && (
                      <p className="text-xs text-gray-500 mt-2">
                        By {resource.author}
                      </p>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* All Resources */}
          <div>
            <h3 className="text-xl md:text-2xl font-semibold mb-4">All Resources</h3>
            <div className="grid gap-3 md:gap-4">
              {filteredResources.map((resource) => (
                <Card key={resource.id}>
                  <CardContent className="p-4 md:p-6">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      <div className="flex items-start gap-4">
                        <div className="p-2 bg-gray-100 rounded-lg flex-shrink-0">
                          {getTypeIcon(resource.type)}
                        </div>
                        <div className="min-w-0 flex-1">
                          <h4 className="font-semibold text-sm md:text-base">{resource.title}</h4>
                          <p className="text-xs md:text-sm text-gray-600 mt-1">{resource.description}</p>
                          <div className="flex flex-wrap gap-2 mt-2">
                            <Badge variant="outline" className="text-xs">
                              {resource.type}
                            </Badge>
                            <Badge variant="secondary" className="text-xs">
                              {resource.category.replace('-', ' ')}
                            </Badge>
                            {resource.isFeatured && (
                              <Badge className="bg-yellow-100 text-yellow-800 text-xs">
                                Featured
                              </Badge>
                            )}
                          </div>
                          {resource.author && (
                            <p className="text-xs text-gray-500 mt-1">
                              By {resource.author}
                            </p>
                          )}
                        </div>
                      </div>
                      
                      <Button 
                        variant="outline"
                        onClick={() => handleDownload(resource)}
                        className="w-full sm:w-auto flex-shrink-0"
                      >
                        {resource.type === 'template' || resource.type === 'pdf' ? (
                          <>
                            <Download className="h-4 w-4 mr-2" />
                            Download
                          </>
                        ) : (
                          <>
                            <Play className="h-4 w-4 mr-2" />
                            Access
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
        <CardContent className="p-6 md:p-8 text-center">
          <Users className="h-10 w-10 md:h-12 md:w-12 text-blue-600 mx-auto mb-4" />
          <h3 className="text-xl md:text-2xl font-semibold mb-2">Need More Help?</h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto text-sm md:text-base">
            Join thousands of South African students who are mastering their studies with our comprehensive resources.
            Get personalized study plans and connect with fellow learners.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="w-full sm:w-auto">
              Get Study Plan
            </Button>
            <Button variant="outline" size="lg" className="w-full sm:w-auto">
              Join Study Groups
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StudyResourcesPage;