import { NextRequest, NextResponse } from "next/server";
import { meteoApiCtx } from "../context";

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const lat = searchParams.get("lat");
    const lon = searchParams.get("lon");

    const data = (
      await meteoApiCtx.get(
        `forecast?latitude=${lat}&longitude=${lon}&daily=uv_index_max,uv_index_clear_sky_max&timezone=auto&forecast_days=1`
      )
    ).data;

    return NextResponse.json(data);
    // todo: add return type
  } catch (error) {
    console.log("Error Getting Uv Data");

    return new Response("Error getting Uv Data", { status: 500 });
  }
}
