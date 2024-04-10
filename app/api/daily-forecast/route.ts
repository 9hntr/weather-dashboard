import { NextRequest, NextResponse } from "next/server";
import { meteoApiCtx } from "../context";

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const lat = searchParams.get("lat");
    const lon = searchParams.get("lon");
    const forecastDays = searchParams.get("days");
    const dailyQuery = [
      "uv_index_max",
      "temperature_2m_max",
      "temperature_2m_min",
    ];

    const data = (
      await meteoApiCtx.get(
        `forecast?latitude=${lat}&longitude=${lon}&daily=${dailyQuery}&timezone=auto&forecast_days=${forecastDays}`
      )
    ).data;

    return NextResponse.json(data);
    // todo: add return type
  } catch (error) {
    return new Response("Error getting forecast", { status: 500 });
  }
}
