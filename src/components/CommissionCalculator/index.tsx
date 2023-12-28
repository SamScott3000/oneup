"use client";

import {
  CommissionStructure,
  calculateCommission,
} from "@/utils/commission/calculateCommission";
import { useEffect, useState } from "react";
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

// Fake API call to simulate the API call to calculate the commission
const calculateCommissionFakeApiCall = (revenue: number) => {
  return new Promise<ReturnType<typeof calculateCommission>>((resolve) => {
    setTimeout(() => {
      resolve(calculateCommission(revenue, defaultCommissionStructure));
    }, 200);
  });
};

export const CommissionCalculator = () => {
  const [revenue, setRevenue] = useState(42500);
  const [commission, setCommission] = useState<
    ReturnType<typeof calculateCommission>
  >({
    total: 0,
    breakdown: [],
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);

    setRevenue(value);
  };

  // Debounce the input change to prevent too many API calls
  useEffect(() => {
    const timer = setTimeout(() => {
      calculateCommissionFakeApiCall(revenue)
        .then((res) => {
          setCommission(res);
        })
        .catch((err) => {
          console.error(err);
        });
    }, 500);

    return () => clearTimeout(timer);
  }, [revenue]);

  return (
    <div className="p-6 border border-gray-300 rounded-xl shadow w-[700px] max-w-full">
      <h3 className="text-3xl font-bold mb-8">Commission Calculator</h3>
      <div className="flex gap-x-2 gap-y-2 justify-end items-center">
        <p className="text-gray-300 font-semibold text-xl mt-6">£</p>
        <div className="w-full flex-1 relative">
          <label className="block font-semibold h-6" htmlFor="revenueInput">
            Revenue
          </label>
          <input
            className="border border-gray-300 rounded-lg p-3.5 flex-1 font-semibold text-xl w-full"
            type="number"
            id="revenueInput"
            name="revenueInput"
            value={revenue}
            onChange={(e) => handleInputChange(e)}
          />
        </div>
      </div>
      <CommissionBreakdown
        total={commission.total}
        breakdown={commission.breakdown}
        commissionStructure={defaultCommissionStructure}
      />
    </div>
  );
};
