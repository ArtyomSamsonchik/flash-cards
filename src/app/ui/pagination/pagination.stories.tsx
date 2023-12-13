import { Meta, StoryObj } from '@storybook/react'

import { Pagination, PaginationClasses } from './pagination'

const paginationClasses =
  JSON.stringify(
    {
      list: 'string',
      next: 'string',
      page: 'string',
      previous: 'string',
      separator: 'string',
    } as PaginationClasses,
    null,
    2
  ) +
  ` & {
    "pageDisabled": "string",
    ...etc
  }`

const meta = {
  argTypes: {
    classes: {
      description: `An object containing the names of the classes corresponding to the
        component slots. Provided classnames will be merged with default slots classnames.\t
        Additionally you can specify slots names combined with capitalized modifier
        of type \`disabled\` instead of manually calculating class names
        based on the values of the corresponding props.`,
      table: {
        defaultValue: { summary: 'undefined' },
        type: {
          detail: paginationClasses,
          summary: 'PaginationClasses',
        },
      },
    },

    defaultPage: {
      description: `The initial page of the pagination when it is initially rendered.
        Use when you do not need to control its state.
        If no \`defaultPage\` or \`page\` props are specified, it will be set to 1.`,
      table: { defaultValue: { summary: 1 } },
    },

    hideNextButton: {
      description: `Allows you to optionally hide next-page button.`,
    },

    hidePrevButton: {
      description: `Allows you to optionally hide previous-page button.`,
    },

    onPageChange: {
      description: `Event handler called when the current pagination page is changed.`,
      table: { type: { summary: '(page: number) => void' } },
    },

    page: {
      description:
        'The controlled state of the pagination. Must be used in conjunction with onPageChange.',
    },

    pageCount: {
      description: `The page range used to calculate the pagination size and the number of pagination elements.`,
    },

    renderItem: {
      description: `Callback used to render custom element instead of the standard PaginationItem.
        It accepts all props handled by the PaginationItem component.`,
      table: {
        type: { summary: '(props: PaginationItemProps) => ReactElement' },
      },
    },

    siblingCount: {
      description: `Allows you to specify how many digits to display either side of current page. Defaults to 1.`,
      table: { defaultValue: { summary: 1 } },
    },
  },

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
