import { useState, useMemo } from "react";
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
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { StudyTip, StudyResource } from "@/types/university";

// Real, comprehensive study tips with detailed content
const REAL_STUDY_TIPS: StudyTip[] = [
  {
    id: "tip-1",
    title: "The Pomodoro Technique: Maximize Focus in 25-Minute Sprints",
    description:
      "Boost productivity with proven time-blocking method used by top students",
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
    description:
      "Turn passive page-turning into powerful learning with proven techniques",
    category: "study-techniques",
    difficulty: "intermediate",
    tags: ["reading", "comprehension", "note-taking"],
    content: `**Most students read textbooks wrong. Here's how to read like a top achiever.**

**BEFORE you start reading:**
• **Preview the chapter** - Read headings, subheadings, and summary first
• **Set a purpose** - What do you need to learn from this?
• **Check your knowledge** - What do you already know about this topic?
• **Time yourself** - How long will this take? Set realistic goals

**The SQ3R Method (proven for 70+ years):**

**1. SURVEY (2-3 minutes)**
• Read the chapter title and introduction
• Look at all headings and subheadings
• Read the summary or conclusion
• Look at pictures, graphs, and charts
• Get the "big picture" before diving in

**2. QUESTION (1-2 minutes)**
• Turn headings into questions
• "Photosynthesis" becomes "What is photosynthesis? How does it work?"
• Write down 3-5 questions you want answered
• This gives your brain something to search for while reading

**3. READ (actual reading time)**
• Read actively, not passively
• Look for answers to your questions
• Slow down at important parts
• Speed up through examples and stories
• Take notes in margins or separate paper

**4. RECITE (after each section)**
• Stop and summarize what you just read
• Say it out loud or write it down
• If you can't explain it simply, you don't understand it yet
• Go back and re-read confusing parts

**5. REVIEW (5-10 minutes at the end)**
• Go through your notes and summaries
• Answer your original questions
• Connect new information to what you already knew
• Plan what you'll study next time

**Advanced Reading Techniques:**

**For Math and Science textbooks:**
• Read the examples FIRST, then the theory
• Work through examples step-by-step
• Cover the solution and try to solve it yourself
• Understand the "why" behind each step

**For History and Languages:**
• Create a timeline as you read
• Connect events to cause and effect
• Ask "Why did this happen?" and "What were the consequences?"
• Make connections to current events

**Speed Reading Tips (with comprehension):**
• Use your finger or pen to guide your eyes
• Read in chunks, not word by word
• Don't vocalize every word in your head
• Skip words like "the," "and," "is" (your brain fills them in)

**Digital Reading Strategies:**
• Use annotation tools in PDFs
• Highlight in different colors (main ideas = yellow, definitions = green)
• Take notes in a separate document
• Use text-to-speech for difficult sections

**Reading Environment Setup:**
• Good lighting - preferably natural light
• Comfortable but not too comfortable seating
• Remove distractions (phone in another room)
• Have water and healthy snacks nearby
• Background music only if it helps you focus

**Common Reading Problems and Solutions:**

**Problem: "I read the whole chapter but remember nothing"**
Solution: You're reading too passively. Use the SQ3R method and take notes.

**Problem: "I get distracted and start thinking about other things"**
Solution: Read in shorter chunks (15-20 minutes), ask questions, take breaks.

**Problem: "The material is too difficult to understand"**
Solution: Start with easier sources (YouTube videos, Wikipedia), then tackle the textbook.

**Problem: "I'm too slow at reading"**
Solution: Practice daily, use finger guidance, don't worry about speed at first - focus on understanding.

**Subject-Specific Reading Strategies:**

**Mathematics:**
• Read example problems multiple times
• Cover the solution and try to work it out
• Read formulas out loud to remember them
• Connect new concepts to previously learned material

**Sciences (Biology, Chemistry, Physics):**
• Draw diagrams as you read
• Create concept maps linking different ideas
• Read lab procedures carefully and visualize the process
• Connect theory to real-world applications

**Languages (English, Afrikaans, etc.):**
• Read literature pieces multiple times
• Look up unfamiliar words and write them down
• Practice reading aloud to improve pronunciation
• Discuss what you read with classmates or family

**Business Studies/Economics:**
• Create mind maps of business concepts
• Look for real examples in news and current events
• Practice case studies and apply theoretical knowledge
• Connect business concepts to everyday life

**Remember:** Reading is a skill that improves with practice. Start with easier material and gradually work your way up to more complex texts. The goal is understanding, not speed.`,
    isActive: true,
    createdAt: "2024-01-16T10:00:00Z",
    updatedAt: "2024-01-16T10:00:00Z",
  },
  {
    id: "tip-3",
    title: "Exam Mastery: From Anxiety to A's in 8 Weeks",
    description:
      "Complete exam preparation system used by top-performing students",
    category: "exam-prep",
    difficulty: "advanced",
    tags: ["exams", "preparation", "strategy", "anxiety"],
    content: `**Transform your exam performance with this comprehensive 8-week system used by top students worldwide.**

**WEEK 8 BEFORE EXAMS: Foundation Setup**

**Create Your Study Environment:**
• **Organize your space** - Clean desk, good lighting, comfortable chair
• **Gather materials** - All textbooks, notes, past papers, stationery
• **Set up systems** - Study schedule, note-taking method, progress tracking
• **Prepare for load shedding** - Offline materials, battery packs, alternative study locations

**Subject Audit:**
• List all subjects and their exam dates
• Identify your strongest and weakest subjects
• Calculate how much time you have for each subject
• Gather all available past exam papers and memorandums

**WEEK 7: Content Mapping and Gap Analysis**

**Create Subject Overviews:**
• **List all topics** for each subject (use syllabus/curriculum)
• **Rate your confidence** - Strong (8-10), Okay (5-7), Weak (1-4)
• **Identify critical gaps** - Focus on weak areas with high exam weight
• **Plan topic sequence** - Start with weakest, maintain strong areas

**Past Paper Analysis:**
• Collect 5-10 past papers per subject
• **Identify patterns** - What topics appear frequently?
• **Note question types** - Multiple choice, essays, calculations, etc.
• **Check mark allocation** - Which topics are worth the most marks?

**WEEK 6: Intensive Content Review**

**The 3-Pass System:**

**Pass 1: Quick Overview (20% of time)**
• Read through all notes quickly
• Don't try to memorize everything
• Mark areas that need more attention
• Get the "big picture" of each subject

**Pass 2: Active Study (60% of time)**
• Study weak areas intensively
• Use active techniques (summarizing, teaching, testing)
• Create memory aids (mnemonics, acronyms, mind maps)
• Practice calculations and problem-solving

**Pass 3: Review and Reinforce (20% of time)**
• Quick review of strong areas
• Final check of weak areas
• Test yourself on key concepts
• Update your study materials

**WEEK 5: Practice and Application**

**Past Paper Practice:**
• **Start with older papers** (get comfortable with format)
• **Time yourself strictly** - Build exam speed and stamina
• **Check answers thoroughly** - Understand mistakes completely
• **Keep an error log** - Track common mistakes and weak areas

**Study Techniques for Different Question Types:**

**Multiple Choice Questions:**
• Read questions carefully (look for "NOT," "EXCEPT," "BEST")
• Eliminate obviously wrong answers first
• Use educated guessing strategies
• Practice with lots of MCQs

**Essay Questions:**
• **Plan before writing** - Outline your answer first
• **Use PEEL structure** - Point, Evidence, Explanation, Link
• **Practice introductions and conclusions**
• **Time management** - Don't spend too long on one question

**Calculation Problems:**
• **Show all working** - You get marks for method even if answer is wrong
• **Check your answer** - Does it make sense?
• **Practice speed** - Know your formulas by heart
• **Double-check units** - Make sure units are correct

**WEEK 4: Memory Consolidation**

**Spaced Repetition System:**
• **Review strong topics** - Once every 3 days
• **Review medium topics** - Once every 2 days
• **Review weak topics** - Daily
• **Use flashcards** - Digital (Anki) or physical cards

**Memory Techniques:**

**For Facts and Definitions:**
• **Acronyms** - ROY G. BIV for colors of the rainbow
• **Stories** - Create memorable stories linking facts
• **Association** - Link new information to what you already know
• **Repetition** - Say it, write it, hear it, see it

**For Formulas and Equations:**
• **Understand the logic** - Don't just memorize
• **Practice derivations** - Know how formulas are derived
• **Use mnemonics** - Create memorable phrases
• **Apply frequently** - Use formulas in different contexts

**WEEK 3: Peak Performance Training**

**Exam Simulation:**
• **Full-length practice exams** - Complete papers under exam conditions
• **Time pressure training** - Practice with 10% less time than allowed
• **Concentration building** - Increase study session length gradually
• **Stress inoculation** - Practice in slightly uncomfortable conditions

**Physical and Mental Preparation:**
• **Sleep schedule** - Get 7-9 hours consistently
• **Exercise routine** - Light exercise daily (walking, stretching)
• **Nutrition plan** - Brain-healthy foods (fish, nuts, fruits, vegetables)
• **Stress management** - Deep breathing, meditation, positive visualization

**WEEK 2: Final Review and Stress Management**

**Content Finalization:**
• **No new material** - Only review what you've already studied
• **Quick reviews** - 30-minute sessions per subject daily
• **Confidence building** - Focus on what you know well
• **Last-minute resources** - Summary sheets, formula cards, key definitions

**Stress and Anxiety Management:**

**During Study:**
• **Take regular breaks** - 10 minutes every hour
• **Use relaxation techniques** - Progressive muscle relaxation
• **Stay positive** - Replace negative thoughts with realistic ones
• **Talk to support network** - Family, friends, teachers

**Pre-Exam Anxiety:**
• **Prepare everything the night before** - Clothes, stationery, documents
• **Avoid cramming** - Light review only
• **Do calming activities** - Listen to music, take a bath, read for pleasure
• **Get good sleep** - Aim for 8 hours before exam day

**WEEK 1: Exam Week Excellence**

**Daily Routine:**
• **Consistent wake-up time** - Even on weekends
• **Light review sessions** - 30-45 minutes maximum
• **Physical activity** - Walking, stretching, yoga
• **Adequate nutrition** - Regular meals, avoid too much caffeine

**Day Before Each Exam:**
• **Light review only** - No intensive studying
• **Organize materials** - Pack everything you need
• **Relax and rest** - Watch a movie, spend time with family
• **Early bedtime** - Get at least 8 hours sleep

**EXAM DAY STRATEGIES:**

**Morning Routine:**
• **Wake up early** - Don't rush
• **Eat breakfast** - Include protein and complex carbs
• **Light review** - Quick glance at summary notes
• **Arrive early** - 15-20 minutes before exam starts

**During the Exam:**

**First 5 Minutes:**
• **Read instructions carefully** - Understand requirements
• **Scan the entire paper** - Get overview of all questions
• **Plan your time** - Allocate time for each section
• **Start with confidence** - Begin with questions you know well

**Time Management:**
• **Stick to your time plan** - Don't spend too long on difficult questions
• **Keep track of time** - Check clock regularly
• **Leave difficult questions** - Come back to them later
• **Save time for review** - Reserve last 10-15 minutes for checking

**Dealing with Difficult Questions:**
• **Don't panic** - Everyone finds some questions challenging
• **Skip and return** - Come back with fresh perspective
• **Use process of elimination** - For multiple choice questions
• **Write something** - Partial marks are better than no marks

**Managing Exam Anxiety:**

**Before the Exam:**
• **Deep breathing** - 4 counts in, 4 counts hold, 4 counts out
• **Positive self-talk** - "I am prepared," "I can handle this"
• **Progressive muscle relaxation** - Tense and release muscle groups
• **Visualization** - See yourself succeeding in the exam

**During the Exam:**
• **If you blank out** - Close your eyes, take deep breaths, start with easy questions
• **If you feel overwhelmed** - Take a 30-second mental break
• **Stay focused** - Don't worry about other students' progress
• **Keep perspective** - This is one exam, not your entire future

**POST-EXAM STRATEGIES:**

**After Each Exam:**
• **Don't discuss answers** - What's done is done
• **Reward yourself** - Small celebration for completing the exam
• **Prepare for next** - Light review for upcoming exams
• **Rest and recover** - Take time to recharge

**Common Exam Mistakes to Avoid:**
• **Not reading questions carefully** - Misunderstanding what's being asked
• **Poor time management** - Spending too long on one section
• **Changing correct answers** - Trust your first instinct unless you're certain
• **Leaving questions blank** - Always attempt every question
• **Ignoring mark allocation** - Spend time proportional to marks available

**Emergency Strategies:**

**If You're Behind in Studies:**
• **Focus on high-weight topics** - Maximum marks for minimum time
• **Use past papers** - Identify most important concepts
• **Study with others** - Learn from classmates who are ahead
• **Get help** - Ask teachers for guidance on priority topics

**If You Feel Unprepared:**
• **Do what you can** - Any preparation is better than none
• **Focus on understanding** - Not just memorization
• **Stay calm** - Anxiety will only make things worse
• **Do your best** - That's all anyone can ask

**Remember:** Exam success isn't just about intelligence - it's about preparation, strategy, and mental toughness. Follow this system consistently, and you'll see dramatic improvements in your exam performance.

**Your 8-week journey from anxiety to A's starts now!**`,
    isActive: true,
    createdAt: "2024-01-17T10:00:00Z",
    updatedAt: "2024-01-17T10:00:00Z",
  },
  {
    id: "tip-4",
    title: "Study Environment Setup: Creating Your Learning Sanctuary",
    description:
      "Design the perfect study space for maximum focus and productivity",
    category: "environment",
    difficulty: "beginner",
    tags: ["environment", "productivity", "focus", "organization"],
    content: `**Your study environment can make or break your academic success. Here's how to create a space that maximizes learning.**

**THE SCIENCE BEHIND STUDY ENVIRONMENTS:**

**Why Environment Matters:**
• **Cognitive load theory** - Cluttered spaces increase mental fatigue
• **Conditioning** - Your brain associates specific spaces with specific activities
• **Sensory processing** - Too much stimulation reduces concentration
• **Mood influence** - Environment affects motivation and energy levels

**Research findings:**
• **Students in organized spaces** score 12% higher on tests
• **Natural light** improves focus by 23% compared to artificial light
• **Noise levels above 50 decibels** reduce learning efficiency by 66%
• **Temperature between 20-22°C** optimizes cognitive performance

**DESIGNING YOUR STUDY SANCTUARY:**

**Location Selection:**

**Ideal Study Space Characteristics:**
• **Quiet** - Minimal interruptions and distracting sounds
• **Good lighting** - Natural light preferred, or bright artificial light
• **Comfortable temperature** - Not too hot or cold
• **Low traffic** - People don't constantly walk through
• **Dedicated** - Used primarily for studying, not relaxation

**Options for South African Students:**
• **Bedroom corner** - If you have space and can make it distraction-free
• **Kitchen table** - During quiet hours when family isn't around
• **Library** - Local library, school library, or university library
• **Study groups** - Friend's house, community center, church hall
• **Outdoors** - Garden, veranda, park (weather permitting)

**FURNITURE AND SETUP:**

**Essential Items:**

**1. Study Surface:**
• **Size** - Large enough for textbooks, notebooks, and laptop
• **Height** - Elbow level when sitting properly
• **Stability** - No wobbling or shaking when writing
• **Surface** - Smooth, easy to clean, not reflective

**2. Seating:**
• **Chair height** - Feet flat on floor, thighs parallel to ground
• **Back support** - Maintains natural spine curve
• **Comfort level** - Comfortable but not too comfortable (no bed!)
• **Adjustability** - Can modify height and angle if possible

**3. Storage and Organization:**
• **Shelving** - For textbooks and reference materials
• **Drawers** - For stationery, calculators, and supplies
• **File system** - For notes, handouts, and past papers
• **Bulletin board** - For schedules, reminders, and motivation

**Budget-Friendly Setup Tips:**
• **Use what you have** - Repurpose existing furniture
• **DIY solutions** - Cardboard boxes for organization, cushions for comfort
• **Second-hand items** - Check classifieds for cheap desks and chairs
• **Shared spaces** - Negotiate family time for dedicated study hours

**LIGHTING OPTIMIZATION:**

**Natural Light (Best Option):**
• **Position** - Sit perpendicular to window (light from the side)
• **Time management** - Study during daylight hours when possible
• **Glare prevention** - Use curtains or blinds to control brightness
• **Seasonal adjustment** - Move setup as sun angle changes

**Artificial Lighting:**
• **Desk lamp** - Bright, adjustable, positioned to avoid shadows
• **Room lighting** - General illumination to reduce eye strain
• **Color temperature** - Cool white (4000-6500K) for alertness
• **Avoid fluorescent** - Causes eye fatigue and headaches over time

**Load Shedding Solutions:**
• **Solar-powered lamps** - Investment for long-term use
• **Battery-powered LED lights** - Portable and bright
• **Candles with care** - Only as last resort, with proper safety
• **Study during power hours** - Plan schedule around electricity availability

**TECHNOLOGY INTEGRATION:**

**Essential Tech Tools:**
• **Computer/laptop** - For research, typing, and online resources
• **Calculator** - Scientific or graphing depending on subjects
• **Timer** - For time management and Pomodoro technique
• **Smartphone** - With study apps (but manage distractions)

**Digital Organization:**
• **File management** - Organized folders for each subject
• **Cloud storage** - Google Drive, Dropbox for backup and access
• **Note-taking apps** - OneNote, Notion, or Evernote
• **Reference managers** - For research sources and citations

**Internet and Connectivity:**
• **Reliable connection** - For online research and resources
• **Data management** - Use WiFi when available to save mobile data
• **Offline preparation** - Download materials when you have good connection
• **Distraction blocking** - Apps to block social media during study time

**MINIMIZING DISTRACTIONS:**

**Physical Distractions:**
• **Clutter removal** - Only study materials on desk
• **Visual distractions** - Face away from TV, busy areas
• **Noise control** - Use earplugs, background music, or white noise
• **Movement** - Choose stable furniture, secure loose items

**Digital Distractions:**
• **Phone management** - Silent mode, airplane mode, or separate room
• **Social media** - Log out of accounts, use website blockers
• **Notifications** - Turn off non-essential app notifications
• **Entertainment** - No Netflix, games, or music videos during study

**Family and Social Distractions:**
• **Communication** - Tell family your study schedule
• **Boundaries** - Request not to be disturbed during certain hours
• **Negotiation** - Offer to help with chores outside study time
• **Alternatives** - Suggest family activities during your break times

**COMFORT AND ERGONOMICS:**

**Physical Comfort:**
• **Posture** - Sit up straight, feet flat, shoulders relaxed
• **Eye level** - Monitor/books at eye level to prevent neck strain
• **Breaks** - Stand and stretch every 30-60 minutes
• **Hydration** - Water bottle within reach, regular sips

**Temperature Control:**
• **Ventilation** - Fresh air circulation prevents drowsiness
• **Layered clothing** - Easy to adjust if temperature changes
• **Fans** - For hot weather without access to air conditioning
• **Warmth** - Blanket or extra layers for cold weather

**Air Quality:**
• **Plants** - Some plants can improve air quality (spider plants, pothos)
• **Cleaning** - Regular cleaning reduces dust and allergens
• **Ventilation** - Open windows when weather permits
• **Humidity** - Avoid too dry or too humid conditions

**PERSONALIZATION AND MOTIVATION:**

**Motivational Elements:**
• **Goal visualization** - Pictures of university you want to attend
• **Progress tracking** - Charts showing improvement over time
• **Inspirational quotes** - Positive messages where you can see them
• **Achievement display** - Certificates, awards, good test results

**Personal Touches:**
• **Photos** - Family, friends, or places that motivate you
• **Colors** - Use colors that energize you (but not too stimulating)
• **Scents** - Light, pleasant scents like lavender or peppermint
• **Music** - Instrumental or ambient music that helps you focus

**ORGANIZATION SYSTEMS:**

**Paper Organization:**
• **Subject folders** - Separate folder for each subject
• **Date system** - Date all notes and handouts
• **Color coding** - Different colors for different subjects or topics
• **Filing schedule** - Weekly organization of loose papers

**Digital Organization:**
• **Folder structure** - Mirror your physical organization digitally
• **Naming conventions** - Consistent file naming for easy searching
• **Backup system** - Regular backups to prevent data loss
• **Sync across devices** - Access materials from phone, tablet, computer

**Supply Management:**
• **Inventory** - Regular check of pens, paper, batteries
• **Bulk buying** - Save money by buying in bulk when possible
• **Quality over quantity** - Invest in good pens, notebooks that last
• **Emergency kit** - Extra supplies for last-minute needs

**MAINTENANCE AND UPDATES:**

**Daily Maintenance:**
• **End-of-day cleanup** - 5 minutes to organize for tomorrow
• **Supply check** - Ensure you have what you need for tomorrow
• **Schedule review** - Check tomorrow's study plan
• **Motivation refresh** - Read goals, look at progress

**Weekly Updates:**
• **Deep cleaning** - Thorough organization and cleaning
• **Supply restocking** - Replace used items, update materials
• **Layout adjustment** - Modify setup based on what's working
• **Goal review** - Update goals and motivation materials

**Seasonal Changes:**
• **Lighting adjustment** - Account for changing daylight hours
• **Temperature control** - Adapt to weather changes
�� **Schedule modification** - Adjust for seasonal schedule changes
• **Space refresh** - Occasional rearrangement to maintain interest

**TROUBLESHOOTING COMMON PROBLEMS:**

**"I can't concentrate in my study space"**
• Check for distractions you might have missed
• Try different times of day
• Experiment with background sounds
• Consider changing location temporarily

**"My family keeps interrupting me"**
• Have a clear conversation about your needs
• Post a study schedule where everyone can see it
• Offer to help with family tasks during your breaks
• Consider studying at alternative locations during busy times

**"I feel tired or unmotivated in my study area"**
• Check lighting - you might need brighter lights
• Improve ventilation and air circulation
• Add motivational elements
• Take more frequent breaks

**"I don't have enough space"**
• Use vertical storage solutions
• Multi-purpose furniture (storage ottoman, desk with drawers)
• Mobile study cart that can be moved and stored
• Negotiate shared space with family members

**Remember:** Your study environment should work FOR you, not against you. Invest time in creating a space that supports your learning goals, and you'll see improvements in both your focus and your results.

**Start small - make one improvement today, then build from there!**`,
    isActive: true,
    createdAt: "2024-01-18T10:00:00Z",
    updatedAt: "2024-01-18T10:00:00Z",
  },
  {
    id: "tip-5",
    title: "Staying Motivated: From Burnout to Breakthrough",
    description:
      "Mental strategies to maintain drive throughout your academic journey",
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

**MIND MAPPING TECHNIQUE:**

**When to use:**
• Complex topics with many connections
• Brainstorming and planning
• Visual learners
• Review sessions

**How to create:**
• **Central topic** in middle of page
• **Main branches** for key themes
• **Sub-branches** for details
• **Colors and symbols** for organization
• **Keywords only** - no full sentences

**OUTLINE METHOD:**

**Structure:**
• **Main topics** - Roman numerals (I, II, III)
• **Subtopics** - Capital letters (A, B, C)
• **Details** - Numbers (1, 2, 3)
• **Sub-details** - Lower case letters (a, b, c)

**Best for:**
• Lecture-style classes
• Textbook reading
• Logical, sequential information
• Traditional learners

**DIGITAL NOTE-TAKING:**

**Advantages:**
• Easy to edit and reorganize
• Searchable content
• Multimedia integration
• Cloud synchronization
• Eco-friendly

**Popular apps:**
• **OneNote** - Free, great organization
• **Notion** - Powerful, customizable
• **Evernote** - Excellent web clipper
• **Google Docs** - Simple, collaborative
• **Obsidian** - Advanced linking features

**Tips for digital notes:**
• Use consistent formatting
• Create templates for different subjects
• Regular backup to cloud
• Learn keyboard shortcuts
• Use tags for easy searching

**SUBJECT-SPECIFIC STRATEGIES:**

**Mathematics:**
• Write out full solutions
• Box final answers
• Include step-by-step reasoning
• Practice problems in margins
• Use different colors for different concepts

**Sciences:**
• Draw diagrams and processes
• Include formulas and units
• Connect theory to practicals
• Use flowcharts for processes
• Highlight key terms and definitions

**Languages:**
• Include examples and context
• Practice spelling and grammar
• Note pronunciation guides
• Create vocabulary lists
• Connect to personal experiences

**History:**
• Create timelines
• Note cause and effect relationships
• Include important dates and names
• Connect events to broader themes
• Use maps and visual aids

**ACTIVE NOTE-TAKING STRATEGIES:**

**During reading:**
• **Preview** - Skim before detailed reading
• **Question** - Ask what you expect to learn
• **Summarize** - After each section
• **Connect** - Link to previous knowledge
• **Review** - Go back over notes immediately

**During lectures:**
• **Listen actively** - Focus on understanding
• **Identify key points** - What's most important?
• **Ask questions** - Clarify confusing points
• **Participate** - Engage with the material
• **Review quickly** - Right after class

**NOTE ORGANIZATION SYSTEMS:**

**Physical organization:**
• **Separate notebooks** for each subject
• **Date all pages** - Easy chronological reference
• **Number pages** - Create your own index
• **Use dividers** - Separate topics within subjects
• **Color coding** - Different colors for different purposes

**Digital organization:**
• **Folder structure** - Mirror your physical system
• **Naming conventions** - Consistent file naming
• **Tags and labels** - For easy searching
• **Regular cleanup** - Delete or archive old notes
• **Backup system** - Multiple copies in different locations

**REVIEW AND REVISION STRATEGIES:**

**Immediate review (within 24 hours):**
• Fill in gaps and missing information
• Clarify confusing points
• Add connections to other material
• Highlight most important points
• Create summary questions

**Weekly review:**
• Re-read all notes from the week
• Create study guides or summaries
• Practice recall without looking
• Connect new information to old
• Identify areas needing more study

**Pre-exam review:**
• Use Cornell cue column for self-testing
• Create concept maps from notes
• Practice explaining concepts out loud
• Focus on connections between topics
• Time yourself on key processes

**COMMON NOTE-TAKING MISTAKES:**

**Mistake: Writing down everything**
Solution: Focus on main ideas and connections

**Mistake: Not reviewing notes regularly**
Solution: Schedule weekly review sessions

**Mistake: Poor handwriting or organization**
Solution: Slow down, use clear formatting

**Mistake: Passive copying from board/slides**
Solution: Process and rephrase in your own words

**Mistake: Not asking questions when confused**
Solution: Mark unclear areas, ask for clarification

**ADVANCED TECHNIQUES:**

**The Feynman Technique:**
• Choose a topic from your notes
• Explain it in simple terms
• Identify gaps in understanding
• Go back to source material
• Repeat until mastery

**Spaced repetition:**
• Review notes at increasing intervals
• Day 1, Day 3, Day 7, Day 21
• Focus on difficult concepts
• Use flashcards for key facts
• Track your progress

**Teaching others:**
• Explain concepts to classmates
• Create study groups
• Make tutorial videos
• Write blog posts or articles
• Answer questions on forums

Remember: Great notes are not just about recording information - they're about creating a personalized learning resource that helps you understand, remember, and apply knowledge effectively.`,
    isActive: true,
    createdAt: "2024-01-20T10:00:00Z",
    updatedAt: "2024-01-20T10:00:00Z",
  },
];

// Comprehensive study resources
const REAL_STUDY_RESOURCES: StudyResource[] = [
  {
    id: "resource-1",
    title: "Ultimate Study Planner Template",
    description:
      "Complete study planning template with weekly schedules, goal tracking, and progress monitoring designed specifically for South African curriculum.",
    type: "template",
    category: "planning",
    difficulty: "beginner",
    downloadUrl: "#",
    tags: ["planning", "organization", "schedule"],
    isFeatured: true,
    author: "ReBooked Campus",
    createdAt: "2024-01-15T10:00:00Z",
    updatedAt: "2024-01-15T10:00:00Z",
  },
  {
    id: "resource-2",
    title: "Exam Countdown Calendar",
    description:
      "Customizable exam preparation calendar with milestone tracking and subject rotation schedules for optimal exam preparation.",
    type: "template",
    category: "exam-prep",
    difficulty: "intermediate",
    downloadUrl: "#",
    tags: ["exams", "calendar", "preparation"],
    isFeatured: true,
    author: "Study Success Team",
    createdAt: "2024-01-16T10:00:00Z",
    updatedAt: "2024-01-16T10:00:00Z",
  },
  {
    id: "resource-3",
    title: "Mathematics Formula Sheet Generator",
    description:
      "Interactive tool to create personalized formula sheets for Grade 10-12 Mathematics, including examples and practice problems.",
    type: "tool",
    category: "mathematics",
    difficulty: "intermediate",
    downloadUrl: "#",
    tags: ["mathematics", "formulas", "reference"],
    isFeatured: false,
    author: "Math Masters SA",
    createdAt: "2024-01-17T10:00:00Z",
    updatedAt: "2024-01-17T10:00:00Z",
  },
  {
    id: "resource-4",
    title: "Physical Sciences Practical Guide",
    description:
      "Comprehensive guide to Physical Sciences practicals with safety protocols, procedures, and analysis techniques for SA curriculum.",
    type: "guide",
    category: "science",
    difficulty: "advanced",
    downloadUrl: "#",
    tags: ["physics", "chemistry", "practicals"],
    isFeatured: true,
    author: "Science Lab Pro",
    createdAt: "2024-01-18T10:00:00Z",
    updatedAt: "2024-01-18T10:00:00Z",
  },
  {
    id: "resource-5",
    title: "Essay Writing Masterclass",
    description:
      "Step-by-step video series covering essay structure, argument development, and writing techniques for all language subjects.",
    type: "video",
    category: "writing",
    difficulty: "intermediate",
    downloadUrl: "#",
    tags: ["writing", "essays", "languages"],
    isFeatured: false,
    author: "Write Right SA",
    createdAt: "2024-01-19T10:00:00Z",
    updatedAt: "2024-01-19T10:00:00Z",
  },
  {
    id: "resource-6",
    title: "Cornell Note-Taking Templates",
    description:
      "Professional Cornell note-taking templates for different subjects, including digital and printable versions.",
    type: "template",
    category: "note-taking",
    difficulty: "beginner",
    downloadUrl: "#",
    tags: ["notes", "organization", "templates"],
    isFeatured: false,
    author: "Note Pro",
    createdAt: "2024-01-20T10:00:00Z",
    updatedAt: "2024-01-20T10:00:00Z",
  },
  {
    id: "resource-7",
    title: "Mind Mapping Software Tutorial",
    description:
      "Complete tutorial on using mind mapping software for visual learning, including templates for different subjects.",
    type: "tutorial",
    category: "visual-learning",
    difficulty: "beginner",
    downloadUrl: "#",
    tags: ["mind-maps", "visual", "learning"],
    isFeatured: false,
    author: "Visual Learning Hub",
    createdAt: "2024-01-21T10:00:00Z",
    updatedAt: "2024-01-21T10:00:00Z",
  },
  {
    id: "resource-8",
    title: "Memory Techniques Handbook",
    description:
      "Comprehensive guide to memory techniques including mnemonics, visualization, and spaced repetition for better retention.",
    type: "guide",
    category: "memory",
    difficulty: "intermediate",
    downloadUrl: "#",
    tags: ["memory", "mnemonics", "retention"],
    isFeatured: true,
    author: "Memory Masters",
    createdAt: "2024-01-22T10:00:00Z",
    updatedAt: "2024-01-22T10:00:00Z",
  },
  {
    id: "resource-9",
    title: "Study Group Organization Kit",
    description:
      "Complete toolkit for organizing and running effective study groups, including role assignments and activity templates.",
    type: "toolkit",
    category: "collaboration",
    difficulty: "intermediate",
    downloadUrl: "#",
    tags: ["groups", "collaboration", "organization"],
    isFeatured: false,
    author: "Collaborative Learning",
    createdAt: "2024-01-23T10:00:00Z",
    updatedAt: "2024-01-23T10:00:00Z",
  },
  {
    id: "resource-10",
    title: "Time Management Tracker",
    description:
      "Digital time tracking tool to monitor study sessions, identify productivity patterns, and optimize study schedules.",
    type: "tool",
    category: "time-management",
    difficulty: "beginner",
    downloadUrl: "#",
    tags: ["time", "tracking", "productivity"],
    isFeatured: false,
    author: "Time Wise",
    createdAt: "2024-01-24T10:00:00Z",
    updatedAt: "2024-01-24T10:00:00Z",
  },
  {
    id: "resource-11",
    title: "Stress Management Workbook",
    description:
      "Interactive workbook with stress assessment tools, coping strategies, and relaxation techniques for academic pressure.",
    type: "workbook",
    category: "wellness",
    difficulty: "beginner",
    downloadUrl: "#",
    tags: ["stress", "wellness", "mental-health"],
    isFeatured: false,
    author: "Wellness Warriors",
    createdAt: "2024-01-25T10:00:00Z",
    updatedAt: "2024-01-25T10:00:00Z",
  },
  {
    id: "resource-12",
    title: "Career Planning Worksheet",
    description:
      "Comprehensive career exploration worksheet linking current studies to future career paths and university choices.",
    type: "worksheet",
    category: "career",
    difficulty: "intermediate",
    downloadUrl: "#",
    tags: ["career", "planning", "future"],
    isFeatured: true,
    author: "Future Focus",
    createdAt: "2024-01-26T10:00:00Z",
    updatedAt: "2024-01-26T10:00:00Z",
  },
];

const StudyResourcesPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [difficultyFilter, setDifficultyFilter] = useState("all");
  const [expandedTips, setExpandedTips] = useState<Set<string>>(new Set());

  // Optimize filtering with useMemo for better performance
  const filteredTips = useMemo(() => {
    if (!searchTerm && categoryFilter === "all" && difficultyFilter === "all") {
      return REAL_STUDY_TIPS.filter((tip) => tip.isActive);
    }

    const lowercaseSearch = searchTerm.toLowerCase();
    return REAL_STUDY_TIPS.filter((tip) => {
      if (!tip.isActive) return false;

      const matchesSearch =
        !searchTerm ||
        tip.title.toLowerCase().includes(lowercaseSearch) ||
        tip.description.toLowerCase().includes(lowercaseSearch) ||
        tip.tags.some((tag) => tag.toLowerCase().includes(lowercaseSearch));

      const matchesCategory =
        categoryFilter === "all" || tip.category === categoryFilter;
      const matchesDifficulty =
        difficultyFilter === "all" || tip.difficulty === difficultyFilter;

      return matchesSearch && matchesCategory && matchesDifficulty;
    });
  }, [searchTerm, categoryFilter, difficultyFilter]);

  const filteredResources = useMemo(() => {
    if (!searchTerm && categoryFilter === "all" && difficultyFilter === "all") {
      return REAL_STUDY_RESOURCES;
    }

    const lowercaseSearch = searchTerm.toLowerCase();
    return REAL_STUDY_RESOURCES.filter((resource) => {
      const matchesSearch =
        !searchTerm ||
        resource.title.toLowerCase().includes(lowercaseSearch) ||
        resource.description.toLowerCase().includes(lowercaseSearch) ||
        resource.tags.some((tag) =>
          tag.toLowerCase().includes(lowercaseSearch),
        );

      const matchesCategory =
        categoryFilter === "all" || resource.category === categoryFilter;
      const matchesDifficulty =
        difficultyFilter === "all" || resource.difficulty === difficultyFilter;

      return matchesSearch && matchesCategory && matchesDifficulty;
    });
  }, [searchTerm, categoryFilter, difficultyFilter]);

  const handleDownload = (resource: StudyResource) => {
    // Simulate download
    console.log(`Downloading ${resource.title}`);
    // In a real app, this would trigger an actual download
  };

  const toggleTipExpansion = (tipId: string) => {
    const newExpanded = new Set(expandedTips);
    if (newExpanded.has(tipId)) {
      newExpanded.delete(tipId);
    } else {
      newExpanded.add(tipId);
    }
    setExpandedTips(newExpanded);
  };

  const renderTipContent = (tip: StudyTip) => {
    const isExpanded = expandedTips.has(tip.id);
    const paragraphs = tip.content.split("\n");
    const previewLength = 3; // Show first 3 paragraphs in collapsed state

    const contentToShow = isExpanded
      ? paragraphs
      : paragraphs.slice(0, previewLength);
    const hasMoreContent = paragraphs.length > previewLength;

    return (
      <div className="prose prose-sm md:prose-base max-w-none">
        {contentToShow.map((paragraph, index) => {
          // Main headings
          if (
            paragraph.trim().startsWith("**") &&
            paragraph.trim().endsWith("**") &&
            paragraph.length > 10
          ) {
            return (
              <div
                key={index}
                className="bg-green-50 p-3 rounded-lg mb-4 mt-4 border-l-4 border-green-300"
              >
                <h4 className="font-bold text-base md:text-lg mb-0 text-gray-900 flex items-center gap-2">
                  <Award className="h-4 w-4 text-green-600" />
                  {paragraph.replace(/\*\*/g, "")}
                </h4>
              </div>
            );
          }
          // Sub-headings
          if (
            paragraph.trim().startsWith("**") &&
            paragraph.trim().endsWith("**")
          ) {
            return (
              <h5
                key={index}
                className="font-semibold text-sm md:text-base mb-2 mt-3 text-gray-900 flex items-center gap-2"
              >
                <CheckSquare className="h-4 w-4 text-gray-500" />
                {paragraph.replace(/\*\*/g, "")}
              </h5>
            );
          }
          // Bullet points
          if (paragraph.trim().startsWith("•")) {
            return (
              <div key={index} className="flex items-start gap-2 ml-4 mb-2">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-sm md:text-base text-gray-700">
                  {paragraph.replace("•", "").trim()}
                </span>
              </div>
            );
          }
          // Regular paragraphs
          if (paragraph.trim()) {
            return (
              <p
                key={index}
                className="mb-3 text-sm md:text-base text-gray-700 leading-relaxed"
              >
                {paragraph}
              </p>
            );
          }
          return <div key={index} className="h-2" />;
        })}

        {hasMoreContent && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <Button
              variant="ghost"
              onClick={() => toggleTipExpansion(tip.id)}
              className="w-full sm:w-auto text-green-600 hover:text-green-700 hover:bg-green-50"
            >
              {isExpanded ? (
                <>
                  <ChevronUp className="h-4 w-4 mr-2" />
                  Show Less
                </>
              ) : (
                <>
                  <ChevronDown className="h-4 w-4 mr-2" />
                  Read More
                </>
              )}
            </Button>
          </div>
        )}
      </div>
    );
  };

  const getCategoryIcon = (category: string) => {
    const iconMap: Record<string, JSX.Element> = {
      "time-management": <Clock className="h-5 w-5 text-blue-500" />,
      "study-techniques": <Brain className="h-5 w-5 text-green-500" />,
      "exam-prep": <Target className="h-5 w-5 text-red-500" />,
      environment: <Users className="h-5 w-5 text-purple-500" />,
      motivation: <TrendingUp className="h-5 w-5 text-orange-500" />,
      "note-taking": <PenTool className="h-5 w-5 text-indigo-500" />,
    };
    return iconMap[category] || <BookOpen className="h-5 w-5 text-gray-500" />;
  };

  const getTypeIcon = (type: string) => {
    const iconMap: Record<string, JSX.Element> = {
      template: <FileText className="h-4 w-4 text-blue-500" />,
      guide: <BookOpen className="h-4 w-4 text-green-500" />,
      video: <Play className="h-4 w-4 text-red-500" />,
      tool: <Target className="h-4 w-4 text-purple-500" />,
      tutorial: <Lightbulb className="h-4 w-4 text-yellow-500" />,
      toolkit: <Users className="h-4 w-4 text-indigo-500" />,
      workbook: <PenTool className="h-4 w-4 text-pink-500" />,
      worksheet: <CheckSquare className="h-4 w-4 text-teal-500" />,
    };
    return iconMap[type] || <FileText className="h-4 w-4 text-gray-500" />;
  };

  const getDifficultyColor = (difficulty: string) => {
    const colorMap: Record<string, string> = {
      beginner: "bg-green-100 text-green-800",
      intermediate: "bg-yellow-100 text-yellow-800",
      advanced: "bg-red-100 text-red-800",
    };
    return colorMap[difficulty] || "bg-gray-100 text-gray-800";
  };

  return (
    <div className="container mx-auto px-4 py-6 md:py-8 space-y-6 md:space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900">
          Study Resources & Tips
        </h1>
        <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
          Master your studies with expert tips, proven techniques, and practical
          resources designed specifically for South African students.
        </p>
      </div>

      {/* Search and Filters */}
      <Card className="p-4 md:p-6">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search tips and resources..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="time-management">Time Management</SelectItem>
                <SelectItem value="study-techniques">
                  Study Techniques
                </SelectItem>
                <SelectItem value="exam-prep">Exam Preparation</SelectItem>
                <SelectItem value="environment">Environment</SelectItem>
                <SelectItem value="motivation">Motivation</SelectItem>
                <SelectItem value="note-taking">Note Taking</SelectItem>
                <SelectItem value="planning">Planning</SelectItem>
                <SelectItem value="mathematics">Mathematics</SelectItem>
                <SelectItem value="science">Science</SelectItem>
                <SelectItem value="writing">Writing</SelectItem>
                <SelectItem value="visual-learning">Visual Learning</SelectItem>
                <SelectItem value="memory">Memory</SelectItem>
                <SelectItem value="collaboration">Collaboration</SelectItem>
                <SelectItem value="wellness">Wellness</SelectItem>
                <SelectItem value="career">Career</SelectItem>
              </SelectContent>
            </Select>

            <Select
              value={difficultyFilter}
              onValueChange={setDifficultyFilter}
            >
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Difficulty" />
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
      </Card>

      {/* Results count */}
      <div className="text-center text-gray-600">
        <p className="text-sm md:text-base">
          Found {filteredTips.length} tips and {filteredResources.length}{" "}
          resources
        </p>
      </div>

      {/* Content Tabs */}
      <Tabs defaultValue="tips" className="w-full">
        <TabsList className="grid w-full grid-cols-2 h-12">
          <TabsTrigger
            value="tips"
            className="flex items-center gap-2 text-sm md:text-base"
          >
            <Lightbulb className="h-4 w-4" />
            <span className="hidden sm:inline">Study Tips</span>
            <span className="sm:hidden">Tips</span>({filteredTips.length})
          </TabsTrigger>
          <TabsTrigger
            value="resources"
            className="flex items-center gap-2 text-sm md:text-base"
          >
            <BookOpen className="h-4 w-4" />
            <span className="hidden sm:inline">Resources</span>
            <span className="sm:hidden">Files</span>({filteredResources.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="tips" className="space-y-4 md:space-y-6">
          <div className="grid gap-4 md:gap-6">
            {filteredTips.map((tip) => (
              <Card
                key={tip.id}
                className="hover:shadow-md transition-all duration-300 border border-gray-200 hover:border-green-200"
              >
                <CardHeader className="pb-4">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between space-y-2 sm:space-y-0">
                    <div className="flex-1">
                      <CardTitle className="text-lg md:text-xl flex items-start gap-3">
                        <div className="p-2 bg-green-50 rounded-full">
                          <Lightbulb className="h-5 w-5 md:h-6 md:w-6 text-green-600 flex-shrink-0" />
                        </div>
                        <span className="leading-tight text-gray-900">
                          {tip.title}
                        </span>
                      </CardTitle>
                      <CardDescription className="mt-3 text-sm md:text-base text-gray-600">
                        {tip.description}
                      </CardDescription>
                    </div>
                    <div className="flex flex-col sm:items-end space-y-2">
                      <Badge
                        variant="outline"
                        className="text-xs self-start sm:self-end font-medium bg-white border-gray-300"
                      >
                        <Target className="h-3 w-3 mr-1" />
                        {tip.difficulty}
                      </Badge>
                      <Badge
                        variant="outline"
                        className="text-xs self-start sm:self-end capitalize bg-white border-gray-300"
                      >
                        <BookOpen className="h-3 w-3 mr-1" />
                        {tip.category.replace("-", " ")}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="bg-white">
                  {renderTipContent(tip)}
                  <div className="flex flex-wrap gap-2 mt-6 pt-4 border-t border-gray-100">
                    {tip.tags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="outline"
                        className="text-xs bg-gray-50 border-gray-200 text-gray-600"
                      >
                        #{tag}
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
              <Star className="h-5 w-5 md:h-6 md:w-6 text-green-500" />
              Featured Resources
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {filteredResources
                .filter((r) => r.isFeatured)
                .map((resource) => (
                  <Card
                    key={resource.id}
                    className="overflow-hidden hover:shadow-lg transition-shadow"
                  >
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
                      <CardTitle className="text-base md:text-lg leading-tight">
                        {resource.title}
                      </CardTitle>
                      <CardDescription className="text-sm">
                        {resource.description}
                      </CardDescription>
                    </CardHeader>

                    <CardContent>
                      <div className="flex flex-wrap gap-1 mb-4">
                        {resource.tags.slice(0, 3).map((tag) => (
                          <Badge
                            key={tag}
                            variant="secondary"
                            className="text-xs"
                          >
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
                        {resource.type === "template" ||
                        resource.type === "pdf" ? (
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
            <h3 className="text-xl md:text-2xl font-semibold mb-4 flex items-center gap-2">
              <BookOpen className="h-5 w-5 md:h-6 md:w-6 text-green-500" />
              All Resources
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {filteredResources.map((resource) => (
                <Card
                  key={resource.id}
                  className="overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-2 mb-2">
                      {getTypeIcon(resource.type)}
                      <Badge variant="outline" className="text-xs">
                        {resource.type}
                      </Badge>
                      <Badge
                        className={getDifficultyColor(resource.difficulty)}
                      >
                        {resource.difficulty}
                      </Badge>
                    </div>
                    <CardTitle className="text-base md:text-lg leading-tight">
                      {resource.title}
                    </CardTitle>
                    <CardDescription className="text-sm">
                      {resource.description}
                    </CardDescription>
                  </CardHeader>

                  <CardContent>
                    <div className="flex flex-wrap gap-1 mb-4">
                      {resource.tags.slice(0, 3).map((tag) => (
                        <Badge
                          key={tag}
                          variant="secondary"
                          className="text-xs"
                        >
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
                      {resource.type === "template" ||
                      resource.type === "pdf" ? (
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
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default StudyResourcesPage;
