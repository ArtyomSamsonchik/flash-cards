import { FC } from 'react'
import { SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form'

import { Button } from '@/app/ui/button'
import { Card } from '@/app/ui/card'
import { TextField } from '@/app/ui/text-field'
import { Typography } from '@/app/ui/typography'
import { email as emailSchema } from '@/app/validation-schemas'
import { DevTool } from '@hookform/devtools'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import s from './recover-password.module.scss'

const validationSchema = z.object({ email: emailSchema })

type FormValues = z.infer<typeof validationSchema>

type RecoverPasswordProps = {
  onSubmit: SubmitHandler<FormValues>
  onSubmitError?: SubmitErrorHandler<FormValues>
}

// TODO: Give the forms shorter names. Place them all in the 'auth' folder.
export const RecoverPassword: FC<RecoverPasswordProps> = ({ onSubmit, onSubmitError }) => {
  const {
    control,
    formState: { errors, isSubmitting },
    handleSubmit,
    register,
  } = useForm<FormValues>({
    defaultValues: { email: '' },
    resolver: zodResolver(validationSchema),
  })

  return (
    <Card className={s.container}>
      <Typography className={s.title} variant={'large'}>
        Forgot your password?
      </Typography>
      <form className={s.form} onSubmit={handleSubmit(onSubmit, onSubmitError)}>
        {import.meta.env.DEV && <DevTool control={control} />}
        <TextField
          classes={{
            input: s.input,
            inputDisabled: s.inputDisabled,
            textFieldRoot: s.field,
          }}
          {...register('email')}
          disabled={isSubmitting}
          error={!!errors.email}
          label={'Email'}
          message={errors.email?.message || ' '}
        />
        <Typography className={s.caption} variant={'body2'}>
          Enter your email address and we will send you further instructions{' '}
        </Typography>

        <Button classes={{ root: s.button }} disabled={isSubmitting} fullWidth type={'submit'}>
          Send Instructions
        </Button>
        <Typography className={s.hint} variant={'body2'}>
          Did you remember your password?
        </Typography>
        <Typography className={s.link} variant={'link1'}>
          Try logging in
        </Typography>
      </form>
    </Card>
  )
}
