
export const landlordSignupMessage = `
    <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f9f9f9; color: #333; border-radius: 8px; max-width: 600px; margin: auto;">
    
    <h1 style="text-align: center; color: #e67e22; margin-bottom: 30px;">🏠 MeFieConnect</h1>

    <h2 style="color: #2c3e50;">👋 Hi Property Owner</h2>
    <h3 style="color: #27ae60;">✅ Your account has been created successfully!</h3>
    
    <p style="font-size: 16px; line-height: 1.6;">
      📞 You will be contacted soon by <strong style="color: #e67e22;">MeFieConnect</strong> for property verification.
    </p>
    
    <p style="font-size: 16px; line-height: 1.6;">🙏 Thank you!</p>
    
    <hr style="margin: 20px 0;" />
    
    <p style="font-size: 14px; line-height: 1.5; color: #c0392b;">
      ⚠️ <strong>Note:</strong> This platform is exclusively for property owners — agents are not allowed.
    </p>
  </div>
`;

export const renterSignupMessage = `
    <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f9f9f9; color: #333; border-radius: 8px; max-width: 600px; margin: auto;">
    
    <h1 style="text-align: center; color: #e67e22; margin-bottom: 30px;">🏠 MeFieConnect</h1>

    <h2 style="color: #2c3e50;">👋 Hi Renter</h2>
    <h3 style="color: #27ae60;">✅ Your account has been created successfully!</h3>
    
    <p style="font-size: 16px; line-height: 1.6;">
      With <strong style="color: #e67e22;">MeFieConnect</strong> you deal directly with property owners — <span style="color: #2c3e50; font-weight: 400">no agents or middlemen</span> involved. Find your perfect space 😊
    </p>
    
    <p style="font-size: 16px; line-height: 1.6;">🙏 Thank you!</p>
    
    <hr style="margin: 20px 0;" />
    
    <p style="font-size: 14px; line-height: 1.5; color: #c0392b;">
      ⚠️ <strong>Note:</strong> This platform is exclusively for property owners — agents are not allowed.
    </p>
  </div>
`;

export const approvedMessage = (title, name) => {
  return `<div style="font-family: Arial, sans-serif; padding: 24px; background-color: #f4f6f8; color: #333; border-radius: 12px; max-width: 600px; margin: 40px auto; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">
  
  <h1 style="text-align: center; color: #e67e22; margin-bottom: 24px; font-size: 28px;">
    🏠 MeFieConnect
  </h1>
  
  <h2 style="margin-top: 0; color: #2c3e50; font-size: 20px;">Hi ${name},</h2>
  
  <p style="font-size: 16px; line-height: 1.6; margin-bottom: 24px;">
    We're excited to let you know that your listing <strong>${title}</strong> has been <strong>approved</strong> and is now <strong>live</strong> on our platform!
  </p>
  
  <div style="text-align: center; margin-top: 20px;">
    <a href="#" style="background-color: #e67e22; color: white; text-decoration: none; padding: 12px 24px; border-radius: 6px; font-weight: bold; font-size: 16px;">
      View Your Listing
    </a>
  </div>
</div>
`;
} ;

export const rejectedMessage = (title, name) => {
  return `<div style="font-family: Arial, sans-serif; padding: 24px; background-color: #fff6f6; color: #333; border-radius: 12px; max-width: 600px; margin: 40px auto; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">
  
  <h1 style="text-align: center; color: #e74c3c; margin-bottom: 24px; font-size: 28px;">
    ❗ MeFieConnect
  </h1>
  
  <h2 style="margin-top: 0; color: #2c3e50; font-size: 20px;">Hi ${name},</h2>
  
  <p style="font-size: 16px; line-height: 1.6; margin-bottom: 16px;">
    Thank you for submitting your listing <strong>${title}</strong> to MeFieConnect.
  </p>
  
  <p style="font-size: 16px; line-height: 1.6; margin-bottom: 24px;">
    Unfortunately, your listing was <strong>not approved</strong> at this time. This may be due to incomplete details, non-compliance with our listing guidelines, or other verification issues.
  </p>
  
  <div style="text-align: center; margin-top: 20px;">
    <a href="#" style="background-color: #e74c3c; color: white; text-decoration: none; padding: 12px 24px; border-radius: 6px; font-weight: bold; font-size: 16px;">
      Review and Edit Listing
    </a>
  </div>
  
  <p style="font-size: 14px; color: #777; margin-top: 30px; text-align: center;">
    Need help? Contact support at <a href="mailto:support@mefieconnect.com">support@mefieconnect.com</a>
  </p>
</div>
`;
} 