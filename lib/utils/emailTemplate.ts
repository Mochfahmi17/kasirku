export function verifySendEmailOtpTemplate(name: string, code: string) {
  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Verifikasi Reset Kata Sandi</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f4f4f4;
      margin: 0;
      padding: 0;
    }
    .email-container {
      max-width: 600px;
      margin: 30px auto;
      background-color: #ffffff;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }
    .email-header {
      background-color: #4a90e2;
      color: #ffffff;
      text-align: center;
      padding: 20px;
    }
    .email-body {
      padding: 30px;
      color: #333333;
    }
    .verification-code {
      font-size: 24px;
      font-weight: bold;
      text-align: center;
      background-color: #f0f4ff;
      padding: 15px;
      margin: 20px 0;
      border-radius: 6px;
      letter-spacing: 2px;
    }
    .footer {
      font-size: 12px;
      color: #888888;
      text-align: center;
      padding: 20px;
    }
  </style>
</head>
<body>
  <div class="email-container">
    <div class="email-header">
      <h1>Permintaan Reset Kata Sandi</h1>
    </div>
    <div class="email-body">
      <p>Halo ${name},</p>
      <p>Kami menerima permintaan untuk mereset kata sandi Anda. Silakan gunakan kode verifikasi di bawah ini untuk melanjutkan proses reset:</p>
      <div class="verification-code">${code}</div>
      <p>Jika Anda tidak merasa melakukan permintaan ini, Anda bisa mengabaikan email ini dengan aman.</p>
      <p>Terima kasih,<br>Tim KasirKu</p>
    </div>
    <div class="footer">
      &copy; 2025 KasirKu. Seluruh hak cipta dilindungi.
    </div>
  </div>
</body>
</html>
`;
}
