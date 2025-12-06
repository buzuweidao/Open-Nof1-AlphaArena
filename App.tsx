import React, { useState, useMemo, useEffect } from 'react';
import Header from './components/Header';
import TickerBar from './components/TickerBar';
import MainChart from './components/MainChart';
import RightPanel from './components/RightPanel';
import Leaderboard from './components/Leaderboard';
import ModelDetails from './components/ModelDetails';
import { CompetitionTab, PanelTab, View } from './types';
import { COMPETITION_CONFIG } from './constants';

function App() {
  const [currentView, setCurrentView] = useState<View>('dashboard');
  const [selectedModelId, setSelectedModelId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<CompetitionTab>(CompetitionTab.BASELINE);
  const [activePanel, setActivePanel] = useState<PanelTab>(PanelTab.COMPLETED_TRADES);

  const handleNavigate = (view: View, modelId?: string) => {
      setCurrentView(view);
      if (modelId) setSelectedModelId(modelId);
  };
  
  // Derive current theme config
  const theme = COMPETITION_CONFIG[activeTab];

  // Derive available panel tabs based on competition
  const availablePanelTabs = useMemo(() => {
    if (activeTab === CompetitionTab.AGGREGATE) {
      return [PanelTab.MODELCHAT, PanelTab.SEASON_DETAILS];
    }
    return [PanelTab.COMPLETED_TRADES, PanelTab.MODELCHAT, PanelTab.POSITIONS, PanelTab.COMP_DETAILS];
  }, [activeTab]);

  // Ensure active panel is valid when switching main tabs
  useEffect(() => {
    if (!availablePanelTabs.includes(activePanel)) {
      setActivePanel(availablePanelTabs[0]);
    }
  }, [availablePanelTabs, activePanel]);

  return (
    <div className="flex flex-col h-[100dvh] w-full overflow-hidden text-gray-900 bg-white font-mono shadow-2xl">
      <Header currentView={currentView} onNavigate={handleNavigate} />
      
      {currentView === 'dashboard' ? (
        <>
          <TickerBar activeTab={activeTab} onTabChange={setActiveTab} />
          
          <main className="flex flex-1 flex-col lg:flex-row overflow-hidden relative min-h-0 border-t-2 border-black">
            {/* Left Section: Upgrades Bar + Chart */}
            <div className="flex-none h-[35vh] min-h-[280px] max-h-[450px] lg:max-h-none lg:h-auto lg:flex-1 flex flex-col min-w-0 lg:border-r-2 border-black relative z-0">
               {/* Upgrades Info Bar - Dynamic Color */}
               <div className={`${theme.bg} px-4 py-1.5 h-12 border-b border-black text-[10px] md:text-xs font-mono w-full flex items-center`}>
                  <span className={`font-bold mr-1 ${theme.text} leading-tight break-words w-full block`}>{theme.description}</span>
               </div>
               
               <div className="flex-1 min-h-0 relative">
                  <MainChart activeTab={activeTab} />
               </div>
            </div>

            {/* Right Section: Panel Tabs + Right Panel */}
            <div className="flex-1 lg:flex-none lg:w-[450px] lg:min-w-[350px] flex flex-col min-h-0 bg-white lg:border-t-0">
               {/* Panel Tabs */}
               <div className="relative shrink-0 h-12 mb-[-2px] z-20">
                 {/* Background Strip - stops 2px short of bottom to reveal border line */}
                 <div className={`absolute inset-x-0 top-0 bottom-[2px] ${theme.bg}`}></div>
                 
                 {/* Scroll Container */}
                 <div className="relative w-full h-full flex overflow-x-auto no-scrollbar px-2 pt-2 gap-2 items-end">
                    {availablePanelTabs.map((tab) => (
                      <button
                        key={tab}
                        onClick={() => setActivePanel(tab)}
                        className={`
                          flex-1 flex justify-center text-[10px] font-bold uppercase tracking-wide whitespace-nowrap px-2 border-2 border-black transition-all py-2 relative
                          ${activePanel === tab
                            ? `${theme.panelActive} shadow-none translate-y-[2px] !pb-3`
                            : `bg-white text-black hover:text-black hover:translate-y-0 hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] -translate-y-[2px] active:shadow-none active:translate-y-[4px]`}
                        `}
                      >
                        {tab}
                      </button>
                    ))}
                 </div>
               </div>

               <div className="flex-1 overflow-hidden relative border-t-2 border-black">
                 <RightPanel activePanel={activePanel} onPanelChange={setActivePanel} />
               </div>
            </div>
          </main>
        </>
      ) : currentView === 'leaderboard' ? (
        <Leaderboard onNavigate={handleNavigate} />
      ) : (
        <ModelDetails modelId={selectedModelId} onNavigate={handleNavigate} />
      )}
    </div>
  );
}

export default App;