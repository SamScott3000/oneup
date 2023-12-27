import { CommissionBreakdown as CommissionBreakdownType } from "@/utils/commission/calculateCommission";
import React from "react";

interface CommissionBreakdownProps {
  total: number;
  breakdown: CommissionBreakdownType;
}

const colors = ["#A78B", "#FBBF24", "#34D399", "#60A5FA", "#F87171"];

export const CommissionBreakdown = ({
  breakdown,
  total,
}: CommissionBreakdownProps) => {
  return (
    <div className="mt-8 p-4 border border-gray-300 bg-gray-50 rounded-lg">
      <div className="py-8">
        <p className="text-4xl font-bold text-center">
          £{total.toLocaleString()}
        </p>
      </div>
      <ul className="flex flex-wrap gap-4 mt-8">
        {breakdown.map((breakdownItem, i) => {
          const min = breakdownItem.band[0];

          const max =
            breakdownItem.band[1] === Infinity ? "+" : breakdownItem.band[1];
          const color = colors[i % colors.length];

          return (
            <li key={`${min}-${max}`} className="flex gap-1 items-center">
              <div
                className="w-4 h-4 rounded"
                style={{ backgroundColor: color }}
              />
              <p className="text-sm">
                £{min.toLocaleString()}-{max.toLocaleString()}
              </p>
            </li>
          );
        })}
      </ul>
      <div className="flex w-full mt-2">
        {breakdown.map((breakdownItem, i) => {
          const min = breakdownItem.band[0];

          const max =
            breakdownItem.band[1] === Infinity ? "+" : breakdownItem.band[1];

          const width = Math.max((breakdownItem.commissionValue / total) * 100);

          const color = colors[i % colors.length];

          return (
            <div
              key={`${min}-${max}`}
              style={{ width: `${width}%`, backgroundColor: color }}
              className="h-16 rounded flex items-center transition-all"
            >
              <p className="px-4 font-semibold">
                £{breakdownItem.commissionValue.toLocaleString()}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
