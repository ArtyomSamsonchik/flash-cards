import { expect } from '@storybook/jest'
import { Meta, StoryObj } from '@storybook/react'
import { userEvent, waitFor, within } from '@storybook/testing-library'

import { SignInForm } from './sign-in-form'

const meta = {
  argTypes: {
    onSubmit: {
      control: false,
      description: 'This function will receive the form data if form validation is successful',
      table: {
        type: {
          detail:
            `(\n  data: SignInFormValues,\n  event?: BaseSyntheticEvent\n) => unknown | Promise<unknown>` +
            '\n\nSignInFormValuesKeys = "email" | "password" | "rememberMe"',
          summary: 'SubmitHandler<SignInFormValues>',
        },
      },
    },
    onSubmitError: {
      control: false,
      description: `Errors that occurred during the call of the onSubmit function will not be caught.
        Instead, use try/catch inside the onSubmit handler..`,
      table: {
        type: {
          detail:
            `(\n  errors: FieldErrors<SignInFormValues>,\n  event?: BaseSyntheticEvent\n) => unknown | Promise<unknown>` +
            '\n\nSignInFormValuesKeys = "email" | "password" | "rememberMe"',
          summary: 'SubmitErrorHandler<SignInFormValues>',
        },
      },
    },
  },

  component: SignInForm,
  tags: ['autodocs'],
  title: 'Components/SignInForm',
} satisfies Meta<typeof SignInForm>

export default meta
type Story = StoryObj<typeof meta>

export const Empty: Story = {}

export const Submitted: Story = {
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement)

    await userEvent.type(canvas.getByLabelText('Email'), 'test@test.com')
    await userEvent.type(canvas.getByLabelText('Password'), 'qw1er2t3')
    await userEvent.click(canvas.getByRole('checkbox'))

    await userEvent.click(canvas.getByRole('button', { name: /sign in/i }))

    await waitFor(() => expect(args.onSubmit).toHaveBeenCalled())
  },
}
