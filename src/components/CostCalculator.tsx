import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { useDevices } from "@/contexts/DeviceContext";
import { Calculator, Crown, Shield, TrendingUp } from "lucide-react";

export const CostCalculator: React.FC = () => {
  const { devices, calculations } = useDevices();
  const [useAnnual, setUseAnnual] = useState(false);

  if (devices.length === 0) {
    return null;
  }

  const appleCostPlusCost = calculations.totalAppleCarePlusCost(useAnnual);
  const appleCareOneCost = calculations.appleCareOneCost(useAnnual);
  const recommended = calculations.recommendedOption(useAnnual);
  const bestSplit = calculations.bestCostSplit(useAnnual);

  return (
    <div className="space-y-6">
      {/* Billing Toggle */}
      <Card className="bg-gradient-to-r from-card to-muted/30 border-border/50">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Calculator className="w-5 h-5 text-primary" />
              <span className="font-medium">Billing Cycle</span>
            </div>
            <div className="flex items-center gap-3">
              <span className={`text-sm ${!useAnnual ? 'text-foreground font-medium' : 'text-muted-foreground'}`}>
                Monthly
              </span>
              <Switch
                checked={useAnnual}
                onCheckedChange={setUseAnnual}
                className="data-[state=checked]:bg-primary"
              />
              <span className={`text-sm ${useAnnual ? 'text-foreground font-medium' : 'text-muted-foreground'}`}>
                Annual
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Cost Comparison */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card className={`transition-all duration-300 ${recommended === "AppleCare+" ? 'bg-gradient-to-br from-success/5 to-success/10 border-success/20 shadow-lg' : 'bg-gradient-to-br from-card to-muted/20 border-border/50'}`}>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
               AppleCare+
              {recommended === "AppleCare+" && (
                <Badge variant="default" className="bg-success text-success-foreground">
                  <Crown className="w-3 h-3 mr-1" />
                  Recommended
                </Badge>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground mb-2">
              ${appleCostPlusCost.toFixed(2)}/mo
            </div>
            <p className="text-sm text-muted-foreground">
              Individual coverage for each device
            </p>
          </CardContent>
        </Card>

        <Card className={`transition-all duration-300 ${recommended === "AppleCare One" ? 'bg-gradient-to-br from-success/5 to-success/10 border-success/20 shadow-lg' : 'bg-gradient-to-br from-card to-muted/20 border-border/50'}`}>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
                CareOne
              {recommended === "AppleCare One" && (
                <Badge variant="default" className="bg-success text-success-foreground">
                  <Crown className="w-3 h-3 mr-1" />
                  Recommended
                </Badge>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground mb-2">
              ${appleCareOneCost.toFixed(2)}/mo
            </div>
            <p className="text-sm text-muted-foreground">
              Covering up to 3 devices + extras for $5.99/device
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Optimal Split */}
      {bestSplit.total < Math.min(appleCostPlusCost, appleCareOneCost) && (
        <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Crown className="w-5 h-5 text-primary" />
              Optimal Split Strategy
              <Badge variant="default" className="bg-primary text-primary-foreground">
                Best Value
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-2xl font-bold text-primary">
              ${bestSplit.total.toFixed(2)}/mo
            </div>

            {bestSplit.careOneDevices.length > 0 && (
              <div className="space-y-2">
                <h4 className="font-medium flex items-center gap-2">
                   CareOne ({bestSplit.careOneDevices.length} devices)
                </h4>
                <div className="text-sm text-muted-foreground bg-muted/30 p-3 rounded-lg space-y-1">
                  {calculations.structuredDeviceSummary(bestSplit.careOneDevices, useAnnual).map((item, idx) => (
                    <div key={idx} className="flex justify-between">
                      <span>{item.name}</span>
                      <span>x{item.quantity}</span>
                    </div>
                  ))}
                  <hr className="my-2 border-muted" />
                  <div className="flex justify-between font-semibold text-foreground">
                    <span>Total</span>
                    <span>
                      ${(bestSplit.total - calculations.structuredDeviceSummary(bestSplit.carePlusDevices, useAnnual)
                        .reduce((sum, item) => sum + item.cost, 0)).toFixed(2)}/mo

                    </span>
                  </div>
                </div>

              </div>
            )}

            {bestSplit.carePlusDevices.length > 0 && (
              <div className="space-y-2">
                <h4 className="font-medium flex items-center gap-2">
                   AppleCare+ ({bestSplit.carePlusDevices.length} devices)
                </h4>
                <div className="text-sm text-muted-foreground bg-muted/30 p-3 rounded-lg space-y-1">
                  {calculations.structuredDeviceSummary(bestSplit.carePlusDevices, useAnnual).map((item, idx) => (
                    <div key={idx} className="flex justify-between">
                      <span>{item.name}</span>
                      <span>x{item.quantity}</span>
                    </div>
                  ))}
                  <hr className="my-2 border-muted" />
                  <div className="flex justify-between font-semibold text-foreground">
                    <span>Total</span>
                    <span>
                      ${calculations.structuredDeviceSummary(bestSplit.carePlusDevices, useAnnual)
                        .reduce((sum, item) => sum + item.cost, 0)
                        .toFixed(2)}/mo
                    </span>
                  </div>
                </div>
              </div>
            )}

          </CardContent>
        </Card>
      )}
    </div>
  );
};