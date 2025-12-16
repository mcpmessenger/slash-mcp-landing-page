# CRITICAL: Fix Amplify Package Manager Detection

## The Problem
Amplify is auto-detecting `pnpm` and trying to run `pnpm install`, but pnpm is not available in the build environment. This happens BEFORE `amplify.yml` is read.

## The Solution (MUST DO IN CONSOLE)

You **MUST** manually configure the package manager in the AWS Amplify Console. This cannot be fixed via code alone.

### Step-by-Step Instructions:

1. **Go to AWS Amplify Console**
   - Navigate to: https://console.aws.amazon.com/amplify
   - Sign in to your AWS account

2. **Select Your App**
   - Click on your app: `glazyr-crm-lite` (or whatever it's named)

3. **Open Build Settings**
   - Click on **"App settings"** in the left sidebar
   - Click on **"Build settings"**
   - Click **"Edit"** button

4. **Find Package Manager Setting**
   - Look for a dropdown or setting labeled:
     - "Package manager"
     - "Package manager override"
     - "Override package manager"
     - Or similar
   - It might be under:
     - "Build image settings"
     - "Build configuration"
     - "Advanced settings"

5. **Change to npm**
   - Change from **"Auto-detect"** or **"pnpm"** to **"npm"**
   - Save the changes

6. **If You Don't See the Option:**
   - **Option A: Clear Build Cache**
     - In Build settings, look for "Clear cache" or "Invalidate cache"
     - Click it and confirm
   
   - **Option B: Reconnect Repository**
     - Go to App settings → General
     - Disconnect the repository
     - Reconnect it and select npm as the package manager during setup

7. **Trigger New Build**
   - After saving, Amplify should automatically trigger a new build
   - If not, go to the "Deployments" tab and click "Redeploy this version"

## Why This Happens

Amplify's package manager detection runs at the **service level** before your `amplify.yml` file is read. The detection looks for:
- `package-lock.json` → npm
- `yarn.lock` → yarn  
- `pnpm-lock.yaml` → pnpm

Even though we removed `pnpm-lock.yaml`, Amplify might be:
- Using cached detection results
- Detecting based on other files
- Using a previous build's configuration

## Verification

After setting npm in the Console, check the build logs. You should see:
- `# Executing command: npm install` (not pnpm)
- Or the commands from your `amplify.yml` preBuild phase

## Alternative: Use Netlify or Railway

If you continue having issues with Amplify, consider:
- **Netlify**: Better Next.js support, easier configuration
- **Railway**: Simple deployment, good for Next.js
- **Vercel**: Best Next.js support (if you can fix the Git connection)

See `NETLIFY_DEPLOYMENT.md` or `RAILWAY_DEPLOYMENT.md` for instructions.

