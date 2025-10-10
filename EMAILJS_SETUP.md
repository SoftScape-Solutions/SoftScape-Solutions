# EmailJS Setup Instructions

To enable the contact form functionality, you need to set up EmailJS:

## 1. Create an EmailJS Account

- Go to [https://www.emailjs.com/](https://www.emailjs.com/)
- Sign up for a free account

## 2. Set up Email Service

- Create a new email service (Gmail, Outlook, etc.)
- Note down your **Service ID**

## 3. Create Email Template

- Create a new email template
- Use these template variables in your template:

  - `{{name}}` - User's full name
  - `{{email}}` - User's email address
  - `{{phone}}` - User's phone number
  - `{{company}}` - User's company name
  - `{{industry}}` - User's industry
  - `{{projectType}}` - Selected project type
  - `{{budget}}` - Selected budget range
  - `{{timeline}}` - Selected timeline
  - `{{projectDetails}}` - Project description
  - `{{additionalNotes}}` - Additional notes
  - `{{files}}` - List of uploaded file names
  - `{{submission_date}}` - Form submission date

- Note down your **Template ID**

## 4. Get Public Key

- Go to Account > API Keys
- Copy your **Public Key**

## 5. Update Environment Variables

Update the `.env` file in the project root with your actual credentials:

```env
VITE_EMAILJS_SERVICE_ID=your_actual_service_id
VITE_EMAILJS_TEMPLATE_ID=your_actual_template_id
VITE_EMAILJS_PUBLIC_KEY=your_actual_public_key
```

## 6. Restart Development Server

After updating the `.env` file:

```bash
npm run dev
```

## Alternative Contact Methods

If you prefer not to set up EmailJS, users can still contact you directly via:

- Email: softscapesolution@outlook.com
- Phone: +44 7789667804

The form will display these contact details when EmailJS is not configured.
