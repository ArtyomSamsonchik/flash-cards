import { expect } from '@storybook/jest'
import { Meta, StoryObj } from '@storybook/react'
import { userEvent, waitFor, within } from '@storybook/testing-library'

import { SignUpForm } from './sign-up-form'

const meta = {
  argTypes: {
    onSubmit: {
      control: false,
      description: 'This function will receive the form data if form validation is successful',
      table: {
        type: {
          detail:
            `(\n  data: SignUpFormValues,\n  event?: BaseSyntheticEvent\n) => unknown | Promise<unknown>` +
            '\n\nSignUpFormValuesKeys = "email" | "password" | "confirmPassword"',
          summary: 'SubmitHandler<SignUpFormValues>',
        },
      },
    },
    onSubmitError: {
      control: false,
      description: `This function will be called when a form validation fails instead of the onSubmit handler.
        It will receive an object containing validation errors.
        Errors that occurred during the call of the onSubmit function will not be caught.
        Instead, use try/catch inside the onSubmit handler.`,
      table: {
        type: {
          detail:
            `(\n  errors: FieldErrors<SignUpFormValues>,\n  event?: BaseSyntheticEvent\n) => unknown | Promise<unknown>` +
            '\n\nSignUpFormValuesKeys = "email" | "password" | "confirmPassword"',
          summary: 'SubmitErrorHandler<SignUpFormValues>',
        },
      },
    },
  },

  component: SignUpForm,
  tags: ['autodocs'],
  title: 'Components/SignUpForm',
} satisfies Meta<typeof SignUpForm>

export default meta
type Story = StoryObj<typeof meta>

export const Empty: Story = {}

export const SubmitWithValidData: Story = {
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement)

    const emailInput = canvas.getByLabelText('Email')
    const passwordInput = canvas.getByLabelText('Password')
    const confirmPasswordInput = canvas.getByLabelText('Confirm Password')
    const submitButton = canvas.getByRole('button', { name: /sign up/i })

    await userEvent.type(emailInput, 'test@test.com')
    await userEvent.type(passwordInput, 'qwer')
    await userEvent.type(confirmPasswordInput, 'qwer')

    await userEvent.click(submitButton)

    await waitFor(() => expect(args.onSubmit).toHaveBeenCalled())
  },
}
