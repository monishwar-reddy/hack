# InspectorAI Pro: Agentic Industrial Defect Inspector

![InspectorAI Pro Banner](apps/frontend/public/banner.jpg)

InspectorAI Pro is a state-of-the-art agentic interface designed for industrial surface defect detection. Built for the **Generative UI Global Hackathon**, it leverages **CopilotKit**, **Gemini 2.0 Flash**, and **A2UI** to provide a real-time, interactive inspection dashboard.

## 🚀 Key Features

- **Agentic Live Analysis**: The AI agent can trigger live factory feed scans, analyze metal surfaces, and render results directly on the canvas.
- **Rich Generative UI**: Beyond simple chat, the agent composes complex visual interfaces including:
  - **Pixel Intensity Histograms**: Real-time distribution analysis of surface anomalies.
  - **Reliability Trends**: Predictive confidence scoring for defect classification.
  - **Bounding Boxes & Heatmaps**: Visual grounding of defects using the NEU-CLS dataset patterns.
- **Durable Persistence**: Full conversation history with thread management. "Previous Data" sessions survive reloads.
- **Expert/Beginner Modes**: Tailored analysis depth based on user expertise level.

## 🛠️ Tech Stack

- **Frontend**: Next.js 15 (App Router), Tailwind CSS, Lucide Icons.
- **AI Orchestration**: [CopilotKit v2](https://github.com/CopilotKit/CopilotKit) (AG-UI Protocol).
- **LLM**: Google Gemini 2.0 Flash (via Google AI Studio).
- **Generative UI**: A2UI (Agent-to-UI) protocol for sandboxed component rendering.
- **Deployment**: Netlify (Edge Functions for Copilot Runtime).

## 📦 Project Structure

- `apps/frontend`: Next.js dashboard and CopilotKit integration.
- `apps/bff`: Backend-for-frontend (Hono) for agent coordination.
- `apps/agent`: LangGraph-based deep agent implementation (Python).
- `apps/mcp`: Custom MCP server for factory tool integration.

## 🚦 Getting Started

1. **Environment Setup**:
   Copy `.env.example` to `.env.local` in `apps/frontend/` and add your `GOOGLE_API_KEY`.
   
2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Run Locally**:
   ```bash
   npm run dev
   ```

4. **Deploy**:
   The project is pre-configured for Netlify deployment via `netlify.toml`.

## 🛡️ Security

API keys are managed via environment variables and are never committed to the repository. See `.gitignore` for details.

---

Built with ❤️ for the **Generative UI Global Hackathon**.
