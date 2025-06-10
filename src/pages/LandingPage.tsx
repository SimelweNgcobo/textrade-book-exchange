
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
  Star,
  CheckCircle,
  Mail,
  Lock,
  Heart,
  TrendingUp,
  Calculator,
  GraduationCap,
  MapPin,
  DollarSign,
  Sparkles,
  Zap,
  Rocket,
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
        toast.success("🎉 You're on the waitlist! We'll notify you when we launch.");
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

  const features = [
    {
      icon: Search,
      title: "Find Your Books",
      description: "Search thousands of textbooks by title, author, or subject",
      color: "bg-blue-500/10 text-blue-600",
    },
    {
      icon: ShieldCheck,
      title: "Secure Transactions",
      description: "Safe payments and verified sellers for peace of mind",
      color: "bg-green-500/10 text-green-600",
    },
    {
      icon: Truck,
      title: "Easy Delivery",
      description: "Reliable shipping options across South Africa",
      color: "bg-purple-500/10 text-purple-600",
    },
  ];

  const campusFeatures = [
    {
      icon: GraduationCap,
      title: "University Explorer",
      description: "Browse all South African universities and their courses in one place",
      color: "bg-book-500/10 text-book-600",
    },
    {
      icon: Calculator,
      title: "APS Calculator",
      description: "Calculate your Admission Point Score and see where you qualify",
      color: "bg-orange-500/10 text-orange-600",
    },
    {
      icon: DollarSign,
      title: "Bursary Directory",
      description: "Find funding opportunities and scholarships for your studies",
      color: "bg-green-500/10 text-green-600",
    },
    {
      icon: BookOpen,
      title: "Campus Books",
      description: "Filter textbooks by your university and specific courses",
      color: "bg-blue-500/10 text-blue-600",
    },
  ];

  const howItWorks = [
    {
      step: "1",
      title: "Browse & Search",
      description: "Find the textbooks you need using our smart search",
      icon: Search,
      emoji: "🔍",
    },
    {
      step: "2",
      title: "Buy or Sell",
      description: "Purchase books at great prices or list your own",
      icon: BookOpen,
      emoji: "💰",
    },
    {
      step: "3",
      title: "Safe Delivery",
      description: "We handle secure payment and shipping for you",
      icon: Truck,
      emoji: "🚚",
    },
  ];

  const testimonials = [
    {
      name: "Sarah M.",
      text: "Found all my textbooks at 60% off retail price. Amazing platform!",
      rating: 5,
      emoji: "😍",
    },
    {
      name: "David K.",
      text: "Sold my old books in just 2 days. Easy and profitable!",
      rating: 5,
      emoji: "🤑",
    },
    {
      name: "Priya P.",
      text: "Secure transactions and fast delivery. Highly recommend!",
      rating: 5,
      emoji: "⭐",
    },
  ];

  const trustStats = [
    { icon: ShieldCheck, label: "Secure", desc: "Protected transactions", color: "text-green-600" },
    { icon: Users, label: "Verified", desc: "Student community", color: "text-blue-600" },
    { icon: Heart, label: "Trusted", desc: "5-star rated", color: "text-red-600" },
    { icon: TrendingUp, label: "Growing", desc: "Expanding daily", color: "text-purple-600" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-book-50 to-white">
      <SEO
        title="ReBooked Solutions - Coming Soon | Buy and Sell Used Textbooks"
        description="South Africa's premier platform for buying and selling used textbooks is launching soon! Join our waitlist to be notified when we go live."
        keywords="textbooks, used books, coming soon, waitlist, South Africa"
      />

      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-book-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 text-book-600">
              <BookOpen className="h-8 w-8" />
              <span className="text-xl font-bold">ReBooked Solutions</span>
            </div>
            <div className="flex items-center space-x-2 text-book-600">
              <Sparkles className="h-4 w-4 animate-pulse" />
              <span className="text-sm font-medium">Coming Soon</span>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 sm:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-book-100/50 to-transparent"></div>
        <div className="container mx-auto px-4 text-center relative">
          <div className="max-w-4xl mx-auto">
            <div className="mb-6 animate-bounce">
              <span className="inline-flex items-center bg-gradient-to-r from-book-600/10 to-purple-600/10 text-book-700 px-4 py-2 rounded-full text-sm font-medium border border-book-200">
                <Rocket className="h-4 w-4 mr-2" />
                🚀 Launching Soon
              </span>
            </div>
            <h1 className="text-4xl sm:text-6xl font-bold text-book-900 mb-6 leading-tight">
              Pre-Loved Pages,{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-book-600 to-purple-600">
                New Adventures
              </span>
            </h1>
            <p className="text-xl sm:text-2xl text-book-700 mb-8 max-w-3xl mx-auto leading-relaxed">
              South Africa's most trusted platform for buying and selling used
              textbooks is coming soon. Save money, help the environment, and
              connect with students nationwide! 🌱📚
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-md mx-auto">
              <form onSubmit={handleWaitlistSubmit} className="flex flex-col sm:flex-row gap-2 w-full">
                <Input
                  type="email"
                  placeholder="Enter your email ✨"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 h-12 text-base border-2 border-book-200 focus:border-book-500"
                  required
                />
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-gradient-to-r from-book-600 to-purple-600 hover:from-book-700 hover:to-purple-700 h-12 px-6 whitespace-nowrap transform hover:scale-105 transition-all duration-200"
                >
                  {isSubmitting ? (
                    "Joining..."
                  ) : (
                    <>
                      <Mail className="h-4 w-4 mr-2" />
                      Join Waitlist 🎓
                    </>
                  )}
                </Button>
              </form>
            </div>
            <p className="text-sm text-book-600 mt-4 flex items-center justify-center gap-2">
              <Zap className="h-4 w-4" />
              Be the first to know when we launch! 🎓✨
            </p>
          </div>
        </div>
      </section>

      {/* What is ReBooked Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-book-900 mb-4 flex items-center justify-center gap-3">
              <BookOpen className="h-8 w-8 text-book-600" />
              What is ReBooked Solutions?
            </h2>
            <p className="text-lg text-book-700 max-w-3xl mx-auto">
              We're revolutionizing how South African students buy and sell
              textbooks. Our platform makes academic resources more affordable
              and accessible while promoting sustainability. 🌍♻️
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {features.map((feature, index) => (
              <Card key={index} className="border-book-200 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group">
                <CardContent className="p-8 text-center">
                  <div className={`${feature.color} rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-semibold text-book-900 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-book-700">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ReBooked Campus - University Explorer Section */}
      <section className="py-16 bg-gradient-to-br from-book-50 to-purple-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-book-900 mb-4 flex items-center justify-center gap-3">
              <GraduationCap className="h-8 w-8 text-purple-600" />
              Introducing ReBooked Campus 🎓
            </h2>
            <p className="text-lg text-book-700 max-w-3xl mx-auto">
              More than just a marketplace! Discover universities, calculate your APS, 
              find bursaries, and connect with textbooks all in one place. It's your 
              complete academic companion! ✨
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto mb-12">
            {campusFeatures.map((feature, index) => (
              <Card key={index} className="border-book-200 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group bg-white/80 backdrop-blur-sm">
                <CardContent className="p-6 text-center">
                  <div className={`${feature.color} rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-semibold text-book-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-book-700">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 max-w-4xl mx-auto border border-book-200">
            <h3 className="text-2xl font-bold text-center text-book-900 mb-6 flex items-center justify-center gap-2">
              <MapPin className="h-6 w-6 text-purple-600" />
              Your Complete University Journey 🗺️
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="bg-purple-100 rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">
                    <span className="text-purple-600 font-bold">1</span>
                  </div>
                  <div>
                    <p className="font-semibold text-book-900">Explore Universities</p>
                    <p className="text-book-700">Browse all South African universities, their courses, and requirements</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-purple-100 rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">
                    <span className="text-purple-600 font-bold">2</span>
                  </div>
                  <div>
                    <p className="font-semibold text-book-900">Calculate Your APS</p>
                    <p className="text-book-700">See which universities and courses you qualify for</p>
                  </div>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="bg-purple-100 rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">
                    <span className="text-purple-600 font-bold">3</span>
                  </div>
                  <div>
                    <p className="font-semibold text-book-900">Find Funding</p>
                    <p className="text-book-700">Discover bursaries and scholarships for your studies</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-purple-100 rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">
                    <span className="text-purple-600 font-bold">4</span>
                  </div>
                  <div>
                    <p className="font-semibold text-book-900">Get Your Books</p>
                    <p className="text-book-700">Find textbooks specific to your university and courses</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-book-900 mb-4 flex items-center justify-center gap-3">
              <Zap className="h-8 w-8 text-book-600" />
              How It Works
            </h2>
            <p className="text-lg text-book-700">
              Simple, secure, and student-friendly! 🚀
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {howItWorks.map((step, index) => (
              <div key={index} className="text-center group">
                <div className="relative mb-6">
                  <div className="bg-gradient-to-r from-book-600 to-purple-600 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto text-xl font-bold group-hover:scale-110 transition-transform duration-300">
                    {step.step}
                  </div>
                  <div className="bg-book-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mt-4 group-hover:scale-110 transition-transform duration-300">
                    <span className="text-2xl">{step.emoji}</span>
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-book-900 mb-3">
                  {step.title}
                </h3>
                <p className="text-book-700">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-16 bg-book-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-book-900 mb-4 flex items-center justify-center gap-3">
              <Heart className="h-8 w-8 text-red-500" />
              Why Trust ReBooked?
            </h2>
            <p className="text-lg text-book-700">
              Built by students, for students 💝
            </p>
          </div>

          {/* Trust Indicators */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
            {trustStats.map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <stat.icon className={`h-8 w-8 ${stat.color}`} />
                </div>
                <h3 className="font-semibold text-book-900">{stat.label}</h3>
                <p className="text-sm text-book-700">{stat.desc}</p>
              </div>
            ))}
          </div>

          {/* Testimonials */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-book-200 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 bg-white/80 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                    ))}
                    <span className="ml-2 text-2xl">{testimonial.emoji}</span>
                  </div>
                  <p className="text-book-700 mb-4 italic">"{testimonial.text}"</p>
                  <p className="font-semibold text-book-900">- {testimonial.name}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-16 bg-gradient-to-r from-book-600 via-purple-600 to-book-700 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-book-600/90 to-purple-600/90"></div>
        <div className="container mx-auto px-4 text-center relative">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 flex items-center justify-center gap-3">
            <Rocket className="h-8 w-8" />
            Ready to Transform Your Textbook Experience?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Join thousands of students waiting for South Africa's most innovative
            textbook marketplace and university explorer! 🌟
          </p>
          <form onSubmit={handleWaitlistSubmit} className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Your email address ✨"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 h-12 text-base bg-white text-gray-900 border-2 border-white/20"
              required
            />
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-white text-book-600 hover:bg-gray-100 h-12 px-8 font-semibold whitespace-nowrap transform hover:scale-105 transition-all duration-200"
            >
              {isSubmitting ? "Joining..." : "Get Early Access 🚀"}
            </Button>
          </form>
          <p className="text-sm mt-4 opacity-75 flex items-center justify-center gap-2">
            <CheckCircle className="h-4 w-4" />
            No spam, just updates. Unsubscribe anytime.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-book-900 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <BookOpen className="h-6 w-6" />
            <span className="text-lg font-bold">ReBooked Solutions</span>
            <Sparkles className="h-4 w-4 text-yellow-400" />
          </div>
          <p className="text-book-200 mb-4">
            "Pre-Loved Pages, New Adventures" ✨
          </p>
          <p className="text-sm text-book-300">
            © 2025 ReBooked Solutions. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
