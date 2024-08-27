// src/components/BirthdayBanner.js
import React from 'react';
import { Card } from 'antd';
import 'antd/dist/antd.css';
import './BirthdayBanner.css';

const BirthdayBanner = ({ name }) => {
  const cardStyle = {
    backgroundColor: 'transparent',
    textAlign: 'center',
    padding: '1px',
    borderRadius: '10px',
    marginBottom: '1px',
  };

  const titleStyle = {
    fontSize: '19px',
    color: '#1890ff',
    position: 'relative',
  };

  return (
    <div className="animated-banner">
      <Card style={cardStyle}>
        <div className="banner-container">
          <div className="shapes">
            <div className="shape star" />
            <div className="shape circle" />
            <div className="shape square" />

            <div className="shape square" />
            <div className="shape star" />
            <div className="shape circle" />
            <div className="shape square" />
            <div className="shape star" />
            <div className="shape spark" />
            <div className="shape spark" />
            <div className="shape spark" />
            <div className="shape spark" />
            <div className="shape star" />
            <div className="shape circle" />
            <div className="shape square" />
            <div className="shape star" />
            <div className="shape circle" />
            <div className="shape square" />
            <div className="shape star" />
            <div className="shape circle" />
            <div className="shape square" />
            <div className="shape star" />
            <div className="shape spark" />
            <div className="shape spark" />
            <div className="shape spark" />
            <div className="shape spark" />
            <div className="shape star" />
            <div className="shape circle" />
            <div className="shape square" />
            <div className="shape star" />
            <div className="shape circle" />
            <div className="shape square" />
            <div className="shape star" />
            <div className="shape circle" />
            <div className="shape square" />
            <div className="shape star" />
            <div className="shape spark" />
            <div className="shape spark" />
            <div className="shape spark" />
            <div className="shape spark" />
            <div className="shape star" />

          </div>
          <div style={titleStyle}>
            <marquee>
              Aujourd'hui c'est l'anniversaire de {name} souhaitez-le lui !
            </marquee>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default BirthdayBanner;
