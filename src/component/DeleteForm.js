import React from 'react';
import 'antd/dist/antd.min.css';
import './css/SubmitForm.css';
import { Form, Input, Button, Select } from 'antd';
require('./Picture');

//直接用label就可以了

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

class DeleteForm extends React.Component {
  formRef = React.createRef();
  onFinish = (values) => {
    var details = {
      'Id': parseInt(values['labelId']),
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
    fetch( `http://localhost:3000/v1/admin/delete/both`, requestOptions)
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
  labels=["1","2","3"];



  render() {
    return (
        <Form {...layout} ref={this.formRef} name="control-ref" onFinish={this.onFinish}>
          <Form.Item
              name="labelId"
              label="labelId"
              rules={[
                {
                  required: true,
                },
              ]}
          >
            <Select
                placeholder="Select a option and change input text above"
                id="labelId"
                allowClear
                options={this.labels.map(a=>({ value: a, label: a}))}
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
            <Button type="link" htmlType="button" onClick={this.onFill}>
              Fill form
            </Button>
          </Form.Item>
        </Form>
    );
  }
}
export default DeleteForm;