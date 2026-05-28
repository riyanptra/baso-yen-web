import { prisma } from "../src/lib/prisma.mjs";
import bcrypt from "bcrypt";
import "dotenv/config";

async function main() {
  console.log("🌱 Memulai penanaman data (Seeding)...");

  // 1. Siapkan password mentah dan acak menggunakan bcrypt (Salt Rounds: 10)
  const passwordMentah = "basoy3n98";
  const hashedPassword = await bcrypt.hash(passwordMentah, 10);

  // 2. Gunakan metode 'upsert' (Update or Insert)
  // Artinya: Jika email sudah ada, abaikan. Jika belum ada, buat baru!
  const admin = await prisma.user.upsert({
    where: { email: "admin@basoyen.com" },
    update: {
      name: "Admin Baso Yen", // Update nama jika sudah ada
      password: hashedPassword, // Update password juga
    }, 
    create: {
      username: "admin",
      name: "Admin Baso Yen",
      email: "admin@basoyen.com",
      password: hashedPassword,
      role: "ADMIN",
    },
  });

  console.log(`✅ Berhasil menyinkronkan akun ${admin.name}:`);
  console.log("-------------------------------------");
  console.log(`👤 Nama     : ${admin.name}`);
  console.log(`📧 Email    : ${admin.email}`);
  console.log(`🔑 Password : ${passwordMentah}`);
  console.log("-------------------------------------");
  console.log("⚠️ SIMPAN PASSWORD INI DENGAN BAIK!");
}

main()
  .catch((e) => {
    console.error("❌ Terjadi kesalahan saat seeding:");
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    // Selalu putuskan koneksi database setelah selesai
    await prisma.$disconnect();
  });
