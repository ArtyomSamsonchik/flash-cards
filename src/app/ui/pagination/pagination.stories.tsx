import { Meta, StoryObj } from '@storybook/react'

import { Pagination } from './pagination'

const meta = {
  component: Pagination,
  tags: ['autodocs'],
  title: 'Components/Pagination',
} satisfies Meta<typeof Pagination>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    defaultPage: 1,
    disabled: false,
    hideNextButton: false,
    hidePrevButton: false,
    pageCount: 10,
    siblingCount: 1,
  },
}
