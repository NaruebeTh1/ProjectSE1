import React, { useState } from 'react';
import {
  ArrowLeftOutlined,
  PieChartOutlined,
} from '@ant-design/icons';

import {Breadcrumb, Card, Layout} from 'antd';

import Headers from '../../../layout/header';
import Footers from '../../../layout/footer';
import { Content } from 'antd/es/layout/layout';
import { Link } from 'react-router-dom';
import Table, { ColumnsType } from 'antd/es/table';
import { ImportParcelList } from '../../../interfaces';


interface ParcelList {
  ID:number;
  ParcelNumber: string;
  ParcelName: string;
  ParcelUnit: string;
  PricePerPiece: number;
  Valume: number;
  Room: number;
  ParcelType: String;
  
}



const dataParcel: ParcelList[] = [
  {
    ID: 1,
    ParcelNumber: 'PN001',
    ParcelName: 'Parcel 1',
    ParcelUnit: 'อัน',
    ParcelType: 'วัสดุสำนักงาน',
    PricePerPiece: 10,
    Valume: 20,
    Room: 1012
  },
  
];

const dataImport: ImportParcelList[] = [
  // {
  //   ID: 1,
  //   ImportValume: 20,
  //   ImportNumber: '10255',
  //   Seller: 'ร้านพัสดุการช่าง',
  //   ImportDate: '12/12/2566',
  //   PersonnelName: 'PersonnelName',
  // },
  // {
  //   ID: 2,
  //   ImportValume: 20,
  //   ImportNumber: '10255',
  //   Seller: 'ร้านพัสดุการช่าง',
  //   ImportDate: '12/12/2566',
  //   PersonnelName: 'Personnel',
  // },
];

export default function DetailParcelList() {

  const columnsParcel: ColumnsType<ParcelList> = [
    {
      title: 'รหัสพัสดุ',
      dataIndex: 'ParcelNumber',
      key: 'ParcelNumber',
      width: '10%',
      align: 'center',
    },
    {
      title: 'ชื่อรายการพัสดุ',
      dataIndex: 'ParcelName',
      key: 'ParcelName',
      width: '30%',
      align: 'center',
    },
    {
      title: 'หน่วยนับ',
      dataIndex: 'ParcelType',
      key: 'ParcelType',
      width: '10%',
      align: 'center',
    },
    {
      title: 'ประเภท',
      dataIndex: 'ParcelUnit',
      key: 'ParcelUnit',
      width: '10%',
      align: 'center',
    },
    {
      title: 'ราคา',
      dataIndex: 'PricePerPiece',
      key: 'PricePerPiece',
      width: '10%',
      align: 'center',
    },
    {
      title: 'จำนวน',
      dataIndex: 'Valume',
      key: 'Valume',
      width: '10%',
      align: 'center',
    },
    {
      title: 'ห้องเก็บพัสดุ',
      dataIndex: 'Room',
      key: 'Room',
      width: '10%',
      align: 'center',
    },
  ];

  const columnsImprot: ColumnsType<ImportParcelList> = [
    {
      title: 'รหัสการนำเข้า',
      dataIndex: 'ImportNumber',
      key: 'ImportNumber',
      width: '10%',
      align: 'center',
    },
    {
      title: 'วันที่นำเข้าพัสดุ',
      dataIndex: 'ImportDate',
      key: 'ImportDate',
      width: '30%',
      align: 'center',
    },
    {
      title: 'ผู้ขายพัสดุ',
      dataIndex: 'Seller',
      key: 'Seller',
      width: '10%',
      align: 'center',
    },
    {
      title: 'ผู้ตรวจรับพัสดุ',
      dataIndex: 'Personnel',
      key: 'Personnel',
      width: '10%',
      align: 'center',
    },
    {
      title: 'จำนวนการนำเข้า',
      dataIndex: 'ImportValume',
      key: 'ImportValume',
      width: '10%',
      align: 'center',
    },
  ];

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

                <PieChartOutlined style={{ fontSize: '30px', marginRight: '10px' }}/> รายละเอียดรายการพัสดุและประวัติการนำเข้าพัสดุ
                </div>
            </Layout>

            <Card style={{fontSize:'16px', marginTop:20}}>
              <Table 
                      columns={columnsParcel} 
                      dataSource={dataParcel}
                      pagination={{ pageSize: 1 }}
                      size='small'/>
           </Card>

           <Card style={{fontSize:'16px', marginTop:10}}>
              <Table 
                      columns={columnsImprot} 
                      dataSource={dataImport}
                      pagination={{ pageSize: 2 }}
                      size='small'/>
           </Card>

          </div>
      </Content>
    <Footers/>
    </>
  );
};


