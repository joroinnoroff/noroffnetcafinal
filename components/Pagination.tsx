import { ArrowLeft, ArrowRight } from 'lucide-react';
import React from 'react';
import { Button } from './ui/button';
import PropTypes from 'prop-types';



const Pagination = ({
  currentPage, 
  handlePageClick, 
  handlePreviousPage, 
  handleNextPage, 
  pageRange, 
  totalPages, 
  endIndex  
}: {
  currentPage: number;
  handlePageClick: (page: number) => void;
  handlePreviousPage: () => void;
  handleNextPage: () => void;
  pageRange: number[];
  totalPages: number;
  endIndex: number;
}) => {
  return (
    <div className="flex justify-center mt-4 p-2 gap-2 items-center">
      {pageRange.map((page) => (
        <Button variant={"link"} key={page} onClick={() => handlePageClick(page)} className={currentPage === page ? 'bg-yellow-400 text-zinc-700' : ''}>
          {page}
        </Button>
      ))}

      <Button variant={"link"} className="mr-2" onClick={handlePreviousPage} disabled={currentPage === 1}>
        <ArrowLeft width={25} /> Previous
      </Button>

      <Button variant={"link"} className="ml-2" onClick={handleNextPage} disabled={currentPage === totalPages}>
        Next <ArrowRight width={25} />
      </Button>
    </div>
  );
}

export default Pagination;

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  handlePageClick: PropTypes.func.isRequired,
  handlePreviousPage: PropTypes.func.isRequired,
  handleNextPage: PropTypes.func.isRequired,
  pageRange: PropTypes.array.isRequired,
  totalPages: PropTypes.number.isRequired,
};
