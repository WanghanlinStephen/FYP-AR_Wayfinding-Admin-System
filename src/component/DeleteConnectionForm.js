import React from 'react';
import 'antd/dist/antd.min.css';
import './css/SubmitForm.css';
import { Form, Input, Button, Select } from 'antd';
require('./Picture');

//直接用{this.props.label}就可以了

const { Option } = Select;
const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};

class DeleteConnectionForm extends React.Component {
  formRef = React.createRef();
  onFinish = (values) => {
    var source = values['source'].substring(1,values['source'].length-1);
    var destination = values['destination'].substring(1,values['destination'].length-1);
    let sourceLatitude= source.split(',')[0];
    let sourceLongitude= source.split(',')[1];
    let destinationLatitude= destination.split(',')[0];
    let destinationLongitude= destination.split(',')[1];
    var details = {
      'sourceLatitude': parseFloat(sourceLatitude),
      'sourceLongitude':parseFloat(sourceLongitude),
      'destinationLatitude': parseFloat(destinationLatitude),
      'destinationLongitude':parseFloat(destinationLongitude),
    };

    let formBody = [];
    for (let property in details) {
      let encodedKey = encodeURIComponent(property);
      let encodedValue = encodeURIComponent(details[property]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");

    const requestOptions = {
      method: 'POST',
      headers: {'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'},
      body: formBody
    }
    // 数据库
    // https://fyp21043s1.cs.hku.hk:8080/v1/admin/delete/connection
    // http://localhost:3000/v1/admin/delete/connection
    fetch( `https://fyp21043s1.cs.hku.hk:8080/v1/admin/delete/connection`, requestOptions)
    .then(res => res.json())
    .then(data => {
      console.log("Success");
      alert("Successfully Submit!")
    })
    .catch((error) => {
      console.error("Error fetching data: ", error);
    })
  };
  onReset = () => {
    this.formRef.current.resetFields();
  };
  onFill = () => {
    this.formRef.current.setFieldsValue({
      note: 'Hello world!',
      gender: 'male',
    });
  };



  render() {
    return (
        <Form {...layout} ref={this.formRef} name="control-ref" onFinish={this.onFinish}>
          <Form.Item
              name="source"
              label="Source"
              rules={[
                {
                  required: true,
                },
              ]}
          >
            <Select
                placeholder="Select a option and change input text above"
                id="source"
                allowClear
                options={this.props.label.map(a=>({ value: a, label: a}))}
            >
            </Select>
          </Form.Item>
          <Form.Item
              name="destination"
              label="Destination"
              rules={[
                {
                  required: true,
                },
              ]}
          >
            <Select
                placeholder="Select a option and change input text above"
                id="destination"
                allowClear
                options={this.props.label.map(a=>({ value: a, label: a}))}
            >
            </Select>
          </Form.Item>
          <Form.Item
              noStyle
              shouldUpdate={(prevValues, currentValues) => prevValues.gender !== currentValues.gender}
          >
            {({ getFieldValue }) =>
                getFieldValue('gender') === 'other' ? (
                    <Form.Item
                        name="customizeGender"
                        label="Customize Gender"
                        rules={[
                          {
                            required: true,
                          },
                        ]}
                    >
                      <Input />
                    </Form.Item>
                ) : null
            }
          </Form.Item>
          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
            <Button htmlType="button" onClick={this.onReset}>
              Reset
            </Button>
          </Form.Item>
        </Form>

    );
  }
}
export default DeleteConnectionForm;