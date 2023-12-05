import type { RadioGroupProps as RadixRadioGroupProps } from '@radix-ui/react-radio-group'

import { ReactElement } from 'react'

import getClassNames, { ClassesObj } from '@/app/helpers/get-class-names'
import * as RadixRadioGroup from '@radix-ui/react-radio-group'

import s from './radio-group.module.scss'

import { RadioGroupItem, RadioItemOption, RadioItemSlot } from './slots/radio-group-item'

type RadioGroupSlot = 'root' | RadioItemSlot
export type RadioGroupClasses = ClassesObj<RadioGroupSlot>

type RadioGroupProps = {
  checkedIcon?: ReactElement
  classes?: RadioGroupClasses
  icon?: ReactElement
  options: RadioItemOption[]
} & Omit<RadixRadioGroupProps, 'asChild' | 'className'>

export const RadioGroup = ({
  checkedIcon,
  classes,
  disabled,
  icon,
  options = [],
  orientation = 'vertical',
  ...props
}: RadioGroupProps) => {
  const cls = getClassNames<RadioGroupSlot>([
    'root',
    'item',
    'unchecked',
    'indicator',
    'label',
    'itemWrapper',
  ])(s, classes)

  return (
    <RadixRadioGroup.Root
      className={cls.root}
      disabled={disabled}
      orientation={orientation}
      {...props}
    >
      {options.map(o => (
        <RadioGroupItem
          checkedIcon={checkedIcon}
          classes={cls}
          disabled={disabled}
          icon={icon}
          key={o.value}
          {...o}
        />
      ))}
    </RadixRadioGroup.Root>
  )
}
