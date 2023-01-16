import React from 'react';
import "./PaginationIventory.css"

const PaginationIventory = ({ postsPerPage, totalPosts, paginate, currentPage }:any) => {
    const pageNumbers:number[] = [];

    if (currentPage < 6) {
        for (let i = 1; i <= totalPosts && i <= 10; i++) {
            pageNumbers.push(i);
          } 
    } else {
        pageNumbers.push(1);

        pageNumbers.push(currentPage - 3);
        pageNumbers.push(currentPage - 2);
        pageNumbers.push(currentPage - 1);
        pageNumbers.push(currentPage);
        pageNumbers.push(currentPage + 1);
        pageNumbers.push(currentPage + 2);
        pageNumbers.push(currentPage + 3);
        pageNumbers.push(totalPosts);
    }

    let buttonPrevious = pageNumbers.length == 1 || currentPage <= 1 || currentPage == 0 ? "style-hidden page-link" : "page-litemink";
    let buttonNext = pageNumbers.length == 1 || currentPage >= 9 ? "style-hidden page-link" : "page-item"; 
    
    return (
        <nav aria-label="Page navigation">
            <ul className="pagination justify-content-end">
                <li className={buttonPrevious}>                    
                    <button className="style-next-previous style-previous" aria-label="Previous" 
                        disabled={pageNumbers.length == 1 || currentPage <= 1}
                        onClick={() => paginate(currentPage - 1)}                                            
                        >
                        <span aria-hidden="true">&laquo;</span>
                        <span className="sr-only"></span>
                    </button>
                </li>
                {pageNumbers.map(number => (
                    <li key={number} className='page-item'>
                        <button onClick={() => paginate(number)}  className={"style-pagination"}>
                            {number}
                        </button>
                    </li>
                ))}
                <li className={buttonNext}>
                    <button className="style-next-previous" aria-label="Next" 
                    onClick={() => paginate(currentPage + 1)}
                    disabled={pageNumbers.length == 1 || paginate >= 9}>
                        <span aria-hidden="true">&raquo;</span>
                        <span className="sr-only"></span>
                    </button>
                </li>
            </ul>
        </nav>
    );

};

export default PaginationIventory;