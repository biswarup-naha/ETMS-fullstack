import { Link } from "react-router-dom";


const Register = () => {
  return (
    <div className="w-full max-w-sm p-8 bg-white rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.05)] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Create Account</h2>
      <form className="space-y-5">
        <div>
          <label className="block mb-1 text-gray-600 text-sm">Full Name</label>
          <input
            type="text"
            className="w-full px-4 py-2 bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-300"
            placeholder="John Doe"
          />
        </div>
        <div>
          <label className="block mb-1 text-gray-600 text-sm">Email</label>
          <input
            type="email"
            className="w-full px-4 py-2 bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-300"
            placeholder="you@example.com"
          />
        </div>
        <div>
          <label className="block mb-1 text-gray-600 text-sm">Password</label>
          <input
            type="password"
            className="w-full px-4 py-2 bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-300"
            placeholder="••••••••"
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 bg-gray-800 text-white rounded-md shadow hover:bg-gray-700 transition"
        >
          Register
        </button>
      </form>
      <p className="mt-6 text-sm text-center text-gray-500">
        Already have an account? <Link to={'/login'} className="text-gray-700 hover:underline">Login</Link>
      </p>
    </div>
  );
};

export default Register;
