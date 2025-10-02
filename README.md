# Language Learning Application

A full-stack web application for learning English with interactive reading comprehension and vocabulary building features.

## Features

- AI-powered text generation based on proficiency levels
- Interactive word selection and dictionary building
- Clean, minimalist design
- Personal vocabulary management

## Technology Stack

- **Frontend**: React with TypeScript, Tailwind CSS
- **Backend**: Node.js with Express.js and TypeScript
- **Styling**: Tailwind CSS

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm

### Installation

1. Clone the repository
2. Install all dependencies:
   ```bash
   npm run install:all
   ```

### Development

Run both frontend and backend in development mode:
```bash
npm run dev
```

This will start:
- Frontend on http://localhost:5173
- Backend on http://localhost:3001

### Individual Services

Run only frontend:
```bash
npm run dev:frontend
```

Run only backend:
```bash
npm run dev:backend
```

### Production Build

Build the frontend for production:
```bash
npm run build
```

Start the production server:
```bash
npm start
```

## Project Structure

```
language-learning-app/
├── frontend/          # React TypeScript app
├── backend/           # Express.js TypeScript server
├── package.json       # Root package configuration
└── README.md          # This file
```

## Usage

1. Enter your AI API token using the "Add AI Token" button
2. Select your English proficiency level
3. Generate text appropriate for your level
4. Click on unknown words to add them to your dictionary
5. View your saved words in the "My Dictionary" section