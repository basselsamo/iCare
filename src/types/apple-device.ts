export enum DeviceType {
  iPhone = "iPhone",
  iPad = "iPad", 
  Mac = "Mac",
  Watch = "Watch",
  AirPods = "AirPods",
  Display = "Display",
  TV = "TV",
  VisionPro = "VisionPro",
  HomePod = "HomePod",
  Other = "Other"
}

export interface AppleDevice {
  id: string;
  type: DeviceType;
  name: string;
  monthlyCost: number;
  annuallyCost?: number;
  quantity: number;
}

export const createDevice = (
  type: DeviceType,
  name: string,
  monthlyCost: number,
  annuallyCost?: number
): AppleDevice => ({
  id: crypto.randomUUID(),
  type,
  name,
  monthlyCost,
  annuallyCost,
  quantity: 1
});

export const SELECT_PLACEHOLDER: AppleDevice = {
  id: "select-placeholder",
  type: DeviceType.Other,
  name: "Select Device",
  monthlyCost: 0,
  quantity: 1
};

export const SELECT_AGAIN_PLACEHOLDER: AppleDevice = {
  id: "select-again-placeholder", 
  type: DeviceType.Other,
  name: "Select Another Device",
  monthlyCost: 0,
  quantity: 1
};

export const isSelectableDevice = (device: AppleDevice): boolean => {
  return device.name !== "Select Device" && device.name !== "Select Another Device";
};