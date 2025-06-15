import { Link } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import axios from "axios";
import toast from "react-hot-toast";

interface SignupForm {
  fullName: string;
  email: string;
  password: string;
  role: string;
  isActive: boolean;
}

const Register = () => {
  const initialValues: SignupForm = {
    fullName: "",
    email: "",
    password: "",
    role: "",
    isActive: true,
  };

  const handleSubmit = async (values: SignupForm) => {
    // console.log(values);
    try {
      await toast.promise(
        new Promise((resolve, reject) => {
          setTimeout(() => {
            axios
              .post(`${import.meta.env.VITE_API_URL}/api/user/register`, values)
              .then(resolve)
              .catch(reject);
          }, 3000);
        }),
        {
          loading: "Registering...",
          success: "Registered successfully!",
          error: "Error registering!",
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
      <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Create Account</h2>
      <Formik
        initialValues={initialValues}
        validateOnChange={false}
        onSubmit={(values, actions) => {
          // console.log({ values });
          handleSubmit(values);
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
              placeholder="John Doe"
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
            className="w-full py-2 bg-gray-800 text-white rounded-md shadow hover:bg-gray-700 transition"
          >
            Register
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
