# Mindful Tech - Smartphone Addiction Intervention System

A comprehensive, science-based web application designed to help users regain control of their attention and reduce compulsive smartphone usage. This project digitizes **Mindfulness-Based Relapse Prevention (MBRP)** protocols into an interactive, AI-guided coaching experience.

## 🌟 Key Features

### 1. 🧠 Assessment & Risk Profiling
*   **SAS-SV (Smartphone Addiction Scale: Short Version)**: 10-item psychometric assessment.
*   **Risk Stratification**: Automatically categorizes users into Low, Medium, or High Risk based on gender-specific cutoffs (Kwon et al., 2013).
*   **Psychoeducation**: Provides immediate feedback on potential symptoms (e.g., compulsive checking, sleep disruption).
*   **History Tracking**: Visualizes assessment scores over time to track improvement.

### 2. 🤖 AI Mindfulness Coach
Powered by **Google Gemini 2.5 Pro**, acting as a compassionate mindfulness instructor.
*   **Context-Aware**: Remembers user inputs during the session to provide relevant guidance.
*   **Safety-First**: Includes protocols for detecting distress and recommending professional help.
*   **Specialized Modes**:
    *   **Urge Surfing**: "Riding the wave" of craving without acting on it.
    *   **The Digital Raisin**: De-automatizing the physical act of holding a phone.
    *   **RAIN Protocol**: Recognize, Allow, Investigate, Nurture (for FOMO/Anxiety).

### 3. 🚨 Panic Mode (SOS)
*   A dedicated **"Panic Button"** for acute craving moments.
*   Launches a 3-minute rapid intervention session.
*   Focuses on immediate grounding and "halting" the automatic unlock response.

### 4. 📅 Structured Programs
*   **1-Day Intensive**: Acute craving management.
*   **3-Day Compact**: Essentials for busy users.
*   **5-Day Standard**: The full MBRP curriculum (Awareness -> Barriers -> Maintenance).
*   **Progress Tracking**: Visual indicators for completed days and sessions.

### 5. 🎧 Immersive Audio Environment
*   Integrated audio player with nature soundscapes (Rain, Forest, Stream, Waves).
*   Users can switch audio backgrounds during sessions.
*   Independent volume control and loop playback.

### 6. 🔒 Privacy-First Design
*   **Local Storage**: All personal logs, history, and assessment scores are stored **locally in the user's browser**.
*   **Data Control**: Dedicated Settings page to export, import, or wipe all local data.
*   **Transparency**: Clear indicators of when data is sent to the AI model (only active chat context).

---

## 🚀 Getting Started

### 1. Prerequisites
*   [Node.js](https://nodejs.org/) (v18.0.0 or higher recommended).
*   A Google Cloud project with **Gemini API** access.

### 2. Installation

```bash
# Clone the repository
git clone <repository-url>
cd mindful-tech

# Install dependencies
npm install
```

### 3. Configuration

1.  **Get a Gemini API Key**:
    *   Visit [Google AI Studio](https://aistudio.google.com/).
    *   Create a new API key.

2.  **Environment Setup**:
    *   Create a `.env.local` file in the project root.
    *   Add your key:
    
    ```env
    GEMINI_API_KEYS="YOUR_API_KEY_HERE"
    ```

3.  **Audio Files**:
    *   Place `.mp3` files in `public/audio/`.
    *   Default map expects: `rain.mp3`, `waves.mp3`, `forest.mp3`, `stream.mp3`.
    *   (The app comes with a default fallback configuration).

### 4. Run Locally

```bash
npm run dev
```
Access the app at `http://localhost:3000`.

---

## 🛠 Tech Stack

*   **Frontend**: Next.js 15 (App Router), React 19
*   **Styling**: Tailwind CSS
*   **Charts**: Recharts
*   **AI Integration**: Google Generative AI SDK (Gemini 2.5 Pro)
*   **Storage**: Browser LocalStorage (No external database required)
*   **Icons**: Lucide React

## 📄 License

This project is intended for educational and research purposes.
