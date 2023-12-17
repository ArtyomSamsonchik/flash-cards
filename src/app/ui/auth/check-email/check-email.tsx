import { FC } from 'react'

import { Button } from '@/app/ui/button'
import { Card } from '@/app/ui/card'
import { Typography } from '@/app/ui/typography'

import s from './check-email.module.scss'

export const CheckEmail: FC<{ email: string }> = ({ email }) => {
  return (
    <Card className={s.container}>
      <Typography className={s.title} variant={'large'}>
        Check Email
      </Typography>
      <img alt={'check email icon'} className={s.icon} src={'./src/assets/check-email-icon.svg'} />
      <Typography className={s.caption} variant={'body2'}>
        We’ve sent an Email with instructions to {email}
      </Typography>
      <Button classes={{ root: s.button }} fullWidth>
        Back to Sign In
      </Button>
    </Card>
  )
}
