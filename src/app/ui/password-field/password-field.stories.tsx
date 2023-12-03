import * as InputStories from '@/app/ui/input/input.stories'
import * as TextFieldStories from '@/app/ui/text-field/text-field.stories'
import { Meta, StoryObj } from '@storybook/react'

import { PasswordField, PasswordFieldSlot } from './password-field'

const passwordFieldClassesObj = Object.fromEntries(
  (
    ['textFieldRoot', 'root', 'message', 'label', 'input', 'button', 'icon'] as PasswordFieldSlot[]
  ).map(slot => [slot, 'string'])
)
const passwordFieldClasses =
  JSON.stringify(passwordFieldClassesObj, null, 2) +
  ` & {
    "rootDisabled": "string",
    "inputError": "string",
    ...etc
  }`

/**
 * PasswordField is a narrowed down variant of [TextField](?path=/docs/components-textfield--docs) component
 * */
const meta = {
  // TODO: add default project-level argTypes description for classes and ref.
  //  Or add ref to Input, TextField, PasswordField
  argTypes: {
    ...TextFieldStories.default.argTypes,
    classes: {
      description: InputStories.default.argTypes.classes.description,

      table: {
        defaultValue: { summary: 'undefined' },
        type: {
          detail: passwordFieldClasses,
          summary: "WithModifiers<PasswordFieldClasses, 'disabled' | 'error'>",
        },
      },
    },
  },

  component: PasswordField,
  decorators: InputStories.default.decorators,
  parameters: {
    controls: { exclude: /(Adornment|type)$/ },
  },
  tags: ['autodocs'],
  title: 'Components/PasswordField',
} satisfies Meta<typeof PasswordField>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: TextFieldStories.Primary.args,
}

export const Error: Story = {
  args: TextFieldStories.Error.args,
}
