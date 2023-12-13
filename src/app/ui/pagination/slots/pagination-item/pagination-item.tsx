import { FC, ReactElement } from 'react'

import getClassNames, { ClassesObj } from '@/app/helpers/get-class-names'
import {
  PaginationItemData,
  PaginationItemType,
} from '@/app/ui/pagination/helpers/use-pagination-items'
import { ArrowLeft } from '@/icons/arrow-left'
import { ArrowRight } from '@/icons/arrow-right'

import s from './pagination-item.module.scss'

type PaginationItemClasses = ClassesObj<PaginationItemType, 'disabled'>
type PaginationItemIconsMap = { [K in 'next' | 'previous' | 'separator']?: ReactElement }

export type PaginationItemProps = {
  classes?: PaginationItemClasses
  currentPage: number
  disabled?: boolean
  iconsMap?: PaginationItemIconsMap
  item: PaginationItemData
  onPageChange: (page: number) => void
  pageCount: number
}

export const PaginationItem: FC<PaginationItemProps> = props => {
  return <li>{itemSlotRenderMap[props.item.type](props)}</li>
}

const itemSlotRenderMap: Record<PaginationItemType, FC<PaginationItemProps>> = {
  next: ({ classes, currentPage, disabled, iconsMap, item, onPageChange, pageCount }) => {
    const isDisabled = disabled || currentPage >= pageCount
    const cls = getClassNames<PaginationItemType>([item.type], {
      disabled: isDisabled,
    })(s, classes)

    return (
      <button
        className={cls.next}
        disabled={isDisabled}
        onClick={() => onPageChange(currentPage + 1)}
      >
        {iconsMap?.next ?? <ArrowRight />}
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

  previous: ({ classes, currentPage, disabled, iconsMap, item, onPageChange }) => {
    const isDisabled = disabled || currentPage <= 1
    const cls = getClassNames<PaginationItemType>([item.type], { disabled: isDisabled })(s, classes)

    return (
      <button
        className={cls.previous}
        disabled={isDisabled}
        onClick={() => onPageChange(currentPage - 1)}
      >
        {iconsMap?.previous ?? <ArrowLeft />}
      </button>
    )
  },

  separator: ({ classes, disabled, iconsMap, item }) => {
    const cls = getClassNames<PaginationItemType>([item.type], { disabled })(s, classes)

    return <div className={cls.separator}>{iconsMap?.separator ?? '...'}</div>
  },
}
