import React from 'react';
import 'antd/dist/antd.min.css';
import './css/SubmitForm.css';
import QRCode from 'qrcode.react';
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

class CreateQRCode extends React.Component {
  formRef = React.createRef();
  onFinish = (values) => {
    // let coordinate = values['labelID'];
    // coordinate = coordinate.substring(1,coordinate.length-1);
    // let latitude= coordinate.split(',')[0];
    // let longitude= coordinate.split(',')[1];
    // var details = {
    //   'latitude': latitude,
    //   'longitude': longitude,
    // };
    // let formBody = [];
    // for (let property in details) {
    //   let encodedKey = encodeURIComponent(property);
    //   let encodedValue = encodeURIComponent(details[property]);
    //   formBody.push(encodedKey + "=" + encodedValue);
    // }
    // formBody = formBody.join("&");
    // const requestOptions = {
    //   method: 'POST',
    //   headers: {'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'},
    //   body: formBody
    // }
    // 数据库
    // fetch( `http://localhost:3000/v1/admin/add/node`, requestOptions)
    // .then(res => res.json())
    // .then(data => {
    //   console.log("Success");
    //   alert("Successfully Submit!")
    // })
    // .catch((error) => {
    //   console.error("Error fetching data: ", error);
    // })
    var Container = document.getElementById('Container');
    var QR = document.getElementById('QR');
    console.log(QR.size)
    QR.size=300
    QR.value="https://fyp21043s1.cs.hku.hk:8443/home/1"
    console.log(QR.size)
    Container.append(QR)

    // '<QRCode
    //     id="QR"
    //     size={300} // 二维码的大小
    //     fgColor="#000000" // 二维码的颜色
    //     imageSettings={{ // 中间有图片logo
    //       src: "https://stemkoski.github.io/AR-Examples/markers/hiro.png",
    //       height: 60,
    //       width: 60,
    //       excavate: true
    //     }}
    // />'
    // var popContent =[
    //   '<li class="monitory-point-li" indexcode="00000000001310013631">',
    //   '<span class="checkbox-unchecked"></span>',
    //   '<span class="monitory-text" title="'+name+'">'+formedName+'</span>',
    //   '</li>'
    // ].join(' ');
    // $('.document').append(popContent);

  };
  onReset = () => {
    this.formRef.current.resetFields();
  };


  render() {
    return (
        <div>
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
          <div id="Container">

          </div>
        </div>
    );
  }
}
export default CreateQRCode;