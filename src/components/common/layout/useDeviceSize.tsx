import { useState, useEffect } from "react";

interface UseDeviceSizeProps {
  maxWidth?: number;
  maxHeight?: number;
}

interface DeviceSize {
  width: number;
  height: number;
}

function useDeviceSize({
  maxWidth = 550,
  maxHeight,
}: UseDeviceSizeProps = {}): DeviceSize {
  const getDeviceWidth = (): number => {
    if (typeof window === "undefined") return 0;
    return maxWidth ? Math.min(window.innerWidth, maxWidth) : window.innerWidth;
  };

  const getDeviceHeight = (): number => {
    if (typeof window === "undefined") return 0;
    return maxHeight
      ? Math.min(window.innerHeight, maxHeight)
      : window.innerHeight;
  };

  const [size, setSize] = useState<DeviceSize>(() => ({
    width: getDeviceWidth(),
    height: getDeviceHeight(),
  }));

  return size;
}

export default useDeviceSize;
