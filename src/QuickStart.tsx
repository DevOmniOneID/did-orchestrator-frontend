import React, { useState } from "react";

interface QuickStartProps {
  showProgressBar: (server: string) => void;
  openGenerateAll: () => void;
  showToolTip: (e: React.MouseEvent<HTMLButtonElement>) => void
}

const QuickStart: React.FC<QuickStartProps> = ({ showProgressBar, openGenerateAll, showToolTip }) => {
  const [status, setStatus] = useState("🟡");

  const startAllServers = async () => {
    try {
      const response = await fetch(`/startup/all`, { method: "GET" });
      if (response.ok) {
        console.log("All servers started successfully");
        setStatus("🟢");
      } else {
        console.error("Failed to start all servers");
        setStatus("🔴");
      }
    } catch (error) {
      console.error("Error starting all servers:", error);
      setStatus("🔴");
    }
  };

  const stopAllServers = async () => {
    try {
      const response = await fetch(`/shutdown/all`, { method: "GET" });
      if (response.ok) {
        console.log("All servers stopped successfully");
        setStatus("🔴");
      } else {
        console.error("Failed to stop all servers");
      }
    } catch (error) {
      console.error("Error stopping all servers:", error);
    }
  };

  return (
    <section className="bg-white p-6 rounded shadow mb-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Quick Start</h2>
      </div>
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 w-20">Status</th>
            <th className="p-2 w-56">Name</th>
            <th className="p-2 w-56">Actions</th>
            <th className="p-2 w-48">Info</th>
            <th className="p-2 w-48">
              Generators
              <button onClick={showToolTip} className="text-gray-500 hover:text-gray-700">
                <svg width="22px" height="16px" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
                  <title>Tool Tip</title>
                  <path d="M256,80A176,176,0,1,0,432,256,176,176,0,0,0,256,80Z" className="fill-none stroke-black stroke-miterlimit-10 stroke-width-32" />
                  <path d="M200,202.29s.84-17.5,19.57-32.57C230.68,160.77,244,158.18,256,158c10.93-.14,20.69,1.67,26.53,4.45,10,4.76,29.47,16.38,29.47,41.09,0,26-17,37.81-36.37,50.8S251,281.43,251,296" className="fill-none stroke-black stroke-linecap-round stroke-miterlimit-10 stroke-width-28" />
                  <circle cx="250" cy="348" r="20" />
                </svg>
              </button>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b">
            <td className="p-2 pl-6">{status}</td>
            <td className="p-2 font-bold">All Entities</td>
            <td className="p-2">
              <div className="flex space-x-1">
                <button className="bg-orange-500 text-white px-3 py-1 rounded" onClick={startAllServers}>
                  Start All
                </button>
                <button className="bg-orange-500 text-white px-3 py-1 rounded" onClick={stopAllServers}>
                  Stop All
                </button>
              </div>
            </td>
            <td className="p-2"></td>
            <td className="p-2">
              <button className="bg-green-700 text-white px-3 py-1 rounded" onClick={openGenerateAll}>
                Gen All
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </section>
  );
};

export default QuickStart;
