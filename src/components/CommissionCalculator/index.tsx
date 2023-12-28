"use client";

import {
  CommissionStructure,
  calculateCommission,
} from "@/utils/commission/calculateCommission";
import { useState } from "react";
import { CommissionBreakdown } from "./CommissionBreakdown";

const defaultCommissionStructure: CommissionStructure = [
  {
    commissionPercentage: 0,
    band: [0, 5000],
  },
  {
    commissionPercentage: 10,
    band: [5000, 10000],
  },
  {
    commissionPercentage: 15,
    band: [10000, 15000],
  },
  {
    commissionPercentage: 20,
    band: [15000, 20000],
  },
  {
    commissionPercentage: 25,
    band: [20000, Infinity],
  },
];

export const CommissionCalculator = () => {
  const [revenue, setRevenue] = useState(0);
  const [commission, setCommission] = useState<
    ReturnType<typeof calculateCommission>
  >({
    total: 0,
    breakdown: [],
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);

    const commission = calculateCommission(value, defaultCommissionStructure);
    setCommission(commission);
    setRevenue(value);
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
          onChange={(e) => handleInputChange(e)}
        />
      </div>
      <CommissionBreakdown
        total={commission.total}
        breakdown={commission.breakdown}
        commissionStructure={defaultCommissionStructure}
      />
    </div>
  );
};
