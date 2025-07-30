import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AppleDevice, DeviceType } from "@/types/apple-device";
import { useDevices } from "@/contexts/DeviceContext";
import { Minus, Plus, Trash2, Smartphone, Tablet, Monitor, Watch, Headphones, Tv, Eye, Home } from "lucide-react";

const getDeviceIcon = (type: DeviceType) => {
  const iconClass = "w-5 h-5 text-primary";
  switch (type) {
    case DeviceType.iPhone:
      return <Smartphone className={iconClass} />;
    case DeviceType.iPad:
      return <Tablet className={iconClass} />;
    case DeviceType.Mac:
    case DeviceType.Display:
      return <Monitor className={iconClass} />;
    case DeviceType.Watch:
      return <Watch className={iconClass} />;
    case DeviceType.AirPods:
      return <Headphones className={iconClass} />;
    case DeviceType.TV:
      return <Tv className={iconClass} />;
    case DeviceType.VisionPro:
      return <Eye className={iconClass} />;
    case DeviceType.HomePod:
      return <Home className={iconClass} />;
    default:
      return null;
  }
};

interface DeviceItemProps {
  device: AppleDevice;
  index: number;
}

const DeviceItem: React.FC<DeviceItemProps> = ({ device, index }) => {
  const { removeDevice, increaseQuantity, decreaseQuantity } = useDevices();

  return (
    <Card className="bg-gradient-to-br from-card via-card to-muted/20 border-border/50 hover:border-primary/20 transition-all duration-300 shadow-card">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 flex-1 min-w-0">
            {getDeviceIcon(device.type)}
            <div className="flex-1 min-w-0">
              <h4 className="font-medium text-foreground truncate">{device.name}</h4>
              <p className="text-sm text-muted-foreground">
                ${device.monthlyCost.toFixed(2)}/mo
                {device.annuallyCost && (
                  <span className="ml-2">• ${device.annuallyCost.toFixed(2)}/yr</span>
                )}
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 bg-muted/50 rounded-lg p-1">
              <Button
                size="sm"
                variant="ghost"
                onClick={() => decreaseQuantity(device)}
                className="h-7 w-7 p-0 hover:bg-destructive/10 hover:text-destructive"
              >
                <Minus className="w-3 h-3" />
              </Button>
              
              <span className="px-2 py-1 text-sm font-medium min-w-[2rem] text-center">
                {device.quantity}
              </span>
              
              <Button
                size="sm"
                variant="ghost"
                onClick={() => increaseQuantity(device)}
                className="h-7 w-7 p-0 hover:bg-primary/10 hover:text-primary"
              >
                <Plus className="w-3 h-3" />
              </Button>
            </div>
            
            <Button
              size="sm"
              variant="ghost"
              onClick={() => removeDevice(index)}
              className="h-7 w-7 p-0 hover:bg-destructive/10 hover:text-destructive"
            >
              <Trash2 className="w-3 h-3" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export const DeviceList: React.FC = () => {
  const { devices } = useDevices();

  if (devices.length === 0) {
    return (
      <Card className="bg-gradient-to-br from-muted/30 to-muted/10 border-dashed border-border/50">
        <CardContent className="p-8 text-center">
          <div className="text-muted-foreground">
            <Monitor className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p className="text-lg font-medium mb-1">No devices added yet</p>
            <p className="text-sm">Select a device above to get started</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-3">
      {devices.map((device, index) => (
        <DeviceItem key={device.id} device={device} index={index} />
      ))}
    </div>
  );
};