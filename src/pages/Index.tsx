import React from "react";
import { DeviceProvider } from "@/contexts/DeviceContext";
import { DeviceSelector } from "@/components/DeviceSelector";
import { DeviceList } from "@/components/DeviceList";
import { CostCalculator } from "@/components/CostCalculator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SELECT_AGAIN_PLACEHOLDER } from "@/types/apple-device";
import { Shield, Calculator, Apple } from "lucide-react";

const Index = () => {
  return (
    <DeviceProvider>
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          {/* Header */}
          <header className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <h2 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
                iCare —  AppleCare Plan Calculator
              </h2>
            </div>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Compare  AppleCare+ and  CareOne to find the best protection plan for your Apple devices
            </p>
          </header>

          <div className="space-y-8">
            {/* Device Selection */}
            <Card className="bg-gradient-to-br from-card via-card to-muted/20 border-border/50 shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  Add Your Devices
                </CardTitle>
              </CardHeader>
              <CardContent>
                <DeviceSelector placeholder={SELECT_AGAIN_PLACEHOLDER} />
              </CardContent>
            </Card>

            {/* Device List */}
            <div>
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Calculator className="w-5 h-5 text-primary" />
                Your Devices
              </h2>
              <DeviceList />
            </div>

            {/* Cost Calculator */}
            <CostCalculator />
          </div>

          {/* Footer */}
          <footer className="mt-16 text-center text-sm text-muted-foreground">
            <p>Prices are estimates based on current  AppleCare pricing in the United States. Actual costs may vary.</p>
          </footer>
        </div>
      </div>
    </DeviceProvider>
  );
};

export default Index;
