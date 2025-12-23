Clueso.io Clone – Product Walkthrough & AI Insights Platform
Overview

This project is a functional clone of Clueso.io, built to replicate its core product workflows, data flows, and user experience.

The focus of this assignment is product understanding + engineering execution, not pixel-perfect UI.
The application allows users to create product walkthrough notes, collect feedback, and generate AI-powered summaries.

Product Understanding

Clueso helps teams document product knowledge efficiently by combining:

Structured walkthrough notes

Product-specific feedback

AI-powered insights to improve documentation

This clone mirrors that philosophy:

User → Product → Notes → AI Summary → Feedback

AI is used as an assistive tool, not a replacement for user input.

Core Features Implemented
User Onboarding & Authentication

Signup and login flows

In-memory user storage (assignment scoped)

JWT-based authentication

Session persistence using localStorage

Protected dashboard access

Dashboard Experience

Sidebar-based product navigation

Active product highlighting

Walkthrough notes editor per product

Clueso-like interaction patterns

Loading states, disabled actions, and error handling

Feedback Collection Flows

Product-specific feedback

Add and view feedback in real time

In-memory backend storage

Timestamped feedback entries

Graceful empty-state handling

AI-Powered Insights

“Summarize with AI” functionality

Frontend → backend → response flow

AI summaries appended to notes

Loading and error handling

Note:
AI functionality is intentionally mocked for this assignment to ensure deterministic behavior and ease of evaluation.
The architecture is designed so a real LLM (OpenAI, Anthropic, etc.) can be integrated without frontend changes.
Data Management

Backend uses in-memory data structures for:

Users

Products

Feedback

Frontend manages UI state using React hooks

Authentication state is persisted via localStorage

This approach was chosen intentionally to keep the system lightweight and focused on core functionality, while remaining easily extensible.

System Communication

Clean RESTful API design

Centralized Axios configuration

Consistent /api/* namespace

Proper error handling and loading states

Backend APIs are extension-ready, allowing additional clients (e.g., browser extensions) without architectural changes
clueso-clone/
├── backend/
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── products.routes.js
│   │   ├── ai.routes.js
│   │   └── feedback.routes.js
│   ├── server.js
│   └── package.json
├── clueso-frontend/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Login.js
│   │   │   ├── Signup.js
│   │   │   └── Dashboard.js
│   │   ├── api/
│   │   │   └── axios.js
│   │   └── App.js
│   └── package.json
└── README.md
The frontend and backend are kept separate to maintain clear separation of concerns and independent development workflows
Tech Stack
Frontend

React (Create React App)

React Router DOM

Axios

Backend

Node.js

Express

JWT Authentication

In-memory data storage

Setup & Installation
Prerequisites

Node.js (v16+ recommended)

npm

Backend Setup
cd backend
npm install
npm run dev
Backend runs on:http://localhost:5000
Frontend Setup
cd clueso-frontend
npm install
npm start
frontend runs on:http://localhost:3000
How to Use

Sign up with a new user

Log in to access the dashboard

Select a product from the sidebar

Write walkthrough notes

Generate AI summaries

Add and review feedback per product

Design Decisions & Trade-offs

In-memory storage was used intentionally to keep focus on product behavior

Mock AI ensures stability and clarity of evaluation

Avoided overengineering (databases, Redux) to match assignment scope

Architecture is extensible for future enhancements

Browser Extension Note

This submission does not include a browser extension.

However, the backend APIs are designed to support additional clients such as a browser extension without requiring changes to core logic. This decision is documented intentionally as hosting and maintaining extensions was outside the scope of this assignment
##Video Demo:

Demo Link: https://drive.google.com/file/d/1vEyl7083R17do24xj9tVx2-Gaz_nH5UJ/view?usp=sharing

The demo covers:

Authentication flow

Dashboard navigation

Notes creation

AI summarization

Feedback collection

Architecture explanation

