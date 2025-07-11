import { useState,useEffect } from "react"

export function Pagination({commentLength, prevPageHandler, nextPageHandler, numberOfItemsPage, onclick, currentPage}){
    
    const [numberOfPages, setNumberOfPages] = useState()
    
    useEffect(() => {
        setNumberOfPages(Math.ceil(commentLength / numberOfItemsPage));
    }, [commentLength, numberOfItemsPage]);

    let paginationNumber = []
    for(let i=1 ; i<= numberOfPages; i++){
        paginationNumber.push(<Pages key={i} currentPage={currentPage} pageNumber={i} onclick={onclick}/>)
    }

    return(
        <div>
            <nav aria-label="Page navigation example">
                <ul className="inline-flex -space-x-px text-sm">
                    <li>
                        <a href="#" onClick={prevPageHandler} className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700">Previous</a>
                    </li>
                    { paginationNumber }
                    <li>
                        <a href="#" onClick={nextPageHandler} className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700">Next</a>
                    </li>
                </ul>
            </nav>
        </div>
    )
}

function Pages({pageNumber, onclick, currentPage}){
    return(
        <li>
            <a href="#" onClick={(e)=> onclick(e,pageNumber)} className={`flex items-center ${currentPage === pageNumber ? "bg-slate-500" : "bg-white"} ${currentPage - 5 > pageNumber && "hidden"} ${currentPage + 5 < pageNumber && "hidden"} justify-center px-4 h-10 ms-0 leading-tight text-gray-500 ${currentPage === pageNumber ? "bg-slate-700" : "bg-white"} border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700`}>{pageNumber}</a>
        </li>
    )
}