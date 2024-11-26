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
- Node.js 18

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
2. Create a new project named "agrilens-web". If that name is unavailable, you will need to update "agrilens-web" with the new name in ```.firebasrc``` in both the agrilens-frontend and agrilens-backend repo.
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

## 4. Backend Environment Configuration

### 4.1 Set Up Environment Variables
1. In your IDE, create a new `.env` file in the root of the agrilens-backend repo:
```bash
   cd functions
   cp .env.example .env
```

2. Add required environment variables from the JSON file that was downloaded when you created a new private key:
```plaintext
   HYPERBOLIC_API_KEY="yourhyperbolicapikey"
   PLANT_ID_API_KEY="yourplantidapikey"
   
   TYPE_VALUE="service_account"
   PROJECT_ID_VALUE="agrilens-web"
   PROJECT_BUCKET_NAME="agrilens-web.firebasestorage.app"
   PRIVATE_KEY_ID_VALUE="this is private_key_id value in the json file"
   PRIVATE_KEY_VALUE="this begins with -----BEGIN PRIVATE KEY----- and ends with -----END PRIVATE KEY-----\n"
   CLIENT_EMAIL_VALUE="this is the client_email value in the json file"
   CLIENT_ID_VALUE="this is the client_id value in the json file"
   AUTH_URI_VALUE="https://accounts.google.com/o/oauth2/auth"
   TOKEN_URI_VALUE="https://oauth2.googleapis.com/token"
   AUTH_PROVIDER_CERT_URL_VALUE="https://www.googleapis.com/oauth2/v1/certs"
   CLIENT_CERT_URL_VALUE="this is the client_x509_cert_url value in the json file"
   UNIVERSE_DOMAIN_VALUE="googleapis.com"
```

3. Get Firebase config values from step 2:
   - Go to Firebase Console
   - Project Settings
   - Scroll to "Your apps"
   - Click web app icon (</>)
   - Register app and copy config values

4. 

## 5. Deployment

### 5.1 Setup Backend & Login to Firebase
1. Run the following commands:
```bash
   npm install firebase
   npm install -g firebase-tools
   firebase login
```
2. Follow the prompts to login to Firebase CLI
   
### 5.2 Build Backend
```bash
cd functions
npm run build
firebase deploy --only functions
```
---
### 5.3 Deploy backend
1. Run 
From the deployment terminal output, copy the URL (yours will be different than the one in this guide) to the frontend .env "Function URL (app(us-central1)): https://app-nrbifvkcga-uc.a.run.app" like this:
REACT_APP_BACKEND_API_URL=https://app-nrbifvkcga-uc.a.run.app

## 6. Frontend Environment Configuration

### 6.1 Deploy frontend
---

## 7. Post-Deployment

### 7.1 Verify Deployment
1. Check Firebase Console for deployment status
2. Visit your Firebase Hosting URL
3. Test core functionality

### 7.2 Monitoring
- Monitor application performance in Firebase Console
- Check error reports in Firebase Crashlytics
- Review Firebase Analytics for usage patterns

## 8. Troubleshooting

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

## 9. Support
- Report issues on the GitHub repository
- Join the AgriLens Discord community
- Check Firebase documentation for platform-specific issues

---
**Note:** Keep all API keys and secrets secure. Never commit them directly to the repository.

---
Contributors: Blair & Jihadu
Last updated: 11-25-2024
