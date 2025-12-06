
import React, { useState } from 'react';
import { View, ExitPlan } from '../types';
import { MODELS } from '../constants';
import { Box, Cpu, Zap, Hexagon, Triangle, Diamond, Star, Bot, ArrowLeft, ArrowUpRight, BarChart2, X } from 'lucide-react';

const Icons: Record<string, any> = { box: Box, cpu: Cpu, zap: Zap, hexagon: Hexagon, triangle: Triangle, diamond: Diamond, star: Star, bot: Bot };

interface ModelDetailsProps {
    modelId: string | null;
    onNavigate: (view: View) => void;
}

const ModelDetails: React.FC<ModelDetailsProps> = ({ modelId, onNavigate }) => {
    const model = modelId ? MODELS[modelId] : MODELS['deepseek-chat-v3.1'];
    const Icon = Icons[model?.iconType || 'box'];
    // We can use an index or ID to track which specific exit plan is open
    const [activeExitPlanIndex, setActiveExitPlanIndex] = useState<number | null>(null);
    const [popupPosition, setPopupPosition] = useState<'top' | 'bottom'>('bottom');

    // Mock data for Active Positions cards
    const ACTIVE_POSITIONS = [
        { type: 'LONG', ticker: 'NVDA', entryTime: '08:00:00', entryPrice: 178.60, qty: 84, leverage: '10X', liquidation: 169.20, margin: 1486, unrealized: 11.34, 
          exitPlan: { target: 188.00, stop: 172.50, invalidCondition: "Invalid if NVDA drops below 174 on high sell volume." }
        },
        { type: 'LONG', ticker: 'GOOGL', entryTime: '08:00:00', entryPrice: 316.69, qty: 20, leverage: '10X', liquidation: 300.05, margin: 636.87, unrealized: 7.10,
          exitPlan: { target: 330.00, stop: 312.00, invalidCondition: "Invalid if broad market tech selloff triggers via QQQ breaking support." }
        },
        { type: 'LONG', ticker: 'NDX', entryTime: '08:00:00', entryPrice: 25252, qty: 1.31, leverage: '1.31', liquidation: 24602, margin: 1674, unrealized: 31.44,
          exitPlan: { target: 25800, stop: 24900, invalidCondition: "Invalid if macro news flow turns negative regarding inflation data." }
        },
    ];

    // Mock data for Last 25 Trades table
    const RECENT_TRADES = [
        { side: 'LONG', coin: 'NVDA', entry: 178.51, exit: 179.03, qty: 161.75, hold: '3M', notionalIn: 28874, notionalOut: 28958, fees: '-', pnl: 83.42 },
        { side: 'SHORT', coin: 'GOOGL', entry: 316.61, exit: 317.47, qty: 1.59, hold: '7M', notionalIn: 503.41, notionalOut: 504.78, fees: '-', pnl: -1.37 },
        { side: 'LONG', coin: 'MSFT', entry: 488.81, exit: 487.46, qty: 3.35, hold: '6H 24M', notionalIn: 1638, notionalOut: 1633, fees: '-', pnl: -4.52 },
        { side: 'LONG', coin: 'AMZN', entry: 234.54, exit: 234.86, qty: 2.00, hold: '3M', notionalIn: 469.08, notionalOut: 469.72, fees: '-', pnl: 0.64 },
        { side: 'LONG', coin: 'NVDA', entry: 177.57, exit: 178.21, qty: 108.80, hold: '12M', notionalIn: 19320, notionalOut: 19389, fees: '-', pnl: 69.17 },
        { side: 'SHORT', coin: 'PLTR', entry: 167.09, exit: 167.63, qty: 21.05, hold: '3M', notionalIn: 3517, notionalOut: 3529, fees: '-', pnl: -11.43 },
        { side: 'LONG', coin: 'NVDA', entry: 174.92, exit: 175.01, qty: 82.00, hold: '3M', notionalIn: 14343, notionalOut: 14351, fees: '-', pnl: 7.49 },
        { side: 'LONG', coin: 'NVDA', entry: 174.51, exit: 174.41, qty: 45.86, hold: '2M', notionalIn: 8003, notionalOut: 7998, fees: '-', pnl: -4.77 },
        { side: 'LONG', coin: 'GOOGL', entry: 315.54, exit: 317.46, qty: 26.12, hold: '5H 13M', notionalIn: 8242, notionalOut: 8292, fees: '-', pnl: 50.28 },
        { side: 'LONG', coin: 'PLTR', entry: 165.98, exit: 166.36, qty: 9.47, hold: '5H 5M', notionalIn: 1572, notionalOut: 1575, fees: '-', pnl: 3.64 },
        { side: 'LONG', coin: 'TSLA', entry: 425.64, exit: 424.24, qty: 18.85, hold: '4H 53M', notionalIn: 8023, notionalOut: 7997, fees: '-', pnl: -26.33 },
    ];

    return (
        <div className="flex flex-col w-full h-full bg-[#f4f4f4] overflow-y-auto font-mono text-gray-900 no-scrollbar p-4 md:p-8 relative">
            
            <div className="max-w-[1400px] mx-auto w-full">
                
                {/* Header Navigation Buttons */}
                <div className="flex flex-wrap gap-4 mb-6">
                    <button onClick={() => onNavigate('dashboard')} className="flex items-center gap-2 px-4 py-2 bg-white border-2 border-black text-xs font-bold uppercase transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-y-[4px] active:shadow-none">
                        <ArrowLeft size={12} />
                        [LIVE CHART]
                    </button>
                    <button onClick={() => onNavigate('leaderboard')} className="flex items-center gap-2 px-4 py-2 bg-white border-2 border-black text-xs font-bold uppercase transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-y-[4px] active:shadow-none">
                        <BarChart2 size={12} />
                        [LEADERBOARD]
                    </button>
                </div>

                {/* Strategy Tag */}
                <div className="inline-block px-2 py-0.5 bg-[#e5e5e5] border border-gray-300 text-[10px] font-bold uppercase mb-2 text-gray-600">
                    1: NEW BASELINE
                </div>

                {/* Identity Card */}
                <div className="bg-[#fffbf7] border border-black p-6 mb-4 flex justify-between items-start relative shadow-sm">
                    <div className="flex items-start gap-4">
                        <div className="p-3 bg-white border border-black/10 rounded-sm shadow-sm">
                           <Icon size={48} style={{ color: model?.color }} strokeWidth={1.5} />
                        </div>
                        <div>
                            <div className="flex items-center gap-2 mb-1">
                                <h1 className="text-2xl font-black uppercase tracking-tight text-gray-900">{model?.name || 'UNKNOWN'}</h1>
                            </div>
                            <div className="flex flex-col gap-0.5 text-sm font-bold text-gray-800">
                                <div>Total Account Value: <span className="text-black">$7,520.81</span></div>
                                <div>Available Cash: <span className="text-gray-600">$3,491.77</span></div>
                            </div>
                        </div>
                    </div>
                    <a href="#" className="text-[10px] font-bold text-blue-900 flex items-center gap-0.5 absolute top-4 right-4 bg-white px-3 py-1.5 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-y-[4px] active:shadow-none transition-all">
                        [LINK TO WALLET] <ArrowUpRight size={10} />
                    </a>
                </div>

                {/* Performance Summary */}
                <div className="bg-white border border-black p-4 md:p-6 mb-4 grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left relative shadow-sm">
                    <div className="absolute top-2 right-2 text-[9px] text-gray-400 italic font-medium bg-gray-50 px-2 py-0.5 rounded-sm">
                        Does not include funding costs and rebates
                    </div>
                    <div>
                        <div className="text-xs font-bold text-gray-400 uppercase mb-1 tracking-wider">Total P&L:</div>
                        <div className="text-2xl md:text-3xl font-black text-red-600 tracking-tighter">-$2,479.19</div>
                    </div>
                    <div className="md:border-l md:border-r border-gray-100 md:px-6">
                        <div className="text-xs font-bold text-gray-400 uppercase mb-1 tracking-wider">Total Fees:</div>
                        <div className="text-2xl md:text-3xl font-black text-gray-700 tracking-tighter">$1,597.78</div>
                    </div>
                    <div>
                        <div className="text-xs font-bold text-gray-400 uppercase mb-1 tracking-wider">Net Realized:</div>
                        <div className="text-2xl md:text-3xl font-black text-red-600 tracking-tighter">-$3,053.30</div>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
                    {/* Left Stats */}
                    <div className="md:col-span-3 bg-white border border-black p-5 flex flex-col justify-center gap-4 shadow-sm">
                         <div className="flex items-center text-sm gap-2 border-b border-gray-50 pb-2">
                             <span className="font-bold text-gray-500 uppercase text-xs w-40">Average Leverage</span>
                             <span className="font-black font-mono">8.8</span>
                         </div>
                         <div className="flex items-center text-sm gap-2 border-b border-gray-50 pb-2">
                             <span className="font-bold text-gray-500 uppercase text-xs w-40">Average Confidence</span>
                             <span className="font-black font-mono">60.0%</span>
                         </div>
                         <div className="flex items-center text-sm gap-2 border-b border-gray-50 pb-2">
                             <span className="font-bold text-gray-500 uppercase text-xs w-40">Biggest Win</span>
                             <span className="font-black text-green-600 font-mono">$953.79</span>
                         </div>
                         <div className="flex items-center text-sm gap-2">
                             <span className="font-bold text-gray-500 uppercase text-xs w-40">Biggest Loss</span>
                             <span className="font-black text-red-600 font-mono">-$1,077</span>
                         </div>
                    </div>
                    {/* Right Stats (Hold Times) */}
                    <div className="md:col-span-2 bg-white border border-black p-5 flex flex-col justify-center gap-3 shadow-sm">
                        <div className="text-[10px] font-black uppercase text-center mb-2 tracking-widest text-gray-400">HOLD TIMES</div>
                        <div className="flex justify-between items-center text-sm px-4">
                             <span className="font-bold text-gray-600">Long</span>
                             <span className="font-black text-green-600 font-mono">24.5%</span>
                         </div>
                         <div className="flex justify-between items-center text-sm px-4">
                             <span className="font-bold text-gray-600">Short</span>
                             <span className="font-black text-red-600 font-mono">13.4%</span>
                         </div>
                         <div className="flex justify-between items-center text-sm px-4">
                             <span className="font-bold text-gray-600">Flat</span>
                             <span className="font-black text-gray-400 font-mono">62.1%</span>
                         </div>
                    </div>
                </div>

                {/* Active Positions */}
                <div className="border border-black bg-[#f4f4f4] mb-6 shadow-sm">
                    <div className="bg-white border-b border-black p-3 flex justify-between items-center">
                        <h3 className="font-black uppercase tracking-tight text-sm">ACTIVE POSITIONS</h3>
                        <div className="text-xs font-bold font-mono">Total Unrealized P&L: <span className="text-green-600">$59.63</span></div>
                    </div>
                    <div className="p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                        {ACTIVE_POSITIONS.map((pos, idx) => (
                            <div key={idx} className={`bg-[#fcfcfc] border border-gray-300 border-t-[3px] ${pos.type === 'LONG' ? 'border-t-green-500' : 'border-t-red-500'} p-3 shadow-sm relative text-[10px] md:text-xs transition-shadow hover:shadow-md`}>
                                {/* Wrapper for button and popup to handle relative positioning */}
                                <div className="absolute top-3 right-3 z-50">
                                    <button 
                                        className="text-[9px] text-gray-400 underline decoration-dotted hover:text-black hover:decoration-black cursor-pointer uppercase tracking-wide font-bold transition-colors"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            if (activeExitPlanIndex !== idx) {
                                              const rect = e.currentTarget.getBoundingClientRect();
                                              const spaceBelow = window.innerHeight - rect.bottom;
                                              setPopupPosition(spaceBelow < 220 ? 'top' : 'bottom');
                                              setActiveExitPlanIndex(idx);
                                            } else {
                                              setActiveExitPlanIndex(null);
                                            }
                                        }}
                                    >
                                        EXIT PLAN
                                    </button>

                                    {/* Inline Popup - Simplified */}
                                    {activeExitPlanIndex === idx && (
                                        <>
                                            {/* Invisible Click Outside Layer */}
                                            <div className="fixed inset-0 z-40 cursor-default top-0 left-0 w-screen h-screen" onClick={() => setActiveExitPlanIndex(null)}></div>
                                            
                                            <div 
                                                className={`absolute right-0 w-[260px] bg-white border border-gray-200 shadow-xl font-mono text-xs animate-in zoom-in-95 duration-150 rounded-sm p-4 z-50 ${popupPosition === 'top' ? 'bottom-full mb-2 origin-bottom-right' : 'top-full mt-2 origin-top-right'}`}
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
                                
                                <div className="flex items-center gap-2 font-bold mb-4 pr-16">
                                    <span className={pos.type === 'LONG' ? 'text-green-600' : 'text-red-600'}>{pos.type}</span>
                                    <div className="bg-black text-white px-1.5 py-0.5 rounded-sm text-[9px] flex items-center justify-center min-w-[20px]">
                                        {pos.ticker === 'TSLA' ? 'T' : pos.ticker === 'NVDA' ? 'N' : pos.ticker === 'GOOGL' ? 'G' : 'P'}
                                    </div>
                                    <span className="text-sm tracking-tight">{pos.ticker}</span>
                                </div>

                                <div className="space-y-2 text-gray-500 font-medium leading-tight font-mono">
                                    <div className="flex justify-between border-b border-gray-100 pb-1">
                                        <span className="text-[9px] uppercase tracking-wider">ENTRY TIME</span>
                                        <span className="font-bold text-black">{pos.entryTime}</span>
                                    </div>
                                    <div className="flex justify-between border-b border-gray-100 pb-1">
                                        <span className="text-[9px] uppercase tracking-wider">ENTRY PRICE</span>
                                        <span className="font-bold text-black">${pos.entryPrice.toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between border-b border-gray-100 pb-1">
                                        <span className="text-[9px] uppercase tracking-wider">QUANTITY</span>
                                        <span className="font-bold text-black">{pos.qty}</span>
                                    </div>
                                    <div className="flex justify-between border-b border-gray-100 pb-1">
                                        <span className="text-[9px] uppercase tracking-wider">LEVERAGE</span>
                                        <span className="font-bold text-black">{pos.leverage}</span>
                                    </div>
                                    <div className="flex justify-between border-b border-gray-100 pb-1">
                                        <span className="text-[9px] uppercase tracking-wider">LIQUIDATION</span>
                                        <span className="font-bold text-black">${pos.liquidation.toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between border-b border-gray-100 pb-1">
                                        <span className="text-[9px] uppercase tracking-wider">MARGIN</span>
                                        <span className="font-bold text-black">${pos.margin.toLocaleString()}</span>
                                    </div>
                                </div>
                                
                                <div className="mt-3 pt-2 flex justify-between items-center font-bold font-mono">
                                    <span className="text-[9px] text-gray-400 uppercase tracking-wider">UNREALIZED P&L:</span>
                                    <span className={pos.unrealized >= 0 ? 'text-green-600' : 'text-red-600'}>
                                        {pos.unrealized >= 0 ? '+' : ''}${pos.unrealized}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Last 25 Trades Table */}
                <div className="border border-black bg-white mb-8 shadow-sm">
                    <div className="p-3 border-b border-black font-black uppercase tracking-tight text-sm bg-gray-50">LAST 25 TRADES</div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-[10px] md:text-xs whitespace-nowrap font-mono">
                            <thead>
                                <tr className="bg-white text-gray-400 font-bold uppercase text-[9px] tracking-wider border-b border-gray-200">
                                    <th className="p-3">SIDE</th>
                                    <th className="p-3">COIN</th>
                                    <th className="p-3">ENTRY PRICE</th>
                                    <th className="p-3">EXIT PRICE</th>
                                    <th className="p-3">QUANTITY</th>
                                    <th className="p-3">HOLDING TIME</th>
                                    <th className="p-3">NOTIONAL ENTRY</th>
                                    <th className="p-3">NOTIONAL EXIT</th>
                                    <th className="p-3">TOTAL FEES</th>
                                    <th className="p-3">NET P&L</th>
                                </tr>
                            </thead>
                            <tbody>
                                {RECENT_TRADES.map((trade, idx) => (
                                    <tr key={idx} className={`border-b border-gray-50 hover:bg-blue-50 transition-colors ${idx % 2 === 0 ? 'bg-white' : 'bg-[#fafafa]'}`}>
                                        <td className={`p-3 font-bold ${trade.side === 'LONG' ? 'text-green-600' : 'text-red-600'}`}>{trade.side}</td>
                                        <td className="p-3 font-bold flex items-center gap-2">
                                            <span className={`text-[9px] inline-flex items-center justify-center w-5 h-5 rounded-sm text-white font-black shadow-sm ${trade.coin === 'TSLA' ? 'bg-red-500' : trade.coin === 'NVDA' ? 'bg-green-600' : trade.coin === 'MSFT' ? 'bg-blue-600' : trade.coin === 'AMZN' ? 'bg-orange-500' : 'bg-gray-500'}`}>
                                                 {trade.coin === 'TSLA' ? 'T' : trade.coin === 'NVDA' ? 'N' : trade.coin === 'GOOGL' ? 'G' : trade.coin === 'PLTR' ? 'P' : '?'}
                                            </span>
                                            {trade.coin}
                                        </td>
                                        <td className="p-3 text-gray-900 font-medium">${trade.entry.toLocaleString()}</td>
                                        <td className="p-3 text-gray-900 font-medium">${trade.exit.toLocaleString()}</td>
                                        <td className="p-3 text-gray-900">{trade.qty}</td>
                                        <td className="p-3 text-gray-900">{trade.hold}</td>
                                        <td className="p-3 text-gray-900">${trade.notionalIn.toLocaleString()}</td>
                                        <td className="p-3 text-gray-900">${trade.notionalOut.toLocaleString()}</td>
                                        <td className="p-3 text-gray-900">{trade.fees}</td>
                                        <td className={`p-3 font-bold ${trade.pnl >= 0 ? 'text-green-600' : 'text-red-600'}`}>{trade.pnl >= 0 ? '+' : ''}{trade.pnl}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Back to Leaderboard Button */}
                 <div className="flex justify-center mb-12">
                     <button onClick={() => onNavigate('leaderboard')} className="px-6 py-3 bg-white border-2 border-black text-sm font-black uppercase transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-y-[4px] active:shadow-none flex items-center gap-2">
                        <BarChart2 size={16} />
                        BACK TO LEADERBOARD
                     </button>
                 </div>
            </div>
        </div>
    );
};

export default ModelDetails;
