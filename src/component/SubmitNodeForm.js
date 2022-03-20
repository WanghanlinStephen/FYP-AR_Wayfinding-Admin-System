import React from 'react';
import 'antd/dist/antd.min.css';
import './css/SubmitForm.css';
import { Form, Input, Button, Select } from 'antd';
import {ContainerFilled} from "@ant-design/icons";
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

class SubmitNodeForm extends React.Component {
  formRef = React.createRef();
  onFinish = (values) => {
    let imgEl = document.getElementById("imageId");
    let width = imgEl.offsetWidth
    let height = imgEl.offsetHeight
    let coordinate = values['labelID'];
    coordinate = coordinate.substring(1,coordinate.length-1);
    let latitude= coordinate.split(',')[0];
    let longitude= coordinate.split(',')[1];
    let relativeLatitude = parseInt(latitude, 10) / width
    let relativeLongitude = parseInt(longitude, 10) / height
    var details = {
      'nameEnglish': values['nameEnglish'],
      'nameChinese': values['nameChinese'],
      'nameTraditionalChinese': values['nameChinese'],
      'latitude':  relativeLatitude.toPrecision(2),
      'longitude': relativeLongitude.toPrecision(2),
      'intersectionalAngle':values['intersectionalAngle'],
    };
    console.log(details);

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
    // http://localhost:3000/v1/admin/add/node
    // https://fyp21043s1.cs.hku.hk:8080/v1/admin/add/node
    fetch( `https://fyp21043s1.cs.hku.hk:8080/v1/admin/add/node`, requestOptions)
    .then(res => res.json())
    .then(data => {
      console.log("Success");
      alert("Successfully Submit!")
    })
    .catch((error) => {
      console.error("Error fetching data: ", error);
    })
  };


  onSelect = (values) => {
      let imgEl = document.getElementById("imageId");
      let width = imgEl.offsetWidth
      let height = imgEl.offsetHeight
      let coordinate = values['emergentEntryID'];
      coordinate = coordinate.substring(1,coordinate.length-1);
      let latitude= coordinate.split(',')[0];
      let longitude= coordinate.split(',')[1];
      let relativeLatitude = parseInt(latitude, 10) / width
      let relativeLongitude = parseInt(longitude, 10) / height
      //fixme:fetch mapId
      let mapId = 1
      var details = {
          'latitude':  relativeLatitude.toPrecision(2),
          'longitude': relativeLongitude.toPrecision(2),
          'mapId': mapId,
      };
      console.log(details);
      //fixme:send create emergent entry request
      let formBody = [];
      for (let property in details) {
          let encodedKey = encodeURIComponent(property);
          let encodedValue = encodeURIComponent(details[property]);
          formBody.push(encodedKey + "=" + encodedValue);
      }
      formBody = formBody.join("&");
      console.log(formBody);
      const requestOptions = {
          method: 'POST',
          headers: {'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'},
          body: formBody
      }

      // 数据库
      // http://localhost:8080/v1/admin/add/staircase
      // https://fyp21043s1.cs.hku.hk:8080/v1/admin/add/staircase
      fetch( `https://fyp21043s1.cs.hku.hk:8080/v1/admin/add/staircase`, requestOptions)
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


  render() {
    return (
        <div>
            <h3>Create Node</h3>
            <Form {...layout} ref={this.formRef} name="control-ref" onFinish={this.onFinish}>
                <Form.Item
                    name="labelID"
                    label="labelID"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Select
                        placeholder="Select a option and change input text above"
                        id="labelID"
                        allowClear
                        options={this.props.label.map(a=>({ value: a, label: a}))}
                    >
                    </Select>
                </Form.Item>
                <Form.Item
                    label="nameEnglish"
                    name="nameEnglish"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your nameEnglish!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="nameChinese"
                    name="nameChinese"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your nameChinese!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="intersectionalAngle"
                    name="intersectionalAngle"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your intersectionalAngle!',
                        },
                    ]}
                >
                    <Input />
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

            <h3>Select Emergent Entry</h3>
            <Form {...layout} ref={this.formRef} name="control-ref" onFinish={this.onSelect}>
                <Form.Item
                    name="emergentEntryID"
                    label="emergentEntryID"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Select
                        placeholder="Select a option and change input text above"
                        id="emergentEntryID"
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

        </div>

    );
  }
}
export default SubmitNodeForm;