import ReactPaginate from "react-paginate";

export default function Pagination({ callBack }) {
  return (
    <div className="d-flex justify-content-center my-5">
      <ReactPaginate
        nextLabel="›"
        onPageChange={callBack}
        pageRangeDisplayed={1}
        marginPagesDisplayed={1}
        pageCount={20}
        previousLabel="‹"
        pageClassName="page-item"
        pageLinkClassName="page-link bg-transparent text-white"
        previousClassName="page-item"
        previousLinkClassName="page-link bg-transparent"
        nextClassName="page-item"
        nextLinkClassName="page-link bg-transparent"
        breakLabel="..."
        breakClassName="page-item"
        breakLinkClassName="page-link bg-transparent"
        containerClassName="pagination pagination-lg"
        activeClassName="active"
        renderOnZeroPageCount={null}
      />
    </div>
  );
}
