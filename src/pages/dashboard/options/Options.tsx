import { useState } from "react";
import { Materials } from "./Materials";
import { Colors } from "./Colors";
import { Sizes } from "./Sizes";

export const Options = () => {
  const [activeTab, setActiveTab] = useState<"materials" | "colors" | "sizes">(
    "materials"
  );

  return (
    <div className="ml-4">
      <div className="flex h-16 px-8 shadow-lg border border-b-gray-200 items-center justify-between">
        <h1 className="text-2xl">Options</h1>
      </div>

      <div className="p-8">
        <div className="border rounded-md shadow shadow-zinc-300 border-gray-300">
          {/* Elevated container */}
          <div className=" flex px-3 pt-2">
            {/* Tab container */}
            <button
              className={`px-4 py-2 mr-2 rounded-t-md ${
                activeTab === "materials"
                  ? "border-b-2 border-accent text-accent-80"
                  : "text-gray-500"
              }`}
              onClick={() => setActiveTab("materials")}
            >
              Materials
            </button>
            <button
              className={`px-4 py-2 rounded-t-md ${
                activeTab === "colors"
                  ? "border-b-2 border-accent text-accent-80"
                  : "text-gray-500"
              }`}
              onClick={() => setActiveTab("colors")}
            >
              Colors
            </button>
            <button
              className={`px-4 py-2 rounded-t-md ${
                activeTab === "sizes"
                  ? "border-b-2 border-accent text-accent-80"
                  : "text-gray-500"
              }`}
              onClick={() => setActiveTab("sizes")}
            >
              Sizes
            </button>
          </div>
          <hr className="border-1  border-gray-500 opacity-50" />
          {/* Faded bottom border */}
          <div className="p-3 overflow-y-auto max-h-[500px]">
            {activeTab === "materials" && <Materials />}
            {activeTab === "colors" && <Colors />}
            {activeTab === "sizes" && <Sizes />}
          </div>
        </div>
      </div>
    </div>
  );
};
