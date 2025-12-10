'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Trash2, Download, Upload, Shield, Bell, Moon, Volume2, Settings as SettingsIcon } from 'lucide-react';

export default function SettingsPage() {
  const [dataSize, setDataSize] = useState('0 KB');

  useEffect(() => {
    // Calculate local storage size approximation
    let total = 0;
    for (let x in localStorage) {
      if (localStorage.hasOwnProperty(x)) {
        total += ((localStorage[x].length * 2));
      }
    }
    setDataSize((total / 1024).toFixed(2) + ' KB');
  }, []);

  const handleClearData = () => {
    if (confirm('Are you sure? This will delete all your progress, history, and logs. This cannot be undone.')) {
      localStorage.clear();
      alert('All data cleared.');
      window.location.reload();
    }
  };

  const handleExportData = () => {
    const data = {};
    for (let x in localStorage) {
      if (localStorage.hasOwnProperty(x)) {
        data[x] = localStorage[x];
      }
    }
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `mindfulness-backup-${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleImportData = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const data = JSON.parse(event.target.result);
        for (let key in data) {
          localStorage.setItem(key, data[key]);
        }
        alert('Data imported successfully!');
        window.location.reload();
      } catch (err) {
        alert('Failed to parse JSON file.');
      }
    };
    reader.readAsText(file);
  };

  return (
    <main className="min-h-screen bg-stone-50 p-4 md:p-8">
      <div className="max-w-3xl mx-auto">
        <div className="mb-6 flex items-center gap-2 text-sm text-gray-500">
           <Link href="/dashboard" className="hover:text-gray-800 transition">Dashboard</Link>
           <span>/</span>
           <span className="font-semibold text-gray-800">Settings</span>
        </div>

        <h1 className="text-3xl font-bold text-gray-800 mb-8">Settings & Privacy</h1>

        <div className="space-y-6">
          {/* Privacy Section */}
          <section className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <Shield className="text-teal-600" />
              Privacy & Data
            </h2>
            <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 text-blue-900 text-sm mb-6 leading-relaxed">
              <strong>Your Privacy Matters:</strong> All your assessment scores, session logs, and personal reflections are stored 
              <strong> locally on your device</strong> (in your browser). We do not have a central database of your history. 
              <br /><br />
              When you use the AI Coach, your current conversation text is sent to Google's Gemini API for processing, 
              but is not stored by us permanently.
            </div>

            <div className="space-y-4">
               <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                 <div>
                   <span className="font-semibold text-gray-700 block">Export Data</span>
                   <span className="text-xs text-gray-500">Download a backup of your progress (JSON).</span>
                 </div>
                 <button onClick={handleExportData} className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 transition text-sm font-medium">
                   <Download size={16} /> Export
                 </button>
               </div>

               <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                 <div>
                   <span className="font-semibold text-gray-700 block">Import Data</span>
                   <span className="text-xs text-gray-500">Restore from a previous backup.</span>
                 </div>
                 <label className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 transition text-sm font-medium cursor-pointer">
                   <Upload size={16} /> Import
                   <input type="file" accept=".json" onChange={handleImportData} className="hidden" />
                 </label>
               </div>

               <div className="flex items-center justify-between p-4 bg-red-50 rounded-xl border border-red-100">
                 <div>
                   <span className="font-semibold text-red-800 block">Clear All Data</span>
                   <span className="text-xs text-red-600">Current Size: {dataSize}</span>
                 </div>
                 <button onClick={handleClearData} className="flex items-center gap-2 px-4 py-2 bg-white border border-red-200 text-red-600 rounded-lg hover:bg-red-50 transition text-sm font-medium">
                   <Trash2 size={16} /> Reset App
                 </button>
               </div>
            </div>
          </section>

          {/* Preferences Placeholder */}
          <section className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 opacity-75">
             <div className="absolute inset-0 bg-white/50 z-10 hidden"></div> {/* Overlay if disabled */}
             <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
               <SettingsIcon className="text-gray-600" />
               Preferences (Coming Soon)
             </h2>
             
             <div className="space-y-4">
                <div className="flex items-center justify-between">
                   <div className="flex items-center gap-3">
                     <div className="p-2 bg-gray-100 rounded-lg"><Bell size={18} className="text-gray-600"/></div>
                     <span className="font-medium text-gray-700">Daily Reminders</span>
                   </div>
                   <div className="w-10 h-6 bg-gray-200 rounded-full relative cursor-not-allowed">
                     <div className="w-4 h-4 bg-white rounded-full absolute left-1 top-1"></div>
                   </div>
                </div>
                <div className="flex items-center justify-between">
                   <div className="flex items-center gap-3">
                     <div className="p-2 bg-gray-100 rounded-lg"><Moon size={18} className="text-gray-600"/></div>
                     <span className="font-medium text-gray-700">Dark Mode</span>
                   </div>
                    <div className="w-10 h-6 bg-gray-200 rounded-full relative cursor-not-allowed">
                     <div className="w-4 h-4 bg-white rounded-full absolute left-1 top-1"></div>
                   </div>
                </div>
                 <div className="flex items-center justify-between">
                   <div className="flex items-center gap-3">
                     <div className="p-2 bg-gray-100 rounded-lg"><Volume2 size={18} className="text-gray-600"/></div>
                     <span className="font-medium text-gray-700">Voice Output</span>
                   </div>
                    <div className="w-10 h-6 bg-gray-200 rounded-full relative cursor-not-allowed">
                     <div className="w-4 h-4 bg-white rounded-full absolute left-1 top-1"></div>
                   </div>
                </div>
             </div>
          </section>
          
          <div className="text-center text-gray-400 text-sm py-4">
            Mindful App v1.0 • Built with Next.js & Gemini
          </div>
        </div>
      </div>
    </main>
  );
}

