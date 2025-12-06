import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts';
import { ChartDataPoint, CompetitionTab } from '../types';
import { MODELS, INITIAL_CHART_DATA } from '../constants';
import { Box, Cpu, Zap, Hexagon, Triangle, Diamond, Star, Bot } from 'lucide-react';

const Icons: Record<string, any> = { box: Box, cpu: Cpu, zap: Zap, hexagon: Hexagon, triangle: Triangle, diamond: Diamond, star: Star, bot: Bot };

interface MainChartProps {
  activeTab: CompetitionTab;
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white/95 border-2 border-black p-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] text-[10px] md:text-xs font-mono z-50 min-w-[140px] backdrop-blur-sm">
        <p className="font-bold mb-1 border-b border-gray-300 pb-1">{new Date(label).toLocaleString([], {month: 'numeric', day: 'numeric', hour: '2-digit', minute:'2-digit'})}</p>
        {payload
          .sort((a: any, b: any) => b.value - a.value)
          .map((entry: any) => (
          <div key={entry.name} style={{ color: entry.color }} className="flex justify-between gap-4 items-center mb-0.5">
            <span className="font-semibold">{entry.name}:</span>
            <span className="font-bold tracking-tight">${entry.value.toLocaleString()}</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

const MainChart: React.FC<MainChartProps> = ({ activeTab }) => {
  const [data, setData] = React.useState<ChartDataPoint[]>(INITIAL_CHART_DATA);
  const [viewMode, setViewMode] = React.useState<'currency' | 'percent'>('currency');
  const [visibleModels, setVisibleModels] = React.useState<Record<string, boolean>>(
    Object.keys(MODELS).reduce((acc, key) => ({ ...acc, [key]: true }), {})
  );
  const chartContainerRef = React.useRef<HTMLDivElement>(null);
  const [chartSize, setChartSize] = React.useState({ width: 0, height: 0 });
  
  // Responsive check
  const [isMobile, setIsMobile] = React.useState(false);
  React.useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Transform data to include numeric timestamps for continuous X-axis
  const chartData = React.useMemo(() => {
    return data.map(point => ({
      ...point,
      timeNum: new Date(point.time).getTime()
    }));
  }, [data]);

  // Simulate data update
  React.useEffect(() => {
     setData(INITIAL_CHART_DATA.map(d => ({...d}))); 
  }, [activeTab]);

  React.useLayoutEffect(() => {
    const container = chartContainerRef.current;
    if (!container) return;

    const updateSize = () => {
      const rect = container.getBoundingClientRect();
      const width = Math.max(0, rect.width);
      const height = Math.max(0, rect.height);
      setChartSize({ width, height });
    };

    updateSize();

    let observer: ResizeObserver | null = null;
    if (typeof ResizeObserver !== 'undefined') {
      observer = new ResizeObserver(updateSize);
      observer.observe(container);
    } else {
      window.addEventListener('resize', updateSize);
    }

    return () => {
      if (observer) observer.disconnect();
      window.removeEventListener('resize', updateSize);
    };
  }, []);

  const formatXAxis = (tickItem: number) => {
    const date = new Date(tickItem);
    const month = date.toLocaleDateString('en-US', { month: 'short' });
    const day = date.getDate();
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${month} ${day} ${hours}:${minutes}`;
  };

  const formatYAxis = (tick: number) => {
     if (viewMode === 'percent') return `${tick}%`;
     // Compact currency format
     if (tick >= 1000) return `$${(tick / 1000).toFixed(1)}k`;
     return `$tick`;
  };

  const toggleModel = (modelName: string) => {
    setVisibleModels(prev => {
      // If the clicked model is the only one currently visible, toggle all to true.
      // Otherwise, set only the clicked model to true and others to false.
      const allModelsVisible = Object.values(prev).every(Boolean);
      const isOnlyThisModelVisible = prev[modelName] && Object.keys(prev).filter(key => prev[key]).length === 1;

      if (isOnlyThisModelVisible) {
        return Object.keys(MODELS).reduce((acc, key) => ({ ...acc, [key]: true }), {});
      } else {
        return Object.keys(MODELS).reduce(
          (acc, key) => ({ ...acc, [key]: key === modelName }),
          {}
        );
      }
    });
  };

  const currentValues = data[data.length - 1] || {};

  const getTitle = () => {
    if (activeTab === CompetitionTab.AGGREGATE) return 'AGGREGATE VALUE';
    return `${activeTab.toUpperCase()} TOTAL ACCOUNT VALUE`;
  };

  const formatValue = (value: number) => {
    if (viewMode === 'percent') {
      const pct = ((value - 10000) / 10000) * 100;
      return `${pct >= 0 ? '+' : ''}${pct.toFixed(2)}%`;
    }
    return `$${value.toLocaleString(undefined, {minimumFractionDigits: 0, maximumFractionDigits: 0})}`;
  };

  return (
    <div className="flex flex-col h-full bg-white relative">
      <style>{`
        .recharts-wrapper { outline: none !important; }
        .recharts-surface { outline: none !important; overflow: visible !important; }
        .recharts-layer { outline: none !important; }
        .recharts-cartesian-grid-bg { outline: none !important; }
        svg.recharts-surface { outline: none !important; }
        *:focus { outline: none !important; }
      `}</style>
      {/* Chart Header Controls */}
      <div className="flex flex-row items-center justify-between p-1.5 md:p-3 gap-2 shrink-0 bg-white z-10">
        <div className="flex gap-2 shrink-0">
          <button 
            onClick={() => setViewMode('currency')}
            className={`px-3 py-1 text-[10px] md:text-xs font-bold border-2 border-black transition-all ${viewMode === 'currency' ? 'bg-black text-white shadow-none translate-y-[2px]' : 'bg-white text-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-y-[2px]'}`}
          >
            $
          </button>
          <button 
             onClick={() => setViewMode('percent')}
             className={`px-3 py-1 text-[10px] md:text-xs font-bold border-2 border-black transition-all ${viewMode === 'percent' ? 'bg-black text-white shadow-none translate-y-[2px]' : 'bg-white text-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-y-[2px]'}`}
          >
            %
          </button>
        </div>
        
        <h2 className="text-[10px] md:text-sm font-black uppercase tracking-wider text-center flex-1 truncate mx-2 leading-tight">
          {getTitle()}
        </h2>

        <div className="flex gap-2 shrink-0">
           <button className="px-3 py-1 text-[10px] font-bold bg-blue-600 text-white border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-y-[2px] transition-all uppercase hidden sm:block">Back to All Runs</button>
           <button 
             onClick={() => setVisibleModels(Object.keys(MODELS).reduce((acc, key) => ({ ...acc, [key]: true }), {}))}
             className="px-3 py-1 text-[10px] font-bold bg-black text-white border-2 border-black uppercase">All</button>
           <button className="px-3 py-1 text-[10px] font-bold bg-white text-black border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-y-[2px] transition-all uppercase">72h</button>
        </div>
      </div>

      {/* Chart Area */}
      <div
        ref={chartContainerRef}
        className="flex-1 w-full p-0 relative min-h-0 font-mono select-none"
        style={{ minWidth: 0 }}
      >
         {chartSize.width > 0 && chartSize.height > 0 && (
            <LineChart
              width={chartSize.width}
              height={chartSize.height}
              data={chartData}
              margin={{ top: isMobile ? 30 : 20, right: isMobile ? 60 : 130, left: 0, bottom: 20 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} horizontal={true} stroke="#e5e7eb" />
              <XAxis 
                dataKey="timeNum" 
                type="number"
                domain={['dataMin', 'dataMax']}
                tickCount={6}
                tickFormatter={formatXAxis} 
                tick={{fontSize: 9, fontFamily: 'JetBrains Mono', fill: '#6b7280', fontWeight: 500}} 
                axisLine={{ stroke: '#e5e7eb', strokeWidth: 1 }}
                tickLine={{ stroke: '#9ca3af', strokeWidth: 1.5 }}
                tickSize={4}
                dy={10}
                height={30}
              />
              <YAxis 
                domain={['auto', 'auto']} 
                tickFormatter={formatYAxis} 
                orientation="left"
                axisLine={{ stroke: '#e5e7eb', strokeWidth: 1 }}
                tickLine={{ stroke: '#e5e7eb', strokeWidth: 1 }}
                width={60}
                hide={false}
                tick={{fontSize: 9, fontFamily: 'JetBrains Mono', fill: '#6b7280', fontWeight: 500}}
              />
              <Tooltip 
                content={<CustomTooltip />} 
                cursor={{ stroke: '#9ca3af', strokeWidth: 1, strokeDasharray: '4 4' }}
                isAnimationActive={false}
                wrapperStyle={{ zIndex: 100 }}
              />
              
              {Object.values(MODELS).map((model) => {
                const Icon = Icons[model.iconType] || Box;
                return (
                    visibleModels[model.name] && (
                    <Line
                        key={model.name}
                        type="monotone" 
                        dataKey={model.name}
                        stroke={model.color}
                        strokeWidth={1.5}
                        dot={(props: any) => {
                            const { cx, cy, index, value } = props;
                            // Only render dot for the last data point
                            if (index !== chartData.length - 1) return <></>;

                            // Dynamic sizes based on device
                            const radius = isMobile ? 12 : 16;
                            const iconSize = isMobile ? 14 : 20;
                            const iconOffset = iconSize / 2;

                            // Center of the circle should be `cx + radius` for the line to enter its left edge
                            const circleCx = cx + radius; 
                            const circleCy = cy;

                            // Icon is centered within the circle
                            const iconX = circleCx - iconOffset;
                            const iconY = circleCy - iconOffset;

                            return (
                                <g>
                                    {/* Pulse Effect */}
                                    <circle cx={circleCx} cy={circleCy} r={radius} fill={model.color} fillOpacity={0.3} className="animate-ping origin-center" style={{ transformBox: 'fill-box' }} />
                                    
                                    {/* Icon Container */}
                                    <circle cx={circleCx} cy={circleCy} r={radius} fill={model.color} stroke="white" strokeWidth={isMobile ? 1.5 : 2} />
                                    
                                    {/* Icon - Nested SVG for perfect centering */}
                                    <Icon 
                                        x={iconX} 
                                        y={iconY} 
                                        width={iconSize} 
                                        height={iconSize} 
                                        color="white"
                                        strokeWidth={2.5}
                                    />
                                    
                                    {/* Desktop Label (shifted relative to the circle's right edge) */}
                                    {!isMobile && (
                                        <g>
                                            <rect x={circleCx + radius + 4} y={cy - 12} width={70} height={24} rx={2} fill={model.color} />
                                            <text x={circleCx + radius + 4 + 35} y={cy + 4} textAnchor="middle" fill="white" fontSize={10} fontWeight="bold" style={{ pointerEvents: 'none', fontFamily: 'monospace' }}>
                                                {formatValue(value)}
                                            </text>
                                        </g>
                                    )}
                                </g>
                            );
                        }}
                        activeDot={{ r: 4, strokeWidth: 0, fill: model.color }}
                        isAnimationActive={false}
                    />
                    )
                );
              })}
            </LineChart>
         )}
         

      </div>

            {/* Custom Legend / Status Bar */}
            {!isMobile && (
              <div className="shrink-0 bg-white py-2 px-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-[10px] md:text-xs font-mono">
                 {Object.values(MODELS).map(model => {
                    const isVisible = visibleModels[model.name];
                    const value = (currentValues as any)[model.name];
                    const Icon = Icons[model.iconType] || Box;
      
                    return (
                        <button 
                          key={model.name}
                          onClick={() => toggleModel(model.name)}
                          className={`flex items-center gap-1.5 md:gap-2 whitespace-nowrap transition-all ${isVisible ? 'opacity-100' : 'opacity-40 grayscale'}`}
                        >
                           <Icon 
                             size={12} 
                             className="md:w-[14px] md:h-[14px]"
                             style={{ color: model.color, fill: isVisible ? model.color : 'transparent', fillOpacity: 0.2 }}
                             strokeWidth={2.5}
                           />
                           <span className="font-bold text-gray-700 hidden sm:inline">{model.name}</span>
                           <span className="font-bold text-gray-700 sm:hidden">{model.name.substring(0,6)}..</span>
                           <span className="text-gray-900">{typeof value === 'number' ? formatValue(value) : value}</span>
                        </button>
                    )
                 })}
              </div>
            )}    </div>
  );
};

export default MainChart;
