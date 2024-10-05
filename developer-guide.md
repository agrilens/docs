# AgriLens Developer Guide

## 1. Introduction
This guide provides basic instructions for setting up your development environment and contributing to the AgriLens project.

## 2. Getting Started

### 2.1 Prerequisites
- Node.js (version 14.x or higher)
- npm (usually comes with Node.js)
- Git

### 2.2 Setting Up the Development Environment
1. Fork the AgriLens repository on GitHub.
2. Clone your fork:
   ```bash
   git clone https://github.com/agrilens/agrilens.git
   cd agrilens
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Set up environment variables:
   - Copy the `.env.example` file to `.env`
   - Fill in the necessary API keys (refer to the [Deployment Guide](/deployment-guide.md) for instructions on obtaining these)

## 3. Development Workflow

### 3.1 Running the Application Locally
Start the development server:
```bash
npm start
```
The application will be available at `http://localhost:3000`.

## 4. Getting Help
- If you have questions or need help, please open an issue on the GitHub repository.
- For more detailed documentation, refer to the [AgriLens project's documentation](https://github.com/agrilens/docs/).

---
Last updated: 2024-10-05
