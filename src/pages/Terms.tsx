
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
              <h2 className="text-xl font-semibold text-book-700 mb-4">Terms and Conditions for ReBooked</h2>
              <p className="text-sm text-gray-500 mb-6">Effective Date: 25 May 2025 | Last Updated: 25 May 2025</p>
              <p>These Terms govern your use of ReBooked, a book exchange platform operated in South Africa.</p>
              
              <h3 className="text-lg font-medium text-book-700 mt-6 mb-3">1. Account Registration</h3>
              <p>To use ReBooked, users must:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Create an account using accurate information</li>
                <li>Keep login credentials confidential</li>
                <li>Be 18 years or older or have parental consent</li>
              </ul>
              <p>ReBooked reserves the right to suspend or terminate accounts that violate these Terms.</p>
              
              <h3 className="text-lg font-medium text-book-700 mt-6 mb-3">2. Platform Use</h3>
              <p>You agree to use ReBooked lawfully and respectfully. You may not:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Misrepresent books or listings</li>
                <li>Upload illegal or infringing content</li>
                <li>Attempt to access other user accounts</li>
                <li>Use automated tools or scraping technology</li>
                <li>Harass or defraud other users</li>
              </ul>
              
              <h3 className="text-lg font-medium text-book-700 mt-6 mb-3">3. Book Exchanges and Shipping</h3>
              <p>Users are responsible for coordinating the shipping of books between themselves.</p>
              <p>ReBooked is not a courier service and does not guarantee delivery.</p>
              <p>Users agree to provide accurate descriptions of the books exchanged.</p>
              <p>A third-party carrier will be used (to be confirmed by ReBooked).</p>
              <p>ReBooked is not liable for lost, damaged, or delayed items.</p>
              
              <h3 className="text-lg font-medium text-book-700 mt-6 mb-3">4. Payments and Fees</h3>
              <p>ReBooked takes a 10% commission on each completed book exchange transaction.</p>
              <p>This fee is deducted automatically and covers platform operations.</p>
              <p>By using the platform, you agree to the fee structure.</p>
              <p>ReBooked may update its commission rate with prior notice to users.</p>
              
              <h3 className="text-lg font-medium text-book-700 mt-6 mb-3">5. Intellectual Property</h3>
              <p>All content, logos, and branding on ReBooked are owned by ReBooked or licensed appropriately.</p>
              <p>Users retain ownership of any content they upload but grant ReBooked a license to display it.</p>
              
              <h3 className="text-lg font-medium text-book-700 mt-6 mb-3">6. Disclaimers</h3>
              <p>ReBooked is a facilitator, not a party to exchanges.</p>
              <p>We do not guarantee the condition, value, or delivery of books.</p>
              <p>Use of the platform is at your own risk.</p>
              
              <h3 className="text-lg font-medium text-book-700 mt-6 mb-3">7. Termination</h3>
              <p>We may suspend or terminate your access to ReBooked at any time for violation of these Terms or misuse of the service.</p>
              
              <h3 className="text-lg font-medium text-book-700 mt-6 mb-3">8. Governing Law</h3>
              <p>These Terms are governed by the laws of the Republic of South Africa. Any disputes must be resolved under South African jurisdiction.</p>
              
              <h3 className="text-lg font-medium text-book-700 mt-6 mb-3">9. Contact</h3>
              <p>For questions, complaints, or support:</p>
              <p>Email: rebooked.co.za@gmail.com</p>
            </TabsContent>
            
            <TabsContent value="privacy" className="prose max-w-none text-gray-600">
              <h2 className="text-xl font-semibold text-book-700 mb-4">Privacy Policy for ReBooked</h2>
              <p className="text-sm text-gray-500 mb-6">Effective Date: 25 May 2025 | Last Updated: 25 May 2025</p>
              <p>ReBooked ("we", "us", or "our") is committed to protecting your privacy in accordance with the Protection of Personal Information Act (POPIA) of South Africa. This Privacy Policy explains how we collect, use, and safeguard your personal data when you use our services.</p>
              
              <h3 className="text-lg font-medium text-book-700 mt-6 mb-3">1. Information We Collect</h3>
              <p>We may collect the following personal information:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Full name</li>
                <li>Email address</li>
                <li>Phone number</li>
                <li>Location (e.g., delivery address or city)</li>
                <li>Account credentials (securely stored)</li>
                <li>Exchange transaction data</li>
              </ul>
              
              <h3 className="text-lg font-medium text-book-700 mt-6 mb-3">2. How We Collect It</h3>
              <p>We collect your information when you:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Register for a ReBooked account</li>
                <li>Complete forms or update your profile</li>
                <li>Engage in a book exchange</li>
                <li>Contact customer support</li>
              </ul>
              <p>We may also collect limited technical data through cookies (see Cookie Policy).</p>
              
              <h3 className="text-lg font-medium text-book-700 mt-6 mb-3">3. Why We Collect It</h3>
              <p>We collect your data to:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Provide and operate the ReBooked platform</li>
                <li>Facilitate book exchanges and deliveries</li>
                <li>Communicate with users regarding transactions</li>
                <li>Ensure platform security</li>
                <li>Comply with legal requirements</li>
              </ul>
              
              <h3 className="text-lg font-medium text-book-700 mt-6 mb-3">4. Who We Share It With</h3>
              <p>We may share your data with:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Courier partners (for delivery coordination)</li>
                <li>IT providers (e.g., secure hosting, email delivery)</li>
                <li>Legal authorities if legally required</li>
              </ul>
              <p>We do not sell or rent your personal information.</p>
              
              <h3 className="text-lg font-medium text-book-700 mt-6 mb-3">5. Data Security</h3>
              <p>We implement appropriate technical and organizational measures to protect your personal data. These include:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Encryption of sensitive data</li>
                <li>Role-based access control</li>
                <li>Regular security audits</li>
              </ul>
              
              <h3 className="text-lg font-medium text-book-700 mt-6 mb-3">6. Your Rights Under POPIA</h3>
              <p>You have the right to:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Access your personal data</li>
                <li>Request correction or deletion</li>
                <li>Object to processing</li>
                <li>Withdraw consent at any time</li>
              </ul>
              <p>You may exercise these rights by contacting us.</p>
              
              <h3 className="text-lg font-medium text-book-700 mt-6 mb-3">7. Data Retention</h3>
              <p>We retain your data only for as long as necessary to fulfill the purposes outlined in this policy or as required by law.</p>
              
              <h3 className="text-lg font-medium text-book-700 mt-6 mb-3">8. Contact Us</h3>
              <p>If you have any questions about this policy or wish to exercise your rights:</p>
              <p>Email: rebooked.co.za@gmail.com</p>
            </TabsContent>
            
            <TabsContent value="cookies" className="prose max-w-none text-gray-600">
              <h2 className="text-xl font-semibold text-book-700 mb-4">Cookie Policy for ReBooked</h2>
              <p className="text-sm text-gray-500 mb-6">Effective Date: 25 May 2025 | Last Updated: 25 May 2025</p>
              <p>This Cookie Policy explains how ReBooked uses cookies and similar tracking technologies.</p>
              
              <h3 className="text-lg font-medium text-book-700 mt-6 mb-3">1. What Are Cookies?</h3>
              <p>Cookies are small files stored on your device when you visit a website. They help us remember your preferences and track usage.</p>
              
              <h3 className="text-lg font-medium text-book-700 mt-6 mb-3">2. Types of Cookies We Use</h3>
              <ul className="list-disc pl-6 space-y-1">
                <li>Essential Cookies: Necessary for login, account access, and navigation.</li>
                <li>Analytics Cookies (planned): Help us understand user behavior and improve functionality.</li>
                <li>Preference Cookies: Store user settings (e.g., location or theme preference).</li>
              </ul>
              
              <h3 className="text-lg font-medium text-book-700 mt-6 mb-3">3. Cookie Consent</h3>
              <p>By using ReBooked, you agree to the use of cookies. You may opt-out or change settings via your browser.</p>
              <p>We display a cookie banner on your first visit in accordance with data protection guidelines.</p>
              
              <h3 className="text-lg font-medium text-book-700 mt-6 mb-3">4. Managing Cookies</h3>
              <p>You can disable cookies via your browser settings. However, this may affect your ability to use some features of ReBooked.</p>
              
              <h3 className="text-lg font-medium text-book-700 mt-6 mb-3">5. Contact</h3>
              <p>If you have questions about our use of cookies:</p>
              <p>Email: rebooked.co.za@gmail.com</p>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

export default Terms;
