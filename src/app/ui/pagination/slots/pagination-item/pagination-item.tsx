import { FC } from 'react'

import getClassNames, { ClassesObj } from '@/app/helpers/get-class-names'
import {
  PaginationItemData,
  PaginationItemType,
} from '@/app/ui/pagination/helpers/use-pagination-items'

import s from './pagination-item.module.scss'

type PaginationItemClasses = ClassesObj<PaginationItemType, 'disabled'>

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

const itemSlotRenderMap: Record<PaginationItemType, FC<PaginationItemProps>> = {
  next: ({ classes, currentPage, disabled, item, onPageChange, pageCount }) => {
    const isDisabled = disabled || currentPage >= pageCount
    const cls = getClassNames<PaginationItemType>([item.type], {
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
    const cls = getClassNames<PaginationItemType>([item.type], {
      disabled,
      selected: item.page === currentPage,
    })(s, classes)

    return (
      <button className={cls.page} disabled={disabled} onClick={() => onPageChange(item.page)}>
        {item.page}
      </button>
    )
  },

  previous: ({ classes, currentPage, disabled, item, onPageChange }) => {
    const isDisabled = disabled || currentPage <= 1
    const cls = getClassNames<PaginationItemType>([item.type], { disabled: isDisabled })(s, classes)

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
    const cls = getClassNames<PaginationItemType>([item.type], { disabled })(s, classes)

    return <div className={cls.separator}>...</div>
  },
}
