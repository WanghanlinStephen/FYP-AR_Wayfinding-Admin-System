import React from 'react';
import { List } from 'antd';

//fixme:
const ListForm = (props) => {
  const {connection} = props;
  console.log(connection);
  return (
    <>
    <List
    itemLayout="vertical"
    dataSource={connection}
    renderItem={item => (
      <List.Item>
        {item['NameEnglish']}
      </List.Item>
    )}
    />
    </>
  )

}
export default ListForm;