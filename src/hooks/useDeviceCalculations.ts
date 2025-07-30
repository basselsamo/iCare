import { useMemo } from "react";
import { AppleDevice, DeviceType } from "@/types/apple-device";
import { PREDEFINED_DEVICES } from "@/data/device-catalog";

export const useDeviceCalculations = (devices: AppleDevice[]) => {
  const calculations = useMemo(() => {
    // Calculate total AppleCare+ cost
    const totalAppleCarePlusCost = (usingAnnual: boolean): number => {
      return devices.reduce((sum, device) => {
        const costPerUnit = usingAnnual && device.annuallyCost != null
          ? (device.annuallyCost / 12)
          : device.monthlyCost;
        return sum + costPerUnit * device.quantity;
      }, 0);
    };

    // Calculate AppleCare One cost
    const appleCareOneCost = (usingAnnual: boolean): number => {
      const { visionProCount, otherDevicesCount } = devices.reduce(
        (counts, device) => ({
          visionProCount: device.type === DeviceType.VisionPro 
            ? counts.visionProCount + device.quantity 
            : counts.visionProCount,
          otherDevicesCount: device.type !== DeviceType.VisionPro 
            ? counts.otherDevicesCount + device.quantity 
            : counts.otherDevicesCount
        }),
        { visionProCount: 0, otherDevicesCount: 0 }
      );

      // Only 1 Vision Pro can be in Care One
      const visionProExtra = Math.max(0, visionProCount - 1);
      const totalQuantityForOne = otherDevicesCount + Math.min(visionProCount, 1);
      
      const extraDevices = Math.max(0, totalQuantityForOne - 3);
      const careOneCost = 19.99 + extraDevices * 5.99;
      
      const visionProExtraUnit = usingAnnual
        ? (PREDEFINED_DEVICES.find(d => d.type === DeviceType.VisionPro)?.annuallyCost ?? 24.99 * 12) / 12
        : 24.99;
      const visionProExtraCost = visionProExtra * visionProExtraUnit;

      return careOneCost + visionProExtraCost;
    };

    // Get recommended option
    const recommendedOption = (usingAnnual: boolean): string => {
      return totalAppleCarePlusCost(usingAnnual) < appleCareOneCost(usingAnnual) 
        ? "AppleCare+" 
        : "AppleCare One";
    };

    // Best cost split calculation
    const bestCostSplit = (usingAnnual: boolean) => {
      // Flatten devices by quantity
      const allDevicesFlat: AppleDevice[] = devices.flatMap(device =>
        Array(device.quantity).fill(device)
      );

      if (allDevicesFlat.length === 0) {
        return { careOneDevices: [], carePlusDevices: [], total: 0.0 };
      }

      // Sort by AppleCare+ cost descending
      const sorted = allDevicesFlat.sort((a, b) => {
        const costA = usingAnnual && a.annuallyCost != null ? a.annuallyCost / 12 : a.monthlyCost;
        const costB = usingAnnual && b.annuallyCost != null ? b.annuallyCost / 12 : b.monthlyCost;
        return costB - costA;
      });

      let bestTotal = Number.POSITIVE_INFINITY;
      let bestOneDevices: AppleDevice[] = [];
      let bestPlusDevices: AppleDevice[] = [];

      // Try putting 0 to all devices into AppleCare One
      for (let k = 0; k <= sorted.length; k++) {
        // Separate Vision Pros
        const visionPros = sorted.filter(d => d.type === DeviceType.VisionPro);
        const nonVisionPros = sorted.filter(d => d.type !== DeviceType.VisionPro);

        // Try adding only up to 1 Vision Pro in Care One
        const visionProInOne = visionPros.length > 0 ? [visionPros[0]] : [];
        const extraVisionPros = visionPros.slice(1);

        // Care One devices = k nonVisionPros + 1 VisionPro (if any)
        const oneDevices = nonVisionPros.slice(0, k).concat(visionProInOne);
        const plusDevices = nonVisionPros.slice(k).concat(extraVisionPros);

        // Cost for Care One: base + extra
        const careOneCost = 19.99 + Math.max(0, oneDevices.length - 3) * 5.99;

        // Cost for Care+ devices
        const carePlusCost = plusDevices.reduce((sum, d) => {
          const cost = usingAnnual && d.annuallyCost != null ? d.annuallyCost / 12 : d.monthlyCost;
          return sum + cost;
        }, 0);

        const totalCost = careOneCost + carePlusCost;

        if (totalCost < bestTotal) {
          bestTotal = totalCost;
          bestOneDevices = oneDevices;
          bestPlusDevices = plusDevices;
        }
      }

      return {
        careOneDevices: bestOneDevices,
        carePlusDevices: bestPlusDevices,
        total: Math.round(bestTotal * 100) / 100
      };
    };

    // Device summary for display
    const deviceSummary = (devices: AppleDevice[], usingAnnual: boolean): string => {
      const grouped = devices.reduce((acc, device) => {
        if (!acc[device.name]) {
          acc[device.name] = { device, count: 0 };
        }
        acc[device.name].count += 1;
        return acc;
      }, {} as Record<string, { device: AppleDevice, count: number }>);

      return Object.values(grouped).map(({ device, count }) => {
        const unit = usingAnnual && device.annuallyCost != null
          ? (device.annuallyCost / 12)
          : device.monthlyCost;
        return `${device.name} – x${count} – $${(unit * count).toFixed(2)}/mo`;
      }).join('\n');
    };

    // NEW: Structured device summary for React display
const structuredDeviceSummary = (devices: AppleDevice[], usingAnnual: boolean): {
  name: string;
  quantity: number;
  cost: number;
}[] => {
  const grouped = devices.reduce((acc, device) => {
    if (!acc[device.name]) {
      acc[device.name] = { device, count: 0 };
    }
    acc[device.name].count += 1;
    return acc;
  }, {} as Record<string, { device: AppleDevice, count: number }>);

  return Object.values(grouped).map(({ device, count }) => {
    const unit = usingAnnual && device.annuallyCost != null
      ? (device.annuallyCost / 12)
      : device.monthlyCost;
    return {
      name: device.name,
      quantity: count,
      cost: unit * count,
    };
  });
};


    return {
      totalAppleCarePlusCost,
      appleCareOneCost,
      recommendedOption,
      bestCostSplit,
      deviceSummary,
      structuredDeviceSummary
    };
  }, [devices]);

  return calculations;
};