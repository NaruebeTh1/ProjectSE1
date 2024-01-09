import React, { useState, useRef, useEffect } from 'react';
import {
  FileDoneOutlined,
  SearchOutlined,
  DeleteOutlined,
  ArrowLeftOutlined,
  FilePdfOutlined,
} from '@ant-design/icons';
import { Card, Space, Button, Layout, message, Modal} from 'antd';

import Highlighter from "react-highlight-words";
import type { InputRef } from 'antd';
import { Input, Table } from 'antd';
import type { ColumnType, ColumnsType } from 'antd/es/table';
import type { FilterConfirmProps } from 'antd/es/table/interface';
import '../styles/buttonPUPStyle.css' ;
import Headers from '../../../layout/header';
import Footers from '../../../layout/footer';
import { Content } from 'antd/es/layout/layout';
import { Link, useNavigate } from 'react-router-dom';
import { PickUpParcelList } from '../../../interfaces';
import { 
  DeletePickUpParcelListByID, 
  GetPickUpParcelListByPickUpStatusId2 } from '../../../services/https';

type DataIndex = keyof PickUpParcelList;


export default function ApprovedList() {

  const [dataPickUpParcelList, setDataPickUpParcelList] = useState<PickUpParcelList[]>([]);
  

  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef<InputRef>(null);
  const navigate = useNavigate();

  const getPickUpParcelListApproved = async () => {
    let res = await GetPickUpParcelListByPickUpStatusId2();
    if (res) {
      setDataPickUpParcelList(res);
    }
  };


  useEffect(() => {
    getPickUpParcelListApproved();
  }, []);

  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState<String>();
  const [deleteId, setDeleteId] = useState<Number>();

  const showModal = (val: PickUpParcelList) => {
    setModalText(
      `คุณแน่ใจหรือไม่ว่าต้องการลบรายการเบิกจ่ายพัสดุนี้
        ข้อมูลของรายการเบิกจ่ายพัสดุและข้อมูลรายการพัสดุที่ขอเบิกจะถูกลบออกทั้งหมด`
    );
    setDeleteId(val.ID);
    setOpen(true);
  };

  const handleOk = async () => {
    setConfirmLoading(true);
    let res = await DeletePickUpParcelListByID(deleteId);
    if (res) {
      setOpen(false);
      message.success("ลบข้อมูลสำเร็จ");
      getPickUpParcelListApproved();
    } else {
      setOpen(false);
      message.error("เกิดข้อผิดพลาด !");
    }
    setConfirmLoading(false);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const handleSearch = (
    selectedKeys: string[],
    confirm: (param?: FilterConfirmProps) => void,
    dataIndex: DataIndex,
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText('');
  };

  const getColumnSearchProps = (dataIndex: DataIndex): ColumnType<PickUpParcelList> => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
          
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? '#1677ff' : undefined }} />
    ),
    onFilter: (value, record) =>
      (record[dataIndex]?.toString() ?? '')
        .toString()
        .toLowerCase()
        .includes((value as string).toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });

  const columns: ColumnsType<PickUpParcelList> = [
    {
      title: 'เลขที่ใบเบิก',
      dataIndex: 'BillNumber',
      key: 'BillNumber',
      width: '20%',
      align: 'center',
      ...getColumnSearchProps("BillNumber"),
    },
    {
      title: 'ผู้ขอเบิก',
      dataIndex: 'Personnel',
      key: 'Personnel',
      width: '30%',
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
      title: 'สถานะการขอเบิก',
      dataIndex: 'PickUpStatus',
      key: 'PickUpStatus',
      width: '20%',
      align: 'center',
      render: (item) => Object.values(item.PUPLStatus),
    },
    {
      title: 'จัดการข้อมูล',
      align: 'center',
      
      render: (record) => (

        <Space style={{flexWrap: 'wrap'}}>
          <Button className='printPDF'  onClick={() =>  navigate(`/pages/pickUpParcel/approvedList/PDFReader/${record.ID}`)}>
            <FilePdfOutlined /> พิมพ์เอกสาร
          </Button>
          <Button className='iconDeletePUPL' onClick={() => showModal(record)}>
            <DeleteOutlined style={{color: 'white'}}/>
          </Button>
        </Space>

      ),
    },
  ];

  return (
    <> 
        <Headers/>
        
        <Content style={{backgroundColor:'darkslategrey',minHeight: "100vh"}}>

            <div style={{padding:30, textAlign:'center'}}>
                <Layout style={{ backgroundColor: 'darkslategrey'}}>
                        <div className='titleH1'>

                        <Link to={`/pages/pickUpParcel`} style={{marginRight: 'auto', color: 'white', float:'left'}}>
                            <ArrowLeftOutlined style={{fontSize:'20px'}}/>
                            <span > Back </span>
                        </Link>

                        <FileDoneOutlined style={{ fontSize: '30px', marginRight: '10px' }}/> รายการเบิกจ่ายพัสดุ Approved
                        </div>
                </Layout>

                <Layout className='titleH2' style={{ display: 'flex', flexDirection: 'row', marginTop:'20px'}}>
                        <div style={{ marginRight: '10px', color:'white',textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}>
                            รายการเบิกจ่ายพัสดุที่อนุมัติแล้ว
                        </div>
                </Layout>

                <Card style={{fontSize:'16px', marginTop:20}}>
                <Table 
                        columns={columns} 
                        dataSource={dataPickUpParcelList}
                        pagination={{ pageSize: 4 }}
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
