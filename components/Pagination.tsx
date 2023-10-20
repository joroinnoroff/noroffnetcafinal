import { ArrowLeft, ArrowRight } from 'lucide-react';
import React from 'react';
import { Button } from './ui/button';

const Pagination = ({ currentPage, totalPages, handlePageClick, handlePreviousPage, handleNextPage, pageRange, endIndex, posts }) => {
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

      <Button variant={"link"} className="ml-2" onClick={handleNextPage} >
        Next <ArrowRight width={25} />
      </Button>
    </div>
  );
}

export default Pagination;
