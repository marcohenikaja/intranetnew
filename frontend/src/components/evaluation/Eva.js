import React, { useEffect } from 'react';
import { Button, message } from 'antd';

const Eva = () => {
    useEffect(() => {
        checkNotificationPermission();
    }, []);

    const checkNotificationPermission = () => {
        if (!("Notification" in window)) {
            alert("Ce navigateur ne supporte pas les notifications de bureau.");
        } else if (Notification.permission === "granted") {
            message.success('Les notifications sont activées.');
        } else if (Notification.permission === "denied") {
            message.warning('Les notifications sont bloquées pour ce site. Veuillez activer les notifications dans les paramètres de votre navigateur.');
        } else {
            // Demande de permission si non encore définie
            Notification.requestPermission().then((permission) => {
                if (permission === "granted") {
                    message.success('Permission accordée pour les notifications.');
                } else if (permission === "denied") {
                    message.warning('Les notifications ont été refusées.');
                }
            });
        }
    };

    const showNotification = () => {
        if (Notification.permission === "granted") {
            const notification = new Notification("Titre de la notification", {
                body: "Ceci est le contenu de la notification.",
                icon: "https://via.placeholder.com/150",
            });

            notification.onclick = () => {
                console.log("Notification cliquée !");
                window.focus();
            };
        } else {
            message.warning('Les notifications ne sont pas autorisées. Veuillez activer les notifications dans les paramètres de votre navigateur.');
        }
    };

    return (
        <div style={{ padding: '20px', marginTop: '100px' }}>
            <h1>Notification Windows avec React</h1>
            <Button type="primary" onClick={showNotification}>
                Afficher Notification
            </Button>
        </div>
    );
};

export default Eva;
