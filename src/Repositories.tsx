import React from "react";

interface RepositoriesProps {
  showProgressBar: (repository: string) => void;
}

const Repositories: React.FC<RepositoriesProps> = ({ showProgressBar }) => {
  const repositories = [
    { id: "fabric", name: "Hyperledger Fabric", status: "🟢" },
    { id: "postgre", name: "PostgreSQL", status: "🟢" },
  ];

  return (
    <section className="bg-white p-6 rounded shadow mb-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Repositories</h2>
      </div>
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 w-20">Status</th>
            <th className="p-2 w-56">Name</th>
            <th className="p-2 w-96">Actions</th>
            <th className="p-2 w-56">Info</th>
          </tr>
        </thead>
        <tbody className="server-table">
          {repositories.map((repo) => (
            <tr key={repo.id} className="border-b">
              <td className="p-2 pl-6">{repo.status}</td>
              <td className="p-2 font-bold">{repo.name}</td>
              <td className="p-2">
                <div className="flex space-x-1">
                  <button
                    className="bg-orange-500 text-white px-3 py-1 rounded"
                    onClick={() => showProgressBar(repo.id)}
                  >
                    Start
                  </button>
                  <button
                    className="bg-orange-500 text-white px-3 py-1 rounded"
                    onClick={() => showProgressBar(repo.id)}
                  >
                    Stop
                  </button>
                  <button className="bg-orange-500 text-white px-3 py-1 rounded">
                    Status
                  </button>
                </div>
              </td>
              <td className="p-2"></td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default Repositories;
