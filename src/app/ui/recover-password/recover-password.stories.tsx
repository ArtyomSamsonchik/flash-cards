import { expect } from '@storybook/jest'
import { Meta, StoryObj } from '@storybook/react'
import { userEvent, waitFor, within } from '@storybook/testing-library'

import { RecoverPassword } from './recover-password'

const meta = {
  argTypes: {
    onSubmit: {
      control: false,
      description: 'This function will receive the form data if form validation is successful',
      table: {
        type: {
          detail:
            `(\n  data: RecoverPasswordFormValues,\n  event?: BaseSyntheticEvent\n) => unknown | Promise<unknown>` +
            '\n\nRecoverPasswordFormKeys = "email"',
          summary: 'SubmitHandler<RecoverPasswordFormValues>',
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
            `(\n  errors: FieldErrors<RecoverPasswordFormValues>,\n  event?: BaseSyntheticEvent\n) => unknown | Promise<unknown>` +
            '\n\nRecoverPasswordFormKeys = "email"',
          summary: 'SubmitErrorHandler<RecoverPasswordFormValues>',
        },
      },
    },
  },

  component: RecoverPassword,
  tags: ['autodocs'],
  title: 'Components/RecoverPassword',
} satisfies Meta<typeof RecoverPassword>

export default meta
type Story = StoryObj<typeof meta>

export const Empty: Story = {}

export const SubmitWithValidData: Story = {
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement)

    await userEvent.type(canvas.getByLabelText('Email'), 'test@test.com')
    await userEvent.click(canvas.getByRole('button', { name: /send instructions/i }))

    await waitFor(() => expect(args.onSubmit).toHaveBeenCalled())
  },
}
