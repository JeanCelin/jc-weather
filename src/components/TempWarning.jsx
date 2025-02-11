import { useState } from "react";
import Image from "next/image";
import styles from "./TempWarning.module.css";

export default function TempWarning({ top, right, bottom, left }) {
  const [showMessage, setShowMessage] = useState(false);
  const handleMouseEnter = () => {
    setShowMessage(true);
  };
  const handleMouseLeave = () => {
    setShowMessage(false);
  };
  const handleMouseClick = () => {
    setShowMessage(!showMessage);
  };
  return (
    <div className={styles.tempWarning__container}>
      {showMessage && (
        <p
          className={styles.temp__warning}
          style={{
            position: "absolute",
            zIndex: "3",
            top: top,
            right: right, 
            bottom: bottom,  
            left: left,  
          }}>
          The minimum and maximum temperatures show the lowest and highest
          temperatures in the city right now, just for your reference. These
          values are more useful for larger cities. In most cases, the minimum
          and maximum temperatures will be similar to the current temperature.
          You can view this information, but it is optional due to an API
          limitation.
        </p>
      )}
      <div
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleMouseClick}
        style={{ display: "flex", gap: "5px" }}>
        <Image src={"/info.png"} width={14} height={14} alt="info icon" />
      </div>
    </div>
  );
}
