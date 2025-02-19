import React, { useState } from "react";

interface ServerProps {
  showProgressBar: (server: string) => void;
  openPopupWallet: (id: string) => void;
  openPopupDid: (id: string) => void;
}

const Servers: React.FC<ServerProps> = ({ showProgressBar, openPopupWallet, openPopupDid }) => {
  const [servers, setServers] = useState([
    { id: "tas", name: "TAS", port: 8090, status: "⚪" },
    { id: "issuer", name: "Issuer", port: 8091, status: "⚪" },
    { id: "verifier", name: "Verifier", port: 8092, status: "⚪" },
    { id: "api", name: "API Server", port: 8093, status: "⚪" },
    { id: "cas", name: "CAS", port: 8094, status: "⚪" },
    { id: "wallet", name: "Wallet Service", port: 8095, status: "⚪" },
  ]);

  const healthCheck = async (serverId: string, serverPort: number) => {
    try {
      const response = await fetch(`/healthcheck/${serverPort}`, {
        method: "GET",
      });
  
      if (!response.ok) {
        throw new Error(`Failed to fetch health status for ${serverId}`);
      }
  
      const data = await response.json();
      setServers((prevServers) =>
        prevServers.map((server) =>
          server.id === serverId
            ? { ...server, status: data.status === "UP" ? "🟢" : "🔴" }
            : server
        )
      );

    } catch (error) {
      console.error("Error checking server status:", error);

      setServers((prevServers) =>
        prevServers.map((server) =>
          server.id === serverId ? { ...server, status: "🔴" } : server
        )
      );
    }
  };
  const startServer = async (serverId: string, serverPort: number) => {
    try {
      const response = await fetch(`/startup/${serverPort}`, {
        method: "GET",
      });

      if (response.ok) {
        console.log(`Server ${serverId} started successfully`);
        healthCheck(serverId, serverPort);
      } else {
        console.error(`Failed to start server ${serverId}`);
      }
    } catch (error) {
      console.error("Error starting server:", error);
    }
  };
  const stopServer = async (serverId: string, serverPort: number) => {
    try {
      const response = await fetch(`/shutdown/${serverPort}`, {
        method: "GET",
      });

      if (response.ok) {
        console.log(`Server ${serverId} stopped successfully`);
        healthCheck(serverId, serverPort);
      } else {
        console.error(`Failed to stop server ${serverId}`);
      }
    } catch (error) {
      console.error("Error stop server:", error);
    }
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
                <div className="flex space-x-1">
                  <button
                    className="bg-green-500 text-white px-3 py-1 rounded"
                    onClick={() => startServer(server.id, server.port)}
                  >
                    Start
                  </button>
                  <button
                    className="bg-red-500 text-white px-3 py-1 rounded"
                    onClick={() => stopServer(server.id, server.port)}
                  >
                    Stop
                  </button>
                  <button 
                  className="bg-gray-500 text-white px-3 py-1 rounded"
                    onClick={() => healthCheck(server.id, server.port)}
                  >
                    Status
                  </button>
                </div>
              </td>
              <td className="p-2">
                <div className="flex space-x-1">
                  <button className="bg-gray-600 text-white px-3 py-1 rounded">
                    Settings
                  </button>
                  <button className="bg-gray-600 text-white px-3 py-1 rounded">
                    Swagger
                  </button>
                </div>
              </td>
              <td className="p-2">
                <div className="flex space-x-1">
                  <button
                    className="bg-blue-500 text-white px-3 py-1 rounded"
                    onClick={() => openPopupWallet(server.id)}
                  >
                    Wallet
                  </button>
                  <button
                    className="bg-purple-500 text-white px-3 py-1 rounded"
                    onClick={() => openPopupDid(server.id)}
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
