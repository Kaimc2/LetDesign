import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, ChangeEvent, useEffect } from "react";
import api from "../../utils/api";
import { AdjustmentType } from "../../types/adjustment.types";
import { formatDate } from "../../utils/helper";

export const Adjustment = () => {
  const [search, setSearch] = useState("");
  const [adjustments, setAdjustments] = useState<AdjustmentType[]>([]);

  useEffect(() => {
    api
      .get("adjustments")
      .then((res) => {
        const fetchData = res.data.data.data;
        setAdjustments(fetchData);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const formatDuration = (duration: string) => {
    const isEarly = duration.includes("-");

    if (isEarly) {
      return `${duration.slice(1)} days early`;
    } else {
      return `${duration} days late`;
    }
  };

  return (
    <div className="ml-4">
      <div className="flex h-16 px-8 shadow-lg border border-b-gray-200 items-center justify-between">
        <h1 className="text-2xl">Adjustments</h1>
      </div>

      <div className="p-8 w-full md:max-w-[calc(100vw-330px)] max-h-[calc(100vh-120px)] overflow-y-auto flex flex-col flex-wrap gap-4">
        <div className="relative">
          <FontAwesomeIcon
            className="absolute text-gray-400 left-4 translate-y-[calc(50%+4px)]"
            icon={faSearch}
          />
          <input
            className="px-2 pl-10 py-2 border border-gray-300 rounded-md shadow-md"
            placeholder="Search"
            type="text"
            name="search"
            value={search}
            onChange={handleSearchChange}
            id="search"
          />
        </div>

        <table className="shadow-md table-auto border border-gray-200 rounded-md">
          <thead className="text-left">
            <tr className="border border-b-brand-gray">
              <th className="py-5 pl-8">Commission ID</th>
              <th className="py-5">Adjustment Date</th>
              <th className="py-5">Duration</th>
              <th className="py-5">Message</th>
              <th className="py-5">Tailor</th>
            </tr>
          </thead>

          <tbody>
            {adjustments.length ? (
              adjustments.map((adjustment) => {
                return (
                  <tr
                    key={adjustment.id}
                    className="border border-b-brand-gray"
                  >
                    <td className="flex items-center gap-4 py-4 pl-8">
                      {adjustment.commissionId}
                    </td>
                    <td className="py-4">
                      {formatDate(adjustment.adjustmentDate)}
                    </td>
                    <td className="py-4">{formatDuration(adjustment.duration)}</td>
                    <td className="py-4">{adjustment.message ?? "None"}</td>
                    <td className="py-4">{adjustment.tailorName}</td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td className="p-4">No Adjustments</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
