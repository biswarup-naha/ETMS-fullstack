import { Link } from 'react-router-dom';
import {Formik, Form, Field} from 'formik';
import toast from 'react-hot-toast';
import axios from 'axios';

interface SignInForm {
  email: string;
  password: string;
  role: string;
 }

const Login = () => {

  const initialValues: SignInForm = {
    email: "",
    password: "",
    role: "",
  };

  const handleLogin = async (values: SignInForm) => {
    // console.log(values);
    try {
      await toast.promise(
        new Promise((resolve, reject) => {
          setTimeout(() => {
            axios
              .post(`${import.meta.env.VITE_API_URL}/api/user/login`, values)
              .then(resolve)
              .catch(reject);
          }, 3000);
        }),
        {
          loading: "Logging in...",
          success: "Logged in successfully!",
          error: "Error logging in!",
        },
        {
          success: {
            duration: 5000,
          },
        }
      );
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  };

    return (
        <div className="w-full max-w-sm p-8 bg-white rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.05)] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Login</h2>
        <Formik
          initialValues={initialValues}
          validateOnChange={false}
          onSubmit={(values, actions) => {
            // console.log({ values });
            handleLogin(values);
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
                <option value="" disabled>Select role</option>
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </Field>
            </div>
            <button
              type="submit"
              className="w-full py-2 bg-gray-800 text-white rounded-md shadow hover:bg-gray-700 transition"
            >
              Sign In
            </button>
          </Form>
        </Formik>
          <p className="mt-6 text-sm text-center text-gray-500">
            Don't have an account? <Link to={'/register'} className="text-gray-700 hover:underline">Sign up</Link>
          </p>
        </div>
      );
}

export default Login