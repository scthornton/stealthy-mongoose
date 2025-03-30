
import React from "react";
import { BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart";

/**
 * BarChart component for visualizing categorical data
 * 
 * @param {Object} props - Component props
 * @param {Array} props.data - The data to be displayed in the chart
 * @param {string} props.index - The property name to use as the category axis (x-axis)
 * @param {Array<string>} props.categories - Array of data properties to display as bars
 * @param {Array<string>} props.colors - Array of colors to use for each category
 * @param {Function} props.valueFormatter - Function to format the tooltip values
 * @param {string} props.className - Additional CSS classes
 * @returns {JSX.Element} Rendered bar chart component
 */
export const BarChart = ({
  data,
  index,
  categories,
  colors = ["#2563eb"],
  valueFormatter,
  className,
}: {
  data: any[];
  index: string;
  categories: string[];
  colors?: string[];
  valueFormatter?: (value: string | number | (string | number)[]) => string;
  className?: string;
}) => {
  return (
    <ChartContainer className={className} config={{}} id="bar-chart">
      <RechartsBarChart data={data} margin={{ top: 10, right: 10, left: 10, bottom: 30 }}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#374151" />
        <XAxis 
          dataKey={index} 
          tick={{ fill: "#9ca3af" }} 
          axisLine={{ stroke: "#4b5563" }} 
          tickLine={{ stroke: "#4b5563" }}
        />
        <YAxis 
          tick={{ fill: "#9ca3af" }} 
          axisLine={{ stroke: "#4b5563" }} 
          tickLine={{ stroke: "#4b5563" }}
          tickFormatter={valueFormatter}
        />
        <Tooltip 
          content={({ active, payload, label }) => {
            if (!active || !payload?.length) return null;
            return (
              <div className="rounded-lg border border-gray-700 bg-gray-800 p-2 shadow-md">
                <div className="font-medium text-gray-300">{label}</div>
                <div className="mt-1">
                  {payload.map((item, i) => (
                    <div key={i} className="flex items-center">
                      <div className="mr-2 h-2 w-2 rounded-full" style={{ backgroundColor: item.color }} />
                      <span className="text-gray-400">{item.name}: </span>
                      <span className="ml-1 font-medium text-gray-300">
                        {valueFormatter ? valueFormatter(item.value) : item.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            );
          }}
        />
        {categories.map((category, i) => (
          <Bar 
            key={category}
            dataKey={category} 
            fill={colors[i % colors.length]} 
            radius={[4, 4, 0, 0]}
          />
        ))}
      </RechartsBarChart>
    </ChartContainer>
  );
};

export default BarChart;
