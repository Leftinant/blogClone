import { useState } from "react";
import Login from "./Login";
import { Home } from "lucide-react";
import { Link } from "react-router-dom";
import axios from "axios";

function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      window.showToast("Passwords do not match!", "info");
      return;
    }

    try {
      const res = await axios.post("/api/auth/register", {
        username: formData.name,
        email: formData.email,
        password: formData.password,
      });

      const token = res.data.token;
      localStorage.setItem("token", token);

      console.log("Registration successful");
      window.showToast("Account created!", "success");
      setFormData({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
      document.getElementById("my_modal_3").showModal();
    } catch (error) {
      console.error("Registration failed:", error.response?.data || error);
      window.showToast("Something went wrong", "error");
    }
  };

  return (
    <>
      <div className='max-w-screen-2xl container mx-auto  fixed top-0 left-0 right-0 z-99'>
        <div className='navbar shadow-sm '>
          <div className='navbar-start'>
            <Link to='/'>
              <Home className='w-6 h-6 text-base-content hover:text-primary cursor-pointer mx-3' />
            </Link>
          </div>
        </div>
      </div>
      <div className=' flex h-screen items-center justify-center'>
        <div className='max-w-md  mx-auto p-6 rounded-xl shadow-md'>
          <div className='relative'>
            <h2 className='text-2xl font-bold mb-4'>Create an Account</h2>
            <span className='absolute font-bold top-0 right-0 text-'>
              or{" "}
              <a
                className='text-blue-700 cursor-pointer'
                onClick={() =>
                  document.getElementById("my_modal_3").showModal()
                }
              >
                Login
              </a>
            </span>
            <Login />
          </div>
          <div className='mx-10'>
            <form onSubmit={handleSubmit} className='space-y-4'>
              <div className='form-control'>
                <label className='text-sm'>Name</label>
                <input
                  type='text'
                  name='name'
                  className=' input border-primary-content w-full rounded-2xl px-3 text-l'
                  placeholder='Full Name'
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className='form-control'>
                <label className='text-sm'>Email</label>
                <input
                  type='email'
                  name='email'
                  className='input border-primary-content w-full rounded-2xl p-3 text-l'
                  placeholder='me@example.com'
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className='form-control'>
                <label className='text-sm'>Password</label>
                <input
                  type='password'
                  name='password'
                  className='input border-primary-content w-full rounded-2xl p-3 text-l'
                  placeholder='••••••••'
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                <p className='w-full text-xs pl-2 pt-2 text-gray-700'>
                  Use 8 or more letters, numbers and symbols
                </p>
              </div>

              <div className='form-control'>
                <label className='text-sm'>Confirm Password</label>
                <input
                  type='password'
                  name='confirmPassword'
                  className='input border-primary-content w-full rounded-2xl p-3 text-l'
                  placeholder='••••••••'
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className='form-control'>
                <button
                  type='submit'
                  className=' w-full rounded-2xl bg-black hover:bg-blue-800 duration-500 text-white py-2 font-bold mt-2'
                >
                  Sign Up
                </button>
              </div>
              <div className='w-full text-center'>
                <p className='text-xs text-gray-700'>
                  By continuing, you agree to our{" "}
                  <span className='underline cursor-pointer'>
                    Terms and conditions
                  </span>{" "}
                  and acknowledge you've read our{" "}
                  <span className='underline cursor-pointer'>
                    Privacy Policy
                  </span>{" "}
                  .
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Signup;
