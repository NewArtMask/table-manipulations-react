import { TableData, TableTitles, SortOrder } from "./interfaces";

export const initTableDataCopy = (originData: any[]): any[] => {
  return originData.map((item) => ({ ...item }));
};

export const capitalizeFirstLetter = (word: string) =>
  word.charAt(0).toUpperCase() + word.slice(1);

export const tableSortService = {
  sortOrderValues: [SortOrder.none, SortOrder.asc, SortOrder.desc] as const,
  getNextSortOrder(currentOrder: SortOrder): SortOrder {
    const indexOfNextSortOrder =
      (this.sortOrderValues.indexOf(currentOrder) + 1) % 3;
    return this.sortOrderValues[indexOfNextSortOrder];
  },
  sortData(
    content: TableData[],
    initTableData: TableData[],
    sortData: TableTitles,
    sortOrder: SortOrder
  ): TableData[] {
    let draftContent = initTableDataCopy(content);

    if (sortOrder === SortOrder.asc) {
      draftContent.sort((a, b) => a[sortData].localeCompare(b[sortData]));
    } else if (sortOrder === SortOrder.desc) {
      draftContent.sort((a, b) => b[sortData].localeCompare(a[sortData]));
    } else {
      draftContent = initTableDataCopy(initTableData);
    }

    return draftContent;
  }
};

export const toSequence = (pageAmount: number): number[] => {
  return Array.from({ length: pageAmount }, (_, i) => i + 1);
};
