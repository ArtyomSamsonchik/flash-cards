import { ReactElement, createElement } from 'react'

import { CheckedIcon } from '@/icons/checked-icon'
import { EyeIcon } from '@/icons/eye-icon'
import { EyeOffIcon } from '@/icons/eye-off-icon'
import { RadioCheckedIcon } from '@/icons/radio-checked-icon'
import { RadioUncheckedIcon } from '@/icons/radio-unchecked-icon'
import { UncheckedIcon } from '@/icons/unchecked-icon'
import { Meta, StoryObj } from '@storybook/react'

import { Checkbox, CheckboxClasses } from './checkbox'

const checkboxClasses: CheckboxClasses = {
  indicator: 'string',
  label: 'string',
  root: 'string',
  unchecked: 'string',
  wrapper: 'string',
}

const options = ['default', 'eye icon', 'radio icon']
const customIcons = {
  checked: [CheckedIcon, EyeIcon, RadioCheckedIcon],
  unchecked: [UncheckedIcon, EyeOffIcon, RadioUncheckedIcon],
}
const getIcons = (state: 'checked' | 'unchecked'): Record<string, ReactElement> =>
  Object.fromEntries(options.map((o, i) => [o, createElement(customIcons[state][i])]))

const meta = {
  argTypes: {
    // @ts-ignore to remove asChild prop from the storybook docs
    asChild: { table: { disable: true } },

    checked: {
      description: `The controlled checked state of the checkbox.
          Must be used in conjunction with onCheckedChange.`,
    },

    checkedIcon: {
      description: `An optional react element that will replace the default icon in the checked state.
        It is expected that the svg element will be utilized.`,
      mapping: getIcons('checked'),
      options,
      table: { defaultValue: { summary: null }, type: { summary: 'ReactElement' } },
    },

    classes: {
      description: `An object containing the names of the classes corresponding to the
      component slots. Provided classnames wil be merged with default slots classnames.`,
      table: {
        defaultValue: { summary: 'undefined' },
        type: {
          detail: JSON.stringify(checkboxClasses, null, 2),
          summary: 'CheckboxClasses',
        },
      },
    },

    defaultChecked: {
      description: `The checked state of the checkbox when it is initially rendered.
        Use when you do not need to control its checked state.`,
      table: { type: { summary: 'boolean' } },
    },

    disabled: { table: { type: { summary: 'boolean' } } },

    icon: {
      description: `An optional react element that will replace the default icon in an unchecked state.
        It is expected that the svg element will be utilized.`,
      mapping: getIcons('unchecked'),
      options,
      table: { defaultValue: { summary: null }, type: { summary: 'ReactElement' } },
    },

    name: { table: { type: { summary: 'string' } } },

    onCheckedChange: {
      description: `Event handler called when the checked state of the checkbox changes.`,
      table: { type: { summary: '(checked: boolean) => void' } },
    },

    ref: {
      description: 'A ref, forwarded to the root slot of the checkbox component',
      table: { type: { summary: 'Ref<HTMLButtonElement>' } },
    },

    required: { table: { type: { summary: 'boolean' } } },
  },

  component: Checkbox,
  tags: ['autodocs'],
  title: 'Components/Checkbox',
} satisfies Meta<typeof Checkbox>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: { defaultChecked: true, disabled: false },
}

export const WithLabel = {
  args: {
    ...Primary.args,
    label: 'Lorem ipsum dolor.',
  },
}
