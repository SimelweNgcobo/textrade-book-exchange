# Email Change Workflow Documentation

## Overview

This document describes the complete email change workflow implemented for the ReBooked Solutions application. The system allows users to safely change their email addresses with proper verification and security measures.

## Workflow Process

### 1. Initiate Email Change

**User Journey:**

1. User navigates to their profile page
2. Clicks "Change Email" button in Account Information section
3. EmailChangeDialog opens showing current email
4. User enters new email address
5. System validates email format and availability
6. If valid, system stores pending email change and sends confirmation email

**Technical Process:**

- Validate new email format and uniqueness
- Generate secure confirmation token
- Store pending change in database with expiration (24 hours)
- Send confirmation email to new address
- Update UI to show "Waiting for confirmation" status

### 2. Email Confirmation

**User Journey:**

1. User receives email at new address
2. Clicks confirmation link in email
3. Redirected to `/confirm-email-change?token=XYZ`
4. System verifies token and updates email
5. User is logged out for security
6. Redirected to login with success message

**Technical Process:**

- Extract and validate confirmation token
- Check token expiration (24 hours)
- Update email in both auth and profiles tables
- Clear pending email fields
- Force logout for security
- Redirect to login page

### 3. Post-Confirmation

**User Journey:**

1. User logs in with new email address
2. All account data remains intact
3. Old email is no longer valid for login
4. System shows updated email in profile

## File Structure

### Core Services

- **`src/services/emailChangeService.ts`** - Main service handling email change logic
  - `requestEmailChange()` - Initiates email change process
  - `confirmEmailChange()` - Processes confirmation tokens
  - `cancelEmailChange()` - Cancels pending changes
  - `getPendingEmailChange()` - Checks pending status

### UI Components

- **`src/components/EmailChangeDialog.tsx`** - Modal for email change requests

  - Mobile-responsive design
  - Form validation
  - Pending status display
  - Cancel functionality

- **`src/components/profile/AccountInformation.tsx`** - Enhanced profile component
  - Shows current email
  - Displays pending email status
  - Quick access to email change
  - Mobile-optimized layout

### Pages

- **`src/pages/ConfirmEmailChange.tsx`** - Confirmation page
  - Token processing
  - Success/error handling
  - Auto-logout and redirect
  - Mobile-friendly interface

### Styles

- **`src/styles/email-change-mobile.css`** - Mobile-responsive styles
  - Touch-friendly buttons (44px minimum)
  - Responsive breakpoints
  - Dark mode support
  - Accessibility features

### Database

- **`EMAIL_CHANGE_DATABASE_MIGRATION.sql`** - Database schema
  - Adds pending email columns to profiles table
  - Creates necessary indexes
  - Includes cleanup functions

## Database Schema

### New Columns in `profiles` table:

```sql
pending_email TEXT                -- New email waiting for confirmation
pending_email_token TEXT          -- Secure verification token
pending_email_expires_at TIMESTAMPTZ -- Expiration timestamp (24 hours)
```

### Indexes:

```sql
idx_profiles_pending_email_token   -- Fast token lookups
idx_profiles_pending_email_expires_at -- Efficient cleanup
idx_profiles_pending_email_unique -- Prevent duplicate pending emails
```

## Security Features

### Token Security

- **Cryptographically secure tokens** using `crypto.getRandomValues()`
- **32-byte tokens** (64 hex characters)
- **24-hour expiration** with automatic cleanup
- **Single-use tokens** that are cleared after use

### Email Validation

- **Format validation** using regex
- **Uniqueness checking** to prevent conflicts
- **Case-insensitive comparison** for email addresses
- **Sanitization** of input data

### Session Security

- **Forced logout** after email change
- **Token invalidation** after successful confirmation
- **Expired token cleanup** to prevent accumulation

## Mobile Optimization

### Responsive Design

- **Breakpoint-based layouts** for all screen sizes
- **Touch-friendly elements** (44px minimum)
- **Viewport optimization** prevents zoom on input
- **Safe area support** for notched devices

### Typography

- **16px minimum font size** prevents iOS zoom
- **Readable line heights** (1.4-1.6)
- **Appropriate contrast ratios** for accessibility
- **Word-break handling** for long email addresses

### Interaction Design

- **Large tap targets** for mobile users
- **Swipe-friendly modals** with proper positioning
- **Loading states** with visual feedback
- **Error states** with clear messaging

## Error Handling

### Common Scenarios

1. **Invalid email format** - Clear validation message
2. **Email already in use** - Conflict detection and messaging
3. **Expired tokens** - Automatic cleanup with user notification
4. **Network errors** - Retry mechanisms and fallbacks
5. **Database errors** - Graceful degradation

### User Feedback

- **Toast notifications** for immediate feedback
- **In-line validation** during form entry
- **Status badges** for pending changes
- **Progress indicators** during processing
- **Clear error messages** with actionable solutions

## API Endpoints

### Email Change Request

```typescript
EmailChangeService.requestEmailChange(userId: string, newEmail: string)
// Returns: { success: boolean, message: string, pendingEmail?: string }
```

### Confirm Email Change

```typescript
EmailChangeService.confirmEmailChange(token: string)
// Returns: { success: boolean, message: string }
```

### Check Pending Status

```typescript
EmailChangeService.getPendingEmailChange(userId: string)
// Returns: { hasPending: boolean, pendingEmail?: string, expiresAt?: string }
```

### Cancel Change

```typescript
EmailChangeService.cancelEmailChange(userId: string)
// Returns: { success: boolean, message: string }
```

## Testing Guidelines

### Manual Testing

1. **Complete flow testing** - Request → Confirm → Login
2. **Error scenario testing** - Invalid emails, expired tokens
3. **Mobile device testing** - Various screen sizes
4. **Email delivery testing** - Check spam folders
5. **Security testing** - Token reuse, timing attacks

### Automated Testing

```javascript
// Example test cases
describe("Email Change Workflow", () => {
  test("should request email change successfully");
  test("should reject invalid email formats");
  test("should prevent duplicate email requests");
  test("should handle token expiration");
  test("should complete email change on valid token");
  test("should logout user after successful change");
});
```

## Deployment Checklist

### Database Setup

- [ ] Run migration script to add new columns
- [ ] Create necessary indexes for performance
- [ ] Set up cleanup job for expired tokens
- [ ] Configure Row Level Security (if needed)

### Environment Configuration

- [ ] Verify email service configuration
- [ ] Set up proper redirect URLs
- [ ] Configure CORS for confirmation endpoints
- [ ] Test email delivery in production

### Security Verification

- [ ] Verify token generation is cryptographically secure
- [ ] Test token expiration enforcement
- [ ] Confirm email uniqueness validation
- [ ] Validate logout functionality

### Mobile Testing

- [ ] Test on iOS devices (Safari)
- [ ] Test on Android devices (Chrome)
- [ ] Verify touch interactions work properly
- [ ] Check viewport behavior on form inputs
- [ ] Test in landscape and portrait orientations

## Monitoring and Analytics

### Key Metrics to Track

- **Email change request rate** - How often users change emails
- **Confirmation success rate** - % of successful confirmations
- **Token expiration rate** - % of tokens that expire unused
- **Error rates** - Types and frequency of errors
- **Mobile vs desktop usage** - Platform preferences

### Logging Points

```typescript
// Example logging
console.log("Email change requested:", { userId, newEmail });
console.log("Confirmation email sent:", { newEmail, token });
console.log("Email change confirmed:", { userId, oldEmail, newEmail });
console.log("Email change cancelled:", { userId, reason });
```

## Troubleshooting

### Common Issues

1. **Emails not received** - Check spam filters, email configuration
2. **Tokens expired** - User needs to request new change
3. **Confirmation link broken** - Verify URL generation
4. **Mobile layout issues** - Check CSS media queries
5. **Database conflicts** - Check unique constraints

### Support Procedures

1. **Email delivery issues** - Check email service logs
2. **Token problems** - Verify token generation and storage
3. **Mobile complaints** - Test on specific device/browser
4. **Database errors** - Check table schema and permissions

## Future Enhancements

### Potential Improvements

- **Email change history** - Track previous email addresses
- **Bulk email updates** - Admin functionality for mass changes
- **Email verification reminders** - Automated follow-up emails
- **Multi-factor authentication** - Additional security layer
- **Email change notifications** - Alert old email about changes

### Performance Optimizations

- **Token caching** - Redis cache for active tokens
- **Database optimization** - Partitioning for large datasets
- **Email queuing** - Background processing for email sending
- **CDN optimization** - Faster page loads on mobile

This documentation provides a complete guide to the email change workflow implementation, ensuring maintainability and ease of support.
