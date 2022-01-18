import React from 'react';
import 'antd/dist/antd.min.css';
import './css/ControlBar.css';
import { Steps, Button, message } from 'antd';
import SubmitForm from "./SubmitForm";
import DeleteForm from "./DeleteForm";

const { Step } = Steps;

const steps = [
  {
    title: 'First Step',
    content: 'Please select labels on the map ',
  },
  {
    title: 'Second Step',
    content: 'Please determine the relationship',
  },
  {
    title: 'Last Step',
    content: 'Submit Successfully',
  },
];

const ControlBar = () => {
  const [current, setCurrent] = React.useState(0);

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  return (
      <>
        <Steps current={current}>
          {steps.map(item => (
              <Step key={item.title} title={item.title} />
          ))}
        </Steps>
        <div className="steps-content">
          { current == 0 && steps[current].content}
          { current == 1 && (
              <SubmitForm />
          )}
          { current == 2 && (
              <DeleteForm />
          )}
        </div>
        <div className="steps-action">
          {current < steps.length - 1 && (
              <Button type="primary" onClick={() => next()}>
                Next
              </Button>
          )}
          {current === steps.length - 1 && (
              <Button type="primary" onClick={() => message.success('Processing complete!')}>
                Done
              </Button>
          )}
          {current > 0 && (
              <Button style={{ margin: '0 8px' }} onClick={() => prev()}>
                Previous
              </Button>
          )}
        </div>
      </>
  );
};

export default ControlBar;