const jwt = require("jsonwebtoken");

const validateToken = async (request, h) => {
  try {
    const token = request.headers.authorization?.split(" ")[1];
    console.log("Token diterima:", token); // Debugging log

    if (!token) {
      console.error("Token tidak ditemukan"); // Debugging log
      return h
        .response({
          status: "fail",
          message: "Token tidak ditemukan",
        })
        .code(401)
        .takeover();
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Token berhasil diverifikasi:", decoded); // Debugging log
    request.auth = { userId: decoded.id };
    return h.continue;
  } catch (err) {
    console.error("Token validation error:", err.message); // Debugging log
    return h
      .response({
        status: "fail",
        message: "Token tidak valid",
      })
      .code(403)
      .takeover();
  }
};

module.exports = { validateToken };