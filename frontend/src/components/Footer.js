import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300 mt-16">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* About */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">
              <i className="fas fa-map text-green-500 mr-2"></i>Trishal Civic
            </h3>
            <p className="text-sm text-gray-400">
              ত্রিশাল উপজেলার নাগরিক প্ল্যাটফর্ম যেখানে সম্প্রদায় অবকাঠামোগত সমস্যা রিপোর্ট করতে পারে।
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-white font-bold mb-4">দ্রুত লিংক</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="/" className="hover:text-green-500 transition">হোম</a></li>
              <li><a href="/problems" className="hover:text-green-500 transition">সমস্যাসমূহ</a></li>
              {/* <li><a href="/polling-stations" className="hover:text-green-500 transition">ভোট কেন্দ্র</a></li> */}
              <li><a href="/helpline" className="hover:text-green-500 transition">হেল্পলাইন</a></li>
            </ul>
          </div>

          {/* Features */}
          <div>
            <h4 className="text-white font-bold mb-4">বৈশিষ্ট্যসমূহ</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="/" className="hover:text-green-500 transition">ম্যাপ ভিউ</a></li>
              <li><a href="/report-problem" className="hover:text-green-500 transition">সমস্যা রিপোর্ট করুন</a></li>
              <li><button type="button" className="text-left hover:text-green-500 transition cursor-default opacity-70">অ্যানালিটিক্স (শীঘ্রই)</button></li>
              <li><button type="button" className="text-left hover:text-green-500 transition cursor-default opacity-70">সম্প্রদায় ফোরাম (শীঘ্রই)</button></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-bold mb-4">যোগাযোগ করুন</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center">
                <i className="fas fa-map-marker-alt text-green-500 mr-2"></i>
                <span>ত্রিশাল, ময়মনসিংহ</span>
              </li>
              <li className="flex items-center">
                <i className="fas fa-envelope text-green-500 mr-2"></i>
                <a href="mailto:fuadrahat01@gmail.com" className="hover:text-green-500">fuadrahat01@gmail.com</a>
              </li>
              <li className="flex items-center">
                <i className="fas fa-phone text-green-500 mr-2"></i>
                <span>01754677999</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 pt-8">
          {/* Social Links */}
          <div className="flex justify-center space-x-6 mb-6">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-green-500 transition text-xl"
            >
              <i className="fab fa-facebook"></i>
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-green-500 transition text-xl"
            >
              <i className="fab fa-twitter"></i>
            </a>
            <a
              href="https://wa.me/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-green-500 transition text-xl"
            >
              <i className="fab fa-whatsapp"></i>
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-green-500 transition text-xl"
            >
              <i className="fab fa-youtube"></i>
            </a>
          </div>

          {/* Copyright */}
          <div className="text-center text-sm text-gray-500">
            <p>© {currentYear} Trishal Civic Map. সকল অধিকার সংরক্ষিত।</p>
            <p className="mt-2">
              Developer:{' '}
              <a
                href="https://www.fuadrahat.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-400 hover:text-green-300 transition"
              >
                Md. Muhtasim Fuad Rahat
              </a>
            </p>
            <p className="mt-2">
              <button
                type="button"
                className="hover:text-green-500 transition cursor-default opacity-70"
              >
                গোপনীয়তা নীতি (ডেমো)
              </button>
              {' '} | {' '}
              <button
                type="button"
                className="hover:text-green-500 transition cursor-default opacity-70"
              >
                সেবার শর্তাবলী (ডেমো)
              </button>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
