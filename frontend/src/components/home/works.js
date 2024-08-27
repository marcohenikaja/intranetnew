import React from 'react';
import { Button, Modal } from 'antd';
import tuto from '../../assets/video/tuto .mp4'
class AppWorks extends React.Component {
  state = { visible: false };

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  render() {
    return (
      <div id="works" className="block worksBlock">
        <div className="container-fluid">
          <div className="titleHolder">
            <h2>Comment se connecter à l'intranet</h2>
            <p>Regarder la video</p>
          </div>
          <div className="contentHolder">
            <Button size="large" onClick={this.showModal}><i className="fas fa-play"></i></Button>
          </div>
          <Modal
            title="Connecter à l'intranet"
            visible={this.state.visible}
            onCancel={this.handleCancel}
            footer={null}
            destroyOnClose={true}
          >
            <iframe title="Connecter à l'intranet" width="100%" height="350" src={tuto}></iframe>
          </Modal>
        </div>
      </div>
    );
  }
}

export default AppWorks;