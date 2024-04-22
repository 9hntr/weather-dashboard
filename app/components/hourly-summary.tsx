"use client";
import { AreaChart, Card } from "@tremor/react";
import moment from "moment";
import { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectHourlySummary } from "../state/reducers/weather.reducer";
import { Skeleton } from "@/components/ui/skeleton";

// ! https://github.com/recharts/recharts/issues/3615#issuecomment-1636923358
const supressTremorLibError = () => {
  const error = console.error;
  console.error = (...args: any) => {
    if (/defaultProps/.test(args[0])) return;
    error(...args);
  };
};

export const Hourly = () => {
  const hourlySummary = useSelector(selectHourlySummary);
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    if (hourlySummary.time) {
      const formattedData = hourlySummary.time.map(
        (hour: string, idx: number) => ({
          time: moment(hour).format("h A"),
          "UV Index": hourlySummary.uv_index[idx],
          "Temperature °c": hourlySummary.temperature_2m[idx],
        })
      );

      setChartData(formattedData);
    }
  }, [hourlySummary]);

  const dataFormatter = (value: number) => {
    return `${value.toString()} °`;
  };

  useEffect(() => {
    supressTremorLibError();
  }, []);

  return (
    <Fragment>
      {chartData.length ? (
        <Card style={{ boxShadow: "none" }}>
          <p className="text-sm font-bold">Hourly summary</p>
          <AreaChart
            className="h-60"
            data={chartData}
            index="time"
            minValue={0}
            showAnimation={true}
            animationDuration={2000}
            showGridLines={false}
            categories={["Temperature °c", "UV Index"]}
            colors={["cyan", "blue-400"]}
            valueFormatter={dataFormatter}
            yAxisWidth={40}
          />
        </Card>
      ) : (
        <Skeleton className="h-[19.3rem] w-full rounded-sm" />
      )}
    </Fragment>
  );
};
