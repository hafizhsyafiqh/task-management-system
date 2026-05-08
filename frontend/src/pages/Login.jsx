import { useState } from "react";
import axios from "axios";

function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {

      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          email,
          password,
        }
      );

      localStorage.setItem("token", res.data.token);

      alert("Login berhasil 🚀");

      window.location.href = "/dashboard";

    } catch (err) {

      console.error(err);

      alert("Login gagal ❌");
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center">

      <div className="bg-gray-900 p-8 rounded-xl w-[400px]">

        <h1 className="text-white text-3xl font-bold mb-6 text-center">
          Login
        </h1>

        <form onSubmit={handleLogin}>

          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 rounded bg-gray-800 text-white mb-4"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 rounded bg-gray-800 text-white mb-4"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="submit"
            className="w-full bg-blue-500 p-3 rounded text-white"
          >
            Login
          </button>

        </form>

        <p className="text-gray-400 mt-4 text-center">

          Belum punya akun?{" "}

          <a
            href="/register"
            className="text-blue-400"
          >
            Register
          </a>

        </p>

      </div>

    </div>
  );
}

export default Login;