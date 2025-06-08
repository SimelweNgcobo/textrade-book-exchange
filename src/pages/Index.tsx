
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/books?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <Layout>
      <SEO
        title="ReBooked Solutions - Buy and Sell Used Textbooks"
        description="The premier marketplace for buying and selling used textbooks in South Africa. Save money on academic books and earn from books you no longer need."
        keywords="used textbooks, buy sell books, academic books South Africa, student textbooks, university books, college books"
        url="https://www.rebookedsolutions.co.za"
      />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-50 to-green-100 py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - Text Content */}
            <div className="space-y-6">
              <div className="text-green-600 italic text-lg">
                "Pre-Loved Pages, New Adventures"
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold text-green-800">
                Buy and Sell Textbooks with Ease
              </h1>
              
              <p className="text-lg text-gray-600 leading-relaxed">
                Buy affordable secondhand textbooks and give your old ones a new home — 
                all handled securely through ReBooked Solutions.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  onClick={() => navigate("/books")}
                  className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg"
                >
                  Browse Books
                </Button>
                <Button
                  onClick={() => navigate("/create-listing")}
                  variant="outline"
                  className="border-green-600 text-green-600 hover:bg-green-50 px-8 py-3 rounded-lg"
                >
                  Sell Your Books
                </Button>
              </div>
            </div>

            {/* Right Side - Image */}
            <div className="relative">
              <img
                src="/lovable-uploads/66f2e629-3194-4fae-b472-7d2e4bb8821f.png"
                alt="Students studying with textbooks"
                className="w-full h-auto rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-green-800 mb-8">
            Find Your Textbooks
          </h2>
          
          <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Search by title, author, or subject..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 px-6 py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-lg"
              />
              <Button
                type="submit"
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-lg"
              >
                Search
              </Button>
            </div>
          </form>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
