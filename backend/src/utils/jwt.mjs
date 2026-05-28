import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = "7d"; // Token akan hangus dalam 7 hari

/**
 */
export const generateToken = (payload) => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
};

/**
 * Memverifikasi keaslian token JWT
 * @param {string} token - Token yang ingin dicek
 * @returns {Object} - Data payload asli jika token valid
 * @throws {Error} - Akan error jika token palsu atau sudah kedaluwarsa
 */
export const verifyToken = (token) => {
  return jwt.verify(token, JWT_SECRET);
};
