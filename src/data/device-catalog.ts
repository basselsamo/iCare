import { AppleDevice, DeviceType, createDevice } from "@/types/apple-device";

export const PREDEFINED_DEVICES: AppleDevice[] = [
  createDevice(DeviceType.iPhone, "iPhone 16e", 9.99, 99.99),
  createDevice(DeviceType.iPhone, "iPhone 16, iPhone 15", 11.99, 119.99),
  createDevice(DeviceType.iPhone, "iPhone 16 Plus, iPhone 15 Plus", 12.99, 129.99),
  createDevice(DeviceType.iPhone, "iPhone 16 Pro, iPhone 16 Pro Max", 13.99, 139.99),

  createDevice(DeviceType.Mac, "Mac mini", 3.49, 34.99),
  createDevice(DeviceType.Mac, "Mac Studio", 5.99, 59.99),
  createDevice(DeviceType.Mac, "iMac", 5.99, 59.99),
  createDevice(DeviceType.Mac, "MacBook Air 13-inch", 6.99, 69.99),
  createDevice(DeviceType.Mac, "MacBook Air 15-inch", 7.99, 79.99),
  createDevice(DeviceType.Mac, "MacBook Pro 14-inch", 9.99, 99.99),
  createDevice(DeviceType.Mac, "MacBook Pro 16-inch", 14.99, 149.99),
  createDevice(DeviceType.Mac, "Mac Pro", 17.99, 179.99),

  createDevice(DeviceType.Display, "Apple Studio Display", 4.99, 49.99),
  createDevice(DeviceType.Display, "Pro Display XDR", 17.99, 179.99),

  createDevice(DeviceType.iPad, "iPad, iPad mini", 4.99, 49.99),
  createDevice(DeviceType.iPad, "iPad Air 11-inch (M3)", 5.99, 59.99),
  createDevice(DeviceType.iPad, "iPad Air 13-inch (M3)", 6.99, 69.99),
  createDevice(DeviceType.iPad, "iPad Pro 11-inch (M4)", 9.99, 99.99),
  createDevice(DeviceType.iPad, "iPad Pro 13-inch (M4)", 10.99, 109.99),

  createDevice(DeviceType.Watch, "Apple Watch SE", 2.99, 29.99),
  createDevice(DeviceType.Watch, "Apple Watch Series 10", 4.99, 49.99),
  createDevice(DeviceType.Watch, "Apple Watch Ultra 2", 5.99, 59.99),
  createDevice(DeviceType.Watch, "Apple Watch Hermès", 5.99, 59.99),
  createDevice(DeviceType.Watch, "Apple Watch Hermès Ultra", 5.99, 59.99),

  createDevice(DeviceType.VisionPro, "Apple Vision Pro", 24.99, 249.99),

  createDevice(DeviceType.AirPods, "AirPods, AirPods Pro, Beats", 1.49, 14.99),
  createDevice(DeviceType.AirPods, "AirPods Max", 2.99, 29.99),

  createDevice(DeviceType.TV, "Apple TV", 0.8325, 9.99),
  createDevice(DeviceType.HomePod, "HomePod mini", 0.8325, 9.99),
  createDevice(DeviceType.HomePod, "HomePod", 1.6658, 19.99)
];

export const getDevicesByType = (type: DeviceType): AppleDevice[] => {
  return PREDEFINED_DEVICES.filter(device => device.type === type);
};

export const getAllDeviceTypes = (): DeviceType[] => {
  return Object.values(DeviceType).filter(type => type !== DeviceType.Other);
};