


    const Pagination = ({ currentPage, handlePageChange, noOfPages }) => {
    
    return (
      <div className="w-full">
        <div className="row mx-0 m-auto ">
          <div className="col-12 text-center pb-4 pt-4">
            <button
              className="btn_mange_pagging dark:text-white"
              disabled={currentPage === 1}
              onClick={() => handlePageChange("Prev")}
            >
              <i className="fa fa-long-arrow-left "></i>&nbsp;&nbsp; Prev
            </button>
         
            <span className="btn btn-accent btn-outline m-5">{currentPage} of {noOfPages}</span>
            <button
              className=" btn_mange_pagging dark:text-white"
              disabled={currentPage === noOfPages}
              onClick={() => handlePageChange("Next")}
            >
              Next <i className="fa fa-long-arrow-right"></i>&nbsp;&nbsp;
            </button>
          </div>
        </div>
      </div>
    );
  };

  export default Pagination;