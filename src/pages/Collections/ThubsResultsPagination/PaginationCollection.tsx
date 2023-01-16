
import React from 'react';
import "../PaginationThumbResult.css"

const PaginationCollection = ({ postsPerPage, totalPosts, paginate, currentPage }:any) => {
    const pageNumbers = [];

    for (let i = 1; i <= totalPosts && i <= 10; i++) {
        pageNumbers.push(i);
    }

    let buttonPrevious = pageNumbers.length == 1 || currentPage <= 1 || currentPage === 0 ? "style-hidden page-link" : "page-litemink";
    let buttonNext = pageNumbers.length == 1 || currentPage === 10 ? "style-hidden page-link" : "page-item"; 

    return (
        <nav aria-label="Page navigation">
            <ul className="pagination justify-content-end">
                <li className={buttonPrevious}>                    
                    <button className="style-next-previous style-previous" aria-label="Previous" 
                        disabled={currentPage == 1}
                        onClick={() => paginate(currentPage - 1)}                                            
                        >
                        <span aria-hidden="true">&laquo;</span>
                        <span className="sr-only"></span>
                    </button>
                </li>
                {pageNumbers.map(number => (
                    <li key={number} className='page-item'>
                        <button onClick={() => paginate(number)}  className="style-pagination"> 
                            {number} 
                        </button>
                    </li>
                ))}
                <li className={buttonNext}>
                    <button className="style-next-previous" aria-label="Next" 
                    onClick={() => paginate(currentPage + 1)}
                    disabled={paginate === 9}>
                        <span aria-hidden="true">&raquo;</span>
                        <span className="sr-only"></span>
                    </button>
                </li>
            </ul>
        </nav>
    );

};

export default PaginationCollection;