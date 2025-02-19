import React from "react";
import HelpIcon from './icons/HelpIcon';
import showToolTip from "./Tooltip";

interface DemoProps {
  showProgressBar: (server: string) => void;
  showToolTip: (content: string, e: React.MouseEvent<HTMLButtonElement>) => void
}

const Demo: React.FC<DemoProps> = ({ showProgressBar, showToolTip }) => {
  return (
    <section className="bg-white p-6 rounded shadow">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Demo
        <button onClick={(e) => showToolTip("You can control the Demo below once all the Servers above are running.<br>The Actions and Info will be activated at that time.", e)}
        className="text-gray-500 hover:text-gray-700 ml-1">
          <HelpIcon width="0.9em" height="0.9em" />
        </button>
        </h2>
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
          <tr className="border-b">
            <td className="p-2 pl-6 demo">-</td>
            <td className="p-2 font-bold">DEMO (8099)</td>
            <td className="p-2">
              <div className="flex space-x-1">
                <button
                  className="bg-orange-500 text-white px-3 py-1 rounded"
                  onClick={() => showProgressBar("demo")}
                >
                  Start
                </button>
                <button
                  className="bg-orange-500 text-white px-3 py-1 rounded"
                  onClick={() => showProgressBar("demo")}
                >
                  Stop
                </button>
                <button className="bg-orange-500 text-white px-3 py-1 rounded">
                  Status
                </button>
              </div>
            </td>
            <td className="p-2">-</td>
          </tr>
        </tbody>
      </table>
    </section>
  );
};

export default Demo;
