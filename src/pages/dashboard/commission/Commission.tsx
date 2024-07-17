import { faEllipsis, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const Commission = () => {
  return (
    <div className="ml-4">
      <div className="flex h-16 px-8 shadow-lg border border-b-gray-200 items-center justify-between">
        <h1 className="text-2xl">Commissions</h1>
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
            id="search"
          />
        </div>

        <table className="shadow-md border border-gray-200 rounded-md">
          <thead className="text-left">
            <tr className="border border-b-brand-gray">
              <th className="py-6 pl-10">Design</th>
              <th className="py-6">Tailor</th>
              <th className="py-6">Status</th>
              <th className="py-6">Start Date</th>
              <th className="py-6">Complete Date</th>
              <th className="py-6 pr-10"></th>
            </tr>
          </thead>
          <tbody>
            <tr className="border border-b-brand-gray">
              <td className="py-4 pl-10">Design Name</td>
              <td className="py-4">Tailor Name</td>
              <td className="py-4">
                <p className="bg-warning text-white w-fit p-2 rounded-md">
                  In progress
                </p>
              </td>
              <td className="py-4">May 30, 2024</td>
              <td className="py-4 pr-10">To be estimated</td>
              <td className="hover:cursor-pointer">
                <FontAwesomeIcon icon={faEllipsis} />
              </td>
            </tr>
            <tr className="border border-b-brand-gray">
              <td className="py-4 pl-10">Design Name 2</td>
              <td className="py-4">Tailor Name</td>
              <td className="py-4">
                <p className="bg-success text-white w-fit p-2 rounded-md">
                  Complete
                </p>
              </td>
              <td className="py-4">May 30, 2024</td>
              <td className="py-4 pr-10">To be estimated</td>
              <td className="hover:cursor-pointer">
                <FontAwesomeIcon icon={faEllipsis} />
              </td>
            </tr>
            <tr className="border border-b-brand-gray">
              <td className="py-4 pl-10">Design Name 3</td>
              <td className="py-4">Tailor Name</td>
              <td className="py-4">
                <p className="bg-error text-white w-fit p-2 rounded-md">
                  Reject
                </p>
              </td>
              <td className="py-4">May 30, 2024</td>
              <td className="py-4 pr-10">To be estimated</td>
              <td className="hover:cursor-pointer">
                <FontAwesomeIcon icon={faEllipsis} />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
