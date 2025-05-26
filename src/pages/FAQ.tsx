
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ChevronDown, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const FAQ = () => {
  const navigate = useNavigate();
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const faqItems = [
    {
      question: "How do I sell my textbooks on ReBooked?",
      answer: "To sell your textbooks, create an account, click 'Sell a Book', and fill out the listing form with your book's details, condition, and price. Upload three photos (front cover, back cover, and inside pages) and submit your listing."
    },
    {
      question: "What commission does ReBooked charge?",
      answer: "ReBooked charges a 10% commission on each successful sale. This helps us maintain the platform and provide secure transactions. The commission is automatically deducted from your earnings."
    },
    {
      question: "How do I know if my book is in good condition to sell?",
      answer: "We have five condition categories: New, Good, Better, Average, and Below Average. Be honest about your book's condition - this helps build trust with buyers and ensures successful transactions."
    },
    {
      question: "What payment methods are accepted?",
      answer: "Currently, we accept credit and debit cards. All payments are processed securely through our platform."
    },
    {
      question: "How long does it take to receive payment after a sale?",
      answer: "Once a book is sold and the transaction is confirmed, you'll receive your payment (minus the 10% commission) within 3-5 business days."
    },
    {
      question: "Can I edit my listing after it's published?",
      answer: "Currently, you cannot edit listings after they're published. If you need to make changes, please contact our support team."
    },
    {
      question: "What if a buyer doesn't pay or receive their book?",
      answer: "We have measures in place to protect both buyers and sellers. If there's an issue with a transaction, please contact our support team immediately."
    },
    {
      question: "How do I contact customer support?",
      answer: "You can reach our customer support team through the Contact Us page. We aim to respond to all inquiries within 24 hours."
    },
    {
      question: "Can I sell books that aren't textbooks?",
      answer: "ReBooked is specifically designed for educational textbooks - both school and university level. We don't currently support other types of books."
    },
    {
      question: "What happens if my book doesn't sell?",
      answer: "There's no time limit on listings. Your book will remain active until it sells or you decide to remove it. You can manage your listings from your profile page."
    }
  ];

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <Button variant="ghost" onClick={() => navigate(-1)} className="mb-6 text-book-600">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>

        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-book-600 to-book-800 text-white p-8">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions</h1>
              <p className="text-book-100 text-lg">
                Find answers to common questions about using ReBooked Solutions
              </p>
            </div>

            {/* Content */}
            <div className="p-8">
              <div className="prose prose-gray max-w-none">
                <p className="text-gray-600 mb-8">
                  Can't find what you're looking for? Feel free to <a href="/contact" className="text-book-600 hover:text-book-700 underline">contact us</a> and we'll be happy to help.
                </p>

                <div className="space-y-4">
                  {faqItems.map((item, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
                      <button
                        onClick={() => toggleItem(index)}
                        className="w-full px-6 py-4 text-left bg-gray-50 hover:bg-gray-100 transition-colors flex items-center justify-between"
                      >
                        <h3 className="font-medium text-gray-900 pr-4">{item.question}</h3>
                        {openItems.includes(index) ? (
                          <ChevronDown className="h-5 w-5 text-gray-500 flex-shrink-0" />
                        ) : (
                          <ChevronRight className="h-5 w-5 text-gray-500 flex-shrink-0" />
                        )}
                      </button>
                      {openItems.includes(index) && (
                        <div className="px-6 py-4 bg-white border-t border-gray-200">
                          <p className="text-gray-700 leading-relaxed">{item.answer}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                <div className="mt-12 pt-8 border-t border-gray-200">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Still have questions?</h2>
                  <p className="text-gray-600 mb-6">
                    If you couldn't find the answer you were looking for, our support team is here to help.
                  </p>
                  <Button 
                    onClick={() => navigate('/contact')}
                    className="bg-book-600 hover:bg-book-700 text-white"
                  >
                    Contact Support
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default FAQ;
