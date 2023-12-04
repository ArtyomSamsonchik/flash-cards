import { ElementRef, forwardRef, useState } from 'react'

import getClassNames, { ClassesObj } from '@/app/helpers/get-class-names'
import { InputSlotModifier } from '@/app/ui/input'
import { InputAdornment } from '@/app/ui/input-adornment'
import { TextField, TextFieldProps, TextFieldSlot } from '@/app/ui/text-field/text-field'
import { EyeIcon } from '@/icons/eye-icon'
import { EyeOffIcon } from '@/icons/eye-off-icon'

import s from './password-field.module.scss'

export type PasswordFieldSlot = 'button' | 'icon' | TextFieldSlot
export type PasswordFieldClasses = ClassesObj<PasswordFieldSlot, InputSlotModifier>

type OwnProps = {
  classes?: PasswordFieldClasses
}
type PasswordFieldProps = OwnProps &
  Omit<TextFieldProps, 'endAdornment' | 'startAdornment' | 'type' | keyof OwnProps>

const passwordFieldSlots: PasswordFieldSlot[] = [
  'textFieldRoot',
  'root',
  'message',
  'label',
  'input',
  'button',
  'icon',
]

export const PasswordField = forwardRef<ElementRef<'input'>, PasswordFieldProps>(
  ({ classes, disabled, error, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false)

    const cls = getClassNames(passwordFieldSlots, { disabled, error })(s, classes)
    const Icon = showPassword ? EyeOffIcon : EyeIcon

    return (
      <TextField
        classes={cls}
        disabled={disabled}
        endAdornment={
          <InputAdornment position={'end'}>
            <button
              className={cls.button}
              onClick={() => setShowPassword(prev => !prev)}
              type={'button'}
            >
              <Icon className={cls.icon} />
            </button>
          </InputAdornment>
        }
        error={error}
        ref={ref}
        type={showPassword ? 'text' : 'password'}
        {...props}
      />
    )
  }
)
