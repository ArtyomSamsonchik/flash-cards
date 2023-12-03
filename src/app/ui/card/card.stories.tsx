import { Card } from '@/app/ui/card/card'
import { Meta, StoryObj } from '@storybook/react'

const meta = {
  argTypes: {
    as: {
      description: `Must be a string representing a React common component (such as a  div).
        If prop is not specified, it is set to 'div'.`,
      table: { defaultValue: { summary: 'div' }, type: { summary: 'ElementType' } },
      type: 'string',
    },

    className: {
      description: 'String merged with the default root element class name',
      table: { type: { summary: 'string' } },
      type: 'string',
    },

    ref: {
      description: 'A ref, forwarded to the root slot of the card component',
      table: { type: { summary: 'Ref<ElementRef<T>>, T extends ElementType' } },
    },
  },

  component: Card,
  tags: ['autodocs'],
  title: 'Components/Card',
} satisfies Meta<typeof Card>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { style: { height: '500px', width: '400px' } },
}
