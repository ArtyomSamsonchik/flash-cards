import { ComponentProps } from 'react'

import * as InputStories from '@/app/ui/input/input.stories'
import { Meta, StoryObj } from '@storybook/react'

import { SearchInput } from './search-input'

const meta = {
  argTypes: {
    onResetValue: {
      action: 'value cleared',
      if: { arg: 'supplyOnResetHandler', truthy: true },
    },
  },
  args: {
    disabled: false,
    error: false,
    supplyOnResetHandler: true,
  },

  component: SearchInput,
  decorators: InputStories.default.decorators,
  tags: ['autodocs'],
  title: 'Components/Inputs/SearchInput',
} satisfies Meta<ComponentProps<typeof SearchInput> & { supplyOnResetHandler: boolean }>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { ...InputStories.Default.args },
}
