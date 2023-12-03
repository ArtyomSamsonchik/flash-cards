import { ElementRef, forwardRef } from 'react'

import getClassNames, { ClassesObj } from '@/app/helpers/get-class-names'
import { Input, InputProps, InputSlot, InputSlotModifier } from '@/app/ui/input'
import { Typography } from '@/app/ui/typography'

import s from './text-field.module.scss'

export type TextFieldSlot = 'label' | 'message' | 'textFieldRoot' | InputSlot
export type TextFieldClasses = ClassesObj<TextFieldSlot, InputSlotModifier>

type OwnProps = {
  classes?: TextFieldClasses
  label?: string
  message?: string
}

export type TextFieldProps = OwnProps & Omit<InputProps, keyof OwnProps>

const textFieldSlots: TextFieldSlot[] = ['textFieldRoot', 'label', 'message', 'root', 'input']

export const TextField = forwardRef<ElementRef<'input'>, TextFieldProps>(
  ({ classes, disabled, error, label, message, ...props }, ref) => {
    const cls = getClassNames(textFieldSlots, { disabled, error })(s, classes)

    return (
      <div className={cls.textFieldRoot}>
        <Typography as={'span'} className={cls.label} variant={'body2'}>
          {label}
        </Typography>
        <Input classes={cls} disabled={disabled} error={error} ref={ref} {...props} />
        <Typography as={'span'} className={cls.message} variant={'caption'}>
          {message}
        </Typography>
      </div>
    )
  }
)
