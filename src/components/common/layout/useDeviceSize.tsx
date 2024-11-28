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
  const [size, setSize] = useState<DeviceSize>(() => ({
    width:
      typeof window !== "undefined"
        ? maxWidth
          ? Math.min(window.innerWidth, maxWidth)
          : window.innerWidth
        : 0,
    height:
      typeof window !== "undefined"
        ? maxHeight
          ? Math.min(window.innerHeight, maxHeight)
          : window.innerHeight
        : 0,
  }));

  useEffect(() => {
    const handleResize = () => {
      setSize({
        width: maxWidth
          ? Math.min(window.innerWidth, maxWidth)
          : window.innerWidth,
        height: maxHeight
          ? Math.min(window.innerHeight, maxHeight)
          : window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // initial call to set size

    return () => window.removeEventListener("resize", handleResize);
  }, [maxWidth, maxHeight]);

  return size;
}

export default useDeviceSize;
