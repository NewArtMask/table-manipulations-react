import { useState, useEffect } from "react";

import Style from "./Table.module.css";
import { TableData, TableTitles, SortOrder } from "./../bll/interfaces";
import {
  tableSortService,
  initTableDataCopy,
  capitalizeFirstLetter
} from "./../bll/services";

const Table = ({ data }: { data: TableData[] }) => {
  const [activeColumn, setActiveColumn] = useState("name" as TableTitles);
  const [sortOrder, setSortOrder] = useState(SortOrder.none as SortOrder);
  const [tableData, setTableData] = useState([] as TableData[]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (data) {
      setTableData(
        tableSortService.sortData(
          initTableDataCopy(data),
          data,
          activeColumn,
          sortOrder
        )
      );
    }
  }, [data]);

  const sortData = (column: TableTitles, isEnabledChangeOrder = true) => {
    let order = sortOrder;
    if (activeColumn === column && isEnabledChangeOrder) {
      order = tableSortService.getNextSortOrder(order);
      setSortOrder(order);
    } else {
      setActiveColumn(column);
    }

    setTableData(tableSortService.sortData(tableData, data, column, order));
  };

  return (
    <>
      <p>Sort Order: {sortOrder}</p>
      <p>Active Column: {capitalizeFirstLetter(activeColumn)}</p>

      <table className={Style.table}>
        <thead>
          <tr>
            <th>#</th>
            <th className={Style.columnTitle} onClick={() => sortData("name")}>
              Name
            </th>
            <th
              className={Style.columnTitle}
              onClick={() => sortData("company")}
            >
              Company
            </th>
            <th
              className={Style.columnTitle}
              onClick={() => sortData("contact")}
            >
              Contact
            </th>
            <th
              className={Style.columnTitle}
              onClick={() => sortData("country")}
            >
              Country
            </th>
          </tr>
        </thead>
        <tbody>
          {tableData &&
            tableData.map((row, idx) => (
              <tr key={idx + 1}>
                <td>{idx + 1}</td>
                <td>{row.name}</td>
                <td>{row.company}</td>
                <td>{row.contact}</td>
                <td>{row.country}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );
};

export default Table;
