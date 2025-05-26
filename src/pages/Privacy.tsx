
import Layout from '@/components/Layout';

const Privacy = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="bg-white rounded-lg shadow-sm border p-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-book-800 mb-4">Privacy Policy</h1>
            <p className="text-gray-600 text-lg">Effective Date: January 1, 2025</p>
            <div className="w-24 h-1 bg-book-600 mx-auto mt-4"></div>
          </div>

          <div className="prose prose-lg max-w-none">
            <div className="bg-book-50 p-6 rounded-lg border-l-4 border-book-600 mb-8">
              <p className="text-book-800 font-medium leading-relaxed">
                ReBooked Solutions ("ReBooked", "we", "our", or "us") is committed to protecting your privacy and 
                ensuring that your personal information is handled securely and in compliance with the Protection 
                of Personal Information Act (POPIA) of South Africa and other applicable data protection laws.
              </p>
              <p className="text-book-700 mt-3">
                By using our platform, you agree to the terms of this Privacy Policy.
              </p>
            </div>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-book-800 mb-4 border-b-2 border-book-100 pb-2">
                1. Information We Collect
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                We collect the following personal information from users:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Full name</li>
                <li>Email address</li>
                <li>Phone number</li>
                <li>Location (e.g. city or area)</li>
              </ul>
              <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-600 mt-4">
                <p className="text-green-800 font-medium">
                  <strong>Important:</strong> We do not collect ID numbers or payment details directly. 
                  All payments are handled via trusted third-party providers.
                </p>
              </div>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-book-800 mb-4 border-b-2 border-book-100 pb-2">
                2. How We Collect Information
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                We collect personal information directly from you when you:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Create an account (sign-up)</li>
                <li>Communicate with our support team</li>
                <li>Engage with our platform (e.g. listing or exchanging books)</li>
              </ul>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-book-800 mb-4 border-b-2 border-book-100 pb-2">
                3. Why We Collect Your Information
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                We collect your personal information for the following purposes:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>To verify your identity and manage your account</li>
                <li>To facilitate and process book exchanges and transactions</li>
                <li>To provide customer support</li>
                <li>To analyze usage and improve the platform</li>
              </ul>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-book-800 mb-4 border-b-2 border-book-100 pb-2">
                4. Third-Party Services
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                We use the following third-party services that may process your personal information:
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-lg font-medium text-book-700 mb-2">Current Services</h3>
                  <ul className="list-disc pl-6 space-y-1 text-gray-700">
                    <li><strong>Supabase</strong> – for authentication, user data storage, and backend services</li>
                    <li><strong>Lovable</strong> – for website design and content services</li>
                  </ul>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="text-lg font-medium text-blue-700 mb-2">Future Services</h3>
                  <ul className="list-disc pl-6 space-y-1 text-blue-700">
                    <li><strong>Courier and logistics providers</strong> – to facilitate book deliveries</li>
                    <li><strong>Payment processors</strong> – to handle payments securely</li>
                  </ul>
                </div>
              </div>
              <p className="text-gray-700 leading-relaxed mt-4">
                These third parties are expected to comply with relevant data protection laws and maintain adequate security controls.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-book-800 mb-4 border-b-2 border-book-100 pb-2">
                5. Use of Cookies and Tracking Technologies
              </h2>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-700 font-medium">
                  We do not use cookies or tracking technologies at this time.
                </p>
              </div>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-book-800 mb-4 border-b-2 border-book-100 pb-2">
                6. How We Store and Protect Your Information
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Your personal data is securely stored in Supabase, our cloud-based backend provider. 
                We implement industry-standard security measures, including:
              </p>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-blue-800 mb-3">Security Measures</h3>
                <ul className="list-disc pl-6 space-y-2 text-blue-700">
                  <li>Encrypted storage</li>
                  <li>Access control restrictions</li>
                  <li>Regular audits and reviews</li>
                </ul>
              </div>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-book-800 mb-4 border-b-2 border-book-100 pb-2">
                7. Sharing Your Information
              </h2>
              <div className="space-y-4">
                <p className="text-gray-700 leading-relaxed">
                  We only share your personal information when necessary, such as with:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>Courier services to deliver books</li>
                  <li>Payment gateways to process payments</li>
                </ul>
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <p className="text-red-800 font-medium">
                    <strong>We do not sell or rent your personal information to any third parties.</strong>
                  </p>
                </div>
              </div>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-book-800 mb-4 border-b-2 border-book-100 pb-2">
                8. Your Rights
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                As a user, you have the right to:
              </p>
              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-green-800 mb-3">Your Data Rights</h3>
                <ul className="list-disc pl-6 space-y-2 text-green-700">
                  <li>Access the personal information we hold about you</li>
                  <li>Correct or update your information</li>
                  <li>Request deletion of your account and associated data</li>
                </ul>
                <p className="text-green-700 mt-4">
                  You can manage your information via your user profile or by contacting us directly.
                </p>
              </div>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-book-800 mb-4 border-b-2 border-book-100 pb-2">
                9. Contact Us
              </h2>
              <div className="bg-book-50 p-6 rounded-lg">
                <p className="text-gray-700 mb-4">
                  For any privacy-related questions, requests, or concerns, please contact us at:
                </p>
                <div className="space-y-2 text-gray-700">
                  <p><strong>📧 Email:</strong> privacy@rebooked.co.za</p>
                  <p><strong>Platform:</strong> Use our contact form for general inquiries</p>
                  <p><strong>Response Time:</strong> We aim to respond within 24-48 hours</p>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-book-800 mb-4 border-b-2 border-book-100 pb-2">
                10. Changes to This Privacy Policy
              </h2>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                <p className="text-yellow-800 leading-relaxed">
                  We may update this Privacy Policy from time to time. Any changes will be communicated via our website. 
                  Continued use of the platform after changes constitutes your acceptance of the revised policy.
                </p>
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

export default Privacy;
