'use client';

import { Mail } from 'lucide-react';

interface NewsletterSignupProps {
  variant?: 'default' | 'compact' | 'inline';
  className?: string;
}

export default function NewsletterSignup({ 
  variant = 'default',
  className = '' 
}: NewsletterSignupProps) {
  
  // Google Form URL for newsletter signup
  const GOOGLE_FORM_URL = 'https://forms.gle/Z768b7nZM4Li9usa7';

  if (variant === 'compact') {
    return (
      <div className={`bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-6 text-white ${className}`}>
        <div className="flex items-center gap-3 mb-3">
          <Mail className="w-5 h-5" />
          <h3 className="font-semibold text-lg">Weekly Career Tips</h3>
        </div>
        <p className="text-sm text-blue-100 mb-4">
          Get side hustles, scholarships & blog posts in your inbox.
        </p>
        <a
          href={GOOGLE_FORM_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full bg-white text-blue-600 text-center px-4 py-2 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
        >
          Subscribe Free
        </a>
        <p className="text-xs text-blue-200 mt-2 text-center">
          No spam. Unsubscribe anytime.
        </p>
      </div>
    );
  }

  if (variant === 'inline') {
    return (
      <div className={`border-l-4 border-blue-600 bg-blue-50 dark:bg-blue-900/20 p-4 rounded-r-lg ${className}`}>
        <div className="flex items-start gap-3">
          <Mail className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-1 flex-shrink-0" />
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-1">
              💡 Want more career tips like this?
            </p>
            <p className="text-xs text-gray-600 dark:text-gray-400 mb-3">
              Join our weekly newsletter for side hustles, scholarships, and actionable advice.
            </p>
            <a
              href={GOOGLE_FORM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-blue-600 text-white text-sm px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Subscribe Free →
            </a>
          </div>
        </div>
      </div>
    );
  }

  // Default variant (full width)
  return (
    <div className={`bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8 md:p-10 text-white text-center ${className}`}>
      <Mail className="w-10 h-10 mx-auto mb-4 opacity-90" />
      <h3 className="text-2xl md:text-3xl font-bold mb-3">
        Stay Ahead in Your Career
      </h3>
      <p className="text-blue-100 mb-6 max-w-xl mx-auto">
        Join 500+ students and professionals getting weekly career tips, side hustle ideas, and new scholarships delivered to their inbox.
      </p>
      <a
        href={GOOGLE_FORM_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors shadow-lg text-lg"
      >
        Subscribe to Newsletter
      </a>
      <p className="text-xs text-blue-200 mt-4">
        📧 100% free • 📬 Weekly emails • 🚫 No spam • ✅ Unsubscribe anytime
      </p>
    </div>
  );
}
