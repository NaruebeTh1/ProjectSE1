import React, { useEffect, useState } from 'react';
import {Table} from 'antd';
import type { ColumnsType } from 'antd/es/table';
import {Card, Space} from 'antd';
import "./overviewStyle.css";
import Headers from '../../layout/header';
import Footers from '../../layout/footer';
import { Content } from 'antd/es/layout/layout';

import { GetParcelList, GetParcelType, GetParcelUnit, GetPickUpParcelList } from '../../services/https';
import { ParcelList, InterfaceParcelType, InterfaceParcelUnit, PickUpParcelList } from '../../interfaces';


export default function ParcelOverview() {

  const [dataParcelType, setDataParcelType] = useState<InterfaceParcelType[]>([]);
  const [dataParcelUnit, setDataParcelUnit] = useState<InterfaceParcelUnit[]>([]);

  const [dataParcelList, setDataParcelList] = useState<ParcelList[]>([]);
  const [dataPinkUpParcelList, setDataPickUpParcelList] = useState<PickUpParcelList[]>([]);


  useEffect(() => {
    // Fetch ParcelType data
    const fetchParcelType = async () => {
      try {
        const res = await GetParcelType();
        if (res) {
          setDataParcelType(res);
          
        }
      } catch (error) {
        console.error('Error fetching ParcelType data:', error);
      }
    };

    // Fetch ParcelUnit data
    const fetchParcelUnit = async () => {
      try {
        const res = await GetParcelUnit();
        if (res) {
          setDataParcelUnit(res);
        }
      } catch (error) {
        console.error('Error fetching ParcelUnit data:', error);
      }
    };

    const fetchParcelList = async () => {
      try {
        const res = await GetParcelList();
        if (res) {
          setDataParcelList(res);
        }
      } catch (error) {
        console.error('Error fetching ParcelUnit data:', error);
      }
    };

    const fetchPickUpParcelList = async () => {
      try {
        const res = await GetPickUpParcelList();
        if (res) {
          setDataPickUpParcelList(res);
        }
      } catch (error) {
        console.error('Error fetching ParcelUnit data:', error);
      }
    };

    // Call the fetch functions
    fetchParcelList();
    fetchPickUpParcelList();
    fetchParcelType();
    fetchParcelUnit();
  }, []);



  const columnsParcelType: ColumnsType<InterfaceParcelType> = [
  {
    title: 'ID',
    dataIndex: 'ID',
    align: 'center',
  },
  {
    title: 'ประเภทพัสดุ',
    dataIndex: 'ParcelType',
    align: 'center',
  },
];

const columnsParcelUnit: ColumnsType<InterfaceParcelUnit> = [
  {
    title: 'ID',
    dataIndex: 'ID',
    align: 'center',
  },
  {
    title: 'หน่วยนับพัสดุ',
    dataIndex: 'ParcelUnit',
    align: 'center',
  },
];


  
  return (
    <> 
    <Headers />
      <Content style={{backgroundColor:'darkslategray', minHeight:'100vh'}}>
          <div style={{padding:30, textAlign:'center'}}>

            <Space direction="horizontal" size="middle" style={{flexWrap: 'wrap', justifyContent: 'center'}}>

              <Card title="ภาพรวมข้อมูลจำนวนรายการของงานพัสดุโรงเรียน" style={{height:'450px'}}>


                <div style={{marginTop:'0px'}}>

                <div className="titleValueParcelLIST"> 
                        จำนวนรายการข้อมูลพัสดุ
                        <div className="counttitleValueParcelLIST"> {dataParcelList.length} </div>
                        <div style={{ display: 'inline-block', fontSize:'14px'}}> รายการ </div>
                  </div>

                  <div className="titleValueParcelLIST"> 
                        จำนวนรายการเบิกจ่ายพัสดุ
                        <div className="counttitleValueParcelLIST"> {dataPinkUpParcelList.length} </div>
                        <div style={{ display: 'inline-block', fontSize:'14px'}}> รายการ </div>
                  </div>

                  <div className="titleValueParcel"> 
                        จำนวนรายการประเภทพัสดุ
                        <div className="count"> {dataParcelType.length} </div>
                        <div style={{ display: 'inline-block', fontSize:'14px'}}> รายการ </div>
                  </div>

                  <div className="titleValueParcel"> 
                        จำนวนรายการหน่วยนับพัสดุ 
                        <div className="count"> {dataParcelUnit.length} </div>
                        <div style={{ display: 'inline-block', fontSize:'14px'}} > รายการ </div>
                  </div>
                </div>
              </Card>

              <Card title="ตารางแสดงรายการประเภทของพัสดุ" style={{width:'400px', height:'450px'}}>
                <Table 
                      columns={columnsParcelType} 
                      dataSource={dataParcelType} 
                      size="small"
                      pagination={{ pageSize: 5 }}/>
              </Card>

              <Card title="ตารางแสดงรายการหน่วยนับพัสดุ" style={{width:'400px', height:'450px'}}>

                <Table 
                      columns={columnsParcelUnit} 
                      dataSource={dataParcelUnit} 
                      size="small" 
                      pagination={{ pageSize: 5 }}/>

              </Card>
            </Space>
          </div>
      </Content>
    <Footers/>
    </>
  );
};

