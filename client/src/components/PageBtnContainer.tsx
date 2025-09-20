import { HiChevronDoubleLeft, HiChevronDoubleRight } from "react-icons/hi";
import { useLocation, useNavigate } from "react-router-dom";

import Wrapper from "../assets/wrappers/PageBtnContainer";

type PageBtnContainerProps = {
  numOfPages: number;
  currentPage: number;
};

const PageBtnContainer = ({
  numOfPages,
  currentPage,
}: PageBtnContainerProps) => {
  const { search, pathname } = useLocation();
  const navigate = useNavigate();

  const handlePageChange = (pageNumber: number) => {
    const searchParams = new URLSearchParams(search);
    searchParams.set("page", JSON.stringify(pageNumber));
    navigate(`${pathname}?${searchParams.toString()}`);
  };

  const addPageButton = ({
    pageNumber,
    activeClass,
  }: {
    pageNumber: number;
    activeClass: boolean;
  }) => {
    return (
      <button
        className={`btn page-btn ${activeClass && "active"}`}
        key={pageNumber}
        onClick={() => handlePageChange(pageNumber)}
      >
        {pageNumber}
      </button>
    );
  };

  const renderPageButton = () => {
    const pageButtons = [];

    // FIRST PAGE
    pageButtons.push(
      addPageButton({ pageNumber: 1, activeClass: currentPage === 1 })
    );

    // DOTS
    if (currentPage > 3) {
      pageButtons.push(
        <span className="page-btn dots" key="dots-1">
          ...
        </span>
      );
    }

    // ONE BEFORE CURRENT PAGE
    if (currentPage !== 1 && currentPage !== 2) {
      pageButtons.push(
        addPageButton({
          pageNumber: currentPage - 1,
          activeClass: false,
        })
      );
    }

    //CURRENT PAGE
    if (currentPage !== 1 && currentPage !== numOfPages) {
      pageButtons.push(
        addPageButton({
          pageNumber: currentPage,
          activeClass: true,
        })
      );
    }

    // ONE AFTER CURRENT PAGE
    if (currentPage !== numOfPages && currentPage !== numOfPages - 1) {
      pageButtons.push(
        addPageButton({
          pageNumber: currentPage + 1,
          activeClass: false,
        })
      );
    }

    // DOTS
    if (currentPage < numOfPages - 2) {
      pageButtons.push(
        <span className="page-btn dots" key="dots+1">
          ...
        </span>
      );
    }

    pageButtons.push(
      addPageButton({
        pageNumber: numOfPages,
        activeClass: currentPage === numOfPages,
      })
    );

    return pageButtons;
  };

  return (
    <Wrapper>
      <button
        className="btn prev-btn"
        onClick={() => {
          let prevPage = currentPage - 1;

          if (prevPage < 1) prevPage = numOfPages;

          handlePageChange(prevPage);
        }}
      >
        <HiChevronDoubleLeft />
        prev
      </button>
      <div className="btn-container">{renderPageButton()}</div>
      <button
        className="btn next-btn"
        onClick={() => {
          let nextPage = currentPage + 1;

          if (nextPage > numOfPages) nextPage = 1;

          handlePageChange(nextPage);
        }}
      >
        next
        <HiChevronDoubleRight />
      </button>
    </Wrapper>
  );
};
export default PageBtnContainer;
