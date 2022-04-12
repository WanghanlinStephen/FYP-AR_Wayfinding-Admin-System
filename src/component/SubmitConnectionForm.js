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

class SubmitConnectionForm extends React.Component {
  formRef = React.createRef();
  onFinish = (values) => {
    console.log(values);
    let imgEl = document.getElementById("imageId");
    let width = imgEl.offsetWidth
    let height = imgEl.offsetHeight
    var source = values['source'].substring(1,values['source'].length-1);
    var destination = values['destination'].substring(1,values['destination'].length-1);
    let sourceLatitude= source.split(',')[1];
    let sourceLongitude= source.split(',')[0];
    let relativeSourceLatitude = parseInt(sourceLatitude, 10) / height
    let relativeSourceLongitude = parseInt(sourceLongitude, 10) / width
    let destinationLatitude= destination.split(',')[1];
    let destinationLongitude= destination.split(',')[0];
    let relativeDestinationLatitude = parseInt(destinationLatitude, 10) / height
    let relativeDestinationLongitude = parseInt(destinationLongitude, 10) / width
    //fixme:calculate weight manually
    let weight = Math.pow((relativeSourceLatitude - relativeDestinationLatitude),2) + Math.pow((relativeSourceLongitude - relativeDestinationLongitude),2)
    //fixme:fetch map
    var details = {
      'sourceLatitude': parseFloat(relativeSourceLatitude).toPrecision(2),
      'sourceLongitude':parseFloat(relativeSourceLongitude).toPrecision(2),
      'destinationLatitude': parseFloat(relativeDestinationLatitude).toPrecision(2),
      'destinationLongitude':parseFloat(relativeDestinationLongitude).toPrecision(2),
      'weight': weight,
      'mapId': this.props.mapId
    };

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
    // https://fyp21043s1.cs.hku.hk:8080/v1/admin/add/connection
    // http://localhost:3000/v1/admin/add/connection
    fetch( `https://localhost:8080/v1/admin/add/connection`, requestOptions)
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
        //fixme:fetch mapId
        var details = {
            'Url': values['url'] ,
            'Name': values['name'],
            'Floor': parseInt(values['floor'],10),
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
        // http://localhost:3000/v1/admin/add/map https://localhost:8080/v1/admin/add/map
        // https://fyp21043s1.cs.hku.hk:8080/v1/admin/add/map
        fetch( `https://fyp21043s1.cs.hku.hk:8080/v1/admin/add/map`, requestOptions)
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
  // getNodeId = (latitudeValue,longitudeValue) => {
  //   console.log(latitudeValue);
  //   console.log(longitudeValue);
  //   const data = {latitude:latitudeValue, longitude:longitudeValue};
  //   fetch(`http://localhost:3000/v1/admin/index/nodeId/?latitude=${encodeURIComponent(data.latitude)}&longitude=${encodeURIComponent(data.longitude)}`, {
  //     method: "GET",
  //   })
  //   .then(res => res.json())
  //   .then(data => {
  //     console.log(data);
  //     console.log("Success");
  //   })
  //   .catch((error) => {
  //     console.error("Error fetching data: ", error);
  //   })
  // };



  render() {
    return (
        <div>
            <h3>Add Connection</h3>
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
                {/*<Form.Item*/}
                {/*    label="weight"*/}
                {/*    name="weight"*/}
                {/*    rules={[*/}
                {/*        {*/}
                {/*            required: true,*/}
                {/*            message: 'Please input your weight!',*/}
                {/*        },*/}
                {/*    ]}*/}
                {/*>*/}
                {/*    <Input />*/}
                {/*</Form.Item>*/}
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


            <h3>Add Map</h3>
            <Form {...layout} ref={this.formRef} name="control-ref" onFinish={this.onSelect}>
                <Form.Item
                    label="url"
                    name="url"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your url!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="name"
                    name="name"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your building name!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="floor"
                    name="floor"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your floor number!',
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
        </div>

    );
  }
}
export default SubmitConnectionForm;