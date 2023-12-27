"use client";

import { calculateCommission } from "@/utils/commission/calculateCommission";
import { useState } from "react";

export const CommissionCalculator = () => {
  const [revenue, setRevenue] = useState(0);
  const [commission, setCommission] = useState(0);

  const getCommission = (revenue: number) => {
    const commission = calculateCommission(revenue);

    setCommission(commission.total);

    console.log(commission);
  };

  return (
    <div className="p-6 border border-gray-300 rounded">
      <h3 className="text-2xl font-bold mb-8">Commission Calculator</h3>
      <div className="flex gap-8">
        <input
          className="border border-gray-300 rounded p-4"
          type="number"
          value={revenue}
          onChange={(e) => setRevenue(parseInt(e.target.value))}
        />
        <button
          className="border border-gray-300 p-4 rounded-lg hover:bg-gray-100 transition-colors"
          onClick={() => getCommission(revenue)}
        >
          Calculate Commission
        </button>
      </div>
      <p>£{commission}</p>
    </div>
  );
};
