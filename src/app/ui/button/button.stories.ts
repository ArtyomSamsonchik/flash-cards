import type { Meta, StoryObj } from '@storybook/react'

import { Button } from './'

const meta = {
  argTypes: {
    as: {
      description: `Must be a string representing a React common component
      (such as 'button' and 'a'). It is set to 'button' by default.`,
      table: { defaultValue: { summary: 'button' } },
      type: 'string',
    },

    children: { table: { type: { summary: 'ReactNode' } } },

    disabled: { table: { type: { summary: 'boolean' } } },

    ref: {
      description: 'A ref, forwarded to the root slot of the button component',
      table: { type: { summary: 'Ref<ElementRef<T>>, T extends ElementType' } },
    },

    variant: {
      control: { type: 'radio' },
      description: 'Variant prop is used to add appropriate class name to root tag.',
      options: ['primary', 'secondary', 'tertiary', 'link'],
    },
  },
  args: { disabled: false, fullWidth: false },
  component: Button,
  tags: ['autodocs'],
  title: 'Components/Button',
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    children: 'Primary Button',
  },
}

export const Secondary: Story = {
  args: {
    children: 'Secondary Button',
    variant: 'secondary',
  },
}

export const Tertiary: Story = {
  args: {
    children: 'Tertiary Button',
    variant: 'tertiary',
  },
}

export const Link: Story = {
  args: {
    children: 'Link Button',
    variant: 'link',
  },
}

export const FullWidth: Story = {
  args: {
    children: 'Full Width Button',
    fullWidth: true,
  },
}

export const AsLink: Story = {
  args: {
    as: 'a',
    children: 'Link that looks like a button',
  },
}
