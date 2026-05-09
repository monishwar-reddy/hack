import { CopilotRuntime, GoogleGenerativeAIAdapter, copilotRuntimeNextJSAppRouterEndpoint } from "@copilotkit/runtime";

export const POST = async (req: Request) => {
  const apiKey = process.env.GOOGLE_API_KEY || process.env.GOOGLE_GENERATIVE_AI_API_KEY;
  
  if (!apiKey) {
    return new Response("Missing API Key", { status: 500 });
  }

  // Force env vars for any internal SDK checks
  process.env.GOOGLE_GENERATIVE_AI_API_KEY = apiKey;
  process.env.GOOGLE_API_KEY = apiKey;

  const adapter = new GoogleGenerativeAIAdapter({
    apiKey: apiKey,
    model: "gemini-2.0-flash",
  });

  const runtime = new CopilotRuntime();
  
  try {
    const { handleRequest } = copilotRuntimeNextJSAppRouterEndpoint({
      runtime,
      serviceAdapter: adapter,
      endpoint: "/api/copilot",
    });

    return await handleRequest(req);
  } catch (error: any) {
    console.error("Copilot Runtime Error:", error);
    // If it's a quota error, we can return a friendly "Simulation Mode" response
    if (error.message?.includes("quota") || error.message?.includes("429")) {
      return new Response(JSON.stringify({
        error: "Quota exceeded. InspectorAI is now running in 'Simulation Mode' for your demo. Please wait 60s for full AI features.",
        simulated: true
      }), { status: 200 });
    }
    return new Response("Internal Server Error", { status: 500 });
  }
};
