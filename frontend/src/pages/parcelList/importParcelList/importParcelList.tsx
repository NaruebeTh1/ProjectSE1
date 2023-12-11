import React, { useState } from 'react';
import {
  ImportOutlined,
  ArrowLeftOutlined,
  FileSearchOutlined,
} from '@ant-design/icons';

import { Breadcrumb, Card, DatePicker, Form, Input, InputNumber, Layout, Select} from 'antd';

import Headers from '../../../layout/header';
import Footers from '../../../layout/footer';
import { Content } from 'antd/es/layout/layout';
import { Button } from 'antd/es/radio';
import { Link } from 'react-router-dom';


export default function ImprotParcelList() {

  const [Importform] = Form.useForm();

  return (
    <> 
    <Headers />
        <Content style={{ margin: "0 16px", backgroundColor:'darkslategrey' }}>
        <Breadcrumb style={{ margin: "10px 0" }} />
        <div style={{padding:15,minHeight: "100%", textAlign:'center'}}>

            <Layout style={{ backgroundColor: 'darkslategrey'}}>
                <div className='titleOfCreateParcel'>

                <Link to={'/pages/myParcelList'} style={{marginRight: 'auto', color: 'white', float:'left'}}>
                    <ArrowLeftOutlined style={{fontSize:'20px'}}/>
                    <span > Back </span>
                </Link>

                <FileSearchOutlined style={{ fontSize: '30px', marginRight: '10px' }}/> การนำเข้าพัสดุ
                </div>

            </Layout>

            <Card className='CreatePLCard'>

              <Layout className='titleOfImportParcelList'>
                <div>
                  <div> รหัสพัสดุ : </div>
                  <div style={{marginLeft:'10px', color:'red'}}> 
                    P1001 
                  </div>

                  <div style={{marginLeft:'10px'}}> จำนวนปัจจุบัน : </div>
                  <div style={{marginLeft:'10px', color:'red'}}> 
                    100 
                  </div>
                  <div style={{marginLeft:'10px'}}> 
                    รีม 
                  </div>

                </div>
                
                <div>
                  <div> รายการพัสดุ : </div>
                  <div style={{marginLeft:'10px', color:'red'}}> 
                    กระดาษรายงาน A4 70 แกรม 
                  </div>
                </div>
                
              </Layout>


                <Form layout="inline" name="parcel-form" form={Importform} className='CreatePLfrom'>
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
                          <Form.Item style={{ textAlign: 'left'}} name='Personnel' label="ผู้ตรวจรับพัสดุ" rules={[{ required: true, message: "กรุณาเลือกผู้ตรวจรับพัสดุ" }]}>
                            <Select placeholder="เลือกผู้ตรวจรับพัสดุ">
                              
                            </Select>
                          </Form.Item>
                        </div>

                    </div>

                    <div style={{marginRight:'30px'}}>

                        <div style={{marginTop:'30px', marginLeft:'-8px'}}>  
                          <Form.Item style={{ textAlign: 'left'}} name='ImportValume' label="จำนวนการนำเข้า" 
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
                            <DatePicker />
                          </Form.Item>
                        </div>

                        <div style={{float:'right'}}>
                            <Button className='AddParcelListButton'>
                                <ImportOutlined /> บันทึกรายการพัสดุ
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



