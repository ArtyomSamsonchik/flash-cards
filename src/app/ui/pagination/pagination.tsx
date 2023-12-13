import { FC, Fragment, ReactElement } from 'react'

import getClassNames, { ClassesObj } from '@/app/helpers/get-class-names'
import usePaginationItems, {
  PaginationItemType,
  UsePaginationItemsParams,
} from '@/app/ui/pagination/helpers/use-pagination-items'
import {
  PaginationItem,
  PaginationItemProps,
} from '@/app/ui/pagination/slots/pagination-item/pagination-item'

import s from './pagination.module.scss'

type PaginationSlot = 'list' | PaginationItemType
export type PaginationClasses = ClassesObj<PaginationSlot, 'disabled'>

type PaginationProps = {
  classes?: PaginationClasses
  disabled?: boolean
  renderItem?: (props: PaginationItemProps) => ReactElement
} & UsePaginationItemsParams

export const Pagination: FC<PaginationProps> = ({ classes, disabled, renderItem, ...props }) => {
  const { currentPage, handlePageChange, items } = usePaginationItems(props)

  const cls = getClassNames<PaginationSlot>(['list', 'previous', 'separator', 'next', 'page'], {
    disabled,
  })(s, classes)

  return (
    <ul className={cls.list}>
      {items.map(item => {
        const itemProps: PaginationItemProps = {
          classes: cls,
          currentPage,
          disabled,
          item,
          onPageChange: handlePageChange,
          pageCount: props.pageCount,
        }

        return (
          <Fragment key={item.page}>
            {renderItem ? renderItem(itemProps) : <PaginationItem {...itemProps} />}
          </Fragment>
        )
      })}
    </ul>
  )
}
