import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useLocation } from 'react-router'
import AuthLayout from '../components/forms/AuthLayout'
import LoginForm from '../components/forms/LoginForm'
import Alert from '../components/ui/Alert'
import { login, clearError } from '../store/slices/authSlice'

export default function LoginPage() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const { status, error } = useSelector((state) => state.auth)
  const from = location.state?.from ?? '/home'

  useEffect(() => {
    dispatch(clearError())
  }, [dispatch])

  const onSubmit = async (data) => {
    const payload = {
      email: data.email.toLowerCase().trim(),
      password: data.password.trim(),
    }
    const result = await dispatch(login(payload))
    if (login.fulfilled.match(result)) {
      navigate(from, { replace: true })
    }
  }

  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Log in to pick up where you left off."
      footer={
        <>
          New to PulsePlay?{' '}
          <button
            type="button"
            onClick={() => navigate('/signup')}
            className="focus-ring rounded font-semibold text-accent-400 transition-colors hover:text-accent-300"
          >
            Create an account
          </button>
        </>
      }
    >
      {error && <Alert className="mb-5">{error}</Alert>}
      <LoginForm onSubmit={status === 'loading' ? undefined : onSubmit} />
    </AuthLayout>
  )
}
