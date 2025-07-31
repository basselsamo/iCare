import { AppleDevice, DeviceType, createDevice } from "@/types/apple-device";

export const PREDEFINED_DEVICES: AppleDevice[] = [
  createDevice(DeviceType.iPhone, "iPhone 16e", 9.99, 99.99),
  createDevice(DeviceType.iPhone, "iPhone 16 / 15 / 14 / 13 / 13 mini", 11.99, 119.99),
  createDevice(DeviceType.iPhone, "iPhone 16 Plus / 15 Plus / 14 Plus, ", 12.99, 129.99),
  createDevice(DeviceType.iPhone, "iPhone 16 Pro & Pro Max / iPhone 15 Pro & Pro Max / iPhone 14 Pro & Pro Max / iPhone 13 Pro & Pro Max ", 13.99, 139.99),
  createDevice(DeviceType.iPhone, "iPhone SE", 7.99, 79.99),

  createDevice(DeviceType.Mac, "Mac mini", 3.49, 34.99),
  createDevice(DeviceType.Mac, "Mac Studio", 5.99, 59.99),
  createDevice(DeviceType.Mac, "iMac / iMac Pro", 5.99, 59.99),
  createDevice(DeviceType.Mac, "Mac Pro", 17.99, 179.99),
  createDevice(DeviceType.Mac, "MacBook Air 13-inch (M3/M4)", 6.99, 69.99),
  createDevice(DeviceType.Mac, "MacBook Air 13-inch (M1/M2)", 6.49, 64.99),
  createDevice(DeviceType.Mac, "MacBook Air 15-inch (M3/M4)", 7.99, 79.99),
  createDevice(DeviceType.Mac, "MacBook Pro 13-inch", 8.99, 89.99),
  createDevice(DeviceType.Mac, "MacBook Pro 14-inch", 9.99, 99.99),
  createDevice(DeviceType.Mac, "MacBook Pro 16-inch", 14.99, 149.99),
  

  createDevice(DeviceType.Display, "Apple Studio Display", 4.99, 49.99),
  createDevice(DeviceType.Display, "Pro Display XDR", 17.99, 179.99),

  createDevice(DeviceType.iPad, "iPad, iPad A16, iPad mini", 4.99, 49.99),
  createDevice(DeviceType.iPad, "iPad Air", 5.99, 59.99),
  createDevice(DeviceType.iPad, "iPad Air 10.9 inch / 11-inch (M2/M3)", 5.99, 59.99),
  createDevice(DeviceType.iPad, "iPad Air 13-inch (M2/M3)", 6.99, 69.99),
  createDevice(DeviceType.iPad, "iPad Pro 11-inch", 7.99, 79.99),
  createDevice(DeviceType.iPad, "iPad Pro 11-inch (M4)", 9.99, 99.99),
    createDevice(DeviceType.iPad, "iPad Pro 12.9-inch", 9.99, 99.99),
  createDevice(DeviceType.iPad, "iPad Pro 13-inch (M4)", 10.99, 109.99),

  createDevice(DeviceType.Watch, "Apple Watch SE", 2.99, 29.99),
  createDevice(DeviceType.Watch, "Apple Watch Series 10 / Series 9 / Series 8", 4.99, 49.99),
  createDevice(DeviceType.Watch, "Apple Watch Hermès", 5.99, 59.99),
  createDevice(DeviceType.Watch, "Apple Watch Ultra 2 / Ultra 1", 5.99, 59.99),
  createDevice(DeviceType.Watch, "Apple Watch Hermès Ultra", 5.99, 59.99),

  createDevice(DeviceType.VisionPro, "Apple Vision Pro", 24.99, 249.99),

  createDevice(DeviceType.AirPods, "AirPods (All excl. AirPods Max), Beats (All)", 1.49, 14.99),
  createDevice(DeviceType.AirPods, "AirPods Max", 2.99, 29.99),

  createDevice(DeviceType.TV, "Apple TV, Apple TV 4K", 0.99, 9.99),
  createDevice(DeviceType.HomePod, "HomePod mini", 0.99, 9.99),
  createDevice(DeviceType.HomePod, "HomePod", 1.99, 19.99)
];

export const getDevicesByType = (type: DeviceType): AppleDevice[] => {
  return PREDEFINED_DEVICES.filter(device => device.type === type);
};

export const getAllDeviceTypes = (): DeviceType[] => {
  return Object.values(DeviceType).filter(type => type !== DeviceType.Other);
};