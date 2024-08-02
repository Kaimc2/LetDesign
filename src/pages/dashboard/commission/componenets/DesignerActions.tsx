import { faEye, faCancel, faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FC } from "react";
import { Link } from "react-router-dom";
import { CommissionStatus } from "../../../../types/commission.types";
import api from "../../../../utils/api";
import { displayNotification } from "../../../../utils/helper";

export const DesignerActions: FC<{
  refetch: boolean;
  status: number;
  setRefetch: React.Dispatch<React.SetStateAction<boolean>>;
  id: string;
}> = ({ refetch, setRefetch, id, status }) => {
  const handleReject = (id: string) => {
    api
      .put(`commissions/${id}`, { status: CommissionStatus.REJECTED })
      .then(() => {
        displayNotification("Commission updated successfully", "success");
        setRefetch(!refetch);
      })
      .catch((err) => console.error(err));
  };

  const handleReceived = (id: string) => {
    api
      .put(`commissions/${id}`, { status: CommissionStatus.COMPLETED })
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
      {Number(status) === CommissionStatus.DELIVERING && (
        <FontAwesomeIcon
          onClick={() => handleReceived(id)}
          className="hover:text-success"
          icon={faCheck}
          title="Received"
        />
      )}
      <FontAwesomeIcon
        onClick={() => handleReject(id)}
        className="hover:text-error"
        icon={faCancel}
        title="Cancel"
      />
    </td>
  );
};
