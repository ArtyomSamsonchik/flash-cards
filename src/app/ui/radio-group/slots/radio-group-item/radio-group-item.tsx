import { ReactElement, forwardRef, useId } from 'react'

import getClassNames, { ClassesObj } from '@/app/helpers/get-class-names'
import { Typography } from '@/app/ui/typography'
import { RadioCheckedIcon } from '@/icons/radio-checked-icon'
import { RadioUncheckedIcon } from '@/icons/radio-unchecked-icon'
import * as RadixRadioGroup from '@radix-ui/react-radio-group'

import s from './radio-group-item.module.scss'

export type RadioItemSlot = 'indicator' | 'item' | 'itemWrapper' | 'label' | 'unchecked'
export type RadioItemClasses = ClassesObj<RadioItemSlot>

export type RadioItemOption = { disabled?: boolean; label?: string; value: string }
type RadioItemProps = {
  checkedIcon?: ReactElement
  classes?: RadioItemClasses
  icon?: ReactElement
} & RadioItemOption

// TODO: check all polymorphic components to correct handle refs
export const RadioGroupItem = forwardRef<HTMLButtonElement, RadioItemProps>(
  (
    { checkedIcon = <RadioCheckedIcon />, classes, icon = <RadioUncheckedIcon />, label, ...props },
    ref
  ) => {
    const id = useId()
    const cls = getClassNames<RadioItemSlot>([
      'itemWrapper',
      'item',
      'unchecked',
      'indicator',
      'label',
    ])(s, classes)

    return (
      <div className={cls.itemWrapper}>
        <RadixRadioGroup.Item className={cls.item} id={id} ref={ref} {...props}>
          <span className={cls.unchecked}>{icon}</span>
          <RadixRadioGroup.Indicator className={cls.indicator}>
            {checkedIcon}
          </RadixRadioGroup.Indicator>
        </RadixRadioGroup.Item>
        {label && (
          <Typography as={'label'} className={cls.label} htmlFor={id} variant={'body2'}>
            {label}
          </Typography>
        )}
      </div>
    )
  }
)
