import React, { useState } from 'react';
import { ChatMessage } from '../types';
import { MODELS } from '../constants';
import { Box, Cpu, Zap, Hexagon, Triangle, Diamond, Star, Bot, Play } from 'lucide-react';

const Icons: Record<string, any> = { box: Box, cpu: Cpu, zap: Zap, hexagon: Hexagon, triangle: Triangle, diamond: Diamond, star: Star, bot: Bot };

interface ChatCardProps {
  chat: ChatMessage;
  isExpanded: boolean;
  onToggleExpand: () => void;
}

const ChatCard: React.FC<ChatCardProps> = ({ chat, isExpanded, onToggleExpand }) => {
  const model = MODELS[chat.modelId];
  const Icon = Icons[model?.iconType || 'box'];
  const modelColor = model?.color || '#000';
  
  const [expandedSections, setExpandedSections] = useState({
      userPrompt: false,
      chainOfThought: false,
      tradingDecisions: false
  });

  const toggleSection = (section: keyof typeof expandedSections) => {
      setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  // Helper to determine strategy color
  const getStrategyColor = (strategy: string) => {
    const s = strategy.toLowerCase();
    if (s.includes('monk')) return '#f59e0b'; // Amber-500
    if (s.includes('situational')) return '#f43f5e'; // Rose-500
    if (s.includes('baseline')) return '#10b981'; // Emerald-500
    if (s.includes('leverage')) return '#3b82f6'; // Blue-500
    return '#9ca3af'; // Gray-400
  };

  const strategyColor = getStrategyColor(chat.strategy);
  // Create a very faint background color string (hex + alpha)
  // '0A' is approx 4% opacity
  const bubbleBgColor = `${modelColor}08`; 

  return (
    <div className="relative pl-8 mb-3 font-mono group">
      {/* Timeline Thread Line */}
      <div className="absolute left-[10px] top-7 bottom-[-16px] w-px border-l border-dashed border-gray-300 group-last:hidden opacity-50"></div>

      {/* Icon - aligned with Header */}
      <div className="absolute left-0 top-0.5 z-10 bg-white ring-2 ring-white rounded-full">
         <Icon size={20} style={{ color: modelColor }} strokeWidth={2} />
      </div>

      {/* Content Wrapper */}
      <div className="flex flex-col">
        
        {/* Header (Outside Bubble) */}
        <div className="flex justify-between items-baseline text-[10px] mb-1.5 tracking-wide">
            <div className="flex flex-wrap items-baseline gap-x-2">
                <span 
                    className="font-bold text-xs"
                    style={{ color: modelColor }}
                >
                    {model?.name?.toUpperCase() || chat.modelId}
                </span>
                <span className="text-gray-300 text-[10px]">|</span>
                <span 
                    className="font-medium" 
                    style={{ color: strategyColor }}
                >
                    {chat.strategy}
                </span>
            </div>
            <span className="text-[10px] text-gray-400 font-light">{chat.timestamp}</span>
        </div>

                {/* Message Bubble */}
                <div 
                    className="p-3 pb-5 rounded-md border shadow-sm relative transition-all duration-200 cursor-pointer"
                    style={{ 
                        borderColor: `${modelColor}40`, // 25% opacity border
                        backgroundColor: 'white' // White bg as per screenshot
                    }}
                    onClick={onToggleExpand}
                >
                     {/* Message Content */}
                    <div 
                        className={`text-[11px] leading-relaxed text-gray-800`}
                    >
                        {chat.message}
                    </div>

                    {/* Click to expand details */}
                    <div 
                        className="absolute bottom-1 right-2 cursor-pointer select-none z-10 bg-white/50 pl-2"
                        // onClick={onToggleExpand} // This is already handled by the parent div
                    >
                        <span className="text-[9px] text-gray-400 italic hover:text-gray-600 transition-colors">
                            {isExpanded ? 'click to collapse' : 'click to expand'}
                        </span>
                    </div>
                </div>

        {/* Expandable Sections */}
        {isExpanded && (chat.userPrompt || chat.chainOfThought || chat.tradingDecisions) && (
            <div className="mt-2.5 space-y-1.5">
                {/* USER_PROMPT */}
                {chat.userPrompt && (
                    <div>
                        <button 
                            onClick={(e) => { e.stopPropagation(); toggleSection('userPrompt'); }}
                            className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider hover:opacity-80 transition-opacity"
                            style={{ color: modelColor }}
                        >
                            <Play 
                                size={8} 
                                fill="currentColor" 
                                className={`transition-transform duration-200 ${expandedSections.userPrompt ? 'rotate-90' : ''}`} 
                            />
                            USER_PROMPT
                        </button>
                        {expandedSections.userPrompt && (
                            <div className="pl-4 mt-1 text-[11px] text-gray-600 whitespace-pre-wrap leading-relaxed border-l border-gray-100 ml-1">
                                {chat.userPrompt}
                            </div>
                        )}
                    </div>
                )}

                {/* CHAIN_OF_THOUGHT */}
                {chat.chainOfThought && (
                    <div>
                        <button 
                            onClick={(e) => { e.stopPropagation(); toggleSection('chainOfThought'); }}
                            className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider hover:opacity-80 transition-opacity"
                            style={{ color: modelColor }}
                        >
                            <Play 
                                size={8} 
                                fill="currentColor" 
                                className={`transition-transform duration-200 ${expandedSections.chainOfThought ? 'rotate-90' : ''}`} 
                            />
                            CHAIN_OF_THOUGHT
                        </button>
                        {expandedSections.chainOfThought && (
                            <div className="pl-4 mt-1 text-[11px] text-gray-600 whitespace-pre-wrap leading-relaxed border-l border-gray-100 ml-1">
                                {chat.chainOfThought}
                            </div>
                        )}
                    </div>
                )}

                {/* TRADING_DECISIONS */}
                {chat.tradingDecisions && (
                    <div>
                        <button 
                            onClick={(e) => { e.stopPropagation(); toggleSection('tradingDecisions'); }}
                            className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider hover:opacity-80 transition-opacity"
                            style={{ color: modelColor }}
                        >
                            <Play 
                                size={8} 
                                fill="currentColor" 
                                className={`transition-transform duration-200 ${expandedSections.tradingDecisions ? 'rotate-90' : ''}`} 
                            />
                            TRADING_DECISIONS
                        </button>
                        {expandedSections.tradingDecisions && (
                            <div className="pl-4 mt-1 text-[11px] text-gray-600 whitespace-pre-wrap leading-relaxed border-l border-gray-100 ml-1">
                                {chat.tradingDecisions}
                            </div>
                        )}
                    </div>
                )}
            </div>
        )}
      </div>
    </div>
  );
};

export default ChatCard;
