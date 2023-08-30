import { useState, useEffect } from "react";

import Style from "./Pagination.module.css";
import { toSequence } from "./../bll/services";
import { getTableData } from "./../back-end/server";
import { TableData } from "../bll/interfaces";

const Pagination = ({
  startPage,
  pages,
  setTableData
}: {
  startPage: number;
  pages: number;
  setTableData: React.Dispatch<
    React.SetStateAction<{ page: number; pageAmount: number; data: TableData[] }>
  >;
}) => {
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setCurrentPage(startPage);
  }, [startPage]);

  const getPage = (page: number) => {
    if (page !== currentPage) {
      setCurrentPage(page);
      setTableData(getTableData({ page }));
    }
  };

  return (
    <div className={Style.paginator}>
      {pages > 0 &&
        toSequence(pages).map((page) => (
          <div
            className={`${Style.page} ${page === currentPage ? Style.active : ""
              }`}
            key={page}
            onClick={() => getPage(page)}
          >
            {page}
          </div>
        ))}
    </div>
  );
};

export default Pagination;
