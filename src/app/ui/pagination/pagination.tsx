import { FC, Fragment, ReactElement, useState } from 'react'

import getClassNames, { ClassesObj } from '@/app/helpers/get-class-names'
import getPaginationPageItems from '@/app/ui/pagination/helpers/get-pagination-page-items'
import {
  PaginationItem,
  PaginationItemData,
  PaginationItemProps,
  PaginationItemSlot,
} from '@/app/ui/pagination/slots/pagination-item/pagination-item'

import s from './pagination.module.scss'

type PaginationSlot = 'list' | PaginationItemSlot
type PaginationClasses = ClassesObj<PaginationSlot, 'disabled'>

type PaginationProps = {
  classes?: PaginationClasses
  defaultPage?: number
  disabled?: boolean
  hideNextButton?: boolean
  hidePrevButton?: boolean
  onPageChange?: (page: number) => void
  page?: number
  pageCount: number
  renderItem?: (props: PaginationItemProps) => ReactElement
  siblingCount?: number
}

export const Pagination: FC<PaginationProps> = ({
  classes,
  defaultPage: initialPage = 1,
  disabled,
  hideNextButton,
  hidePrevButton,
  onPageChange,
  page,
  pageCount,
  renderItem,
  siblingCount,
}) => {
  const [defaultPage, setDefaultPage] = useState(initialPage)

  const cls = getClassNames<PaginationSlot>(['list', 'previous', 'separator', 'next', 'page'], {
    disabled,
  })(s, classes)

  const currentPage = page ?? defaultPage

  const items = (
    [
      !hidePrevButton && { page: -Infinity, type: 'previous' },

      ...getPaginationPageItems({
        last: pageCount,
        page: currentPage,
        siblingCount,
      }),

      !hideNextButton && { page: +Infinity, type: 'next' },
    ] as PaginationItemData[]
  ).filter(Boolean)

  const handlePageChange = (page: number) => {
    setDefaultPage(page)
    onPageChange?.(page)
  }

  return (
    <ul className={cls.list}>
      {items.map(item => {
        const props: PaginationItemProps = {
          classes: cls,
          currentPage,
          disabled,
          item,
          onPageChange: handlePageChange,
          pageCount,
        }

        return (
          <Fragment key={item.page}>
            {renderItem ? renderItem(props) : <PaginationItem {...props} />}
          </Fragment>
        )
      })}
    </ul>
  )
}
