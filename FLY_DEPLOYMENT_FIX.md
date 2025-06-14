# Fix Fly.io Deployment - Environment Variables

## Quick Fix Commands

Run these commands in your terminal where you have the Fly.io CLI installed:

```bash
# Navigate to your project directory
cd your-project-directory

# Set the required Supabase environment variables
fly secrets set VITE_SUPABASE_URL="https://kbpjqzaqbqukutflwixf.supabase.co"
fly secrets set VITE_SUPABASE_ANON_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImticGpxemFxYnF1a3V0Zmx3aXhmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc1NjMzNzcsImV4cCI6MjA2MzEzOTM3N30.3EdAkGlyFv1JRaRw9OFMyA5AkkKoXp0hdX1bFWpLVMc"

# Optionally set other environment variables
fly secrets set VITE_APP_URL="https://c43f43e498c34254ab8103c04512c818-dec0e02b99334877878040d0a.fly.dev"

# Deploy with the new environment variables
fly deploy
```

## Verify Environment Variables

To check if the variables are set correctly:

```bash
# List all secrets (values will be hidden for security)
fly secrets list

# Check app status
fly status
```

## Alternative: Using fly.toml

You can also add environment variables to your `fly.toml` file (for non-sensitive variables):

```toml
[env]
  VITE_APP_URL = "https://your-app-url.fly.dev"
```

**Note**: Don't put sensitive keys like Supabase credentials in `fly.toml` as it's committed to version control.

## Expected Result

After running these commands:

1. The environment variables will be available to your app
2. The app will start successfully
3. You should see "✅ Environment variables validated successfully" in the console
4. The Supabase client will initialize properly

## Troubleshooting

If you still get errors:

1. **Check if Fly CLI is logged in**:

   ```bash
   fly auth whoami
   ```

2. **Make sure you're in the right app context**:

   ```bash
   fly apps list
   fly app set your-app-name
   ```

3. **Verify the deployment**:
   ```bash
   fly logs
   ```

## Security Note

The environment variables I provided are the ones that were previously hardcoded in your application, so they are safe to use. However, for enhanced security, you should:

1. Consider rotating the Supabase anon key periodically
2. Set up Row Level Security (RLS) in your Supabase database
3. Monitor access logs in Supabase dashboard
