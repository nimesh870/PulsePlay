import { useForm, useWatch } from 'react-hook-form'
import { RiUserLine, RiMailLine, RiLockPasswordLine } from 'react-icons/ri'
import Button from '../ui/Button'
import Input from './Input'
import Select from './Select'
import Checkbox from './Checkbox'

const roleOptions = [
  { value: 'user', label: 'Listener' },
  { value: 'artist', label: 'Artist' },
]

const emailRules = {
  pattern: {
    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    message: 'Enter a valid email address',
  },
}

const passwordRules = {
  minLength: { value: 8, message: 'Use at least 8 characters' },
}

/**
 * Signup form — UI only, submission wired via `onSubmit`.
 */
export default function SignupForm({ onSubmit }) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      role: 'user',
      terms: false,
    },
  })

  const submit = onSubmit ? handleSubmit(onSubmit) : undefined
  const passwordValue = useWatch({ control, name: 'password' })

  return (
    <form onSubmit={submit} noValidate className="space-y-5">
      <Input
        label="Full name"
        name="name"
        register={register}
        required
        error={errors.name}
        placeholder="How should we call you?"
        leftIcon={RiUserLine}
      />
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
      <Select
        label="Account type"
        name="role"
        register={register}
        options={roleOptions}
        error={errors.role}
        hint="Artists can upload music and create albums"
      />
      <div className="grid gap-5 sm:grid-cols-2">
        <Input
          label="Password"
          name="password"
          type="password"
          register={register}
          required
          rules={passwordRules}
          error={errors.password}
          placeholder="Min. 8 characters"
          leftIcon={RiLockPasswordLine}
        />
        <Input
          label="Confirm password"
          name="confirmPassword"
          type="password"
          register={register}
          required
          rules={{
            validate: (value) =>
              value === passwordValue || 'Passwords do not match',
          }}
          error={errors.confirmPassword}
          placeholder="Repeat password"
          leftIcon={RiLockPasswordLine}
        />
      </div>

      <Checkbox
        label={
          <>
            I agree to the <span className="text-accent-400">Terms</span> and{' '}
            <span className="text-accent-400">Privacy Policy</span>
          </>
        }
        name="terms"
        register={register}
        rules={{ required: 'You must accept the terms to continue' }}
        error={errors.terms}
      />

      <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
        Create account
      </Button>
    </form>
  )
}
