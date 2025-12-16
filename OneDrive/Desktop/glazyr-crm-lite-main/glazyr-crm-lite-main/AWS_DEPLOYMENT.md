# AWS Amplify Deployment Guide

## Quick Setup

1. **Go to AWS Amplify Console**
   - https://console.aws.amazon.com/amplify
   - Sign in to your AWS account

2. **Connect Repository**
   - Click "New app" → "Host web app"
   - Select "GitHub" and authorize
   - Select repository: `mcpmessenger/glazyr-crm-lite`
   - Branch: `main`

3. **Configure Build Settings**
   - AWS Amplify will auto-detect Next.js
   - Use the `amplify.yml` file included in the repo
   - Build command: `npm run build`
   - Output directory: `.next`
   - **IMPORTANT**: Make sure Node.js version is set to 18.x or higher
   - Go to App settings → Build settings → Edit
   - Set Node version to 18 or 20

4. **Add Environment Variables**
   - Go to App settings → Environment variables
   - Add:
     - `NEXT_PUBLIC_SUPABASE_URL`
     - `NEXT_PUBLIC_SUPABASE_ANON_KEY`

5. **Deploy**
   - Click "Save and deploy"
   - Wait for build to complete

## Advantages over Vercel
- More control over deployment
- Better for AWS ecosystem integration
- Free tier available

## After Deployment
- Your app will be available at: `https://[app-id].amplifyapp.com`
- You can add a custom domain in Amplify settings

