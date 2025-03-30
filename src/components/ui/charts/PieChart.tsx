
import React from "react";
import { PieChart as RechartsPieChart, Pie, Tooltip, Cell, ResponsiveContainer } from "recharts";
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart";

/**
 * PieChart component for visualizing proportional data
 * 
 * @param {Object} props - Component props
 * @param {Array} props.data - The data to be displayed in the chart
 * @param {string} props.index - The property name to use as the category labels
 * @param {Function} props.valueFormatter - Function to format the tooltip values
 * @param {string} props.className - Additional CSS classes
 * @returns {JSX.Element} Rendered pie chart component
 */
export const PieChart = ({
  data,
  index,
  valueFormatter,
  className,
}: {
  data: any[];
  index: string;
  valueFormatter?: (value: string | number | (string | number)[]) => string;
  className?: string;
}) => {
  // Generate colors for each slice if not provided
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

  return (
    <ChartContainer className={className} config={{}} id="pie-chart">
      <RechartsPieChart margin={{ top: 10, right: 10, left: 10, bottom: 10 }}>
        <Pie
          data={data}
          nameKey={index}
          dataKey="value"
          cx="50%"
          cy="50%"
          outerRadius={80}
          fill="#8884d8"
          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
          labelLine={true}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip 
          content={({ active, payload }) => {
            if (!active || !payload?.length) return null;
            return (
              <div className="rounded-lg border border-gray-700 bg-gray-800 p-2 shadow-md">
                {payload.map((entry, index) => (
                  <div key={index} className="flex items-center">
                    <div 
                      className="mr-2 h-2 w-2 rounded-full" 
                      style={{ backgroundColor: entry.payload.fill || COLORS[index % COLORS.length] }} 
                    />
                    <span className="text-gray-300">{entry.name}: </span>
                    <span className="ml-1 font-medium text-white">
                      {valueFormatter ? valueFormatter(entry.value) : entry.value}
                    </span>
                  </div>
                ))}
              </div>
            );
          }}
        />
      </RechartsPieChart>
    </ChartContainer>
  );
};

export default PieChart;
