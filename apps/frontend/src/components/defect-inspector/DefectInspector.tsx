"use client";

import { useEffect, useState } from "react";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as ChartTooltip, ResponsiveContainer,
  AreaChart, Area
} from "recharts";
import styles from "./DefectInspector.module.css";

interface DefectInspectorProps {
  expertiseLevel?: "Beginner" | "Expert";
  imageSource?: "primary" | "secondary";
}

interface DetectionData {
  image: string;
  defect_type: string;
  confidence: number;
  bounds: [number, number, number, number];
}

export function DefectInspector({ expertiseLevel = "Beginner", imageSource = "primary" }: DefectInspectorProps) {
  const [data, setData] = useState<DetectionData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch("/api/cloud-function-vertex", {
      method: "POST",
      body: JSON.stringify({ imageSource }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Analysis failed");
        return res.json();
      })
      .then((d) => {
        setData(d);
        setLoading(false);
      });
  }, [expertiseLevel, imageSource]);

  // Mock data for charts
  const histogramData = Array.from({ length: 12 }, (_, i) => ({
    name: `${i * 20}`,
    intensity: Math.floor(Math.random() * 50) + (i > 4 && i < 8 ? 40 : 10),
  }));

  const trendData = [
    { time: "09:00", confidence: 0.85 },
    { time: "10:00", confidence: 0.88 },
    { time: "11:00", confidence: 0.82 },
    { time: "12:00", confidence: data?.confidence || 0.91 },
  ];

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.loadingState}>
          <div className={styles.spinner}></div>
          <p>Running Vertex AI Surface Analysis...</p>
        </div>
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className={styles.container}>
      <div className={styles.scrollContent}>
        <div className={styles.inspectorCard}>
          <div className={styles.header}>
            <div className={styles.status}>
              <span className={styles.indicator}></span>
              DETECTING: <span className={styles.defectType}>{data.defect_type}</span>
            </div>
            <div className={styles.badge}>
              {expertiseLevel === "Expert" ? "EXPERT MODE" : "BEGINNER MODE"}
            </div>
          </div>

          <div className={styles.imageContainer}>
            <img
              src={data.image}
              alt="Industrial Surface Scan"
              className={styles.defectImage}
            />
            <div
              className={styles.boundingBox}
              style={{
                left: `${data.bounds[0]}%`,
                top: `${data.bounds[1]}%`,
                width: `${data.bounds[2]}%`,
                height: `${data.bounds[3]}%`,
              }}
            >
              <span className={styles.boxLabel}>
                {data.defect_type} {(data.confidence * 100).toFixed(1)}%
              </span>
            </div>
          </div>

          <div className={styles.infoFooter}>
            <p className={styles.diagnosticText}>
              <span className={styles.diagnosticLabel}>Diagnostic Info:</span> Detected anomaly corresponding to the structural pattern of <em>{data.defect_type}</em>.
            </p>
            <p className={styles.metaText}>
              Source: {imageSource === "primary" ? "Live Feed" : "Storage Yard"} (Vertex AI) | Confidence Score: {(data.confidence * 100).toFixed(2)}%
            </p>
          </div>
        </div>

        {/* ANALYTICS SECTION */}
        <div className={styles.analyticsSection}>
          <h3 className={styles.sectionTitle}>Metal Surface Metrics</h3>
          
          <div className={styles.grid}>
            <div className={styles.chartCard}>
              <h4>Pixel Intensity Distribution</h4>
              <div className={styles.chartWrapper}>
                <ResponsiveContainer width="100%" height={150}>
                  <BarChart data={histogramData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                    <XAxis dataKey="name" stroke="#666" fontSize={10} axisLine={false} tickLine={false} />
                    <YAxis hide />
                    <ChartTooltip 
                      contentStyle={{ background: "#1a1a1a", border: "1px solid #333", fontSize: "12px", borderRadius: "8px" }}
                      itemStyle={{ color: "#10b981" }}
                    />
                    <Bar dataKey="intensity" fill="#10b981" radius={[2, 2, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className={styles.chartCard}>
              <h4>Detection Reliability Trend</h4>
              <div className={styles.chartWrapper}>
                <ResponsiveContainer width="100%" height={150}>
                  <AreaChart data={trendData}>
                    <defs>
                      <linearGradient id="colorConf" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                    <XAxis dataKey="time" stroke="#666" fontSize={10} axisLine={false} tickLine={false} />
                    <YAxis domain={[0.5, 1]} hide />
                    <ChartTooltip 
                      contentStyle={{ background: "#1a1a1a", border: "1px solid #333", fontSize: "12px", borderRadius: "8px" }}
                      itemStyle={{ color: "#3b82f6" }}
                    />
                    <Area type="monotone" dataKey="confidence" stroke="#3b82f6" fillOpacity={1} fill="url(#colorConf)" strokeWidth={2} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          <div className={styles.expertNotes}>
            <h5>Engineering Insight:</h5>
            <p>
              Analysis shows characteristic spectral shifts in the 120-160 intensity range. 
              {data.defect_type === "Crazing" ? " Micro-crack propagation suggests thermal stress cycle failure." : " This pattern is consistent with non-metallic inclusions during the casting phase."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
