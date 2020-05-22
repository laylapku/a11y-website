import React, { useState, useEffect } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { typography, color, spacing } from "../../shared/style";
import Icon from "../icon/Icon";

const PaginationWrapper = styled.div`
  align-items: center;
  border: 1px solid ${color.primary};
  border-radius: ${spacing.borderRadius.medium}px;
  display: flex;
  font-weight: ${typography.weight.bold};
  justify-content: center;
  letter-spacing: 0.07rem;
  vertical-align: top;

  svg {
    margin: ${spacing.padding.small}px;
  }
`;

const keyCodes = {
  arrowLeft: 37,
  arrowRight: 39,
};

const Pagination = ({ pageNum, totalPages }) => {
  const [currentPage, setCurrentPage] = useState(pageNum);
  const onPrevPage = (currentPage) => {
    setCurrentPage(currentPage - 1);
  };
  const onNextPage = (currentPage) => {
    setCurrentPage(currentPage + 1);
  };

  useEffect(() => {
    const onKeyPress = (e) => {
      if (e.keyCode === keyCodes.arrowLeft && currentPage !== 1) {
        setCurrentPage(currentPage - 1);
      } else if (
        e.keyCode === keyCodes.arrowRight &&
        currentPage !== totalPages
      ) {
        setCurrentPage(currentPage + 1);
      } else {
        e.preventDefault();
      }
    };

    document.addEventListener("keydown", onKeyPress);
    return () => {
      document.removeEventListener("keydown", onKeyPress);
    };
  });

  return (
    <PaginationWrapper>
      <button type="submit">
        <Icon
          aria-hidden="true"
          icon="sArrow"
          pointer="left"
          disabled={currentPage === 1}
          onClick={() => onPrevPage(currentPage)}
        />
        <span className="visually-hidden" aria-label="previous page"></span>
      </button>
      Page {currentPage} of {totalPages}
      <button type="submit">
        <Icon
          aria-hidden="true"
          icon="sArrow"
          pointer="right"
          disabled={currentPage === totalPages}
          onClick={() => onNextPage(currentPage)}
        />
        <span className="visually-hidden" aria-label="next page"></span>
      </button>
    </PaginationWrapper>
  );
};

Pagination.propTypes = {
  pageNum: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
};

export default Pagination;
