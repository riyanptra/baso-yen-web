/**
 * Standardisasi Format Balasan (Response) JSON API
 */

export const sendResponse = (
  res,
  statusCode,
  success,
  message,
  data = null,
  errors = null,
) => {
  return res.status(statusCode).json({
    success,
    message,
    data,
    errors,
  });
};

/**
 * Mengirimkan respons sukses (JSON) kepada klien.
 * @param {object} res - Objek Response Express
 * @param {string} message - Pesan sukses untuk ditampilkan
 * @param {any} [data=null] - Data muatan yang ingin dikirimkan (opsional)
 * @param {number} [statusCode=200] - Kode status HTTP (default: 200 OK)
 * @returns {object} JSON respons sukses
 */
export const sendSuccess = (res, message, data = null, statusCode = 200) => {
  return sendResponse(res, statusCode, true, message, data);
};

/**
 * Mengirimkan respons error (JSON) kepada klien.
 * @param {object} res - Objek Response Express
 * @param {string} message - Pesan error untuk ditampilkan
 * @param {number} [statusCode=500] - Kode status HTTP (default: 500 Internal Server Error)
 * @param {any} [errors=null] - Detail error atau stack trace (opsional)
 * @returns {object} JSON respons error
 */
export const sendError = (res, message, statusCode = 500, errors = null) => {
  return sendResponse(res, statusCode, false, message, null, errors);
};
