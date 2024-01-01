import React, { useEffect, useState } from 'react';
import {
    ArrowLeftOutlined,
    FileSearchOutlined,
    PlusOutlined
} from '@ant-design/icons';

import { Button, Card, Form, Input, InputNumber, Layout, Select, message} from 'antd';
import '../buttonStyle.css' ;
import Headers from '../../../layout/header';
import Footers from '../../../layout/footer';
import { Content } from 'antd/es/layout/layout';
import { Link, useNavigate } from 'react-router-dom';
import { InterfaceParcelType, InterfaceParcelUnit, InterfaceRoom, ParcelList } from '../../../interfaces';
import { GetParcelType, GetParcelUnit, GetRoom, CreateParcelList} from '../../../services/https';

const { Option } = Select;

export default function CreateParcelListPage() {

    const [Addform] = Form.useForm();
    const navigate = useNavigate();
    const [messageApi, contextHolder] = message.useMessage();
    const [dataParcelType, setDataParcelType] = useState<InterfaceParcelType[]>([]);
    const [dataParcelUnit, setDataParcelUnit] = useState<InterfaceParcelUnit[]>([]);
    const [dataRoom, setDataRoom] = useState<InterfaceRoom[]>([]);

    const onFinish = async (values: ParcelList) => {
    
        let res = await CreateParcelList(values);
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

    useEffect(() => {
        getParcelUnit();
        getParcelType();
        getRoom();
      }, []);
    

    return (
        <> 
        <Headers />
            <Content style={{backgroundColor:'darkslategrey' , minHeight:'100vh'}}>
            <div style={{padding:30,minHeight: "100%", textAlign:'center'}}>

                <Layout style={{ backgroundColor: 'darkslategrey'}}>
                    <div className='titleOfCreateParcel'>

                    <Link to={'/pages/myParcelList'} style={{marginRight: 'auto', color: 'white', float:'left'}}>
                        <ArrowLeftOutlined style={{fontSize:'20px'}}/>
                        <span > Back </span>
                    </Link>

                    <FileSearchOutlined style={{ fontSize: '30px', marginRight: '10px' }}/> สร้างรายการพัสดุ      
                    </div>
                </Layout>

                {contextHolder}

                <Card className='CreatePLCard'>
                    <Form layout="inline" name="parcel-form" form={Addform} className='CreatePLfrom' onFinish={onFinish} autoComplete="off">

                        <div style={{marginRight:'30px', width:'400px'}}>
                        
                            <div style={{marginTop:'30px'}}>  
                                <Form.Item style={{ textAlign: 'left'}} name='ParcelNumber' label="รหัสพัสดุ (PID)" rules={[{ required: true, message: "กรุณากรอกข้อมูล" }]}>
                                    <Input placeholder="เช่น P10001"/>
                                </Form.Item>
                            </div>

                            <div style={{marginTop:'30px'}}>  
                                <Form.Item style={{ textAlign: 'left'}} name='ParcelName' label="ชื่อรายการพัสดุ" rules={[{ required: true, message: "กรุณากรอกข้อมูล" }]}>
                                    <Input placeholder="เช่น กระดาษถ่ายเอกสาร ชนิด 70 แกรม ขนาด A4"/>
                                </Form.Item>
                            </div>

                            <div style={{marginTop:'30px', marginLeft:'25px'}}>  
                                <Form.Item style={{ textAlign: 'left'}} name='PricePerPiece' label="ราคาต่อชิ้น" 
                                            rules={[{
                                                required: true,
                                                validator: (_, value) => {
                                                if (value === undefined || value === null || value === '') {
                                                    return Promise.reject('กรุณากรอกข้อมูล');
                                                }
                                                if (value <= 0) {
                                                    return Promise.reject('มากกว่า 0 เท่านั้น');
                                                }
                                                return Promise.resolve();
                                                },
                                            }]}
                                            >
                                    <InputNumber />
                                </Form.Item>
                            </div>

                            <div style={{marginTop:'30px', marginLeft:'7px'}}>  
                                <Form.Item style={{ textAlign: 'left'}} name='Valume' label="จำนวนทั้งหมด" 
                                            rules={[{
                                                required: true,
                                                validator: (_, value) => {
                                                if (value === undefined || value === null || value === '') {
                                                    return Promise.reject('กรุณากรอกข้อมูล');
                                                }
                                                if (value < 0) {
                                                    return Promise.reject('มากกว่าหรือเท่ากับ 0 เท่านั้น');
                                                }
                                                return Promise.resolve();
                                                },
                                            }]}>
                                    <InputNumber />
                                </Form.Item>
                            </div>

                        </div>

                        <div style={{marginRight:'30px', width:'400px'}}>

                            <div style={{marginTop:'30px'}}>
                                <Form.Item style={{ textAlign: 'left'}} name='ParcelTypeId' label="ประเภทพัสดุ" rules={[{ required: true, message: "กรุณาเลือกประเภท" }]}>
                                    <Select placeholder="เลือกประเภทพัสดุ"> 
                                    {dataParcelType.map((item) => (
                                        <Option value={item.ID} key={item.ParcelType}>{item.ParcelType}</Option>
                                    ))}
                                    </Select>
                                </Form.Item>
                            </div>

                            <div style={{marginTop:'30px',marginLeft:'-3px'}}>
                                <Form.Item style={{ textAlign: 'left'}} name="ParcelUnitId" label="หน่วยนับพัสดุ" rules={[{ required: true, message: "กรุณาเลือกหน่วยนับ" }]}>
                                    <Select placeholder="เลือกหน่วยนับพัสดุ">
                                    {dataParcelUnit.map((item) => (
                                        <Option value={item.ID} key={item.ParcelUnit}>{item.ParcelUnit}</Option>
                                    ))}
                                    </Select>
                                </Form.Item>
                            </div>

                            <div style={{marginTop:'30px'}}>
                                <Form.Item style={{ textAlign: 'left'}} name='RoomId' label="ห้องเก็บพัสดุ" rules={[{ required: true, message: "กรุณาเลือกสถานที่เก็บพัสดุ" }]}>
                                    <Select placeholder="เลือกสถานที่จัดเก็บพัสดุ">
                                        {dataRoom.map((item) => (
                                            <Option value={item.ID} key={item.RoomName}>{item.RoomName}</Option>
                                        ))}
                                    </Select>
                                </Form.Item>
                            </div>
              
                        </div>
                

                        <div style={{marginRight:'30px', width:'500px', marginTop:'30px'}}>
                            <Form.Item style={{ textAlign: 'left'}} name='ParcelDetail' label="รายละเอียดพัสดุ" rules={[{ required: true, message: "กรุณากรอกข้อมูลเพิ่มเติม" }]}>
                                <Input.TextArea autoSize={{ minRows: 10, maxRows: 6 }} placeholder="รายละเอียดเพิ่มเติม เช่น สี (ถ้ามี) หรือการนำไปใช้งาน"/>
                            </Form.Item>

                            <div style={{float:'right', marginRight:'18px'}}>
                                <Button className='AddParcelListButton' htmlType="submit">
                                    <PlusOutlined /> สร้างรายการพัสดุ
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


