import { useForm } from 'react-hook-form'
import { RiMailLine, RiLockPasswordLine } from 'react-icons/ri'
import Button from '../ui/Button'
import Input from './Input'
import Checkbox from './Checkbox'

const emailRules = {
  pattern: {
    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    message: 'Enter a valid email address',
  },
}

/**
 * Login form — UI only, submission wired via `onSubmit`.
 */
export default function LoginForm({ onSubmit }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ defaultValues: { email: '', password: '', remember: false } })

  const submit = onSubmit ? handleSubmit(onSubmit) : undefined

  return (
    <form onSubmit={submit} noValidate className="space-y-5">
      <Input
        label="Email"
        name="email"
        type="email"
        register={register}
        required
        rules={emailRules}
        error={errors.email}
        placeholder="you@example.com"
        leftIcon={RiMailLine}
      />

      <div className="space-y-1.5">
        <Input
          label="Password"
          name="password"
          type="password"
          register={register}
          required
          error={errors.password}
          placeholder="Your password"
          leftIcon={RiLockPasswordLine}
        />
        <div className="flex justify-end">
          <button
            type="button"
            className="focus-ring rounded-full text-xs font-semibold text-ink-500 transition-colors hover:text-accent-400"
          >
            Forgot password?
          </button>
        </div>
      </div>

      <Checkbox
        label="Keep me signed in"
        name="remember"
        register={register}
      />

      <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
        Log in
      </Button>
    </form>
  )
}
