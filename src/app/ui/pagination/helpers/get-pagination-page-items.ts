type PaginationPageItem = {
  page: number
  type: 'page' | 'separator'
}

type GetPageItemsParams = {
  last: number
  page?: number
  siblingCount?: number
}
const getPaginationPageItems = ({
  last,
  page = 1,
  siblingCount = 1,
}: GetPageItemsParams): PaginationPageItem[] => {
  if (last <= 0) {
    return []
  }
  if (last === 1) {
    return [{ page: 1, type: 'page' }]
  }

  page = Math.min(Math.max(page, 1), last)
  const first = 1

  // middleItemsLength = [start, ...siblings, center, ...siblings, end].length
  const middleItemsLength = siblingCount * 2 + 3
  let start = Math.max(page - siblingCount - 1, first + 1)
  const end = Math.min(start + middleItemsLength - 1, last - 1)

  // offset start in case of [end, ...items,  start].length < innerElementsLength to preserve fullLength
  if (end === last - 1) {
    start = Math.max(first + 1, end - (middleItemsLength - 1))
  }

  // allItems = [first, ...middleItems, last]
  const middleItems: PaginationPageItem[] = []

  for (let i = start; i <= end; i++) {
    const isLeftSeparator = i === start && i !== first + 1
    const isRightSeparator = i === end && i !== last - 1

    if (isLeftSeparator) {
      middleItems.push({ page: i, type: 'separator' })
    } else if (isRightSeparator) {
      middleItems.push({ page: i, type: 'separator' })
    } else {
      middleItems.push({ page: i, type: 'page' })
    }
  }

  return [{ page: first, type: 'page' }, ...middleItems, { page: last, type: 'page' }]
}

export default getPaginationPageItems
