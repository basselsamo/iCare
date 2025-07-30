import React from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AppleDevice, DeviceType, SELECT_PLACEHOLDER, SELECT_AGAIN_PLACEHOLDER } from "@/types/apple-device";
import { PREDEFINED_DEVICES } from "@/data/device-catalog";
import { useDevices } from "@/contexts/DeviceContext";
import { Smartphone, Tablet, Monitor, Watch, Headphones, Tv, Eye, Home } from "lucide-react";

const getDeviceIcon = (type: DeviceType) => {
  switch (type) {
    case DeviceType.iPhone:
      return <Smartphone className="w-4 h-4" />;
    case DeviceType.iPad:
      return <Tablet className="w-4 h-4" />;
    case DeviceType.Mac:
    case DeviceType.Display:
      return <Monitor className="w-4 h-4" />;
    case DeviceType.Watch:
      return <Watch className="w-4 h-4" />;
    case DeviceType.AirPods:
      return <Headphones className="w-4 h-4" />;
    case DeviceType.TV:
      return <Tv className="w-4 h-4" />;
    case DeviceType.VisionPro:
      return <Eye className="w-4 h-4" />;
    case DeviceType.HomePod:
      return <Home className="w-4 h-4" />;
    default:
      return null;
  }
};

interface DeviceSelectorProps {
  placeholder?: AppleDevice;
}

export const DeviceSelector: React.FC<DeviceSelectorProps> = ({ 
  placeholder = SELECT_PLACEHOLDER 
}) => {
  const { addDevice } = useDevices();

  const handleDeviceSelect = (deviceId: string) => {
    const device = PREDEFINED_DEVICES.find(d => d.id === deviceId);
    if (device) {
      addDevice(device);
    }
  };

  const groupedDevices = PREDEFINED_DEVICES.reduce((acc, device) => {
    if (!acc[device.type]) {
      acc[device.type] = [];
    }
    acc[device.type].push(device);
    return acc;
  }, {} as Record<DeviceType, AppleDevice[]>);

  return (
    <Select onValueChange={handleDeviceSelect}>
      <SelectTrigger className="w-full bg-gradient-to-r from-card to-muted/50 border-border/50 hover:border-primary/20 transition-all duration-300">
        <SelectValue placeholder={placeholder.name} />
      </SelectTrigger>
      <SelectContent className="max-h-80">
        {Object.entries(groupedDevices).map(([type, devices]) => (
          <div key={type}>
            <div className="flex items-center gap-2 px-2 py-1.5 text-xs font-medium text-muted-foreground border-b border-border/50">
              {getDeviceIcon(type as DeviceType)}
              {type}
            </div>
            {devices.map((device) => (
              <SelectItem 
                key={device.id} 
                value={device.id}
                className="pl-6"
              >
                <div className="flex justify-between items-center w-full">
                  <span className="truncate">{device.name}</span>
                  <span className="text-xs text-muted-foreground ml-2">
                    ${device.monthlyCost.toFixed(2)}/mo
                  </span>
                </div>
              </SelectItem>
            ))}
          </div>
        ))}
      </SelectContent>
    </Select>
  );
};