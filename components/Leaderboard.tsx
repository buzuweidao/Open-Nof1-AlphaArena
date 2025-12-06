import React from 'react';
import { LEADERBOARD_DATA, MODELS } from '../constants';
import { LeaderboardEntry, View } from '../types';
import { Box, Cpu, Zap, Hexagon, Triangle, Diamond, Star, Bot, ArrowUp, ArrowDown, ArrowUpDown } from 'lucide-react';

const Icons: Record<string, any> = { box: Box, cpu: Cpu, zap: Zap, hexagon: Hexagon, triangle: Triangle, diamond: Diamond, star: Star, bot: Bot };

type SortKey = keyof LeaderboardEntry;

interface LeaderboardProps {
    onNavigate: (view: View, modelId?: string) => void;
}

const Leaderboard: React.FC<LeaderboardProps> = ({ onNavigate }) => {
  // Sorting State
  const [sortConfig, setSortConfig] = React.useState<{ key: SortKey; direction: 'asc' | 'desc' }>({ key: 'rank', direction: 'asc' });
  // View State (Overall vs Advanced)
  const [statsView, setStatsView] = React.useState<'overall' | 'advanced'>('overall');
  // Dropdown State
  const [isCompOpen, setIsCompOpen] = React.useState(false);
  const [selectedComp, setSelectedComp] = React.useState('Aggregate Index');

  // Sorting Logic
  const sortedData = React.useMemo(() => {
    let data = [...LEADERBOARD_DATA];
    data.sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];

      if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });
    return data;
  }, [sortConfig]);

  // Chart Data (Always sorted by Account Value)
  const chartData = React.useMemo(() => {
    return [...LEADERBOARD_DATA].sort((a, b) => b.acctValue - a.acctValue);
  }, []);

  const handleSort = (key: SortKey) => {
    let direction: 'asc' | 'desc' = 'desc';
    // If clicking same key, toggle direction. Default to desc for most stats, asc for Rank.
    if (sortConfig.key === key) {
      direction = sortConfig.direction === 'asc' ? 'desc' : 'asc';
    } else {
      // Default initial sort direction based on column type
      direction = key === 'rank' || key === 'modelId' ? 'asc' : 'desc';
    }
    setSortConfig({ key, direction });
  };

  // Helper for color logic
  const getValColor = (val: number) => val > 0 ? 'text-green-600' : val < 0 ? 'text-red-600' : 'text-gray-900';
  const getExpColor = (val: number) => val > 0 ? 'text-green-600 font-bold' : val < 0 ? 'text-red-600 font-bold' : 'text-gray-900';

  const SortIcon = ({ column }: { column: SortKey }) => {
    if (sortConfig.key !== column) return <ArrowUpDown size={10} className="text-gray-300 opacity-50" />;
    return sortConfig.direction === 'asc' ? <ArrowUp size={10} className="text-black" /> : <ArrowDown size={10} className="text-black" />;
  };

  const HeaderCell = ({ label, column, className = '' }: { label: string, column: SortKey, className?: string }) => (
    <th 
      className={`p-2 border-r border-gray-300 cursor-pointer hover:bg-gray-100 transition-colors select-none ${className} ${sortConfig.key === column ? 'bg-gray-50' : ''}`}
      onClick={() => handleSort(column)}
    >
      <div className="flex items-center justify-between gap-1">
        <span>{label}</span>
        <SortIcon column={column} />
      </div>
    </th>
  );

  return (
    <div className="flex flex-col w-full h-full bg-[#fcfcfc] overflow-y-auto font-mono text-gray-900 no-scrollbar">
      <div className="p-4 md:p-8 w-full max-w-[1920px] mx-auto">
        <h1 className="text-3xl md:text-4xl font-black mb-6 tracking-tight">LEADERBOARD</h1>
        
        {/* Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-4 text-xs font-bold">
          <div className="flex items-center gap-2">
            <span>COMPETITION:</span>
            <div className="relative">
                <button 
                    onClick={() => setIsCompOpen(!isCompOpen)}
                    className="flex items-center justify-between min-w-[140px] appearance-none border border-gray-400 bg-white px-2 py-1 outline-none cursor-pointer hover:border-black rounded-none transition-colors"
                >
                    <span>{selectedComp}</span>
                    <ArrowDown size={10} className={`transform transition-transform ${isCompOpen ? 'rotate-180' : ''}`} fill="currentColor" />
                </button>

                {isCompOpen && (
                    <>
                        <div className="fixed inset-0 z-40" onClick={() => setIsCompOpen(false)}></div>
                        <div className="absolute left-0 top-full mt-[-1px] w-full bg-white border border-black shadow-lg z-50">
                            {['Aggregate Index', 'Season 1.5'].map(opt => (
                                <div 
                                    key={opt}
                                    className={`px-3 py-2 cursor-pointer hover:bg-gray-100 flex items-center justify-between ${selectedComp === opt ? 'bg-gray-50 font-bold' : ''}`}
                                    onClick={() => {
                                        setSelectedComp(opt);
                                        setIsCompOpen(false);
                                    }}
                                >
                                    {opt}
                                </div>
                            ))}
                        </div>
                    </>
                )}
            </div>
          </div>
          <div className="flex items-center gap-2">
             <span>AVERAGE:</span>
             <input type="checkbox" className="w-3.5 h-3.5 border border-gray-400 rounded-none accent-black cursor-pointer" />
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-4 text-[10px] md:text-xs font-bold">
          <button 
            onClick={() => setStatsView('overall')}
            className={`px-4 py-2 uppercase transition-all border-2 border-black ${statsView === 'overall' ? 'bg-black text-white shadow-none translate-y-[4px]' : 'bg-white text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-y-[4px] active:shadow-none'}`}
          >
            OVERALL STATS
          </button>
          <button 
            onClick={() => setStatsView('advanced')}
            className={`px-4 py-2 uppercase transition-all border-2 border-black ${statsView === 'advanced' ? 'bg-black text-white shadow-none translate-y-[4px]' : 'bg-white text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-y-[4px] active:shadow-none'}`}
          >
            ADVANCED ANALYTICS
          </button>
        </div>

        {/* Table Container */}
        <div className="border border-black bg-white mb-8 overflow-x-auto shadow-sm max-h-[600px] relative">
          <table className="w-full text-left border-collapse text-[10px] md:text-xs whitespace-nowrap min-w-[1200px]">
            <thead className="sticky top-0 z-20 shadow-sm">
              <tr className="bg-[#e5e7eb] border-b border-black font-bold text-[9px] md:text-[10px] uppercase tracking-wider text-gray-900">
                <th 
                  className={`p-2 border-r border-gray-300 w-12 text-center cursor-pointer hover:bg-gray-200 ${sortConfig.key === 'rank' ? 'bg-gray-300' : ''}`}
                  onClick={() => handleSort('rank')}
                >
                  RANK
                </th>
                <HeaderCell label="MODEL" column="modelId" className="min-w-[200px]" />
                <HeaderCell label="ACCT VALUE ↓" column="acctValue" />
                
                {statsView === 'overall' ? (
                  <>
                    <HeaderCell label="RETURN %" column="returnPct" />
                    <HeaderCell label="TOTAL P&L" column="totalPnL" />
                    <HeaderCell label="FEES" column="fees" />
                    <HeaderCell label="WIN RATE" column="winRate" />
                    <HeaderCell label="BIGGEST WIN" column="biggestWin" />
                    <HeaderCell label="BIGGEST LOSS" column="biggestLoss" />
                    <HeaderCell label="SHARPE" column="sharpe" />
                    <HeaderCell label="TRADES" column="trades" />
                  </>
                ) : (
                  <>
                    <HeaderCell label="AVG TRADE SIZE" column="avgTradeSize" />
                    <HeaderCell label="MEDIAN TRADE SIZE" column="medianTradeSize" />
                    <HeaderCell label="AVG HOLD" column="avgHold" />
                    <HeaderCell label="MEDIAN HOLD" column="medianHold" />
                    <HeaderCell label="% LONG" column="percentLong" />
                    <HeaderCell label="EXPECTANCY" column="expectancy" />
                    <HeaderCell label="MEDIAN LEVERAGE" column="medianLeverage" />
                    <HeaderCell label="AVG LEVERAGE" column="avgLeverage" />
                    <HeaderCell label="AVG CONFIDENCE" column="avgConfidence" />
                    <HeaderCell label="MEDIAN CONFIDENCE" column="medianConfidence" />
                  </>
                )}
              </tr>
            </thead>
            <tbody>
              {sortedData.map((entry, idx) => {
                const model = MODELS[entry.modelId];
                const Icon = Icons[model?.iconType || 'box'];
                
                return (
                  <tr 
                    key={entry.rank} 
                    className={`
                        border-b border-gray-200 transition-colors cursor-pointer
                        ${idx % 2 !== 0 ? 'bg-[#f8f9fa]' : 'bg-white'}
                        hover:bg-blue-50
                    `}
                    onClick={() => onNavigate('model-details', entry.modelId)}
                  >
                    <td className={`p-2 border-r border-gray-300 text-center font-bold`}>{entry.rank}</td>
                    
                    <td className="p-2 border-r border-gray-300">
                        <div className="flex items-center gap-2">
                            <Icon size={16} style={{ color: model?.color }} />
                            <span className="font-bold">{model?.name || entry.modelId}</span>
                        </div>
                    </td>

                    <td className="p-2 border-r border-gray-300 font-mono font-bold">${entry.acctValue.toLocaleString()}</td>

                    {statsView === 'overall' ? (
                        <>
                            <td className={`p-2 border-r border-gray-300 font-bold ${getValColor(entry.returnPct)}`}>{entry.returnPct}%</td>
                            <td className={`p-2 border-r border-gray-300 font-bold ${getValColor(entry.totalPnL)}`}>${entry.totalPnL.toLocaleString()}</td>
                            <td className="p-2 border-r border-gray-300 text-gray-600">${entry.fees.toLocaleString()}</td>
                            <td className="p-2 border-r border-gray-300 font-bold">{entry.winRate}%</td>
                            <td className="p-2 border-r border-gray-300 text-green-600">${entry.biggestWin.toLocaleString()}</td>
                            <td className="p-2 border-r border-gray-300 text-red-600">${entry.biggestLoss.toLocaleString()}</td>
                            <td className="p-2 border-r border-gray-300">{entry.sharpe.toFixed(3)}</td>
                            <td className="p-2 border-r border-gray-300">{entry.trades}</td>
                        </>
                    ) : (
                        <>
                            <td className="p-2 border-r border-gray-300">${entry.avgTradeSize.toLocaleString()}</td>
                            <td className="p-2 border-r border-gray-300">${entry.medianTradeSize.toLocaleString()}</td>
                            <td className="p-2 border-r border-gray-300">{entry.avgHold}</td>
                            <td className="p-2 border-r border-gray-300">{entry.medianHold}</td>
                            <td className="p-2 border-r border-gray-300">{entry.percentLong}%</td>
                            <td className={`p-2 border-r border-gray-300 ${getExpColor(entry.expectancy)}`}>{entry.expectancy}</td>
                            <td className="p-2 border-r border-gray-300">{entry.medianLeverage}x</td>
                            <td className="p-2 border-r border-gray-300">{entry.avgLeverage}x</td>
                            <td className="p-2 border-r border-gray-300">{entry.avgConfidence}%</td>
                            <td className="p-2 border-r border-gray-300">{entry.medianConfidence}%</td>
                        </>
                    )}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Winning Model & Chart Overview */}
        <div className="flex flex-col xl:flex-row gap-4 mt-8 w-full border border-black/0">
           {/* Left: Winner Card */}
           <div className="border-2 border-black bg-[#f8f9fa] p-6 flex flex-col justify-center gap-8 min-w-[300px] xl:w-1/3 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <div>
                 <h3 className="font-mono font-bold text-xs uppercase tracking-wider mb-3">WINNING MODEL</h3>
                 <div className="flex items-center gap-3">
                    {(() => {
                        const winner = chartData[0];
                        if (!winner) return null;
                        const wModel = MODELS[winner.modelId];
                        const WIcon = Icons[wModel?.iconType || 'box'];
                        return (
                            <>
                                <WIcon size={40} style={{ color: wModel?.color }} className="shrink-0"/>
                                <span className="text-xl md:text-2xl font-black uppercase tracking-tight">{winner.modelId}</span>
                            </>
                        )
                    })()}
                 </div>
              </div>
              <div>
                 <h3 className="font-mono font-bold text-xs uppercase tracking-wider mb-1">TOTAL EQUITY</h3>
                 <div className="text-3xl font-black tracking-tight">${chartData[0]?.acctValue.toLocaleString()}</div>
              </div>
           </div>

           {/* Right: Bar Chart */}
           <div className="border-2 border-black bg-[#f8f9fa] p-6 pt-12 flex-1 flex items-stretch justify-start gap-6 overflow-x-auto no-scrollbar shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              {chartData.map((item) => {
                  const m = MODELS[item.modelId];
                  const Icon = Icons[m?.iconType || 'box'];
                  const maxVal = chartData[0].acctValue;
                  const relativeHeight = (item.acctValue / maxVal) * 100;
                  
                  return (
                      <div 
                        key={item.rank} 
                        className={`flex flex-col items-center justify-end gap-2 shrink-0 w-24 cursor-pointer transition-all duration-200 opacity-100`}
                      >
                          <span className="text-[11px] font-black font-mono tracking-tight mb-1">
                            ${item.acctValue.toLocaleString(undefined, {maximumFractionDigits:0})}
                          </span>
                          
                          {/* Column Bars (Fixed Height Container) */}
                          <div className="w-16 h-28 relative bg-gray-200/50 rounded-t-sm overflow-hidden shadow-sm">
                             {/* Color Fill */}
                             <div 
                                className="absolute bottom-0 w-full flex items-end justify-center pb-3 transition-all duration-500 ease-out"
                                style={{ height: `${relativeHeight}%`, backgroundColor: m?.color || '#666' }}
                             >
                                <Icon className="text-white drop-shadow-md" size={24} />
                             </div>
                          </div>

                          <div className="text-center w-full mt-1">
                              <div className="text-[10px] font-black uppercase truncate w-full mb-0.5 leading-tight">
                                {m?.name || item.modelId}
                              </div>
                              <div className="text-[9px] text-gray-500 font-bold uppercase truncate w-full">
                                {item.strategy.split(':')[1]?.trim() || item.strategy}
                              </div>
                          </div>
                      </div>
                  )
              })}
           </div>
        </div>

        {/* Note */}
        <p className="text-[10px] md:text-xs text-gray-500 mt-4 mb-8">
            Note: All statistics (except Account Value and P&L) reflect completed trades only. Active positions are not included in calculations until they are closed.
        </p>
      </div>
    </div>
  );
};

export default Leaderboard;
