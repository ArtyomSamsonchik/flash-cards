import { useForm } from 'react-hook-form'

import { Button } from '@/app/ui/button'
import { Card } from '@/app/ui/card'
import { TextField } from '@/app/ui/text-field'
import { Typography } from '@/app/ui/typography'
import { DevTool } from '@hookform/devtools'
import { zodResolver } from '@hookform/resolvers/zod'
import { string, z } from 'zod'

import s from './sign-up-form.module.scss'

const passwordSchema = string()
  .min(3, 'Password must contain at least 3 character(s)')
  .max(30, 'Password must contain at most 30 character(s)')

// TODO: think about schemas inheritance in login and sign up forms
const signUpSchema = z
  .object({
    confirmPassword: passwordSchema,
    email: string().trim().email('Invalid email'),
    password: passwordSchema,
  })
  .refine(data => data.password === data.confirmPassword, {
    message: 'The passwords do not match',
    path: ['confirmPassword'],
  })

type FormValues = z.infer<typeof signUpSchema>

export const SignUpForm = () => {
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

  const onSubmit = (data: FormValues) => {
    console.log('submit', data)
  }

  return (
    <Card className={s.container}>
      <Typography className={s.header} variant={'large'}>
        Sign Up
      </Typography>
      <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
        <DevTool control={control} />

        <TextField
          {...register('email')}
          disabled={isSubmitting}
          errorMessage={errors.email?.message}
          label={'email'}
        />

        <TextField
          {...register('password')}
          disabled={isSubmitting}
          errorMessage={errors.password?.message}
          label={'password'}
          type={'password'}
        />

        <TextField
          {...register('confirmPassword')}
          disabled={isSubmitting}
          errorMessage={errors.confirmPassword?.message}
          label={'confirm password'}
          type={'password'}
        />
        <Button disabled={isSubmitting} fullWidth>
          Submit
        </Button>
      </form>
    </Card>
  )
}
