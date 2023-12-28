import {
  CommissionBreakdown as CommissionBreakdownType,
  CommissionStructure,
} from "@/utils/commission/calculateCommission";
import React from "react";
import CountUp from "react-countup";

interface CommissionBreakdownProps {
  total: number;
  breakdown: CommissionBreakdownType;
  commissionStructure: CommissionStructure;
}

const colors = ["#A78B", "#FBBF24", "#34D399", "#60A5FA", "#F87171"];

export const CommissionBreakdown = ({
  breakdown,
  total,
  commissionStructure,
}: CommissionBreakdownProps) => {
  console.log(breakdown);

  return (
    <div className="mt-8 p-4 border border-gray-300 bg-gray-50 rounded-lg flex flex-col gap-8">
      <div>
        <p className="font-semibold mb-2">Total commission</p>
        <p className="text-5xl font-bold text-left">
          £<CountUp end={total} preserveValue />
        </p>
      </div>

      <div className="flex flex-wrap gap-8 flex-col sm:flex-row">
        <div className="flex-1 flex flex-col gap-4">
          <p className="font-semibold">Commission breakdown</p>
          <div className="flex w-full relative flex-1">
            {breakdown.length === 0 ? (
              <div className="flex w-full justify-center items-center">
                <p className="text-gray-400 italic font-light text-sm px-4 text-center">
                  Add some revenue to see the breakdown
                </p>
              </div>
            ) : (
              breakdown.map((breakdownItem, i) => {
                const min = breakdownItem.band[0];

                const max =
                  breakdownItem.band[1] === Infinity
                    ? "+"
                    : breakdownItem.band[1];

                const width =
                  (breakdownItem.commissionValue / total) * 100 || 3;

                const color = colors[i % colors.length];

                return (
                  <div
                    key={`${min}-${max}`}
                    style={{
                      width: `${width}%`,
                      backgroundColor: color,
                      marginTop: i * 28,
                    }}
                    className="h-7 rounded flex items-center transition-all animate-fadeIn"
                  >
                    <p className="px-4 font-semibold absolute right-0">
                      £
                      <CountUp
                        end={breakdownItem.commissionValue}
                        decimals={2}
                        preserveValue
                      />
                    </p>
                  </div>
                );
              })
            )}
          </div>
        </div>
        <div className="flex-1 flex flex-col gap-4  justify-between">
          <div>
            <p className="font-semibold">Commission structure</p>
          </div>

          <div>
            <ul className="flex flex-wrap flex-col gap-2 flex-1 justify-center">
              {commissionStructure.map((structureItem, i) => {
                const min = structureItem.band[0];

                const max =
                  structureItem.band[1] === Infinity
                    ? "+"
                    : structureItem.band[1];
                const color = colors[i % colors.length];

                const labelString =
                  structureItem.band[1] !== Infinity
                    ? `£${min.toLocaleString()}-${max.toLocaleString()}`
                    : `£${min.toLocaleString()}+`;

                return (
                  <li
                    key={`${min}-${max}`}
                    className="flex gap-1 items-center text-sm"
                  >
                    <div
                      className="w-4 h-4 rounded"
                      style={{ backgroundColor: color }}
                    />
                    <p className="flex-1">{labelString}</p>
                    <p>{structureItem.commissionPercentage}%</p>
                  </li>
                );
              })}
            </ul>
            <div className="flex justify-between text-xs text-gray-500 font-light italic mt-1">
              <p>Band</p>
              <p>Commission percentage</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
