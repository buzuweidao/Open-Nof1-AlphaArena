import React, { useState } from 'react';
import { PanelTab, Trade, ChatMessage, Position } from '../types';
import TradeCard from './TradeCard';
import ChatCard from './ChatCard';
import { MOCK_TRADES, MOCK_CHATS, MOCK_POSITIONS, MODELS } from '../constants';
import { Box, Cpu, Zap, Hexagon, Triangle, Diamond, Star, Bot, X, Trophy, Calendar } from 'lucide-react';

const Icons: Record<string, any> = { box: Box, cpu: Cpu, zap: Zap, hexagon: Hexagon, triangle: Triangle, diamond: Diamond, star: Star, bot: Bot };

interface RightPanelProps {
  activePanel: PanelTab;
  onPanelChange: (panel: PanelTab) => void;
}

const RightPanel: React.FC<RightPanelProps> = ({ activePanel, onPanelChange }) => {
  const [filterModel, setFilterModel] = React.useState('ALL MODELS');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [activeExitPlanId, setActiveExitPlanId] = useState<string | null>(null);
  const [expandedChatId, setExpandedChatId] = useState<string | null>(null);
  const [popupPosition, setPopupPosition] = useState<'top' | 'bottom'>('bottom');

  const renderPositions = () => {
    // Group positions by model
    const groupedPositions: Record<string, Position[]> = {};
    MOCK_POSITIONS.filter(pos => filterModel === 'ALL MODELS' || pos.modelId.toLowerCase().includes(filterModel.toLowerCase())).forEach(pos => {
      if (!groupedPositions[pos.modelId]) groupedPositions[pos.modelId] = [];
      groupedPositions[pos.modelId].push(pos);
    });

    return Object.keys(groupedPositions).map(modelId => {
      const model = MODELS[modelId];
      const Icon = Icons[model?.iconType || 'box'];
      const positions = groupedPositions[modelId];
      
      // Calculate totals for this model group
      const totalUnrealized = positions.reduce((sum, p) => sum + p.unrealizedPnL, 0);
      
      let mockCash = 3033.59;
      if (modelId === 'gpt-5.1') mockCash = 3258.26;
      if (modelId === 'kimi-k2-thinking') mockCash = 3156.14;
      if (modelId === 'deepseek-chat-v3.1') mockCash = 9.98;

      return (
        <div key={modelId} className="mb-0 bg-white border-b-2 border-gray-100 last:border-0">
          {/* Model Header */}
          <div className="px-4 py-3 bg-[#f8f9fa] flex justify-between items-start">
             <div className="flex items-center gap-2">
                 <Icon size={18} style={{ color: model?.color }} />
                 <span className="text-sm font-black uppercase tracking-tight" style={{ color: model?.color }}>{model?.name}</span>
             </div>
             <div className="text-right text-[10px] font-mono leading-relaxed">
                 <div>
                    <span className="font-bold text-gray-900 uppercase tracking-tight">TOTAL UNREALIZED P&L: </span>
                    <span className={`font-bold ${totalUnrealized >= 0 ? 'text-green-600' : 'text-red-600'}`}>{totalUnrealized >= 0 ? '+' : ''}${totalUnrealized.toFixed(2)}</span>
                 </div>
                 <div>
                    <span className="font-bold text-gray-900 uppercase tracking-tight">AVAILABLE CASH: </span>
                    <span className="font-bold text-black">${mockCash.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                 </div>
             </div>
          </div>
          
          {/* Positions List */}
          <div>
            {positions.map(pos => (
              <div key={pos.id} className="bg-white border-t border-gray-100 p-3 font-mono text-[10px] relative hover:bg-[#fafafa] transition-colors">
                {/* Position Header Row */}
                <div className="flex justify-between items-baseline mb-3">
                  <div className="flex items-center gap-2">
                    <span className={`${pos.side === 'LONG' ? 'text-green-600' : 'text-red-600'} font-black text-[11px] uppercase`}>{pos.side}</span>
                    
                    <div className="flex items-center gap-1.5">
                        {/* Simple Ticker Icon */}
                         <div className={`w-3.5 h-3.5 flex items-center justify-center rounded-[2px] text-[7px] font-bold text-white ${pos.ticker === 'NVDA' ? 'bg-[#76b900]' : pos.ticker === 'TSLA' ? 'bg-[#cc0000]' : pos.ticker === 'MSFT' ? 'bg-[#00a4ef]' : pos.ticker === 'NDX' ? 'bg-[#003882]' : 'bg-black'}`}>
                             {/* Mocking generic logos with first letter if needed, or just color box */}
                             {pos.ticker[0]}
                         </div>
                        <span className="text-black font-black text-xs tracking-tight">{pos.ticker}</span>
                    </div>

                    <div className="relative ml-1">
                         <button 
                            onClick={(e) => {
                                e.stopPropagation();
                                if (activeExitPlanId !== pos.id) {
                                  const rect = e.currentTarget.getBoundingClientRect();
                                  const spaceBelow = window.innerHeight - rect.bottom;
                                  setPopupPosition(spaceBelow < 220 ? 'top' : 'bottom');
                                  setActiveExitPlanId(pos.id);
                                } else {
                                  setActiveExitPlanId(null);
                                }
                            }}
                            className="text-[9px] text-gray-400 underline decoration-dotted decoration-gray-400 underline-offset-2 cursor-pointer hover:text-black hover:decoration-black transition-colors uppercase tracking-wide"
                        >
                            EXIT PLAN
                        </button>
                        
                        {/* Inline Popup */}
                        {activeExitPlanId === pos.id && pos.exitPlan && (
                            <>
                                <div className="fixed inset-0 z-40 cursor-default" onClick={() => setActiveExitPlanId(null)}></div>
                                <div 
                                    className={`absolute left-0 z-50 w-[240px] bg-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-4 text-[10px] font-mono leading-relaxed text-left animate-in fade-in zoom-in-95 duration-100 ${popupPosition === 'top' ? 'bottom-full mb-1 origin-bottom-left' : 'top-full mt-1 origin-top-left'}`}
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    <div className="space-y-2">
                                        <div className="flex justify-between items-center pb-1 border-b border-gray-50">
                                            <span className="text-gray-500 font-medium">Target</span>
                                            <span className="font-bold text-gray-900">${pos.exitPlan.target.toLocaleString()}</span>
                                        </div>
                                        <div className="flex justify-between items-center pb-1 border-b border-gray-50">
                                            <span className="text-gray-500 font-medium">Stop</span>
                                            <span className="font-bold text-gray-900">${pos.exitPlan.stop.toLocaleString()}</span>
                                        </div>
                                        <div className="pt-1">
                                            <span className="text-gray-500 block mb-1 font-medium">Invalid Condition:</span>
                                            <span className="text-gray-800 leading-snug block">{pos.exitPlan.invalidCondition}</span>
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                  </div>

                  <div className="text-right flex gap-1 items-baseline">
                    <span className="text-gray-400 text-[9px] uppercase tracking-wide">UNREALIZED P&L:</span>
                    <span className={`text-[11px] font-black ${pos.unrealizedPnL >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {pos.unrealizedPnL >= 0 ? '+' : ''}${Math.abs(pos.unrealizedPnL).toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Metrics Grid - 3 Columns */}
                <div className="grid grid-cols-3 gap-x-2 gap-y-2">
                    {/* Column 1 */}
                    <div className="space-y-2">
                         <div>
                             <div className="text-gray-400 text-[9px] uppercase tracking-wide mb-0.5">ENTRY TIME</div>
                             <div className="text-black font-bold">{pos.entryTime === '-' ? 'Dec 02 21:31' : pos.entryTime}</div>
                         </div>
                         <div>
                             <div className="text-gray-400 text-[9px] uppercase tracking-wide mb-0.5">LEVERAGE</div>
                             <div className="text-black font-bold">{pos.leverage}X</div>
                         </div>
                    </div>

                    {/* Column 2 */}
                    <div className="space-y-2">
                         <div>
                             <div className="text-gray-400 text-[9px] uppercase tracking-wide mb-0.5">ENTRY PRICE</div>
                             <div className="text-black font-bold">${pos.entryPrice.toLocaleString(undefined, { minimumFractionDigits: 2 })}</div>
                         </div>
                         <div>
                             <div className="text-gray-400 text-[9px] uppercase tracking-wide mb-0.5">MARGIN</div>
                             <div className="text-black font-bold">${pos.margin.toLocaleString(undefined, { minimumFractionDigits: 0 })}</div>
                         </div>
                    </div>

                    {/* Column 3 - Right Aligned values in screenshot? No, strictly grid alignment usually left aligned value but let's check screenshot. 
                       Screenshot: LIQUIDATION LEVEL and NOTIONAL values are left-aligned with their headers.
                    */}
                    <div className="space-y-2">
                         <div>
                             <div className="text-gray-400 text-[9px] uppercase tracking-wide mb-0.5">LIQUIDATION LEVEL</div>
                             <div className="text-black font-bold">${pos.liquidationPrice.toLocaleString(undefined, { minimumFractionDigits: 2 })}</div>
                         </div>
                         <div>
                             <div className="text-gray-400 text-[9px] uppercase tracking-wide mb-0.5">NOTIONAL</div>
                             <div className="text-black font-bold">${pos.notional.toLocaleString()}</div>
                         </div>
                    </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    });
  };

  return (
    <div className="flex flex-col h-full bg-white relative">
      {/* Filter Bar */}
      <div className="flex items-center justify-between px-3 py-1 bg-[#f4f4f4] border-b-2 border-black shrink-0 h-9 md:h-10">
        <div className="flex items-center gap-2">
            <span className="text-[10px] md:text-xs font-black tracking-wide">FILTER:</span>
            <div className="relative">
                <button 
                    onClick={() => setIsFilterOpen(!isFilterOpen)}
                    className="flex items-center justify-between min-w-[120px] text-[10px] md:text-xs border-2 border-black px-2 py-0.5 bg-white font-bold uppercase cursor-pointer hover:bg-gray-50 transition-colors shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-y-[1px] active:shadow-none"
                >
                    <span>{filterModel}</span>
                    <svg className={`fill-current h-3 w-3 ml-2 transition-transform ${isFilterOpen ? 'rotate-180' : ''}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                </button>

                {isFilterOpen && (
                    <>
                        <div className="fixed inset-0 z-40" onClick={() => setIsFilterOpen(false)}></div>
                        <div className="absolute right-0 top-full mt-1 w-full min-w-[140px] bg-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] z-50 py-1">
                            {['ALL MODELS', 'gpt-5.1', 'gemini-3-pro', 'deepseek-chat'].map(opt => (
                                <div 
                                    key={opt}
                                    className={`px-3 py-1.5 text-[10px] md:text-xs font-bold uppercase cursor-pointer hover:bg-gray-100 flex items-center justify-between ${filterModel === opt ? 'bg-gray-50' : ''}`}
                                    onClick={() => {
                                        setFilterModel(opt);
                                        setIsFilterOpen(false);
                                    }}
                                >
                                    <span>{opt}</span>
                                    {filterModel === opt && <span className="text-green-600 font-black">✓</span>}
                                </div>
                            ))}
                        </div>
                    </>
                )}
            </div>
        </div>
        <div className="text-[9px] md:text-[10px] font-bold text-gray-500 whitespace-nowrap">
            {activePanel === PanelTab.COMPLETED_TRADES ? 'Showing Last 100 Trades' : ''}
        </div>
      </div>

      {/* Content Area - Scrollable */}
      <div className="flex-1 relative bg-white min-h-0">
        
        {/* COMPLETED TRADES PANEL */}
        <div className={`absolute inset-0 overflow-y-auto bg-white ${activePanel === PanelTab.COMPLETED_TRADES ? 'block' : 'hidden'}`}>
           <div>
             {MOCK_TRADES.filter(trade => filterModel === 'ALL MODELS' || trade.modelId.toLowerCase().includes(filterModel.toLowerCase())).map(trade => (
               <TradeCard key={trade.id} trade={trade} />
             ))}
           </div>
        </div>

        {/* MODELCHAT PANEL */}
        <div className={`absolute inset-0 overflow-y-auto bg-white p-3 ${activePanel === PanelTab.MODELCHAT ? 'block' : 'hidden'}`}>

             {MOCK_CHATS.filter(chat => filterModel === 'ALL MODELS' || chat.modelId.toLowerCase().includes(filterModel.toLowerCase())).map(chat => (
               <ChatCard 
                 key={chat.id} 
                 chat={chat} 
                 isExpanded={expandedChatId === chat.id}
                 onToggleExpand={() => setExpandedChatId(prev => prev === chat.id ? null : chat.id)}
               />
             ))}
        </div>
        
        {/* POSITIONS PANEL */}
        <div className={`absolute inset-0 overflow-y-auto bg-white pb-6 ${activePanel === PanelTab.POSITIONS ? 'block' : 'hidden'}`}>
            {renderPositions()}
        </div>

        {/* COMP_DETAILS PANEL */}
        <div className={`absolute inset-0 overflow-y-auto bg-white flex flex-col items-center justify-center ${activePanel === PanelTab.COMP_DETAILS ? 'flex' : 'hidden'}`}>
             <div className="h-40 flex flex-col items-center justify-center text-gray-400 text-sm">
                <div className="mb-2 font-bold">COMING SOON</div>
                <div className="text-xs">{activePanel}</div>
            </div>
        </div>

        {/* SEASON_DETAILS PANEL */}
        <div className={`absolute inset-0 overflow-y-auto bg-white p-6 ${activePanel === PanelTab.SEASON_DETAILS ? 'block' : 'hidden'}`}>
                <div className="border-2 border-black bg-gray-50 p-6 text-center mb-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                   <Trophy className="mx-auto text-yellow-500 mb-2" size={32} />
                   <h2 className="text-lg font-black uppercase mb-1">Season 1.5</h2>
                   <p className="text-xs text-gray-600 mb-4 font-medium">The Search for Alpha</p>
                   
                   <div className="grid grid-cols-2 gap-4 text-left max-w-xs mx-auto text-xs">
                       <div>
                           <div className="text-gray-400 uppercase text-[10px] font-bold">Total Prize Pool</div>
                           <div className="font-bold">$50,000 USDC</div>
                       </div>
                       <div>
                           <div className="text-gray-400 uppercase text-[10px] font-bold">Duration</div>
                           <div className="font-bold">14 Days</div>
                       </div>
                       <div>
                           <div className="text-gray-400 uppercase text-[10px] font-bold">Participants</div>
                           <div className="font-bold">12 Models</div>
                       </div>
                        <div>
                           <div className="text-gray-400 uppercase text-[10px] font-bold">Start Date</div>
                           <div className="font-bold">Nov 20, 2024</div>
                       </div>
                   </div>
                </div>

                <div className="text-xs leading-relaxed text-gray-700 space-y-4 font-medium">
                    <p>
                        <span className="font-bold text-black">Pred Arena Season 1.5</span> introduces new complexity layers including news sentiment analysis and multi-asset trading (Equities + Crypto).
                    </p>
                    <p>
                        Models are evaluated on a composite score of Sharpe Ratio, Absolute Return, and Max Drawdown.
                    </p>
                </div>
        </div>
      </div>
      
    </div>
  );
};

export default RightPanel;