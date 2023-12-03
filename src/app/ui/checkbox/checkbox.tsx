import type { CheckboxProps as RadixCheckboxProps } from '@radix-ui/react-checkbox'

import { forwardRef, useId } from 'react'

import { ClassesObj } from '@/app/helpers/get-class-names'
import { Typography } from '@/app/ui/typography'
import { CheckedIcon } from '@/icons/checked-icon'
import * as RadixCheckbox from '@radix-ui/react-checkbox'
import { clsx } from 'clsx'

import s from './checkbox.module.scss'

type CheckboxSlot = 'icon' | 'indicator' | 'label' | 'root' | 'wrapper'
export type CheckboxClasses = ClassesObj<CheckboxSlot>

type OwnProps = {
  checked?: boolean
  classes?: CheckboxClasses
  label?: string
}
type CheckboxProps = OwnProps & Omit<RadixCheckboxProps, 'asChild' | keyof OwnProps>

// TODO: enable default outline color when checkbox is focus-visible state
// TODO: fix argType 'classes' description in storybook
export const Checkbox = forwardRef<HTMLButtonElement, CheckboxProps>(
  ({ classes = {}, label, ...props }, ref) => {
    const id = useId()

    const cls = getClassNames(classes as CheckboxClasses)

    return (
      <div className={cls.wrapper}>
        <RadixCheckbox.Root className={cls.root} id={id} ref={ref} {...props}>
          <span className={s.indicatorWrapper}>
            <RadixCheckbox.Indicator className={cls.indicator}>
              <CheckedIcon />
            </RadixCheckbox.Indicator>
          </span>
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

const getClassNames = (classes: CheckboxClasses, checked?: boolean, disabled?: boolean) => {
  const keys: CheckboxSlot[] = ['root', 'wrapper', 'icon', 'indicator', 'label']

  return keys.reduce(
    (acc, key) => ({
      ...acc,
      [key]: clsx(
        s[key],
        checked && s[`${key}Checked`],
        disabled && s[`${key}Disabled`],
        classes[key]
      ),
    }),
    {} as CheckboxClasses
  )
}
