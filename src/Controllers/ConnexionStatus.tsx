import { useState, useEffect } from 'react';
import syncData from "./syncData.tsx";

const ConnectionStatus = () => {
    const [isOnline, setIsOnline] = useState(navigator.onLine);

    useEffect(() => {
        const handleOnline = () => {
            setIsOnline(true);
            syncData();
        };

        const handleOffline = () => setIsOnline(false);

        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);

        // Exécuter syncData toutes les 30 secondes lorsque la connexion Internet est disponible
        const syncDataInterval = setInterval(() => {
            if (isOnline) {
                syncData();
            }
        }, 30000);

        return () => {
            window.removeEventListener('online', handleOnline);
            window.removeEventListener('offline', handleOffline);
            clearInterval(syncDataInterval);
        };
    }, [isOnline]);

    return (
        <div>
      <span
          style={{
              backgroundColor: isOnline ? 'green' : 'red',
              color: "white",
              marginLeft: 10,
              padding: 2,
              borderRadius: 4,
              fontSize: 10
          }}
      >
        {isOnline ? 'Connecté' : 'Déconnecté'}
      </span>
        </div>
    );
};

export default ConnectionStatus;