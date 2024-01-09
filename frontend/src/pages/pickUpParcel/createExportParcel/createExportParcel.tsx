import React, { useEffect, useState } from 'react';
import {
  ArrowLeftOutlined,
  FileAddFilled,
  PlusOutlined,
  DeleteOutlined,
} from '@ant-design/icons';
import '../styles/PUPLStyle.css' ;
import {
  Layout,
  Table,
  Card,
  Button,
  Input,
  Select,
  Form,
  Col,
  Row,
  Space,
  message,
  Modal,
} from 'antd';
import Headers from '../../../layout/header';
import Footers from '../../../layout/footer';
import { Content } from 'antd/es/layout/layout';
import { Link, useParams } from 'react-router-dom';
import { 
  ExportParcelList, 
  InterfacePersonnel, 
  InterfacePickUpStatus, 
  ParcelList, 
  PickUpParcelList } from '../../../interfaces';
import {
  CreateExportParcelList, 
  DeleteExportParcelListByID, 
  GetExportParcelListByPickUpParcelListId, 
  GetParcelList, GetPersonnel, 
  GetPickUpParcelListById, 
  GetPickUpParcelListByPickUpStatusId1, 
  GetPickUpStatus 
} from '../../../services/https';
import { ColumnsType } from 'antd/es/table';

const { Option } = Select;

export default function CreateExportParcel() {
  const [dataParcelList, setDataParcelList] = useState<ParcelList[]>([]);
  const [dataPickUpParcelList, setDataPickUpParcelList] = useState<PickUpParcelList[]>([]);
  const [exportParcelList, setExportParcelList] = useState<ExportParcelList[]>([]);
  const [selectedParcel, setSelectedParcel] = useState<ParcelList | undefined>(undefined);
  const [messageApi, contextHolder] = message.useMessage();

  const [form] = Form.useForm();
  let { id } = useParams();

  const onFinish = async (valueExport: ExportParcelList) => {
    
    try {
      const pickupparcelListId = form.getFieldValue('ID');
      valueExport.PickUpParcelListId = pickupparcelListId;
      valueExport.ExportVolume = form.getFieldValue('ExportVolume');
      valueExport.ParcelListId = form.getFieldValue('ParcelListId');

      let res = await CreateExportParcelList(valueExport);
      console.log('API Response:', res); 
 
      if (res.status) {
        messageApi.open({
          type: "success",
          content: "บันทึกข้อมูลสำเร็จ",
        });

        form.setFieldsValue({
          'ExportVolume': undefined,
          'ParcelListId': undefined,
        });
        // Reset selectedParcel ด้วยการตั้งค่าเป็น undefined
        const updatedParcelList = await GetParcelList();
        setDataParcelList(updatedParcelList);
        setSelectedParcel(undefined);
        getExportParcelListByPickUpParcelListId();
        
      } else {
        messageApi.open({
          type: "error",
          content: res.message,
        });
      }
    } catch (error) {
      console.error('Error during API request:', error);
    }
  };

  const getParcelList = async () => {
    let res = await GetParcelList();
    if (res) {
      setDataParcelList(res);
    }
  };
  const getExportParcelListByPickUpParcelListId = async () => {
    try {
      const res = await GetExportParcelListByPickUpParcelListId(Number(id));
      if (res) {
        setExportParcelList(res);
      }
    } catch (error) {
      console.error('Error fetching ExportParcelList', error);
    }
  };

  const getPickUpParcelListWaitingForApproval = async () => {
    let res = await GetPickUpParcelListByPickUpStatusId1();
    if (res) {
      setDataPickUpParcelList(res);
    }
  };

  const getPickUpParcelListById = async () => {
    try {
      let res = await GetPickUpParcelListById(Number(id));
      if (res && res.BillNumber) {
        setDataPickUpParcelList([res]);
        
        form.setFieldsValue({
          ID: res.ID,
        });
      }
    } catch (error) {
      console.error('Error fetching', error);
    }
  };

  const getdataPickUpStatus = async () => {
    let res = await GetPickUpStatus();
    if (res) {
      setDataPickUpStatus(res);
    }
  };

  const getdataPersonnels = async () => {
    let res = await GetPersonnel();
    if (res) {
      setDataPersonnels(res);
    }
  };


  useEffect(() => {
    getParcelList();
    getPickUpParcelListWaitingForApproval();
    getPickUpParcelListById();
    getdataPickUpStatus();
    getdataPersonnels();
    getExportParcelListByPickUpParcelListId();
  }, []);

  

  const [dataPickUpStatus, setDataPickUpStatus] = useState<InterfacePickUpStatus[]>([]);
  const [dataPersonnels, setDataPersonnels] = useState<InterfacePersonnel[]>([]);
  const getdataPickUpStatusName = (id: number) => {
    const puplStatus: InterfacePickUpStatus | undefined = dataPickUpStatus.find((status: InterfacePickUpStatus) => status.ID === id);
    return puplStatus ? puplStatus.PUPLStatus : 'Unknown Unit';
  };

  const getdataPersonnelsName = (id: number) => {
    const personnels: InterfacePersonnel | undefined = dataPersonnels.find((personnel: InterfacePersonnel) => personnel.ID === id);
    return personnels ? `${personnels.TitleName} ${personnels.FirstName} ${personnels.LastName}` : 'Unknown Personnel';
  };



  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState<String>();
  const [deleteId, setDeleteId] = useState<Number>();

  const showModal = (val: PickUpParcelList) => {
    setModalText(
      `คุณแน่ใจหรือไม่ว่าต้องการลบข้อมูลรายการพัสดุที่ขอเบิกนี้`
    );
    setDeleteId(val.ID);
    setOpen(true);
  };

  const handleOk = async () => {
    setConfirmLoading(true);
    let res = await DeleteExportParcelListByID(deleteId);
    if (res) {
      setOpen(false);
      messageApi.open({
        type: "success",
        content: "ลบข้อมูลสำเร็จ",
      });
      getExportParcelListByPickUpParcelListId();
      getParcelList();
    } else {
      setOpen(false);
      messageApi.open({
        type: "error",
        content: "เกิดข้อผิดพลาด !",
      });
    }
    setConfirmLoading(false);
  };

  const handleCancel = () => {
    setOpen(false);
  };
  
  

  const columnsExport: ColumnsType<ExportParcelList> = [
    {
      title: 'รายการพัสดุ',
      dataIndex: 'ParcelListId',
      key: 'ParcelListId',
      align: 'center',
      render: (parcelListId) => {
        const selectedParcel = dataParcelList.find((parcel) => parcel.ID === parcelListId);
        if (selectedParcel) {
          return selectedParcel.ParcelName;
        } else {
          return 'N/A';
        }
      },
    },
    
    {
      title: 'จำนวนที่ขอเบิก',
      dataIndex: 'ExportVolume',
      key: 'ExportVolume',
      align:'center',
    },

    {
      title: 'จัดการข้อมูล',
      align: 'center',
      
      render: (record) => (

        <Space style={{flexWrap: 'wrap'}}>
          <Button className='iconDeletePUPL' onClick={() => showModal(record)}>
            <DeleteOutlined style={{color: 'white'}}/>
          </Button>
        </Space>

      ),
    },
  ];




  return (
    <>
      <Headers />
      <Content style={{ backgroundColor: 'darkslategrey', minHeight: '100vh' }}>
        <div style={{ padding: 30, textAlign: 'center' }}>
          <Layout style={{ backgroundColor: 'darkslategrey' }}>
            <div className='titleOfPUPL'>
              <Link
                to={'/pages/pickUpParcel'}
                style={{ marginRight: 'auto', color: 'white', float: 'left' }}>

                <ArrowLeftOutlined style={{ fontSize: '20px' }} />
                <span> Back </span>

              </Link>
              <FileAddFilled style={{ fontSize: '30px', marginRight: '10px' }}/>
                เพิ่มรายการพัสดุที่จะขอเบิก
            </div>
          </Layout>

          <Layout className='titleofPUParcellist' style={{ marginTop: '20px' }}>
              เลือกเพื่อเพิ่มรายการพัสดุ
          </Layout>

      

          <Row gutter={[16, 16]}>
            <Col xs={24} sm={24} md={24} lg={24} xl={14}>
              <Card  className='PUPLCard' style={{height:'330px'}}>

                <Layout style={{}} className='titleOfExportParcelList' >
                 
                  <div>

                    <div> ใบเบิกพัสดุ : </div>
                    <div style={{ marginLeft: '10px', color: 'red' }}>
                      {dataPickUpParcelList.length > 0 && dataPickUpParcelList[0].BillNumber}
                    </div>

                    <div  style={{ marginLeft: '10px'}}> ผู้ขอเบิก : </div>
                    <div style={{ marginLeft: '10px', color: 'red' }}>
                    {dataPickUpParcelList.length > 0 && (
                      <span>{getdataPersonnelsName(dataPickUpParcelList[0].PersonnelId)}</span>)}
                    </div>

                    <div  style={{ marginLeft: '10px'}}> สถานะ : </div>
                    <div style={{ marginLeft: '10px', color: 'red' }}>
                    {dataPickUpParcelList.length > 0 && (
                      <span>{getdataPickUpStatusName(dataPickUpParcelList[0].PickUpStatusId)}</span>)}
                    </div>
                    
                  </div>
                 
                </Layout>

                <div style={{marginTop:'40px',justifyContent: 'center', display:'flex' }}> {contextHolder}
                  <Form
                    onFinish={onFinish} autoComplete="off" form={form}>

                    <Space style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                        <Form.Item
                          name='ParcelListId'
                          label='รายการพัสดุ'
                          rules={[{ required: true, message: 'กรุณาเลือกรายการพัสดุ' }]}
                          style={{ textAlign: 'left' }}>

                          <Select
                            style={{ width: 200 }}
                            placeholder='เลือกรายการพัสดุ'
                            onChange={(value:number) => {
                              const selectedParcelData = dataParcelList.find((parcel) => parcel.ID === value);
                                setSelectedParcel(selectedParcelData);
                                form.setFieldsValue({
                                  [`$Volume`]: selectedParcelData ? selectedParcelData.Volume : undefined,
                                }); }}>
                            {dataParcelList.map((parcel) => (
                              <Option key={parcel.ID} value={parcel.ID}>
                                {parcel.ParcelName}
                              </Option>
                            ))}
                          </Select>
                        </Form.Item>
                             
                        {selectedParcel && (
                          <div className='showVolume' style={{height:'35px'}}>
                            <p> จำนวนปัจจุบัน: {selectedParcel.Volume}</p>
                          </div>
                        )}
                              
                        <Form.Item                              
                            name='ExportVolume'
                            label='จำนวนที่ขอเบิก'
                            rules={[{
                              required: true,
                              validator: (_, value, callback) => {
                            if (value === undefined || value === null || value === '') {
                              return Promise.reject('กรุณากรอกข้อมูล');
                            }
                            if (value < 1) {
                              return Promise.reject('มากกว่าหรือเท่ากับ 1 เท่านั้น');
                            }
                                
                            const maxVolume = selectedParcel ? selectedParcel.Volume : 0;
                                
                            if (value > maxVolume) {
                              return Promise.reject(`มากกว่าจำนวนปัจจุบัน (${maxVolume})`);
                            }
                              return Promise.resolve();
                            },
                          }]} style={{ textAlign: 'left' }}  >

                          <Input 
                            type='number' style={{ width: 170 }} 
                            onChange={(e) => form.setFieldsValue({ 'ExportVolume': parseInt(e.target.value, 10) })} />
                      </Form.Item>

                      
                      <Form.Item style={{width:'100px', display:'none'}} name='ID' label="ID" >
                        <Input  disabled style={{textAlign:'center'}}/>
                      </Form.Item>
                      
                    </Space>

                    <Form.Item>
                      <div style={{ justifyContent: 'center', display:'flex'}}>
                        <Button  htmlType="submit" className='AddParcelListforExport' icon={<PlusOutlined />}>
                          เพิ่มรายการพัสดุที่จะขอเบิก
                        </Button>
                      </div>
                    </Form.Item>
                  </Form>
                </div>

                
              </Card>
            </Col>

            <Col xs={24} sm={24} md={24} lg={24} xl={10}>
              <Card className='PUPLCard' style={{height:'330px'}}>
                <Table
                  columns={columnsExport}
                  dataSource={exportParcelList}
                  pagination={{ pageSize: 4 }}
                  size='small'
                />
              </Card>
              
            </Col>           
          </Row>

          <Modal
                  open={open}
                  onOk={handleOk}
                  confirmLoading={confirmLoading}
                  onCancel={handleCancel}

                  title={<span style={{ color: '#FF4B4B', fontSize:20 }}> คำเตือน !! </span>}
                  style={{fontSize:'16px', minWidth: 400}} 
                  okText= {<span style={{ color: 'white'}}> ลบข้อมูล </span>}
                  okButtonProps={{ style: { background: '#0BB6DC', borderColor: '#0BB6DC' } }}
                  cancelText= {<span style={{ color: 'white'}}> ยกเลิก </span>}
                  cancelButtonProps={{ style: { background: '#FF4B4B', borderColor: '#FF4B4B' } }}>
                    <p>{modalText}</p>
          </Modal>

        </div>
      </Content>
      <Footers />
    </>
  );
}
