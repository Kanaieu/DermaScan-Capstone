const {
  registerHandler,
  loginHandler,
  editProfileHandler,
  analyzeHandler,
  getDiseaseInfoHandler,
} = require("./handlers");
const { validateToken } = require("./auth");

const routes = [
  {
    method: "POST",
    path: "/register",
    handler: registerHandler, // Tidak ada middleware validateToken
  },
  {
    method: "POST",
    path: "/login",
    handler: loginHandler, // Tidak ada middleware validateToken
  },
  {
    method: "PUT",
    path: "/profile",
    handler: editProfileHandler,
    options: {
      pre: [{ method: validateToken }], // Middleware hanya untuk endpoint ini
    },
  },
  {
    method: "POST",
    path: "/analyze",
    handler: analyzeHandler,
    options: {
      pre: [{ method: validateToken }], // Middleware untuk autentikasi
      payload: {
        output: "stream", // Output dalam bentuk stream
        parse: true, // Parsing otomatis
        allow: "multipart/form-data", // Mengizinkan multipart/form-data
      },
    },
  },
  {
    method: "GET",
    path: "/disease-info",
    handler: getDiseaseInfoHandler,
    options: {
      pre: [{ method: validateToken }], // Middleware hanya untuk endpoint ini
    },
  },
];

module.exports = routes;