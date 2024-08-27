import React from 'react';
import {
  BorderTopOutlined,

} from '@ant-design/icons';
import { Button, notification } from 'antd';



const Test = () => {
  const [api, contextHolder] = notification.useNotification();
  const openNotification = (placement) => {
    api.info({
      message: `Notification ${placement}`,
      description:
        'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
      placement,
    });
  };
  return (
    <>
      {contextHolder}

      <br /> <br /><br /><br /><br /><br />

      <Button type="primary" onClick={() => openNotification('top')} icon={<BorderTopOutlined />}>
        top
      </Button>


    </>
  );
};
export default Test;