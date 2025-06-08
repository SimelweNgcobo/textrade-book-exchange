# Email Verification Troubleshooting Guide

## Overview

This guide helps troubleshoot email verification issues in the ReBooked Solutions application.

## How Email Verification Works

1. **User Registration**: When a user registers, Supabase sends an email with a verification link
2. **Email Link**: The link contains verification parameters and redirects to `/verify`
3. **Verification Process**: The `/verify` page extracts parameters and calls Supabase auth methods
4. **Success**: User is logged in and redirected to the home page

## Common Issues & Solutions

### Issue 1: "Link just takes me to the website"

**Symptoms**: Clicking the verification link redirects to homepage without verification

**Possible Causes**:

- Missing or invalid URL parameters
- Expired verification token
- Incorrect Supabase configuration
- Browser blocking the verification

**Solutions**:

1. Check the verification URL contains parameters like `token_hash`, `type`, or `code`
2. Ensure the link hasn't expired (24-hour limit)
3. Try opening the link in an incognito/private browser window
4. Use the manual verification tools on the `/verify` page

### Issue 2: "Email not confirmed" error

**Symptoms**: User gets error saying email is not confirmed

**Solutions**:

1. Check spam/junk folder for verification email
2. Resend verification email using the manual tools
3. Ensure email address was typed correctly during registration
4. Wait a few minutes for email delivery

### Issue 3: "Token expired" error

**Symptoms**: Error message about expired verification token

**Solutions**:

1. Register again to get a new verification email
2. Use the resend verification feature
3. Complete verification within 24 hours of registration

### Issue 4: "Already confirmed" message

**Symptoms**: Error saying email is already confirmed but user can't log in

**Solutions**:

1. Try logging in with your credentials
2. Use the "Forgot Password" feature if you can't remember your password
3. Check if you're already logged in

## Debug Features

The verification page includes several debug features:

### 1. Debug Information Panel

- Shows all URL parameters
- Displays verification method attempts
- Provides technical details for support

### 2. Manual Verification Tools

- Manual verification button (if parameters are present)
- Resend verification email
- Step-by-step instructions

### 3. Console Logging

- Detailed logs in browser console (F12 → Console)
- Shows verification attempts and results
- Helpful for technical troubleshooting

## Verification Methods

The system tries multiple verification methods in order:

1. **Token Hash Verification** (Modern Supabase)

   - Uses `token_hash` and `type` parameters
   - Preferred method for new registrations

2. **Legacy Token Verification** (Older Supabase)

   - Uses `token` and `type` parameters
   - Fallback for older email links

3. **PKCE Code Exchange** (OAuth flow)

   - Uses `code` parameter
   - For OAuth-based registrations

4. **Session Check** (Already logged in)
   - Checks if user already has valid session
   - Redirects if already verified

## Manual Verification Steps

If automatic verification fails:

1. Go to `/verify` page
2. Look for "Manual Verification Tools" section
3. If you have URL parameters, try "Verify Manually"
4. If no parameters, use "Resend Verification Email"
5. Check your email and try the new link

## Supabase Configuration

Ensure Supabase is configured correctly:

```typescript
// Correct auth configuration
{
  auth: {
    storage: localStorage,
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
    flowType: "pkce",
    debug: process.env.NODE_ENV === "development",
  },
}
```

## Email Registration Configuration

Ensure registration includes correct redirect URL:

```typescript
await supabase.auth.signUp({
  email,
  password,
  options: {
    emailRedirectTo: `${window.location.origin}/verify`,
  },
});
```

## Testing Verification

To test email verification:

1. Register with a test email
2. Check browser console for logs
3. Inspect the verification URL parameters
4. Use debug tools on `/verify` page
5. Test manual verification features

## Support Information

When contacting support, provide:

1. The full verification URL
2. Browser console logs
3. Debug information from the verification page
4. Steps taken before the issue
5. Error messages received

## Production Checklist

Before deploying to production:

- [ ] Verify email templates are correct
- [ ] Test verification flow end-to-end
- [ ] Confirm redirect URLs are correct
- [ ] Check spam folder behavior
- [ ] Test with different email providers
- [ ] Verify mobile compatibility
- [ ] Test link expiration behavior

## Environment-Specific Notes

### Development

- Debug logging enabled
- Console shows detailed information
- Use localhost URLs for testing

### Production

- Debug logging disabled
- Use production domain in redirect URLs
- Monitor error rates and user feedback

## Troubleshooting Checklist

When verification fails:

1. **Check URL**: Does it contain `token_hash`, `token`, or `code`?
2. **Check Console**: Any errors in browser console (F12)?
3. **Check Network**: Any failed requests in Network tab?
4. **Check Email**: Is the original email in spam/junk?
5. **Check Time**: Is the verification link under 24 hours old?
6. **Check Browser**: Try incognito/private mode
7. **Check Manual**: Use manual verification tools
8. **Check Logs**: Review application logs for server errors

This comprehensive approach should resolve most email verification issues.
