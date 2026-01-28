<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>
# DECISIONX
Turn confusion into a clear decision in under 60 seconds.
DECISIONX is a web-based AI decision engine built to help students make high-stakes decisions with clarity, speed, and confidence. Instead of open-ended chat or vague advice, DECISIONX structures choices, evaluates trade-offs, detects bias, and delivers a clear, ranked recommendation.
Built for an open-theme AI hackathon, DECISIONX focuses on usability, impact, and thoughtful execution over complexity.

# 🚀 Problem
Students constantly face difficult decisions:
Which project or career path to choose
What to prioritize under time pressure
How to compare options objectively
Most tools either overwhelm users with information or offer generic advice without structure. This leads to decision fatigue, bias, and hesitation.

# 💡 Solution
DECISIONX provides a fast, structured decision flow:
Define the decision
Add 2–4 options
Set 3–5 evaluation criteria with importance weights
Let the AI analyze, score, and rank the options
Receive a clear recommendation with brief reasoning and a bias insight
No chat. No clutter. Just clarity.

# ✨ Key Features
Structured Decision Input
Simple form to capture options and weighted criteria
AI-Powered Decision Engine
Scores and ranks options based on user priorities
Clear Final Recommendation
One highlighted best option with concise reasoning
Bias Awareness Layer (Innovation)
Detects emotional weighting or imbalance and surfaces one actionable insight
Clean, Focused UX
Designed for fast understanding and demo-friendly interaction.

# 🧠 How It Works
Options are evaluated numerically using user-defined criteria and weights
Gemini AI provides:
Trade-off reasoning
Ranking explanation
Bias detection (e.g. fear-driven or imbalanced decisions)
Results are presented in a clean, ranked layout optimized for quick decisions.

# 🛠️ Tech Stack
Frontend: Next.js (App Router), Tailwind CSS
Backend: Next.js API Routes
AI: Gemini 3 Pro
State: Local / in-memory (no database)
Deployment: Vercel (optional)
📸 Demo Use Case
A student choosing between:
Two career paths
Multiple project ideas
Learning priorities under time pressure
DECISIONX helps them decide in under one minute.

# 📈 Impact & Future Scope
Impact:
Reduces decision fatigue
Encourages objective thinking
Helps students act with confidence
Future Enhancements:
Decision history & comparison
Collaboration (shared decisions)
Domain-specific decision templates
Exportable decision reports

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/10yiSzzD2T8-TjFV1rcZCEnJ1hDVntnQh

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`
