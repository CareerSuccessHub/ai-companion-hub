import { Metadata } from 'next';
import { Mail, Handshake, HeadphonesIcon, Newspaper } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Get in touch with AI Career Success Hub. General inquiries, partnerships, support, or join our newsletter.',
  openGraph: {
    title: 'Contact Us | AI Career Success Hub',
    description: 'Get in touch with our team for support, partnerships, or general inquiries.',
  },
};

const contactMethods = [
  {
    icon: Mail,
    title: 'General Inquiries',
    email: 'contact@ai-career-hub.com',
    description: 'Questions, feedback, or general inquiries about our platform',
    color: 'bg-blue-500/10 text-blue-600 dark:text-blue-400',
  },
  {
    icon: Handshake,
    title: 'Partnerships & Business',
    email: 'partnerships@ai-career-hub.com',
    description: 'Affiliate partnerships, sponsorships, and business collaborations',
    color: 'bg-purple-500/10 text-purple-600 dark:text-purple-400',
  },
  {
    icon: HeadphonesIcon,
    title: 'Technical Support',
    email: 'support@ai-career-hub.com',
    description: 'Tool issues, bugs, or technical assistance',
    color: 'bg-green-500/10 text-green-600 dark:text-green-400',
  },
  {
    icon: Newspaper,
    title: 'Newsletter Updates',
    email: 'hello@ai-career-hub.com',
    description: 'Weekly career tips, new blog posts, and platform updates',
    color: 'bg-orange-500/10 text-orange-600 dark:text-orange-400',
  },
];

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-16 max-w-5xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Get in Touch
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            We&apos;re here to help! Choose the best way to reach our team based on your needs.
          </p>
        </div>

        {/* Contact Methods Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-16">
          {contactMethods.map((method) => {
            const Icon = method.icon;
            return (
              <div
                key={method.email}
                className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow border border-gray-100 dark:border-gray-700"
              >
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-lg ${method.color}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                      {method.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                      {method.description}
                    </p>
                    <a
                      href={`mailto:${method.email}`}
                      className="text-blue-600 dark:text-blue-400 hover:underline font-medium text-sm"
                    >
                      {method.email}
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Newsletter Signup Section */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 md:p-12 text-white text-center">
          <Newspaper className="w-12 h-12 mx-auto mb-4 opacity-90" />
          <h2 className="text-3xl font-bold mb-3">
            Join Our Weekly Newsletter
          </h2>
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
            Get career tips, side hustle ideas, new scholarships, and blog posts delivered to your inbox every week. 100% free, unsubscribe anytime.
          </p>
          
          {/* Google Forms Embed Placeholder */}
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 max-w-md mx-auto">
            <p className="text-sm text-blue-100 mb-4">
              📧 Sign up for weekly updates:
            </p>
            {/* 
              TODO: Replace this with your Google Form embed or link
              
              Option 1 (Embed): 
              <iframe 
                src="YOUR_GOOGLE_FORM_EMBED_URL" 
                width="100%" 
                height="400" 
                frameBorder="0"
              >
                Loading…
              </iframe>
              
              Option 2 (Link):
              <a 
                href="YOUR_GOOGLE_FORM_URL" 
                target="_blank"
                className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
              >
                Subscribe Now
              </a>
            */}
            <a
              href="https://forms.gle/Z768b7nZM4Li9usa7"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors shadow-lg"
            >
              Subscribe to Newsletter
            </a>
            <p className="text-xs text-blue-200 mt-3">
              No spam. Unsubscribe anytime.
            </p>
          </div>
        </div>

        {/* Response Time Note */}
        <div className="mt-12 text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            📬 Average response time: 24-48 hours (business days)
          </p>
          <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">
            For immediate help, check our{' '}
            <a href="/tools/resume-reviewer" className="text-blue-600 dark:text-blue-400 hover:underline">
              AI tools
            </a>{' '}
            or{' '}
            <a href="/blog" className="text-blue-600 dark:text-blue-400 hover:underline">
              blog
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
