import React from 'react';
import { Trade } from '../types';
import { MODELS } from '../constants';
import { ArrowRight, Box, Cpu, Zap, Hexagon, Triangle, Diamond, Star, Bot } from 'lucide-react';

const Icons: Record<string, any> = { box: Box, cpu: Cpu, zap: Zap, hexagon: Hexagon, triangle: Triangle, diamond: Diamond, star: Star, bot: Bot };

interface TradeCardProps {
  trade: Trade;
}

const TradeCard: React.FC<TradeCardProps> = ({ trade }) => {
  const model = MODELS[trade.modelId];
  const Icon = Icons[model?.iconType || 'box'];

  // Generate a light background color based on the model's hex color
  // Increased opacity to ~15% ('26') for background to make the color distinct and visible
  // Border opacity ~30% ('4D')
  const bgOpacity = '26'; 
  const borderOpacity = '4D';
  
  const headerBgColor = model?.color ? `${model.color}${bgOpacity}` : '#f3f4f6'; 
  const headerBorderColor = model?.color ? `${model.color}${borderOpacity}` : '#e5e7eb';

  return (
    <div 
      className="border-b border-gray-200 p-2.5 md:p-3 hover:bg-gray-50 transition-colors font-mono text-xs border-l-4 pl-2.5 md:pl-3"
      style={{ borderLeftColor: model?.color || 'transparent' }}
    >
      {/* Header Line - Dynamically styled with theme colors */}
      <div 
        className="flex justify-between items-center mb-2 p-1.5 rounded-sm border"
        style={{ 
            backgroundColor: headerBgColor,
            borderColor: headerBorderColor
        }}
      >
        <div className="flex items-center gap-1.5 md:gap-2">
           <Icon size={14} style={{ color: model?.color }} strokeWidth={2.5} />
           <span className="font-bold tracking-tight" style={{ color: model?.color }}>{model?.name || trade.modelId}</span>
           <span className="text-gray-400 font-light mx-0.5">|</span>
           
           <span className="font-bold flex items-center gap-1 text-gray-900">
             <span className="bg-black text-white text-[9px] px-1 rounded-sm min-w-[14px] text-center flex items-center justify-center">{trade.ticker[0]}</span>
             {trade.ticker}
           </span>
        </div>
        <span className="text-gray-400 text-[9px] md:text-[10px] font-medium">{trade.timestamp}</span>
      </div>

      {/* Details Grid - Optimized Typography & Layout */}
      <div className="grid grid-cols-[65px_1fr] gap-y-1.5 text-[10px] pl-1">
        
        {/* PRICE */}
        <div className="text-[9px] font-bold text-gray-400 uppercase tracking-wider self-center">Price</div>
        <div className="flex items-center gap-1.5 font-medium text-gray-900">
           <span>${trade.details.priceStart}</span>
           <ArrowRight size={10} className="text-gray-400" />
           <span>${trade.details.priceEnd}</span>
        </div>

        {/* QUANTITY */}
        <div className="text-[9px] font-bold text-gray-400 uppercase tracking-wider self-center">Quantity</div>
        <div className="font-medium text-gray-900">
           {trade.details.quantity.toFixed(2)}
        </div>

        {/* NOTIONAL */}
        <div className="text-[9px] font-bold text-gray-400 uppercase tracking-wider self-center">Notional</div>
        <div className="flex items-center gap-1.5 font-medium text-gray-900">
           <span>${trade.details.notionalStart.toLocaleString()}</span>
           <ArrowRight size={10} className="text-gray-400" />
           <span>${trade.details.notionalEnd.toLocaleString()}</span>
        </div>

        {/* HOLD TIME */}
        <div className="text-[9px] font-bold text-gray-400 uppercase tracking-wider self-center">Hold Time</div>
        <div className="font-medium text-gray-900">
           {trade.details.holdingTime}
        </div>
        
      </div>
    </div>
  );
};

export default TradeCard;