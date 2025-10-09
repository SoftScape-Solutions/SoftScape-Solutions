# Email Configuration Setup Guide

## Setting up EmailJS for Consultation Form

### Step 1: Create EmailJS Account
1. Go to https://www.emailjs.com/
2. Sign up for a free account
3. Verify your email address

### Step 2: Create Email Service
1. In your EmailJS dashboard, click "Add New Service"
2. Choose your email provider (Gmail, Outlook, etc.)
3. Follow the setup instructions for your provider
4. Note down the **Service ID** (e.g., "service_abc123")

### Step 3: Create Email Template
1. Go to "Email Templates" in your dashboard
2. Click "Create New Template"
3. Use this template structure:

```
Subject: New Consultation Request from {{from_name}}

Dear Customer Service Team,

You have received a new consultation request:

Client Information:
- Name: {{from_name}}
- Email: {{from_email}}
- Phone: {{phone}}
- Company: {{company}}
- Industry: {{industry}}

Project Details:
- Project Type: {{project_type}}
- Budget Range: {{budget}}
- Timeline: {{timeline}}
- Project Description: {{project_details}}
- Additional Notes: {{additional_notes}}

Files Uploaded: {{uploaded_files}}

Submission Details:
- Date: {{submission_date}}
- Time: {{submission_time}}

Please follow up with this potential client within 24 hours.

Best regards,
SoftScape Solutions Website
```

4. Save the template and note down the **Template ID** (e.g., "template_xyz789")

### Step 4: Get Public Key
1. Go to "Account" > "General" in your EmailJS dashboard
2. Find your **Public Key** (e.g., "user_abc123xyz")

### Step 5: Update Environment Variables
1. Open the `.env` file in your project root
2. Replace the placeholder values with your actual credentials:

```env
VITE_EMAILJS_SERVICE_ID=your_actual_service_id
VITE_EMAILJS_TEMPLATE_ID=your_actual_template_id
VITE_EMAILJS_PUBLIC_KEY=your_actual_public_key
VITE_CUSTOMER_SERVICE_EMAIL=your-actual-email@yourdomain.com
```

### Step 6: Restart Development Server
After updating the `.env` file, restart your development server:
```bash
npm run dev
```

## Alternative Setup (Manual Configuration)

If you prefer not to use environment variables, you can directly edit the `bookconsultation.jsx` file:

1. Find this section in the `handleSubmit` function:
```javascript
const serviceID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const templateID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
```

2. Replace with your actual values:
```javascript
const serviceID = 'your_actual_service_id';
const templateID = 'your_actual_template_id';
const publicKey = 'your_actual_public_key';
```

## Testing the Setup

1. Fill out the consultation form on your website
2. Submit the form
3. Check your customer service email for the consultation request
4. Check the browser console for any error messages

## Troubleshooting

### Common Issues:
1. **Email not received**: Check spam folder, verify template variables match
2. **Console errors**: Verify all credentials are correct
3. **CORS errors**: Make sure your domain is added to EmailJS allowed origins

### EmailJS Free Plan Limits:
- 200 emails per month
- Basic support
- For higher volume, consider upgrading to a paid plan

## Production Deployment

For production deployment:
1. Set environment variables in your hosting platform
2. Never commit actual credentials to your repository
3. Consider setting up email rate limiting
4. Monitor email delivery and error rates

## Security Notes

- Environment variables starting with `VITE_` are exposed to the client
- EmailJS public key is safe to expose (it's designed for client-side use)
- Consider implementing server-side email handling for sensitive applications