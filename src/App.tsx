import { useState, useEffect } from "react";

import "./styles.css";
import Search from "./search/Search";
import Table from "./table/Table";
import Pagination from "./paginator/Pagination";
import { TableData } from "./bll/interfaces";
import { getTableData } from "./back-end/server";

export default function App() {
  const [tableData, setTableData] = useState(
    {} as { page: number; pageAmount: number; data: TableData[] }
  );

  useEffect(() => {
    setTableData(getTableData());
  }, []);

  const filterTable = (searchData: string): void => {
    setTableData(getTableData({ searchData }));
  };

  return (
    <div className="App">
      <Search filter={filterTable} />
      <Table data={tableData.data} />
      <Pagination
        startPage={tableData.page}
        pages={tableData.pageAmount}
        setTableData={setTableData}
      />
    </div>
  );
}
