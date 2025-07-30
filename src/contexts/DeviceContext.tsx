import React, { createContext, useContext, ReactNode } from "react";
import { AppleDevice, isSelectableDevice } from "@/types/apple-device";
import { useDeviceStorage } from "@/hooks/useDeviceStorage";
import { useDeviceCalculations } from "@/hooks/useDeviceCalculations";

interface DeviceContextType {
  devices: AppleDevice[];
  addDevice: (device: AppleDevice) => void;
  removeDevice: (index: number) => void;
  increaseQuantity: (device: AppleDevice) => void;
  decreaseQuantity: (device: AppleDevice) => void;
  calculations: ReturnType<typeof useDeviceCalculations>;
}

const DeviceContext = createContext<DeviceContextType | undefined>(undefined);

export const useDevices = () => {
  const context = useContext(DeviceContext);
  if (!context) {
    throw new Error("useDevices must be used within a DeviceProvider");
  }
  return context;
};

interface DeviceProviderProps {
  children: ReactNode;
}

export const DeviceProvider: React.FC<DeviceProviderProps> = ({ children }) => {
  const [devices, setDevices] = useDeviceStorage();
  const calculations = useDeviceCalculations(devices);

  const addDevice = (newDevice: AppleDevice) => {
    if (!isSelectableDevice(newDevice)) return;

    setDevices(prevDevices => {
      const existingIndex = prevDevices.findIndex(device =>
        device.name === newDevice.name &&
        device.type === newDevice.type &&
        device.monthlyCost === newDevice.monthlyCost &&
        device.annuallyCost === newDevice.annuallyCost
      );

      if (existingIndex >= 0) {
        const updated = [...prevDevices];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + 1
        };
        return updated;
      } else {
        return [...prevDevices, { ...newDevice, quantity: 1 }];
      }
    });
  };

  const removeDevice = (index: number) => {
    setDevices(prevDevices => prevDevices.filter((_, i) => i !== index));
  };

  const increaseQuantity = (device: AppleDevice) => {
    setDevices(prevDevices => 
      prevDevices.map(d => 
        d.id === device.id 
          ? { ...d, quantity: d.quantity + 1 }
          : d
      )
    );
  };

  const decreaseQuantity = (device: AppleDevice) => {
    setDevices(prevDevices => {
      const deviceIndex = prevDevices.findIndex(d => d.id === device.id);
      if (deviceIndex === -1) return prevDevices;
      
      const device_ = prevDevices[deviceIndex];
      if (device_.quantity > 1) {
        return prevDevices.map(d => 
          d.id === device.id 
            ? { ...d, quantity: d.quantity - 1 }
            : d
        );
      } else {
        return prevDevices.filter(d => d.id !== device.id);
      }
    });
  };

  return (
    <DeviceContext.Provider value={{
      devices,
      addDevice,
      removeDevice,
      increaseQuantity,
      decreaseQuantity,
      calculations
    }}>
      {children}
    </DeviceContext.Provider>
  );
};