import {
  faEye,
  faCheck,
  faClose,
  faWrench,
  faCancel,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FC, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { CommissionStatus } from "../../../../types/commission.types";
import api from "../../../../utils/api";
import { displayNotification } from "../../../../utils/helper";

export const TailorActions: FC<{
  id: string;
  status: number;
  refetch: boolean;
  setRefetch: React.Dispatch<React.SetStateAction<boolean>>;
  startDate?: string;
  endDate?: string;
}> = ({ id, status, refetch, setRefetch, startDate, endDate }) => {
  const [dropdown, setDropdown] = useState(false);
  const [date, setDate] = useState("");
  const [message, setMessage] = useState("");
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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
    if (date === "") {
      displayNotification("Pick a complete date", "error");
      return;
    }

    api
      .put(`commissions/${id}`, {
        status: CommissionStatus.IN_PROGRESS,
        end_date: date,
      })
      .then(() => {
        displayNotification("Commission updated successfully", "success");
        setDate("");
        setDropdown(false);
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

  const handleAdjustment = (id: string) => {
    if (date === "") {
      displayNotification("Pick an adjustment date", "error");
      return;
    }

    const ogStartDate = new Date(String(startDate));
    const ogDate = new Date(String(endDate));
    const newDate = new Date(date);

    if (newDate <= ogStartDate) {
      displayNotification("Pick a valid adjustment date", "error");
      return;
    }

    const diffTime = Number(newDate) - Number(ogDate);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    const formData = {
      commission_id: String(id),
      adjustment_date: date,
      message: message,
      duration: String(diffDays),
    };

    api
      .post("adjustments", formData)
      .then(() => {
        displayNotification("Adjustment have been made", "success");
        setDate("");
        setDropdown(false);
        setRefetch(!refetch);
      })
      .catch((err) => {
        console.error(err);
        displayNotification("Failed to make adjustment", "error");
      });
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
        <>
          <span className="relative">
            <FontAwesomeIcon
              onClick={() => setDropdown(!dropdown)}
              className="hover:text-success"
              icon={faCheck}
              title="Accept"
            />
            {dropdown && (
              <div
                ref={dropdownRef}
                className="absolute top-0 right-0 w-auto h-fit translate-x-[45%] translate-y-[35%] p-2 bg-white border rounded-md shadow-md z-10"
              >
                <p>Complete date</p>
                <input
                  onChange={(e) => setDate(e.target.value)}
                  type="date"
                  name="endDate"
                  id="endDate"
                />
                <div className="flex gap-3 mt-2 pt-2 border border-t-gray-400 border-r-0 border-l-0 border-b-0 justify-end">
                  <FontAwesomeIcon
                    onClick={() => setDropdown(false)}
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
          <FontAwesomeIcon
            onClick={() => handleReject(id)}
            className="hover:text-error"
            icon={faCancel}
            title="Rejected"
          />
        </>
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
              onClick={() => setDropdown(!dropdown)}
              className="hover:text-accent"
              icon={faWrench}
              title="Make adjustment"
            />
            {dropdown && (
              <div
                ref={dropdownRef}
                className="absolute top-0 right-0 w-auto h-fit translate-x-[30%] translate-y-[20%] p-2 bg-white border rounded-md shadow-md z-10"
              >
                <p>Adjusted date</p>
                <input
                  onChange={(e) => setDate(e.target.value)}
                  type="date"
                  name="endDate"
                  id="endDate"
                />
                <textarea
                  className="mt-2 p-2 shadow border"
                  name="message"
                  id="message"
                  placeholder="Message"
                  onChange={(e) => setMessage(e.target.value)}
                ></textarea>
                <div className="flex gap-3 mt-2 pt-2 border border-t-gray-400 border-r-0 border-l-0 border-b-0 justify-end">
                  <FontAwesomeIcon
                    onClick={() => setDropdown(false)}
                    className="hover:text-error"
                    icon={faClose}
                    title="Cancel"
                  />
                  <FontAwesomeIcon
                    onClick={() => handleAdjustment(id)}
                    className="hover:text-success"
                    icon={faCheck}
                    title="Confirm"
                  />
                </div>
              </div>
            )}
          </span>
          <FontAwesomeIcon
            onClick={() => handleReject(id)}
            className="hover:text-error"
            icon={faCancel}
            title="Rejected"
          />
        </>
      ) : (
        // Delivering state
        Number(status) === CommissionStatus.DELIVERING && (
          <FontAwesomeIcon
            onClick={() => handleReject(id)}
            className="hover:text-error"
            icon={faCancel}
            title="Cancel"
          />
        )
      )}
    </td>
  );
};
