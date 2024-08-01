import {
  faEye,
  faCheck,
  faClose,
  faWrench,
  faCancel,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FC, useState } from "react";
import { Link } from "react-router-dom";
import { CommissionStatus } from "../../../../types/commission.types";
import api from "../../../../utils/api";
import { displayNotification } from "../../../../utils/helper";

export const TailorActions: FC<{
  id: string;
  status: number;
  refetch: boolean;
  setRefetch: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ id, status, refetch, setRefetch }) => {
  const [acceptDropdown, setAcceptDropdown] = useState(false);
  const [endDate, setEndDate] = useState("");

  const handleReject = (id: string) => {
    api
      .put(`commissions/${id}`, { status: CommissionStatus.REJECTED })
      .then(() => {
        displayNotification("Commission updated successfully", "success");
        setRefetch(!refetch);
      })
      .catch((err) => console.error(err));
  };

  const handleAccept = (id: string) => {
    if (endDate === "") {
      displayNotification("Pick a complete date", "error");
      return;
    }

    api
      .put(`commissions/${id}`, {
        status: CommissionStatus.IN_PROGRESS,
        end_date: endDate,
      })
      .then((res) => {
        console.log(res);
        displayNotification("Commission updated successfully", "success");
        setEndDate("");
        setAcceptDropdown(false);
        setRefetch(!refetch);
      })
      .catch((err) => console.error(err));
  };

  const handleDelivery = (id: string) => {
    api
      .put(`commissions/${id}`, { status: CommissionStatus.DELIVERING })
      .then(() => {
        displayNotification("Commission updated successfully", "success");
        setRefetch(!refetch);
      })
      .catch((err) => console.error(err));
  };

  return (
    <td className="flex py-5 gap-5 items-center hover:cursor-pointer">
      <Link to={`/dashboard/commissions/${id}`}>
        <FontAwesomeIcon
          className="hover:text-accent"
          icon={faEye}
          title="View"
        />
      </Link>
      {/* Reviewing state */}
      {Number(status) === CommissionStatus.REVIEWING ? (
        <span className="relative">
          <FontAwesomeIcon
            onClick={() => setAcceptDropdown(true)}
            className="hover:text-success"
            icon={faCheck}
            title="Accept"
          />
          {acceptDropdown && (
            <div className="absolute top-0 right-0 w-auto h-fit translate-x-[45%] translate-y-[35%] p-2 bg-white border rounded-md shadow-md z-10">
              <p>Complete date</p>
              <input
                onChange={(e) => setEndDate(e.target.value)}
                type="date"
                name="endDate"
                id="endDate"
              />
              <div className="flex gap-3 mt-2 pt-2 border border-t-gray-400 border-r-0 border-l-0 border-b-0 justify-end">
                <FontAwesomeIcon
                  onClick={() => setAcceptDropdown(false)}
                  className="hover:text-error"
                  icon={faClose}
                  title="Cancel"
                />
                <FontAwesomeIcon
                  onClick={() => handleAccept(id)}
                  className="hover:text-success"
                  icon={faCheck}
                  title="Confirm"
                />
              </div>
            </div>
          )}
        </span>
      ) : // In progress state
      Number(status) === CommissionStatus.IN_PROGRESS ? (
        <>
          <FontAwesomeIcon
            onClick={() => handleDelivery(id)}
            className="hover:text-success"
            icon={faCheck}
            title="Mark as deliver"
          />
          <span className="relative">
            <FontAwesomeIcon
              onClick={() => setAcceptDropdown(true)}
              className="hover:text-accent"
              icon={faWrench}
              title="Make adjustment"
            />
            {acceptDropdown && (
              <div className="absolute top-0 right-0 w-auto h-fit translate-x-[45%] translate-y-[35%] p-2 bg-white border rounded-md shadow-md z-10">
                <p>Complete date</p>
                <input
                  onChange={(e) => setEndDate(e.target.value)}
                  type="date"
                  name="endDate"
                  id="endDate"
                />
                <div className="flex gap-3 mt-2 pt-2 border border-t-gray-400 border-r-0 border-l-0 border-b-0 justify-end">
                  <FontAwesomeIcon
                    onClick={() => setAcceptDropdown(false)}
                    className="hover:text-error"
                    icon={faClose}
                    title="Cancel"
                  />
                  <FontAwesomeIcon
                    onClick={() => handleAccept(id)}
                    className="hover:text-success"
                    icon={faCheck}
                    title="Confirm"
                  />
                </div>
              </div>
            )}
          </span>
        </>
      ) : (
        // Delivering state
        Number(status) === CommissionStatus.DELIVERING && (
          <FontAwesomeIcon
            onClick={() => handleReject(id)}
            className="hover:text-success"
            icon={faCheck}
            title="Mark as deliver"
          />
        )
      )}
      <FontAwesomeIcon
        onClick={() => handleReject(id)}
        className="hover:text-error"
        icon={faCancel}
        title="Rejected"
      />
    </td>
  );
};
