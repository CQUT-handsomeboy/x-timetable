"use client"

import * as React from "react"
import { TrendingUp } from "lucide-react"
import { Label, Pie, PieChart } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

type DataMap = Map<string, number>;

// 定义颜色变种
const colorVariants = [
  "#FF6384", // 红色
  "#36A2EB", // 蓝色
  "#FFCE56", // 黄色
  "#4BC0C0", // 青色
  "#9966FF", // 紫色
  "#FF9F40", // 橙色
  "#668F20", 
];

const DynamicPieChart = ({ dataMap }: { dataMap: DataMap }) => {
  // Convert Map to Array format required by recharts
  const chartData = Array.from(dataMap, ([name, count]) => ({
    name: name,
    count: count,
    fill: `var(--color-${name.toLowerCase()})`,
  }));

  const totalcount = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.count, 0)
  }, [chartData]);

  const chartConfig: ChartConfig = {
    count: {
      label: "count",
    },
    ...Array.from(dataMap.keys()).reduce((config, key: string, index: number) => {
      config[key] = {
        label: key.charAt(0).toUpperCase() + key.slice(1),
        color: colorVariants[index % colorVariants.length], // 使用颜色变种
      };
      return config;
    }, {} as Record<string, { label: string; color: string }>)
  };

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>🪷课程占比情况</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="count"
              nameKey="name"
              innerRadius={60}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {totalcount.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          count
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default DynamicPieChart;