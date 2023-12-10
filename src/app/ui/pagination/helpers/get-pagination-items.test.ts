import getPaginationPageItems from './get-pagination-page-items'

// Tests to be run in the browser/node shell. Should be rewritten using Vitest
// TODO: add Vitest in the future and rewrite this tests in a more convenient/professional way
type TestData = { last: number; page?: number; siblingCount?: number }

const emptyList = [{ last: 0 }]

const shortLists: TestData[] = [
  { last: 3, page: 1 },
  { last: 3, page: 2 },
  { last: 3, page: 3 },

  { last: 2, page: 1 },
  { last: 2, page: 2 },

  { last: 1, page: 5 },
]

const defaultTests: TestData[] = [
  { last: 7, page: 1 },
  { last: 7, page: 3 },
  { last: 7, page: 4 },
  { last: 7, page: 5 },
  { last: 7, page: 7 },
]

const longLists: TestData[] = [
  { last: 8, page: 1 },
  { last: 8, page: 4 },
  { last: 8, page: 5 },
  { last: 8, page: 8 },
]

const twoSiblings: TestData[] = [
  { last: 12, page: 1, siblingCount: 2 },
  { last: 12, page: 5, siblingCount: 2 },
  { last: 12, page: 6, siblingCount: 2 },
  { last: 12, page: 7, siblingCount: 2 },
  { last: 12, page: 8, siblingCount: 2 },
]

const parseTestData = (test: TestData) =>
  getPaginationPageItems(test)
    .map(page => (page.type === 'page' ? page.page : '_'))
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
