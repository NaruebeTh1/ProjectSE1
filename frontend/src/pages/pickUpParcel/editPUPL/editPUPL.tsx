import React, { useEffect, useState } from 'react';
import {
  EditOutlined,
  ArrowLeftOutlined,
  SaveOutlined,
} from '@ant-design/icons';

import {Card, Layout, Form, Input, Select, Button, message, DatePicker} from 'antd';

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Headers from '../../../layout/header';
import Footers from '../../../layout/footer';
import { Content } from 'antd/es/layout/layout';
import '../styles/editPUPLStyle.css'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { GetPersonnel, GetPickUpParcelListById, GetPickUpStatus, UpdatePickUpParcelList } from '../../../services/https';
import { InterfacePersonnel, InterfacePickUpStatus, PickUpParcelList } from '../../../interfaces';
import locale from 'antd/lib/date-picker/locale/th_TH'; // Import Thai locale


export default function EditPinkUpParcelList() {

  const [Addform] = Form.useForm();
  const navigate = useNavigate();
  const { Option } = Select;
  const [, contextHolder] = message.useMessage();
  
  const [dataPersonnels, setDataPersonnel] = useState<InterfacePersonnel[]>([]);
  const [dataPinkUpStatus, setDataPinkUpStatus] = useState<InterfacePickUpStatus[]>([]);

  const [dataPickUpParcelList, setDataPickUpParcelList] = useState<PickUpParcelList>();

  let { id } = useParams();

    const onFinish = async (values: PickUpParcelList) => {
        values.ID = dataPickUpParcelList?.ID;
        let res = await UpdatePickUpParcelList(values);
        if (res.status) {
          toast.success("แก้ไขข้อมูลสำเร็จ");
          setTimeout(function () {
            navigate("/pages/pickUpParcel");
          }, 1000);
        } else {
          toast.error(res.message);
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
        <ToastContainer
            position="top-center"
            autoClose={2000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"/>
      <Content className='BGPpuplstyle2'>
          <div style={{padding:30,textAlign:'center'}}>

          <Layout className='BGPpuplstyle3'>
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
          <Card className='PUPLCard' style={{minHeight:'400px', height:'auto', background:'#e3f7f5' }}>
              <Form form={Addform} layout="inline" className='PUPLfrom' onFinish={onFinish} autoComplete="off">
                <div style={{marginTop:'30px'}}>
                  <div style={{width:'400px'}}>
                    <Form.Item 
                      style={{ textAlign: 'left', background: '#27948b', padding: '8px', borderRadius: '4px', color: 'white' }}
                      name={['BillNumber']} 
                      label={
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                          <span style={{ fontWeight: 'bold', color:'white'}}> เลขที่ใบเบิก </span>
                        </div>
                      }  
                      rules={[{ required: true, message: 'กรุณากรอกข้อมูล' }]}>
                      <Input placeholder="เช่น  EXP10001"/>
                    </Form.Item>
                  </div>

                  <div style={{marginTop:'20px'}}>
                    <Form.Item 
                      style={{ textAlign: 'left', background: '#27948b', padding: '8px', borderRadius: '4px', color: 'white' }}
                      name={['PUPLDate']} 
                      label={
                        <div style={{ display: 'flex', alignItems: 'center', marginLeft:'5px'}}>
                          <span style={{ fontWeight: 'bold', color:'white'}}> วันที่ขอเบิก </span>
                        </div>
                      } 
                      rules={[{ required: true, message: 'กรุณาเลือกวันที่' }]}>
                      <DatePicker format="DD-MM-YYYY" locale={locale} />
                    </Form.Item>
                  </div>

                  <div style={{marginTop:'20px'}}>
                    <Form.Item 
                      style={{ textAlign: 'left', background: '#27948b', padding: '8px', borderRadius: '4px', color: 'white' }}
                      name={['DetailOfRequest']}                  
                      label={
                        <div style={{ display: 'flex', alignItems: 'center', marginLeft:'4px'}}>
                          <span style={{ fontWeight: 'bold', color:'white'}}> รายละเอียด </span>
                        </div>
                      } 
                      rules={[{ required: true, message: 'กรุณากรอกข้อมูล' }]}>
                        <Input.TextArea autoSize={{ minRows: 3, maxRows: 8}} placeholder="ระบุรายการที่จะขอเบิก และเหตุผลในการขอเบิก เช่น นำไปใช้ในกิจกรรม"/>
                    </Form.Item>
                  </div>
                </div>

                <div style={{marginTop:'30px'}}>
                  <div style={{width:'400px'}}>
                    <Form.Item 
                      style={{ textAlign: 'left', background: '#27948b', padding: '8px', borderRadius: '4px', color: 'white' }}
                      name={['PersonnelId']} 
                      label={
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                          <span style={{ fontWeight: 'bold', color:'white'}}> ผู้ขอเบิก </span>
                        </div>
                      }   
                      rules={[{ required: true, message: 'กรุณากรอกข้อมูล'}]}>
                      <Select placeholder="เลือกชื่อผู้ขอเบิก" style={{textAlign:'left'}}>
                        {dataPersonnels.map((item) => (
                                <Option value={item.ID} key={item.ID}>
                                  {`${item.TitleName} ${item.FirstName} ${item.LastName}`}
                                </Option>
                                ))}
                      </Select>
                    </Form.Item>
                  </div>

                  <div style={{width:'400px', marginTop:'20px'}}>
                    <Form.Item
                      style={{ textAlign: 'left', background: '#27948b', padding: '8px', borderRadius: '4px', color: 'white' }}
                      name={['PickUpStatusId']}
                      label={
                        <div style={{ display: 'flex', alignItems: 'center', marginLeft:'12px' }}>
                          <span style={{ fontWeight: 'bold', color:'white'}}> สถานะ </span>
                        </div>
                      }  
                      rules={[{ required: true, message: 'กรุณากรอกข้อมูล' }]}
                      initialValue={1}>
                        <Select disabled>
                          {dataPinkUpStatus.map((item) => (
                            <Option value={item.ID} key={item.ID}> 
                              <span style={{ fontWeight: 'bold', color:'white'}}> {item.PUPLStatus} </span>                             
                            </Option>
                          ))}
                        </Select>
                    </Form.Item>
                  </div>

                  <div style={{display:'flex', justifyContent:'center'}}>
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