import { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext); // ✅ Move this here

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/auth/login", formData);
      const { token, user } = res.data;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      setUser(user); // ✅ Update context
      navigate("/");

      window.showToast("Login successful!", "success");

      document.getElementById("my_modal_3").close();
    } catch (err) {
      console.error("Login error:", err);
      window.showToast(err.response?.data?.message || "Login failed", "error");
    }
  };

  return (
    <div>
      <dialog id='my_modal_3' className='modal'>
        <div className='modal-box md:w-110 md:px-20 w-auto px-10 mx-10 rounded-3xl'>
          <form onSubmit={handleSubmit}>
            <button
              type='button'
              className='px-2 absolute text-xl text-gray-500 right-2 top-2 cursor-pointer hover:text-black'
              onClick={() => document.getElementById("my_modal_3").close()}
            >
              ✕
            </button>
            <div className='w-full justify-items-center'>
              <h2 className='font-bold mb-5 text-2xl'>Login to your account</h2>
            </div>

            <div className='flex flex-col gap-6'>
              <div className='grid'>
                <label htmlFor='email'>Email</label>
                <input
                  id='email'
                  name='email'
                  type='email'
                  value={formData.email}
                  onChange={handleChange}
                  placeholder='me@example.com'
                  className='outline-none border border-gray-300 rounded-2xl p-3 text-l'
                  required
                />
              </div>

              <div className='grid'>
                <div className='flex'>
                  <label htmlFor='password'>Password</label>
                  <a
                    href='#'
                    className='ml-auto inline-block font-semibold text-sm underline-offset-4 hover:underline text-blue-700'
                  >
                    Forgot your password?
                  </a>
                </div>
                <input
                  id='password'
                  name='password'
                  type='password'
                  value={formData.password}
                  onChange={handleChange}
                  placeholder='Password'
                  className='outline-none border border-gray-300 rounded-2xl p-3 text-l mb-7'
                  required
                />
              </div>
            </div>

            <button
              type='submit'
              className='w-full bg-black text-white rounded-xl py-2 cursor-pointer font-semibold hover:bg-blue-800 duration-500'
            >
              Login
            </button>
          </form>

          <div className='w-full text-center text-sm font-bold my-2'>OR</div>
          <button className='w-full outline rounded-md py-2 cursor-pointer'>
            Login with Google
          </button>
          <div className='w-full text-center text-sm mt-2'>
            <a href='/register' className='cursor-pointer font-semibold'>
              Don't have an Account? Sign Up
            </a>
          </div>
        </div>
      </dialog>
    </div>
  );
}

export default Login;
