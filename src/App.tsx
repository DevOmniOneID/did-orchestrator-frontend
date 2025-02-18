import React, { useState } from 'react';

const App: React.FC = () => {
  // State for popups
  const [popupDid, setPopupDid] = useState(false);
  const [popupWallet, setPopupWallet] = useState(false);
  const [popupGenAll, setPopupGenAll] = useState(false);

  const openPopupDid = () => setPopupDid(true);
  const closePopupDid = () => setPopupDid(false);
  const openPopupWallet = () => setPopupWallet(true);
  const closePopupWallet = () => setPopupWallet(false);
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
  const showToolTip = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const target = e.currentTarget;
    const rect = target.getBoundingClientRect();
    const tooltip = document.createElement('div');
    tooltip.className = "absolute bg-gray-700 text-white text-xs rounded py-1 px-2";
    tooltip.style.zIndex = "1000";
    tooltip.innerHTML =
      "필요한 Wallet, DID Document를 자동으로 일괄 생성합니다.<br>하나하나 직접 생성이 필요하면 아래 Servers의 Generators에서 생성해주세요.";
    const top = rect.bottom + window.scrollY + 5;
    const left = rect.left + window.scrollX;
    tooltip.style.top = top + "px";
    tooltip.style.left = left + "px";
    document.body.appendChild(tooltip);
    setTimeout(() => tooltip.remove(), 3000);
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
            <button onClick={() => window.open('help.html')} className="text-gray-500 hover:text-gray-700">
              <svg width="36px" height="24px" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
                <title>Help</title>
                <path
                  d="M256,80A176,176,0,1,0,432,256,176,176,0,0,0,256,80Z"
                  className="fill-none stroke-black stroke-miterlimit-10 stroke-width-32"
                />
                <path
                  d="M200,202.29s.84-17.5,19.57-32.57C230.68,160.77,244,158.18,256,158c10.93-.14,20.69,1.67,26.53,4.45,10,4.76,29.47,16.38,29.47,41.09,0,26-17,37.81-36.37,50.8S251,281.43,251,296"
                  className="fill-none stroke-black stroke-linecap-round stroke-miterlimit-10 stroke-width-28"
                />
                <circle cx="250" cy="348" r="20" />
              </svg>
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
                    <button onClick={showToolTip} className="text-gray-500 hover:text-gray-700">
                      <svg width="22px" height="16px" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
                        <title>Tool Tip</title>
                        <path
                          d="M256,80A176,176,0,1,0,432,256,176,176,0,0,0,256,80Z"
                          className="fill-none stroke-black stroke-miterlimit-10 stroke-width-32"
                        />
                        <path
                          d="M200,202.29s.84-17.5,19.57-32.57C230.68,160.77,244,158.18,256,158c10.93-.14,20.69,1.67,26.53,4.45,10,4.76,29.47,16.38,29.47,41.09,0,26-17,37.81-36.37,50.8S251,281.43,251,296"
                          className="fill-none stroke-black stroke-linecap-round stroke-miterlimit-10 stroke-width-28"
                        />
                        <circle cx="250" cy="348" r="20" />
                      </svg>
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
                <tr className="border-b">
                  <td className="p-2 pl-6 fabric">🟢</td>
                  <td className="p-2 font-bold">Hyperledger Fabric</td>
                  <td className="p-2">
                    <div className="flex space-x-1"> 
                      <button className="bg-orange-500 text-white px-3 py-1 rounded" onClick={() => showProgressBar('fabric')}>
                        Start
                      </button>
                      <button className="bg-orange-500 text-white px-3 py-1 rounded" onClick={() => showProgressBar('fabric')}>
                        Stop
                      </button>
                      <button className="bg-orange-500 text-white px-3 py-1 rounded">Status</button>
                    </div>
                  </td>
                  <td className="p-2"></td>
                </tr>
                <tr className="border-b">
                  <td className="p-2 pl-6 postgre">🟢</td>
                  <td className="p-2 font-bold">PostgreSQL</td>
                  <td className="p-2">
                    <div className="flex space-x-1"> 
                      <button className="bg-orange-500 text-white px-3 py-1 rounded" onClick={() => showProgressBar('postgre')}>
                        Start
                      </button>
                      <button className="bg-orange-500 text-white px-3 py-1 rounded" onClick={() => showProgressBar('postgre')}>
                        Stop
                      </button>
                      <button className="bg-orange-500 text-white px-3 py-1 rounded">Status</button>
                    </div>
                  </td>
                  <td className="p-2"></td>
                </tr>
              </tbody>
            </table>
          </section>

          {/* Servers Table */}
          <section className="bg-white p-6 rounded shadow mb-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Servers</h2>
            </div>
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
              <tbody className="server-table">
                <tr className="border-b">
                  <td className="p-2 pl-6 tas">🔴</td>
                  <td className="p-2 font-bold">TAS (8090)</td>
                  <td className="p-2">
                    <div className="flex space-x-1">
                      <button className="bg-orange-500 text-white px-3 py-1 rounded" onClick={() => showProgressBar('tas')}>
                        Start
                      </button>
                      <button className="bg-orange-500 text-white px-3 py-1 rounded" onClick={() => showProgressBar('tas')}>
                        Stop
                      </button>
                      <button className="bg-orange-500 text-white px-3 py-1 rounded">Status</button>
                    </div>
                  </td>
                  <td className="p-2">
                    <div className="flex space-x-1">
                      <button className="bg-gray-500 text-white px-3 py-1 rounded">Settings</button>
                      <button className="bg-gray-500 text-white px-3 py-1 rounded">Swagger</button>
                    </div>
                  </td>
                  <td className="p-2">
                    <button className="bg-blue-500 text-white px-3 py-1 rounded" onClick={openPopupWallet}>
                      Wallet
                    </button>
                    <button className="bg-red-500 text-white px-3 py-1 rounded" onClick={openPopupDid}>
                      DID Document
                    </button>
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="p-2 pl-6 issuer">🟢</td>
                  <td className="p-2 font-bold">Issuer (8091)</td>
                  <td className="p-2">
                    <div className="flex space-x-1">
                      <button className="bg-orange-500 text-white px-3 py-1 rounded" onClick={() => showProgressBar('issuer')}>
                        Start
                      </button>
                      <button className="bg-orange-500 text-white px-3 py-1 rounded" onClick={() => showProgressBar('issuer')}>
                        Stop
                      </button>
                      <button className="bg-orange-500 text-white px-3 py-1 rounded">Status</button>
                    </div>
                  </td>
                  <td className="p-2">
                    <div className="flex space-x-1">
                      <button className="bg-gray-500 text-white px-3 py-1 rounded">Settings</button>
                      <button className="bg-gray-500 text-white px-3 py-1 rounded">Swagger</button>
                    </div>
                  </td>
                  <td className="p-2">
                    <div className="flex space-x-1">
                      <button className="bg-blue-500 text-white px-3 py-1 rounded" onClick={openPopupWallet}>
                        Wallet
                      </button>
                      <button className="bg-red-500 text-white px-3 py-1 rounded" onClick={openPopupDid}>
                        DID Document
                      </button>
                    </div>
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="p-2 pl-6 verifier">🟢</td>
                  <td className="p-2 font-bold">Verifier (8092)</td>
                  <td className="p-2">
                    <div className="flex space-x-1">
                      <button className="bg-orange-500 text-white px-3 py-1 rounded" onClick={() => showProgressBar('verifier')}>
                        Start
                      </button>
                      <button className="bg-orange-500 text-white px-3 py-1 rounded" onClick={() => showProgressBar('verifier')}>
                        Stop
                      </button>
                      <button className="bg-orange-500 text-white px-3 py-1 rounded">Status</button>
                    </div>
                  </td>
                  <td className="p-2">
                    <div className="flex space-x-1">
                      <button className="bg-gray-500 text-white px-3 py-1 rounded">Settings</button>
                      <button className="bg-gray-500 text-white px-3 py-1 rounded">Swagger</button>
                    </div>
                  </td>
                  <td className="p-2">
                    <div className="flex space-x-1">
                      <button className="bg-blue-500 text-white px-3 py-1 rounded" onClick={openPopupWallet}>
                        Wallet
                      </button>
                      <button className="bg-red-500 text-white px-3 py-1 rounded" onClick={openPopupDid}>
                        DID Document
                      </button>
                    </div>
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="p-2 pl-6 cas">⚪</td>
                  <td className="p-2 font-bold">CAS (8094)</td>
                  <td className="p-2">
                    <div className="flex space-x-1">
                      <button className="bg-orange-500 text-white px-3 py-1 rounded" onClick={() => showProgressBar('cas')}>
                        Start
                      </button>
                      <button className="bg-orange-500 text-white px-3 py-1 rounded" onClick={() => showProgressBar('cas')}>
                        Stop
                      </button>
                      <button className="bg-orange-500 text-white px-3 py-1 rounded">Status</button>
                    </div>
                  </td>
                  <td className="p-2">
                    <div className="flex space-x-1">
                      <button className="bg-gray-500 text-white px-3 py-1 rounded">Settings</button>
                      <button className="bg-gray-500 text-white px-3 py-1 rounded">Swagger</button>
                    </div>
                  </td>
                  <td className="p-2">
                    <div className="flex space-x-1">
                      <button className="bg-blue-500 text-white px-3 py-1 rounded" onClick={openPopupWallet}>
                        Wallet
                      </button>
                      <button className="bg-red-500 text-white px-3 py-1 rounded" onClick={openPopupDid}>
                        DID Document
                      </button>
                    </div>
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="p-2 pl-6 wallet">⚪</td>
                  <td className="p-2 font-bold">Wallet Service (8095)</td>
                  <td className="p-2">
                    <div className="flex space-x-1">
                      <button className="bg-orange-500 text-white px-3 py-1 rounded" onClick={() => showProgressBar('wallet')}>
                        Start
                      </button>
                      <button className="bg-orange-500 text-white px-3 py-1 rounded" onClick={() => showProgressBar('wallet')}>
                        Stop
                      </button>
                      <button className="bg-orange-500 text-white px-3 py-1 rounded">Status</button>
                    </div>
                  </td>
                  <td className="p-2">
                    <div className="flex space-x-1">
                      <button className="bg-gray-500 text-white px-3 py-1 rounded">Settings</button>
                      <button className="bg-gray-500 text-white px-3 py-1 rounded">Swagger</button>
                    </div>
                  </td>
                  <td className="p-2">
                    <div className="flex space-x-1">
                      <button className="bg-blue-500 text-white px-3 py-1 rounded" onClick={openPopupWallet}>
                        Wallet
                      </button>
                      <button className="bg-red-500 text-white px-3 py-1 rounded" onClick={openPopupDid}>
                        DID Document
                      </button>
                    </div>
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="p-2 pl-6 api">⚪</td>
                  <td className="p-2 font-bold">API Server (8093)</td>
                  <td className="p-2">
                    <div className="flex space-x-1">
                      <button className="bg-orange-500 text-white px-3 py-1 rounded" onClick={() => showProgressBar('api')}>
                        Start
                      </button>
                      <button className="bg-orange-500 text-white px-3 py-1 rounded" onClick={() => showProgressBar('api')}>
                        Stop
                      </button>
                      <button className="bg-orange-500 text-white px-3 py-1 rounded">Status</button>
                    </div>
                  </td>
                  <td className="p-2">
                    <div className="flex space-x-1">
                      <button className="bg-gray-500 text-white px-3 py-1 rounded">Settings</button>
                      <button className="bg-gray-500 text-white px-3 py-1 rounded">Swagger</button>
                    </div>
                  </td>
                  <td className="p-2"></td>
                </tr>
              </tbody>
            </table>
          </section>

          {/* Demo Table */}
          <section className="bg-white p-6 rounded shadow">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Demo</h2>
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
                    <td className="p-2"><div className="flex space-x-1">-</div></td>
                    <td className="p-2">-</td>
                  </tr>
              </tbody>
            </table>
          </section>
        </main>
      </div>

      {/* Popup Overlays */}
      {/* Gen All Popup */}
      {popupGenAll && (
        <div id="popup-overlay-genall" className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white w-96 p-6 rounded-lg shadow-lg">
            <h2 className="text-lg font-bold border-b pb-2 mb-4">Wallet & Document All Generator</h2>
            <form>
              <div className="mb-4">
                <label className="block text-sm font-bold text-gray-700">Password</label>
                <input type="password" className="w-full border p-2 rounded" />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-bold text-gray-700">Confirm Password</label>
                <input type="password" className="w-full border p-2 rounded" />
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
            <form>
              <div className="mb-4">
                <label className="block text-sm font-bold text-gray-700">DID</label>
                <input type="text" className="w-full border p-2 rounded" defaultValue="did:omn:0x03722f930c194c27da563c2e3be" />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-bold text-gray-700">Wallet Name</label>
                <input type="text" className="w-full border p-2 rounded" defaultValue="tas" />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-bold text-gray-700">Password</label>
                <input type="password" className="w-full border p-2 rounded" />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-bold text-gray-700">Confirm Password</label>
                <input type="password" className="w-full border p-2 rounded" />
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
            <form>
              <div className="mb-4">
                <label className="block text-sm font-bold text-gray-700">Wallet Name</label>
                <input type="text" className="w-full border p-2 rounded" defaultValue="tas" />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-bold text-gray-700">Password</label>
                <input type="password" className="w-full border p-2 rounded" />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-bold text-gray-700">Confirm Password</label>
                <input type="password" className="w-full border p-2 rounded" />
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

