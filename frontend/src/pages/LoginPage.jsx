import AuthLayout from '../components/forms/AuthLayout'
import LoginForm from '../components/forms/LoginForm'

/**
 * Login screen — form UI only.
 */
export default function LoginPage({ onSubmit, onSwitchMode }) {
  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Log in to pick up where you left off."
      footer={
        <>
          New to PulsePlay?{' '}
          <button
            type="button"
            onClick={onSwitchMode}
            className="focus-ring rounded font-semibold text-accent-400 transition-colors hover:text-accent-300"
          >
            Create an account
          </button>
        </>
      }
    >
      <LoginForm onSubmit={onSubmit} />
    </AuthLayout>
  )
}
