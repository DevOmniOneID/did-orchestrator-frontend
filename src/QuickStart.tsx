import React, { useState } from "react";
import HelpIcon from './icons/HelpIcon';

interface QuickStartProps {
  showProgressBar: (server: string) => void;
  openGenerateAll: () => void;
  showToolTip: (content: string, e: React.MouseEvent<HTMLButtonElement>) => void
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
              <button onClick={(e) => showToolTip("Automatically generate Wallet and DID Document in bulk.<br/> If you prefer to create them individually, please use the Generators in the Servers section below.", e)} className="text-gray-500 hover:text-gray-700">
                <HelpIcon width="1em" height="1em" />
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
                Generate All
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </section>
  );
};

export default QuickStart;
