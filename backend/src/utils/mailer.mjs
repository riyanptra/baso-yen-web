import nodemailer from "nodemailer";

/**
 * Konfigurasi Transporter Nodemailer
 * Menggunakan layanan Gmail SMTP.
 */
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS, // App Password 16 karakter dari .env
  },
});

/**
 * Mengirimkan email melalui layanan SMTP (Nodemailer).
 * @param {object} options - Opsi pengiriman email
 * @param {string|string[]} options.to - Alamat email tujuan penerima
 * @param {string} options.subject - Subjek atau judul email
 * @param {string} [options.text] - Isi email dalam format teks biasa (plaintext)
 * @param {string} [options.html] - Isi email dalam format HTML
 * @returns {Promise<object>} Informasi hasil pengiriman dari Nodemailer
 */
export const sendEmail = async ({ to, subject, text, html }) => {
  return await transporter.sendMail({
    from: '"Sistem Notifikasi Baso Yen" <no-reply@basoyen.com>',
    to,
    subject,
    text,
    html,
  });
};

/**
 * Mengirim email notifikasi ke Admin
 * @param {string} subject - Judul Email
 * @param {string} htmlContent - Isi Email dalam format HTML
 */
export const sendNotificationEmail = async (
  subject,
  htmlContent,
  replyToEmail = null,
) => {
  try {
    const mailOptions = {
      from: '"Sistem Notifikasi Baso Yen" <no-reply@basoyen.com>',
      to: "riyanputrapratama723@gmail.com", // Tujuan email yang diminta
      subject: subject,
      html: htmlContent,
    };

    // Jika ada email pelanggan, arahkan tombol "Balas (Reply)" ke email tersebut
    if (replyToEmail) {
      mailOptions.replyTo = replyToEmail;
    }

    const info = await transporter.sendMail(mailOptions);
    console.log("Email notifikasi berhasil terkirim:", info.messageId);
    return true;
  } catch (error) {
    console.error("Gagal mengirim email notifikasi:", error);
    // Kita return false agar kegagalan kirim email tidak merusak proses penyimpanan database utama
    return false;
  }
};
