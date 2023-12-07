import React, { useState } from 'react';
import {
  DeleteOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import { Form, Input, Modal, Table, message } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import {Breadcrumb, Button, Card, Space} from 'antd';
import "./typeAndUnitStyle.css";
import Headers from '../../layout/header';
import Footers from '../../layout/footer';
import layout, { Content } from 'antd/es/layout/layout';


interface DataParcelType {
  key: React.Key;
  No: number;
  NameParcelType: string;
}

interface DataParcelUnit {
  key: React.Key;
  No: number;
  NameParcelUnit: string;
}



const dataParcelType: DataParcelType[] = [
  {
    key: '1',
    No: 1,
    NameParcelType: 'วัสดุสำนักงาน',
  },
  {
    key: '2',
    No: 2,
    NameParcelType: 'วัสดุก่อสร้าง',
  },
  {
    key: '3',
    No: 3,
    NameParcelType: 'วัสดุไฟฟ้า',
  },
  {
    key: '4',
    No: 4,
    NameParcelType: 'วัสดุทั่วไป',
  },
 
];

const dataParcelUnit: DataParcelUnit[] = [
  {
    key: '1',
    No: 1,
    NameParcelUnit: 'รีม',
  },
  {
    key: '2',
    No: 2,
    NameParcelUnit: 'ชิ้น',
  },
  {
    key: '3',
    No: 3,
    NameParcelUnit: 'ตลับ',
  },
  {
    key: '4',
    No: 4,
    NameParcelUnit: 'กล่อง',
  },
 
];

export default function ParcelTypeAndUnti() {

  const [isModalAddTypePLOpen, setIsModalAddTypePLOpen] = useState(false);
  const [isModalEditTypePLOpen, setIsModalEditTypePLOpen] = useState(false);
  const [isModalAddUnitPLOpen, setIsModalAddUnitPLOpen] = useState(false);
  const [isModalEditUnitPLOpen, setIsModalEditUnitPLOpen] = useState(false);
  const [AddUnitform] = Form.useForm();
  const [EditUnitform] = Form.useForm();
  const [AddTypeform] = Form.useForm();
  const [EditTypeform] = Form.useForm();

  const showModalAddPL = () => {
    setIsModalAddTypePLOpen(true);
  };
  const handleOkAddTypePL = () => {
    AddTypeform
      .validateFields()
      .then((values) => {
        AddTypeform.resetFields();
        message.success('บันทึกข้อมูลสำเร็จ');
        setIsModalAddTypePLOpen(false);
      })
      .catch((errorInfo) => {
        console.log('Validation failed:', errorInfo);
      });
  };
  const handleCancelAddTypePL = () => {
    AddTypeform.resetFields();
    setIsModalAddTypePLOpen(false);
  };


  const showModalEditTypePL = () => {
    setIsModalEditTypePLOpen(true);
  };
  const handleOkEditTypePL = () => {
    EditTypeform
      .validateFields()
      .then((values) => {
        EditTypeform.resetFields();
        message.success('บันทึกข้อมูลสำเร็จ');
        setIsModalEditTypePLOpen(false);
      })
      .catch((errorInfo) => {
        console.log('Validation failed:', errorInfo);
      });
  };
  const handleCancelEditTypePL = () => {
    EditTypeform.resetFields();
    setIsModalEditTypePLOpen(false);
  };


  const showModalAddUnitPL = () => {
    setIsModalAddUnitPLOpen(true);
  };
  const handleOkAddUnitPL = () => {
    AddUnitform
      .validateFields()
      .then((values) => {
        AddUnitform.resetFields();
        message.success('บันทึกข้อมูลสำเร็จ');
        setIsModalAddUnitPLOpen(false);
      })
      .catch((errorInfo) => {
        console.log('Validation failed:', errorInfo);
      });
  };
  const handleCancelAddUnitPL = () => {
    AddUnitform.resetFields();
    setIsModalAddUnitPLOpen(false);
  };


  const showModalEditUnitPL = () => {
    setIsModalEditUnitPLOpen(true);
  };
  const handleOkEditUnitPL = () => {
    EditUnitform
      .validateFields()
      .then((values) => {
        EditUnitform.resetFields();
        message.success('บันทึกข้อมูลสำเร็จ');
        setIsModalEditUnitPLOpen(false);
      })
      .catch((errorInfo) => {
        console.log('Validation failed:', errorInfo);
      });
  };
  const handleCancelEditUnitPL = () => {
    EditUnitform.resetFields();
    setIsModalEditUnitPLOpen(false);
  };

  const { confirm } = Modal;
  const showDeleteParcelTypeConfirm = () => {
    confirm({
      title: (
        <div style={{ color: 'red', fontSize: '18px' }}>
          คำเตือน!! คุณแน่ใจหรือไม่ว่าต้องการลบข้อมูล
        </div>
      ),
      content: (
        <div>
          <p> ข้อมูลของรายการประเภทพัสดุจะถูกลบออก</p>
          <p></p>
  
        </div>
      ),
      okText: 'ยืนยันการลบ',
      okType: 'danger',
      cancelText: 'ยกเลิก',
      style:{fontSize:'16px', minWidth: 500},
      onOk() {
        console.log('ยืนยันการลบ');
        message.success('ลบข้อมูลสำเร็จ');
      },
      onCancel() {
        console.log('ยกเลิก');
      },
    });
  };


  const showDeleteParcelUnitConfirm = () => {
    confirm({
      title: (
        <div style={{ color: 'red', fontSize: '18px' }}>
          คำเตือน!! คุณแน่ใจหรือไม่ว่าต้องการลบข้อมูล
        </div>
      ),
      content: (
        <div>
          <p> ข้อมูลของรายการหน่วยนับพัสดุจะถูกลบออก</p>
          <p></p>
  
        </div>
      ),
      okText: 'ยืนยันการลบ',
      okType: 'danger',
      cancelText: 'ยกเลิก',
      style:{fontSize:'16px', minWidth: 500},
      onOk() {
        console.log('ยืนยันการลบ');
        message.success('ลบข้อมูลสำเร็จ');
      },
      onCancel() {
        console.log('ยกเลิก');
      },
    });
  };

  const columnsParcelType: ColumnsType<DataParcelType> = [
  {
    title: 'ลำดับ',
    dataIndex: 'No',
    width: '10%',
    align: 'center',
  },
  {
    title: 'ประเภทพัสดุ',
    dataIndex: 'NameParcelType',
    width: '40%',
    align: 'center',
  },
  {
    title: 'จัดการข้อมูลประเภทพัสดุ',
    width: '40%',
    align: 'center',
    render: (record) => (

      <Space >

        <Button onClick={showModalEditTypePL} className='editButton'>
            แก้ไข
        </Button>

        <Button onClick={showDeleteParcelTypeConfirm} className='iconDelete'>
          <DeleteOutlined style={{color: 'white'}}/>
        </Button>
      </Space>

    ),
  },
];

const columnsParcelUnit: ColumnsType<DataParcelUnit> = [
  {
    title: 'ลำดับ',
    dataIndex: 'No',
    width: '10%',
    align: 'center',
  },
  {
    title: 'หน่วยนับพัสดุ',
    dataIndex: 'NameParcelUnit',
    width: '40%',
    align: 'center',
  },
  {
    title: 'จัดการข้อมูลหน่วยนับพัสดุ',
    width: '40%',
    align: 'center',
    render: (record) => (

      <Space >

        <Button onClick={showModalEditUnitPL} className='editButton'>
            แก้ไข
        </Button>

        <Button onClick={showDeleteParcelUnitConfirm} className='iconDelete'>
          <DeleteOutlined style={{color: 'white'}}/>
        </Button>
      </Space>

    ),
  },
];


  
  return (
    <> 
    <Headers />
      <Content style={{ margin: "0 16px", backgroundColor:'darkslategray'}}>
        <Breadcrumb style={{ margin: "10px 0" }} />
          <div style={{padding:30,minHeight: "100%",background: '', textAlign:'center'}}>

            <Space direction="horizontal" size="middle" style={{ display: 'flex', justifyContent:'center'}}>

              <Card title="เพิ่มรายการประเภทพัสดุและหน่วยนับพัสดุ">

                <Button onClick={showModalAddPL} className='customAddTypeButton'>
                  <PlusOutlined /> เพิ่มประเภทพัสดุ
                </Button>

                <Button onClick={showModalAddUnitPL} className='customAddUnitButton'> 
                  <PlusOutlined /> เพิ่มหน่วยนับพัสดุ
                </Button>

                <div style={{marginTop:'40px'}}>
                  <div className="container"> 
                        จำนวนรายการประเภทพัสดุ
                        <div className="count"> 100 </div>
                        <div style={{ display: 'inline-block', fontSize:'14px'}}> รายการ </div>
                  </div>

                  <div className="container"> 
                        จำนวนรายการหน่วยนับพัสดุ 
                        <div className="count"> 100 </div>
                        <div style={{ display: 'inline-block', fontSize:'14px'}} > รายการ </div>
                  </div>
                </div>
              </Card>

              <Card title="ตารางแสดงรายการประเภทของพัสดุ" style={{width:'500px'}}>
                <Table 
                      columns={columnsParcelType} 
                      dataSource={dataParcelType} 
                      size="middle"
                      pagination={{ pageSize: 4 }}/>
              </Card>

              <Card title="ตารางแสดงรายการหน่วยนับพัสดุ" style={{width:'500px'}}>

                <Table 
                      columns={columnsParcelUnit} 
                      dataSource={dataParcelUnit} 
                      size="middle" 
                      pagination={{ pageSize: 4 }}/>

              </Card>
            </Space>


            <Modal open={isModalAddTypePLOpen} onOk={handleOkAddTypePL} onCancel={handleCancelAddTypePL} 
                title={<span style={{ color: '#FF4B4B', fontSize:20 }}> กรอกข้อมูลประเภทพัสดุ </span>}
                style={{fontSize:'16px',textAlign:'center', minWidth: 500}} 
                okText= {<span style={{ color: 'white'}}> บันทึกข้อมูล </span>}
                okButtonProps={{ style: { background: '#0BB6DC', borderColor: '#0BB6DC' } }}
                cancelText= {<span style={{ color: 'white'}}> ยกเลิก </span>}
                cancelButtonProps={{ style: { background: '#FF4B4B', borderColor: '#FF4B4B' } }}>
                  
                  <Form
                      {...layout}
                      name="AddTypeform-form"
                      form={AddTypeform}
                      style={{ maxWidth: 1000, textAlign: 'left', marginTop: 30 }}>

                      <Form.Item name={['ParcelType', 'ParcelType']} label="ประเภทพัสดุ" rules={[{ required: true, message: "กรุณากรอกข้อมูล" }]}>
                        <Input placeholder="เช่น วัสดุสำนักงาน"/>
                      </Form.Item>
                    </Form>
            </Modal>

            <Modal open={isModalEditTypePLOpen} onOk={handleOkEditTypePL} onCancel={handleCancelEditTypePL} 
                title={<span style={{ color: '#FF4B4B', fontSize:20 }}> แก้ไขข้อมูลประเภทพัสดุ </span>}
                style={{fontSize:'16px',textAlign:'center', minWidth: 500}} 
                okText= {<span style={{ color: 'white'}}> บันทึกข้อมูล </span>}
                okButtonProps={{ style: { background: '#0BB6DC', borderColor: '#0BB6DC' } }}
                cancelText= {<span style={{ color: 'white'}}> ยกเลิก </span>}
                cancelButtonProps={{ style: { background: '#FF4B4B', borderColor: '#FF4B4B' } }}>
                  
                  <Form
                      {...layout}
                      name="EditTypeform-form"
                      form={EditTypeform}
                      style={{ maxWidth: 1000, textAlign: 'left', marginTop: 30 }}>

                      <Form.Item name={['ParcelType', 'ParcelType']} label="ประเภทพัสดุ" rules={[{ required: true, message: "กรุณากรอกข้อมูล" }]}>
                        <Input placeholder="เช่น วัสดุสำนักงาน"/>
                      </Form.Item>
                    </Form>
            </Modal>


            <Modal open={isModalAddUnitPLOpen} onOk={handleOkAddUnitPL} onCancel={handleCancelAddUnitPL} 
                title={<span style={{ color: '#FF4B4B', fontSize:20 }}> กรอกข้อมูลหน่วยนับพัสดุ </span>}
                style={{fontSize:'16px',textAlign:'center', minWidth: 500}} 
                okText= {<span style={{ color: 'white'}}> บันทึกข้อมูล </span>}
                okButtonProps={{ style: { background: '#0BB6DC', borderColor: '#0BB6DC' } }}
                cancelText= {<span style={{ color: 'white'}}> ยกเลิก </span>}
                cancelButtonProps={{ style: { background: '#FF4B4B', borderColor: '#FF4B4B' } }}>
                  
                  <Form
                      {...layout}
                      name="AddUnitform-form"
                      form={AddUnitform}
                      style={{ maxWidth: 1000, textAlign: 'left', marginTop: 30 }}>

                      <Form.Item name={['ParcelUnit', 'ParcelUnit']} label="หน่วยนับพัสดุ" rules={[{ required: true, message: "กรุณากรอกข้อมูล" }]}>
                        <Input placeholder="เช่น อัน, รีม"/>
                      </Form.Item>
                    </Form>
            </Modal>

{/* 0000000 */}
            <Modal open={isModalEditUnitPLOpen} onOk={handleOkEditUnitPL} onCancel={handleCancelEditUnitPL} 
                title={<span style={{ color: '#FF4B4B', fontSize:20 }}> แก้ไขข้อมูลหน่วยนับพัสดุ </span>}
                style={{fontSize:'16px',textAlign:'center', minWidth: 500}} 
                okText= {<span style={{ color: 'white'}}> บันทึกข้อมูล </span>}
                okButtonProps={{ style: { background: '#0BB6DC', borderColor: '#0BB6DC' } }}
                cancelText= {<span style={{ color: 'white'}}> ยกเลิก </span>}
                cancelButtonProps={{ style: { background: '#FF4B4B', borderColor: '#FF4B4B' } }}>
                  
                  <Form
                      {...layout}
                      name="EditUnitform-form"
                      form={EditUnitform}
                      style={{ maxWidth: 1000, textAlign: 'left', marginTop: 30 }}>

                      <Form.Item name={['ParcelUnit', 'ParcelUnit']} label="หน่วยนับพัสดุ" rules={[{ required: true, message: "กรุณากรอกข้อมูล" }]}>
                        <Input placeholder="เช่น อัน, รีม"/>
                      </Form.Item>
                    </Form>
            </Modal>

            

          </div>
      </Content>
    <Footers/>
    </>
  );
};


