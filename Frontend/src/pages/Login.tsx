import { Link, useNavigate } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import toast from 'react-hot-toast';
import { useAppDispatch, useAppSelector } from '../hooks';
import { login } from '../features/auth/authSlice';
import { useEffect, useState } from 'react';
import axios from 'axios';

interface SignInForm {
  email: string;
  password: string;
  role: string;
}

const Login = () => {
  const initialValues: SignInForm = {
    email: '',
    password: '',
    role: '',
  };

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (values: SignInForm) => {
    const promise = new Promise(async (resolve, reject) => {
      setTimeout(async () => {
        try {
          setLoading(true);
          const res = await axios.post(
            `${import.meta.env.VITE_API_URL}/api/user/login`,
            values
          );
          console.log(res.data);
          dispatch(login({ user: res.data.data, token: res.data.token }));
          resolve('Logged in');
        } catch (err: any) {
          reject(err.response?.data?.message || 'Error logging in!');
        } finally {
          setLoading(false);
        }
      }, 2000);
    });
    
    await toast.promise(promise, {
      loading: 'Logging in...',
      success: 'Logged in successfully!',
      error: (err) => err || 'Error logging in!',
    });
  };

  useEffect(() => {
    if (user?.role === 'admin') navigate('/admin-dashboard');
    else if (user?.role === 'user') navigate('/user-dashboard');
  }, [user, navigate]);

  return (
    <div className="w-full max-w-sm p-8 bg-white rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.05)] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Login</h2>
      <Formik
        initialValues={initialValues}
        validateOnChange={false}
        onSubmit={async (values, actions) => {
          await handleLogin(values);
          actions.setSubmitting(false);
        }}
      >
        <Form className="space-y-5">
          <div>
            <label className="block mb-1 text-gray-600 text-sm">Email</label>
            <Field
              id="email"
              name="email"
              type="email"
              className="w-full px-4 py-2 bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-300"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label className="block mb-1 text-gray-600 text-sm">Password</label>
            <Field
              id="password"
              name="password"
              type="password"
              className="w-full px-4 py-2 bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-300"
              placeholder="••••••••"
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
              <option value="" disabled>
                Select role
              </option>
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </Field>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 bg-gray-800 text-white rounded-md shadow hover:bg-gray-700 transition"
          >
            {loading ? 'Signing In...' : 'Sign In'}
          </button>
        </Form>
      </Formik>
      <p className="mt-6 text-sm text-center text-gray-500">
        Don't have an account?{' '}
        <Link to={'/register'} className="text-gray-700 hover:underline">
          Sign up
        </Link>
      </p>
    </div>
  );
};

export default Login;
