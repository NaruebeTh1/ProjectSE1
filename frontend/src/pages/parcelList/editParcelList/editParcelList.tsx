import React, { useEffect, useState } from 'react';
import {
    ArrowLeftOutlined,
    SaveOutlined,
    EditOutlined,
} from '@ant-design/icons';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button, Card , Form, Input, InputNumber, Layout, Select, message} from 'antd';
import '../style/buttonStyle.css' ;
import Headers from '../../../layout/header';
import Footers from '../../../layout/footer';
import { Content } from 'antd/es/layout/layout';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { InterfaceParcelType, InterfaceParcelUnit, InterfaceRoom, ParcelList } from '../../../interfaces';
import { GetParcelType, GetParcelUnit, UpdateParcelList, GetParcelListById, GetRoom} from '../../../services/https';


const { Option } = Select;

export default function EditParcelList() {

    const [Addform] = Form.useForm();
    const navigate = useNavigate();
    const [, contextHolder] = message.useMessage();
    const [dataParcelType, setDataParcelType] = useState<InterfaceParcelType[]>([]);
    const [dataParcelUnit, setDataParcelUnit] = useState<InterfaceParcelUnit[]>([]);
    const [dataParcelList, setDataParcelList] = useState<ParcelList>();
    const [dataRoom, setDataRoom] = useState<InterfaceRoom[]>([]);

    let { id } = useParams();

    const onFinish = async (values: ParcelList) => {
        values.ID = dataParcelList?.ID;
        let res = await UpdateParcelList(values);
        if (res.status) {
          toast.success("แก้ไขข้อมูลสำเร็จ");
          setTimeout(function () {
            navigate("/pages/myParcelList");
          }, 1000);
        } else {
          toast.error(res.message);
        }
      };

      
    
    const getParcelUnit = async () => {
        let res = await GetParcelUnit();
        if (res) {
            setDataParcelUnit(res);
        }
    };

    const getParcelType = async () => {
        let res = await GetParcelType();
        if (res) {
            setDataParcelType(res);
        }
    };

    const getRoom = async () => {
        let res = await GetRoom();
        if (res) {
            setDataRoom(res);
        }
    };

    const getParcelListById = async () => {
        let res = await GetParcelListById(Number(id));
        if (res) {
          setDataParcelList(res);
          
          Addform.setFieldsValue({ 
            ParcelNumber:   res.ParcelNumber ,
            ParcelName :    res.ParcelName ,
            PricePerPiece:  res.PricePerPiece,
            Volume:         res.Volume,
            ParcelDetail:   res.ParcelDetail,

            ParcelTypeId:   res.ParcelTypeId,
            ParcelUnitId:   res.ParcelUnitId,
            RoomId:         res.RoomId,
        });
        }
      };

    useEffect(() => {
        getParcelUnit();
        getParcelType();
        getRoom();
        getParcelListById();
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
            <Content className='BGstyle2'>
            <div style={{padding:30,minHeight: "100%", textAlign:'center'}}>

                <Layout className='BGstyle3'>
                    <div className='titleOfCreateParcel'>

                    <Link to={'/pages/myParcelList'} style={{marginRight: 'auto', color: 'white', float:'left'}}>
                        <ArrowLeftOutlined style={{fontSize:'20px'}}/>
                        <span > Back </span>
                    </Link>
                   
                    <EditOutlined style={{ fontSize: '30px', marginRight: '10px' }}/> สร้างรายการพัสดุ      
                    </div>
                </Layout>

                {contextHolder}

                <Card className='CreatePLCard' style={{ height: 'auto' , minHeight:'510px', background:'#e3f7f5' }}>
                    <Form layout="inline" name="parcel-form" form={Addform} className='CreatePLfrom' onFinish={onFinish} autoComplete="off">

                        <div style={{width:'420px',marginTop:'20px'}}>
                        
                            <div style={{ marginTop: '10px'}}>
                                <Form.Item
                                    style={{ textAlign: 'left', background: '#27948b', padding: '8px', borderRadius: '4px', color: 'white' }}
                                    name='ParcelNumber'
                                    label={
                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <span style={{ fontWeight: 'bold', color:'white'}}>รหัสพัสดุ (PID)</span>
                                        </div>
                                    }
                                    rules={[{ required: true, message: 'กรุณากรอกข้อมูล' }]}
                                >
                                    <Input placeholder='เช่น P10001' />
                                </Form.Item>
                            </div>


                            <div style={{marginTop:'10px'}}>  
                                <Form.Item 
                                    style={{ textAlign: 'left', background: '#27948b', padding: '8px', borderRadius: '4px', color: 'white' }}
                                    name='ParcelName' 
                                    label={
                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                          <span style={{ fontWeight: 'bold', color:'white'}}> ชื่อรายการพัสดุ </span>
                                        </div>
                                    }
                                    rules={[{ required: true, message: "กรุณากรอกข้อมูล" }]}>
                                    <Input placeholder="เช่น กระดาษถ่ายเอกสาร ชนิด 70 แกรม ขนาด A4"/>
                                </Form.Item>
                            </div>

                            <div style={{marginTop:'10px'}}>  
                                <Form.Item 
                                    style={{ textAlign: 'left', background: '#27948b', padding: '8px', borderRadius: '4px', color: 'white'}}
                                    name='PricePerPiece' 
                                    label={
                                        <div style={{ display: 'flex', alignItems: 'center' , marginLeft:'25px'}}>
                                          <span style={{ fontWeight: 'bold', color:'white'}}> ราคาต่อชิ้น </span>
                                        </div>
                                    }                                            
                                    rules={[{                                                
                                        required: true,                                               
                                        validator: (_, value) => {                                      
                                            if (value === undefined || value === null || value === '') {
                                                    return Promise.reject('กรุณากรอกข้อมูล');                                           
                                                }
                                                // if (value <= 0) {
                                                //     return Promise.reject('มากกว่า 0 เท่านั้น');
                                                // }
                                                return Promise.resolve();
                                            },
                                        }]}
                                >
                                    <InputNumber placeholder="เช่น 1, 2"/>
                                </Form.Item>
                            </div>

                            <div style={{marginTop:'10px'}}>  
                                <Form.Item 
                                    style={{ textAlign: 'left', background: '#27948b', padding: '8px', borderRadius: '4px', color: 'white'}}
                                    name='Volume' 
                                    label={
                                        <div style={{ display: 'flex', alignItems: 'center' , marginLeft:'7px'}}>
                                          <span style={{ fontWeight: 'bold', color:'white'}}> จำนวนทั้งหมด </span>
                                        </div>
                                    }  
                                        rules={[{
                                            required: true,
                                            validator: (_, value) => {
                                                if (value === undefined || value === null || value === '') {
                                                    return Promise.reject('กรุณากรอกข้อมูล');
                                                }
                                                // if (value < 0) {
                                                //     return Promise.reject('มากกว่าหรือเท่ากับ 0 เท่านั้น');
                                                // }
                                                return Promise.resolve();
                                            },
                                        }]}
                                >
                                    <InputNumber placeholder="เช่น 1, 2"/>
                                </Form.Item>
                            </div>

                        </div>

                        <div style={{width:'420px',marginTop:'20px'}}>

                            <div style={{marginTop:'10px'}}>
                                <Form.Item 
                                    style={{ textAlign: 'left', background: '#27948b', padding: '8px', borderRadius: '4px', color: 'white'}}
                                    name='ParcelTypeId' 
                                    label={
                                        <div style={{ display: 'flex', alignItems: 'center',marginRight:'20px'}}>
                                          <span style={{ fontWeight: 'bold', color:'white'}}> ประเภทพัสดุ </span>
                                        </div>
                                    }
                                    rules={[{ required: true, message: "กรุณาเลือกประเภท",  }]} >
                                    <Select placeholder="เลือกประเภทพัสดุ"> 
                                        {dataParcelType.map((item) => (
                                            <Option value={item.ID} key={item.ParcelType}>{item.ParcelType}</Option>
                                        ))}
                                    </Select>
                                </Form.Item>
                            </div>

                            <div style={{marginTop:'10px'}}>
                                <Form.Item 
                                    style={{ textAlign: 'left', background: '#27948b', padding: '8px', borderRadius: '4px', color: 'white'}}
                                    name="ParcelUnitId" 
                                    label={
                                        <div style={{ display: 'flex', alignItems: 'center',marginRight:'17px'}}>
                                          <span style={{ fontWeight: 'bold', color:'white'}}> หน่วยนับพัสดุ </span>
                                        </div>
                                    } 
                                    rules={[{ required: true, message: "กรุณาเลือกหน่วยนับ" }]}>
                                    <Select placeholder="เลือกหน่วยนับพัสดุ">
                                    {dataParcelUnit.map((item) => (
                                        <Option value={item.ID} key={item.ParcelUnit}>{item.ParcelUnit}</Option>
                                    ))}
                                    </Select>
                                </Form.Item>
                            </div>

                            <div style={{marginTop:'10px'}}>
                                <Form.Item 
                                    style={{ textAlign: 'left', background: '#27948b', padding: '8px', borderRadius: '4px', color: 'white'}}
                                    name='RoomId' 
                                    label={
                                        <div style={{ display: 'flex', alignItems: 'center',marginRight:'22px'}}>
                                          <span style={{ fontWeight: 'bold', color:'white'}}> ห้องเก็บพัสดุ </span>
                                        </div>
                                    }  
                                    rules={[{ required: true, message: "กรุณาเลือกสถานที่เก็บพัสดุ" }]}>

                                    <Select placeholder="เลือกสถานที่จัดเก็บพัสดุ">
                                        {dataRoom.map((item) => (
                                            <Option value={item.ID} key={item.RoomName}>{item.RoomName}</Option>
                                        ))}
                                    </Select>
                                </Form.Item>
                            </div>    

                            <div style={{ marginTop: '10px'}}>
                                <Form.Item 
                                    style={{ textAlign: 'left', background: '#27948b', padding: '8px', borderRadius: '4px', color: 'white'}}
                                    name='ParcelDetail' 
                                    label={
                                        <div style={{ display: 'flex', alignItems: 'center'}}>
                                          <span style={{ fontWeight: 'bold', color:'white'}}> รายละเอียดพัสดุ </span>
                                        </div>
                                    } 
                                    rules={[{ required: true, message: "กรุณากรอกข้อมูลเพิ่มเติม" }]}>
                                    <Input.TextArea autoSize={{ minRows: 3, maxRows: 6 }} placeholder="รายละเอียดเพิ่มเติม เช่น สี (ถ้ามี) หรือการนำไปใช้งาน" />
                                </Form.Item>
                            </div>

                            <div style={{ float: 'right', marginRight: '18px' }}>
                                <Button className='AddParcelListButton' htmlType="submit">
                                <SaveOutlined /> บันทึกรายการพัสดุ
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





