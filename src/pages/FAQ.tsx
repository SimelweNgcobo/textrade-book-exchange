
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const FAQ = () => {
  const navigate = useNavigate();

  const faqItems = [
    {
      question: "What is ReBooked?",
      answer: "ReBooked is a platform where individuals can buy and sell second-hand or new books. It provides a safe and accessible environment for book lovers to exchange books."
    },
    {
      question: "How much will I earn when I sell my book?",
      answer: "Sellers keep 90% of the sale price. ReBooked takes a 10% commission to help maintain and improve the platform."
    },
    {
      question: "Does ReBooked buy books?",
      answer: "No, ReBooked does not directly purchase books. We provide an environment where people can sell their books to other individuals."
    },
    {
      question: "How do I list a book for sale?",
      answer: "Create an account, upload your book's details and images, set your price, and publish your listing. It's quick and easy!"
    },
    {
      question: "Is it free to sign up?",
      answer: "Yes, signing up and browsing books is completely free. You only pay or earn when a transaction occurs."
    },
    {
      question: "What kinds of books can I sell on ReBooked?",
      answer: "You can sell new or used books in good condition, including textbooks, fiction, non-fiction, and more. We encourage clean, readable copies."
    },
    {
      question: "What if I have an issue with a transaction?",
      answer: "If there's a problem—like a missing delivery or damaged book—you can contact ReBooked support for help. We aim to keep the platform safe and fair."
    },
    {
      question: "Can I edit or delete my book listing?",
      answer: "Yes, you can manage your listings at any time from your account dashboard."
    },
    {
      question: "Is ReBooked available outside of South Africa?",
      answer: "Currently, ReBooked is focused on serving users within South Africa."
    }
  ];

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <Button variant="ghost" onClick={() => navigate(-1)} className="mb-6 text-book-600">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>

        <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
          <h1 className="text-2xl font-bold text-book-800 mb-6">Frequently Asked Questions</h1>
          
          <Accordion type="single" collapsible className="w-full">
            {faqItems.map((item, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left font-medium">{item.question}</AccordionTrigger>
                <AccordionContent className="text-gray-600">{item.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
          
          <div className="mt-8 p-4 bg-gray-50 rounded-md border border-gray-200">
            <h3 className="text-lg font-medium text-book-700 mb-2">Still have questions?</h3>
            <p className="text-gray-600 mb-4">
              If you couldn't find the answer to your question, please feel free to contact our support team.
            </p>
            <Button onClick={() => navigate('/contact')} className="bg-book-600 hover:bg-book-700">
              Contact Support
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default FAQ;
