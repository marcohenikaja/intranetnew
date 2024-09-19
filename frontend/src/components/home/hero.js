

import React, { useState, useEffect } from 'react';
import { Carousel, Modal, Avatar } from 'antd';
import axios from 'axios';
import './animations.css';
import car1 from '../../assets/images/car1.jpg';
import car2 from '../../assets/images/car2.jpg';
import car3 from '../../assets/images/car3.jpg';

const items = [
  {
    key: '1',
    title: "Bienvenue sur l'intranet du groupe NP AKADIN, votre porte d'entrée pour découvrir notre univers et en apprendre davantage sur nous.",
    content: '',
    image: car2,
  },
  {
    key: '2',
    title: "Bienvenue sur l'intranet du groupe NP AKADIN, votre porte d'entrée pour découvrir notre univers et en apprendre davantage sur nous.",
    content: "",
    image: car1,
  },
  {
    key: '3',
    title: "Bienvenue sur l'intranet du groupe NP AKADIN, votre porte d'entrée pour découvrir notre univers et en apprendre davantage sur nous.",
    content: '',
    image: car3,
  },
];

const AppHero = () => {
  const [todayEmployees, setTodayEmployees] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [img, setImg] = useState('');

  const [modalannif, setModalannif] = useState(false);

  const handleCloseModal = () => {
    setModalannif(false)
  }


  const showmodalannnif = (imagephoto) => {
    setImg(imagephoto)
    setModalannif(true)
  }

  const url = 'http://172.16.0.92:8000/';
  const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD

  const fetchBirthdays = async () => {
    try {
      const response = await axios.get(`${url}birthdays/${today}`);
      setTodayEmployees(response.data);
      if (response.data.length > 0) {
        setIsModalVisible(true);
      }
    } catch (error) {
      console.error('Error fetching birthdays:', error);
    }
  };

  useEffect(() => {
    fetchBirthdays();
  }, []);

  const handleModalClose = () => {
    setIsModalVisible(false);
  };

  const renderAnimatedElements = () => {
    const elements = [];
    const emojis = ['🎉', '🎂', '🎈', '🎁', '🌟'];

    for (let i = 0; i < 50; i++) {
      const emoji = emojis[Math.floor(Math.random() * emojis.length)];
      const size = Math.random() * 20 + 20; // Random size between 20 and 40px
      const left = Math.random() * 100; // Random horizontal position
      const duration = Math.random() * 5 + 5; // Random duration between 5 and 10 seconds

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

  const birthdayMessages = [
    "🎉 Fêtons ensemble l'anniversaire de {employee.prenom} ! N'oubliez pas de leur souhaiter une excellente journée ! 🎂",
    "🎉 Aujourd'hui, nous célébrons {employee.prenom} ! Partagez vos souhaits de bonheur et de joie ! 🎂",
    "🎉 Heureux anniversaire à {employee.prenom} ! Que cette journée soit pleine de surprises et de joie ! 🎂"
  ];

  const getRandomBirthdayMessage = (employee) => {
    const message = birthdayMessages[Math.floor(Math.random() * birthdayMessages.length)];
    return message.replace('{employee.prenom}', employee.prenom);
  };

  return (
    <div id="hero" className="heroBlock">
      <Carousel autoplay className="carouselBackground">
        {items.map(item => (
          <div key={item.key} className="carouselItem">
            <div className="carouselText">
              <h3 style={{ color: 'white', width: '100%' }}>{item.title}</h3>
              <p style={{ color: 'white' }}>{item.content}</p>
            </div>
            <img src={item.image} style={{ width: '100%', height: 'auto' }} alt={item.title} />
          </div>
        ))}
      </Carousel>
      <Modal
        title="Anniversaire !"
        visible={isModalVisible}
        onCancel={handleModalClose}
        footer={[]}
        className="birthdayModal"
      >
        {renderAnimatedElements()}
        {todayEmployees.length > 0 && (
          <div className="birthdayMessage">
            {todayEmployees.map(employee => (
              <div key={employee.id} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                <Avatar
                  src={`${url}${employee.imageUrl}`}
                  alt={`${employee.prenom} ${employee.nom}`}
                  style={{ width: '150px', height: '80px', borderRadius: '500%' }}
                  onClick={() => showmodalannnif(employee.imageUrl)}
                />

                <p style={{ marginLeft: '10px' }}>{getRandomBirthdayMessage(employee)} </p>
              </div>
            ))}
          </div>
        )}
      </Modal>



      <Modal
        visible={modalannif}
        footer={null}
        onCancel={handleCloseModal}
        centered
        style={{ textAlign: 'center', backgroundColor: 'transparent' }}
      >
        <img
          src={`${url}${img}`}
          alt="Preview"
          style={{
            display: 'block',
            margin: '0 auto',
            width: '100%'
          }}
        />
      </Modal>
    </div>
  );
};

export default AppHero;
