import React from "react";
import { useTranslation } from "react-i18next";
import "./PaginationShipment.css";

const PaginationShipment = ({
  postsPerPage,
  totalPosts,
  paginate,
  currentPage,
}: any) => {
  const pageNumbers = [];

  for (let i = 1; i <= totalPosts / postsPerPage + 1; i++) {
    pageNumbers.push(i);
  }

  let buttonPrevious =
    pageNumbers.length == 1 || currentPage <= 1 || currentPage == 0
      ? "style-hidden page-link"
      : "page-litemink";
  let buttonNext =
    pageNumbers.length == 1 || currentPage >= 9
      ? "style-hidden page-link"
      : "page-item";
  const { t } = useTranslation();

  return (
    <nav aria-label="Page navigation">
      <p>{t("dummy_data_shipments")}</p>
      <ul className="pagination justify-content-end">
        <li className={buttonPrevious}>
          <button
            className="style-next-previous style-previous"
            aria-label="Previous"
            disabled={pageNumbers.length === 1 || currentPage <= 1}
             onClick={() => paginate(currentPage - 1)} 
            > 
            <span aria-hidden="true">&laquo;</span>
            <span className="sr-only"></span>
          </button>
        </li>
        {pageNumbers.map((number) => (
          <li key={number} className="page-item">
            <button
              onClick={() => {
                if (number !== currentPage) paginate(number);
              }}
              className={
                "style-pagination " + (currentPage === number ? "selected" : "")
              }
            >
              {number}
            </button> 
          </li>
        ))}
        <li className={buttonNext}>
          <button
            className="style-next-previous"
            aria-label="Next"
            onClick={() => paginate(currentPage + 1)}
            disabled={pageNumbers.length == 1 || paginate >= 9} 
          > 
            <span aria-hidden="true">&raquo;</span>
            <span className="sr-only"></span>
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default PaginationShipment;
