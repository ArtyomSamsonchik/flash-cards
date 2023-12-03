import { ChangeEvent, ComponentPropsWithoutRef, ElementRef, ReactNode, forwardRef } from 'react'

import getClassNames, { ClassesObj } from '@/app/helpers/get-class-names'

import s from './input.module.scss'

export type InputSlot = 'input' | 'root'
export type InputSlotModifier = 'disabled' | 'error'
export type InputClasses = ClassesObj<InputSlot, InputSlotModifier>

type OwnProps = {
  classes?: InputClasses
  endAdornment?: ReactNode
  error?: boolean
  onValueChange?: (value: string) => void
  startAdornment?: ReactNode
  type?: 'password' | 'search' | 'text'
}

export type InputProps = OwnProps &
  Omit<ComponentPropsWithoutRef<'input'>, 'className' | keyof OwnProps>

export const Input = forwardRef<ElementRef<'input'>, InputProps>(
  (
    { classes, disabled, endAdornment, error, onChange, onValueChange, startAdornment, ...props },
    ref
  ) => {
    const cls = getClassNames(['root', 'input'] as InputSlot[], { disabled, error })(s, classes)

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      onChange?.(e)
      onValueChange?.(e.target.value)
    }

    return (
      <div className={cls.root}>
        {startAdornment && startAdornment}
        <input
          className={cls.input}
          disabled={disabled}
          onChange={handleChange}
          ref={ref}
          {...props}
        />
        {endAdornment && endAdornment}
      </div>
    )
  }
)
