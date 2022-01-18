import React from 'react';
import { List } from 'antd';


const ListForm = (props) => {
  const {label} = props;

  return (
    <>
    <List
    itemLayout="vertical"
    dataSource={label}
    renderItem={item => (
      <List.Item>
        {item}
      </List.Item>
    )}
    />
    </>
  )

}
export default ListForm;