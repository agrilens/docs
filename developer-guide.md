# AgriLens Developer Guide

## 1. Introduction
This guide provides instructions for setting up your development environment and contributing to the AgriLens project. AgriLens is a React application with an Express.js backend, using Firebase Functions for deployment and Firebase for authentication and data storage.

## 2. Setup Requirements

### 2.1 Prerequisites
- Node.js (version 18.x)
- npm (usually comes with Node.js)
- Git
- Firebase CLI
- Firebase Project (for local development)

### 2.2 Initial Setup

Before proceeding with the development environment setup, please refer to the [Deployment Guide](/deployment-guide.md) for:
- Firebase project configuration
- API key setup
- Environment variable configuration
- Deployment procedures

## 3. Project Structure

```
agrilens/
├── agrilens-frontend/           # React frontend
│   ├── src/
│   │   ├── aboutUs/            # About page components
│   │   ├── account/            # User account management
│   │   ├── assets/             # Static assets
│   │   ├── chat/              # Chat feature components
│   │   ├── common/            # Shared components
│   │   ├── config/            # Firebase configuration
│   │   ├── contactUs/         # Contact page components
│   │   ├── contexts/          # React context providers
│   │   ├── dashboard/         # Dashboard components
│   │   ├── footer/            # Footer component
│   │   ├── homePage/          # Home page components
│   │   ├── insights/          # Data insights components
│   │   ├── navBar/            # Navigation components
│   │   ├── pages/             # Page layouts
│   │   ├── App.css            # Global styles
│   │   ├── App.js             # Main application component
│   │   ├── App.test.js        # Main component tests
│   │   ├── index.css          # Root styles
│   │   ├── index.js           # Application entry point
│   │   ├── logo.svg           # Application logo
│   │   ├── reportWebVitals.js # Performance reporting
│   │   └── setupTests.js      # Test configuration
│   
├── agrilens-backend/           # Express.js + Firebase Functions backend
│   ├── functions/
│   │   ├── config/            # Backend configuration
│   │   ├── methods/           # Business logic and helpers
│   │   ├── middleware/        # Express middleware
│   │   ├── routes/           # API routes
│   │   ├── .eslintrc.js      # ESLint configuration
│   │   ├── .gitignore        # Git ignore rules
│   │   ├── firebase-debug.log # Firebase debug logs
│   │   ├── firestore-debug.log # Firestore debug logs
│   │   ├── index.js          # Server entry point
│   │   ├── package.json      # Backend dependencies
│   │   └── ui-debug.log      # UI debug logs
```

## 4. Development Environment Setup

### 4.1 Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd agrilens-frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Copy the example environment file:
   ```bash
   cp .env.example .env
   ```
4. Configure Firebase credentials in `src/config`

### 4.2 Backend Setup
1. Navigate to the backend functions directory:
   ```bash
   cd agrilens-backend/functions
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure Firebase Functions:
   ```bash
   firebase login
   firebase init functions
   ```

## 5. Development Workflow

### 5.1 Running the Application Locally
1. Start the backend functions emulator:
   ```bash
   cd agrilens-backend/functions
   npm run serve
   ```
2. In a separate terminal, start the frontend development server:
   ```bash
   cd agrilens-frontend
   npm start
   ```
The application will be available at `http://localhost:3000`, with Firebase Functions emulator running on `http://localhost:5001`.

### 5.2 Component Development
The frontend is organized into feature-based directories. Each major feature (dashboard, account management, etc.) has its own directory containing:
- Components
- Styles
- Tests
- Feature-specific configuration

### 5.3 Backend Development
The backend uses Firebase Functions with Express.js. Key areas:
- `config/`: Firebase and API configuration
- `middleware/`: Custom Express middleware
- `routes/`: API endpoint definitions
- `views/`: Server-side templates (if any)

## 6. Testing
```bash
# Frontend tests
cd agrilens-frontend
npm test

# Backend tests
cd agrilens-backend/functions
npm test
```

## 7. Getting Help
- Check component documentation in respective directories
- Review Firebase Functions documentation
- Open an issue on GitHub for technical problems
- Join our Discord community for developer discussions

## 8. Contribution Guidelines
- Follow the existing code style
- Write tests for new features
- Update documentation as needed
- Submit pull requests against the `develop` branch

---
Contributor: Blair (Claude conversation & artifact links: https://claude.site/artifacts/4267a548-894d-4e9d-ac7b-802f2a6d5523, https://claude.site/artifacts/a0f74017-791c-4903-92dc-e2e467bd7f24, https://claude.site/artifacts/e60c4340-c6e1-4ed2-b95d-b386af2c5cfc) 
Last updated: 2024-11-29
