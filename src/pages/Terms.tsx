
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useEffect } from 'react';

const Terms = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <Button variant="ghost" onClick={() => navigate(-1)} className="mb-6 text-book-600">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>

        <div className="bg-white rounded-lg shadow-md p-6 md:p-8 max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-book-800 mb-6">Terms and Conditions</h1>
          
          <div className="space-y-6 text-gray-700">
            <div>
              <p className="text-sm text-gray-500 mb-4">
                <strong>Effective Date:</strong> 22 May 2025<br />
                <strong>Last Updated:</strong> 22 May 2025
              </p>
            </div>

            <section>
              <h2 className="text-xl font-semibold text-book-800 mb-3">1. Introduction</h2>
              <p>
                Welcome to ReBooked Solutions, a platform that facilitates the buying and selling of second-hand textbooks between users. We act as an intermediary, connecting sellers and buyers, and managing the logistics of delivery. By accessing or using our service, you agree to comply with and be bound by these Terms and Conditions.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-book-800 mb-3">2. Definitions</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>"We"/"Us"/"Our":</strong> Refers to ReBooked Solutions.</li>
                <li><strong>"User":</strong> Any individual using the platform, including both buyers and sellers.</li>
                <li><strong>"Seller":</strong> A user who lists textbooks for sale.</li>
                <li><strong>"Buyer":</strong> A user who purchases textbooks via the platform.</li>
                <li><strong>"Delivery Partner":</strong> Third-party logistics providers engaged to handle shipping.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-book-800 mb-3">3. Eligibility</h2>
              <p>
                Users must be at least 18 years old or have parental/guardian consent to use the platform. You must provide accurate and truthful information during registration.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-book-800 mb-3">4. User Responsibilities</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>Sellers must ensure that textbooks are accurately described and depicted in photos, in the stated condition, and free from copyright violations.</li>
                <li>Buyers must confirm details before purchasing.</li>
                <li>All users must not use the platform for fraudulent or illegal activity.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-book-800 mb-3">5. Platform Role & Limitations</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>We are not the owner of the textbooks listed.</li>
                <li>We do not guarantee the quality, accuracy, or authenticity of any listing.</li>
                <li>We act solely as an intermediary and logistics coordinator.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-book-800 mb-3">6. Listing & Selling Textbooks</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>Sellers must provide honest and complete information.</li>
                <li>All textbooks must be owned by the seller.</li>
                <li>Pricing is set by the seller, but we reserve the right to charge a 10% commission.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-book-800 mb-3">7. Buying Process</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>Buyers agree to pay the full listed price and delivery fee.</li>
                <li>Orders are considered final once payment is confirmed.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-book-800 mb-3">8. Payments & Fees</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>We charge a 10% commission per successful sale.</li>
                <li>Payment is processed through our chosen payment provider (to be finalized), and sellers receive funds after successful delivery and confirmation.</li>
                <li>Delivery fees are borne by the buyer unless otherwise stated.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-book-800 mb-3">9. Delivery & Logistics</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>We coordinate textbook shipping via third-party couriers (to be confirmed).</li>
                <li>Estimated delivery times are provided but not guaranteed.</li>
                <li>We are not liable for delays or damage caused during delivery, but we will assist with dispute resolution.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-book-800 mb-3">10. Returns & Refunds</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>Returns are only accepted if the item was not as described or damaged in transit.</li>
                <li>Refunds will be processed after investigation.</li>
                <li>Sellers may be responsible for return shipping in case of fault.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-book-800 mb-3">11. Dispute Resolution</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>We will mediate disputes in good faith but are not responsible for user misconduct.</li>
                <li>Disputes must be reported within 7 days of delivery.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-book-800 mb-3">12. Account Suspension or Termination</h2>
              <p>
                We reserve the right to suspend or terminate accounts that violate our terms, engage in fraudulent activity, or misuse the platform.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-book-800 mb-3">13. Limitation of Liability</h2>
              <p>
                We are not liable for indirect, incidental, or consequential damages. Our maximum liability in any claim is limited to the amount paid for the specific transaction.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-book-800 mb-3">14. Privacy Policy</h2>
              <p>
                All user data is handled in accordance with our Privacy Policy.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-book-800 mb-3">Privacy Policy</h2>
              <p className="text-sm text-gray-500 mb-4">
                <strong>Effective Date:</strong> 22 May 2025<br />
                <strong>Last Updated:</strong> 22 May 2025
              </p>
              <p className="mb-4">
                ReBooked Solutions values your privacy. This policy explains how we collect, use, and safeguard your personal data, in compliance with the Protection of Personal Information Act (POPIA) of South Africa.
              </p>

              <h3 className="text-lg font-semibold text-book-800 mb-2">1. Information We Collect</h3>
              <ul className="list-disc pl-6 space-y-1 mb-4">
                <li><strong>Personal Information:</strong> Name, email address, phone number, and location.</li>
                <li><strong>Account Information:</strong> Login credentials, transaction history.</li>
                <li><strong>Device & Usage Data:</strong> IP address, browser type, usage logs.</li>
              </ul>

              <h3 className="text-lg font-semibold text-book-800 mb-2">2. How We Use Your Information</h3>
              <ul className="list-disc pl-6 space-y-1 mb-4">
                <li>To provide and improve our services.</li>
                <li>To process transactions and deliveries.</li>
                <li>To communicate important updates and notifications.</li>
                <li>To comply with legal obligations.</li>
              </ul>

              <h3 className="text-lg font-semibold text-book-800 mb-2">3. Data Sharing</h3>
              <ul className="list-disc pl-6 space-y-1 mb-4">
                <li>With logistics and payment partners for service fulfilment.</li>
                <li>With legal authorities when required by law.</li>
                <li>We do not sell your data to third parties.</li>
              </ul>

              <h3 className="text-lg font-semibold text-book-800 mb-2">4. Data Retention</h3>
              <p className="mb-4">
                We retain your data for as long as your account is active or as necessary to provide our services.
              </p>

              <h3 className="text-lg font-semibold text-book-800 mb-2">5. Your Rights</h3>
              <p className="mb-4">
                You have the right to access, correct, or delete your personal information. Requests can be made by contacting us directly.
              </p>

              <h3 className="text-lg font-semibold text-book-800 mb-2">6. Security Measures</h3>
              <p className="mb-4">
                We implement industry-standard security to protect your data, including encryption, firewalls, and secure access controls.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-book-800 mb-3">Cookie Policy</h2>
              <p className="text-sm text-gray-500 mb-4">
                <strong>Effective Date:</strong> 22 May 2025<br />
                <strong>Last Updated:</strong> 22 May 2025
              </p>

              <h3 className="text-lg font-semibold text-book-800 mb-2">1. What Are Cookies?</h3>
              <p className="mb-4">
                Cookies are small text files stored on your device when you visit our website. They help improve user experience and website performance.
              </p>

              <h3 className="text-lg font-semibold text-book-800 mb-2">2. Types of Cookies We Use</h3>
              <ul className="list-disc pl-6 space-y-1 mb-4">
                <li><strong>Essential Cookies:</strong> Required for website functionality.</li>
                <li><strong>Analytics Cookies:</strong> Help us understand user interactions.</li>
                <li><strong>Preference Cookies:</strong> Remember your preferences and settings.</li>
              </ul>

              <h3 className="text-lg font-semibold text-book-800 mb-2">3. Managing Cookies</h3>
              <p className="mb-4">
                You can control cookie usage through your browser settings. Disabling cookies may affect your experience on our platform.
              </p>

              <h3 className="text-lg font-semibold text-book-800 mb-2">4. Consent</h3>
              <p className="mb-4">
                By using our website, you consent to the use of cookies as outlined in this policy.
              </p>
            </section>

            <section>
              <p className="text-center text-gray-600 mt-8 pt-6 border-t">
                These documents are governed by the laws of the Republic of South Africa. For more information or concerns, please contact us at{' '}
                <a href="mailto:legal@rebookedsolutions.com" className="text-book-600 hover:text-book-800">
                  legal@rebookedsolutions.com
                </a>
              </p>
            </section>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Terms;
