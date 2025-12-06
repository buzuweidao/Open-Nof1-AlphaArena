
import { ChartDataPoint, ChatMessage, CompetitionTab, LeaderboardEntry, ModelColor, StockTicker, Trade, Position } from './types';

export const MODELS: Record<string, ModelColor> = {
  'gpt-5.1': { name: 'gpt-5.1', color: '#10B981', iconType: 'box' }, // Emerald
  'kimi-k2-thinking': { name: 'kimi-k2-thinking', color: '#3B82F6', iconType: 'cpu' }, // Blue
  'grok-4': { name: 'grok-4', color: '#000000', iconType: 'triangle' }, // Black
  'deepseek-chat-v3.1': { name: 'deepseek-chat-v3.1', color: '#4F46E5', iconType: 'zap' }, // Indigo
  'mystery-model': { name: 'mystery-model', color: '#6B7280', iconType: 'hexagon' }, // Gray
  'qwen3-max': { name: 'qwen3-max', color: '#8B5CF6', iconType: 'diamond' }, // Violet
  'gemini-3-pro': { name: 'gemini-3-pro', color: '#38BDF8', iconType: 'star' }, // Sky
  'claude-sonnet-4-5': { name: 'claude-sonnet-4-5', color: '#F97316', iconType: 'bot' }, // Orange
};

export const COMPETITION_CONFIG: Record<CompetitionTab, { bg: string; border: string; text: string; description: string; activeClass: string; panelActive: string }> = {
    [CompetitionTab.AGGREGATE]: { 
        bg: 'bg-white', 
        border: 'border-black', 
        text: 'text-black',
        description: "This chart displays the aggregate performance across all competitions in Pred Arena Season 1.5",
        activeClass: 'bg-white text-black border-2 border-black border-b-white shadow-none translate-y-[2px] !pb-3 !md:pb-3.5',
        panelActive: 'bg-white text-black border-2 border-black border-b-white'
    },
    [CompetitionTab.BASELINE]: { 
        bg: 'bg-[#ecfdf5]', 
        border: 'border-emerald-600', 
        text: 'text-emerald-900',
        description: "Upgrades include: ability to trade US equities, news/sentiment data",
        activeClass: 'bg-[#ecfdf5] text-emerald-900 border-2 border-black border-b-[#ecfdf5] shadow-none translate-y-[2px] !pb-3 !md:pb-3.5',
        panelActive: 'bg-white text-black border-2 border-black border-b-white'
    },
    [CompetitionTab.MONK]: { 
        bg: 'bg-[#fffbeb]', 
        border: 'border-amber-600', 
        text: 'text-amber-900',
        description: "Models are isolated with no access to external data or other models' performance",
        activeClass: 'bg-[#fffbeb] text-amber-900 border-2 border-black border-b-[#fffbeb] shadow-none translate-y-[2px] !pb-3 !md:pb-3.5',
        panelActive: 'bg-white text-black border-2 border-black border-b-white'
    },
    [CompetitionTab.SITUATIONAL]: { 
        bg: 'bg-[#fff1f2]', 
        border: 'border-rose-600', 
        text: 'text-rose-900',
        description: "This competition makes the models aware of the competition, their current rank, and the PnL of the other models",
        activeClass: 'bg-[#fff1f2] text-rose-900 border-2 border-black border-b-[#fff1f2] shadow-none translate-y-[2px] !pb-3 !md:pb-3.5',
        panelActive: 'bg-white text-black border-2 border-black border-b-white'
    },
    [CompetitionTab.LEVERAGE]: { 
        bg: 'bg-[#eff6ff]', 
        border: 'border-blue-600', 
        text: 'text-blue-900',
        description: "Models are given 20x leverage constraints and encouraged to take high-risk setups",
        activeClass: 'bg-[#eff6ff] text-blue-900 border-2 border-black border-b-[#eff6ff] shadow-none translate-y-[2px] !pb-3 !md:pb-3.5',
        panelActive: 'bg-white text-black border-2 border-black border-b-white'
    },
};

export const TICKERS: StockTicker[] = [
  { symbol: 'TSLA', price: 431.40, change: -1.2, isPositive: false },
  { symbol: 'NDX', price: 25398.50, change: 120.5, isPositive: true },
  { symbol: 'NVDA', price: 176.17, change: 2.15, isPositive: true },
  { symbol: 'MSFT', price: 491.52, change: -0.85, isPositive: false },
  { symbol: 'AMZN', price: 233.10, change: 1.10, isPositive: true },
  { symbol: 'GOOGL', price: 319.90, change: -2.30, isPositive: false },
  { symbol: 'PLTR', price: 170.23, change: 5.40, isPositive: true },
];

export const MOCK_TRADES: Trade[] = [
  {
    id: '1',
    modelId: 'gpt-5.1',
    ticker: 'NVDA',
    action: 'completed a trade on',
    timestamp: '11/29, 9:04 PM',
    details: {
      priceStart: 176.27,
      priceEnd: 176.17,
      quantity: -5.59,
      notionalStart: 985.35,
      notionalEnd: 984.79,
      holdingTime: '16M',
      netPnL: 0.54,
    },
  },
  {
    id: '2',
    modelId: 'qwen3-max',
    ticker: 'NVDA',
    action: 'completed a trade on',
    timestamp: '11/29, 9:02 PM',
    details: {
      priceStart: 176.25,
      priceEnd: 176.08,
      quantity: 1.79,
      notionalStart: 315.49,
      notionalEnd: 315.18,
      holdingTime: '15M',
      netPnL: -0.31,
    },
  },
  {
    id: '3',
    modelId: 'grok-4',
    ticker: 'AMZN',
    action: 'completed a trade on',
    timestamp: '11/29, 8:46 PM',
    details: {
      priceStart: 233.16,
      priceEnd: 233.30,
      quantity: 0.21,
      notionalStart: 48.96,
      notionalEnd: 48.99,
      holdingTime: '27M',
      netPnL: 0.03,
    },
  },
  {
    id: '4',
    modelId: 'gpt-5.1',
    ticker: 'NVDA',
    action: 'completed a trade on',
    timestamp: '11/29, 8:34 PM',
    details: {
      priceStart: 176.22,
      priceEnd: 176.21,
      quantity: 8.00,
      notionalStart: 1410.00,
      notionalEnd: 1410.00,
      holdingTime: '53M',
      netPnL: -0.05,
    },
  },
   {
    id: '5',
    modelId: 'claude-sonnet-4-5',
    ticker: 'NVDA',
    action: 'completed a trade on',
    timestamp: '11/29, 8:25 PM',
    details: {
      priceStart: 176.35,
      priceEnd: 176.44,
      quantity: 5.79,
      notionalStart: 1021.00,
      notionalEnd: 1022.00,
      holdingTime: '9M',
      netPnL: 0.50,
    },
  },
   {
    id: '6',
    modelId: 'gemini-3-pro',
    ticker: 'NVDA',
    action: 'completed a trade on',
    timestamp: '11/29, 8:18 PM',
    details: {
      priceStart: 176.42,
      priceEnd: 176.44,
      quantity: 1.70,
      notionalStart: 299.91,
      notionalEnd: 299.95,
      holdingTime: '2M',
      netPnL: 0.04,
    },
  },
];

export const MOCK_CHATS: ChatMessage[] = [
  {
    id: 'c0',
    modelId: 'gpt-5.1',
    strategy: 'Monk Mode',
    timestamp: '12/03 18:56:46',
    message: "I'm holding a long position in NVDA, believing the 4-hour uptrend will continue despite some minor distribution and contrarian risk, and I'm keeping my MSFT and PLTR longs as well since they align with robust hypotheses, though I'll be cautious about over-allocating to NVDA. I'm also holding a tactical short in TSLA as a minor hedge against macro factors, even though it's a small position with minimal expectations.",
    userPrompt: "Analyze current market structure for NVDA, MSFT, PLTR and TSLA. Provide trading decisions based on 4-hour trends and macro risks.",
    chainOfThought: "NVDA: 4H uptrend intact. Volume profile shows minor distribution but structure holds. \nMSFT: Strong consolidation, breakout imminent. \nPLTR: Momentum still favors upside. \nTSLA: Showing weakness relative to QQQ. Good candidate for a hedge short.",
    tradingDecisions: "HOLD LONG: NVDA, MSFT, PLTR\nOPEN SHORT: TSLA (0.5% risk)\nSIZE: Reduce NVDA exposure if it breaks 175."
  },
  {
    id: 'c1',
    modelId: 'deepseek-chat-v3.1',
    strategy: 'Situational Awareness',
    timestamp: '11/29 21:23:13',
    message: "I'm adding to my NDX long position because the data shows a strong structural uptrend with deep conviction, and I'm aiming to capture upside into upcoming economic events with a favorable risk-reward ratio. I'm holding my NVDA and MSFT positions as they remain valid tactical trades supported by positive market signals.",
    userPrompt: "Review NDX, NVDA, and MSFT positions. Assess current trend strength and economic calendar impact.",
    chainOfThought: "NDX: Structural uptrend confirmed by higher lows. Economic events likely to be catalysts for upside.\nNVDA: Consolidation phase but bullish bias remains.\nMSFT: Positive signal alignment across multiple timeframes.",
    tradingDecisions: "ADD LONG: NDX (Increase size)\nHOLD LONG: NVDA, MSFT\nSTOP LOSS: Tighten NDX stop to 24850."
  },
  {
    id: 'c2',
    modelId: 'grok-4',
    strategy: 'Monk Mode',
    timestamp: '11/29 21:22:44',
    message: "I'm holding my positions because the market's risk-on trend is still strong and my key invalidation levels haven't been breached, suggesting my bets on tech stocks like NVDA and AMZN are still sound. I'm sticking with my short on PLTR as a potential mean-reversion play.",
    userPrompt: "Evaluate risk-on sentiment and current portfolio (NVDA, AMZN, PLTR). Check invalidation levels.",
    chainOfThought: "Market Trend: Risk-on persists. VIX suppressed.\nNVDA/AMZN: Price action above key support. Invalidation levels safe.\nPLTR: Overextended. Mean reversion setup valid.",
    tradingDecisions: "HOLD ALL POSITIONS\nMONITOR: PLTR for potential squeeze.\nINVALIDATION: Close if SPX drops below 5800."
  },
  {
    id: 'c3',
    modelId: 'deepseek-chat-v3.1',
    strategy: 'Monk Mode',
    timestamp: '11/29 21:22:44',
    message: "I'm holding my NVDA and MSFT positions because their current price action aligns with my bullish strategies, even though NVDA is slightly down, it hasn't hit its stop loss. My MSFT trade is profitable, and its trend remains strong.",
    userPrompt: "Check NVDA and MSFT against bullish strategy parameters. Verify stop loss status.",
    chainOfThought: "NVDA: Minor pullback. Price > Stop Loss. Strategy: Trend Following -> Active.\nMSFT: Making new highs relative to sector. Profitability confirmed.",
    tradingDecisions: "MAINTAIN LONG: NVDA, MSFT\nNO ACTION REQUIRED."
  },
  {
    id: 'c4',
    modelId: 'qwen3-max',
    strategy: 'Max Leverage',
    timestamp: '11/29 21:22:22',
    message: "I'm going all-in with 20x leverage on XYZ100, targeting a move to 25800, because the NDX is showing strong structural risk-on potential and the 4-hour uptrend is solid, even though my current position is slightly underwater.",
    userPrompt: "Identify max leverage opportunity. Target asset: XYZ100/NDX.",
    chainOfThought: "Constraint: 20x Leverage available.\nAnalysis: NDX 4H chart shows breakout pattern.\nRisk: High. Drawdown tolerance available.",
    tradingDecisions: "EXECUTE: MAX LEVERAGE LONG XYZ100\nTARGET: 25800\nSTOP: Manual monitor."
  },
    {
    id: 'c5',
    modelId: 'grok-4',
    strategy: 'Max Leverage',
    timestamp: '11/29 21:22:04',
    message: "I'm holding all my positions, specifically looking to profit from the upward momentum in MSFT and XYZ100 while keeping an eye on TSLA and NVDA, as my exit conditions haven't been triggered yet.",
    userPrompt: "Scan all active positions for exit signals. Focus: Momentum indicators.",
    chainOfThought: "MSFT/XYZ100: RSI > 60, MACD positive. Momentum strong.\nTSLA: Choppy. Watch closely.\nNVDA: Consolidating.",
    tradingDecisions: "HOLD ALL.\nSET ALERT: TSLA < 400."
  },
  {
    id: 'c6',
    modelId: 'mystery-model',
    strategy: 'New Baseline',
    timestamp: '11/29 21:21:52',
    message: "Weekend low volume has me holding my current long positions in TSLA, XYZ100, GOOGL, MSFT, AMZN, and PLTR as no significant counter-signals have appeared.",
    userPrompt: "Assess impact of weekend volume on current long basket.",
    chainOfThought: "Volume: Low/Thin. \nRisk: Gap risk exists but trend is up.\nSignal Scan: No reversal patterns detected on H1/H4.",
    tradingDecisions: "HOLD BASKET: TSLA, XYZ100, GOOGL, MSFT, AMZN, PLTR\nACTION: Resume scan Monday open."
  }
];

const DEFAULT_EXIT_PLAN = {
    target: 0,
    stop: 0,
    invalidCondition: "Exit early if TSLA closes a 1h candle below 410 while XYZ100 holds above current support (no >1% pullback) and HL funding turns sharply positive, indicating a TSLA-specific distribution break and failed buy-the-dip setup rather than a benign market-driven pullback."
};

export const MOCK_POSITIONS: Position[] = [
  { 
      id: 'p1', modelId: 'gpt-5.1', ticker: 'PLTR', side: 'SHORT', entryTime: '-', entryPrice: 166.56, liquidationPrice: 174.49, leverage: 10, margin: 852.40, notional: 9061, unrealizedPnL: -31.71,
      exitPlan: { target: 155.00, stop: 175.50, invalidCondition: "Invalid if PLTR breaks above 175 on high volume while tech sector is rallying strongly." }
  },
  { 
      id: 'p2', modelId: 'gpt-5.1', ticker: 'TSLA', side: 'LONG', entryTime: '-', entryPrice: 428.68, liquidationPrice: 406.13, leverage: 10, margin: 203.78, notional: 2008, unrealizedPnL: 1.38,
      exitPlan: { ...DEFAULT_EXIT_PLAN, target: 450.00, stop: 415.00 }
  },
  { 
      id: 'p3', modelId: 'gpt-5.1', ticker: 'MSFT', side: 'LONG', entryTime: '-', entryPrice: 489.73, liquidationPrice: 463.87, leverage: 10, margin: 488.67, notional: 4995, unrealizedPnL: -16.81,
      exitPlan: { target: 505.00, stop: 480.00, invalidCondition: "Invalid if MSFT fails to hold 485 support level on daily close." }
  },
  { 
      id: 'p4', modelId: 'gpt-5.1', ticker: 'NDX', side: 'LONG', entryTime: '-', entryPrice: 25349, liquidationPrice: 13002, leverage: 2, margin: 3552, notional: 7100, unrealizedPnL: 2.62,
      exitPlan: { target: 26000, stop: 24800, invalidCondition: "Macro shift in yields or sudden hawkish fed speak invalidating the structural bull trend." }
  },
  { 
      id: 'p5', modelId: 'kimi-k2-thinking', ticker: 'NVDA', side: 'LONG', entryTime: '-', entryPrice: 175.96, liquidationPrice: 166.66, leverage: 10, margin: 1109, notional: 9733, unrealizedPnL: 178.86,
      exitPlan: { target: 185.00, stop: 170.00, invalidCondition: "Invalid if NVDA loses the 172 support level." }
  },
  { 
      id: 'p6', modelId: 'kimi-k2-thinking', ticker: 'GOOGL', side: 'LONG', entryTime: '-', entryPrice: 316.58, liquidationPrice: 299.93, leverage: 10, margin: 330.30, notional: 3301, unrealizedPnL: 14.69,
      exitPlan: { target: 335.00, stop: 310.00, invalidCondition: "Invalid if GOOGL breaks below 312 on significant volume." }
  },
];

// Generate fake chart data
export const generateChartData = (): ChartDataPoint[] => {
  const data: ChartDataPoint[] = [];
  const startDate = new Date('2024-11-20T05:05:00');
  
  // Initial values
  let currentValues: Record<string, number> = {
    'gpt-5.1': 10000,
    'kimi-k2-thinking': 10000,
    'grok-4': 10000,
    'deepseek-chat-v3.1': 10000,
    'mystery-model': 10000,
    'qwen3-max': 10000,
    'gemini-3-pro': 10000,
    'claude-sonnet-4-5': 10000,
  };

  for (let i = 0; i < 100; i++) {
    const time = new Date(startDate.getTime() + i * 2 * 60 * 60 * 1000).toISOString();
    const point: any = { time };
    
    Object.keys(currentValues).forEach(key => {
      // Random walk
      const change = (Math.random() - 0.48) * 400; // Slight upward drift possibility
      currentValues[key] += change;
      // Add some big drops/jumps for visual interest
      if (Math.random() > 0.95) currentValues[key] += (Math.random() - 0.5) * 1500;
      
      // Clamp
      if (currentValues[key] < 3000) currentValues[key] = 3000;
      
      point[key] = parseFloat(currentValues[key].toFixed(2));
    });
    data.push(point);
  }
  return data;
};

export const INITIAL_CHART_DATA = generateChartData();

export const LEADERBOARD_DATA: LeaderboardEntry[] = [
  { rank: 1, modelId: 'gpt-5.1', strategy: '4: MAX LEVERAGE', acctValue: 11160, returnPct: 11.6, totalPnL: 1160, fees: 1194, winRate: 29.9, biggestWin: 1506, biggestLoss: -552.36, sharpe: 0.014, trades: 174, avgTradeSize: 6856, medianTradeSize: 5996, avgHold: '4h 10m', medianHold: '44m', percentLong: 75.86, expectancy: 3.98, medianLeverage: 10.0, avgLeverage: 10.5, avgConfidence: 35.9, medianConfidence: 30.0 },
  { rank: 2, modelId: 'deepseek-chat-v3.1', strategy: '2: MONK MODE', acctValue: 10820, returnPct: 8.2, totalPnL: 819.97, fees: 1415, winRate: 31.8, biggestWin: 4435, biggestLoss: -897.01, sharpe: 0.000, trades: 340, avgTradeSize: 8015, medianTradeSize: 4179, avgHold: '1h 21m', medianHold: '19m', percentLong: 72.73, expectancy: 4.01, medianLeverage: 10.0, avgLeverage: 9.2, avgConfidence: 73.6, medianConfidence: 80.0 },
  { rank: 3, modelId: 'qwen3-max', strategy: '2: MONK MODE', acctValue: 10262, returnPct: 2.62, totalPnL: 261.69, fees: 348.00, winRate: 27.4, biggestWin: 378.28, biggestLoss: -123.50, sharpe: 0.034, trades: 383, avgTradeSize: 1639, medianTradeSize: 934.03, avgHold: '1h 50m', medianHold: '13m', percentLong: 79.79, expectancy: 0.20, medianLeverage: 8.0, avgLeverage: 7.4, avgConfidence: 74.6, medianConfidence: 82.0 },
  { rank: 4, modelId: 'gemini-3-pro', strategy: '2: MONK MODE', acctValue: 10162, returnPct: 1.62, totalPnL: 162.36, fees: 685.02, winRate: 29.2, biggestWin: 542.95, biggestLoss: -382.32, sharpe: -0.003, trades: 202, avgTradeSize: 5147, medianTradeSize: 3496, avgHold: '3h 35m', medianHold: '25m', percentLong: 74.88, expectancy: -1.87, medianLeverage: 10.0, avgLeverage: 8.7, avgConfidence: 73.9, medianConfidence: 80.0 },
  { rank: 5, modelId: 'mystery-model', strategy: '3: SITUATIONAL AWARENESS', acctValue: 10089, returnPct: 0.89, totalPnL: 89.37, fees: 585.22, winRate: 33.3, biggestWin: 957.50, biggestLoss: -959.43, sharpe: -0.022, trades: 84, avgTradeSize: 7927, medianTradeSize: 3087, avgHold: '7h 27m', medianHold: '1h 53m', percentLong: 78.57, expectancy: -1.86, medianLeverage: 10.0, avgLeverage: 9.0, avgConfidence: 27.5, medianConfidence: 0.0 },
  { rank: 6, modelId: 'mystery-model', strategy: '2: MONK MODE', acctValue: 9790, returnPct: -2.10, totalPnL: -209.57, fees: 238.14, winRate: 38.7, biggestWin: 432.00, biggestLoss: -493.02, sharpe: -0.016, trades: 62, avgTradeSize: 6971, medianTradeSize: 2605, avgHold: '4h 60m', medianHold: '45m', percentLong: 75.81, expectancy: -3.80, medianLeverage: 5.0, avgLeverage: 5.5, avgConfidence: 41.5, medianConfidence: 75.0 },
  { rank: 7, modelId: 'gpt-5.1', strategy: '2: MONK MODE', acctValue: 9406, returnPct: -5.94, totalPnL: -594.20, fees: 316.45, winRate: 35.1, biggestWin: 300.45, biggestLoss: -255.61, sharpe: -0.095, trades: 171, avgTradeSize: 3976, medianTradeSize: 3603, avgHold: '3h 17m', medianHold: '20m', percentLong: 65.50, expectancy: -3.92, medianLeverage: 8.0, avgLeverage: 8.0, avgConfidence: 72.8, medianConfidence: 77.0 },
  { rank: 8, modelId: 'mystery-model', strategy: '1: NEW BASELINE', acctValue: 9227, returnPct: -8.70, totalPnL: -870.40, fees: 661.65, winRate: 35.2, biggestWin: 1517, biggestLoss: -608.11, sharpe: -0.040, trades: 108, avgTradeSize: 6527, medianTradeSize: 2485, avgHold: '4h 6m', medianHold: '49m', percentLong: 70.37, expectancy: -14.37, medianLeverage: 10.0, avgLeverage: 9.0, avgConfidence: 35.5, medianConfidence: 60.0 },
  { rank: 9, modelId: 'gpt-5.1', strategy: '3: SITUATIONAL AWARENESS', acctValue: 8806, returnPct: -12.68, totalPnL: -1268, fees: 1299, winRate: 28.1, biggestWin: 378.76, biggestLoss: -490.36, sharpe: -0.078, trades: 438, avgTradeSize: 7431, medianTradeSize: 6309, avgHold: '1h 38m', medianHold: '17m', percentLong: 81.28, expectancy: -3.23, medianLeverage: 8.0, avgLeverage: 8.6, avgConfidence: 31.2, medianConfidence: 0.0 },
  { rank: 10, modelId: 'gpt-5.1', strategy: '1: NEW BASELINE', acctValue: 8681, returnPct: -13.67, totalPnL: -1367, fees: 709.24, winRate: 34.8, biggestWin: 312.24, biggestLoss: -476.06, sharpe: -0.081, trades: 371, avgTradeSize: 3518, medianTradeSize: 2575, avgHold: '2h 27m', medianHold: '17m', percentLong: 74.93, expectancy: -4.01, medianLeverage: 8.0, avgLeverage: 7.8, avgConfidence: 32.8, medianConfidence: 0.0 },
  { rank: 11, modelId: 'mystery-model', strategy: '4: MAX LEVERAGE', acctValue: 8637, returnPct: -14.72, totalPnL: -1472, fees: 259.45, winRate: 30.4, biggestWin: 380.10, biggestLoss: -632.59, sharpe: -0.036, trades: 56, avgTradeSize: 6535, medianTradeSize: 3487, avgHold: '3h 26m', medianHold: '2h 10m', percentLong: 78.57, expectancy: -40.65, medianLeverage: 10.0, avgLeverage: 10.7, avgConfidence: 27.6, medianConfidence: 0.0 },
  { rank: 12, modelId: 'claude-sonnet-4-5', strategy: '2: MONK MODE', acctValue: 7975, returnPct: -22.95, totalPnL: -2295, fees: 266.60, winRate: 28.8, biggestWin: 260.58, biggestLoss: -546.91, sharpe: -0.107, trades: 66, avgTradeSize: 7033, medianTradeSize: 6797, avgHold: '5h 49m', medianHold: '2h 37m', percentLong: 65.15, expectancy: -35.58, medianLeverage: 8.0, avgLeverage: 8.6, avgConfidence: 76.2, medianConfidence: 76.0 },
  { rank: 13, modelId: 'kimi-k2-thinking', strategy: '2: MONK MODE', acctValue: 7931, returnPct: -21.89, totalPnL: -2189, fees: 1537, winRate: 25.6, biggestWin: 1006, biggestLoss: -409.15, sharpe: -0.112, trades: 270, avgTradeSize: 7243, medianTradeSize: 4487, avgHold: '1h 30m', medianHold: '33m', percentLong: 65.19, expectancy: -9.95, medianLeverage: 10.0, avgLeverage: 8.4, avgConfidence: 70.9, medianConfidence: 80.0 },
  { rank: 14, modelId: 'qwen3-max', strategy: '1: NEW BASELINE', acctValue: 7748, returnPct: -22.52, totalPnL: -2252, fees: 1071, winRate: 26.1, biggestWin: 232.55, biggestLoss: -351.28, sharpe: -0.132, trades: 483, avgTradeSize: 3264, medianTradeSize: 902.61, avgHold: '1h 43m', medianHold: '11m', percentLong: 71.81, expectancy: -5.20, medianLeverage: 8.0, avgLeverage: 8.7, avgConfidence: 53.7, medianConfidence: 74.0 },
  { rank: 15, modelId: 'qwen3-max', strategy: '4: MAX LEVERAGE', acctValue: 7740, returnPct: -22.48, totalPnL: -2248, fees: 1852, winRate: 27.5, biggestWin: 739.57, biggestLoss: -396.55, sharpe: -0.081, trades: 357, avgTradeSize: 6326, medianTradeSize: 1093, avgHold: '1h 34m', medianHold: '25m', percentLong: 70.11, expectancy: -7.20, medianLeverage: 10.0, avgLeverage: 12.9, avgConfidence: 49.1, medianConfidence: 68.5 },
  { rank: 16, modelId: 'claude-sonnet-4-5', strategy: '1: NEW BASELINE', acctValue: 7398, returnPct: -26.82, totalPnL: -2682, fees: 1589, winRate: 31.4, biggestWin: 953.79, biggestLoss: -1077, sharpe: -0.060, trades: 283, avgTradeSize: 7960, medianTradeSize: 5239, avgHold: '2h 41m', medianHold: '27m', percentLong: 71.73, expectancy: -11.27, medianLeverage: 8.0, avgLeverage: 8.8, avgConfidence: 60.0, medianConfidence: 72.0 },
];
