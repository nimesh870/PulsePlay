import { useSelector } from 'react-redux'
import { Navigate, Outlet, useLocation } from 'react-router'

/**
 * Guards the authenticated section of the app. Redirects to /login while
 * remembering the intended destination for post-login redirects.
 */
export default function ProtectedLayout() {
  const token = useSelector((state) => state.auth.token)
  const location = useLocation()

  if (!token) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: location.pathname + location.search }}
      />
    )
  }

  return <Outlet />
}
