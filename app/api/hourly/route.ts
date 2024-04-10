import { NextRequest, NextResponse } from "next/server";
import { meteoApiCtx } from "../context";

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const lat = searchParams.get("lat");
    const lon = searchParams.get("lon");
    const hourlyQuery = ["uv_index", "temperature_2m"];
    const forecastDays = 15;

    const data = (
      await meteoApiCtx.get(
        `forecast?latitude=${lat}&longitude=${lon}&hourly=${hourlyQuery.join()}&forecast_days=${forecastDays}`
      )
    ).data;

    return NextResponse.json(data);
    // todo: add return type
  } catch (error) {
    return new Response("Error getting Uv Data", { status: 500 });
  }
}
