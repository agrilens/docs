# AgriLens Basic Deployment Guide

## 1. Introduction
AgriLens is a React-based web application for plant health identification. This guide covers the basic steps to deploy the application.

## 2. Prerequisites
- A server or hosting platform that supports Node.js applications
- Node.js (version 14.x or higher)
- npm (usually comes with Node.js)
- Git

## 3. Deployment Steps

### 3.1 Clone the Repository
```bash
git clone https://github.com/[your-username]/agrilens.git
cd agrilens
```

### 3.2 Install Dependencies
```bash
npm install
```

### 3.3 Set Up Environment Variables
Create a `.env` file in the project root:
```bash
cp .env.example .env
nano .env
```
Add necessary environment variables:
```
REACT_APP_QWEN_API_KEY=your_api_key_here
REACT_APP_OPENAI_API_KEY==your_api_key_here
```

To obtain the required API keys:

**Qwen-V2 API Key:**

1. Visit the Hyperbolic website ([Hyperbolic website](https://app.hyperbolic.xyz/models/qwen2-vl-72b-instruct]) or similar model hosting service
1. Sign up for an account or log in if you already have one
1. Navigate to the API section in your dashboard
1. Generate a new API key
1. Copy the API key and paste it as the value for REACT_APP_QWEN_API_KEY

**OpenAI API Key:**

1. Go to the OpenAI website (https://openai.com/)
1. Sign up for an account or log in
1. Navigate to the API section in your account settings
1. Generate a new API key
1. Copy the API key and paste it as the value for REACT_APP_OPENAI_API_KEY

**Note:** Keep these API keys confidential and never share them publicly. Make sure the .env file is included in your .gitignore to prevent accidentally committing it to version control.

[Blair: we will add more when we are further along in development.]

---
Last updated: 2024-10-05
