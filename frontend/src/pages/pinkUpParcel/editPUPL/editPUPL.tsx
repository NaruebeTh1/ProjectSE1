import React, { useState } from 'react';
import {
    EditOutlined,
    ArrowLeftOutlined,
    SaveOutlined,
    DeleteOutlined,
} from '@ant-design/icons';

import {Breadcrumb, Card, Layout, Form, Input, DatePicker, Select, Button, Space} from 'antd';

import Headers from '../../../layout/header';
import Footers from '../../../layout/footer';
import { Content } from 'antd/es/layout/layout';
import './editPUPLStyle.css' ;
import Table, { ColumnsType } from 'antd/es/table';
import { Link } from 'react-router-dom';


interface DataPickUpParcelList {
  key: string;
  Personnel: string;
  PUPLDate: string;
  BillNumber: string;
}

// export interface ParcelList {
//   ParcelNumber: string;
//   ParcelName: string;
//   PricePerPiece: number;
//   Valume: number;
//   ParcelDetail: string;
//   PLDate: string;
//   ParcelTypeId: number;
//   ParcelUnitId: number;
//   RoomId: number;
//   ParcelType: ParcelType;
//   ParcelUnit: ParcelUnit;
//   Room: Room;
// }

// export interface ExportParcelList {
//   ExportVolume: number;
//   Budget: number;
  
//   ParcelListId: number;
//   PickUpParcelListId: number;
//   ParcelList: ParcelList;
//   PickUpParcelList: PickUpParcelList;
// }


type DataIndex = keyof DataPickUpParcelList;

const data: DataPickUpParcelList[] = [
  {
    key: '1',
    Personnel: 'John Brown',
    PUPLDate: '1/5/10',
    BillNumber: '1225/45',
  },
  {
    key: '2',
    Personnel: 'Joe Black',
    PUPLDate: '1/5/10',
    BillNumber: '1226/68',
  },
  {
    key: '3',
    Personnel: 'Jim Green',
    PUPLDate: '1/5/10',
    BillNumber: '1235/87',
  },
  {
    key: '4',
    Personnel: 'Jim Red',
    PUPLDate: '1/5/10',
    BillNumber: '1234/56',
  },

  {
    key: '5',
    Personnel: 'Jim Red',
    PUPLDate: '1/5/10',
    BillNumber: '4562/78',
  },

  {
    key: '6',
    Personnel: 'Jim Red',
    PUPLDate: '1/5/10',
    BillNumber: '2364/87',
  },

  {
    key: '7',
    Personnel: 'Jim Red',
    PUPLDate: '1/5/10',
    BillNumber: '1452/45',
  },

];



export default function EditPinkUpParcelList() {

  const [form] = Form.useForm();
  const { Option } = Select;

  const columns: ColumnsType<DataPickUpParcelList> = [
    {
      title: 'ลำดับ',
      dataIndex: 'key',
      key: 'key',
      width: '5%',
      align: 'center',  
    },
    {
      title: 'รหัสพัสดุ',
      dataIndex: 'PUPLDate',
      key: 'PUPLDate',
      width: '5%',
      align: 'center',
    },
    {
      title: 'ชื่อรายการพัสดุ',
      dataIndex: 'BillNumber',
      key: 'BillNumber',
      width: '20%',
      align: 'center',
    },
    {
      title: 'หน่วยนับ',
      dataIndex: 'Personnel',
      key: 'Personnel',
      width: '5%',
      align: 'center',
    },
    {
      title: 'ราคาต่อชิ้น',
      dataIndex: 'Personnel',
      key: 'Personnel',
      width: '5%',
      align: 'center',
    },
    {
      title: 'จำนวนคงเหลือ',
      dataIndex: 'Personnel',
      key: 'Personnel',
      width: '5%',
      align: 'center',
    },
    {
      title: 'จำนวนที่ขอเบิก',
      dataIndex: 'Personnel',
      key: 'Personnel',
      width: '5%',
      align: 'center',
    },
    {
      title: 'งบประมาณ',
      dataIndex: 'Personnel',
      key: 'Personnel',
      width: '5%',
      align: 'center',
    },
    {
      title: 'ลบรายการ',
      width: '3%',
      align: 'center',
      render: (record) => (

        <Space >
          <Button className='iconDelete'>
            <DeleteOutlined style={{color: 'white'}}/>
          </Button>
        </Space>

      ),
    },
  ];

  return (
    <> 
    <Headers />
      <Content style={{ margin: "0 16px", backgroundColor:'darkslategrey' }}>
        <Breadcrumb style={{ margin: "10px 0" }} />
          <div style={{padding:10,minHeight: "100%", textAlign:'center'}}>

          <Layout style={{ backgroundColor: 'darkslategrey'}}>
            <div className='titleOfPUPL'>

              <Link to={'/pages/pinkUpParcelList'} style={{marginRight: 'auto', color: 'white', float:'left'}}>
                <ArrowLeftOutlined style={{fontSize:'20px'}}/>
                <span > Back </span>
              </Link>

              <EditOutlined style={{ fontSize: '30px', marginRight: '10px' }}/> แก้ไขรายการใบเบิกจ่ายพัสดุ      
            </div>
          </Layout>

            <Card className='PUPLCard'>
              <Form form={form} layout="inline" className='PUPLfrom'>

                <div>
                  <div style={{width:'400px'}}>
                    <Form.Item style={{ textAlign: 'left'}} name={['BillNumber']} label="เลขที่ใบเบิก"  rules={[{ required: true, message: 'กรุณากรอกข้อมูล' }]}>
                      <Input placeholder="เช่น  EXP10001"/>
                    </Form.Item>
                  </div>

                  <div style={{marginTop:'10px', marginLeft:'5px'}}>
                    <Form.Item style={{textAlign: 'left'}} name={['PUPLDate']} label="วันที่ขอเบิก" rules={[{ required: true, message: 'กรุณาเลือกวันที่' }]}>
                      <DatePicker />
                    </Form.Item>
                  </div>
                </div>

                <div>
                  <div style={{width:'400px', marginLeft:'18px'}}>
                    <Form.Item style={{justifyContent:'left', textAlign: 'left'}} name={['Personnel']} label="ผู้ขอเบิก"  rules={[{ required: true, message: 'กรุณากรอกข้อมูล'}]}>
                    <Select placeholder="เลือกชื่อผู้ขอเบิก" style={{textAlign:'left'}}>
                        <Option value={1}>คนที่ 1</Option>
                        <Option value={2}>คนที่ 2</Option>
                    </Select>
                    </Form.Item>
                  </div>

                  <div style={{marginTop:'10px'}}>
                    <Form.Item style={{justifyContent:'left', textAlign: 'left'}} name={['DetailOfRequest']} label="รายละเอียด" rules={[{ required: true, message: 'กรุณากรอกข้อมูล' }]}>
                        <Input placeholder="เหตุผลในการขอเบิก เช่น นำไปใช้ในกิจกรรม"/>
                    </Form.Item>
                  </div>
                </div>

                <div style={{marginLeft:'20px', marginTop:'-20px', justifySelf:'center'}}>
                  <Button className='customSavePUPButton'>
                    <SaveOutlined /> บันทึกรายการเบิกจ่ายพัสดุ
                  </Button>
                </div>
              </Form>
            </Card>

            <Layout className='titleofParcellist'>
              รายการพัสดุที่ขอเบิก 
            </Layout> 

            <Card className='parcelListTalble'>
            <Table 
                  columns={columns} 
                  dataSource={data}
                  pagination={{ pageSize: 3 }}
                  size='small'/>
            </Card> 

          </div>
      </Content>
    <Footers/>
    </>
  );
};