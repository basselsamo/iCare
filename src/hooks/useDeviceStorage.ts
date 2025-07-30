import { useEffect, useState } from "react";
import { AppleDevice } from "@/types/apple-device";

const STORAGE_KEY = "saved_apple_devices";

export const useDeviceStorage = () => {
  const [devices, setDevices] = useState<AppleDevice[]>([]);

  // Load devices from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved) as AppleDevice[];
        setDevices(parsed);
      }
    } catch (error) {
      console.error("Failed to load devices from storage:", error);
    }
  }, []);

  // Save devices to localStorage whenever devices change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(devices));
    } catch (error) {
      console.error("Failed to save devices to storage:", error);
    }
  }, [devices]);

  return [devices, setDevices] as const;
};