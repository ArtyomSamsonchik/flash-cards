import { FC } from 'react'

import getClassNames, { ClassesObj } from '@/app/helpers/get-class-names'

import s from './pagination-item.module.scss'

export type PaginationItemSlot = 'next' | 'page' | 'previous' | 'separator'
type PaginationItemClasses = ClassesObj<PaginationItemSlot, 'disabled'>

export type PaginationItemData = { page: number; type: PaginationItemSlot }

export type PaginationItemProps = {
  classes?: PaginationItemClasses
  currentPage: number
  disabled?: boolean
  item: PaginationItemData
  onPageChange: (page: number) => void
  pageCount: number
}

// TODO: make Pagination item a polymorphic component and add itemRender prop to it and to Pagination
// TODO: add slots to previous, next, separator?? to optionally render any icons
export const PaginationItem: FC<PaginationItemProps> = props => {
  return <li>{itemSlotRenderMap[props.item.type](props)}</li>
}

const itemSlotRenderMap: Record<PaginationItemSlot, FC<PaginationItemProps>> = {
  next: ({ classes, currentPage, disabled, item, onPageChange, pageCount }) => {
    const isDisabled = disabled || currentPage >= pageCount
    const cls = getClassNames<PaginationItemSlot>([item.type], {
      disabled: isDisabled,
    })(s, classes)

    // TODO: add icons to previous and next pagination items
    return (
      <button
        className={cls.next}
        disabled={isDisabled}
        onClick={() => onPageChange(currentPage + 1)}
      >
        {'>'}
      </button>
    )
  },
  page: ({ classes, currentPage, disabled, item, onPageChange }) => {
    const cls = getClassNames<PaginationItemSlot>([item.type], {
      disabled,
      selected: item.page === currentPage,
    })(s, classes)

    return (
      <button
        className={cls.page}
        disabled={disabled}
        onClick={() => onPageChange(Number(item.page))}
      >
        {item.page}
      </button>
    )
  },
  previous: ({ classes, currentPage, disabled, item, onPageChange }) => {
    const isDisabled = disabled || currentPage <= 1
    const cls = getClassNames<PaginationItemSlot>([item.type], { disabled: isDisabled })(s, classes)

    return (
      <button
        className={cls.previous}
        disabled={isDisabled}
        onClick={() => onPageChange(currentPage - 1)}
      >
        {'<'}
      </button>
    )
  },
  separator: ({ classes, disabled, item }) => {
    const cls = getClassNames<PaginationItemSlot>([item.type], { disabled })(s, classes)

    return <div className={cls.separator}>...</div>
  },
}
