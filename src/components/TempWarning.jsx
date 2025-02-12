import { useState } from "react";
import Image from "next/image";
import styles from "./TempWarning.module.css";

export default function TempWarning({ top, right, bottom, left }) {
  const [showMessage, setShowMessage] = useState(false);

  // Handles showing the message when mouse enters the icon (Lida com a exibição da mensagem quando o mouse entra no ícone)
  const handleMouseEnter = () => {
    setShowMessage(true);
  };

  // Handles hiding the message when mouse leaves the icon (Lida com o fechamento da mensagem quando o mouse sai do ícone)
  const handleMouseLeave = () => {
    setShowMessage(false);
  };

  // Toggles the message visibility when the icon is clicked (Alterna a visibilidade da mensagem quando o ícone é clicado)
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
            right: right, // Custom position (Posição personalizada)
            bottom: bottom, // Custom position (Posição personalizada)
            left: left, // Custom position (Posição personalizada)
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
