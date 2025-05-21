
import { Link } from 'react-router-dom';
import { Book, Mail } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link to="/" className="flex items-center">
              <Book className="h-6 w-6 text-book-600" />
              <span className="ml-2 text-xl font-bold text-book-800">Rebooked</span>
            </Link>
            <p className="text-gray-600 text-sm">
              Buy and sell new and used books directly from other students and book lovers.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
              Marketplace
            </h3>
            <ul className="space-y-2">
              <li>
                <Link to="/books" className="text-gray-600 hover:text-book-600 text-sm">
                  Browse Books
                </Link>
              </li>
              <li>
                <Link to="/books?category=textbooks" className="text-gray-600 hover:text-book-600 text-sm">
                  Textbooks
                </Link>
              </li>
              <li>
                <Link to="/books?condition=new" className="text-gray-600 hover:text-book-600 text-sm">
                  New Books
                </Link>
              </li>
              <li>
                <Link to="/books?condition=used" className="text-gray-600 hover:text-book-600 text-sm">
                  Used Books
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
              Account
            </h3>
            <ul className="space-y-2">
              <li>
                <Link to="/profile" className="text-gray-600 hover:text-book-600 text-sm">
                  My Profile
                </Link>
              </li>
              <li>
                <Link to="/create-listing" className="text-gray-600 hover:text-book-600 text-sm">
                  Sell a Book
                </Link>
              </li>
              <li>
                <Link to="/activity" className="text-gray-600 hover:text-book-600 text-sm">
                  My Activity
                </Link>
              </li>
              <li>
                <Link to="/wishlist" className="text-gray-600 hover:text-book-600 text-sm">
                  Wishlist
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
              Support
            </h3>
            <ul className="space-y-2">
              <li>
                <Link to="/contact" className="text-gray-600 hover:text-book-600 text-sm flex items-center">
                  <Mail className="h-4 w-4 mr-1" />
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/report" className="text-gray-600 hover:text-book-600 text-sm">
                  Report an Issue
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-gray-600 hover:text-book-600 text-sm">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-600 hover:text-book-600 text-sm">
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Frequently Asked Questions</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-book-700 mb-2">What is ReBooked?</h4>
              <p className="text-sm text-gray-600">
                ReBooked is a platform where individuals can buy and sell second-hand or new books. It provides a safe and accessible environment for book lovers to exchange books.
              </p>
            </div>
            <div>
              <h4 className="font-medium text-book-700 mb-2">How much will I earn when I sell my book?</h4>
              <p className="text-sm text-gray-600">
                Sellers keep 90% of the sale price. ReBooked takes a 10% commission to help maintain and improve the platform.
              </p>
            </div>
            <div>
              <h4 className="font-medium text-book-700 mb-2">Does ReBooked buy books?</h4>
              <p className="text-sm text-gray-600">
                No, ReBooked does not directly purchase books. We provide an environment where people can sell their books to other individuals.
              </p>
            </div>
            <div>
              <h4 className="font-medium text-book-700 mb-2">How do I list a book for sale?</h4>
              <p className="text-sm text-gray-600">
                Create an account, upload your book's details and images, set your price, and publish your listing. It's quick and easy!
              </p>
            </div>
            <div>
              <h4 className="font-medium text-book-700 mb-2">Is it free to sign up?</h4>
              <p className="text-sm text-gray-600">
                Yes, signing up and browsing books is completely free. You only pay or earn when a transaction occurs.
              </p>
            </div>
            <div>
              <h4 className="font-medium text-book-700 mb-2">What kinds of books can I sell on ReBooked?</h4>
              <p className="text-sm text-gray-600">
                You can sell new or used books in good condition, including textbooks, fiction, non-fiction, and more. We encourage clean, readable copies.
              </p>
            </div>
            <div>
              <h4 className="font-medium text-book-700 mb-2">What if I have an issue with a transaction?</h4>
              <p className="text-sm text-gray-600">
                If there's a problem—like a missing delivery or damaged book—you can contact ReBooked support for help. We aim to keep the platform safe and fair.
              </p>
            </div>
            <div>
              <h4 className="font-medium text-book-700 mb-2">Can I edit or delete my book listing?</h4>
              <p className="text-sm text-gray-600">
                Yes, you can manage your listings at any time from your account dashboard.
              </p>
            </div>
            <div>
              <h4 className="font-medium text-book-700 mb-2">Is ReBooked available outside of South Africa?</h4>
              <p className="text-sm text-gray-600">
                Currently, ReBooked is focused on serving users within South Africa.
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-6 mt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-500">
            &copy; {currentYear} Rebooked. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
