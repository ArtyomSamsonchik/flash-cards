import { expect } from '@storybook/jest'
import { Meta, StoryObj } from '@storybook/react'
import { userEvent, waitFor, within } from '@storybook/testing-library'

import { NewPassword } from './new-password'

const meta = {
  argTypes: {
    onSubmit: {
      control: false,
      description: 'This function will receive the form data if form validation is successful',
      table: {
        type: {
          detail:
            `(\n  data: NewPasswordFormValues,\n  event?: BaseSyntheticEvent\n) => unknown | Promise<unknown>` +
            '\n\nNewPasswordFormValuesKeys = "password" | "confirmPassword"',
          summary: 'SubmitHandler<NewPasswordFormValues>',
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
            `(\n  errors: FieldErrors<NewPasswordFormValues>,\n  event?: BaseSyntheticEvent\n) => unknown | Promise<unknown>` +
            '\n\nNewPasswordFormValuesKeys = "password" | "confirmPassword"',
          summary: 'SubmitErrorHandler<NewPasswordFormValues>',
        },
      },
    },
  },

  component: NewPassword,
  tags: ['autodocs'],
  title: 'Components/Auth/NewPassword',
} satisfies Meta<typeof NewPassword>

export default meta
type Story = StoryObj<typeof meta>

export const Empty: Story = {}

const getFormControls = (canvas: HTMLElement) => {
  const queries = within(canvas)
  const password = queries.getByLabelText(/^password/i)
  const confirmPassword = queries.getByLabelText(/confirm password/i)
  const submitButton = queries.getByRole('button', { name: /create new password/i })

  return { confirmPassword, password, submitButton }
}

export const TooShortPassword: Story = {
  play: async ({ args, canvasElement }) => {
    const { confirmPassword, password, submitButton } = getFormControls(canvasElement)

    await userEvent.type(password, 'qw')
    await userEvent.type(confirmPassword, 'qw')
    await userEvent.click(submitButton)

    await waitFor(() => expect(args.onSubmitError).toHaveBeenCalled())
  },
}

export const TooLongPassword: Story = {
  play: async ({ args, canvasElement }) => {
    const { confirmPassword, password, submitButton } = getFormControls(canvasElement)
    const longText = 'Lorem ipsum dolor sit amet, consectetur'

    await userEvent.type(password, longText)
    await userEvent.type(confirmPassword, longText)
    await userEvent.click(submitButton)

    await waitFor(() => expect(args.onSubmitError).toHaveBeenCalled())
  },
}

export const PasswordsDontMatch: Story = {
  play: async ({ args, canvasElement }) => {
    const { confirmPassword, password, submitButton } = getFormControls(canvasElement)

    await userEvent.type(password, 'qwer')
    await userEvent.type(confirmPassword, 'qwe')
    await userEvent.click(submitButton)

    await waitFor(() => expect(args.onSubmitError).toHaveBeenCalled())
  },
}

export const SubmitWithValidData: Story = {
  play: async ({ args, canvasElement }) => {
    const { confirmPassword, password, submitButton } = getFormControls(canvasElement)

    await userEvent.type(password, 'qwer')
    await userEvent.type(confirmPassword, 'qwer')
    await userEvent.click(submitButton)

    await waitFor(() => expect(args.onSubmit).toHaveBeenCalled())
  },
}
