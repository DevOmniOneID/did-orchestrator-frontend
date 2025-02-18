import React, { useState } from "react";

interface ServerProps {
  showProgressBar: (server: string) => void;
  openPopupWallet: () => void;
  openPopupDid: () => void;
}

const Servers: React.FC<ServerProps> = ({ showProgressBar, openPopupWallet, openPopupDid }) => {
  const [servers, setServers] = useState([
    { id: "tas", name: "TAS", port: 8090, status: "🔴" },
    { id: "issuer", name: "Issuer", port: 8091, status: "🟢" },
    { id: "verifier", name: "Verifier", port: 8092, status: "🟢" },
    { id: "cas", name: "CAS", port: 8094, status: "⚪" },
    { id: "wallet", name: "Wallet Service", port: 8095, status: "⚪" },
    { id: "api", name: "API Server", port: 8093, status: "⚪" },
  ]);

  const updateServerStatus = (serverId: string, newStatus: string) => {
    setServers((prevServers) =>
      prevServers.map((server) =>
        server.id === serverId ? { ...server, status: newStatus } : server
      )
    );
  };

  return (
    <section className="bg-white p-6 rounded shadow mb-6">
      <h2 className="text-xl font-bold mb-4">Servers</h2>
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 w-20">Status</th>
            <th className="p-2 w-56">Name</th>
            <th className="p-2 w-56">Actions</th>
            <th className="p-2 w-48">Info</th>
            <th className="p-2 w-48">Generators</th>
          </tr>
        </thead>
        <tbody>
          {servers.map((server) => (
            <tr key={server.id} className="border-b">
              <td className="p-2">{server.status}</td>
              <td className="p-2 font-bold">{server.name} ({server.port})</td>
              <td className="p-2">
                <div className="flex space-x-2">
                  <button
                    className="bg-green-500 text-white px-3 py-1 rounded"
                    onClick={() => updateServerStatus(server.id, "🟢")}
                  >
                    Start
                  </button>
                  <button
                    className="bg-red-500 text-white px-3 py-1 rounded"
                    onClick={() => updateServerStatus(server.id, "🔴")}
                  >
                    Stop
                  </button>
                  <button className="bg-gray-500 text-white px-3 py-1 rounded">
                    Status
                  </button>
                </div>
              </td>
              <td className="p-2">
                <div className="flex space-x-2">
                  <button className="bg-gray-600 text-white px-3 py-1 rounded">
                    Settings
                  </button>
                  <button className="bg-gray-600 text-white px-3 py-1 rounded">
                    Swagger
                  </button>
                </div>
              </td>
              <td className="p-2">
                <div className="flex space-x-2">
                  <button
                    className="bg-blue-500 text-white px-3 py-1 rounded"
                    onClick={openPopupWallet}
                  >
                    Wallet
                  </button>
                  <button
                    className="bg-purple-500 text-white px-3 py-1 rounded"
                    onClick={openPopupDid}
                  >
                    DID Document
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default Servers;
