# AgriLens Deployment Guide

> **Current as of: November 2024**  
> This guide covers deploying AgriLens using GitHub Codespaces and Firebase.

## 1. Introduction
AgriLens is a React-based web application for plant health identification. This guide covers deployment using GitHub Codespaces and Firebase, providing a streamlined development and deployment workflow.

## 2. Prerequisites
- GitHub account with Codespaces access
- Firebase account (free tier is sufficient)
- Web browser
- No local development environment required

## 3. Initial Setup

### 3.1 Fork the Repository
1. Visit the AgriLens repository on GitHub
2. Click the "Fork" button in the top-right corner
3. Select your GitHub account as the destination

### 3.2 Configure GitHub Codespaces
1. Navigate to your forked repository
2. Click the green "Code" button
3. Select "Open with Codespaces"
4. Click "New codespace"

### 3.3 Firebase Setup
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project (or select existing)
3. Enable Hosting service:
   ```bash
   # In Codespace terminal
   npm install -g firebase-tools
   firebase login --no-localhost
   firebase init hosting
   ```
4. During Firebase init, select these options:
   - Use existing project (select your Firebase project)
   - Use `build` as your public directory
   - Configure as single-page app: Yes
   - Set up automatic builds/deploys: Yes

## 4. Environment Configuration

### 4.1 Set Up Environment Variables
1. In your Codespace, create a new `.env` file:
   ```bash
   cp .env.example .env
   ```

2. Add required environment variables:
   ```plaintext
   REACT_APP_FIREBASE_API_KEY=your_firebase_key
   REACT_APP_FIREBASE_AUTH_DOMAIN=your_domain
   REACT_APP_FIREBASE_PROJECT_ID=your_project_id
   REACT_APP_QWEN_API_KEY=your_qwen_key
   REACT_APP_OPENAI_API_KEY=your_openai_key
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

### 5.3 Automatic Deployment
The repository includes a GitHub Action that automatically deploys to Firebase when you push to the main branch:

```yaml
name: Deploy to Firebase
on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 16
      - run: npm ci
      - run: npm run build
      - uses: FirebaseExtended/action-hosting-deploy@v0
        with:
          repoToken: '${{ secrets.GITHUB_TOKEN }}'
          firebaseServiceAccount: '${{ secrets.FIREBASE_SERVICE_ACCOUNT }}'
          channelId: live
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
Contributors: Blair using Claude 3.5 (Claude conversation link: https://claude.site/artifacts/5470fd7c-b023-416f-a7a7-18d0be609e40)
Last updated: 11-08-2024
