export type CommissionStructure = {
  commissionPercentage: number;
  band: number[];
}[];

export type CommissionBreakdown = {
  band: number[];
  commissionValue: number;
}[];

export const calculateCommission = (
  revenue: number,
  commissionStructure: CommissionStructure
) => {
  let commissionBreakdown: CommissionBreakdown = [];

  // Sort commission structure by band sizes
  commissionStructure.sort((a, b) => a.band[0] - b.band[0]);

  // Loop through commission structure
  commissionStructure.forEach((commissionBand) => {
    const [min, max] = commissionBand.band;

    if (min === undefined || max === undefined) {
      throw new Error("Commission band must have a minimum and maximum value");
    }

    // If revenue is less than the value to reach the band minimum, skip this iteration
    if (revenue < min) {
      return;
    }

    // If revenue is less than the band maximum, but less than the minimum, put the remaining amount in the band and continue the loop
    if (revenue < max && revenue > min) {
      const amountInBand = revenue - min;

      commissionBreakdown.push({
        band: [min, max],
        commissionValue:
          (amountInBand / 100) * commissionBand.commissionPercentage,
      });
      return;
    }

    // If revenue is greater than the value to reach the band maximum, add the full band amount to the breakdown
    if (revenue >= max) {
      const amountInBand = max - min;

      commissionBreakdown.push({
        band: [min, max],
        commissionValue:
          (amountInBand / 100) * commissionBand.commissionPercentage,
      });
    }
  });

  const totalCommission = commissionBreakdown.reduce(
    (acc, { commissionValue }) => acc + commissionValue,
    0
  );

  return { total: totalCommission, breakdown: commissionBreakdown };
};
