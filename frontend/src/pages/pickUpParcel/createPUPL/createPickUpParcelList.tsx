import React, { useEffect, useState } from 'react';
import {
  FileAddOutlined,
  ArrowLeftOutlined,
  PlusOutlined,
} from '@ant-design/icons';

import {Card, Layout, Form, Input, DatePicker, Select, Button, message} from 'antd';

import Headers from '../../../layout/header';
import Footers from '../../../layout/footer';
import { Content } from 'antd/es/layout/layout';
import '../styles/PUPLStyle.css' ;
import { Link, useNavigate } from 'react-router-dom';
import { CreatePickUpParcelListPUP, GetPersonnel, GetPickUpStatus } from '../../../services/https';
import { InterfacePersonnel, InterfacePickUpStatus, PickUpParcelList } from '../../../interfaces';
import locale from 'antd/lib/date-picker/locale/th_TH'; // Import Thai locale


export default function CreatePickUpParcelList() {

  const [Addform] = Form.useForm();
  const navigate = useNavigate();
  const { Option } = Select;
  const [messageApi, contextHolder] = message.useMessage();
  
  const [dataPersonnels, setDataPersonnel] = useState<InterfacePersonnel[]>([]);
  const [dataPinkUpStatus, setDataPinkUpStatus] = useState<InterfacePickUpStatus[]>([]);

  const onFinish = async (values: PickUpParcelList) => {
    
    let res = await CreatePickUpParcelListPUP(values);
    if (res.status) {
      messageApi.open({
        type: "success",
        content: "บันทึกข้อมูลสำเร็จ",
      });
      setTimeout(function () {
        navigate("/pages/pickUpParcel");
      }, 1000);
    } else {
      messageApi.open({
        type: "error",
        content: res.message,
      });
    }
  };


  const getPersonnel = async () => {
    let res = await GetPersonnel();
    if (res) {
      setDataPersonnel(res);
    }
  };

  const getPinkUpStatus = async () => {
    let res = await GetPickUpStatus();
    if (res) {
      setDataPinkUpStatus(res);
    }
  };

  useEffect(() => {
    getPersonnel();
    getPinkUpStatus();
  }, []);


  return (
    <> 
    <Headers />
      <Content style={{backgroundColor:'darkslategrey' ,minHeight: "100vh"}}>
          <div style={{padding:30,textAlign:'center'}}>

          <Layout style={{ backgroundColor: 'darkslategrey'}}>
            <div className='titleOfPUPL'>

              <Link to={'/pages/pickUpParcel'} style={{marginRight: 'auto', color: 'white', float:'left'}}>
                <ArrowLeftOutlined style={{fontSize:'20px'}}/>
                <span > Back </span>
              </Link>

              <FileAddOutlined style={{ fontSize: '30px', marginRight: '10px' }}/> สร้างรายการใบเบิกจ่ายพัสดุ      
            </div>
          </Layout>

          <Layout className='titleofPUParcellist' style={{marginTop:'20px'}}>
              กรอกข้อมูลขอเบิกพัสดุ
          </Layout> 

          {contextHolder}

            <Card className='PUPLCard' style={{minHeight:'300px', height:'auto'}}>
              <Form form={Addform} layout="inline" className='PUPLfrom' onFinish={onFinish} autoComplete="off">

                <div style={{marginTop:'30px'}}>
                  <div style={{width:'400px'}}>
                    <Form.Item style={{ textAlign: 'left'}} name={['BillNumber']} label="เลขที่ใบเบิก"  rules={[{ required: true, message: 'กรุณากรอกข้อมูล' }]}>
                      <Input placeholder="เช่น  EXP10001"/>
                    </Form.Item>
                  </div>

                  <div style={{marginTop:'20px', marginLeft:'5px'}}>
                    <Form.Item style={{textAlign: 'left'}} name={['PUPLDate']} label="วันที่ขอเบิก" rules={[{ required: true, message: 'กรุณาเลือกวันที่' }]}>
                      <DatePicker format="DD-MM-YYYY" locale={locale} />
                    </Form.Item>
                  </div>

                  <div style={{marginTop:'20px', marginLeft:'4px'}}>
                    <Form.Item style={{justifyContent:'left', textAlign: 'left'}} name={['DetailOfRequest']} label="รายละเอียด" rules={[{ required: true, message: 'กรุณากรอกข้อมูล' }]}>
                        <Input.TextArea autoSize={{ minRows: 3, maxRows: 8}} placeholder="ระบุรายการที่จะขอเบิก และเหตุผลในการขอเบิก เช่น นำไปใช้ในกิจกรรม"/>
                    </Form.Item>
                  </div>
                </div>

                <div style={{marginTop:'30px'}}>
                  <div style={{width:'400px', marginLeft:'18px'}}>
                    <Form.Item style={{justifyContent:'left', textAlign: 'left'}} name={['PersonnelId']} label="ผู้ขอเบิก"  rules={[{ required: true, message: 'กรุณากรอกข้อมูล'}]}>
                      <Select placeholder="เลือกชื่อผู้ขอเบิก" style={{textAlign:'left'}}>
                        {dataPersonnels.map((item) => (
                                <Option value={item.ID} key={item.ID}>
                                  {`${item.TitleName} ${item.FirstName} ${item.LastName}`}
                                </Option>
                                ))}
                      </Select>
                    </Form.Item>
                  </div>

                  <div style={{width:'400px', marginLeft:'27px', marginTop:'20px'}}>
                    <Form.Item
                      style={{ justifyContent: 'left', textAlign: 'left' }}
                      name={['PickUpStatusId']}
                      label="สถานะ"
                      rules={[{ required: true, message: 'กรุณากรอกข้อมูล' }]}
                      initialValue={1}>
                        <Select disabled>
                          {dataPinkUpStatus.map((item) => (
                            <Option value={item.ID} key={item.ID}>
                              {item.PUPLStatus}
                            </Option>
                          ))}
                        </Select>
                    </Form.Item>
                  </div>

                  <div style={{marginLeft:'90px'}}>
                    <Button className='customAddPUPListButton' htmlType="submit">
                      <PlusOutlined /> สร้างรายการเบิกจ่ายพัสดุ
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