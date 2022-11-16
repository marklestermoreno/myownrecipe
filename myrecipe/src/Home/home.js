
import { styled } from '@mui/system';
import { useState } from "react";

export const Responsive = styled("Box")(({ theme }) => ({
  [theme.breakpoints.up("small")]: {
    color: 'yellow'
  },
  [theme.breakpoints.up("mobile")]: {
    color: 'green'
  },
  [theme.breakpoints.up("tablet")]: {
    color: 'purple'
  },
  [theme.breakpoints.up("desktop")]: {
    color: 'red'
  },
  [theme.breakpoints.up("up")]: {
    color: 'blue'
  },
  [theme.breakpoints.up('max')]: {
    color: 'brown'
  }
}));

// Pagination

function usePagination(data, itemsPerPage) {
  const [currentPage, setCurrentPage] = useState(1);
  const maxPage = Math.ceil(data.length / itemsPerPage);

  function currentData() {
    const begin = (currentPage - 1) * itemsPerPage;
    const end = begin + itemsPerPage;
    return data.slice(begin, end);
  }

  function next() {
    setCurrentPage(currentPage => Math.min(currentPage + 1, maxPage));
  }

  function prev() {
    setCurrentPage(currentPage => Math.max(currentPage - 1, 1));
  }

  function jump(page) {
    const pageNumber = Math.max(1, page);
    setCurrentPage(currentPage => Math.min(pageNumber, maxPage));
  }

  return { next, prev, jump, currentData, currentPage, maxPage };
}

export default usePagination;
