import { FormattedMessage } from "react-intl";
import PlantLogo from "./PlantLogo";
import { useEffect, useState } from "react";

export default function LoadingSpinner() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    return () => {
      setIsVisible(false);
    };
  }, []);

  return (
    <div 
      className={`has-text-centered loading-spinner-container ${!isVisible ? 'fade-out' : ''}`}
      style={{ 
        padding: '3rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '200px',
        overflow: 'visible'
      }}
    >
      <div className="loading-spinner" style={{ 
        padding: '2rem',
        overflow: 'visible'
      }}>
        <PlantLogo width={64} height={64} className="plant-logo" />
      </div>
      <p className="mt-4 has-text-grey" style={{ 
        fontSize: '0.9rem',
        letterSpacing: '0.5px',
        textTransform: 'uppercase'
      }}>
        <FormattedMessage id="message.loading" />
      </p>
    </div>
  );
} 