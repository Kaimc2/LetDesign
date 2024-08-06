import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../utils/api";
import { Design } from "../../types/design.types";
import { CommissionType } from "../../types/commission.types";
import { LayoutLoader } from "../../core/common/Loader";
import { CommissionTable } from "./commission/componenets/CommissionTable";
import useFetchRole from "../../hooks/useFetchRole";
import { DashboardStats } from "../../types/common.types";
import { Bar } from "react-chartjs-2";
import {
  Chart,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register necessary components
Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export const Dashboard = () => {
  const [designs, setDesigns] = useState<Design[]>([]);
  const [commissions, setCommissions] = useState<CommissionType[]>([]);
  const [stats, setStats] = useState<DashboardStats>();
  const [refetch, setRefetch] = useState(false);
  const [loading, setLoading] = useState(true);
  const { role, loadingRole } = useFetchRole();

  // Fetch recent designs
  useEffect(() => {
    api
      .get("designs/recent")
      .then((res) => {
        // console.log(res);
        setDesigns(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  // Fetch recent commissions
  useEffect(() => {
    api
      .get("commissions/recent")
      .then((res) => {
        // console.log(res);
        setCommissions(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [refetch]);

  // Fetch dashboard stats
  useEffect(() => {
    if (!loadingRole) {
      if (role === "admin") {
        api
          .get("dashboard/stats")
          .then((res) => {
            const fetchData: DashboardStats = res.data;
            setStats(fetchData);
            setLoading(false);
          })
          .catch((err) => {
            console.error(err);
            setLoading(false);
          });
      }
    }
  }, [loadingRole, role]);

  if (loading) return <LayoutLoader />;

  const data = {
    labels: ["Daily", "Weekly", "Monthly"],
    datasets: [
      {
        label: "Designs",
        data: stats
          ? [stats.daily.designs, stats.weekly.designs, stats.monthly.designs]
          : [],
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
      {
        label: "Commissions",
        data: stats
          ? [
              stats.daily.commissions,
              stats.weekly.commissions,
              stats.monthly.commissions,
            ]
          : [],
        backgroundColor: "rgba(255, 159, 64, 0.2)",
        borderColor: "rgba(255, 159, 64, 1)",
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="md:ml-4">
      <div className="flex h-16 px-8 shadow-lg border border-b-gray-200 items-center justify-between">
        <h1 className="text-2xl">Overview</h1>
      </div>

      {/* Recent Designs */}
      <div className="p-8 flex flex-col gap-6 md:max-w-[calc(100vw-330px)] md:max-h-[calc(100vh-120px)] overflow-auto">
        {stats && (
          <div className="w-[600px] h-[300px]">
            <Bar data={data} width={600} height={300} />
          </div>
        )}

        <h1 className="font-bold">Recent Designs</h1>
        <div className="w-full h-auto flex flex-wrap gap-11 justify-center md:justify-normal">
          {designs?.length ? (
            designs.map((design) => {
              return (
                <div
                  key={design.id}
                  className="flex flex-col gap-2 hover:cursor-pointer"
                >
                  <Link
                    to={`/design/edit/${design.id}`}
                    className="group relative border border-black rounded-md w-[200px] h-[200px] flex items-center justify-center"
                  >
                    <img
                      className="p-6"
                      src={design.designThumbnail ?? "/placeholder/pf.png"}
                      alt="design_preview"
                    />
                  </Link>
                  <p>{design.name}</p>
                  <p className="text-xs text-brand-gray">
                    Edited {design.updatedAt}
                  </p>
                </div>
              );
            })
          ) : (
            <div className="w-full h-full flex justify-center items-center text-2xl text-gray-400">
              No Designs
            </div>
          )}
        </div>

        {/* Recent Commissions */}
        <h1 className="font-bold">Latest Commissions</h1>
        <CommissionTable
          commissions={commissions}
          refetch={refetch}
          setRefetch={setRefetch}
        />
      </div>
    </div>
  );
};
