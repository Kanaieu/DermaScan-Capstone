const Hapi = require("@hapi/hapi");
const routes = require("./routes");
require("dotenv").config();

const init = async () => {
  const server = Hapi.server({
    port: 9001,
    host: "localhost",
    routes: {
      cors: {
        origin: ["*"], // Mengizinkan semua origin (ubah sesuai kebutuhan)
      },
    },
  });

  // Hapus middleware global validateToken
  // server.ext("onPreAuth", validateToken);

  // Tambahkan routes
  server.route(routes);

  await server.start();
  console.log("Server berjalan di", server.info.uri);
};

init();