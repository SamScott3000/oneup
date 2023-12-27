"use client";

import { calculateCommission } from "@/utils/commission/calculateCommission";
import { useState } from "react";
import { CommissionBreakdown } from "./CommissionBreakdown";

export const CommissionCalculator = () => {
  const [revenue, setRevenue] = useState(0);
  const [commission, setCommission] = useState<
    ReturnType<typeof calculateCommission>
  >({
    total: 0,
    breakdown: [],
  });

  const getCommission = (revenue: number) => {
    const commission = calculateCommission(revenue);

    setCommission(commission);
  };

  return (
    <div className="p-6 border border-gray-300 rounded w-[700px] max-w-full">
      <h3 className="text-3xl font-bold mb-8">Commission Calculator</h3>
      <div className="flex gap-x-2 gap-y-2 justify-end items-center flex-wrap">
        <div className="">
          <p className="text-gray-300 font-semibold text-xl">£</p>
        </div>
        <input
          className="border border-gray-300 rounded p-3.5 flex-1 font-semibold text-xl"
          type="number"
          value={revenue}
          onChange={(e) => setRevenue(parseInt(e.target.value))}
        />
        <button
          className="border border-gray-300 p-4 rounded-lg hover:bg-gray-100 transition-colors min-w-fit"
          onClick={() => getCommission(revenue)}
        >
          Calculate Commission
        </button>
      </div>
      <CommissionBreakdown
        total={commission.total}
        breakdown={commission.breakdown}
      />
    </div>
  );
};
