import { Divider, Table, Button, Dropdown, Spin } from "antd";
import { DownloadOutlined } from "@ant-design/icons";
import { useState } from "react";
import style from "../css/table.css";

var columns = [];
var data = [];

const items = [
  {
    key: "downloadXMl",
    label: "XML",
  },
  {
    key: "downloadCSV",
    label: "CSV",
  },
];

const TableViewer = (props) => {
  const [size, setSize] = useState("small");
  const [isLoading, setIsLoading] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState(
    "http://127.0.0.1:8081/downloadXMl"
  );

  const json = props.response;

  console.log("table isLoading:", props.isLoading)
  // setIsLoading(props.isLoading)

  const onMenuClick = (e) => {
    setDownloadUrl("http://127.0.0.1:8081/" + e["key"]);
  };

  const handleDownload = () => {
    fetch(downloadUrl, { method: "POST" })
      .then((response) => response.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(new Blob([blob]));
     
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute(
          "download",
          "my-file." + downloadUrl.slice(-3).toLowerCase()
        );
        document.body.appendChild(link);
        link.click();

        link.parentNode.removeChild(link);
        window.URL.revokeObjectURL(url);
      });
  };

  if (json !== undefined) {
    columns = json.data["columns"];
    data = json.data["data"];
  }

  return (
    <>
      <Divider>Converted table</Divider>
      {!props.isLoading ? (
        <Table columns={columns} dataSource={data} size="small" />
      ) : (
        <div style={style} className="background">
          <Spin size="large" tip="Loading" />
        </div>
      )}

      <Dropdown.Button
        onClick={handleDownload}
        type="primary"
        icon={<DownloadOutlined />}
        menu={{
          items,
          onClick: onMenuClick,
        }}
      >
        Download
      </Dropdown.Button>
    </>
  );
};
export default TableViewer;
