'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { AlertTriangle, Settings, BarChart2, BookOpen, Clock, Info } from 'lucide-react';

export default function Dashboard() {
  const [score, setScore] = useState(null);
  const [risk, setRisk] = useState(null);
  const [history, setHistory] = useState([]);
  const [assessmentHistory, setAssessmentHistory] = useState([]);
  const [screenTimeLog, setScreenTimeLog] = useState([]);
  const [showLogModal, setShowLogModal] = useState(false);
  const [newLogTime, setNewLogTime] = useState(''); // minutes
  const [newLogDate, setNewLogDate] = useState(new Date().toISOString().split('T')[0]);

  useEffect(() => {
    setScore(localStorage.getItem('pre_assessment_score'));
    setRisk(localStorage.getItem('risk_level'));
    
    const loadedHistory = JSON.parse(localStorage.getItem('session_history') || '[]');
    setHistory(loadedHistory.reverse());

    const loadedLogs = JSON.parse(localStorage.getItem('screen_time_logs') || '[]');
    setScreenTimeLog(loadedLogs.reverse());
    
    const loadedAssessments = JSON.parse(localStorage.getItem('assessment_history') || '[]');
    // Format for chart: { date: 'MM/DD', score: 45 }
    const chartData = loadedAssessments.map(a => ({
      date: new Date(a.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      score: a.score
    }));
    setAssessmentHistory(chartData);
  }, []);

  const handleAddLog = (e) => {
    e.preventDefault();
    if (!newLogTime) return;

    const newEntry = {
      date: newLogDate,
      minutes: parseInt(newLogTime),
      timestamp: new Date().toISOString()
    };

    const updatedLogs = [newEntry, ...screenTimeLog];
    setScreenTimeLog(updatedLogs);
    localStorage.setItem('screen_time_logs', JSON.stringify(updatedLogs));
    
    setNewLogTime('');
    setShowLogModal(false);
  };

  const programs = [
    { 
      id: '5-day', 
      title: '5-Day Standard Program', 
      desc: 'The complete mindfulness journey.', 
      duration: '5 Days',
      color: 'bg-teal-50 text-teal-800 border-teal-200',
      btnColor: 'bg-teal-600 hover:bg-teal-700'
    },
    { 
      id: '3-day', 
      title: '3-Day Compact', 
      desc: 'Essentials for busy schedules.', 
      duration: '3 Days',
      color: 'bg-blue-50 text-blue-800 border-blue-200',
      btnColor: 'bg-blue-600 hover:bg-blue-700'
    },
    { 
      id: '1-day', 
      title: '1-Day Intensive', 
      desc: 'Immediate urge surfing training.', 
      duration: '1 Day',
      color: 'bg-indigo-50 text-indigo-800 border-indigo-200',
      btnColor: 'bg-indigo-600 hover:bg-indigo-700'
    },
  ];

  return (
    <main className="min-h-screen bg-stone-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header Section */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Your Dashboard</h1>
            <p className="text-gray-500">Welcome back to your mindful journey.</p>
          </div>
          <div className="flex flex-wrap gap-3">
             <Link
               href="/session/panic?day=1"
               className="bg-red-500 text-white px-5 py-2.5 rounded-xl font-bold shadow-lg shadow-red-200 hover:bg-red-600 hover:scale-105 transition flex items-center gap-2 animate-pulse"
             >
               <AlertTriangle size={18} />
               <span>Panic Button</span>
             </Link>
             <Link 
               href="/settings"
               className="bg-gray-100 text-gray-700 px-4 py-2.5 rounded-xl hover:bg-gray-200 transition flex items-center gap-2"
             >
               <Settings size={18} />
               <span>Settings</span>
             </Link>
          </div>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Assessment Score Card */}
            <div className={`p-6 rounded-2xl border flex flex-col justify-between ${risk === 'High Risk' ? 'bg-red-50 border-red-100' : 'bg-white border-gray-200'}`}>
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-500">Addiction Score</h3>
                  <div className="mt-2 flex items-baseline gap-2">
                    <span className="text-4xl font-bold text-gray-800">{score || '--'}</span>
                    <span className="text-sm text-gray-500">/ 60</span>
                  </div>
                  <span className={`inline-block mt-2 px-2 py-1 rounded text-xs font-bold ${risk === 'High Risk' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                    {risk || 'Not Assessed'}
                  </span>
                </div>
                <div className="p-3 bg-white rounded-xl shadow-sm">
                  <BarChart2 className="text-teal-600" size={24} />
                </div>
              </div>
              
              {assessmentHistory.length > 1 && (
                <div className="h-24 mt-4 -mx-2">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={assessmentHistory}>
                      <Line type="monotone" dataKey="score" stroke="#0d9488" strokeWidth={2} dot={false} />
                      <Tooltip />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              )}
              
              <div className="mt-4 pt-4 border-t border-gray-200/50">
                <Link href="/assessment" className="text-sm font-medium text-teal-700 hover:text-teal-800 flex items-center gap-1">
                  Retake Assessment →
                </Link>
              </div>
            </div>

            {/* Screen Time Card */}
            <div className="bg-white p-6 rounded-2xl border border-gray-200 flex flex-col justify-between">
               <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-500">Screen Time (Avg)</h3>
                   <div className="mt-2">
                    <span className="text-4xl font-bold text-gray-800">
                      {screenTimeLog.length > 0 
                        ? Math.round(screenTimeLog.slice(0,7).reduce((a,b) => a + b.minutes, 0) / Math.min(screenTimeLog.length, 7))
                        : '--'}
                    </span>
                    <span className="text-sm text-gray-500 ml-1">min/day</span>
                  </div>
                </div>
                <div className="p-3 bg-indigo-50 rounded-xl">
                  <Clock className="text-indigo-600" size={24} />
                </div>
              </div>
              <button 
                 onClick={() => setShowLogModal(true)}
                 className="mt-4 w-full py-2 bg-gray-50 hover:bg-gray-100 rounded-lg text-sm font-medium text-gray-600 transition"
               >
                 + Log Today's Time
               </button>
            </div>

            {/* Sessions Completed Card */}
            <div className="bg-white p-6 rounded-2xl border border-gray-200 flex flex-col justify-between">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-500">Sessions Done</h3>
                   <div className="mt-2">
                    <span className="text-4xl font-bold text-gray-800">{history.length}</span>
                  </div>
                </div>
                 <div className="p-3 bg-orange-50 rounded-xl">
                  <BookOpen className="text-orange-600" size={24} />
                </div>
              </div>
              <p className="text-sm text-gray-500 mt-2">
                Keep up the momentum!
              </p>
            </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content (Programs) */}
          <div className="lg:col-span-2 space-y-8">
             <section>
              <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                Program Library
                <Link href="/info" className="text-sm font-normal text-teal-600 hover:text-teal-800 flex items-center gap-1 ml-auto">
                  <Info size={16} />
                  Program Details
                </Link>
              </h2>
              <div className="grid md:grid-cols-1 gap-4">
                {programs.map((prog) => (
                  <div key={prog.id} className={`border rounded-2xl p-6 transition hover:shadow-md flex flex-col md:flex-row gap-6 items-center ${prog.color.replace('bg-', 'bg-opacity-30 ')}`}>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className={`px-2 py-1 rounded text-xs font-bold uppercase tracking-wide bg-white/50 border border-black/5`}>{prog.duration}</span>
                        <h3 className="text-xl font-bold text-gray-900">{prog.title}</h3>
                      </div>
                      <p className="text-gray-600 mb-4">{prog.desc}</p>
                      
                      {/* Simple Progress Check - mock for now */}
                      <div className="flex gap-2">
                        {Array.from({ length: parseInt(prog.duration) }).map((_, i) => (
                          <div key={i} className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium border ${
                            history.some(h => h.program === prog.id && h.day === i + 1)
                              ? 'bg-green-500 text-white border-green-600'
                              : 'bg-white text-gray-400 border-gray-200'
                          }`}>
                            {i + 1}
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <Link 
                        href={`/session/${prog.id}?day=1`}
                        className={`px-8 py-3 rounded-xl font-bold text-white shadow-sm transition transform hover:-translate-y-0.5 ${prog.btnColor}`}
                      >
                        Start
                    </Link>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-800 mb-6">Recent History</h2>
              
              {history.length > 0 ? (
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                  <div className="max-h-[400px] overflow-y-auto">
                    <table className="w-full text-left border-collapse">
                      <thead className="bg-gray-50 text-gray-500 text-xs uppercase sticky top-0 z-10">
                        <tr>
                          <th className="px-6 py-4 font-medium border-b border-gray-200">Date</th>
                          <th className="px-6 py-4 font-medium border-b border-gray-200">Program</th>
                          <th className="px-6 py-4 font-medium border-b border-gray-200">Feedback</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        {history.map((entry, idx) => (
                          <tr key={idx} className="hover:bg-gray-50 transition">
                            <td className="px-6 py-4 text-sm text-gray-600 whitespace-nowrap">
                              {new Date(entry.date).toLocaleDateString()}
                              <span className="block text-xs text-gray-400">{new Date(entry.date).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                            </td>
                            <td className="px-6 py-4">
                              <span className="font-bold text-gray-800 capitalize block">{entry.program.replace('-', ' ')}</span>
                              <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-600 mt-1">
                                Day {entry.day}
                              </span>
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-600">
                              {entry.survey?.keyTakeaway ? (
                                <p className="italic">"{entry.survey.keyTakeaway}"</p>
                              ) : (
                                <span className="text-gray-400">-</span>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ) : (
                <div className="bg-white p-12 rounded-2xl border border-gray-200 text-center text-gray-400 border-dashed">
                  <p>No sessions completed yet.</p>
                </div>
              )}
            </section>
          </div>

          {/* Sidebar (Stats & Logs) */}
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
              <h3 className="font-bold text-gray-800 mb-4">Daily Logs</h3>
              <div className="space-y-3">
                {screenTimeLog.slice(0, 5).map((log, i) => (
                  <div key={i} className="flex justify-between items-center text-sm border-b border-gray-100 pb-3 last:border-0 last:pb-0">
                    <span className="text-gray-600">{new Date(log.date).toLocaleDateString(undefined, {weekday: 'short', month: 'short', day: 'numeric'})}</span>
                    <span className="font-mono font-medium bg-gray-100 px-2 py-1 rounded text-gray-700">{log.minutes}m</span>
                  </div>
                ))}
                {screenTimeLog.length === 0 && (
                   <div className="text-center py-4 text-gray-400 text-sm">No logs yet</div>
                )}
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-2xl p-6 text-white shadow-lg">
                <h3 className="font-bold text-lg mb-2">Did you know?</h3>
                <p className="text-indigo-100 text-sm leading-relaxed mb-4">
                  "Urge Surfing" is based on the idea that cravings are like waves. They rise, peak, and eventually crash. You don't have to drown in them; you can ride them out.
                </p>
                <Link href="/session/1-day?day=1" className="inline-block bg-white/20 hover:bg-white/30 transition px-4 py-2 rounded-lg text-sm font-semibold">
                  Try Urge Surfing
                </Link>
            </div>
          </div>
        </div>

        {/* Modal for Logging Time */}
        {showLogModal && (
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 backdrop-blur-sm p-4">
            <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md animate-in fade-in zoom-in duration-200">
              <h3 className="text-2xl font-bold mb-6 text-gray-800">Log Screen Time</h3>
              <form onSubmit={handleAddLog} className="space-y-5">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Date</label>
                  <input 
                    type="date" 
                    value={newLogDate}
                    onChange={e => setNewLogDate(e.target.value)}
                    className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-teal-500 focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Duration (minutes)</label>
                  <input 
                    type="number" 
                    value={newLogTime}
                    onChange={e => setNewLogTime(e.target.value)}
                    className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-teal-500 focus:outline-none"
                    placeholder="e.g. 120"
                    min="0"
                    required
                  />
                </div>
                <div className="flex justify-end gap-3 mt-8">
                  <button 
                    type="button"
                    onClick={() => setShowLogModal(false)}
                    className="px-6 py-3 text-gray-600 hover:bg-gray-100 rounded-xl font-medium transition"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    className="px-6 py-3 bg-teal-600 text-white rounded-xl hover:bg-teal-700 font-bold shadow-md transition"
                  >
                    Save Log
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
