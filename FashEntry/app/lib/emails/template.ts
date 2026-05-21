
export function Template(otpCode: string) {
    const emailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>Verify Your Account</title>
        </head>
        <body style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f9fafb; margin: 0; padding: 40px 20px;">
          <div style="max-width: 480px; margin: 0 auto; background-color: #ffffff; border-radius: 24px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06); border: 1px solid #f1f5f9;">
            
            <div style="padding: 32px 32px 0 32px; text-align: center;">
              <div style="display: inline-block; background-color: #059669; color: #ffffff; width: 48px; height: 48px; line-height: 48px; border-radius: 14px; font-weight: bold; font-size: 20px; box-shadow: 0 10px 15px -3px rgba(16, 185, 129, 0.2);">
                AN
              </div>
              <h1 style="font-size: 24px; font-weight: 800; color: #0f172a; margin-top: 16px; letter-spacing: -0.025em;">Automate</h1>
            </div>

            <div style="padding: 32px;">
              <h2 style="font-size: 18px; font-weight: 700; color: #1e293b; margin-bottom: 12px; text-align: center;">Verify your email address</h2>
              <p style="font-size: 15px; line-height: 24px; color: #64748b; text-align: center; margin-bottom: 32px;">
                Thanks for starting your automation journey! Use the code below to verify your email.
              </p>

              <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 16px; padding: 24px; text-align: center; margin-bottom: 32px;">
                <span style="font-family: 'Courier New', Courier, monospace; font-size: 36px; font-weight: 800; letter-spacing: 12px; color: #0f172a; margin-left: 12px;">${otpCode}</span>
              </div>

              <p style="font-size: 13px; color: #94a3b8; text-align: center;">
                This code will expire in <span style="color: #059669; font-weight: 600;">5 minutes</span>.<br>
                If you didn't request this, you can ignore this email.
              </p>
            </div>

            <div style="background-color: #f1f5f9; padding: 24px; text-align: center;">
              <p style="font-size: 12px; color: #94a3b8; margin: 0;">
                &copy; 2026 Automate Platform. All rights reserved.<br>
                Built by Andy Widianto
              </p>
            </div>
          </div>
        </body>
      </html>
    `;
    return emailHtml;
}