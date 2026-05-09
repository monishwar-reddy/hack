import { NextResponse } from "next/server";

export async function POST(request: Request) {
  let source = "primary";
  try {
    const body = await request.json();
    source = body.imageSource || "primary";
  } catch (e) {
    // Fallback if no body
  }

  // Simulate variety based on the requested source
  if (source === "secondary") {
    return NextResponse.json({
      image: "https://picsum.photos/id/1050/800/600",
      defect_type: "Rolled-in Scale",
      confidence: 0.85,
      bounds: [30, 20, 40, 50]
    });
  }

  // Default Primary Feed (Using industrial-looking Picsum textures for stability)
  const defects = [
    { type: "Inclusion", confidence: 0.94, bounds: [45, 40, 20, 20], img: "https://picsum.photos/id/1050/800/600" },
    { type: "Crazing", confidence: 0.92, bounds: [15, 10, 60, 60], img: "https://picsum.photos/id/1067/800/600" },
    { type: "Patches", confidence: 0.89, bounds: [10, 60, 80, 30], img: "https://picsum.photos/id/1073/800/600" },
    { type: "Rolled-in Scale", confidence: 0.88, bounds: [5, 10, 90, 10], img: "https://picsum.photos/id/1081/800/600" },
    { type: "Scratches", confidence: 0.95, bounds: [30, 30, 10, 60], img: "https://picsum.photos/id/1050/800/600" }
  ];
  
  const seed = Date.now();
  const selected = defects[seed % defects.length];

  return NextResponse.json({
    image: selected.img,
    defect_type: selected.type,
    confidence: selected.confidence + (Math.random() * 0.04 - 0.02),
    bounds: selected.bounds
  });
}
