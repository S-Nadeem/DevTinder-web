import PropTypes from "prop-types";

const ErrorPage = ({ err }) => {
  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-blue-400 to-purple-600">
      <div className="max-w-md p-10 text-center bg-white rounded-lg shadow-lg">
        <h1 className="font-extrabold text-blue-600 text-7xl">404</h1>
        <p className="mt-4 text-2xl font-semibold text-gray-800">
          Something went Wrong
        </p>
        <p className="mt-2 text-gray-600">{err}</p>
        <div className="mt-6">
          <a
            href="/"
            className="px-6 py-2 text-lg text-white bg-blue-600 rounded-lg shadow-md hover:bg-blue-700"
          >
            Go Home
          </a>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;

ErrorPage.propTypes = {
  err: PropTypes.string,
};
