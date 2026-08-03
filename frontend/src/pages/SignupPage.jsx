import AuthLayout from '../components/forms/AuthLayout'
import SignupForm from '../components/forms/SignupForm'

/**
 * Signup screen — form UI only.
 */
export default function SignupPage({ onSubmit, onSwitchMode }) {
  return (
    <AuthLayout
      title="Create your account"
      subtitle="Start your own library and share your sound."
      footer={
        <>
          Already have an account?{' '}
          <button
            type="button"
            onClick={onSwitchMode}
            className="focus-ring rounded font-semibold text-accent-400 transition-colors hover:text-accent-300"
          >
            Log in
          </button>
        </>
      }
    >
      <SignupForm onSubmit={onSubmit} />
    </AuthLayout>
  )
}
