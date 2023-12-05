import { FC } from 'react'
import { Controller, SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form'

import { Button } from '@/app/ui/button'
import { Card } from '@/app/ui/card'
import { Checkbox } from '@/app/ui/checkbox'
import { PasswordField } from '@/app/ui/password-field'
import { TextField, TextFieldClasses } from '@/app/ui/text-field'
import { Typography } from '@/app/ui/typography'
import { DevTool } from '@hookform/devtools'
import { zodResolver } from '@hookform/resolvers/zod'
import { clsx } from 'clsx'
import { z } from 'zod'

import s from './sign-in-form.module.scss'

// TODO: extract validation schemas from sign up and sign in forms to separate file
const signInSchema = z.object({
  email: z.string().trim().email('Invalid email'),
  password: z
    .string()
    .min(3, 'Password must contain at least 3 character(s)')
    .max(30, 'Password must contain at most 30 character(s)'),
  rememberMe: z.boolean().optional(),
})

const getFieldClasses = (last = false): TextFieldClasses => ({
  input: s.input,
  inputDisabled: s.inputDisabled,
  textFieldRoot: clsx(s.field, last && s.fieldLast),
})

type FormValues = z.infer<typeof signInSchema>

type SignInFormProps = {
  onSubmit: SubmitHandler<FormValues>
  onSubmitError?: SubmitErrorHandler<FormValues>
}

export const SignInForm: FC<SignInFormProps> = ({ onSubmit, onSubmitError }) => {
  const {
    control,
    formState: { errors, isSubmitting },
    handleSubmit,
    register,
  } = useForm<FormValues>({
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
    resolver: zodResolver(signInSchema),
  })

  return (
    <Card className={s.container}>
      <Typography className={s.title} variant={'large'}>
        Sign In
      </Typography>
      <form className={s.form} onSubmit={handleSubmit(onSubmit, onSubmitError)}>
        {import.meta.env.DEV && <DevTool control={control} />}
        <TextField
          classes={getFieldClasses()}
          {...register('email')}
          disabled={isSubmitting}
          error={!!errors.email}
          label={'Email'}
          message={errors.email?.message || ' '}
        />
        <PasswordField
          classes={getFieldClasses(true)}
          {...register('password')}
          disabled={isSubmitting}
          error={!!errors.password}
          label={'Password'}
          message={errors.password?.message || ' '}
        />
        <Controller
          control={control}
          name={'rememberMe'}
          render={({ field: { onChange, value, ...field }, formState: { isSubmitting } }) => (
            <Checkbox
              checked={value}
              classes={{ wrapper: s.checkbox }}
              disabled={isSubmitting}
              label={'Remember me'}
              onCheckedChange={onChange}
              {...field}
            />
          )}
        />

        <Typography as={'a'} className={s.recoveryLink} variant={'body2'}>
          Forgot Password?
        </Typography>
        <Button classes={{ root: s.button }} disabled={isSubmitting} fullWidth type={'submit'}>
          Sign In
        </Button>
        <Typography className={s.caption} variant={'body2'}>
          Don&apos;t have an account?
        </Typography>
        <Typography className={s.signUpLink} variant={'link1'}>
          Sign Up
        </Typography>
      </form>
    </Card>
  )
}
