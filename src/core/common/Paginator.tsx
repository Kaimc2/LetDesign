import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FC } from "react";

interface Props {
  pageNumber: number;
  currentPage: number;
  lastPage: number;
  prevPage: () => void;
  nextPage: () => void;
}

export const Paginator: FC<Props> = ({
  pageNumber,
  currentPage,
  lastPage,
  prevPage,
  nextPage,
}) => {
  return (
    <div className="flex justify-end gap-2">
      <div className="flex items-center gap-1 mr-2">
        <p>{currentPage}</p>
        <p>of {lastPage}</p>
      </div>
      <button
        onClick={prevPage}
        className="px-3 py-1 border border-gray-300 disabled:opacity-50 rounded-md hover:bg-gray-100"
        disabled={pageNumber === 1}
      >
        <FontAwesomeIcon icon={faChevronLeft} />
      </button>
      <button
        onClick={nextPage}
        className="px-3 py-1 border border-gray-300 disabled:opacity-50 rounded-md hover:bg-gray-100"
        disabled={pageNumber === lastPage}
      >
        <FontAwesomeIcon icon={faChevronRight} />
      </button>
    </div>
  );
};
