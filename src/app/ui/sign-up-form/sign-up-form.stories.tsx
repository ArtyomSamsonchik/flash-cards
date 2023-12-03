import { Meta, StoryObj } from '@storybook/react'

import { SignUpForm } from './sign-up-form'

const meta = {
  component: SignUpForm,
  tags: ['autodocs'],
} satisfies Meta<typeof SignUpForm>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
