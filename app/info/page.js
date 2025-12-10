'use client';

import Link from 'next/link';

export default function InfoPage() {
  return (
    <main className="min-h-screen bg-stone-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <Link 
            href="/dashboard" 
            className="text-teal-600 hover:text-teal-700 font-medium flex items-center gap-2"
          >
            ← Back to Dashboard
          </Link>
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden p-8 md:p-12 space-y-12">
          
          <section className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Program Details & Methodology</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our interventions are based on Mindfulness-Based Relapse Prevention (MBRP) protocols, adapted for digital well-being.
            </p>
          </section>

          <hr className="border-gray-100" />

          {/* Programs Section */}
          <section>
            <h2 className="text-2xl font-bold text-teal-800 mb-6 flex items-center gap-2">
              📅 Structured Programs
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-teal-50 p-6 rounded-xl border border-teal-100">
                <h3 className="text-xl font-bold text-teal-900 mb-3">5-Day Program (Standard)</h3>
                <p className="text-teal-700 text-sm mb-4">Gradual habit building for sustainable change.</p>
                <ul className="space-y-3">
                  <li className="flex gap-3">
                    <span className="font-bold text-teal-600 min-w-[3rem]">Day 1:</span>
                    <span><strong>Autopilot & The "Digital Raisin"</strong> — Notice the urge to pick up the phone without acting.</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="font-bold text-teal-600 min-w-[3rem]">Day 2:</span>
                    <span><strong>Barriers & RAIN</strong> — Work with FOMO and anxiety using the RAIN protocol.</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="font-bold text-teal-600 min-w-[3rem]">Day 3:</span>
                    <span><strong>SOBER Breathing Space</strong> — A short "brake" mechanism before doom-scrolling.</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="font-bold text-teal-600 min-w-[3rem]">Day 4:</span>
                    <span><strong>Urge Surfing</strong> — Ride out strong cravings like waves until they subside.</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="font-bold text-teal-600 min-w-[3rem]">Day 5:</span>
                    <span><strong>Leaves on a Stream</strong> — Visualize feeds as "leaves" and choose nourishing vs. draining activities.</span>
                  </li>
                </ul>
              </div>

              <div className="bg-blue-50 p-6 rounded-xl border border-blue-100">
                <h3 className="text-xl font-bold text-blue-900 mb-3">3-Day Program (Condensed)</h3>
                <p className="text-blue-700 text-sm mb-4">Essentials for busy schedules.</p>
                <ul className="space-y-3">
                  <li className="flex gap-3">
                    <span className="font-bold text-blue-600 min-w-[3rem]">Day 1:</span>
                    <span><strong>Awareness + SOBER</strong> — Immediate tools to break the autopilot loop.</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="font-bold text-blue-600 min-w-[3rem]">Day 2:</span>
                    <span><strong>Urge Surfing + RAIN</strong> — Managing acute cravings and emotional triggers.</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="font-bold text-blue-600 min-w-[3rem]">Day 3:</span>
                    <span><strong>Leaves on a Stream</strong> — Long-term maintenance planning.</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          <hr className="border-gray-100" />

          {/* AI Opportunity Section */}
          <section className="bg-gradient-to-br from-indigo-50 to-purple-50 p-8 rounded-2xl border border-indigo-100">
            <h2 className="text-2xl font-bold text-indigo-900 mb-4">
              🤖 The AI Advantage
            </h2>
            <p className="text-gray-700 mb-6 leading-relaxed">
              While self-help books and articles provide information, they often lack personalized guidance during moments of vulnerability. 
              Our AI-powered intervention fills this gap:
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h4 className="font-bold text-indigo-700 mb-2">24/7 Availability</h4>
                <p className="text-sm text-gray-600">Access support during critical moments when urges arise, not just during appointments.</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h4 className="font-bold text-indigo-700 mb-2">Personalization</h4>
                <p className="text-sm text-gray-600">Adapts conversation content and pacing to your specific context and progress.</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h4 className="font-bold text-indigo-700 mb-2">Reduced Stigma</h4>
                <p className="text-sm text-gray-600">Interacting with an AI coach can feel less judgmental than discussing habits with others.</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h4 className="font-bold text-indigo-700 mb-2">Scalability</h4>
                <p className="text-sm text-gray-600">Available to unlimited users simultaneously at minimal marginal cost.</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h4 className="font-bold text-indigo-700 mb-2">Data-Driven</h4>
                <p className="text-sm text-gray-600">Tracks patterns across sessions to identify triggers and visualize progress.</p>
              </div>
            </div>
          </section>

          <section>
             <h2 className="text-xl font-bold text-gray-800 mb-3">Self-Help Resources</h2>
             <p className="text-gray-600">
               Books, articles, and videos about digital minimalism provide valuable information but lack personalized guidance, accountability, 
               and interactive support during moments of vulnerability. This platform aims to bridge that gap.
             </p>
          </section>

        </div>
      </div>
    </main>
  );
}

