
import Layout from '@/components/Layout';

const Terms = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="bg-white rounded-lg shadow-sm border p-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-book-800 mb-4">Terms and Conditions</h1>
            <p className="text-gray-600 text-lg">Effective Date: January 1, 2025</p>
            <div className="w-24 h-1 bg-book-600 mx-auto mt-4"></div>
          </div>

          <div className="prose prose-lg max-w-none">
            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-book-800 mb-4 border-b-2 border-book-100 pb-2">
                1. Agreement to Terms
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                By accessing and using ReBooked Solutions ("the Platform"), you agree to be bound by these Terms and Conditions. 
                If you do not agree to these terms, please do not use our services.
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>These terms apply to all users of the platform</li>
                <li>We reserve the right to modify these terms at any time</li>
                <li>Continued use constitutes acceptance of updated terms</li>
              </ul>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-book-800 mb-4 border-b-2 border-book-100 pb-2">
                2. Platform Description
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                ReBooked Solutions is a marketplace platform that connects buyers and sellers of used textbooks. 
                We facilitate transactions but are not party to the actual sale agreements between users.
              </p>
              <div className="bg-book-50 p-4 rounded-lg border-l-4 border-book-600">
                <p className="text-book-800 font-medium">
                  Our Mission: "Old Pages, New Adventures" - Making education more affordable through textbook sharing.
                </p>
              </div>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-book-800 mb-4 border-b-2 border-book-100 pb-2">
                3. User Accounts and Registration
              </h2>
              <div className="space-y-4">
                <h3 className="text-xl font-medium text-book-700">3.1 Account Requirements</h3>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>Users must be at least 18 years old or have parental consent</li>
                  <li>All registration information must be accurate and up-to-date</li>
                  <li>One account per person is permitted</li>
                  <li>Account sharing is prohibited</li>
                </ul>
                
                <h3 className="text-xl font-medium text-book-700">3.2 Account Security</h3>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>Users are responsible for maintaining account security</li>
                  <li>Password protection is the user's responsibility</li>
                  <li>Notify us immediately of any unauthorized access</li>
                </ul>
              </div>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-book-800 mb-4 border-b-2 border-book-100 pb-2">
                4. Commission and Fees
              </h2>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-4">
                <h3 className="text-xl font-semibold text-yellow-800 mb-3">Important Fee Information</h3>
                <p className="text-yellow-700 mb-3">
                  <strong>ReBooked Solutions charges a 10% commission on all successful book sales.</strong>
                </p>
                <ul className="list-disc pl-6 space-y-2 text-yellow-700">
                  <li>Commission is automatically deducted from the sale price</li>
                  <li>Sellers receive 90% of the listed book price</li>
                  <li>Commission covers platform maintenance and secure transactions</li>
                  <li>No hidden fees or additional charges</li>
                </ul>
              </div>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-book-800 mb-4 border-b-2 border-book-100 pb-2">
                5. Buying and Selling
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-xl font-medium text-book-700 mb-3">5.1 For Sellers</h3>
                  <ul className="list-disc pl-6 space-y-2 text-gray-700">
                    <li>Accurate book descriptions required</li>
                    <li>Honest condition assessments</li>
                    <li>Prompt communication with buyers</li>
                    <li>Timely book delivery</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-medium text-book-700 mb-3">5.2 For Buyers</h3>
                  <ul className="list-disc pl-6 space-y-2 text-gray-700">
                    <li>Review book details carefully</li>
                    <li>Communicate delivery preferences</li>
                    <li>Confirm receipt promptly</li>
                    <li>Report any issues immediately</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-book-800 mb-4 border-b-2 border-book-100 pb-2">
                6. Prohibited Activities
              </h2>
              <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-red-800 mb-3">Strictly Prohibited</h3>
                <ul className="list-disc pl-6 space-y-2 text-red-700">
                  <li>Listing counterfeit or illegal materials</li>
                  <li>Fraudulent transactions or misrepresentation</li>
                  <li>Harassment or inappropriate communication</li>
                  <li>Attempting to bypass platform fees</li>
                  <li>Creating multiple accounts</li>
                  <li>Automated scraping or data collection</li>
                </ul>
              </div>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-book-800 mb-4 border-b-2 border-book-100 pb-2">
                7. Platform Responsibilities
              </h2>
              <div className="space-y-4">
                <h3 className="text-xl font-medium text-book-700">7.1 What We Provide</h3>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>Secure platform for book transactions</li>
                  <li>User verification and safety measures</li>
                  <li>Customer support and dispute resolution</li>
                  <li>Platform maintenance and security</li>
                </ul>
                
                <h3 className="text-xl font-medium text-book-700">7.2 Platform Limitations</h3>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>We do not guarantee book condition or delivery</li>
                  <li>Users are responsible for their own transactions</li>
                  <li>We are not liable for user disputes</li>
                  <li>Platform availability may be limited during maintenance</li>
                </ul>
              </div>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-book-800 mb-4 border-b-2 border-book-100 pb-2">
                8. Privacy and Data Protection
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Your privacy is important to us. We collect and use personal information only as outlined in our Privacy Policy.
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>We protect user data with industry-standard security</li>
                <li>Personal information is not sold to third parties</li>
                <li>Users can request data deletion at any time</li>
                <li>Cookies are used to improve user experience</li>
              </ul>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-book-800 mb-4 border-b-2 border-book-100 pb-2">
                9. Dispute Resolution
              </h2>
              <div className="space-y-4">
                <p className="text-gray-700 leading-relaxed">
                  If disputes arise between users, we encourage direct communication first. If resolution cannot be reached:
                </p>
                <ol className="list-decimal pl-6 space-y-2 text-gray-700">
                  <li>Contact our support team within 7 days of the issue</li>
                  <li>Provide all relevant transaction details</li>
                  <li>Cooperate with our investigation process</li>
                  <li>Accept mediated resolution or pursue external legal options</li>
                </ol>
              </div>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-book-800 mb-4 border-b-2 border-book-100 pb-2">
                10. Termination
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                We reserve the right to terminate or suspend accounts that violate these terms. Users may also close their accounts at any time.
              </p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-medium text-gray-800 mb-2">Account Termination Results In:</h3>
                <ul className="list-disc pl-6 space-y-1 text-gray-700">
                  <li>Loss of access to the platform</li>
                  <li>Removal of all active listings</li>
                  <li>Forfeiture of any pending transactions</li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-book-800 mb-4 border-b-2 border-book-100 pb-2">
                11. Contact Information
              </h2>
              <div className="bg-book-50 p-6 rounded-lg">
                <p className="text-gray-700 mb-4">
                  For questions about these Terms and Conditions, please contact us:
                </p>
                <div className="space-y-2 text-gray-700">
                  <p><strong>Email:</strong> support@rebookedsolutions.com</p>
                  <p><strong>Platform:</strong> Use our contact form for general inquiries</p>
                  <p><strong>Response Time:</strong> We aim to respond within 24-48 hours</p>
                </div>
              </div>
            </section>
          </div>

          <div className="border-t border-gray-200 pt-6 mt-8 text-center">
            <p className="text-gray-500 text-sm">
              Last updated: January 1, 2025 | ReBooked Solutions - "Old Pages, New Adventures"
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Terms;
