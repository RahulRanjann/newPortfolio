import React, { useEffect, useMemo, useState } from "react";
import { Cloud, fetchSimpleIcons, renderSimpleIcon } from "react-icon-cloud";

// Define cloudProps without using ICloud
const cloudProps = {
  containerProps: {
    style: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
      paddingTop: 40,
    },
  },
  options: {
    reverse: true,
    depth: 1,
    wheelZoom: false,
    imageScale: 2,
    activeCursor: "default",
    tooltip: "native",
    initial: [0.1, -0.1],
    clickToFront: 500,
    tooltipDelay: 0,
    outlineColour: "#0000",
    maxSpeed: 0.04,
    minSpeed: 0.02,
  },
};

const renderCustomIcon = (icon) => {
  const bgHex = "#f3f2ef"; // Fixed light theme background color
  const fallbackHex = "#6e6e73"; // Fixed fallback color
  const minContrastRatio = 1.2; // Fixed contrast ratio for light theme

  return renderSimpleIcon({
    icon,
    bgHex,
    fallbackHex,
    minContrastRatio,
    size: 50,
    aProps: {
      href: undefined,
      target: undefined,
      rel: undefined,
      onClick: (e) => e.preventDefault(), // Disable the click
    },
  });
};

const IconCloud = ({ iconSlugs }) => {
  const [data, setData] = useState(null);
  const [dimensions, setDimensions] = useState({
    width: "300px",
    height: "300px"
  });

  useEffect(() => {
    fetchSimpleIcons({ slugs: iconSlugs }).then(setData);
    
    // Add responsive handling
    function handleResize() {
      if (window.innerWidth < 768) {
        setDimensions({ width: "200px", height: "200px" });
      } else if (window.innerWidth < 1024) {
        setDimensions({ width: "250px", height: "250px" });
      } else {
        setDimensions({ width: "300px", height: "300px" });
      }
    }
    
    // Set dimensions on initial load
    handleResize();
    
    // Add resize listener
    window.addEventListener("resize", handleResize);
    
    // Clean up
    return () => window.removeEventListener("resize", handleResize);
  }, [iconSlugs]);

  const renderedIcons = useMemo(() => {
    if (!data) return null;
    return Object.values(data.simpleIcons).map((icon) => renderCustomIcon(icon));
  }, [data]);

  return (
    <Cloud
      {...cloudProps}
      style={{
        width: dimensions.width,
        height: dimensions.height,
        margin: "10px",
        padding: "10px",
      }}
    >
      {renderedIcons}
    </Cloud>
  );
};

export default IconCloud;
