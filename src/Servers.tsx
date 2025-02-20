import React, { useState, forwardRef, useImperativeHandle, useEffect } from "react";
import ProgressIcon from "./icons/ProgressIcon";

interface Server {
  id: string;
  name: string;
  port: number;
  // 상태는 "⚪", "🟢", "🔴", 진행 중일 경우 "PROGRESS" 값을 사용합니다.
  status: string;
}

interface ServerProps {
  openPopupWallet: (id: string) => void;
  openPopupDid: (id: string) => void;
}

const defaultServers: Server[] = [
  { id: "tas", name: "TAS", port: 8090, status: "⚪" },
  { id: "issuer", name: "Issuer", port: 8091, status: "⚪" },
  { id: "verifier", name: "Verifier", port: 8092, status: "⚪" },
  { id: "api", name: "API Server", port: 8093, status: "⚪" },
  { id: "cas", name: "CAS", port: 8094, status: "⚪" },
  { id: "wallet", name: "Wallet Service", port: 8095, status: "⚪" },
];

const Servers = forwardRef((props: ServerProps, ref) => {
  const { openPopupWallet, openPopupDid } = props;

  // 초기 상태를 localStorage에서 불러오며, 없으면 defaultServers 사용
  const [servers, setServers] = useState<Server[]>(() => {
    const stored = localStorage.getItem("servers");
    if (stored) {
      try {
        return JSON.parse(stored) as Server[];
      } catch (e) {
        console.error("Error parsing servers from localStorage", e);
        return defaultServers;
      }
    }
    return defaultServers;
  });

  // 상태 변경 시 localStorage에 저장
  useEffect(() => {
    localStorage.setItem("servers", JSON.stringify(servers));
  }, [servers]);

  // fromUser가 true일 때 사용자 직접 호출로 간주하여 진행 상태 체크
  const healthCheck = async (serverId: string, serverPort: number, fromUser: boolean = false) => {
    const currentServer = servers.find((server) => server.id === serverId);
    if (fromUser && currentServer && currentServer.status === "PROGRESS") {
      alert("The operation is currently in progress. Please try again later.");
      return;
    }

    setServers((prevServers) =>
      prevServers.map((server) =>
        server.id === serverId ? { ...server, status: "PROGRESS" } : server
      )
    );

    try {
      const response = await fetch(`/healthcheck/${serverPort}`, { method: "GET" });
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

  const startServer = async (serverId: string, serverPort: number, fromUser: boolean = false) => {
    const currentServer = servers.find((server) => server.id === serverId);
    if (fromUser && currentServer && currentServer.status === "PROGRESS") {
      alert("The operation is currently in progress. Please try again later.");
      return;
    }

    setServers((prevServers) =>
      prevServers.map((server) =>
        server.id === serverId ? { ...server, status: "PROGRESS" } : server
      )
    );

    try {
      const response = await fetch(`/startup/${serverPort}`, { method: "GET" });
      if (response.ok) {
        console.log(`Server ${serverId} started successfully`);
      } else {
        console.error(`Failed to start server ${serverId}`);
      }
    } catch (error) {
      console.error("Error starting server:", error);
    }

    // 내부 호출 시에는 fromUser를 false로 전달해 진행 상태 체크를 건너뜁니다.
    await healthCheck(serverId, serverPort, false);
  };

  const stopServer = async (serverId: string, serverPort: number, fromUser: boolean = false) => {
    const currentServer = servers.find((server) => server.id === serverId);
    if (fromUser && currentServer && currentServer.status === "PROGRESS") {
      alert("The operation is currently in progress. Please try again later.");
      return;
    }

    setServers((prevServers) =>
      prevServers.map((server) =>
        server.id === serverId ? { ...server, status: "PROGRESS" } : server
      )
    );

    try {
      const response = await fetch(`/shutdown/${serverPort}`, { method: "GET" });
      if (response.ok) {
        console.log(`Server ${serverId} stopped successfully`);
      } else {
        console.error(`Failed to stop server ${serverId}`);
      }
    } catch (error) {
      console.error("Error stopping server:", error);
    }

    await healthCheck(serverId, serverPort, false);
  };

  const getOverallStatus = async (): Promise<string> => {
    await new Promise((resolve) => setTimeout(resolve, 500));

    const statuses = servers.map((server) => server.status);
    const allGreen = statuses.every((status) => status === "🟢");
    const allRed = statuses.every((status) => status === "🔴");

    if (allGreen) {
      return "SUCCESS";
    } else if (allRed) {
      return "FAIL";
    } else if (statuses.some((status) => status === "🟢")) {
      return "PARTIAL";
    }
    return "FAIL";
  };

  // 모든 서버에 대해 healthCheck를 실행하여 상태를 업데이트하고 전체 상태를 반환하는 함수
  const statusAll = async (): Promise<string> => {
    for (const server of servers) {
      await healthCheck(server.id, server.port);
    }

    await Promise.all(servers.map((server) => healthCheck(server.id, server.port)));
    return getOverallStatus();
  };

  const startAll = async () => {
    for (const server of servers) {
      await startServer(server.id, server.port);
    }
  };

  const stopAll = async () => {
    for (let i = servers.length - 1; i >= 0; i--) {
      const server = servers[i];
      await stopServer(server.id, server.port);
    }
  };

  useImperativeHandle(ref, () => ({
    getOverallStatus,
    startAll,
    stopAll,
    statusAll,
  }));

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
              <td className="p-2 pl-6 all">
                {server.status === "PROGRESS" ? <ProgressIcon /> : server.status}
              </td>
              <td className="p-2 font-bold">
                {server.name} ({server.port})
              </td>
              <td className="p-2">
                <div className="flex space-x-1">
                  {/* 버튼 클릭 시 내부 함수에서 진행 상태를 체크합니다. */}
                  <button
                    className="bg-green-600 text-white px-3 py-1 rounded"
                    onClick={() => startServer(server.id, server.port, true)}
                  >
                    Start
                  </button>
                  <button
                    className="bg-red-600 text-white px-3 py-1 rounded"
                    onClick={() => stopServer(server.id, server.port, true)}
                  >
                    Stop
                  </button>
                  <button 
                    className="bg-gray-600 text-white px-3 py-1 rounded"
                    onClick={() => healthCheck(server.id, server.port, true)}
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
                    className="bg-orange-500 text-white px-3 py-1 rounded"
                    onClick={() => openPopupWallet(server.id)}
                  >
                    Wallet
                  </button>
                  <button
                    className="bg-orange-500 text-white px-3 py-1 rounded"
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
});

export default Servers;
