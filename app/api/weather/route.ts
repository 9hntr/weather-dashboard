import { NextRequest, NextResponse } from "next/server";
import { weatherApiCtx, openWeatherApiKey } from "../context";

export async function GET(request: NextRequest): Promise<any> {
  try {
    const searchParams = request.nextUrl.searchParams;
    const lat = searchParams.get("lat");
    const lon = searchParams.get("lon");

    const data = (
      await weatherApiCtx.get(
        `weather?lat=${lat}&lon=${lon}&appid=${openWeatherApiKey}`
      )
    ).data;

    return NextResponse.json(data);
    // todo: add return type
  } catch (error) {
    return new NextResponse(
      "Something went wrong trying to fetch forecast data",
      {
        status: 500,
      }
    );
  }
}
