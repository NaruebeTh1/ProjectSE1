import React, { useEffect, useState } from 'react';
import {
  ArrowLeftOutlined,
  PieChartOutlined,
} from '@ant-design/icons';

import {Button, Card, Layout} from 'antd';
import '../style/buttonStyle.css' ;
import Headers from '../../../layout/header';
import Footers from '../../../layout/footer';
import { Content } from 'antd/es/layout/layout';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Table, { ColumnsType } from 'antd/es/table';
import { ParcelList } from '../../../interfaces';
import { GetParcelListById } from '../../../services/https';


export default function DetailParcelList() {

  const navigate = useNavigate();
  const [dataParcelList, setDataParcelList] = useState<ParcelList>();


  let { id } = useParams();



  const getParcelListById = async () => {
    let res = await GetParcelListById(Number(id));
    if (res) {
      setDataParcelList(res);
    }
  };


  useEffect(() => {
    getParcelListById();
   
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
      dataIndex: 'Volume',
      key: 'Volume',
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

 

  return (
    <> 
    <Headers />
      <Content className='BGstyle2'>
          <div style={{padding:30,textAlign:'center' }}>
            <Layout className='BGstyle3'>
                <div className='titleOfCreateParcel'>

                <Link to={'/pages/myParcelList'} style={{marginRight: 'auto', color: 'white', float:'left'}}>
                    <ArrowLeftOutlined style={{fontSize:'20px'}}/>
                    <span > Back </span>
                </Link>

                <PieChartOutlined style={{ fontSize: '30px', marginRight: '10px' }}/> รายละเอียดรายการพัสดุและประวัติการนำเข้าพัสดุ
                </div>
            </Layout>

            <Card style={{fontSize:'16px', marginTop:20,boxShadow: '0em 0 0.5em rgb(185, 247, 255)'}}>
              <Table 
                      columns={columnsParcel} 
                      dataSource={dataParcelList ? [dataParcelList] : []}
                      pagination={{ pageSize: 1 }}
                      size='middle'/>
           </Card>

           <Layout className='titleofImportHistory'>
              ประวัติการนำเข้าพัสดุ 
            </Layout> 

           <Card style={{fontSize:'16px', marginTop:'10px', display: 'flex', 
                          justifyContent: 'center' , background:'#ecfffd',boxShadow: '0em 0 0.5em rgb(185, 247, 255)'}}>
                      <Button className='ButtonImportHistory' onClick={() =>  navigate(`/pages/myParcelList/detailParcelList/importHistorys/${id}`)}>
                        ประวัติการนำเข้าพัสดุ
                      </Button>
           </Card>

          </div>
      </Content>
    <Footers/>
    </>
  );
};


