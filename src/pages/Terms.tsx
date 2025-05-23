
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Terms = () => {
  const navigate = useNavigate();

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <Button variant="ghost" onClick={() => navigate(-1)} className="mb-6 text-book-600">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>

        <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
          <h1 className="text-2xl font-bold text-book-800 mb-6">Legal Information</h1>
          
          <Tabs defaultValue="terms" className="w-full">
            <TabsList className="w-full mb-6">
              <TabsTrigger value="terms">Terms & Conditions</TabsTrigger>
              <TabsTrigger value="privacy">Privacy Policy</TabsTrigger>
              <TabsTrigger value="cookies">Cookie Policy</TabsTrigger>
            </TabsList>
            
            <TabsContent value="terms" className="prose max-w-none text-gray-600">
              <h2 className="text-xl font-semibold text-book-700 mb-4">Terms and Conditions</h2>
              <p className="text-sm text-gray-500 mb-6">Effective Date: 22 May 2025 | Last Updated: 22 May 2025</p>
              
              <h3 className="text-lg font-medium text-book-700 mt-6 mb-3">1. Introduction</h3>
              <p>Welcome to ReBooked Solutions, a platform that facilitates the buying and selling of second-hand textbooks between users. We act as an intermediary, connecting sellers and buyers, and managing the logistics of delivery. By accessing or using our service, you agree to comply with and be bound by these Terms and Conditions.</p>
              
              <h3 className="text-lg font-medium text-book-700 mt-6 mb-3">2. Definitions</h3>
              <p>"We"/"Us"/"Our": Refers to ReBooked Solutions.</p>
              <p>"User": Any individual using the platform, including both buyers and sellers.</p>
              <p>"Seller": A user who lists textbooks for sale.</p>
              <p>"Buyer": A user who purchases textbooks via the platform.</p>
              <p>"Delivery Partner": Third-party logistics providers engaged to handle shipping.</p>
              
              <h3 className="text-lg font-medium text-book-700 mt-6 mb-3">3. Eligibility</h3>
              <p>Users must be at least 18 years old or have parental/guardian consent to use the platform. You must provide accurate and truthful information during registration.</p>
              
              <h3 className="text-lg font-medium text-book-700 mt-6 mb-3">4. User Responsibilities</h3>
              <p>Sellers must ensure that textbooks are accurately described and depicted in photos, in the stated condition, and free from copyright violations.</p>
              <p>Buyers must confirm details before purchasing.</p>
              <p>All users must not use the platform for fraudulent or illegal activity.</p>
              
              <h3 className="text-lg font-medium text-book-700 mt-6 mb-3">5. Platform Role & Limitations</h3>
              <p>We are not the owner of the textbooks listed.</p>
              <p>We do not guarantee the quality, accuracy, or authenticity of any listing.</p>
              <p>We act solely as an intermediary and logistics coordinator.</p>
              
              <h3 className="text-lg font-medium text-book-700 mt-6 mb-3">6. Listing & Selling Textbooks</h3>
              <p>Sellers must provide honest and complete information.</p>
              <p>All textbooks must be owned by the seller.</p>
              <p>Pricing is set by the seller, but we reserve the right to charge a 10% commission.</p>
              
              <h3 className="text-lg font-medium text-book-700 mt-6 mb-3">7. Buying Process</h3>
              <p>Buyers agree to pay the full listed price and delivery fee.</p>
              <p>Orders are considered final once payment is confirmed.</p>
              
              <h3 className="text-lg font-medium text-book-700 mt-6 mb-3">8. Payments & Fees</h3>
              <p>We charge a 10% commission per successful sale.</p>
              <p>Payment is processed through our chosen payment provider (to be finalized), and sellers receive funds after successful delivery and confirmation.</p>
              <p>Delivery fees are borne by the buyer unless otherwise stated.</p>
              
              <h3 className="text-lg font-medium text-book-700 mt-6 mb-3">9. Delivery & Logistics</h3>
              <p>We coordinate textbook shipping via third-party couriers (to be confirmed).</p>
              <p>Estimated delivery times are provided but not guaranteed.</p>
              <p>We are not liable for delays or damage caused during delivery, but we will assist with dispute resolution.</p>
              
              <h3 className="text-lg font-medium text-book-700 mt-6 mb-3">10. Returns & Refunds</h3>
              <p>Returns are only accepted if the item was not as described or damaged in transit.</p>
              <p>Refunds will be processed after investigation.</p>
              <p>Sellers may be responsible for return shipping in case of fault.</p>
              
              <h3 className="text-lg font-medium text-book-700 mt-6 mb-3">11. Dispute Resolution</h3>
              <p>We will mediate disputes in good faith but are not responsible for user misconduct.</p>
              <p>Disputes must be reported within 7 days of delivery.</p>
              
              <h3 className="text-lg font-medium text-book-700 mt-6 mb-3">12. Account Suspension or Termination</h3>
              <p>We reserve the right to suspend or terminate accounts that violate our terms, engage in fraudulent activity, or misuse the platform.</p>
              
              <h3 className="text-lg font-medium text-book-700 mt-6 mb-3">13. Limitation of Liability</h3>
              <p>We are not liable for indirect, incidental, or consequential damages. Our maximum liability in any claim is limited to the amount paid for the specific transaction.</p>
              
              <h3 className="text-lg font-medium text-book-700 mt-6 mb-3">14. Privacy Policy</h3>
              <p>All user data is handled in accordance with our Privacy Policy.</p>
            </TabsContent>
            
            <TabsContent value="privacy" className="prose max-w-none text-gray-600">
              <h2 className="text-xl font-semibold text-book-700 mb-4">Privacy Policy</h2>
              <p className="text-sm text-gray-500 mb-6">Effective Date: 22 May 2025 | Last Updated: 22 May 2025</p>
              <p>ReBooked Solutions values your privacy. This policy explains how we collect, use, and safeguard your personal data, in compliance with the Protection of Personal Information Act (POPIA) of South Africa.</p>
              
              <h3 className="text-lg font-medium text-book-700 mt-6 mb-3">1. Information We Collect</h3>
              <p><strong>Personal Information:</strong> Name, email address, phone number, and location.</p>
              <p><strong>Account Information:</strong> Login credentials, transaction history.</p>
              <p><strong>Device & Usage Data:</strong> IP address, browser type, usage logs.</p>
              
              <h3 className="text-lg font-medium text-book-700 mt-6 mb-3">2. How We Use Your Information</h3>
              <p>To provide and improve our services.</p>
              <p>To process transactions and deliveries.</p>
              <p>To communicate important updates and notifications.</p>
              <p>To comply with legal obligations.</p>
              
              <h3 className="text-lg font-medium text-book-700 mt-6 mb-3">3. Data Sharing</h3>
              <p>With logistics and payment partners for service fulfilment.</p>
              <p>With legal authorities when required by law.</p>
              <p>We do not sell your data to third parties.</p>
              
              <h3 className="text-lg font-medium text-book-700 mt-6 mb-3">4. Data Retention</h3>
              <p>We retain your data for as long as your account is active or as necessary to provide our services.</p>
              
              <h3 className="text-lg font-medium text-book-700 mt-6 mb-3">5. Your Rights</h3>
              <p>You have the right to access, correct, or delete your personal information. Requests can be made by contacting us directly.</p>
              
              <h3 className="text-lg font-medium text-book-700 mt-6 mb-3">6. Security Measures</h3>
              <p>We implement industry-standard security to protect your data, including encryption, firewalls, and secure access controls.</p>
            </TabsContent>
            
            <TabsContent value="cookies" className="prose max-w-none text-gray-600">
              <h2 className="text-xl font-semibold text-book-700 mb-4">Cookie Policy</h2>
              <p className="text-sm text-gray-500 mb-6">Effective Date: 22 May 2025 | Last Updated: 22 May 2025</p>
              
              <h3 className="text-lg font-medium text-book-700 mt-6 mb-3">1. What Are Cookies?</h3>
              <p>Cookies are small text files stored on your device when you visit our website. They help improve user experience and website performance.</p>
              
              <h3 className="text-lg font-medium text-book-700 mt-6 mb-3">2. Types of Cookies We Use</h3>
              <p><strong>Essential Cookies:</strong> Required for website functionality.</p>
              <p><strong>Analytics Cookies:</strong> Help us understand user interactions.</p>
              <p><strong>Preference Cookies:</strong> Remember your preferences and settings.</p>
              
              <h3 className="text-lg font-medium text-book-700 mt-6 mb-3">3. Managing Cookies</h3>
              <p>You can control cookie usage through your browser settings. Disabling cookies may affect your experience on our platform.</p>
              
              <h3 className="text-lg font-medium text-book-700 mt-6 mb-3">4. Consent</h3>
              <p>By using our website, you consent to the use of cookies as outlined in this policy.</p>
              
              <div className="mt-8 p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600">
                  These documents are governed by the laws of the Republic of South Africa. For more information or concerns, please contact us at <a href="mailto:legal@rebookedsolutions.com" className="text-book-600 hover:text-book-800">legal@rebookedsolutions.com</a>
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

export default Terms;
