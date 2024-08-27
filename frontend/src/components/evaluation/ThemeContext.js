import React, { useState } from 'react';
import { Steps, Button } from 'antd';

const { Step } = Steps;

const steps = [
  {
    title: 'Step 1',
    content: 'This is step 1',
  },
  {
    title: 'Step 2',
    content: 'This is step 2',
  },
  {
    title: 'Step 3',
    content: 'This is step 3',
  },
];

const StepperComponent = () => {
  const [current, setCurrent] = useState(0);

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  return (
    <div>
      <Steps current={current}>
        {steps.map(item => (
          <Step key={item.title} title={item.title} />
        ))}
      </Steps>
      <div style={{ marginTop: '20px', padding: '20px', border: '1px solid #eaeaea' }}>
        <div>{steps[current].content}</div>
        <div style={{ marginTop: '20px' }}>
          {current > 0 && (
            <Button style={{ marginRight: '8px' }} onClick={prev}>
              Previous
            </Button>
          )}
          {current < steps.length - 1 && (
            <Button type="primary" onClick={next}>
              Next
            </Button>
          )}
          {current === steps.length - 1 && (
            <Button type="primary">
              Done
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default StepperComponent;
