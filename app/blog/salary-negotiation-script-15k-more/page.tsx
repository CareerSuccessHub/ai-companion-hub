import type { Metadata } from "next";
import Link from "next/link";
import { Calendar, Clock, ArrowLeft, DollarSign, TrendingUp, CheckCircle2, AlertCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "How to Negotiate Salary: The Script That Got Me $15K More | AI Career Hub",
  description: "Learn exactly how to negotiate your salary with a proven script. Real examples, word-for-word templates, and AI-powered negotiation strategies that work in 2025.",
  keywords: [
    "how to negotiate salary",
    "salary negotiation script",
    "negotiate job offer",
    "ask for more money",
    "salary negotiation tips",
    "job offer negotiation",
    "how to ask for a raise",
    "salary counter offer",
  ],
};

export default function SalaryNegotiationPost() {
  return (
    <main className="min-h-screen bg-slate-950 text-gray-100">
      <article className="container mx-auto px-4 py-12 max-w-4xl">
        <Link href="/blog" className="inline-flex items-center text-blue-400 hover:underline mb-8">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Blog
        </Link>

        <header className="mb-12">
          <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
            <span className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              December 9, 2025
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              10 min read
            </span>
            <span>•</span>
            <span className="bg-green-600/20 text-green-400 px-2 py-1 rounded text-xs font-semibold">
              Salary Tips
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-400">
            How to Negotiate Your Salary: The Script That Got Me $15K More
          </h1>

          <p className="text-xl text-gray-300 leading-relaxed">
            Research shows most people leave $10,000-50,000 on the table because they&apos;re afraid to negotiate. 
            Here&apos;s a proven negotiation script and framework that has helped many professionals earn significantly more.
          </p>
        </header>

        <div className="prose prose-invert prose-blue max-w-none">
          
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-green-300 mb-4">The Truth About Salary Negotiation</h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              Here&apos;s what nobody tells you: <strong className="text-green-400">93% of employers expect you to negotiate</strong>. 
              When you don&apos;t, they assume you either don&apos;t know your worth or aren&apos;t confident enough. 
              Neither looks good.
            </p>
            <p className="text-gray-300 leading-relaxed mb-4">
              A common scenario: Someone accepts a $65,000 offer immediately out of excitement. 
              Six months later, they discover a colleague with the same title and experience started at $78,000. 
              The only difference? The colleague negotiated.
            </p>
            <p className="text-gray-300 leading-relaxed">
              That $13,000 difference compounds over time. Over 5 years with standard raises, that&apos;s over <span className="text-red-400 font-bold">$80,000</span> in lost earnings. 
              This is why negotiation matters.
            </p>
          </section>

          <div className="bg-red-900/20 border-l-4 border-red-400 p-6 rounded-lg mb-12">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-6 h-6 text-red-400 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-bold text-red-300 mb-2">The Biggest Mistake You Can Make</h3>
                <p className="text-gray-300">
                  Accepting the first offer without negotiation. Companies <em>always</em> have budget flexibility. 
                  The first offer is rarely their best offer. They&apos;re testing you.
                </p>
              </div>
            </div>
          </div>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-green-300 mb-6">The Psychology Behind Successful Negotiation</h2>
            
            <div className="space-y-6">
              <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
                <h3 className="text-xl font-bold text-blue-300 mb-3 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5" />
                  Rule #1: Negotiate After the Offer, Not Before
                </h3>
                <p className="text-gray-300">
                  Once they&apos;ve made an offer, they&apos;ve already decided they want <em>you</em>. 
                  You have all the leverage. They&apos;ve spent weeks interviewing, they&apos;ve rejected other candidates, 
                  and now they&apos;re emotionally invested in hiring you. Use this.
                </p>
              </div>

              <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
                <h3 className="text-xl font-bold text-blue-300 mb-3 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5" />
                  Rule #2: Never Give a Number First
                </h3>
                <p className="text-gray-300">
                  If they ask your salary expectations during interviews, deflect: <br/>
                  <em className="text-blue-200">&quot;I&apos;d prefer to learn more about the role first. What&apos;s the budget range for this position?&quot;</em><br/>
                  Whoever mentions a number first loses negotiating power.
                </p>
              </div>

              <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
                <h3 className="text-xl font-bold text-blue-300 mb-3 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5" />
                  Rule #3: Anchor High (But Reasonably)
                </h3>
                <p className="text-gray-300">
                  Research market rates on Glassdoor, Levels.fyi, and Payscale. Then ask for 10-20% above their offer. 
                  This gives you room to &quot;compromise&quot; while still getting more than the initial offer.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-12 p-8 bg-gradient-to-r from-green-900/30 to-emerald-900/30 border border-green-700/50 rounded-lg">
            <div className="flex items-center gap-3 mb-6">
              <DollarSign className="w-8 h-8 text-green-400" />
              <h2 className="text-3xl font-bold text-green-300">A Proven Negotiation Script (Real Example)</h2>
            </div>
            
            <p className="text-gray-300 mb-6">
              Here&apos;s an example script that has successfully been used to negotiate higher salaries. 
              For instance, when receiving a $75,000 offer for a Software Engineer role:
            </p>

            <div className="bg-slate-900 border border-green-600 rounded-lg p-6 mb-6">
              <p className="text-gray-100 leading-relaxed italic">
                &quot;Thank you so much for the offer—I&apos;m really excited about this opportunity and the team. 
                I&apos;ve been doing some research on market rates for Software Engineers with my experience level in [city/remote], 
                and based on what I&apos;m seeing on Glassdoor and Levels.fyi, similar roles are typically in the $85,000-95,000 range.
                <br/><br/>
                Given my 3 years of experience with React and my background in [specific relevant skill], 
                I was hoping we could meet at $90,000. I&apos;m confident I can bring immediate value to the team, 
                especially with [mention a specific project or challenge they mentioned in interviews].
                <br/><br/>
                Is there flexibility in the budget to get closer to that number? I&apos;m really excited to join and want to make this work.&quot;
              </p>
            </div>

            <div className="bg-green-900/20 border border-green-700 rounded-lg p-4">
              <p className="text-green-200 font-semibold mb-2">Typical Result:</p>
              <p className="text-gray-300">
                In this example, the company came back with $88,000—not quite $90K, but a &quot;compromise&quot; was reached. 
                That&apos;s <span className="text-green-400 font-bold">$13,000 more</span> than the original offer. 
                Such negotiations typically take 3-5 days and one brief conversation.
              </p>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-green-300 mb-6">Breaking Down Why This Script Works</h2>
            
            <div className="space-y-4">
              <div className="border-l-4 border-blue-400 pl-6 py-2">
                <h3 className="text-lg font-bold text-blue-300 mb-2">1. Start with Enthusiasm</h3>
                <p className="text-gray-300">
                  &quot;I&apos;m really excited...&quot; shows you want the job. You&apos;re not playing hardball—you&apos;re 
                  collaborative. This makes them want to work with you, not against you.
                </p>
              </div>

              <div className="border-l-4 border-blue-400 pl-6 py-2">
                <h3 className="text-lg font-bold text-blue-300 mb-2">2. Use Data, Not Emotions</h3>
                <p className="text-gray-300">
                  &quot;Based on Glassdoor and Levels.fyi...&quot; grounds your ask in market reality. 
                  You&apos;re not asking for more because you need it—you&apos;re asking because that&apos;s what the market pays.
                </p>
              </div>

              <div className="border-l-4 border-blue-400 pl-6 py-2">
                <h3 className="text-lg font-bold text-blue-300 mb-2">3. Give a Range, Then Anchor</h3>
                <p className="text-gray-300">
                  &quot;$85K-95K range... hoping for $90K&quot; shows flexibility while anchoring high. 
                  They&apos;ll likely counter in the middle of your range.
                </p>
              </div>

              <div className="border-l-4 border-blue-400 pl-6 py-2">
                <h3 className="text-lg font-bold text-blue-300 mb-2">4. Reinforce Your Value</h3>
                <p className="text-gray-300">
                  &quot;Given my 3 years of experience with React...&quot; reminds them why they made the offer. 
                  You&apos;re worth it.
                </p>
              </div>

              <div className="border-l-4 border-blue-400 pl-6 py-2">
                <h3 className="text-lg font-bold text-blue-300 mb-2">5. End with Collaboration</h3>
                <p className="text-gray-300">
                  &quot;Is there flexibility... I want to make this work&quot; frames it as a partnership, not a demand. 
                  You&apos;re giving them a way to say yes.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-green-300 mb-6">Common Scenarios & How to Handle Them</h2>
            
            <div className="space-y-6">
              <div className="bg-slate-800 rounded-lg p-6">
                <h3 className="text-xl font-bold text-yellow-300 mb-3">Scenario 1: &quot;This is our final offer&quot;</h3>
                <p className="text-gray-300 mb-3">
                  <strong>What to say:</strong>
                </p>
                <p className="text-blue-200 italic mb-3">
                  &quot;I completely understand budget constraints. Would there be flexibility in the start date, 
                  signing bonus, or equity to bridge the gap? I&apos;m also open to discussing a performance review 
                  at 6 months to revisit compensation.&quot;
                </p>
                <p className="text-gray-400 text-sm">
                  Often &quot;final&quot; just means they can&apos;t move on base salary. Bonuses, stock, PTO, and remote work 
                  are negotiable.
                </p>
              </div>

              <div className="bg-slate-800 rounded-lg p-6">
                <h3 className="text-xl font-bold text-yellow-300 mb-3">Scenario 2: &quot;We need an answer by tomorrow&quot;</h3>
                <p className="text-gray-300 mb-3">
                  <strong>What to say:</strong>
                </p>
                <p className="text-blue-200 italic mb-3">
                  &quot;I appreciate the offer and am very interested. To give you a thoughtful response, 
                  I&apos;d need until [3-5 days from now]. Would that work?&quot;
                </p>
                <p className="text-gray-400 text-sm">
                  Never let them rush you. If they truly want you, they&apos;ll wait. Pressure tactics are red flags.
                </p>
              </div>

              <div className="bg-slate-800 rounded-lg p-6">
                <h3 className="text-xl font-bold text-yellow-300 mb-3">Scenario 3: &quot;You don&apos;t have enough experience&quot;</h3>
                <p className="text-gray-300 mb-3">
                  <strong>What to say:</strong>
                </p>
                <p className="text-blue-200 italic mb-3">
                  &quot;I understand. What if we structure it as $X base now, with a performance-based review at 
                  6 months? If I deliver [specific goal], we revisit to $Y. That way, I earn the increase.&quot;
                </p>
                <p className="text-gray-400 text-sm">
                  This shows confidence and willingness to prove yourself. Many companies will agree to this.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-12 p-6 bg-blue-900/20 border border-blue-700 rounded-lg">
            <h2 className="text-2xl font-bold text-blue-300 mb-4 flex items-center gap-2">
              <TrendingUp className="w-6 h-6" />
              Real Numbers: What You Can Expect
            </h2>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-start gap-2">
                <span className="text-green-400 font-bold">•</span>
                <span><strong>Entry-level roles:</strong> Typically can negotiate 5-10% more ($3K-7K on a $60K offer)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 font-bold">•</span>
                <span><strong>Mid-level roles:</strong> 10-15% more ($8K-15K on an $80K offer)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 font-bold">•</span>
                <span><strong>Senior roles:</strong> 15-20% more ($15K-30K on a $120K offer)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 font-bold">•</span>
                <span><strong>Tech/specialized roles:</strong> 20%+ more possible with competing offers</span>
              </li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-green-300 mb-6">The 5-Step Negotiation Process</h2>
            
            <div className="space-y-4">
              <div className="bg-gradient-to-r from-slate-800 to-slate-700 border border-green-600 rounded-lg p-5">
                <div className="flex items-center gap-3 mb-2">
                  <span className="flex items-center justify-center w-8 h-8 bg-green-600 text-white font-bold rounded-full">1</span>
                  <h3 className="text-lg font-bold text-green-300">Receive the Offer</h3>
                </div>
                <p className="text-gray-300 ml-11">
                  Thank them enthusiastically. Ask for the offer in writing. Tell them you need 2-3 days to review.
                </p>
              </div>

              <div className="bg-gradient-to-r from-slate-800 to-slate-700 border border-green-600 rounded-lg p-5">
                <div className="flex items-center gap-3 mb-2">
                  <span className="flex items-center justify-center w-8 h-8 bg-green-600 text-white font-bold rounded-full">2</span>
                  <h3 className="text-lg font-bold text-green-300">Research Market Rates</h3>
                </div>
                <p className="text-gray-300 ml-11">
                  Check Glassdoor, Levels.fyi, Payscale, and LinkedIn Salary. Find 3-5 comparable roles.
                </p>
              </div>

              <div className="bg-gradient-to-r from-slate-800 to-slate-700 border border-green-600 rounded-lg p-5">
                <div className="flex items-center gap-3 mb-2">
                  <span className="flex items-center justify-center w-8 h-8 bg-green-600 text-white font-bold rounded-full">3</span>
                  <h3 className="text-lg font-bold text-green-300">Prepare Your Script</h3>
                </div>
                <p className="text-gray-300 ml-11">
                  Use our AI tool below to generate a personalized negotiation script based on your situation.
                </p>
              </div>

              <div className="bg-gradient-to-r from-slate-800 to-slate-700 border border-green-600 rounded-lg p-5">
                <div className="flex items-center gap-3 mb-2">
                  <span className="flex items-center justify-center w-8 h-8 bg-green-600 text-white font-bold rounded-full">4</span>
                  <h3 className="text-lg font-bold text-green-300">Deliver the Counteroffer</h3>
                </div>
                <p className="text-gray-300 ml-11">
                  Call or email (phone is better for building rapport). Practice your script 3-5 times first.
                </p>
              </div>

              <div className="bg-gradient-to-r from-slate-800 to-slate-700 border border-green-600 rounded-lg p-5">
                <div className="flex items-center gap-3 mb-2">
                  <span className="flex items-center justify-center w-8 h-8 bg-green-600 text-white font-bold rounded-full">5</span>
                  <h3 className="text-lg font-bold text-green-300">Negotiate & Close</h3>
                </div>
                <p className="text-gray-300 ml-11">
                  They&apos;ll likely counter. Be willing to compromise slightly. Once agreed, get it in writing before resigning.
                </p>
              </div>
            </div>
          </section>

          <div className="my-12 p-8 bg-gradient-to-r from-green-600 to-emerald-600 rounded-lg text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Get Your Personalized Negotiation Script in 30 Seconds
            </h2>
            <p className="text-green-50 mb-6 text-lg">
              Our AI analyzes your situation and generates a custom script with specific dollar amounts to ask for.
            </p>
            <Link
              href="/#salary-negotiator"
              className="inline-block px-8 py-4 bg-white text-green-600 font-bold text-lg rounded-lg hover:bg-gray-100 transition-colors shadow-lg"
            >
              Try the Free AI Salary Negotiator →
            </Link>
          </div>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-green-300 mb-6">FAQs About Salary Negotiation</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold text-blue-300 mb-2">Can they rescind the offer if I negotiate?</h3>
                <p className="text-gray-300">
                  Extremely rare. If they rescind an offer because you negotiated professionally, that&apos;s typically 
                  a red flag about company culture. Industry research shows this almost never happens from reasonable, 
                  data-backed negotiation.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-blue-300 mb-2">What if I&apos;m unemployed and desperate?</h3>
                <p className="text-gray-300">
                  Negotiate anyway. You don&apos;t have to mention your situation. If the offer is $60K and market rate is $70K, 
                  ask for $68K. Even if they only come up to $63K, that&apos;s $3K more than accepting immediately. 
                  Over 5 years, that&apos;s $18K+.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-blue-300 mb-2">Should I negotiate via email or phone?</h3>
                <p className="text-gray-300">
                  Phone is better for building rapport and reading their tone, but email works if you&apos;re more comfortable. 
                  Email also gives you a paper trail. Either way, be professional and collaborative.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-blue-300 mb-2">What if they say the budget is truly maxed out?</h3>
                <p className="text-gray-300">
                  Ask about: signing bonus, stock options, extra PTO days, remote work flexibility, professional development budget, 
                  earlier performance review, or relocation assistance. There are many ways to add value beyond base salary.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-12 p-6 bg-green-900/20 border-l-4 border-green-400 rounded-lg">
            <h2 className="text-2xl font-bold text-green-300 mb-4">Final Thoughts: You Deserve Fair Pay</h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              Negotiating isn&apos;t greedy—it&apos;s professional. Companies negotiate everything: office leases, vendor contracts, 
              software licenses. Why shouldn&apos;t you negotiate your own compensation?
            </p>
            <p className="text-gray-300 leading-relaxed">
              A $15K salary increase compounds to over <span className="text-green-400 font-bold">$90,000</span> in extra earnings 
              over 5 years when you factor in raises and bonuses. One brief conversation can change your financial trajectory.
            </p>
            <p className="text-gray-300 leading-relaxed mt-4 font-semibold">
              Don&apos;t leave money on the table. Use the script. Do the research. Ask for what you&apos;re worth.
            </p>
          </section>

        </div>

        <div className="mt-12 pt-8 border-t border-slate-800">
          <Link href="/blog" className="text-blue-400 hover:underline">← Back to Blog</Link>
        </div>
      </article>
    </main>
  );
}
