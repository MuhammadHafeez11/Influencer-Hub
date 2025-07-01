import { Navigate } from "react-router-dom"
import { useSelector } from "react-redux"
import Loader from "../common/Loader"

const AdminRoute = ({ children }) => {
  const userLogin = useSelector((state) => state.userLogin)
  const { loading, userInfo } = userLogin

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader size="lg" />
      </div>
    )
  }

  if (!userInfo || userInfo.user.role !== "admin") {
    return <Navigate to="/login" replace />
  }

  return children
}

export default AdminRoute
