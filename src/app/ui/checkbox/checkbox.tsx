import type { CheckboxProps as RadixCheckboxProps } from '@radix-ui/react-checkbox'

import { ReactElement, forwardRef, useId } from 'react'

import getClassNames, { ClassesObj } from '@/app/helpers/get-class-names'
import { Typography } from '@/app/ui/typography'
import { CheckedIcon } from '@/icons/checked-icon'
import { UncheckedIcon } from '@/icons/unchecked-icon'
import * as RadixCheckbox from '@radix-ui/react-checkbox'

import s from './checkbox.module.scss'

type CheckboxSlot = 'indicator' | 'label' | 'root' | 'unchecked' | 'wrapper'
export type CheckboxClasses = ClassesObj<CheckboxSlot>

type OwnProps = {
  checked?: boolean
  checkedIcon?: ReactElement
  classes?: CheckboxClasses
  icon?: ReactElement
  label?: string
  onCheckedChange?: (checked: boolean) => void
}
type CheckboxProps = OwnProps & Omit<RadixCheckboxProps, 'asChild' | keyof OwnProps>

export const Checkbox = forwardRef<HTMLButtonElement, CheckboxProps>(
  ({ checkedIcon = <CheckedIcon />, classes, icon = <UncheckedIcon />, label, ...props }, ref) => {
    const id = useId()

    const cls = getClassNames([
      'root',
      'wrapper',
      'unchecked',
      'indicator',
      'label',
    ] as CheckboxSlot[])(s, classes)

    return (
      <div className={cls.wrapper}>
        <RadixCheckbox.Root className={cls.root} id={id} ref={ref} {...props}>
          <span className={cls.unchecked}>{icon}</span>
          <RadixCheckbox.Indicator className={cls.indicator}>{checkedIcon}</RadixCheckbox.Indicator>
        </RadixCheckbox.Root>
        {label && (
          <Typography as={'label'} className={cls.label} htmlFor={id} variant={'body2'}>
            {label}
          </Typography>
        )}
      </div>
    )
  }
)
