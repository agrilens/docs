# AgriLens Deployment Guide

> **Current as of: November 2024**  
> This guide covers deploying AgriLens using GitHub Codespaces and Firebase.

## 1. Introduction
AgriLens is a React-based web application for plant health identification. This guide covers deployment using Git and Firebase, providing a streamlined development and deployment workflow. This guide is written for system administrators and assumes working knowledge of Git, Firebase, API keys, and environment variables. 

## 2. Prerequisites
- GitHub account
- Firebase account with Blaze Plan
- Web browser
- Local development environment (such as VS Code)

## 3. Initial Setup

### 3.1 Fork the agriLens-backend Repository
1. Visit the [agrilens-backend repository on GitHub](https://github.com/agrilens/agrilens-backend)
2. Click the "Fork" button in the top-right corner
3. Select your GitHub account as the destination
4. Select the ```main``` branch to fork

### 3.2 Fork the agriLens-frontend Repository
1. Visit the [agrilens-frontend repository on GitHub](https://github.com/agrilens/agrilens-frontend)
2. Click the "Fork" button in the top-right corner
3. Select your GitHub account as the destination
4. Select the ```main``` branch to fork

### 3.3 Obtain Hyperbolic & PlantID API Keys
1. Visit [PlantID](https://www.kindwise.com/plant-id) to obtain an API key.
2. Visit [Hyperbolic Labs](https://hyperbolic.xyz/) to obtain an API key.

### 3.4 Firebase Backend Setup
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project named "agrilens-web"
3. Go to Project Settings. Click on the "Service Accounts" tab. Then click "Generate a New Private Key." This will cause a JSON file to be saved to your machine. You will use these values to fill in the backend .env in a later step.

### 3.5 Firebase Frontend Setup
1. Go to Project Settings. Click on the "General" tab. Then under "Your Apps," click the "</>" symbol to register your app.
2. Under "SDK setup and configuration", select "Config" and copy the values. You will use these values to fill in the frontend .env in a later step.

### 3.6 Firebase Services
1. For the following steps 2-5, on the left side of the Firebase homepage, click "Build" to access Authentication, Firestore Database, Functions, and Hosting tabs. 
2. Click "Authentication." Then "Get Started." Then under "Native Providers," click "Email/Password," and finally toggle the enable setting.
3. Click "Firestore Database." Then "Create Databse" with the default settings in production mode. Start a collection called "users". Then add a document called "customers". Then start a collection under "customers" called "customer" with the Auto-ID feature and click "Save". See screenshots below: 
![data-model-1](./artifacts/database-data-model-1.png)
![data-model-2](./artifacts/database-data-model-2.png)

4. Click "Functions". Then "Get Started". You will need to upgrade to the Blaze plan if you have not done so already.
5. Click "Hosting". Then "Get Started," and follow the prompts with the default settings.  

---
## 4. Environment Configuration

### 4.1 Set Up Environment Variables
1. In your IDE, create a new `.env` file in the root of the agrilens-backend repo:
   ```bash
   cp .env.example .env
   ```

2. Add required environment variables:
   ```plaintext
HYPERBOLIC_API_KEY=""
PLANT_ID_API_KEY=""

TYPE_VALUE="service_account"
PROJECT_ID_VALUE="agrilens-web"
PROJECT_BUCKET_NAME=""
PRIVATE_KEY_ID_VALUE=""
PRIVATE_KEY_VALUE=""
CLIENT_EMAIL_VALUE=""
CLIENT_ID_VALUE=""
AUTH_URI_VALUE="https://accounts.google.com/o/oauth2/auth"
TOKEN_URI_VALUE="https://oauth2.googleapis.com/token"
AUTH_PROVIDER_CERT_URL_VALUE="https://www.googleapis.com/oauth2/v1/certs"
CLIENT_CERT_URL_VALUE=""
UNIVERSE_DOMAIN_VALUE="googleapis.com"
   ```

3. Get Firebase config values:
   - Go to Firebase Console
   - Project Settings
   - Scroll to "Your apps"
   - Click web app icon (</>)
   - Register app and copy config values

### 4.2 Configure GitHub Secrets
1. Go to your forked repository settings
2. Navigate to Secrets and Variables > Actions
3. Add the following secrets:
   - `FIREBASE_SERVICE_ACCOUNT`: Your Firebase service account JSON
   - `QWEN_API_KEY`: Your Qwen API key
   - `OPENAI_API_KEY`: Your OpenAI API key

## 5. Deployment

### 5.1 Local Testing in Codespace
```bash
npm install
npm start
```

### 5.2 Build and Deploy
```bash
npm run build
firebase deploy
```

## 6. Post-Deployment

### 6.1 Verify Deployment
1. Check Firebase Console for deployment status
2. Visit your Firebase Hosting URL
3. Test core functionality

### 6.2 Monitoring
- Monitor application performance in Firebase Console
- Check error reports in Firebase Crashlytics
- Review Firebase Analytics for usage patterns

## 7. Troubleshooting

### Common Issues
1. **Build Failures**
   - Check Node.js version compatibility
   - Verify all environment variables are set
   - Review build logs in GitHub Actions

2. **Deployment Failures**
   - Confirm Firebase CLI is authenticated
   - Verify Firebase project permissions
   - Check GitHub Actions secrets are properly set

3. **Runtime Errors**
   - Validate API keys and configurations
   - Check Firebase Console for error logs
   - Verify environment variables are properly loaded

## 8. Support
- Report issues on the GitHub repository
- Join the AgriLens Discord community
- Check Firebase documentation for platform-specific issues

---
**Note:** Keep all API keys and secrets secure. Never commit them directly to the repository.

---
Contributors: Blair & Jihadu
Last updated: 11-25-2024
