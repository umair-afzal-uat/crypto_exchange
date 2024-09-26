import ReactPaginate from "react-paginate";
import RowsPaginateIcon from "../icon/RowsPaginateIcon";

const Paginate = ({ onChange, totalItems, currentPage, itemsCountPerPage }) => {
  return (
    <ReactPaginate
      marginPagesDisplayed={1}
      pageRangeDisplayed={3}
      nextLabel={<RowsPaginateIcon />}
      nextClassName={"arrow-next"}
      previousLabel={<RowsPaginateIcon />}
      containerClassName={"pagination"}
      activeClassName={"active"}
      onPageChange={onChange}
      pageCount={Math.ceil(totalItems / itemsCountPerPage)}
      forcePage={currentPage - 1}
      disabledClassName={"disabled"}
    />
  );
};

export default Paginate;
