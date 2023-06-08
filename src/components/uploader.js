import { PlusOutlined, UploadOutlined } from "@ant-design/icons";
import { Modal, Space, Upload, Button, Popconfirm } from "antd";
import { useState } from "react";
import ButtonComponent from "./button";
import axios from 'axios';

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const Uploader = (props) => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [fileList, setFileList] = useState([]);

  const handleCancel = () => setPreviewOpen(false);
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  };

  const click = async () => {
    props.setIsLoading(true)
    const formData = new FormData();
    formData.append("file", fileList[0]["originFileObj"]);

    const data = {
      test: "test",
    };

    console.log(fileList[0]["originFileObj"]);

    try {
      const response = await axios.post("http://127.0.0.1:8081/generate", formData);
      props.setResponse(response)
      props.setIsLoading(false)
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
    console.log(fileList[0]);
  };

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </div>
  );

  return (
    <Space>
      <>
        <Upload
          action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
          listType="picture-circle"
          fileList={fileList}
          onPreview={handlePreview}
          onChange={handleChange}
        >
          {fileList.length >= 8 ? null : uploadButton}
        </Upload>
        <Modal
          open={previewOpen}
          title={previewTitle}
          footer={null}
          onCancel={handleCancel}
        >
          <img
            alt="example"
            style={{
              width: "100%",
            }}
            src={previewImage}
          />
        </Modal>
      </>
      <Space direction="vertical">
        <Button onClick={click} type="primary">Convert</Button>
      </Space>
    </Space>
  );
};
export default Uploader;
