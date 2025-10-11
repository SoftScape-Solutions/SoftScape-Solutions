// Web3Forms Email Test for SoftScape Solutions
// Test the automated email functionality

const testEmailService = async () => {
  console.log('🧪 Testing Web3Forms Email Integration...');
  
  // Test consultation data
  const testConsultationData = {
    id: 'test_consultation_' + Date.now(),
    name: 'Test User',
    email: 'test@example.com', // Change this to your email for testing
    phone: '+1234567890',
    company: 'Test Company Ltd',
    projectType: 'AI Chatbot Development',
    budget: '$10,000 - $25,000',
    timeline: '2-3 months',
    projectDetails: 'We need an AI chatbot for customer support on our e-commerce website.',
    submittedAt: new Date().toISOString()
  };

  try {
    // Import the email service
    const { default: emailService } = await import('./emailService.js');
    
    console.log('📧 Sending test confirmation email...');
    
    // Test client confirmation email
    const clientResult = await emailService.sendConsultationConfirmation(testConsultationData);
    
    if (clientResult.success) {
      console.log('✅ Client confirmation email sent successfully!');
      console.log('Method used:', clientResult.method);
    } else {
      console.log('❌ Client email failed:', clientResult.error);
    }

    // Test admin notification email
    console.log('📧 Sending test admin notification...');
    const adminResult = await emailService.sendAdminNotification(testConsultationData);
    
    if (adminResult.success) {
      console.log('✅ Admin notification email sent successfully!');
    } else {
      console.log('❌ Admin email failed:', adminResult.error);
    }

    // Summary
    console.log('\n📊 Test Summary:');
    console.log('Client Email:', clientResult.success ? '✅ SUCCESS' : '❌ FAILED');
    console.log('Admin Email:', adminResult.success ? '✅ SUCCESS' : '❌ FAILED');
    
    if (clientResult.success && adminResult.success) {
      console.log('\n🎉 All tests passed! Your email system is working correctly.');
      console.log('💡 You should receive 2 emails:');
      console.log('   1. Confirmation email to test@example.com');
      console.log('   2. Admin notification to softscapesolution@outlook.com');
    }

  } catch (error) {
    console.error('🚨 Test failed:', error);
  }
};

// Web3Forms Configuration Info
const showConfiguration = () => {
  console.log('\n🔧 Web3Forms Configuration:');
  console.log('API Key: 5575d911-0911-45c5-a96a-9e19099c6a31');
  console.log('Endpoint: https://api.web3forms.com/submit');
  console.log('From Email: softscapesolution@outlook.com');
  console.log('Admin Email: softscapesolution@outlook.com');
  console.log('\n📝 Features Enabled:');
  console.log('✅ HTML Email Templates');
  console.log('✅ Client Confirmation Emails');
  console.log('✅ Admin Notification Emails');
  console.log('✅ Consultation ID Tracking');
  console.log('✅ Professional Branding');
  console.log('✅ Mobile Responsive Design');
};

// Export for use in browser console or testing
if (typeof window !== 'undefined') {
  window.testEmailService = testEmailService;
  window.showEmailConfig = showConfiguration;
  
  console.log('🧪 Email testing functions loaded!');
  console.log('Run testEmailService() to test email functionality');
  console.log('Run showEmailConfig() to view configuration');
}

export { testEmailService, showConfiguration };