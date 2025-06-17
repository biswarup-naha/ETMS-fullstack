import { Link, useNavigate } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import axios from "axios";
import toast from "react-hot-toast";
import { useAppDispatch, useAppSelector } from "../hooks";
import { useEffect, useState } from "react";
import { login } from "../features/auth/authSlice";

interface SignUpForm {
  fullName: string;
  email: string;
  password: string;
  role: string;
  isActive: boolean;
}

const Register = () => {
  const initialValues: SignUpForm = {
    fullName: "",
    email: "",
    password: "",
    role: "",
    isActive: true,
  };

  const [loading, setLoading] = useState(false);
  const {user}=useAppSelector((state)=>state.auth)
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSignup = async (values: SignUpForm) => {
    setLoading(true);

    const promise = new Promise(async (resolve, reject) => {
      setTimeout(async () => {
        try {
          const res = await axios.post(
            `${import.meta.env.VITE_API_URL}/api/user/register`,
            values
          );

          dispatch(login({ user: res.data.data, token: res.data.token }));

          resolve('Signed up');
        } catch (err: any) {
          reject(err.response?.data?.message || 'Signup failed!');
        } finally {
          setLoading(false);
        }
      }, 2000);
    });

    await toast.promise(promise, {
      loading: 'Signing up...',
      success: 'Account created!',
      error: (err) => err,
    });
  };

  useEffect(() => {
    if(user?.role==='admin') navigate('/admin-dashboard');
    else if (user?.role === 'user') navigate('/user-dashboard');
    else navigate('/login');
  }, [user, navigate]);

  return (
    <div className="w-full max-w-sm p-8 bg-white rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.05)] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Create Account</h2>
      <Formik
        initialValues={initialValues}
        validateOnChange={false}
        onSubmit={(values, actions) => {
          // console.log({ values });
          handleSignup(values);
          actions.setSubmitting(false);
        }}
      >
        <Form className="space-y-5">
          <div>
            <label className="block mb-1 text-gray-600 text-sm">Full Name</label>
            <Field
              id="fullName"
              name="fullName"
              type="text"
              placeholder="Enter your name"
              className="w-full px-4 py-2 bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-300"
            />
          </div>
          <div>
            <label className="block mb-1 text-gray-600 text-sm">Email</label>
            <Field
              id="email"
              name="email"
              type="email"
              placeholder="you@example.com"
              className="w-full px-4 py-2 bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-300"
            />
          </div>
          <div>
            <label className="block mb-1 text-gray-600 text-sm">Password</label>
            <Field
              id="password"
              name="password"
              type="password"
              placeholder="••••••••"
              className="w-full px-4 py-2 bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-300"
            />
          </div>
          <div>
            <label className="block mb-1 text-gray-600 text-sm">Role</label>
            <Field
              as="select"
              id="role"
              name="role"
              className="w-full px-4 py-2 bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-300"
            >
              <option value="" disabled>Select role</option>
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </Field>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 bg-gray-800 text-white rounded-md shadow hover:bg-gray-700 transition"
          >
            {loading ? 'Registering...' : 'Register'}
          </button>
        </Form>
      </Formik>
      <p className="mt-6 text-sm text-center text-gray-500">
        Already have an account?{" "}
        <Link to="/login" className="text-gray-700 hover:underline">
          Login
        </Link>
      </p>
    </div>
  );
};

export default Register;
