import { useState } from 'react';
import { Button, Space } from 'antd';
import axios from 'axios';

var myProps;

const  handleClick = async() => {

  const formData = new FormData();
  formData.append('file', myProps.myFileList[0]["originFileObj"]);
  console.log(myProps.myFileList[0]["originFileObj"])

  try {
    const response = await axios.post('http://127.0.0.1:8081/test', formData);
    console.log(response.data);
    
  } catch (error) {
    console.error(error);
  }
}

const ButtonComponent = (props) => {
     myProps = props;
     return (
      
      <Space direction="vertical">
        <Button onClick={handleClick} type="primary">Convert</Button>
      </Space>
    );
}
export default ButtonComponent;