import React, { useEffect, useState } from 'react';
import {
  ArrowLeftOutlined,
  PieChartOutlined,
} from '@ant-design/icons';

import {Breadcrumb, Card, Layout} from 'antd';

import Headers from '../../../../layout/header';
import Footers from '../../../../layout/footer';
import { Content } from 'antd/es/layout/layout';
import { Link, useParams } from 'react-router-dom';
import Table, { ColumnsType } from 'antd/es/table';
import { ImportParcelList } from '../../../../interfaces';
import { GetImportParcelListByParcelListId } from '../../../../services/https';


export default function ImportHistory() {

    const [dataImportParcelList, setDataImportParcelList] = useState<readonly ImportParcelList[] | undefined>([]);



  let { id } = useParams();


  const getImportParcelListByParcelListId = async () => {
    try {
      const res = await GetImportParcelListByParcelListId(Number(id));
      if (res) {
        setDataImportParcelList(res);
      }
    } catch (error) {
      console.error('Error fetching Import Parcel List:', error);
    }
  };


  useEffect(() => {
    getImportParcelListByParcelListId();
  }, []);


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

                <Link to={`/pages/myParcelList/detailParcelList/${id}`} style={{marginRight: 'auto', color: 'white', float:'left'}}>
                    <ArrowLeftOutlined style={{fontSize:'20px'}}/>
                    <span > Back </span>
                </Link>

                <PieChartOutlined style={{ fontSize: '30px', marginRight: '10px' }}/> ประวัติการนำเข้าพัสดุ
                </div>
            </Layout>

            <Layout className='titleofImportHistory' style={{ display: 'flex', flexDirection: 'row'}}>
                <div style={{ marginRight: '10px', color:'white',textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}>
                    ประวัติการนำเข้าพัสดุ
                </div>
            </Layout>

           <Card style={{fontSize:'16px', marginTop:10}}>
              <Table 
                      columns={columnsImport} 
                      dataSource={dataImportParcelList}
                      pagination={{ pageSize: 5 }}
                      size='small'/>
                      
           </Card>

          </div>
      </Content>
    <Footers/>
    </>
  );
};


