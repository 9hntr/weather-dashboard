import { NextRequest, NextResponse } from "next/server";
import { geoApiCtx, openWeatherApiKey } from "../context";
import siteConfg from "@/app/siteConfg";

export async function GET(req: NextRequest): Promise<any> {
  try {
    const searchParams = req.nextUrl.searchParams;
    const query = searchParams.get("query");

    const data = (
      await geoApiCtx.get(
        `direct?q=${query}&limit=${siteConfg.fetchLimit.cities}&appid=${openWeatherApiKey}`
      )
    ).data;

    // todo: extend CityGc type and add local_names?: any
    // todo: add return type
    return NextResponse.json(data);
  } catch (error) {
    console.error("Something went wrong trying to fetch geocoded data");
    return new Response("Something went wrong trying to fetch geocoded data", {
      status: 500,
    });
  }
}
