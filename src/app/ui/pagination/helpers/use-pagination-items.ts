import { useState } from 'react'

export type PaginationItemType = 'next' | 'page' | 'previous' | 'separator'

export type PaginationItemData = {
  page: number
  type: PaginationItemType
}

type PaginationDataConfig = {
  hideNextButton?: boolean
  hidePrevButton?: boolean
  page?: number
  pageCount: number
  siblingCount?: number
}

export type UsePaginationItemsParams = {
  defaultPage?: number
  onPageChange?: (page: number) => void
} & PaginationDataConfig

const usePaginationItems = ({
  defaultPage: initialPage = 1,
  onPageChange,
  page,
  ...rest
}: UsePaginationItemsParams) => {
  const [defaultPage, setDefaultPage] = useState(initialPage)

  const currentPage = page ?? defaultPage

  const items = getPaginationItemsData({
    page: currentPage,
    ...rest,
  })

  const handlePageChange = (page: number) => {
    setDefaultPage(page)
    onPageChange?.(page)
  }

  return { currentPage, handlePageChange, items }
}

const getPaginationItemsData = ({
  hideNextButton,
  hidePrevButton,
  page = 1,
  pageCount,
  siblingCount = 1,
}: PaginationDataConfig): PaginationItemData[] => {
  if (pageCount <= 0) {
    return []
  }
  if (pageCount === 1) {
    return [{ page: 1, type: 'page' }]
  }

  page = Math.min(Math.max(page, 1), pageCount)
  const first = 1

  // middleItemsLength = [start, ...siblings, center, ...siblings, end].length
  const middleItemsLength = siblingCount * 2 + 3
  let start = Math.max(page - siblingCount - 1, first + 1)
  const end = Math.min(start + middleItemsLength - 1, pageCount - 1)

  // offset start in case of [end, ...items,  start].length < innerElementsLength to preserve fullLength
  if (end === pageCount - 1) {
    start = Math.max(first + 1, end - (middleItemsLength - 1))
  }

  // allItems = [first, ...middleItems, last]
  const middleItems: PaginationItemData[] = []

  for (let i = start; i <= end; i++) {
    const isLeftSeparator = i === start && i !== first + 1
    const isRightSeparator = i === end && i !== pageCount - 1

    if (isLeftSeparator) {
      middleItems.push({ page: i, type: 'separator' })
    } else if (isRightSeparator) {
      middleItems.push({ page: i, type: 'separator' })
    } else {
      middleItems.push({ page: i, type: 'page' })
    }
  }

  return [
    !hidePrevButton && { page: -Infinity, type: 'previous' },
    { page: first, type: 'page' },
    ...middleItems,
    { page: pageCount, type: 'page' },
    !hideNextButton && { page: +Infinity, type: 'next' },
  ].filter(Boolean) as PaginationItemData[]
}

export default usePaginationItems
