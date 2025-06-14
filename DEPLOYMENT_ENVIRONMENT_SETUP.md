# Deployment Environment Setup Guide

## Quick Fix for Current Error

The `supabaseUrl is required` error occurs because environment variables are not set in the deployment environment.

### For Fly.io Deployment:

```bash
# Set required environment variables
fly secrets set VITE_SUPABASE_URL="https://your-project-id.supabase.co"
fly secrets set VITE_SUPABASE_ANON_KEY="your_supabase_anon_key_here"

# Optional: Set additional variables
fly secrets set VITE_PAYSTACK_PUBLIC_KEY="your_paystack_key"
fly secrets set VITE_APP_URL="https://your-app-domain.fly.dev"

# Deploy with updated environment
fly deploy
```

### For Other Hosting Platforms:

#### Vercel:

```bash
vercel env add VITE_SUPABASE_URL
vercel env add VITE_SUPABASE_ANON_KEY
```

#### Netlify:

Set in Netlify Dashboard: Site Settings → Environment Variables

#### Railway:

Set in Railway Dashboard: Variables tab

## Required Environment Variables

| Variable                   | Required    | Description                      |
| -------------------------- | ----------- | -------------------------------- |
| `VITE_SUPABASE_URL`        | ✅ Yes      | Your Supabase project URL        |
| `VITE_SUPABASE_ANON_KEY`   | ✅ Yes      | Your Supabase anonymous key      |
| `VITE_PAYSTACK_PUBLIC_KEY` | ❌ Optional | Paystack public key for payments |
| `VITE_APP_URL`             | ❌ Optional | Your app's public URL            |
| `VITE_SHIPLOGIC_API_KEY`   | ❌ Optional | ShipLogic API key for shipping   |

## Local Development Setup

1. Copy the example environment file:

   ```bash
   cp .env.example .env
   ```

2. Edit `.env` with your actual values:

   ```env
   VITE_SUPABASE_URL=https://your-project-id.supabase.co
   VITE_SUPABASE_ANON_KEY=your_actual_anon_key
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

## Finding Your Supabase Credentials

1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Select your project
3. Go to Settings → API
4. Copy:
   - **Project URL** → `VITE_SUPABASE_URL`
   - **Project API keys → anon public** → `VITE_SUPABASE_ANON_KEY`

## Security Notes

- ✅ Environment variables starting with `VITE_` are safe for frontend use
- ✅ The anon key is designed to be public (with Row Level Security)
- ❌ Never expose service role keys in frontend environment variables
- ❌ Never commit `.env` files to version control

## Troubleshooting

### Error: "supabaseUrl is required"

- **Cause**: `VITE_SUPABASE_URL` is not set or empty
- **Fix**: Set the environment variable with your Supabase project URL

### Error: "VITE_SUPABASE_ANON_KEY is required"

- **Cause**: `VITE_SUPABASE_ANON_KEY` is not set or empty
- **Fix**: Set the environment variable with your Supabase anon key

### Error: "Invalid VITE_SUPABASE_URL"

- **Cause**: The URL format is incorrect
- **Fix**: Ensure the URL follows the format: `https://your-project-id.supabase.co`

### Environment variables not loading

- **Local Development**: Ensure `.env` file is in the project root
- **Production**: Ensure variables are set in your hosting platform
- **Vite Requirement**: Variables must start with `VITE_` to be accessible in frontend

## Deployment Checklist

- [ ] Environment variables set in hosting platform
- [ ] Supabase URL and anon key are correct
- [ ] App URL matches your domain (if using CORS)
- [ ] Build and deploy successful
- [ ] Test login/signup functionality
- [ ] Test database connectivity

## Contact

If you continue to experience issues, check:

1. Supabase project is active and accessible
2. Environment variables are correctly spelled
3. Hosting platform environment variable syntax
4. Browser console for additional error details
