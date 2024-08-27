import React, { useState, useEffect } from 'react';
import { Modal, Avatar } from 'antd';
import './animations.css'; // Importez les animations CSS

const BirthdayModal = ({ employees }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [showEmojis, setShowEmojis] = useState(false);

  useEffect(() => {
    if (employees && employees.length > 0) {
      setIsModalVisible(true);
      setTimeout(() => setShowEmojis(true), 300); // Délai avant de montrer les emojis
    }
  }, [employees]);

  const handleOk = () => {
    setIsModalVisible(false);
    setShowEmojis(false); // Réinitialiser l'affichage des emojis
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setShowEmojis(false); // Réinitialiser l'affichage des emojis
  };

  const renderAnimatedElements = () => {
    const elements = [];
    const emojis = ['🎉', '🎂', '🎈', '🎁', '🌟']; // Liste d'emojis

    for (let i = 0; i < 50; i++) {
      const emoji = emojis[Math.floor(Math.random() * emojis.length)];
      const size = Math.random() * 20 + 20; // Taille aléatoire entre 20 et 40px
      const left = Math.random() * 100; // Position horizontale aléatoire
      const duration = Math.random() * 5 + 5; // Durée aléatoire entre 5 et 10 secondes

      elements.push(
        <div
          key={`emoji-${i}`}
          className="emoji"
          style={{
            left: `${left}%`,
            fontSize: `${size}px`,
            animationDuration: `${duration}s`,
          }}
        >
          {emoji}
        </div>
      );
    }
    return elements;
  };

  return (
    <Modal
      title="Anniversaire !"
      visible={isModalVisible}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={null}
      className="birthdayModal"
    >
      {showEmojis && renderAnimatedElements()}
      {employees && employees.length > 0 && (
        <div className="birthdayMessage">
          {employees.map(employee => (
            <div key={employee.id} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
              <Avatar src={employee.imageUrl} alt={`${employee.prenom} ${employee.nom}`} />
              <p style={{ marginLeft: '0px' }}>Ajourd'hui c'est mon annivesaire, {employee.prenom} {employee.nom} !</p>
            </div>
          ))}
        </div>
      )}
    </Modal>
  );
};

export default BirthdayModal;
