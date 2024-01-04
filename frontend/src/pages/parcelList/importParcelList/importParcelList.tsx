import React, { useEffect, useState } from 'react';
import {
  ImportOutlined,
  ArrowLeftOutlined,
} from '@ant-design/icons';

import { Card, DatePicker, Form, Input, InputNumber, Layout, Select, message, Button} from 'antd';
import Headers from '../../../layout/header';
import Footers from '../../../layout/footer';
import { Content } from 'antd/es/layout/layout';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { CreateImportParcelList, GetParcelListById, GetParcelUnit, GetPersonnel } from '../../../services/https';
import { ImportParcelList, InterfaceParcelUnit, InterfacePersonnel, ParcelList } from '../../../interfaces';
import locale from 'antd/lib/date-picker/locale/th_TH'; // Import Thai locale

const { Option } = Select;

export default function ImportParcelLists() {
  
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  
  const [Importform] = Form.useForm();
  const [dataPersonnels, setDataPersonnel] = useState<InterfacePersonnel[]>([]);
  const [dataParcelList, setDataParcelList] = useState<ParcelList[]>([]);
  const [dataParcelUnit, setDataParcelUnit] = useState<InterfaceParcelUnit[]>([]);

  let { id } = useParams();
  

  
  const onFinish = async (valueImport: ImportParcelList) => {
    try {
      const parcelListId = Importform.getFieldValue('ID');
      valueImport.ParcelListId = parcelListId;
      
      let res = await CreateImportParcelList(valueImport);
      console.log('API Response:', res); 
  
      if (res.status) {
        messageApi.open({
          type: "success",
          content: "บันทึกข้อมูลสำเร็จ",
        });
        setTimeout(function () {
          navigate("/pages/myParcelList");
        }, 1000);
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

  
  const getPersonnel = async () => {
    let res = await GetPersonnel();
    if (res) {
      setDataPersonnel(res);
    }
  };

  const getParcelUnit = async () => {
    let res = await GetParcelUnit();
    if (res) {
      setDataParcelUnit(res);
    }
  };
  const getParcelUnitName = (id: number) => {
    const parcel_units: InterfaceParcelUnit | undefined = dataParcelUnit.find((unit: InterfaceParcelUnit) => unit.ID === id);
    return parcel_units ? parcel_units.ParcelUnit : 'Unknown Unit';
  };
  

  const getParcelListById = async () => {
    try {
      let res = await GetParcelListById(Number(id));
      if (res && res.ParcelNumber) {
        setDataParcelList([res]);
        
        Importform.setFieldsValue({
          ID: res.ID,
          ParcelNumber: res.ParcelNumber,
          ParcelName: res.ParcelName,
          PricePerPiece: res.PricePerPiece,
          Volume: res.Volume,
          ParcelDetail: res.ParcelDetail,
          ParcelTypeId: res.ParcelTypeId,
          ParcelUnitId: res.ParcelUnitId,
          RoomId: res.RoomId,
        });
      }
    } catch (error) {
      console.error('Error fetching parcel list:', error);
    }
  };

  useEffect(() => {
    getPersonnel();
    getParcelListById();
    getParcelUnit();
  }, []);

  return (
    <> 
    <Headers />
        <Content style={{backgroundColor:'darkslategrey' , minHeight:'100vh' }}>
        <div style={{padding:30,textAlign:'center'}}>

            <Layout style={{ backgroundColor: 'darkslategrey'}}>
                <div className='titleOfCreateParcel'>

                <Link to={'/pages/myParcelList'} style={{marginRight: 'auto', color: 'white', float:'left'}}>
                    <ArrowLeftOutlined style={{fontSize:'20px'}}/>
                    <span > Back </span>
                </Link>

                <ImportOutlined style={{ fontSize: '30px', marginRight: '10px' }}/> การนำเข้าพัสดุ
                </div>

            </Layout>

            <Card className='CreatePLCard' style={{ height: 'auto' , minHeight:'400px'}}>

              <Layout className='titleOfImportParcelList' 
                      style={{ maxWidth: '1000px', margin: 'auto'}}>
                <div>
                  <div>
                    <div> รายการพัสดุ : </div>
                    <div style={{ marginLeft: '10px', color: 'red' }}>
                      {dataParcelList.length > 0 && dataParcelList[0].ParcelName}
                    </div>
                  </div>
                </div>

                <div style={{ marginTop: '10px'}}>
                  <div>
                    <div> รหัสพัสดุ : </div>
                    <div style={{ marginLeft: '10px', color: 'red' }}>
                      {dataParcelList.length > 0 && dataParcelList[0].ParcelNumber}
                    </div>
                  </div>
                  <div>
                    <div style={{ marginLeft: '10px' }}> จำนวนปัจจุบัน : </div>
                    <div style={{ marginLeft: '10px', color: 'red' }}>
                      {dataParcelList.length > 0 && dataParcelList[0].Volume}
                    </div>
                    <div style={{ marginLeft: '10px' }}>
                      {dataParcelList.length > 0 && (
                        <span>{getParcelUnitName(dataParcelList[0].ParcelUnitId)}</span>)}
                    </div>
                  </div>
                </div>
              </Layout>

              {contextHolder}
                <Form layout="inline" name="parcel-form" form={Importform} className='CreatePLfrom' onFinish={onFinish} autoComplete="off">
                    <div style={{marginRight:'30px', width:'400px'}}>
                    
                        <div style={{marginTop:'30px'}}>  
                          <Form.Item style={{ textAlign: 'left'}} name='ImportNumber' label="รหัสการนำเข้า" rules={[{ required: true, message: "กรุณากรอกข้อมูล" }]}>
                            <Input placeholder="เช่น IMP0001"/>
                          </Form.Item>
                        </div>

                        <div style={{marginTop:'30px', marginLeft:'20px'}}>  
                          <Form.Item style={{ textAlign: 'left'}} name='Seller' label="ผู้ขายพัสดุ" rules={[{ required: true, message: "กรุณากรอกข้อมูล" }]}>
                              <Input placeholder="เช่น ร้านเจริญพัสดุ"/>
                          </Form.Item>
                        </div>

                        <div style={{marginTop:'30px'}}>  
                          <Form.Item style={{ textAlign: 'left'}} name='PersonnelId' label="ผู้ตรวจรับพัสดุ" rules={[{ required: true, message: "กรุณาเลือกผู้ตรวจรับพัสดุ" }]}>
                            <Select placeholder="เลือกผู้ตรวจรับพัสดุ">
                            {dataPersonnels.map((item) => (
                              <Option value={item.ID} key={item.ID}>
                                {`${item.TitleName} ${item.FirstName} ${item.LastName}`}
                              </Option>
                              ))}
                            </Select>
                          </Form.Item>
                        </div>

                    </div>

                    <div style={{marginRight:'30px'}}>

                      <div style={{marginTop:'30px',marginLeft:'11px'}}>
                        <Form.Item style={{ textAlign: 'left'}} name='ID' label="ID รายการพัสดุ" >
                          <Input  disabled />
                        </Form.Item>
                      </div>

                        <div style={{marginTop:'30px', marginLeft:'-8px'}}>  
                          <Form.Item style={{ textAlign: 'left'}} name='ImportVolume' label="จำนวนการนำเข้า" 
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
                                    }]}>
                            <InputNumber />
                          </Form.Item>
                        </div>

                        <div style={{marginTop:'30px'}}>
                          <Form.Item style={{ textAlign: 'left'}} name='ImportDate' label="วันที่นำเข้าพัสดุ" rules={[{ required: true, message: "กรุณาเลือกวันที่" }]}>
                          <DatePicker
                            format="DD-MM-YYYY"
                            locale={locale}  
                            style={{color:'red'}}                          
                          />
                          </Form.Item>
                        </div>
                    </div>
                    <div style={{ display: 'grid', alignItems:'end'}}>
                      <div>
                        <Button className='AddParcelListButton' htmlType="submit">
                          <ImportOutlined /> บันทึกการนำเข้าพัสดุ
                        </Button>
                      </div>
                    </div>

                    
                </Form>
            </Card>

        </div>
    </Content>
    <Footers/>
    </>
);
};



