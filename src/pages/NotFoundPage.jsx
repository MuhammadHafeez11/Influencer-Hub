import { Link } from "react-router-dom"

const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-gradient bg-gradient-to-r from-pink-500 to-violet-500">404</h1>
          <h2 className="mt-6 text-3xl font-bold text-gray-900">Page Not Found</h2>
          <p className="mt-2 text-lg text-gray-600">The page you're looking for doesn't exist or has been moved.</p>
        </div>
        <div className="flex justify-center">
          <Link to="/" className="btn-primary">
            Go Back Home
          </Link>
        </div>
      </div>
    </div>
  )
}

export default NotFoundPage
