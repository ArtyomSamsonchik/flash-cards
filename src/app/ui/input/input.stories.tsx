import { CloseIcon } from '@/icons/close-icon'
import { EyeIcon } from '@/icons/eye-icon'
import { SearchIcon } from '@/icons/search-icon'
import { Meta, StoryObj } from '@storybook/react'

import { InputAdornment } from '../input-adornment'
import { Input, InputClasses } from './input'

const inputClasses =
  JSON.stringify({ input: 'string', root: 'string' } as InputClasses, null, 2) +
  ` & {
    "rootDisabled": "string",
    "inputError": "string",
    ...etc
  }`

const inputAdornmentArgType = {
  description: `Can be used to extend the input functionality or its design/layout.
    This can be any arbitrary react element, but it is recommended to wrap such an element
    in an "InputAdornment" element that provides styles to align and limit the size
    of its contents.`,
  table: { type: { summary: 'ReactNode' } },
}

/**
 * Common Input element based on react native input element.
 * It can be used in both uncontrolled and controlled way.
 * */
const meta = {
  argTypes: {
    classes: {
      description: `An object containing the names of the classes corresponding to the
        component slots. Provided classnames will be merged with default slots classnames.\t
        Additionally you can specify slots names combined with capitalized modifiers
        of type "disabled" | "error" instead of manually calculating class names
        based on the values of the corresponding props.`,
      table: {
        defaultValue: { summary: 'undefined' },
        type: {
          detail: inputClasses,
          summary: "WithModifiers<InputClasses, 'disabled' | 'error'>",
        },
      },
    },

    disabled: { table: { type: { summary: 'boolean' } } },

    endAdornment: inputAdornmentArgType,

    onValueChange: {
      description: `Event handler called when the value changes.`,
      table: { type: { summary: '(value: string) => void' } },
    },

    placeholder: { table: { type: { summary: 'string' } } },

    startAdornment: inputAdornmentArgType,

    type: {
      description: 'The type is assigned to a native react element',
    },
  },

  component: Input,
  decorators: [
    Story => (
      <div style={{ maxWidth: '35ch' }}>
        <Story />
      </div>
    ),
  ],
  tags: ['autodocs'],
  title: 'Components/Inputs/Input',
} satisfies Meta<typeof Input>

export default meta
type Story = StoryObj<typeof meta>

const getAdornments = (position: 'end' | 'start' = 'start') => ({
  'close icon': (
    <InputAdornment position={position}>
      <CloseIcon />
    </InputAdornment>
  ),
  'eye icon': (
    <InputAdornment position={position}>
      <EyeIcon />
    </InputAdornment>
  ),
  'search icon': (
    <InputAdornment position={position}>
      <SearchIcon />
    </InputAdornment>
  ),
})

const options = Object.keys(getAdornments())

export const Default: Story = {
  argTypes: {
    endAdornment: {
      mapping: getAdornments('end'),
      options,
    },
    startAdornment: {
      mapping: getAdornments('start'),
      options,
    },
  },
  args: { disabled: false, error: false, placeholder: 'placeholder' },
}

export const Error: Story = {
  argTypes: Default.argTypes,
  args: {
    ...Default.args,
    error: true,
  },
}

export const StartAdornment: Story = {
  argTypes: Default.argTypes,
  args: { ...Default.args, startAdornment: 'search icon' },
}

export const EndAdornment: Story = {
  argTypes: Default.argTypes,
  args: { ...Default.args, endAdornment: 'eye icon' },
}

export const BothAdornments: Story = {
  argTypes: Default.argTypes,
  args: {
    ...StartAdornment.args,
    ...EndAdornment.args,
  },
}
