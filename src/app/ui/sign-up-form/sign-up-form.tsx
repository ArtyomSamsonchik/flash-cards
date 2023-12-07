import { FC } from 'react'
import { SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form'

import { Button } from '@/app/ui/button'
import { Card } from '@/app/ui/card'
import { PasswordField } from '@/app/ui/password-field'
import { TextField, TextFieldClasses } from '@/app/ui/text-field'
import { Typography } from '@/app/ui/typography'
import { signUp as signUpSchema } from '@/app/validation-schemas'
import { DevTool } from '@hookform/devtools'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import s from './sign-up-form.module.scss'

type FormValues = z.infer<typeof signUpSchema>

const classes: TextFieldClasses = {
  input: s.input,
  inputDisabled: s.inputDisabled,
  textFieldRoot: s.field,
}

type SignUpFormProps = {
  onSubmit: SubmitHandler<FormValues>
  onSubmitError?: SubmitErrorHandler<FormValues>
}

export const SignUpForm: FC<SignUpFormProps> = ({ onSubmit, onSubmitError }) => {
  const {
    control,
    formState: { errors, isSubmitting },
    handleSubmit,
    register,
  } = useForm<FormValues>({
    defaultValues: {
      confirmPassword: '',
      email: '',
      password: '',
    },
    resolver: zodResolver(signUpSchema),
  })

  return (
    <Card className={s.container}>
      <Typography className={s.title} variant={'large'}>
        Sign Up
      </Typography>
      <form className={s.form} onSubmit={handleSubmit(onSubmit, onSubmitError)}>
        {import.meta.env.DEV && <DevTool control={control} />}
        <TextField
          classes={classes}
          {...register('email')}
          disabled={isSubmitting}
          error={!!errors.email}
          label={'Email'}
          message={errors.email?.message || ' '}
        />
        <PasswordField
          classes={classes}
          {...register('password')}
          disabled={isSubmitting}
          error={!!errors.password}
          label={'Password'}
          message={errors.password?.message || ' '}
        />
        <PasswordField
          classes={classes}
          {...register('confirmPassword')}
          disabled={isSubmitting}
          error={!!errors.confirmPassword}
          label={'Confirm Password'}
          message={errors.confirmPassword?.message || ' '}
        />

        <Button classes={{ root: s.button }} disabled={isSubmitting} fullWidth type={'submit'}>
          Sign Up
        </Button>
        <Typography className={s.caption} variant={'body2'}>
          Already have an account?
        </Typography>
        <Typography className={s.link} variant={'link1'}>
          Sign In
        </Typography>
      </form>
    </Card>
  )
}
