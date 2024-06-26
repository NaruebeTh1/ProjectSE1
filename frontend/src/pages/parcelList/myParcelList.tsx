import React, { useState, useRef, useEffect } from 'react';
import {
  PlusOutlined,
  FileDoneOutlined,
  SearchOutlined,
  DeleteOutlined,
  FilePdfOutlined,
} from '@ant-design/icons';
import { Card, Space, Button, Modal, message, Layout} from 'antd';

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Highlighter from "react-highlight-words";
import type { InputRef } from 'antd';
import { Input, Table } from 'antd';
import type { ColumnType, ColumnsType } from 'antd/es/table';
import type { FilterConfirmProps } from 'antd/es/table/interface';
import './style/buttonStyle.css' ;
import Headers from '../../layout/header';
import Footers from '../../layout/footer';
import { Content } from 'antd/es/layout/layout';
import { Link, useNavigate } from 'react-router-dom';
import { 
  GetParcelList, DeleteParcelListByID, 
  DeleteImportParcelListByParcelListID, 
  DeleteExportParcelListByParcelListID, 
} from '../../services/https';
import { ParcelList } from '../../interfaces';


type DataIndex = keyof ParcelList;


export default function MyParcelList() {

  const [dataParcelList, setDataParcelList] = useState<ParcelList[]>([]);
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef<InputRef>(null);

  const getParcelList = async () => {
    let res = await GetParcelList();
    if (res) {
      setDataParcelList(res);
    }
  };

  useEffect(() => {
    getParcelList();
  }, []);

  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState<String>();
  const [deleteId, setDeleteId] = useState<Number>();


  const showModal = (val: ParcelList) => {
    setModalText(
      `คุณแน่ใจหรือไม่ว่าต้องการลบรายการพัสดุ "${val.ParcelNumber} ${val.ParcelName}"
        ข้อมูลของรายการพัสดุและข้อมูลการนำเข้าจะถูกลบออกทั้งหมด`
    );
    setDeleteId(val.ID);
    setOpen(true);
  };

  const handleOk = async () => {
    setConfirmLoading(true);
    let res = await DeleteParcelListByID(deleteId);
    if (res) {
      toast.success("ลบข้อมูลสำเร็จ");
      setOpen(false);
      getParcelList();
        DeleteImportParcelListByParcelListID(deleteId);
        DeleteExportParcelListByParcelListID(deleteId);
      
    } else {    
      toast.error("เกิดข้อผิดพลาด ! " + res.message);
      setOpen(false);
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

  const getColumnSearchProps = (dataIndex: DataIndex): ColumnType<ParcelList> => ({
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

  const columns: ColumnsType<ParcelList> = [
    {
      title: 'รหัสพัสดุ',
      dataIndex: 'ParcelNumber',
      key: 'ParcelNumber',
      width: '10%',
      align: 'center',
      sorter: (a, b) => a.ParcelNumber.localeCompare(b.ParcelNumber),
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'ชื่อรายการพัสดุ',
      dataIndex: 'ParcelName',
      key: 'ParcelName',
      width: '30%',
      align: 'center',
      ...getColumnSearchProps('ParcelName'),
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
      title: 'ราคา',
      dataIndex: 'PricePerPiece',
      key: 'PricePerPiece',
      width: '10%',
      align: 'center',
      sorter: (a, b) => a.PricePerPiece - b.PricePerPiece,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'จำนวน',
      dataIndex: 'Volume',
      key: 'Volume',
      width: '10%',
      align: 'center',
      sorter: (a, b) => a.Volume - b.Volume,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'จัดการข้อมูลพัสดุ',
      align: 'center',
      
      render: (record) => (

        <Space style={{flexWrap: 'wrap', justifyContent: 'center'}}>
          
          <Button className='importButton' onClick={() =>  navigate(`/pages/myParcelList/importParcelList/${record.ID}`)}>
                นำเข้าพัสดุ
          </Button>

          <Button className='detailButton' onClick={() =>  navigate(`/pages/myParcelList/detailParcelList/${record.ID}`)}>
              รายละเอียด
          </Button>

          <Button className='editButton' onClick={() =>  navigate(`/pages/myParcelList/editParcelList/${record.ID}`)} >
              แก้ไข
          </Button>

          <Button onClick={() => showModal(record)} className='iconDelete'>
            <DeleteOutlined style={{color: 'white'}}/>
          </Button>
        </Space>

      ),
    },
  ];



  return (
    <> 
        <Headers/>
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
        <div style={{padding:30}}>

          <div className='parcelListStyle'>
              <FileDoneOutlined className='iconparcelListStyle'/>
              รายการพัสดุโรงเรียน
          </div>

          <Layout className='BGstyle3'>
            <div>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <Link to={'/pages/myParcelList/createParcelList'}>
                  <Button className="customAddButton">
                    <PlusOutlined/> เพิ่มรายการพัสดุ
                  </Button>
                </Link>

                <Button className='printParcelListBtn'  onClick={() =>  navigate(`/pages/myParcelList/parcelPDF`)}
                    >
                  <FilePdfOutlined/> พิมพ์รายการพัสดุ
                </Button>
              </div>
                

                <div>
                  <span className="DatablockPL" style={{ marginTop: '-63px', marginLeft:'auto'}}> 
                        จำนวนรายการพัสดุ <></>
                        <div style={{display:'inline-block'}}> {dataParcelList.length} </div> <></>
                        <div style={{ display: 'inline-block' }}> รายการ </div>
                  </span>  
                </div>
            </div>
            


            <Card className='cardParcelList' style={{minHeight:'440px'}}>
              <Table 
                      columns={columns} 
                      dataSource={dataParcelList}
                      pagination={{ pageSize: 6 }}
                      size='small'/>
            </Card>
          </Layout>

            <Modal

            open={open}
            onOk={handleOk} 
            confirmLoading={confirmLoading}
            onCancel={handleCancel}

            title={<span style={{ color: '#FF4B4B', fontSize:20 }}> คำเตือน !! </span>}
            style={{fontSize: '16px', minWidth: '400px'}}
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
