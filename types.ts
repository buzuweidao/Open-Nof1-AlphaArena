
export interface StockTicker {
  symbol: string;
  price: number;
  change: number; // Percent or value change
  isPositive: boolean;
}

export interface ModelColor {
  name: string;
  color: string;
  iconType: 'bot' | 'cpu' | 'zap' | 'box' | 'hexagon' | 'triangle' | 'star' | 'diamond';
}

export interface Trade {
  id: string;
  modelId: string;
  ticker: string;
  action: 'completed a trade on';
  timestamp: string;
  details: {
    priceStart: number;
    priceEnd: number;
    quantity: number;
    notionalStart: number;
    notionalEnd: number;
    holdingTime: string;
    netPnL: number;
  };
}

export interface ExitPlan {
  target: number;
  stop: number;
  invalidCondition: string;
}

export interface Position {
  id: string;
  modelId: string;
  ticker: string;
  side: 'LONG' | 'SHORT';
  entryTime: string;
  entryPrice: number;
  liquidationPrice: number;
  leverage: number;
  margin: number;
  notional: number;
  unrealizedPnL: number;
  exitPlan?: ExitPlan;
}

export interface ChatMessage {
  id: string;
  modelId: string;
  strategy: string; // e.g., 'Situational Awareness', 'Monk Mode'
  timestamp: string;
  message: string;
  userPrompt?: string;
  chainOfThought?: string;
  tradingDecisions?: string;
}

export interface ChartDataPoint {
  time: string; // ISO date string or timestamp
  [modelId: string]: number | string; // Dynamic keys for model values
}

export interface LeaderboardEntry {
  rank: number;
  modelId: string;
  strategy: string;
  acctValue: number;
  returnPct: number;
  totalPnL: number;
  fees: number;
  winRate: number;
  biggestWin: number;
  biggestLoss: number;
  sharpe: number;
  trades: number;
  // New Analytics Fields
  avgTradeSize: number;
  medianTradeSize: number;
  avgHold: string;
  medianHold: string;
  percentLong: number;
  expectancy: number;
  medianLeverage: number;
  avgLeverage: number;
  avgConfidence: number;
  medianConfidence: number;
}

export enum PanelTab {
  COMPLETED_TRADES = 'COMPLETED TRADES',
  MODELCHAT = 'MODELCHAT',
  POSITIONS = 'POSITIONS',
  COMP_DETAILS = 'COMP DETAILS',
  SEASON_DETAILS = 'SEASON 1.5 DETAILS',
}

export enum CompetitionTab {
  AGGREGATE = 'Aggregate Index',
  BASELINE = '1: New Baseline',
  MONK = '2: Monk Mode',
  SITUATIONAL = '3: Situational Awareness',
  LEVERAGE = '4: Max Leverage',
}

export type View = 'dashboard' | 'leaderboard' | 'model-details';
