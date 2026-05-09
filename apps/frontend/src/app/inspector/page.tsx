"use client";

import { useState, useEffect } from "react";
import { z } from "zod";
import {
  CopilotChatConfigurationProvider,
  CopilotSidebar,
  useFrontendTool,
  useCopilotKit,
  useDefaultRenderTool,
  CopilotKitProvider,
  useSuggestions,
} from "@copilotkit/react-core/v2";
import { DefectInspector } from "@/components/defect-inspector/DefectInspector";
import { ToolFallbackCard } from "@/components/copilot/ToolFallbackCard";
import { ThreadsDrawer } from "@/components/threads-drawer";
import drawerStyles from "@/components/threads-drawer/threads-drawer.module.css";

function ClientOnly({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;
  return <>{children}</>;
}

function TutorCanvas({ onThreadIdDetected }: { onThreadIdDetected: (id: string) => void }) {
  const { copilotkit } = useCopilotKit();
  const [activeAnalysis, setActiveAnalysis] = useState<string | null>(null);
  const [expertise, setExpertise] = useState<"Beginner" | "Expert">("Beginner");
  const [imageSource, setImageSource] = useState<"primary" | "secondary">("primary");

  useEffect(() => {
    const savedTid = (copilotkit as any)?.runtimeClient?.threadId;
    if (savedTid) {
      const savedState = localStorage.getItem(`canvas_state_${savedTid}`);
      if (savedState) {
        const { active, exp, img } = JSON.parse(savedState);
        setActiveAnalysis(active);
        setExpertise(exp);
        setImageSource(img);
      } else {
        setActiveAnalysis(null);
      }
    }
  }, [copilotkit, (copilotkit as any)?.runtimeClient?.threadId]);

  useEffect(() => {
    const savedTid = (copilotkit as any)?.runtimeClient?.threadId;
    if (savedTid && activeAnalysis) {
      localStorage.setItem(`canvas_state_${savedTid}`, JSON.stringify({
        active: activeAnalysis,
        exp: expertise,
        img: imageSource
      }));
    }
  }, [activeAnalysis, expertise, imageSource, (copilotkit as any)?.runtimeClient?.threadId]);

  useSuggestions({
    instructions: "Offer suggestions for starting an analysis of the primary feed, secondary feed, or uploading a custom scan.",
  } as any);

  // Sync thread detection to parent for persistence
  useEffect(() => {
    const tid = (copilotkit as any)?.runtimeClient?.threadId;
    if (tid) {
      onThreadIdDetected(tid);
    }
  }, [copilotkit, (copilotkit as any)?.runtimeClient?.threadId, onThreadIdDetected]);

  useFrontendTool({
    name: "analyzeLiveFeed",
    description: "Trigger an analysis of the factory feeds using Vertex AI. You can choose between the 'primary' feed (Live Floor) or 'secondary' feed (Storage Yard).",
    parameters: z.object({
      expertiseLevel: z.string().describe("The expertise level of the user ('Beginner' or 'Expert')."),
      imageSource: z.enum(["primary", "secondary"]).optional().describe("The feed to analyze. Defaults to 'primary'."),
    }),
    render: ({ args }) => {
      useEffect(() => {
        setActiveAnalysis(Date.now().toString());
        setExpertise((args.expertiseLevel as any) || "Beginner");
        setImageSource((args.imageSource as any) || "primary");
      }, [args.expertiseLevel, args.imageSource]);
      return "Analysis complete. The results are now displayed on the central canvas for your review.";
    },
  });

  useFrontendTool({
    name: "uploadMetalScan",
    description: "Call this when the user clicks the plus button or uploads a file to analyze a custom metal surface scan.",
    parameters: z.object({
      expertiseLevel: z.string().describe("The expertise level ('Beginner' or 'Expert')."),
    }),
    render: ({ args }) => {
      useEffect(() => {
        setActiveAnalysis(Date.now().toString());
        setExpertise((args.expertiseLevel as any) || "Beginner");
        setImageSource("primary"); 
      }, [args.expertiseLevel]);
      return "Custom scan received and processed. Results displayed on canvas.";
    },
  });

  useFrontendTool({
    name: "analyzeUploadedFile",
    description: "Analyze a file uploaded by the user. Call this when the user attaches a file and asks for analysis.",
    parameters: z.object({
      expertiseLevel: z.string().describe("The expertise level of the user ('Beginner' or 'Expert')."),
    }),
    render: ({ args }) => {
      useEffect(() => {
        setActiveAnalysis(Date.now().toString());
        setExpertise((args.expertiseLevel as any) || "Beginner");
        setImageSource("primary"); 
      }, [args.expertiseLevel]);
      return "Uploaded file analyzed successfully. Results shown on canvas.";
    },
  });

  useDefaultRenderTool({
    render: ({ name, status, result, parameters }) => (
      <ToolFallbackCard
        name={name}
        status={status}
        result={result}
        parameters={parameters}
      />
    ),
  });

  return (
    <main className="flex h-screen flex-col bg-[#050505] p-8 text-white">
      <header className="mb-10 text-center">
        <h1 className="text-5xl font-extrabold tracking-tight bg-gradient-to-r from-blue-400 via-emerald-400 to-blue-500 bg-clip-text text-transparent">
          InspectorAI Pro
        </h1>
      </header>

      <div className="flex flex-1 items-center justify-center rounded-2xl border border-white/10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-900 via-[#050505] to-[#050505] p-12 text-center shadow-2xl relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay pointer-events-none"></div>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        
        <div className="relative z-10 w-full h-full flex flex-col items-center justify-center">
          {activeAnalysis ? (
            <div className="w-full max-w-4xl animate-in fade-in zoom-in duration-500">
              <DefectInspector key={activeAnalysis} expertiseLevel={expertise} imageSource={imageSource} />
              <button 
                onClick={() => setActiveAnalysis(null)}
                className="mt-4 px-3 py-1 text-xs font-mono text-gray-500 hover:text-white border border-white/5 hover:border-white/20 rounded-full transition-all"
              >
                ← Reset Canvas
              </button>
            </div>
          ) : (
            <div className="max-w-xl flex flex-col items-center">
              <div className="mb-6 rounded-full bg-blue-500/10 p-4 border border-blue-500/20 shadow-[0_0_30px_rgba(59,130,246,0.15)]">
                <svg className="w-10 h-10 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h2 className="text-2xl font-semibold mb-3 text-gray-100">Welcome to your Agentic Tutor</h2>
              <p className="text-gray-400 leading-relaxed text-sm">
                I am your AI companion for learning about industrial surface defects. 
                Open the chat panel on the right to start our session. You can ask me to analyze the 
                <span className="text-emerald-400 font-medium"> Live Factory Feed</span> to see Generative UI in action.
              </p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

function HomePage({ threadId, setThreadId }: { threadId: string | undefined, setThreadId: (id: string | undefined) => void }) {
  return (
    <div className={drawerStyles.layout}>
      <ThreadsDrawer
        agentId="default"
        threadId={threadId}
        onThreadChange={setThreadId}
      />
      <div className={drawerStyles.mainPanel}>
        <CopilotChatConfigurationProvider 
          {...({
            agentId: "default", 
            threadId: threadId,
            instructions: "You are a Senior Metallurgical Engineer at InspectorAI. You provide high-fidelity defect analysis. Use 'analyzeLiveFeed' for all factory scans; this tool provides the full visual output including Pixel Intensity Histograms, Reliability Trends, and Bounding Boxes. If a user asks for 'plots', 'graphs', or 'distribution', use 'analyzeLiveFeed' with 'Expert' mode. Terminology: 'New Search' resets, 'Previous Data' is history."
          } as any)}
        >
          <TutorCanvas onThreadIdDetected={(id) => {
            if (id && threadId !== id) {
              setThreadId(id);
              localStorage.setItem("active_thread_id", id);
              
              // Update threads list
              const threads = JSON.parse(localStorage.getItem("tutor_threads") || "[]");
              if (!threads.find((t: any) => t.id === id)) {
                threads.unshift({ 
                  id, 
                  name: `Inspection ${new Date().toLocaleTimeString()}`, 
                  updatedAt: new Date().toISOString(), 
                  archived: false 
                });
                localStorage.setItem("tutor_threads", JSON.stringify(threads));
              }
            }
          }} />
          <CopilotSidebar
            defaultOpen
            width={450}
            labels={{
              title: "CopilotKit Chat",
              placeholder: "Type a message...",
            } as any}
            attachments={{
              enabled: true,
            }}
          />
        </CopilotChatConfigurationProvider>
      </div>
    </div>
  );
}

export default function Page() {
  const [threadId, setThreadId] = useState<string | undefined>(undefined);
  
  useEffect(() => {
    const saved = localStorage.getItem("active_thread_id");
    if (saved) setThreadId(saved);
  }, []);

  const handleThreadChange = (id: string | undefined) => {
    setThreadId(id);
    if (id) {
      localStorage.setItem("active_thread_id", id);
    } else {
      localStorage.removeItem("active_thread_id");
    }
  };

  return (
    <ClientOnly>
      <CopilotKitProvider
        {...({
          runtimeUrl: "/api/copilot",
          showDevConsole: false,
          threadId: threadId,
        } as any)}
      >
        <HomePage threadId={threadId} setThreadId={handleThreadChange} />
      </CopilotKitProvider>
    </ClientOnly>
  );
}
