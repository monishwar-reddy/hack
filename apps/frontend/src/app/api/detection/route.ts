import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const defectType = searchParams.get("type") || "Unknown";

  // Mock detection engine simulating CNN outputs for NEU-CLS dataset
  // We return "heatmaps" as an array of circles { cx, cy, r, intensity }
  // and "boundingBoxes" as { x, y, width, height, label, confidence }
  
  let boundingBoxes = [];
  let heatmaps = [];

  const typeLower = defectType.toLowerCase();

  if (typeLower === "crazing") {
    boundingBoxes.push({ x: 20, y: 15, width: 40, height: 60, label: "Crazing", confidence: 0.94 });
    heatmaps.push(
      { cx: 30, cy: 30, r: 15, intensity: 0.8 },
      { cx: 45, cy: 50, r: 20, intensity: 0.9 },
      { cx: 50, cy: 20, r: 10, intensity: 0.6 }
    );
  } else if (typeLower === "inclusion") {
    boundingBoxes.push({ x: 60, y: 50, width: 25, height: 25, label: "Inclusion", confidence: 0.88 });
    heatmaps.push({ cx: 72, cy: 62, r: 12, intensity: 0.95 });
  } else if (typeLower === "patches") {
    boundingBoxes.push({ x: 10, y: 60, width: 80, height: 30, label: "Patches", confidence: 0.91 });
    heatmaps.push(
      { cx: 20, cy: 75, r: 15, intensity: 0.7 },
      { cx: 50, cy: 75, r: 25, intensity: 0.85 },
      { cx: 80, cy: 75, r: 15, intensity: 0.7 }
    );
  } else {
    // Default
    boundingBoxes.push({ x: 40, y: 40, width: 20, height: 20, label: defectType, confidence: 0.82 });
    heatmaps.push({ cx: 50, cy: 50, r: 15, intensity: 0.75 });
  }

  return NextResponse.json({
    image: "/metal_surface.png",
    defectType: defectType,
    boundingBoxes,
    heatmaps
  });
}
