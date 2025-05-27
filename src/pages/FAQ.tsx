
import Layout from '@/components/Layout';
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, HelpCircle } from 'lucide-react';

const FAQ = () => {
  const navigate = useNavigate();

  const faqs = [
    {
      question: "How do I sell my textbook on ReBooked?",
      answer: "To sell your textbook, create an account, click 'Sell a Book', fill in the details including title, author, condition, and price. Upload clear photos of your book and submit the listing. Your book will be visible to potential buyers immediately."
    },
    {
      question: "What commission does ReBooked charge?",
      answer: "ReBooked charges a 10% commission on each successful sale. This helps us maintain the platform, ensure secure transactions, and provide customer support."
    },
    {
      question: "How do I get paid for my sold books?",
      answer: "Once your book is sold and the transaction is completed, you'll receive 90% of the sale price (after our 10% commission). Payment processing typically takes 2-3 business days."
    },
    {
      question: "What condition should my book be in to sell?",
      answer: "We accept books in various conditions from 'New' to 'Below Average'. Be honest about your book's condition and include clear photos. Books with highlighting, notes, or wear are still valuable to students!"
    },
    {
      question: "How do I search for specific textbooks?",
      answer: "Use our search bar to look for books by title, author, or subject. You can also filter by category, condition, price range, and grade level to find exactly what you need."
    },
    {
      question: "Is it safe to buy and sell on ReBooked?",
      answer: "Yes! We prioritize safety with secure payment processing, user verification systems, and a rating system for buyers and sellers. All transactions are protected and monitored."
    },
    {
      question: "Can I negotiate prices with sellers?",
      answer: "Currently, prices are set by sellers. However, you can contact sellers through our messaging system to inquire about books or ask questions before purchasing."
    },
    {
      question: "What if I'm not satisfied with my purchase?",
      answer: "If your book doesn't match the description or photos, contact our support team within 7 days of delivery. We'll work with you and the seller to resolve the issue."
    },
    {
      question: "How long does delivery take?",
      answer: "Delivery times vary depending on the seller's location and chosen shipping method. Most books are delivered within 3-7 business days. You'll receive tracking information once shipped."
    },
    {
      question: "Can I sell books that aren't textbooks?",
      answer: "ReBooked focuses primarily on academic textbooks for school and university levels. While we occasionally accept relevant study guides and academic materials, recreational books aren't typically accepted."
    }
  ];

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="mb-8">
            <Button 
              variant="ghost" 
              onClick={() => navigate(-1)} 
              className="mb-4 text-book-600 hover:bg-book-50"
            >
              <ArrowLeft className="mr-2 h-4 w-4" /> Back
            </Button>
            
            <div className="bg-white rounded-lg shadow-sm p-8 text-center">
              <div className="flex justify-center mb-4">
                <div className="bg-book-100 rounded-full p-3">
                  <HelpCircle className="h-8 w-8 text-book-600" />
                </div>
              </div>
              <h1 className="text-4xl font-bold text-book-800 mb-4">
                Frequently Asked Questions
              </h1>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Find answers to common questions about buying and selling textbooks on ReBooked Solutions.
              </p>
            </div>
          </div>

          {/* FAQ Content */}
          <div className="bg-white rounded-lg shadow-sm p-8">
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="border border-gray-200 rounded-lg px-6">
                  <AccordionTrigger className="text-left hover:no-underline py-6">
                    <span className="font-semibold text-book-800">{faq.question}</span>
                  </AccordionTrigger>
                  <AccordionContent className="pb-6">
                    <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          {/* Contact Support */}
          <div className="mt-8 bg-book-600 rounded-lg shadow-sm p-8 text-center text-white">
            <h2 className="text-2xl font-bold mb-4">Still have questions?</h2>
            <p className="mb-6 text-book-100">
              Our support team is here to help. Get in touch and we'll respond as quickly as possible.
            </p>
            <Button 
              onClick={() => navigate('/contact')} 
              className="bg-white text-book-600 hover:bg-gray-100"
            >
              Contact Support
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default FAQ;
