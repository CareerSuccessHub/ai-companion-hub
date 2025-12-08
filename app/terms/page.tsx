import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms of Service for AI Student Success Hub",
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-gray-100">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <h1 className="text-4xl font-bold mb-8 text-blue-400">Terms of Service</h1>
        
        <div className="space-y-6 text-gray-300">
          <p className="text-sm text-gray-500">Last Updated: December 9, 2025</p>

          <section>
            <h2 className="text-2xl font-semibold text-blue-300 mb-3">1. Acceptance of Terms</h2>
            <p>
              By accessing and using AI Student Success Hub, you accept and agree to be bound by these 
              Terms of Service. If you do not agree, please do not use our service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-blue-300 mb-3">2. Description of Service</h2>
            <p className="mb-2">AI Student Success Hub provides:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>AI-powered career mentorship and guidance</li>
              <li>Side hustle opportunity recommendations</li>
              <li>Educational resources and links</li>
              <li>Affiliate links to third-party platforms</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-blue-300 mb-3">3. Free Service Disclaimer</h2>
            <p>
              Our service is provided free of charge. We reserve the right to modify, suspend, or 
              discontinue any part of the service at any time without notice.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-blue-300 mb-3">4. AI Advice Disclaimer</h2>
            <p>
              <strong>Important:</strong> The AI mentor provides general guidance only. It is not a 
              substitute for professional career counseling, financial advice, or legal counsel. 
              Always verify information and consult qualified professionals for important decisions.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-blue-300 mb-3">5. Affiliate Relationships</h2>
            <p className="mb-2">
              We participate in affiliate programs with Fiverr, Skillshare, Upwork, and other platforms. 
              This means:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>We may earn commissions when you click affiliate links and make purchases</li>
              <li>Commissions do not increase your costs</li>
              <li>We only recommend services we believe provide value</li>
              <li>We are not responsible for the services or products offered by affiliate partners</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-blue-300 mb-3">6. User Responsibilities</h2>
            <p className="mb-2">You agree to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Use the service legally and ethically</li>
              <li>Not abuse or attempt to exploit our AI systems</li>
              <li>Not share harmful, offensive, or inappropriate content</li>
              <li>Verify all information before making important decisions</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-blue-300 mb-3">7. Limitation of Liability</h2>
            <p>
              AI Student Success Hub is provided &quot;as is&quot; without warranties of any kind. We are not 
              liable for any damages resulting from your use of the service, including but not limited 
              to lost income, career decisions, or purchases made through affiliate links.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-blue-300 mb-3">8. Third-Party Services</h2>
            <p>
              Our service uses Google Gemini AI and other third-party services. Your use of these 
              services is subject to their respective terms and conditions.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-blue-300 mb-3">9. Intellectual Property</h2>
            <p>
              All content, design, and code on AI Student Success Hub are owned by us or our licensors. 
              You may not copy, modify, or distribute our content without permission.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-blue-300 mb-3">10. Donations</h2>
            <p>
              Donations through Ko-fi are voluntary and non-refundable. They help support the maintenance 
              and improvement of our free service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-blue-300 mb-3">11. Changes to Terms</h2>
            <p>
              We reserve the right to modify these Terms at any time. Continued use of the service 
              after changes constitutes acceptance of the new Terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-blue-300 mb-3">12. Governing Law</h2>
            <p>
              These Terms are governed by applicable laws. Any disputes will be resolved in accordance 
              with these laws.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-blue-300 mb-3">13. Contact</h2>
            <p>
              For questions about these Terms, contact us through our{" "}
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
