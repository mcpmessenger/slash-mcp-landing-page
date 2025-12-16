# Netlify Deployment Guide

Netlify is an excellent choice for Next.js deployments with great support and no package manager detection issues.

## Quick Setup

1. **Go to Netlify**
   - https://app.netlify.com
   - Sign up/login with GitHub (or create account)

2. **Add New Site**
   - Click "Add new site" → "Import an existing project"
   - Select "GitHub" and authorize Netlify
   - Choose repository: `mcpmessenger/glazyr-crm-lite`
   - Branch: `main`

3. **Build Settings** (Netlify will auto-detect from `netlify.toml`)
   - Build command: `npm run build` (already in netlify.toml)
   - Publish directory: `.next` (already in netlify.toml)
   - Node version: 20 (already configured)
   - **IMPORTANT**: Netlify will use npm automatically (no pnpm issues!)

4. **Environment Variables** (CRITICAL - Do this before first deploy)
   - Before clicking "Deploy site", click "Show advanced"
   - Click "New variable" and add:
     - Key: `NEXT_PUBLIC_SUPABASE_URL`
     - Value: (your Supabase project URL)
   - Click "New variable" again and add:
     - Key: `NEXT_PUBLIC_SUPABASE_ANON_KEY`
     - Value: (your Supabase anon key)
   - **Note**: You can also add these later in Site settings → Environment variables

5. **Deploy**
   - Click "Deploy site"
   - Wait for build to complete (usually 2-3 minutes)
   - Your site will be live at: `https://[random-name].netlify.app`

## After Deployment

- **Custom Domain**: Go to Site settings → Domain management → Add custom domain
- **Auto-deploy**: Every push to `main` branch will automatically deploy
- **Build logs**: Click on any deployment to see detailed logs

## Advantages over Amplify
- ✅ No package manager detection issues
- ✅ Better Next.js support with official plugin
- ✅ Faster builds
- ✅ Better error messages
- ✅ Free tier with generous limits
- ✅ Easy GitHub integration

## Troubleshooting

If build fails:
1. Check build logs in Netlify dashboard
2. Verify environment variables are set correctly
3. Make sure `package-lock.json` is committed (it is)
4. Check that Node version is 20 (configured in netlify.toml)

