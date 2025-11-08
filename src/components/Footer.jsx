import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">StudentHub</h3>
            <p className="text-sm text-gray-400">
              Empowering students through organized extracurricular activities and community engagement.
            </p>
            <div className="flex space-x-4 mt-4">
              <a href="#" className="hover:text-primary-400 transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-primary-400 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-primary-400 transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-primary-400 transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="hover:text-primary-400 transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/login" className="hover:text-primary-400 transition-colors">Login</Link>
              </li>
              <li>
                <Link to="/signup" className="hover:text-primary-400 transition-colors">Sign Up</Link>
              </li>
              <li>
                <a href="#" className="hover:text-primary-400 transition-colors">About Us</a>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Categories</h3>
            <ul className="space-y-2 text-sm">
              <li className="hover:text-primary-400 transition-colors cursor-pointer">Sports</li>
              <li className="hover:text-primary-400 transition-colors cursor-pointer">Arts</li>
              <li className="hover:text-primary-400 transition-colors cursor-pointer">Technology</li>
              <li className="hover:text-primary-400 transition-colors cursor-pointer">Music</li>
              <li className="hover:text-primary-400 transition-colors cursor-pointer">Science</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Contact Us</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start">
                <Mail className="h-5 w-5 mr-2 flex-shrink-0 text-primary-400" />
                <span>contact@studenthub.com</span>
              </li>
              <li className="flex items-start">
                <Phone className="h-5 w-5 mr-2 flex-shrink-0 text-primary-400" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-start">
                <MapPin className="h-5 w-5 mr-2 flex-shrink-0 text-primary-400" />
                <span>123 Education Street, Learning City, ED 12345</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} StudentHub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
