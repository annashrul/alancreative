import {
  Button,
  Col,
  Row,
  Input,
  Upload,
  Modal,
  Form,
  Spin,
} from "antd";
import {
  CloudUploadOutlined,
} from "@ant-design/icons";
import React, { useState} from "react";
import {convertBase64, currency, getPropsUpload, rmComma} from "../helper";
import { useDispatch, useSelector } from "react-redux";
// import { storeProduct } from "../redux/actions/product.action";
import {AUTH} from "../redux/type";

const { Dragger } = Upload;

const FormComponent = ({ isModal, ok, cancel, data, where }) => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  const dispatch = useDispatch();
  const loadingPost = useSelector((state) => state.productReducer.loadingPost);
  const handleSubmit = async (e) => {
    Object.assign(e, { price: rmComma(e.price) });

    if (fileList[0] !== undefined) {
      const img = await convertBase64(fileList[0]);
      // Object.assign(e, { image: img });
    }
    fetch(AUTH.URL+'product', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
        .then((response) => response.json())
        .then((data) => {
          console.log("data",data);
          // Handle data
        })
        .catch((err) => {
          console.log("err",err);
        });

    // dispatch(
    //     storeProduct(e, where, () => {
    //       ok();
    //     })
    // );
  };
  return (
    <Modal
      centered
      onCancel={()=>cancel()}
      title={<b style={{color:"#00ACEE"}}>Tambahkan Menu</b>}
      visible={isModal}
      // closable={false}
      destroyOnClose={true}
      maskClosable={false}
      footer={null}
    >
      <Spin spinning={loadingPost}>
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Row gutter={6}>
            <Col xs={24} sm={24} md={24}>
              <Form.Item
                  hasFeedback
                  name="name"
                  label="Nama Menu"
                  rules={[{ required: true,message:"Nama menu tidak boleh kosong" }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={24} style={{marginBottom:fileList.length>0?"30px":"10px"}}>
              <Dragger
                  {...getPropsUpload(fileList, (file) => setFileList(file))}
              >
                <p className="ant-upload-drag-icon">
                  <CloudUploadOutlined style={{color:"#B8B8B8"}}/>
                </p>
                <p className="ant-upload-hint"> Drag and drop a file here or click</p>
              </Dragger>
            </Col>

            <Col xs={24} sm={24} md={24} className="mt-10" style={{marginTop:"10px"}}>
              <Form.Item
                  hasFeedback
                  name="price"
                  label="Harga"
                  rules={[{ required: true,message:"Harga tidak boleh kosong" }]}
              >
                  <Input prefix={<span>Rp</span>} onChange={(e)=>{
                    const val=e.target.value;
                    form.setFieldsValue({ price: isNaN(rmComma(val))?0:currency(rmComma(val)) });
                  }}/>


              </Form.Item>
            </Col>
          </Row>

          <Row gutter={12} justify="end">
            <Button
                style={{backgroundColor:"#7CAF83",border:"1px solid #7CAF83"}}
                type={"primary"}
                size={"medium"}
                htmlType="submit"
                loading={loadingPost}
            >
              Simpan
            </Button>
          </Row>
        </Form>
      </Spin>
    </Modal>
  );
};

export default FormComponent;
