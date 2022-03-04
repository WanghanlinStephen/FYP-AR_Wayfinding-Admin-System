import React from 'react';
import 'antd/dist/antd.min.css';
import './css/ControlBar.css';
import { Steps, Button, message } from 'antd';
import ListForm from "./ListForm";
import SubmitConnectionForm from "./SubmitConnectionForm";
import DeleteForm from "./DeleteNodeForm";
import SubmitNodeForm from "./SubmitNodeForm";
import DeleteNodeForm from "./DeleteNodeForm";
import DeleteConnectionForm from "./DeleteConnectionForm";
import CreateQRCode from "./CreateQRCode";

const { Step } = Steps;

const steps = [
  {
    title: 'Add Label',
    content: 'Please select labels on the map ',
  },
  {
    title: 'Add Connection',
    content: 'Please determine the relationship',
  },
  {
    title: 'Delete Node',
    content: 'Delete Successfully',
  },
  {
    title: 'Delete Connection',
    content: 'Delete Successfully',
  },
  {
    title: 'Create QR Code',
    content: 'Create Successfully',
  },

];

const ControlBar = (props) => {
  const {label,connection} = props;

  console.log(label);
  console.log(connection);

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
          { current == 0 && (
              <SubmitNodeForm label={label}/>
          )}
          { current == 1 && (
              <SubmitConnectionForm label={label}/>
          )}
          { current == 2 && (
              <DeleteNodeForm label={label}/>
          )}
          { current == 3 && (
              <DeleteConnectionForm label={label}/>
          )}
          { current == 4 && (
              <CreateQRCode label={label}/>
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