import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router'

/**
 * Restricts nested routes to a given user role (e.g. "artist").
 */
export default function RoleBasedRoute({ role }) {
  const user = useSelector((state) => state.auth.user)

  if (user?.role !== role) {
    return <Navigate to="/home" replace />
  }

  return <Outlet />
}
