# Fly.io Deployment Debugging Guide

## Current Error

```
Error: VITE_SUPABASE_URL is required. Please set this environment variable.
```

## Step-by-Step Fix

### 1. Check Current Fly.io App Status

```bash
# Make sure you're logged in
fly auth whoami

# List your apps
fly apps list

# Set the correct app context (replace with your app name)
fly app set your-app-name

# Check current app status
fly status
```

### 2. Set Environment Variables

```bash
# Set the required Supabase environment variables
fly secrets set VITE_SUPABASE_URL="https://kbpjqzaqbqukutflwixf.supabase.co"
fly secrets set VITE_SUPABASE_ANON_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImticGpxemFxYnF1a3V0Zmx3aXhmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc1NjMzNzcsImV4cCI6MjA2MzEzOTM3N30.3EdAkGlyFv1JRaRw9OFMyA5AkkKoXp0hdX1bFWpLVMc"

# Verify secrets are set (values will be hidden)
fly secrets list
```

### 3. Deploy with New Environment Variables

```bash
# Deploy the application
fly deploy

# Monitor deployment logs
fly logs

# Check app health
fly status
```

### 4. Alternative: Update fly.toml

If secrets don't work, you can add non-sensitive variables to `fly.toml`:

```toml
[env]
  VITE_APP_URL = "https://your-app-name.fly.dev"
```

**Important**: Don't put Supabase credentials in `fly.toml` - use secrets for those.

## Troubleshooting

### Issue 1: Environment Variables Not Available at Build Time

Fly.io sometimes has issues with environment variables during build vs runtime. If this is the case:

1. **Check Build Logs**:

   ```bash
   fly logs --app your-app-name
   ```

2. **Try Setting Build Args**:
   ```dockerfile
   # In your Dockerfile
   ARG VITE_SUPABASE_URL
   ARG VITE_SUPABASE_ANON_KEY
   ENV VITE_SUPABASE_URL=$VITE_SUPABASE_URL
   ENV VITE_SUPABASE_ANON_KEY=$VITE_SUPABASE_ANON_KEY
   ```

### Issue 2: Secrets Not Being Applied

1. **List Current Secrets**:

   ```bash
   fly secrets list
   ```

2. **Remove and Re-add Secrets**:
   ```bash
   fly secrets unset VITE_SUPABASE_URL VITE_SUPABASE_ANON_KEY
   fly secrets set VITE_SUPABASE_URL="https://kbpjqzaqbqukutflwixf.supabase.co" VITE_SUPABASE_ANON_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImticGpxemFxYnF1a3V0Zmx3aXhmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc1NjMzNzcsImV4cCI6MjA2MzEzOTM3N30.3EdAkGlyFv1JRaRw9OFMyA5AkkKoXp0hdX1bFWpLVMc"
   ```

### Issue 3: App Context Wrong

1. **Check Which App You're Connected To**:

   ```bash
   fly status
   ```

2. **Switch to Correct App**:
   ```bash
   fly app set correct-app-name
   ```

## Expected Success Output

After running the fix commands, you should see:

1. **Secrets List**: Shows your environment variables (values hidden)
2. **Deploy Success**: No build errors
3. **App Status**: Healthy and running
4. **Logs**: "✅ Environment variables validated successfully"

## Immediate Workaround

I've updated the code to provide fallback values for development, so the app should now:

- ✅ **Start successfully** with default values
- ⚠️ **Show warning** about using default credentials
- 🔧 **Allow you to test** while setting up proper environment variables

## Contact Points

If you continue having issues:

1. Check `fly logs` for detailed error messages
2. Verify your Fly.io account has proper permissions
3. Ensure you're deploying to the correct app
4. Try the troubleshooting steps above in order
