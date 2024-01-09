import React, { useEffect, useState } from 'react';
import {
  EditOutlined,
  ArrowLeftOutlined,
  SaveOutlined,
} from '@ant-design/icons';

import {Card, Layout, Form, Input, Select, Button, message, DatePicker} from 'antd';

import Headers from '../../../layout/header';
import Footers from '../../../layout/footer';
import { Content } from 'antd/es/layout/layout';
import '../styles/editPUPLStyle.css'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { GetPersonnel, GetPickUpParcelListById, GetPickUpStatus, UpdatePickUpParcelList } from '../../../services/https';
import { InterfacePersonnel, InterfacePickUpStatus, PickUpParcelList } from '../../../interfaces';


export default function EditPinkUpParcelList() {

  const [Addform] = Form.useForm();
  const navigate = useNavigate();
  const { Option } = Select;
  const [messageApi, contextHolder] = message.useMessage();
  
  const [dataPersonnels, setDataPersonnel] = useState<InterfacePersonnel[]>([]);
  const [dataPinkUpStatus, setDataPinkUpStatus] = useState<InterfacePickUpStatus[]>([]);

  const [dataPickUpParcelList, setDataPickUpParcelList] = useState<PickUpParcelList>();

  let { id } = useParams();

    const onFinish = async (values: PickUpParcelList) => {
        values.ID = dataPickUpParcelList?.ID;
        let res = await UpdatePickUpParcelList(values);
        if (res.status) {
          messageApi.open({
            type: "success",
            content: "แก้ไขข้อมูลสำเร็จ",
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

    const getPickUpParcelListById = async () => {
      let res = await GetPickUpParcelListById(Number(id));
        if (res) {
          setDataPickUpParcelList(res);
          
          Addform.setFieldsValue({ 
            BillNumber:   res.BillNumber ,
            DetailOfRequest :    res.DetailOfRequest ,

            PersonnelId:   res.PersonnelId,
            PickUpStatusId:   res.PickUpStatusId,
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
    getPickUpParcelListById();
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

              <EditOutlined style={{ fontSize: '30px', marginRight: '10px' }}/> แก้ไขรายการใบเบิกจ่ายพัสดุ      
            </div>
          </Layout>

          <Layout className='titleofPUParcellist' style={{marginTop:'20px'}}>
              แก้ไขรายการใบเบิกจ่ายพัสดุ
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

                  <div style={{marginTop:'20px', marginLeft:'4px'}}>
                    <Form.Item style={{justifyContent:'left', textAlign: 'left'}} name={['DetailOfRequest']} label="รายละเอียด" rules={[{ required: true, message: 'กรุณากรอกข้อมูล' }]}>
                        <Input.TextArea autoSize={{ minRows: 4, maxRows: 8}} placeholder="ระบุรายการที่จะขอเบิก และเหตุผลในการขอเบิก เช่น นำไปใช้ในกิจกรรม"/>
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
                    <Form.Item style={{justifyContent:'left', textAlign: 'left'}} name={['PickUpStatusId']} label="สถานะ"  rules={[{ required: true, message: 'กรุณากรอกข้อมูล'}]}>
                    <Select disabled placeholder="กำหนดสถานะการเบิกจ่าย" style={{textAlign:'left'}}>
                      {dataPinkUpStatus.map((item) => (
                              <Option value={item.ID} key={item.ID}>
                                {`${item.PUPLStatus}`}
                              </Option>
                              ))}
                    </Select>
                    </Form.Item>
                  </div>

                  <div style={{marginTop:'20px'}}>
                    <Form.Item style={{textAlign: 'left'}} name={['PUPLDate']} label="วันที่ขอเบิก" rules={[{ required: true, message: 'กรุณาเลือกวันที่' }]}>
                      <DatePicker format="DD-MM-YYYY"  />
                    </Form.Item>
                  </div>

                  <div style={{marginLeft:'90px'}}>
                    <Button className='customAddPUPListButton' htmlType="submit">
                      <SaveOutlined /> บันทึกรายการเบิกจ่ายพัสดุ
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