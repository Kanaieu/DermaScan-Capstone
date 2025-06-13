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

  // Periksa apakah email sudah terdaftar
  const { data: existingUser, error: checkError } = await supabase
    .from("users")
    .select("id")
    .eq("email", email)
    .single();

  if (existingUser) {
    return h
      .response({
        status: "fail",
        message: "Email sudah terdaftar",
      })
      .code(400);
  }

  if (checkError && checkError.code !== "PGRST116") {
    // Tangani error selain "tidak ditemukan"
    return h
      .response({
        status: "fail",
        message: "Terjadi kesalahan saat memeriksa email",
      })
      .code(500);
  }


  if (error) {
    console.error("Supabase error:", error); // Log error dari Supabase
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

    console.error("Login error:", error); // Tambahkan log ini
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


  // Buat token JWT
  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

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
  const userId = request.auth.userId; // Ambil userId dari middlewar
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
const analyzeHandler = async (request, h) => {
  const userId = request.auth.userId; // Ambil userId dari middleware

  const { image } = request.payload; // Ambil file dengan key "image"

  if (!image) {
    return h
      .response({
        status: "fail",
        message: "File gambar wajib disertakan",
      })
      .code(400);
  }

  const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
  if (!allowedTypes.includes(image.hapi.headers["content-type"])) {
    return h
      .response({
        status: "fail",
        message: "Format file tidak didukung",
      })
      .code(415);
  }

  console.log("Payload received:", request.payload);
  console.log("File received:", image.hapi.filename); // Debugging log

  try {
    // Upload file ke Supabase Storage
    const fileName = `${Date.now()}_${image.hapi.filename}`;
    const { error: uploadError } = await supabase.storage
      .from(process.env.SUPABASE_STORAGE_BUCKET)
      .upload(fileName, image);

    if (uploadError) {
      throw new Error("Gagal mengunggah file ke Supabase Storage");
    }

    // Dapatkan URL file yang diunggah
    const { publicUrl } = supabase.storage
      .from(process.env.SUPABASE_STORAGE_BUCKET)
      .getPublicUrl(fileName);

    // Kirim file ke API model ML
    const formData = new FormData();
    formData.append("image", image._data);

    const response = await fetch(`${process.env.API_BASE_URL}/predict`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Gagal mendapatkan prediksi dari API");
    }

    const { prediction } = await response.json();

    // Simpan hasil analisis ke database Supabase
    const { error: dbError } = await supabase.from("dataAnalysis").insert({
      user_id: userId,
      image_url: publicUrl,
      disease: prediction,
    });

    if (dbError) {
      throw new Error("Gagal menyimpan hasil analisis ke database");
    }

    return h
      .response({
        status: "success",
        message: "Analisis berhasil",
        data: {
          disease: prediction,
          image_url: publicUrl,
        },
      })
      .code(200);
  } catch (err) {
    console.error(err.message);
    return h
      .response({
        status: "fail",
        message: err.message,
      })
      .code(500);
  }
};

const getDiseaseInfoHandler = async (request, h) => {
  const { disease } = request.query;

  if (!disease) {
    return h
      .response({
        status: "fail",
        message: "Nama penyakit wajib disertakan",
      })
      .code(400);
  }

  try {
    const { data, error } = await supabase
      .from("dataDiseases")
      .select("explanation, treatment")
      .eq("name", disease)
      .single();

    if (error || !data) {
      return h
        .response({
          status: "fail",
          message: "Data penyakit tidak ditemukan",
        })
        .code(404);
    }

    return h
      .response({
        status: "success",
        data,
      })
      .code(200);
  } catch (err) {
    console.error(err.message);
    return h
      .response({
        status: "fail",
        message: "Terjadi kesalahan pada server",
      })
      .code(500);
  }
};

module.exports = {
  registerHandler,
  loginHandler,
  editProfileHandler,
  analyzeHandler,
  getDiseaseInfoHandler,
};
