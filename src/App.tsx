import React, { useState } from 'react';
import Servers from "./Servers";
import Demo from "./Demo";
import Repositories from "./Repositories";
import HelpIcon from './icons/HelpIcon';

const generateRandomDid = (): string => {
  const randomHex = [...Array(25)]
    .map(() => Math.floor(Math.random() * 15).toString(15))
    .join('');
  return `did:omn:0x${randomHex}`;
};

const App: React.FC = () => {
  // State for popups
  const [popupDid, setPopupDid] = useState<string | null>(null);
  const [popupWallet, setPopupWallet] = useState<string | null>(null);
  const [popupGenAll, setPopupGenAll] = useState(false);

  const openPopupDid = (id: string) => setPopupDid(id);
  const closePopupDid = () => setPopupDid(null);
  const openPopupWallet = (id: string) => setPopupWallet(id);
  const closePopupWallet = () => setPopupWallet(null);
  const openGenerateAll = () => setPopupGenAll(true);
  const closeGenerateAll = () => setPopupGenAll(false);

  // Function to simulate showing a progress bar by updating table cell content.
  const showProgressBar = (module: string) => {
    const tableBodies = document.querySelectorAll('tbody.server-table');
    tableBodies.forEach((tbody) => {
      tbody.querySelectorAll('tr').forEach((row) => {
        const statusCell = row.querySelector('td.' + module);
        if (statusCell) {
          const statusCell = row.querySelector('td.' + module);
          if (statusCell instanceof HTMLElement) {
            statusCell.innerHTML =
              '<img src="https://i.gifer.com/ZZ5H.gif" alt="Loading..." class="w-5 h-5 inline-block" />';
            statusCell.style.whiteSpace = 'nowrap';
          }
        }
      });
    });
  };

  // Function to show a tooltip near the clicked button.
  const showToolTip = (content: string, e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const target = e.currentTarget;
    const rect = target.getBoundingClientRect();
    const tooltip = document.createElement('div');
    tooltip.className = "absolute bg-gray-700 text-white text-xs rounded py-1 px-2";
    tooltip.style.zIndex = "1000";
    tooltip.innerHTML = content;
    const top = rect.bottom + window.scrollY + 5;
    const left = rect.left + window.scrollX;
    tooltip.style.top = top + "px";
    tooltip.style.left = left + "px";
    document.body.appendChild(tooltip);
    setTimeout(() => tooltip.remove(), 3000);
  };

  const handleWalletSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const password = formData.get("walletPassword") as string;
    const confirmPassword = formData.get("walletConfirmPassword") as string;
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    // 일치할 경우 추가 작업 수행
    // TO-DO
  };

  const handleGenAllSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const password = formData.get("genAllPassword") as string;
    const confirmPassword = formData.get("genAllConfirmPassword") as string;
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    // 일치할 경우 추가 작업 수행
    // TO-DO
  };

  const handleDidSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const password = formData.get("didPassword") as string;
    const confirmPassword = formData.get("didConfirmPassword") as string;
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    // 일치할 경우 추가 작업 수행
    // TO-DO
  };

  return (
    <div className="bg-gray-100">
      <div className="flex h-screen">
        {/* Sidebar */}
        <aside className="w-64 bg-gray-900 text-white flex flex-col border-r border-gray-300 h-[1250px]">
          <div className="p-6 text-lg font-bold">OmniOne OpenDID Orchestrator</div>
          <nav className="flex-1">
            <a href="#" className="block py-3 px-6 bg-orange-500">
              Dashboard
            </a>
          </nav>
          <div className="p-6 text-sm text-gray-400 flex-grow"></div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {/* Top Header */}
          <header className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <button onClick={() => window.open('help')} className="text-gray-500 hover:text-gray-700">
              <HelpIcon width="1.5em" height="1.5em" />
            </button>
          </header>

          {/* Quick Start Table */}
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
                    <button onClick={(e) => showToolTip("Automatically generate Wallet and DID Document in bulk.<br/> If you prefer to create them individually, please use the Generators in the Servers section below.", e)} 
                    className="text-gray-500 hover:text-gray-700">
                      <HelpIcon width="1em" height="1em" />
                    </button>
                  </th>
                </tr>
              </thead>
              <tbody className="server-table">
                <tr className="border-b">
                  <td className="p-2 pl-6 all">🟡</td>
                  <td className="p-2 font-bold">All Entities</td>
                  <td className="p-2">
                    <div className="flex space-x-1">
                      <button className="bg-orange-500 text-white px-3 py-1 rounded" onClick={() => showProgressBar('all')}>
                        Start All
                      </button>
                      <button className="bg-orange-500 text-white px-3 py-1 rounded" onClick={() => showProgressBar('all')}>
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

          {/* Repositories Table */}
          <Repositories showProgressBar={showProgressBar} />

          {/* Servers Table */}
          <Servers
            showProgressBar={showProgressBar}
            openPopupWallet={openPopupWallet}
            openPopupDid={openPopupDid}
          />
          
          {/* Demo Table */}
          <Demo showProgressBar={showProgressBar} />
        </main>
      </div>

      {/* Popup Overlays */}
      {/* Gen All Popup */}
      {popupGenAll && (
        <div id="popup-overlay-genall" className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white w-96 p-6 rounded-lg shadow-lg">
            <h2 className="text-lg font-bold border-b pb-2 mb-4">Wallet & Document All Generator</h2>
            <form onSubmit={handleGenAllSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-bold text-gray-700">Password</label>
                <input type="password" name="genAllPassword" className="w-full border p-2 rounded" />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-bold text-gray-700">Confirm Password</label>
                <input type="password" name="genAllConfirmPassword" className="w-full border p-2 rounded" />
              </div>
              <div className="flex justify-end space-x-2">
                <button type="button" onClick={closeGenerateAll} className="px-4 py-2 border rounded text-gray-700">
                  Cancel
                </button>
                <button type="submit" className="px-4 py-2 bg-orange-500 text-white rounded">
                  Generate
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* DID Document Generator Popup */}
      {popupDid && (
        <div id="popup-overlay-did" className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white w-96 p-6 rounded-lg shadow-lg">
            <h2 className="text-lg font-bold border-b pb-2 mb-4">DID Document Generator</h2>
            <form onSubmit={handleDidSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-bold text-gray-700">DID</label>
                <input type="text" name="did" className="w-full border p-2 rounded" defaultValue={generateRandomDid()} />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-bold text-gray-700">Wallet Name</label>
                <input type="text" name="walletName" className="w-full border p-2 rounded" defaultValue={popupDid} />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-bold text-gray-700">Password</label>
                <input type="password" name="didPassword" className="w-full border p-2 rounded" />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-bold text-gray-700">Confirm Password</label>
                <input type="password" name="didConfirmPassword" className="w-full border p-2 rounded" />
              </div>
              <div className="flex justify-end space-x-2">
                <button type="button" onClick={closePopupDid} className="px-4 py-2 border rounded text-gray-700">
                  Cancel
                </button>
                <button type="submit" className="px-4 py-2 bg-orange-500 text-white rounded">
                  Generate
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Wallet Generator Popup */}
      {popupWallet && (
        <div id="popup-overlay-wallet" className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white w-96 p-6 rounded-lg shadow-lg">
            <h2 className="text-lg font-bold border-b pb-2 mb-4">Wallet Generator</h2>
            <form onSubmit={handleWalletSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-bold text-gray-700">Wallet Name</label>
                <input type="text" name="walletName" className="w-full border p-2 rounded" defaultValue={popupWallet} />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-bold text-gray-700">Password</label>
                <input type="password" name="walletPassword" className="w-full border p-2 rounded" />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-bold text-gray-700">Confirm Password</label>
                <input type="password" name="walletConfirmPassword" className="w-full border p-2 rounded" />
              </div>
              <div className="flex justify-end space-x-2">
                <button type="button" onClick={closePopupWallet} className="px-4 py-2 border rounded text-gray-700">
                  Cancel
                </button>
                <button type="submit" className="px-4 py-2 bg-orange-500 text-white rounded">
                  Generate
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Progress Bar Overlay */}
      <div id="progress-overlay" className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center hidden">
        <img src="https://i.gifer.com/ZZ5H.gif" alt="Loading..." className="w-16 h-16" />
      </div>
    </div>
  );
};

export default App;

