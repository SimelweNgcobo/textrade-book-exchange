
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Terms = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <Card className="max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-book-800">Terms and Conditions</CardTitle>
            <p className="text-gray-600">Effective Date: May 25, 2025</p>
          </CardHeader>
          <CardContent className="prose prose-lg max-w-none">
            <p className="text-gray-700 mb-6">
              Welcome to ReBooked Solutions. These Terms and Conditions ("Terms") govern your use of our textbook marketplace platform. By accessing or using our services, you agree to be bound by these Terms.
            </p>

            <h2 className="text-2xl font-semibold text-book-800 mt-8 mb-4">1. Acceptance of Terms</h2>
            <p className="mb-4">
              By creating an account or using ReBooked Solutions, you confirm that you accept these Terms and agree to comply with them. If you do not agree to these Terms, you must not use our services.
            </p>

            <h2 className="text-2xl font-semibold text-book-800 mt-8 mb-4">2. Description of Service</h2>
            <p className="mb-4">
              ReBooked Solutions is an online marketplace that connects buyers and sellers of textbooks. We provide a platform for users to list, browse, and purchase textbooks but are not party to the actual transactions between users.
            </p>

            <h2 className="text-2xl font-semibold text-book-800 mt-8 mb-4">3. User Accounts</h2>
            <h3 className="text-xl font-semibold text-book-700 mt-6 mb-3">Registration</h3>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>You must provide accurate and complete information when creating an account</li>
              <li>You are responsible for maintaining the security of your account credentials</li>
              <li>You must be at least 13 years old to create an account</li>
              <li>One person may not maintain multiple accounts</li>
            </ul>

            <h3 className="text-xl font-semibold text-book-700 mt-6 mb-3">Account Responsibilities</h3>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>You are responsible for all activity under your account</li>
              <li>You must notify us immediately of any unauthorized access</li>
              <li>We reserve the right to suspend or terminate accounts that violate these Terms</li>
            </ul>

            <h2 className="text-2xl font-semibold text-book-800 mt-8 mb-4">4. Buying and Selling</h2>
            <h3 className="text-xl font-semibold text-book-700 mt-6 mb-3">Seller Obligations</h3>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Provide accurate descriptions and photos of textbooks</li>
              <li>Honor the listed price and condition</li>
              <li>Respond promptly to buyer inquiries</li>
              <li>Complete transactions in good faith</li>
              <li>Only list textbooks you legally own</li>
            </ul>

            <h3 className="text-xl font-semibold text-book-700 mt-6 mb-3">Buyer Obligations</h3>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Review listings carefully before purchasing</li>
              <li>Complete payment as agreed</li>
              <li>Communicate respectfully with sellers</li>
              <li>Report any issues promptly</li>
            </ul>

            <h2 className="text-2xl font-semibold text-book-800 mt-8 mb-4">5. Fees and Payments</h2>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>ReBooked Solutions charges a 10% commission on completed sales</li>
              <li>Commission is automatically deducted from the sale price</li>
              <li>Sellers receive 90% of the listing price upon successful transaction</li>
              <li>We reserve the right to modify our fee structure with notice</li>
            </ul>

            <h2 className="text-2xl font-semibold text-book-800 mt-8 mb-4">6. Prohibited Activities</h2>
            <p className="mb-4">Users are prohibited from:</p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Posting false, misleading, or inaccurate listings</li>
              <li>Selling counterfeit or pirated materials</li>
              <li>Engaging in fraudulent activities</li>
              <li>Harassing or abusing other users</li>
              <li>Attempting to circumvent platform fees</li>
              <li>Using automated tools to scrape or manipulate the platform</li>
              <li>Posting content that violates intellectual property rights</li>
            </ul>

            <h2 className="text-2xl font-semibold text-book-800 mt-8 mb-4">7. Content and Intellectual Property</h2>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>You retain ownership of content you post but grant us license to use it on our platform</li>
              <li>You must have rights to all content you upload</li>
              <li>We respect intellectual property rights and will remove infringing content</li>
              <li>Our platform content and trademarks are protected by intellectual property laws</li>
            </ul>

            <h2 className="text-2xl font-semibold text-book-800 mt-8 mb-4">8. Privacy and Data</h2>
            <p className="mb-4">
              Your privacy is important to us. Please review our Privacy Policy to understand how we collect, use, and protect your information.
            </p>

            <h2 className="text-2xl font-semibold text-book-800 mt-8 mb-4">9. Disclaimers</h2>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>We provide the platform "as is" without warranties</li>
              <li>We are not responsible for the quality, safety, or legality of listed items</li>
              <li>We do not guarantee that transactions will be completed</li>
              <li>Users interact at their own risk</li>
            </ul>

            <h2 className="text-2xl font-semibold text-book-800 mt-8 mb-4">10. Limitation of Liability</h2>
            <p className="mb-4">
              ReBooked Solutions shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of our platform. Our total liability is limited to the fees paid to us in the 12 months preceding the claim.
            </p>

            <h2 className="text-2xl font-semibold text-book-800 mt-8 mb-4">11. Termination</h2>
            <p className="mb-4">
              We may terminate or suspend your account at any time for violations of these Terms. You may also delete your account at any time. Certain provisions of these Terms will survive termination.
            </p>

            <h2 className="text-2xl font-semibold text-book-800 mt-8 mb-4">12. Dispute Resolution</h2>
            <p className="mb-4">
              We encourage users to resolve disputes directly. For unresolved issues, disputes will be governed by South African law and resolved through arbitration in Gauteng, South Africa.
            </p>

            <h2 className="text-2xl font-semibold text-book-800 mt-8 mb-4">13. Changes to Terms</h2>
            <p className="mb-4">
              We may update these Terms from time to time. We will notify users of significant changes and continued use constitutes acceptance of the updated Terms.
            </p>

            <h2 className="text-2xl font-semibold text-book-800 mt-8 mb-4">14. Contact Information</h2>
            <p className="mb-4">
              If you have questions about these Terms, please contact us at:
            </p>
            <p className="mb-2"><strong>Email:</strong> legal@rebooked.co.za</p>
            <p className="mb-2"><strong>Address:</strong> ReBooked Solutions, Gauteng, South Africa</p>

            <p className="mt-8 text-sm text-gray-600">
              These Terms and Conditions were last updated on May 25, 2025.
            </p>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Terms;
