import { useState } from "react";
import axios from "axios";

function Register() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // HANDLE REGISTER
  const handleRegister = async (e) => {

    e.preventDefault();

    try {

      const res = await axios.post(
        "http://localhost:5000/api/auth/register",
        {
          name,
          email,
          password,
        }
      );

      // SAVE TOKEN
      localStorage.setItem("token", res.data.token);

      alert("Register berhasil");

      // REDIRECT
      window.location.href = "/dashboard";

    } catch (err) {

      console.error(err);

      alert("Register gagal ❌");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-blue-950 flex items-center justify-center p-6">

      {/* CARD */}
      <div className="w-full max-w-md bg-gray-900 border border-gray-800 rounded-2xl shadow-2xl p-8">

        {/* TITLE */}
        <div className="text-center mb-8">

          <h1 className="text-4xl font-bold text-white mb-2">
            Create Account
          </h1>

          <p className="text-gray-400">
            Halaman Register akun baru
          </p>

        </div>

        {/* FORM */}
        <form
          onSubmit={handleRegister}
          className="space-y-5"
        >

          {/* NAME */}
          <div>

            <label className="block text-gray-300 mb-2">
              Name
            </label>

            <input
              type="text"
              placeholder="Masukkan nama..."
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="
                w-full
                p-3
                rounded-xl
                bg-gray-800
                border
                border-gray-700
                text-white
                placeholder-gray-500
                focus:outline-none
                focus:ring-2
                focus:ring-blue-400
              "
            />

          </div>

          {/* EMAIL */}
          <div>

            <label className="block text-gray-300 mb-2">
              Email
            </label>

            <input
              type="email"
              placeholder="Masukkan email..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="
                w-full
                p-3
                rounded-xl
                bg-gray-800
                border
                border-gray-700
                text-white
                placeholder-gray-500
                focus:outline-none
                focus:ring-2
                focus:ring-blue-400
              "
            />

          </div>

          {/* PASSWORD */}
          <div>

            <label className="block text-gray-300 mb-2">
              Password
            </label>

            <input
              type="password"
              placeholder="Masukkan password..."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="
                w-full
                p-3
                rounded-xl
                bg-gray-800
                border
                border-gray-700
                text-white
                placeholder-gray-500
                focus:outline-none
                focus:ring-2
                focus:ring-blue-400
              "
            />

          </div>

          {/* BUTTON */}
          <button
            type="submit"
            className="
              w-full
              bg-blue-500
              hover:bg-blue-600
              transition
              duration-200
              text-white
              py-3
              rounded-xl
              font-semibold
              shadow-lg
            "
          >
            Register
          </button>

        </form>

        {/* LINK LOGIN */}
        <p className="text-center text-gray-400 mt-6 text-sm">

          Sudah punya akun?{" "}

          <a
            href="/"
            className="text-blue-400 hover:text-blue-300"
          >
            Login
          </a>

        </p>

      </div>
    </div>
  );
}

export default Register;