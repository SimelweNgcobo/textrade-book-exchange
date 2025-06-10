
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import SEO from "@/components/SEO";
import { WaitlistService } from "@/services/waitlistService";
import {
  BookOpen,
  Search,
  ShieldCheck,
  Users,
  Truck,
  CheckCircle,
  Mail,
  Heart,
  TrendingUp,
  Calculator,
  GraduationCap,
  MapPin,
  DollarSign,
  Star,
  Globe,
  Award,
  Clock,
  Filter,
  MessageSquare,
  CreditCard,
  Package,
  FileText,
  Building2,
  Bookmark,
  Target,
} from "lucide-react";
import { toast } from "sonner";

const LandingPage = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleWaitlistSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      toast.error("Please enter a valid email address");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    setIsSubmitting(true);
    try {
      const result = await WaitlistService.addToWaitlist(email);
      if (result.success) {
        toast.success("You're on the waitlist! We'll notify you when we launch.");
        setEmail("");
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const marketplaceFeatures = [
    {
      icon: Search,
      title: "Smart Search & Filtering",
      description: "Advanced search by title, author, ISBN, subject, university, or course code",
      color: "bg-blue-100 text-blue-600",
    },
    {
      icon: ShieldCheck,
      title: "Secure & Verified",
      description: "Student verification, secure payments, and buyer protection policies",
      color: "bg-green-100 text-green-600",
    },
    {
      icon: Truck,
      title: "Nationwide Delivery",
      description: "Reliable shipping partnerships covering all major cities and campuses",
      color: "bg-purple-100 text-purple-600",
    },
    {
      icon: Filter,
      title: "Condition Grading",
      description: "Detailed condition ratings with photos to ensure transparency",
      color: "bg-orange-100 text-orange-600",
    },
    {
      icon: MessageSquare,
      title: "Direct Communication",
      description: "Built-in messaging system for buyer-seller communication",
      color: "bg-teal-100 text-teal-600",
    },
    {
      icon: CreditCard,
      title: "Flexible Payments",
      description: "Multiple payment options including mobile money and bank transfers",
      color: "bg-indigo-100 text-indigo-600",
    },
  ];

  const campusFeatures = [
    {
      icon: GraduationCap,
      title: "University Database",
      description: "Complete directory of all 26 public universities and 100+ private institutions in South Africa",
      details: [
        "Course catalogs and requirements",
        "Faculty information and contact details",
        "Campus locations and facilities",
        "Application deadlines and procedures"
      ],
      color: "bg-blue-100 text-blue-600",
    },
    {
      icon: Calculator,
      title: "APS Calculator",
      description: "Calculate your Admission Point Score for any South African university",
      details: [
        "NSC and IEB grade calculations",
        "University-specific APS requirements",
        "Course minimum requirements checker",
        "Alternative qualification support"
      ],
      color: "bg-green-100 text-green-600",
    },
    {
      icon: DollarSign,
      title: "Financial Aid Hub",
      description: "Comprehensive database of funding opportunities for South African students",
      details: [
        "NSFAS application guidance",
        "Private bursary opportunities",
        "Merit-based scholarships",
        "Industry-specific funding programs"
      ],
      color: "bg-purple-100 text-purple-600",
    },
    {
      icon: BookOpen,
      title: "Academic Resources",
      description: "University-specific textbook listings and academic support materials",
      details: [
        "Course-specific textbook requirements",
        "Professor recommendations",
        "Study group connections",
        "Past paper repositories"
      ],
      color: "bg-orange-100 text-orange-600",
    },
  ];

  const howItWorks = [
    {
      step: "1",
      title: "Browse & Search",
      description: "Find the textbooks you need using our smart search",
      icon: Search,
    },
    {
      step: "2",
      title: "Buy or Sell",
      description: "Purchase books at great prices or list your own",
      icon: BookOpen,
    },
    {
      step: "3",
      title: "Safe Delivery",
      description: "We handle secure payment and shipping for you",
      icon: Truck,
    },
  ];

  const trustStats = [
    { icon: ShieldCheck, label: "Secure", desc: "Protected transactions" },
    { icon: Users, label: "Verified", desc: "Student community" },
    { icon: Heart, label: "Trusted", desc: "Quality assured" },
    { icon: TrendingUp, label: "Growing", desc: "Expanding daily" },
  ];

  return (
    <div className="min-h-screen bg-white">
      <SEO
        title="ReBooked Solutions - Coming Soon | Buy and Sell Used Textbooks"
        description="South Africa's premier platform for buying and selling used textbooks is launching soon! Join our waitlist to be notified when we go live."
        keywords="textbooks, used books, coming soon, waitlist, South Africa"
      />

      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 text-blue-600">
              <BookOpen className="h-8 w-8" />
              <span className="text-xl font-bold">ReBooked Solutions</span>
            </div>
            <div className="text-blue-600">
              <span className="text-sm font-medium">Coming Soon</span>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 sm:py-24 bg-gradient-to-br from-blue-50 to-white">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <div className="mb-6">
              <span className="inline-flex items-center bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium border border-blue-200">
                Launching Soon
              </span>
            </div>
            <h1 className="text-4xl sm:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Pre-Loved Pages,{" "}
              <span className="text-blue-600">
                New Adventures
              </span>
            </h1>
            <p className="text-xl sm:text-2xl text-gray-700 mb-8 max-w-3xl mx-auto leading-relaxed">
              South Africa's most comprehensive platform for buying and selling used
              textbooks, plus your complete university exploration toolkit.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-md mx-auto">
              <form onSubmit={handleWaitlistSubmit} className="flex flex-col sm:flex-row gap-2 w-full">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 h-12 text-base border-2 border-gray-200 focus:border-blue-500"
                  required
                />
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-blue-600 hover:bg-blue-700 h-12 px-6 whitespace-nowrap"
                >
                  {isSubmitting ? (
                    "Joining..."
                  ) : (
                    <>
                      <Mail className="h-4 w-4 mr-2" />
                      Join Waitlist
                    </>
                  )}
                </Button>
              </form>
            </div>
            <p className="text-sm text-gray-600 mt-4">
              Be the first to know when we launch!
            </p>
          </div>
        </div>
      </section>

      {/* Marketplace Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 flex items-center justify-center gap-3">
              <BookOpen className="h-8 w-8 text-blue-600" />
              The ReBooked Marketplace
            </h2>
            <p className="text-lg text-gray-700 max-w-4xl mx-auto">
              A revolutionary platform designed specifically for South African students. 
              Our marketplace connects students across the country, making textbooks more affordable and accessible.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto mb-12">
            {marketplaceFeatures.map((feature, index) => (
              <Card key={index} className="border-gray-200 hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <div className={`${feature.color} rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4`}>
                    <feature.icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-700 text-sm">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="bg-gray-50 rounded-2xl p-8 max-w-6xl mx-auto">
            <h3 className="text-2xl font-bold text-center text-gray-900 mb-8">
              Why Choose ReBooked Marketplace?
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="bg-blue-100 rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">
                    <Star className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Save Up to 70%</p>
                    <p className="text-gray-700 text-sm">Get quality textbooks at fraction of retail prices</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-green-100 rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">
                    <Globe className="h-4 w-4 text-green-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Nationwide Network</p>
                    <p className="text-gray-700 text-sm">Connect with students from all South African universities</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-purple-100 rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">
                    <Award className="h-4 w-4 text-purple-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Quality Guaranteed</p>
                    <p className="text-gray-700 text-sm">Detailed condition reports and buyer protection</p>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="bg-orange-100 rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">
                    <Clock className="h-4 w-4 text-orange-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Quick Turnaround</p>
                    <p className="text-gray-700 text-sm">Fast listing, quick sales, immediate availability</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-teal-100 rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">
                    <Package className="h-4 w-4 text-teal-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Hassle-Free Shipping</p>
                    <p className="text-gray-700 text-sm">Door-to-door delivery with tracking and insurance</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-indigo-100 rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">
                    <Target className="h-4 w-4 text-indigo-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Student-Focused</p>
                    <p className="text-gray-700 text-sm">Built by students, designed for student needs</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ReBooked Campus Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 flex items-center justify-center gap-3">
              <GraduationCap className="h-8 w-8 text-blue-600" />
              ReBooked Campus: Your Academic Journey Companion
            </h2>
            <p className="text-lg text-gray-700 max-w-5xl mx-auto mb-8">
              Beyond textbooks, ReBooked Campus is your comprehensive guide to higher education in South Africa. 
              From university exploration to funding discovery, we're here to support every step of your academic journey.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto mb-12">
            {campusFeatures.map((feature, index) => (
              <Card key={index} className="border-gray-200 hover:shadow-lg transition-all duration-300 bg-white">
                <CardContent className="p-8">
                  <div className="flex items-start gap-4 mb-4">
                    <div className={`${feature.color} rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0`}>
                      <feature.icon className="h-6 w-6" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-gray-700 mb-4">{feature.description}</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    {feature.details.map((detail, detailIndex) => (
                      <div key={detailIndex} className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                        <span className="text-sm text-gray-600">{detail}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="bg-white rounded-2xl p-8 max-w-6xl mx-auto border border-gray-200">
            <h3 className="text-2xl font-bold text-center text-gray-900 mb-8 flex items-center justify-center gap-2">
              <MapPin className="h-6 w-6 text-blue-600" />
              Your Complete University Experience
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Building2 className="h-8 w-8 text-blue-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Explore Institutions</h4>
                <p className="text-sm text-gray-700">Discover universities, colleges, and specialized institutions across South Africa with detailed profiles and requirements.</p>
              </div>
              <div className="text-center">
                <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <FileText className="h-8 w-8 text-green-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Plan Your Path</h4>
                <p className="text-sm text-gray-700">Use our tools to calculate requirements, plan course sequences, and track your academic progress.</p>
              </div>
              <div className="text-center">
                <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Bookmark className="h-8 w-8 text-purple-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Secure Funding</h4>
                <p className="text-sm text-gray-700">Access comprehensive funding databases, application guidance, and deadline tracking for bursaries and scholarships.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-lg text-gray-700">
              Simple, secure, and student-friendly!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {howItWorks.map((step, index) => (
              <div key={index} className="text-center">
                <div className="relative mb-6">
                  <div className="bg-blue-600 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto text-xl font-bold">
                    {step.step}
                  </div>
                  <div className="bg-blue-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mt-4">
                    <step.icon className="h-8 w-8 text-blue-600" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {step.title}
                </h3>
                <p className="text-gray-700">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 flex items-center justify-center gap-3">
              <Heart className="h-8 w-8 text-blue-600" />
              Why Trust ReBooked?
            </h2>
            <p className="text-lg text-gray-700">
              Built by students, for students
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {trustStats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <stat.icon className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-900">{stat.label}</h3>
                <p className="text-sm text-gray-700">{stat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Ready to Transform Your Academic Experience?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Join thousands of students waiting for South Africa's most comprehensive
            academic platform and textbook marketplace!
          </p>
          <form onSubmit={handleWaitlistSubmit} className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 h-12 text-base bg-white text-gray-900 border-2 border-white/20"
              required
            />
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-white text-blue-600 hover:bg-gray-100 h-12 px-8 font-semibold whitespace-nowrap"
            >
              {isSubmitting ? "Joining..." : "Get Early Access"}
            </Button>
          </form>
          <p className="text-sm mt-4 opacity-75 flex items-center justify-center gap-2">
            <CheckCircle className="h-4 w-4" />
            No spam, just updates. Unsubscribe anytime.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <BookOpen className="h-6 w-6" />
            <span className="text-lg font-bold">ReBooked Solutions</span>
          </div>
          <p className="text-gray-300 mb-4">
            "Pre-Loved Pages, New Adventures"
          </p>
          <p className="text-sm text-gray-400">
            © 2025 ReBooked Solutions. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
