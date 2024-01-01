import React, { useEffect, useState, useRef } from 'react';
import {
  ArrowLeftOutlined,
  FileSearchOutlined,
  PlusOutlined,
  MinusCircleOutlined,
} from '@ant-design/icons';
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
} from 'antd';
import Headers from '../../../layout/header';
import Footers from '../../../layout/footer';
import { Content } from 'antd/es/layout/layout';
import { Link, useParams } from 'react-router-dom';
import { ExportParcelList, InterfacePersonnel, InterfacePickUpStatus, ParcelList, PickUpParcelList } from '../../../interfaces';
import { CreateExportParcelList, GetParcelList, GetPersonnel, GetPickUpParcelListById, GetPickUpParcelListByPickUpStatusId1, GetPickUpStatus } from '../../../services/https';

const { Option } = Select;

export default function CreateExportParcel() {
  const [dataParcelList, setDataParcelList] = useState<ParcelList[]>([]);
  const [dataPickUpParcelList, setDataPickUpParcelList] = useState<PickUpParcelList[]>([]);
  const [exportParcelList, setExportParcelList] = useState<ExportParcelList[]>([]);

  const [form] = Form.useForm();
  let { id } = useParams();

  const onFinish = (values: any) => {
    console.log('Received values of form:', values);
  };



  const getParcelList = async () => {
    let res = await GetParcelList();
    if (res) {
      setDataParcelList(res);
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

  const handleAddExportParcel = () => {
    form.validateFields().then((values) => {
      const selectedParcel = dataParcelList.find(
        (parcel) => parcel.ID === values.parcelId
      );
  
      if (selectedParcel && id) {
        const newExportParcelItem: ExportParcelList = {
          ParcelListId: selectedParcel.ID!,
          ParcelList: selectedParcel, 
          ExportVolume: values.exportVolume,
          PickUpParcelListId: parseInt(id),
          ID:0,
        };
  
        setExportParcelList((prevList) => [...prevList, newExportParcelItem]);
  
        form.resetFields();
      }
    });
  };
  
  
  

  const columns = [
    {
      title: 'รายการพัสดุ',
      dataIndex: 'ParcelListId',
      
    },
    {
      title: 'จำนวนที่ขอเบิก',
      dataIndex: 'ExportVolume',
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
                to={'/pages/pinkUpParcelList'}
                style={{ marginRight: 'auto', color: 'white', float: 'left' }}>

                <ArrowLeftOutlined style={{ fontSize: '20px' }} />
                <span> Back </span>

              </Link>
              <FileSearchOutlined style={{ fontSize: '30px', marginRight: '10px' }}/>
                เพิ่มรายการพัสดุที่จะขอเบิก
            </div>
          </Layout>

          <Layout className='titleofPUParcellist' style={{ marginTop: '20px' }}>
              เลือกเพื่อเพิ่มรายการพัสดุ
          </Layout>

      

          <Row gutter={8}>
            <Col span={12}>
              <Card style={{}} className='PUPLCard'>

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

                <div style={{marginTop:'20px',justifyContent: 'center', display:'flex' }}>
                  <Form
                    name="dynamic_form_nest_item" onFinish={onFinish}
                    style={{ }} autoComplete="off" form={form}>
                      
                    <Form.List name="users">
                      {(fields, { add, remove }) => (
                        <>
                          {fields.map(({ key, name, ...restField }) => (
                            <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                              <Form.Item
                                {...restField}
                                name={[name, 'parcelId']}
                                label='รายการพัสดุ'
                                rules={[{ required: true, message: 'กรุณาเลือกรายการพัสดุ' }]} 
                                style={{ textAlign: 'left'}} >

                                <Select style={{ width: 200}} placeholder='เลือกรายการพัสดุ'>
                                  {dataParcelList.map((parcel) => (
                                    <Option key={parcel.ID} value={parcel.ID}>
                                      {parcel.ParcelName}
                                    </Option>
                                  ))}
                                </Select>
                                
                              </Form.Item>

                              <Form.Item
                                {...restField}
                                name={[name, 'exportVolume']}
                                label='จำนวนที่ขอเบิก' 
                                rules={[{
                                  required: true,
                                  validator: (_, value) => {
                                    if (value === undefined || value === null || value === '') {
                                      return Promise.reject('กรุณากรอกข้อมูล');
                                    }
                                    if (value < 1) {
                                      return Promise.reject('มากกว่าหรือเท่ากับ 1 เท่านั้น');
                                    }
                                    return Promise.resolve();
                                  },
                                }]} style={{ textAlign: 'left'}} >

                                <Input type='number' style={{ width: 170 }} />
                              </Form.Item>
                              <MinusCircleOutlined onClick={() => remove(name)} />
                            </Space>
                          ))}
                          <Form.Item>
                            <Button type='dashed' onClick={() => add()} block icon={<PlusOutlined />}>
                              เพิ่มรายการกรอกข้อมูล
                            </Button>
                          </Form.Item>
                        </>
                      )}
                    </Form.List>

                    <Form.Item>
                      <div style={{ justifyContent: 'center', display:'flex'}}>
                        <Button  htmlType="submit" className='AddParcelListforExport'onClick={handleAddExportParcel} icon={<PlusOutlined />}>
                          เพิ่มรายการพัสดุที่จะขอเบิก
                        </Button>
                      </div>
                    </Form.Item>
                  </Form>

                  {/* <Form form={form} layout='inline'>
                    <Form.Item name='parcelId' label='รายการพัสดุ' rules={[{ required: true, message: 'กรุณาเลือกรายการพัสดุ' }]}>
                      <Select style={{ width: 200 }} placeholder='เลือกรายการพัสดุ'>
                        {dataParcelList.map((parcel) => (
                          <Option key={parcel.ID} value={parcel.ID}>
                            {parcel.ParcelName}
                          </Option>
                        ))}
                      </Select>
                    </Form.Item>

                    <Form.Item name='exportVolume' label='จำนวนที่ขอเบิก' rules={[{ required: true, message: 'กรุณากรอกจำนวนที่ขอเบิก' },]}>
                      <Input type='number' style={{ width: 100 }} />
                    </Form.Item>                 
                  </Form> */}
                </div>

                
              </Card>
            </Col>

            <Col span={12}>
              <Card className='PUPLCard'>
                <Table
                  columns={columns}
                  dataSource={exportParcelList}
                  pagination={{ pageSize: 5 }}
                  size='small'
                />
              </Card>
            </Col>
          </Row>

        </div>
      </Content>
      <Footers />
    </>
  );
}
