import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useLocation } from 'react-router'
import AuthLayout from '../components/forms/AuthLayout'
import SignupForm from '../components/forms/SignupForm'
import Alert from '../components/ui/Alert'
import { register, clearError } from '../store/slices/authSlice'

export default function SignupPage() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const { status, error } = useSelector((state) => state.auth)
  const from = location.state?.from ?? '/home'

  useEffect(() => {
    dispatch(clearError())
  }, [dispatch])

  const onSubmit = async (data) => {
    const result = await dispatch(
      register({
        username: data.name,
        email: data.email,
        password: data.password,
        role: data.role ?? 'user',
      }),
    )
    if (register.fulfilled.match(result)) {
      navigate(from, { replace: true })
    }
  }

  return (
    <AuthLayout
      title="Create your account"
      subtitle="Start your own library and share your sound."
      footer={
        <>
          Already have an account?{' '}
          <button
            type="button"
            onClick={() => navigate('/login')}
            className="focus-ring rounded font-semibold text-accent-400 transition-colors hover:text-accent-300"
          >
            Log in
          </button>
        </>
      }
    >
      {error && <Alert className="mb-5">{error}</Alert>}
      <SignupForm onSubmit={status === 'loading' ? undefined : onSubmit} />
    </AuthLayout>
  )
}
