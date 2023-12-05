import { ReactElement, createElement } from 'react'

import { CheckedIcon } from '@/icons/checked-icon'
import { EyeIcon } from '@/icons/eye-icon'
import { EyeOffIcon } from '@/icons/eye-off-icon'
import { RadioCheckedIcon } from '@/icons/radio-checked-icon'
import { RadioUncheckedIcon } from '@/icons/radio-unchecked-icon'
import { UncheckedIcon } from '@/icons/unchecked-icon'
import { Meta, StoryObj } from '@storybook/react'

import { RadioGroup, RadioGroupClasses } from './radio-group'
import { RadioItemOption } from './slots/radio-group-item'

const radioItemOption = { 'disabled?': 'string', 'label?': 'string', value: 'string' }

const radioGroupClasses: RadioGroupClasses = {
  indicator: 'string',
  item: 'string',
  itemWrapper: 'string',
  label: 'string',
  root: 'string',
  unchecked: 'string',
}

const selectOptions = ['checkbox icon', 'eye icon', 'default']
const customIcons = {
  checked: [CheckedIcon, EyeIcon, RadioCheckedIcon],
  unchecked: [UncheckedIcon, EyeOffIcon, RadioUncheckedIcon],
}
const getIcons = (state: 'checked' | 'unchecked'): Record<string, ReactElement> =>
  Object.fromEntries(selectOptions.map((o, i) => [o, createElement(customIcons[state][i])]))

/**
 * A RadioGroup wraps around a list of RadioGroupItem elements
 * */
const meta = {
  argTypes: {
    checkedIcon: {
      description: `An optional react element that will replace the default icon in the checked state.
        It is expected that the svg element will be utilized.\t
        This prop is provided to each RadioGroupItem element.`,
      mapping: getIcons('checked'),
      options: selectOptions,
      table: { defaultValue: { summary: null }, type: { summary: 'ReactElement' } },
    },

    classes: {
      description: `An object containing the names of the classes corresponding to the
      component slots. Provided classnames wil be merged with default slots classnames.`,
      table: {
        defaultValue: { summary: 'undefined' },
        type: {
          detail: JSON.stringify(radioGroupClasses, null, 2),
          summary: 'RadioGroupClasses',
        },
      },
    },

    defaultValue: {
      control: false,
      description: `The value of the radio item that should be checked when initially rendered.
        Use when you do not need to control the state of the radio items.`,
      table: { type: { summary: 'string' } },
    },

    disabled: { table: { type: { summary: 'boolean' } } },

    icon: {
      description: `An optional react element that will replace the default icon in an unchecked state.
        It is expected that the svg element will be utilized.\t
        This prop is provided to each RadioGroupItem element.`,
      mapping: getIcons('unchecked'),
      options: selectOptions,
      table: { defaultValue: { summary: null }, type: { summary: 'ReactElement' } },
    },

    name: {
      description: `The name of the group.
        Submitted with its owning form as part of a name/value pair.`,
      table: { type: { summary: 'string' } },
    },

    onValueChange: {
      description: `Event handler called when the value changes.`,
      table: { type: { summary: '(value: string) => void' } },
    },

    options: {
      description: `Array of RadioItemOption objects to map over`,
      table: {
        type: {
          detail: JSON.stringify(radioItemOption, null, 2),
          summary: 'RadioItemOptions[]',
        },
      },
    },

    orientation: {
      control: { type: 'inline-radio' },
      description: 'Orientation of the radio items',
      options: ['vertical', 'horizontal'],
      table: {
        defaultValue: { summary: 'vertical' },
        type: { summary: 'vertical | horizontal' },
      },
    },

    value: {
      description: `The controlled value of the radio item to check.
        Should be used in conjunction with "onValueChange".`,
      table: { type: { summary: 'string' } },
    },
  },

  component: RadioGroup,
  tags: ['autodocs'],
  title: 'Components/RadioGroup',
} satisfies Meta<typeof RadioGroup>

const options: RadioItemOption[] = [
  { label: 'first item', value: '1' },
  { label: 'second item', value: '2' },
  { disabled: true, label: 'third item', value: '3' },
  { label: 'fourth item', value: '4' },
]

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    defaultValue: '1',
    disabled: false,
    options,
    orientation: 'vertical',
  },
}
