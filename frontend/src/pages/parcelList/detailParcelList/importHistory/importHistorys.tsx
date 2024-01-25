import React, { useEffect, useState } from 'react';
import {
  ArrowLeftOutlined,
  PieChartOutlined,
  DeleteOutlined,
} from '@ant-design/icons';

import {Button, Card, Layout, Modal, Space, message} from 'antd';
import '../../style/buttonStyle.css' ;
import Headers from '../../../../layout/header';
import Footers from '../../../../layout/footer';
import { Content } from 'antd/es/layout/layout';
import { Link, useParams } from 'react-router-dom';
import Table, { ColumnsType } from 'antd/es/table';
import { ImportParcelList } from '../../../../interfaces';
import { DeleteImportParcelListById, GetImportParcelListByParcelListId } from '../../../../services/https';
import moment from 'moment-timezone';
import 'moment/locale/th'; // Import Thai locale
moment.locale('th'); // Set Thai locale

export default function ImportHistory() {

  const [dataImportParcelList, setDataImportParcelList] = useState<readonly ImportParcelList[] | undefined>([]);

  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState<String>();
  const [deleteId, setDeleteId] = useState<Number>();

  const showModal = (val: ImportParcelList) => {
    setModalText(
      `คุณแน่ใจหรือไม่ว่าต้องการลบข้อมูลประวัติการนำเข้ารายการพัสดุนี้`
    );
    setDeleteId(val.ID);
    setOpen(true);
  };

  const handleOk = async () => {
    setConfirmLoading(true);
    let res = await DeleteImportParcelListById(deleteId);
    if (res) {
      setOpen(false);
      message.success("ลบข้อมูลสำเร็จ");
      getImportParcelListByParcelListId();
    } else {
      setOpen(false);
      message.error("เกิดข้อผิดพลาด !");
    }
    setConfirmLoading(false);
  };

  const handleCancel = () => {
    setOpen(false);
  };

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
      render: (text, record) => {
        const thaiYear = moment(record.ImportDate).add(543, 'years').format('YYYY');
        return moment(record.ImportDate).format(`วันที่ D เดือน MMMM ปี ${thaiYear}`);
      },
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
      dataIndex: 'ImportVolume',
      key: 'ImportVolume',
      width: '10%',
      align: 'center',
    },
    {
      title: 'จัดการข้อมูล',
      width: '10%',
      align: 'center',

      render: (record) => (

        <Space style={{flexWrap: 'wrap'}}>
          <Button className='iconDeletePUPL' onClick={() => showModal(record)}>
            <DeleteOutlined style={{color: 'white'}}/>
          </Button>
        </Space>

      ),
    },
  ];

  return (
    <> 
    <Headers />
      <Content style={{ backgroundColor:'darkslategrey', minHeight:'100vh' }}>
          <div style={{padding:30, textAlign:'center'}}>
            <Layout style={{ backgroundColor: 'darkslategrey'}}>
                <div className='titleOfCreateParcel'>

                <Link to={`/pages/myParcelList/detailParcelList/${id}`} style={{marginRight: 'auto', color: 'white', float:'left'}}>
                    <ArrowLeftOutlined style={{fontSize:'20px'}}/>
                    <span > Back </span>
                </Link>

                <PieChartOutlined style={{ fontSize: '30px', marginRight: '10px' }}/> ประวัติการนำเข้าพัสดุ
                </div>
            </Layout>

            <Layout className='titleofImportHistory' style={{ display: 'flex', flexDirection: 'row', marginTop:'20px'}}>
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

           <Modal
                  open={open}
                  onOk={handleOk}
                  confirmLoading={confirmLoading}
                  onCancel={handleCancel}

                  title={<span style={{ color: '#FF4B4B', fontSize:20 }}> คำเตือน !! </span>}
                  style={{fontSize:'16px', minWidth: 400}} 
                  okText= {<span style={{ color: 'white'}}> ลบข้อมูล </span>}
                  okButtonProps={{ style: { background: '#0BB6DC', borderColor: '#0BB6DC' } }}
                  cancelText= {<span style={{ color: 'white'}}> ยกเลิก </span>}
                  cancelButtonProps={{ style: { background: '#FF4B4B', borderColor: '#FF4B4B' } }}>
                    <p>{modalText}</p>
          </Modal>

          </div>
      </Content>
    <Footers/>
    </>
  );
};


