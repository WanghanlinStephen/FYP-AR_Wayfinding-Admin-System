import React from 'react';
import { List } from 'antd';


const ListForm = (props) => {
  const {connection} = props;

  return (
    <>
    <List
    itemLayout="vertical"
    dataSource={connection}
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