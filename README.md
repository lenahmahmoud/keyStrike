Keystrike

A minimalist typing speed test web app built with React, Redux Toolkit, and a fake REST backend (json-server). Practice your typing speed and accuracy across three modes, and track your progress over time with a personal account.

Features
Three typing modes
Time — type for a fixed duration (15s / 30s / 60s / 120s) against a stream of random common words
Words — type a fixed number of words (10 / 25 / 50 / 100)
Quote — type a real quote, chosen by length (Short / Medium / Long)
Live stats while typing — real-time WPM and accuracy as you type, with per-character correct/incorrect highlighting
Results screen — final WPM, accuracy, character count, error count, and a WPM-over-time chart for each completed test
Fake authentication — sign up / log in via json-server, used only to unlock personal history (not intended as secure/production auth)
Personal dashboard — best WPM, average WPM, tests taken, a progress chart, and a table of recent attempts (visible only when logged in)
Dark / light theme
Fully responsive layout
Tech stack
Layer	Tool
UI	React
Routing	React Router
Global state	Redux Toolkit
Local/session-specific state	useReducer (typing engine)
Fake backend	json-server
Charts	Recharts (or Chart.js)
Styling	CSS / Tailwind (adjust to your setup)
How WPM is calculated
WPM = (Correct Characters Typed / 5) / Time Elapsed (minutes)
Accuracy = (Correct Characters / Total Characters Typed) × 100
Time mode: time is fixed, characters typed is variable — WPM is calculated the moment the timer hits zero.
Words mode: word count is fixed, time is variable — the timer starts on the first keystroke and stops on the last character of the final word.
Quote mode: the quote's length is fixed, time is variable — same timing approach as Words mode, applied to a specific pre-written quote instead of randomly generated words.
Project structure
src/
├── app/
│   ├── App.jsx
│   └── store.js
├── pages/
│   └── Home.jsx, HowItWorks.jsx
├── features/
│   ├── auth/          # authSlice, Login, Signup
│   ├── typingTest/     # Test screen, mode/sub-option selectors, typing box, useTypingEngine hook
│   ├── results/        # Result screen, stat cards, WPM chart
│   ├── history/        # historySlice, Dashboard, history table, progress chart
│   └── settings/        # settingsSlice, settings modal
├── components/
│   ├── layout/          # Navbar, Footer
│   └── ui/              # Button, Modal, and other shared UI
├── data/
│   ├── wordBank.js       # common words used for Time/Words modes
│   └── quotes.js         # quotes tagged by length for Quote mode
├── services/
│   └── api.js            # calls to the json-server fake backend
└── utils/
    ├── calculateWpm.js
    └── generateText.js
State management approach
useReducer handles the live typing session (idle → running → finished), since this state changes on every keystroke and is local to the typing screen only.
Redux Toolkit handles state shared across the app: authentication status, saved test history (fetched from json-server), and user settings/theme.
Only the final result of a completed test is passed from the local reducer into Redux, to be saved to history if the user is logged in.
Running locally
bash
# install dependencies
npm install

# start the fake backend
npx json-server --watch db.json --port 3001

# start the app
npm run dev
Notes
Authentication is intentionally fake (json-server, no password hashing or real sessions) — this project is for practicing React state management patterns, not for production security.
Word bank and quotes are static local data; no external API or AI is used to generate typing content.
Content