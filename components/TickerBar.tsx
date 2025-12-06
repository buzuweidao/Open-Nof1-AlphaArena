import React, { useState, useEffect } from 'react';
import { CompetitionTab } from '../types';
import { TICKERS, COMPETITION_CONFIG } from '../constants';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface TickerBarProps {
  activeTab: CompetitionTab;
  onTabChange: (tab: CompetitionTab) => void;
}

const TickerBar: React.FC<TickerBarProps> = ({ activeTab, onTabChange }) => {
  const tabs = Object.values(CompetitionTab);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div className="flex flex-col-reverse xl:flex-row w-full z-20 shadow-sm shrink-0 xl:justify-between mb-[-2px]">
      
      {/* Container 1: Competition Tabs */}
      <div className="flex flex-nowrap overflow-x-auto no-scrollbar xl:bg-transparent px-2 md:px-4 pt-2 pb-0 gap-2 border-black shrink-0 xl:flex-1 xl:min-w-0 items-end w-full h-12">
        {tabs.map((tab) => {
          const isActive = activeTab === tab;
          const config = COMPETITION_CONFIG[tab];
          
          return (
            <button
                key={tab}
                onClick={() => onTabChange(tab)}
                className={`
                px-3 md:px-4 py-2 text-[10px] md:text-[11px] font-bold whitespace-nowrap border-2 border-black transition-all min-w-[80px] shrink-0 flex justify-center relative
                ${isActive 
                    ? config.activeClass 
                    : `${config.bg} ${tab === CompetitionTab.LEVERAGE ? config.text : 'text-gray-500'} shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] -translate-y-[2px] hover:text-black hover:translate-y-0 hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-y-[4px]`}
                `}
            >
                {tab}
            </button>
          );
        })}
      </div>

      {/* Container 2: Tickers */}
      <div className="flex items-center bg-white border-t-2 xl:border-t-0 border-b-2 border-black overflow-hidden w-full xl:w-auto shrink-0 relative h-10 md:h-auto">
        <style>{`
          @keyframes scroll-left {
            0% { transform: translateX(0); }
            100% { transform: translateX(-100%); }
          }
          .animate-scroll-left {
            animation: scroll-left 40s linear infinite;
            animation-play-state: running; /* Ensure animation runs */
          }
        `}</style>
        
        {isMobile ? (
          <div className="flex items-center gap-6 px-3 animate-scroll-left w-max">
            {[...TICKERS, ...TICKERS].map((ticker, index) => (
              <div key={`${ticker.symbol}-${index}`} className="flex flex-col items-end shrink-0 cursor-default group px-1">
                
                 {/* Row 1: Symbol & Trend Icon */}
                <div className="flex items-center gap-1 mb-0.5 opacity-50 group-hover:opacity-100 transition-opacity">
                   {ticker.isPositive ? <TrendingUp size={9} className="text-green-600"/> : <TrendingDown size={9} className="text-red-600"/>}
                   <span className="font-bold text-gray-500 text-[9px] tracking-wider uppercase">{ticker.symbol}</span>
                </div>

                {/* Row 2: Price & Change */}
                <div className="flex items-center gap-1.5 font-mono text-[11px] leading-none">
                  <span className="font-black text-gray-900 tracking-tight">${ticker.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                  <span className={`font-bold text-[9px] ${ticker.isPositive ? 'text-green-600 bg-green-50 px-1 rounded-sm' : 'text-red-600 bg-red-50 px-1 rounded-sm'}`}>
                    {ticker.isPositive ? '+' : ''}{ticker.change}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex items-center gap-3 px-3 py-1 md:py-2 justify-start">
            {TICKERS.map((ticker, index) => (
              <div key={`${ticker.symbol}-${index}`} className="flex flex-col items-end shrink-0 cursor-default group px-1">
                
                 {/* Row 1: Symbol & Trend Icon */}
                <div className="flex items-center gap-1 mb-0.5 opacity-50 group-hover:opacity-100 transition-opacity">
                   {ticker.isPositive ? <TrendingUp size={9} className="text-green-600"/> : <TrendingDown size={9} className="text-red-600"/>}
                   <span className="font-bold text-gray-500 text-[9px] tracking-wider uppercase">{ticker.symbol}</span>
                </div>

                {/* Row 2: Price & Change */}
                <div className="flex items-center gap-1.5 font-mono text-[11px] leading-none">
                  <span className="font-black text-gray-900 tracking-tight">${ticker.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                  <span className={`font-bold text-[9px] ${ticker.isPositive ? 'text-green-600 bg-green-50 px-1 rounded-sm' : 'text-red-600 bg-red-50 px-1 rounded-sm'}`}>
                    {ticker.isPositive ? '+' : ''}{ticker.change}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
};

export default TickerBar;