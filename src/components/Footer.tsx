
import { Link } from 'react-router-dom';
import { Book } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 pt-8 pb-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap text-left lg:text-left">
          <div className="w-full lg:w-4/12 px-4">
            <div className="flex items-center mb-4">
              <Book className="h-6 w-6 text-book-600" />
              <span className="ml-2 text-xl font-bold text-book-800">Rebooked</span>
            </div>
            <p className="text-gray-600 mt-2 mb-4">
              Buy and sell new and second-hand textbooks easily and safely. Save money and reduce waste by giving books a second life!
            </p>
          </div>
          <div className="w-full lg:w-8/12 px-4">
            <div className="flex flex-wrap">
              <div className="w-full md:w-4/12 px-4 ml-auto">
                <span className="block uppercase text-gray-600 text-sm font-semibold mb-3">Useful Links</span>
                <ul className="list-unstyled">
                  <li className="mb-2">
                    <Link to="/books" className="text-gray-600 hover:text-book-600 font-semibold">
                      Browse Books
                    </Link>
                  </li>
                  <li className="mb-2">
                    <Link to="/create-listing" className="text-gray-600 hover:text-book-600 font-semibold">
                      Sell a Book
                    </Link>
                  </li>
                  <li className="mb-2">
                    <Link to="/profile" className="text-gray-600 hover:text-book-600 font-semibold">
                      My Profile
                    </Link>
                  </li>
                  <li className="mb-2">
                    <Link to="/admin" className="text-gray-600 hover:text-book-600 font-semibold">
                      Admin Dashboard
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="w-full md:w-4/12 px-4">
                <span className="block uppercase text-gray-600 text-sm font-semibold mb-3">Other Resources</span>
                <ul className="list-unstyled">
                  <li className="mb-2">
                    <Link to="#" className="text-gray-600 hover:text-book-600 font-semibold">
                      Terms & Conditions
                    </Link>
                  </li>
                  <li className="mb-2">
                    <Link to="#" className="text-gray-600 hover:text-book-600 font-semibold">
                      Privacy Policy
                    </Link>
                  </li>
                  <li className="mb-2">
                    <Link to="#" className="text-gray-600 hover:text-book-600 font-semibold">
                      Contact Us
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="w-full md:w-4/12 px-4">
                <span className="block uppercase text-gray-600 text-sm font-semibold mb-3">Help</span>
                <ul className="list-unstyled">
                  <li className="mb-2">
                    <Link to="#" className="text-gray-600 hover:text-book-600 font-semibold">
                      FAQ
                    </Link>
                  </li>
                  <li className="mb-2">
                    <Link to="#" className="text-gray-600 hover:text-book-600 font-semibold">
                      Shipping
                    </Link>
                  </li>
                  <li className="mb-2">
                    <Link to="#" className="text-gray-600 hover:text-book-600 font-semibold">
                      Returns
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <hr className="my-6 border-gray-300" />
        <div className="flex flex-wrap items-center md:justify-between justify-center">
          <div className="w-full md:w-4/12 px-4 mx-auto text-center">
            <div className="text-sm text-gray-600 font-semibold py-1">
              Copyright © {new Date().getFullYear()} Rebooked. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
