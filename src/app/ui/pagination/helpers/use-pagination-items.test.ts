import usePaginationItems, { UsePaginationItemsParams } from './use-pagination-items'

// Tests to be run in the browser/node shell. Should be rewritten using Vitest
// To run the test you need either mock React useState hook and its environment or
// replace usePaginationItems with getPaginationItemsData in the ParseTestData function
// TODO: add Vitest in the future and rewrite this tests in a more convenient/professional way
type TestData = UsePaginationItemsParams

const emptyList: TestData[] = [{ pageCount: 0 }]

const shortLists: TestData[] = [
  { page: 1, pageCount: 3 },
  { page: 2, pageCount: 3 },
  { page: 3, pageCount: 3 },

  { page: 1, pageCount: 2 },
  { page: 2, pageCount: 2 },

  { page: 5, pageCount: 1 },
]

const defaultTests: TestData[] = [
  { page: 1, pageCount: 7 },
  { page: 3, pageCount: 7 },
  { page: 4, pageCount: 7 },
  { page: 5, pageCount: 7 },
  { page: 7, pageCount: 7 },
]

const longLists: TestData[] = [
  { page: 1, pageCount: 8 },
  { page: 4, pageCount: 8 },
  { page: 5, pageCount: 8 },
  { page: 8, pageCount: 8 },
]

const twoSiblings: TestData[] = [
  { page: 1, pageCount: 12, siblingCount: 2 },
  { page: 5, pageCount: 12, siblingCount: 2 },
  { page: 6, pageCount: 12, siblingCount: 2 },
  { page: 7, pageCount: 12, siblingCount: 2 },
  { page: 8, pageCount: 12, siblingCount: 2 },
]

const parseTestData = (test: TestData) =>
  // eslint-disable-next-line react-hooks/rules-of-hooks
  usePaginationItems(test)
    .items.map(page => (page.type === 'page' ? page.page : '_'))
    .join(' ') + `  (${test.page})`

// prettier-ignore
const tests = [
  ...emptyList,
  ...shortLists,
  ...defaultTests,
  ...longLists,
  ...twoSiblings
].map(test => parseTestData(test))

console.log(tests)
