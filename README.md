# Pred Arena by Perd Labs

<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

A high-fidelity clone of **nof1's Alpha Arena** AI trading dashboard, featuring real-time charting, trade feeds, and model reasoning logs. This project simulates an environment where various AI models (like GPT-5.1, Claude Sonnet 4.5, Gemini 3 Pro, etc.) compete in trading scenarios.

## Demo Video

- Compressed preview: [assets/demo.mp4](assets/demo.mp4)

## Features

*   **Real-time Dashboard:** Interactive charts displaying aggregate account values and individual model performance.
*   **Live Ticker Bar:** Real-time stock updates (TSLA, NVDA, MSFT, etc.).
*   **Model Leaderboard:** Comprehensive ranking of models based on ROI, win rate, Sharpe ratio, and other trading metrics.
*   **Detailed Analytics:** Individual model details including trade history, active positions, and reasoning logs (Chain of Thought).
*   **Interactive UI:** Clean, responsive design built with React, Tailwind CSS, and Recharts.

## Tech Stack

*   **Frontend:** React, TypeScript, Vite
*   **Styling:** Tailwind CSS
*   **Charting:** Recharts
*   **Icons:** Lucide React

## Getting Started (Local)

### Prerequisites

*   Node.js (v16 or higher)
*   npm or yarn

### Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/yourusername/pred-arena-clone.git
    cd pred-arena-clone
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

3.  Set up environment variables:
    Create a `.env.local` file in the root directory and add your Gemini API key (if applicable for future integrations, though the current mock data runs without it):
    ```bash
    GEMINI_API_KEY=your_api_key_here
    ```

4.  Run the development server:
    ```bash
    npm run dev
    ```

5.  Open your browser and visit `http://localhost:3000` (or the port shown in your terminal).

## Deploy to GitHub Pages

You can serve the static build on GitHub Pages:

1) Build with the repo base path (ensures assets resolve correctly):
```bash
npm install
npm run build -- --base=/Open-Nof1-AlphaArena/
```
2) Publish `dist/` to a `gh-pages` branch (manual example):
```bash
git subtree push --prefix dist origin gh-pages
```
3) In GitHub Settings → Pages, select `gh-pages` as the source. After propagation, pages will be viewable. If you use a different repo name or a custom domain, adjust `--base` accordingly (custom domain can omit it).

## Project Structure

```
/
├── components/       # UI Components (Header, Charts, Leaderboard, etc.)
├── constants.ts      # Mock data and configuration
├── types.ts          # TypeScript interfaces
├── App.tsx           # Main application entry
├── index.html        # HTML entry point
├── package.json      # Dependencies and scripts
└── vite.config.ts    # Vite configuration
```

## Notes

* Uses static mock data—no backend required to browse the UI.
* Demo video is compressed (`assets/demo.mp4`, ~3MB) for easy preview on GitHub.
* If labels overlap on very small viewports, view at larger width or adjust browser zoom.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the [MIT License](LICENSE).

---
*Note: This is a simulation interface. No actual trading occurs.*
