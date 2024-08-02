import { FC } from "react";
import {
  CommissionStatus,
  CommissionType,
} from "../../../../types/commission.types";
import { formatDate } from "../../../../utils/helper";
import useFetchRole from "../../../../hooks/useFetchRole";
import { TailorActions } from "./TailorActions";
import { DesignerActions } from "./DesignerActions";
import { LayoutLoader } from "../../../../core/common/Loader";

interface Props {
  commissions: CommissionType[];
  refetch: boolean;
  setRefetch: React.Dispatch<React.SetStateAction<boolean>>;
}

export const CommissionTable: FC<Props> = ({
  commissions,
  refetch,
  setRefetch,
}) => {
  const { role, loading } = useFetchRole();

  if (loading) return <LayoutLoader />;

  return (
    <table className="shadow-md border border-gray-200 rounded-md">
      <thead className="text-left">
        <tr className="border border-b-brand-gray">
          <th className="py-4 pl-10">Design</th>
          <th className="py-4">Tailor</th>
          <th className="py-4">Status</th>
          <th className="py-4">Start Date</th>
          <th className="py-4">Complete Date</th>
          <th className="py-4 pr-10">Action</th>
        </tr>
      </thead>

      <tbody>
        {commissions.length ? (
          commissions.map((commission) => {
            return (
              <tr key={commission.id} className="border border-b-brand-gray">
                <td className="py-3 pl-10">{commission.designName}</td>
                <td className="py-3">{commission.tailorName}</td>
                <td className="py-3">
                  {Number(commission.status) === CommissionStatus.REVIEWING ? (
                    <p className="bg-brand-gray text-white w-fit p-2 rounded-md">
                      Reviewing
                    </p>
                  ) : Number(commission.status) ===
                    CommissionStatus.IN_PROGRESS ? (
                    <p className="bg-warning text-white w-fit p-2 rounded-md">
                      In progress
                    </p>
                  ) : Number(commission.status) ===
                    CommissionStatus.DELIVERING ? (
                    <p className="bg-warning-dark text-white w-fit p-2 rounded-md">
                      Delivering
                    </p>
                  ) : Number(commission.status) ===
                    CommissionStatus.COMPLETED ? (
                    <p className="bg-success text-white w-fit p-2 rounded-md">
                      Completed
                    </p>
                  ) : (
                    <p className="bg-error text-white w-fit p-2 rounded-md">
                      Rejected
                    </p>
                  )}
                </td>
                <td className="py-3">{formatDate(commission.startDate)}</td>
                <td className="py-3 pr-10">
                  {commission.endDate
                    ? formatDate(commission.endDate)
                    : "To be estimated"}
                </td>
                {/* Actions */}
                {role === "designer" ? (
                  <DesignerActions
                    refetch={refetch}
                    setRefetch={setRefetch}
                    id={commission.id}
                    status={commission.status}
                  />
                ) : (
                  <TailorActions
                    refetch={refetch}
                    setRefetch={setRefetch}
                    id={commission.id}
                    status={commission.status}
                    startDate={commission.startDate}
                    endDate={commission.endDate}
                  />
                )}
              </tr>
            );
          })
        ) : (
          <tr>
            <td className="p-4">No commissions</td>
          </tr>
        )}
      </tbody>
    </table>
  );
};
