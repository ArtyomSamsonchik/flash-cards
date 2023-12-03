import { Meta, StoryObj } from '@storybook/react'

import { Checkbox, CheckboxClasses } from './checkbox'

const checkboxClasses: CheckboxClasses = {
  icon: 'string',
  indicator: 'string',
  label: 'string',
  root: 'string',
  wrapper: 'string',
}

const meta = {
  argTypes: {
    // @ts-ignore to remove asChild prop from the storybook docs
    asChild: { table: { disable: true } },

    checked: {
      description: `The controlled checked state of the checkbox.
          Must be used in conjunction with onCheckedChange.`,
    },

    // TODO: refactor classes prop to use getClassNames helper
    classes: {
      description: `An object containing the names of the classes corresponding to the
      component slots. Provided classnames wil be merged with default slots classnames.`,
      table: {
        type: {
          detail: JSON.stringify(checkboxClasses, null, 2),
          summary: 'CheckboxClasses',
        },
      },
    },

    defaultChecked: {
      control: false,
      description: `The checked state of the checkbox when it is initially rendered.
        Use when you do not need to control its checked state.`,
      table: { type: { summary: 'boolean' } },
    },

    disabled: { table: { type: { summary: 'boolean' } } },

    name: { table: { type: { summary: 'string' } } },

    onCheckedChange: {
      action: 'onCheckedChange',
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

export const Default: Story = {
  args: { defaultChecked: true, disabled: false },
}

export const WithLabel = {
  args: {
    ...Default.args,
    label: 'Lorem ipsum dolor.',
  },
}
