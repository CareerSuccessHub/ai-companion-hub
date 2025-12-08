import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy Policy for AI Student Success Hub",
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-gray-100">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <h1 className="text-4xl font-bold mb-8 text-blue-400">Privacy Policy</h1>
        
        <div className="space-y-6 text-gray-300">
          <p className="text-sm text-gray-500">Last Updated: December 9, 2025</p>

          <section>
            <h2 className="text-2xl font-semibold text-blue-300 mb-3">1. Information We Collect</h2>
            <p className="mb-2">We collect information to provide better services to our users:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Usage Data:</strong> We collect data about your interactions with our AI mentor, including chat messages and feature usage.</li>
              <li><strong>Analytics Data:</strong> We use Google Analytics to understand how visitors use our site.</li>
              <li><strong>Cookies:</strong> We use cookies to improve your experience and analyze site traffic.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-blue-300 mb-3">2. How We Use Your Information</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>To provide and improve our AI mentorship services</li>
              <li>To personalize your experience and recommendations</li>
              <li>To analyze usage patterns and optimize our platform</li>
              <li>To communicate important updates about our services</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-blue-300 mb-3">3. Third-Party Services</h2>
            <p className="mb-2">We use the following third-party services:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Google Gemini AI:</strong> Powers our AI mentor conversations. Your chat data is processed by Google's AI services.</li>
              <li><strong>Google Analytics:</strong> Tracks anonymous usage statistics.</li>
              <li><strong>Google AdSense:</strong> Displays relevant advertisements.</li>
              <li><strong>Affiliate Partners:</strong> Fiverr, Skillshare, Upwork, and other platforms we recommend.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-blue-300 mb-3">4. Affiliate Disclosure</h2>
            <p>
              AI Student Success Hub participates in affiliate programs. When you click on affiliate links 
              and make purchases, we may earn a commission at no additional cost to you. This helps us 
              maintain our free services for students.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-blue-300 mb-3">5. Data Security</h2>
            <p>
              We implement security measures to protect your information. However, no method of transmission 
              over the internet is 100% secure. We cannot guarantee absolute security.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-blue-300 mb-3">6. Your Rights</h2>
            <p className="mb-2">You have the right to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Access your personal data</li>
              <li>Request deletion of your data</li>
              <li>Opt-out of analytics tracking</li>
              <li>Disable cookies in your browser</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-blue-300 mb-3">7. Children&apos;s Privacy</h2>
            <p>
              Our service is intended for students 13 years and older. We do not knowingly collect 
              information from children under 13.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-blue-300 mb-3">8. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. We will notify users of any material 
              changes by updating the &quot;Last Updated&quot; date.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-blue-300 mb-3">9. Contact Us</h2>
            <p>
              If you have questions about this Privacy Policy, please contact us through our{" "}
              <a href="https://ko-fi.com/studentsuccesshub" className="text-blue-400 hover:underline">Ko-fi page</a>.
            </p>
          </section>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-800">
          <a href="/" className="text-blue-400 hover:underline">← Back to Home</a>
        </div>
      </div>
    </main>
  );
}
