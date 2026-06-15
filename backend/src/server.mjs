import express from "express";
import "dotenv/config";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import rateLimit from "express-rate-limit";
import { errorHandler } from "./middlewares/errorMiddleware.mjs";

import authRoute from "./routes/authRoute.mjs";
import categoryRoute from "./routes/categoryRoute.mjs";
import productRoute from "./routes/productRoute.mjs";
import recipeRoute from "./routes/recipeRoute.mjs";
import articleRoute from "./routes/articleRoute.mjs";
import galleryRoute from "./routes/galleryRoute.mjs";
import clientRoute from "./routes/clientRoute.mjs";
import certificateRoute from "./routes/certificateRoute.mjs";
import testimonialRoute from "./routes/testimonialRoute.mjs";
import dashboardRoute from "./routes/dashboardRoute.mjs";

const app = express();
const PORT = process.env.PORT;

// 1. Keamanan Server (Security Middlewares)
app.use(helmet()); // Mengatur HTTP header untuk keamanan
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173", // URL React frontend Anda
    credentials: true, // Izinkan browser mengirim HttpOnly cookie
  }),
);

// 2. Pembatasan Request (Mencegah DDoS / Brute Force)
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 menit
  max: process.env.NODE_ENV === "production" ? 100 : 5000, // Bebas saat mode development
  message: "Terlalu banyak request dari IP ini, coba lagi nanti.",
});
app.use("/api", limiter);

// 3. Pengekstrak Body & Cookie (Parsers)
app.use(express.json({ limit: "10mb" })); // Menerima JSON body
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser()); // Mengekstrak cookie

// 4. Rute API
app.use("/api/auth", authRoute);
app.use("/api/categories", categoryRoute);
app.use("/api/products", productRoute);
app.use("/api/recipes", recipeRoute);
app.use("/api/articles", articleRoute);
app.use("/api/galleries", galleryRoute);
app.use("/api/clients", clientRoute);
app.use("/api/certificates", certificateRoute);
app.use("/api/testimonials", testimonialRoute);
app.use("/api/dashboard", dashboardRoute);

app.use("/", (req, res) => {
  res.send("API Baso Yen Berjalan dengan Aman 🚀");
});

// 5. Middleware Penanganan Error Global (Harus ditaruh paling bawah)
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`✅ Server berjalan di http://localhost:${PORT}`);
});
