import { Navigate } from "react-router-dom"
import { useSelector } from "react-redux"
import Loader from "../common/Loader"

const PrivateRoute = ({ children }) => {
  const userLogin = useSelector((state) => state.userLogin)
  const { loading, userInfo } = userLogin

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader size="lg" />
      </div>
    )
  }

  if (!userInfo) {
    return <Navigate to="/login" replace />
  }

  return children
}

export default PrivateRoute
