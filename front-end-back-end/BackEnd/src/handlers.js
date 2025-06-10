const supabase = require("./supabaseClient");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const registerHandler = async (request, h) => {
  const { full_name, email, password } = request.payload;

  if (!full_name || !email || !password) {
    return h
      .response({
        status: "fail",
        message: "Semua field wajib diisi",
      })
      .code(400);
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const { error } = await supabase.from("users").insert({
    full_name,
    email,
    password: hashedPassword,
    created_at: new Date().toISOString(),
  });

  if (error) {
    return h
      .response({
        status: "fail",
        message: "Registrasi gagal",
      })
      .code(400);
  }

  return h
    .response({
      status: "success",
      message: "Berhasil registrasi",
    })
    .code(201);
};

const loginHandler = async (request, h) => {
  const { email, password } = request.payload;

  if (!email || !password) {
    return h
      .response({
        status: "fail",
        message: "Email dan password wajib diisi",
      })
      .code(400);
  }

  const { data: user, error } = await supabase
    .from("users")
    .select("*")
    .eq("email", email)
    .single();

  if (error || !user) {
    return h
      .response({
        status: "fail",
        message: "Email atau password salah",
      })
      .code(401);
  }

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) {
    return h
      .response({
        status: "fail",
        message: "Email atau password salah",
      })
      .code(401);
  }

  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {});

  return h
    .response({
      status: "success",
      message: "Login berhasil",
      token,
    })
    .code(200);
};

const editProfileHandler = async (request, h) => {
  const token = request.headers.authorization?.split(" ")[1];
  if (!token) {
    return h
      .response({
        status: "fail",
        message: "Token tidak ditemukan",
      })
      .code(401);
  }

  let userId;
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    userId = decoded.id;
  } catch (err) {
    return h
      .response({
        status: "fail",
        message: "Token tidak valid",
      })
      .code(403);
  }

  const { full_name, email, current_password, new_password } = request.payload;

  const { data: user, error } = await supabase
    .from("users")
    .select("*")
    .eq("id", userId)
    .single();

  if (error) {
    return h
      .response({
        status: "fail",
        message: "Pengguna tidak ditemukan",
      })
      .code(404);
  }

  const passwordMatch = await bcrypt.compare(current_password, user.password);
  if (!passwordMatch) {
    return h
      .response({
        status: "fail",
        message: "Password saat ini salah",
      })
      .code(403);
  }

  const updatedFields = {
    full_name,
    email,
    updated_at: new Date().toISOString(),
  };

  if (new_password) {
    updatedFields.password = await bcrypt.hash(new_password, 10);
  }

  const { error: updateError } = await supabase
    .from("users")
    .update(updatedFields)
    .eq("id", userId);

  if (updateError) {
    return h
      .response({
        status: "fail",
        message: "Gagal memperbarui profil",
      })
      .code(500);
  }

  return h
    .response({
      status: "success",
      message: "Profil berhasil diperbarui",
    })
    .code(200);
};

module.exports = {
  registerHandler,
  loginHandler,
  editProfileHandler,
};
