import React, { useEffect, useState } from 'react';
import {
  ArrowLeftOutlined,
  PieChartOutlined,
} from '@ant-design/icons';

import {Breadcrumb, Card, Layout} from 'antd';

import Headers from '../../../layout/header';
import Footers from '../../../layout/footer';
import { Content } from 'antd/es/layout/layout';
import { Link, useParams } from 'react-router-dom';
import Table, { ColumnsType } from 'antd/es/table';
import { ImportParcelList, ParcelList } from '../../../interfaces';
import { GetImportParcelList, GetImportParcelListById, GetParcelListById } from '../../../services/https';


export default function DetailParcelList() {


  const [dataParcelList, setDataParcelList] = useState<ParcelList>();
  const [dataImportParcelList, setDataImportParcelList] = useState<ImportParcelList>();

  let { id } = useParams();



  const getParcelListById = async () => {
    let res = await GetParcelListById(Number(id));
    if (res) {
      setDataParcelList(res);
    }
  };


  const getImportParcelListById = async () => {
    let res = await GetImportParcelListById(Number(id));
    console.log('Import Parcel List:', res);
    if (res) {
      setDataImportParcelList(res);
    }
  };


  useEffect(() => {
    getParcelListById();
    getImportParcelListById();
  
  }, []);
  
  

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
      dataIndex: 'ParcelUnit',
      key: 'ParcelUnit',
      width: '10%',
      align: 'center',
      render: (item) => Object.values(item.ParcelUnit),
    },
    {
      title: 'ประเภท',
      dataIndex: 'ParcelType',
      key: 'ParcelType',
      width: '10%',
      align: 'center',
      render: (item) => Object.values(item.ParcelType),
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
      render: (item) => Object.values(item.RoomName),
    },
  ];

  const columnsImport: ColumnsType<ImportParcelList> = [
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
      width: '20%',
      align: 'center',
    },
    {
      title: 'ผู้ตรวจรับพัสดุ',
      dataIndex: 'Personnel',
      key: 'Personnel',
      width: '20%',
      align: 'center',
      render: (personnel) => {
        if (personnel) {
          return `${personnel.TitleName}${personnel.FirstName}  ${personnel.LastName}`;
        } else {
          return 'N/A'; 
        }
      }
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
                      dataSource={dataParcelList ? [dataParcelList] : []}
                      pagination={{ pageSize: 1 }}
                      size='small'/>
           </Card>

           <Card style={{fontSize:'16px', marginTop:10}}>
              <Table 
                      columns={columnsImport} 
                      dataSource={dataImportParcelList ? [dataImportParcelList] : []}
                      pagination={{ pageSize: 2 }}
                      size='small'/>
                      
           </Card>

          </div>
      </Content>
    <Footers/>
    </>
  );
};


