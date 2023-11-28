import { useMemo } from 'react';

export const DOTS = '...';

const range = (start, end) => {
  let length = end - start + 1;
  return Array.from({ length }, (_, idx) => idx + start);
};

export const useCustomPagination = ({ pageCount, siblingCount, currentPage }) => {
  // exp pageCount = 3, siblingCount = 1, currentPage = 0
  const paginationRange = useMemo(() => {
    const totalPageCount = pageCount; // exp 3

    // Pages count is determined as siblingCount, firstPage, lastPage, currentPage, 2*DOTS
    const totalPageNumbers = siblingCount + 5; // 6

    const leftSiblingIndex = Math.max(currentPage + 1 - siblingCount, 1); // exp Max (0 + 1 - 1, 1) = 1
    const rightSiblingIndex = Math.min(currentPage + 1 + siblingCount, totalPageCount); // exp Min (0 + 1 + 1, 3) = 2

    const shouldShowLeftDots = leftSiblingIndex > 2; // exp 1 > 2 = false
    const shouldShowRightDots = rightSiblingIndex < totalPageCount - 2; // exp 2 < 3 - 2 = false

    const firstPageIndex = 1;
    const lastPageIndex = totalPageCount;

    /*
     * Case 1:
     * If the number of pages is less than the page numbers we want to show in our
     * paginationComponent, we return the range [1..totalPageCount]
     * -----------------------------------
     * | 1 | 2 | 3 | 4 | 5 | 6 |
     * -----------------------------------
     *  currentPage = 0
     *  siblingCount = 1
     *  totalPageNumbers = 6
     */
    if (totalPageNumbers >= totalPageCount) return range(1, totalPageCount);

    /*
     * Case 2:
     * If we are on the first page, show the range [...leftRange, DOTS, totalPageCount]
     * -----------------------------------
     * | 1 | 2 | 3 | 4 | 5 | ... | 7 |
     * -----------------------------------
     *  currentPage = 0
     *  siblingCount = 1
     *  totalPageNumbers = 7
     */
    // exp shouldShowLeftDots = true, shouldShowRightDots = false
    if (!shouldShowLeftDots && shouldShowRightDots) {
      const leftItemCount = 3 + 2 * siblingCount;
      const leftRange = range(1, leftItemCount);

      return [...leftRange, DOTS, totalPageCount];
    }

    /*
     * Case 3:
     * If we are on the last page, show the range [1, DOTS, ...rightRange]
     * -----------------------------------
     * | 1 | ... | 3 | 4 | 5 | 6 | 7 |
     * -----------------------------------
     *  currentPage = 6
     *  siblingCount = 1
     *  totalPageNumbers = 7
     */
    // exp shouldShowLeftDots = false, shouldShowRightDots = true
    if (shouldShowLeftDots && !shouldShowRightDots) {
      const rightItemCount = 3 + 2 * siblingCount;
      const rightRange = range(totalPageCount - rightItemCount + 1, totalPageCount);

      return [firstPageIndex, DOTS, ...rightRange];
    }

    /*
     * Case 4:
     * If we are somewhere in the middle, show the range [1, DOTS, ...middleRange, DOTS, totalPageCount]
     * -----------------------------------
     * | 1 | ... | 3 | 4 | 5 | ... | 10 |
     * -----------------------------------
     *  currentPage = 5
     *  siblingCount = 1
     *  totalPageNumbers = 10
     */
    // exp shouldShowLeftDots = false, shouldShowRightDots = false
    if (shouldShowLeftDots && shouldShowRightDots) {
      const middleRange = range(leftSiblingIndex, rightSiblingIndex);

      return [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex];
    }
  }, [pageCount, siblingCount, currentPage]);

  return paginationRange;
};
