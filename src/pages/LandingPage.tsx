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
    },
    {
      icon: ShieldCheck,
      title: "Secure Transactions",
      description: "Safe payments and verified sellers for peace of mind",
    },
    {
      icon: Truck,
      title: "Easy Delivery",
      description: "Reliable shipping options across South Africa",
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

  const testimonials = [
    {
      name: "Sarah M.",
      text: "Found all my textbooks at 60% off retail price. Amazing platform!",
      rating: 5,
    },
    {
      name: "David K.",
      text: "Sold my old books in just 2 days. Easy and profitable!",
      rating: 5,
    },
    {
      name: "Priya P.",
      text: "Secure transactions and fast delivery. Highly recommend!",
      rating: 5,
    },
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
              <Lock className="h-4 w-4" />
              <span className="text-sm font-medium">Coming Soon</span>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 sm:py-24">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <div className="mb-6">
              <span className="inline-block bg-book-600/10 text-book-700 px-4 py-2 rounded-full text-sm font-medium">
                🚀 Launching Soon
              </span>
            </div>
            <h1 className="text-4xl sm:text-6xl font-bold text-book-900 mb-6 leading-tight">
              Pre-Loved Pages,{" "}
              <span className="text-book-600">New Adventures</span>
            </h1>
            <p className="text-xl sm:text-2xl text-book-700 mb-8 max-w-3xl mx-auto leading-relaxed">
              South Africa's most trusted platform for buying and selling used
              textbooks is coming soon. Save money, help the environment, and
              connect with students nationwide.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-md mx-auto">
              <form onSubmit={handleWaitlistSubmit} className="flex flex-col sm:flex-row gap-2 w-full">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 h-12 text-base"
                  required
                />
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-book-600 hover:bg-book-700 h-12 px-6 whitespace-nowrap"
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
            <p className="text-sm text-book-600 mt-4">
              Be the first to know when we launch! 🎓
            </p>
          </div>
        </div>
      </section>

      {/* What is ReBooked Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-book-900 mb-4">
              What is ReBooked Solutions?
            </h2>
            <p className="text-lg text-book-700 max-w-3xl mx-auto">
              We're revolutionizing how South African students buy and sell
              textbooks. Our platform makes academic resources more affordable
              and accessible while promoting sustainability.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {features.map((feature, index) => (
              <Card key={index} className="border-book-200 hover:shadow-lg transition-shadow">
                <CardContent className="p-8 text-center">
                  <div className="bg-book-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="h-8 w-8 text-book-600" />
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

      {/* How It Works Section */}
      <section className="py-16 bg-book-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-book-900 mb-4">
              How It Works
            </h2>
            <p className="text-lg text-book-700">
              Simple, secure, and student-friendly
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {howItWorks.map((step, index) => (
              <div key={index} className="text-center">
                <div className="relative mb-6">
                  <div className="bg-book-600 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto text-xl font-bold">
                    {step.step}
                  </div>
                  <div className="bg-book-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mt-4">
                    <step.icon className="h-8 w-8 text-book-600" />
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
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-book-900 mb-4">
              Why Trust ReBooked?
            </h2>
            <p className="text-lg text-book-700">
              Built by students, for students
            </p>
          </div>

          {/* Trust Indicators */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
            <div className="text-center">
              <div className="bg-book-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <ShieldCheck className="h-8 w-8 text-book-600" />
              </div>
              <h3 className="font-semibold text-book-900">Secure</h3>
              <p className="text-sm text-book-700">Protected transactions</p>
            </div>
            <div className="text-center">
              <div className="bg-book-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-book-600" />
              </div>
              <h3 className="font-semibold text-book-900">Verified</h3>
              <p className="text-sm text-book-700">Student community</p>
            </div>
            <div className="text-center">
              <div className="bg-book-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Heart className="h-8 w-8 text-book-600" />
              </div>
              <h3 className="font-semibold text-book-900">Trusted</h3>
              <p className="text-sm text-book-700">5-star rated</p>
            </div>
            <div className="text-center">
              <div className="bg-book-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-8 w-8 text-book-600" />
              </div>
              <h3 className="font-semibold text-book-900">Growing</h3>
              <p className="text-sm text-book-700">Expanding daily</p>
            </div>
          </div>

          {/* Testimonials */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-book-200">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                    ))}
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
      <section className="py-16 bg-gradient-to-r from-book-600 to-book-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Ready to Transform Your Textbook Experience?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Join thousands of students waiting for South Africa's most innovative
            textbook marketplace.
          </p>
          <form onSubmit={handleWaitlistSubmit} className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 h-12 text-base bg-white text-gray-900"
              required
            />
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-white text-book-600 hover:bg-gray-100 h-12 px-8 font-semibold whitespace-nowrap"
            >
              {isSubmitting ? "Joining..." : "Get Early Access"}
            </Button>
          </form>
          <p className="text-sm mt-4 opacity-75">
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
          </div>
          <p className="text-book-200 mb-4">
            "Pre-Loved Pages, New Adventures"
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
