import { FC } from 'react'
import { SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form'

import { Button } from '@/app/ui/button'
import { Card } from '@/app/ui/card'
import { PasswordField, PasswordFieldClasses } from '@/app/ui/password-field'
import { Typography } from '@/app/ui/typography'
import { password as passwordSchema } from '@/app/validation-schemas'
import { DevTool } from '@hookform/devtools'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import s from './new-password.module.scss'

const validationSchema = z
  .object({
    confirmPassword: passwordSchema,
    password: passwordSchema,
  })
  .refine(data => data.password === data.confirmPassword, {
    message: 'The passwords do not match',
    path: ['confirmPassword'],
  })

type FormValues = z.infer<typeof validationSchema>

type NewPasswordProps = {
  onSubmit: SubmitHandler<FormValues>
  onSubmitError?: SubmitErrorHandler<FormValues>
}

const passwordFieldClasses: PasswordFieldClasses = {
  input: s.input,
  inputDisabled: s.inputDisabled,
  textFieldRoot: s.field,
}

export const NewPassword: FC<NewPasswordProps> = ({ onSubmit, onSubmitError }) => {
  const {
    control,
    formState: { errors, isSubmitting },
    handleSubmit,
    register,
  } = useForm<FormValues>({
    defaultValues: {
      confirmPassword: '',
      password: '',
    },
    resolver: zodResolver(validationSchema),
  })

  return (
    <Card className={s.container}>
      <Typography className={s.title} variant={'large'}>
        Create new password
      </Typography>
      <form className={s.form} onSubmit={handleSubmit(onSubmit, onSubmitError)}>
        {import.meta.env.DEV && <DevTool control={control} />}
        <PasswordField
          classes={passwordFieldClasses}
          {...register('password')}
          disabled={isSubmitting}
          error={!!errors.password}
          label={'Password'}
          message={errors.password?.message || ' '}
        />
        <PasswordField
          classes={passwordFieldClasses}
          {...register('confirmPassword')}
          disabled={isSubmitting}
          error={!!errors.confirmPassword}
          label={'Confirm Password'}
          message={errors.confirmPassword?.message || ' '}
        />

        <Typography className={s.caption} variant={'body2'}>
          Create new password and we will send you further instructions to email
        </Typography>
        <Button classes={{ root: s.button }} disabled={isSubmitting} fullWidth type={'submit'}>
          Create New Password
        </Button>
      </form>
    </Card>
  )
}
