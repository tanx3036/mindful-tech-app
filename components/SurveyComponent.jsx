'use client';

import { useState } from 'react';

const QUESTIONS = [
  "Missing planned work due to smartphone use.",
  "Having a hard time concentrating in class, while doing assignments, or while working due to smartphone use.",
  "Feeling pain in the wrists or at the back of the neck while using a smartphone.",
  "Won't be able to stand not having a smartphone.",
  "Feeling impatient and fretful when I am not holding my smartphone.",
  "Having my smartphone in my mind even when I am not using it.",
  "I will never give up using my smartphone even when my daily life is already greatly affected by it.",
  "Constantly checking my smartphone so as not to miss conversations between other people on Twitter or Facebook.",
  "Using my smartphone longer than I had intended.",
  "The people around me tell me that I use my smartphone too much."
];

export default function SurveyComponent() {
  const [step, setStep] = useState('gender'); // 'gender', 'questions', 'result'
  const [gender, setGender] = useState(''); // 'Boy', 'Girl'
  const [responses, setResponses] = useState({});
  const [score, setScore] = useState(0);
  const [risk, setRisk] = useState('');

  const handleGenderSelect = (selectedGender) => {
    setGender(selectedGender);
    setStep('questions');
  };

  const handleResponseChange = (questionIndex, value) => {
    setResponses(prev => ({
      ...prev,
      [questionIndex]: parseInt(value)
    }));
  };

  const calculateResult = () => {
    const totalScore = Object.values(responses).reduce((a, b) => a + b, 0);
    setScore(totalScore);

    let riskLevel = 'Low Risk';
    
    // Kwon et al (2013) cutoffs
    if (gender === 'Male') {
      if (totalScore > 31) riskLevel = 'High Risk';
      else if (totalScore >= 22) riskLevel = 'Medium Risk';
    } else {
      // Female and Others (using Female cutoff as default/safer baseline or strictly Female)
      // Standard research often puts females at higher risk threshold (33) than males (31).
      if (totalScore > 33) riskLevel = 'High Risk';
      else if (totalScore >= 22) riskLevel = 'Medium Risk';
    }

    setRisk(riskLevel);
    
    // Save to localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem('pre_assessment_score', totalScore);
      localStorage.setItem('risk_level', riskLevel);

      const history = JSON.parse(localStorage.getItem('assessment_history') || '[]');
      history.push({
        date: new Date().toISOString(),
        score: totalScore,
        risk: riskLevel,
        gender: gender
      });
      localStorage.setItem('assessment_history', JSON.stringify(history));
    }
    
    setStep('result');
  };

  const isAllAnswered = QUESTIONS.every((_, idx) => responses[idx] !== undefined);

  if (step === 'gender') {
    return (
      <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md mt-10">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">SAS-SV Assessment</h2>
        <p className="mb-4 text-gray-600">Please select your gender to begin:</p>
        <div className="flex gap-4">
          <button 
            onClick={() => handleGenderSelect('Male')}
            className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded transition"
          >
            Male
          </button>
          <button 
            onClick={() => handleGenderSelect('Female')}
            className="flex-1 bg-pink-500 hover:bg-pink-600 text-white py-2 px-4 rounded transition"
          >
            Female
          </button>
          <button 
            onClick={() => handleGenderSelect('Other')}
            className="flex-1 bg-purple-500 hover:bg-purple-600 text-white py-2 px-4 rounded transition"
          >
            Other
          </button>
        </div>
      </div>
    );
  }

  if (step === 'result') {
    const getRiskColor = (r) => {
      if (r === 'High Risk') return 'bg-red-100 text-red-800 border-red-200';
      if (r === 'Medium Risk') return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      return 'bg-green-100 text-green-800 border-green-200';
    };

    return (
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-lg mt-10">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-4 text-gray-800">Assessment Result</h2>
          
          <div className="flex justify-center items-center gap-4 mb-6">
            <div className="text-center">
              <span className="block text-gray-500 text-sm uppercase tracking-wide">Total Score</span>
              <span className="text-5xl font-bold text-indigo-600">{score}</span>
              <span className="text-gray-400 text-sm">/ 60</span>
            </div>
            
            <div className={`px-6 py-4 rounded-xl border ${getRiskColor(risk)}`}>
              <span className="block text-xs font-bold uppercase opacity-70">Risk Level</span>
              <span className="text-2xl font-bold">{risk}</span>
            </div>
          </div>

          <div className="bg-blue-50 p-6 rounded-xl border border-blue-100 text-left space-y-4">
            <h3 className="font-bold text-blue-900 text-lg flex items-center gap-2">
              ℹ️ What does this mean?
            </h3>
            <p className="text-blue-800 leading-relaxed">
              {risk === 'High Risk' 
                ? "Your score suggests a high potential for smartphone addiction. You might be experiencing significant disruption in daily life, work, or sleep due to smartphone use."
                : risk === 'Medium Risk'
                ? "Your score indicates moderate usage. While not critical, you may occasionally find yourself distracted or using your phone as a coping mechanism."
                : "Your score suggests a healthy relationship with your smartphone. You seem to have good control over your usage."}
            </p>
          </div>
        </div>

        <div className="space-y-6 border-t border-gray-100 pt-8">
          <h3 className="text-xl font-bold text-gray-800">Psychoeducation: Know the Signs</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-bold text-gray-700 mb-2">🚩 Common Symptoms</h4>
              <ul className="list-disc pl-5 space-y-1 text-sm text-gray-600">
                <li><strong>Compulsive Checking:</strong> Reaching for the phone without a specific reason.</li>
                <li><strong>Sleep Disruption:</strong> Using screens late at night, affecting sleep quality.</li>
                <li><strong>Phubbing:</strong> Ignoring people around you to look at your phone.</li>
                <li><strong>Withdrawal:</strong> Feeling impatient or fretful when the phone is not nearby.</li>
              </ul>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-bold text-gray-700 mb-2">💡 Important Note</h4>
              <p className="text-sm text-gray-600 leading-relaxed">
                This assessment is a screening tool, <strong>not a medical diagnosis</strong>. 
                High scores indicate a need for better digital habits, but if you feel severe distress, anxiety, or depression, please consult a mental health professional.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-10 text-center">
          <a href="/dashboard" className="inline-block w-full md:w-auto bg-indigo-600 text-white font-bold py-4 px-10 rounded-xl hover:bg-indigo-700 transition shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
            Go to Dashboard & Start Training
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md mt-10">
      <h2 className="text-xl font-bold mb-6 text-gray-800">Smartphone Addiction Scale (SAS-SV)</h2>
      <div className="space-y-6">
        {QUESTIONS.map((q, idx) => (
          <div key={idx} className="border-b border-gray-100 pb-4">
            <p className="mb-2 text-gray-700 font-medium">{idx + 1}. {q}</p>
            <div className="flex justify-between items-center text-sm text-gray-500 px-2">
              <span>Strongly Disagree</span>
              <span>Strongly Agree</span>
            </div>
            <div className="flex justify-between mt-2 gap-1">
              {[1, 2, 3, 4, 5, 6].map((val) => (
                <button
                  key={val}
                  onClick={() => handleResponseChange(idx, val)}
                  className={`w-10 h-10 rounded-full border transition flex items-center justify-center
                    ${responses[idx] === val 
                      ? 'bg-indigo-600 text-white border-indigo-600' 
                      : 'bg-white text-gray-600 border-gray-300 hover:bg-gray-50'}`}
                >
                  {val}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-8">
        <button
          onClick={calculateResult}
          disabled={!isAllAnswered}
          className={`w-full py-3 rounded-lg font-semibold text-white transition
            ${isAllAnswered ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-gray-300 cursor-not-allowed'}`}
        >
          See Results
        </button>
      </div>
    </div>
  );
}

