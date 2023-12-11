import React, { useState, useRef, useEffect } from 'react';
import {
  PlusOutlined,
  FileDoneOutlined,
  SearchOutlined,
  DeleteOutlined,
} from '@ant-design/icons';
import { Card, Space, Button, Modal, message, Breadcrumb} from 'antd';

import Highlighter from "react-highlight-words";
import type { InputRef } from 'antd';
import { Input, Table } from 'antd';
import type { ColumnType, ColumnsType } from 'antd/es/table';
import type { FilterConfirmProps } from 'antd/es/table/interface';
import './buttonStyle.css' ;
import Headers from '../../layout/header';
import Footers from '../../layout/footer';
import { Content } from 'antd/es/layout/layout';
import { Link, useNavigate } from 'react-router-dom';
import { GetParcelList, DeleteParcelListByID} from '../../services/https';
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

  const [messageApi] = message.useMessage();
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
      setOpen(false);
      messageApi.open({
        type: "success",
        content: "ลบข้อมูลสำเร็จ",
      });
      getParcelList();
    } else {
      setOpen(false);
      messageApi.open({
        type: "error",
        content: "เกิดข้อผิดพลาด !",
      });
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
      record[dataIndex]
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
      title: 'ID',
      dataIndex: 'ID',
      key: 'ID',
      width: '10%',
      align: 'center',
    },
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
      dataIndex: 'Valume',
      key: 'Valume',
      width: '10%',
      align: 'center',
      sorter: (a, b) => a.Valume - b.Valume,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'จัดการข้อมูลพัสดุ',
      align: 'center',
      
      render: (record) => (

        <Space >
          
          <Link to={'/pages/myParcelList/importParcelList'}>
            <Button className='importButton'>
                นำเข้าพัสดุ
            </Button>
          </Link>

          <Link to={'/pages/myParcelList/detailParcelList'}>
            <Button className='detailButton'>
                รายละเอียด
            </Button>
          </Link>

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
        
        <Content style={{ margin: "0 16px", backgroundColor:'darkslategrey'}}>
        <Breadcrumb style={{ margin: "10px 0" }} />
        <div style={{padding:15,minHeight: "100%"}}>

        <div className='parcelListStyle'>
            <FileDoneOutlined className='iconparcelListStyle'/>
            รายการพัสดุโรงเรียน
        </div>

          <div>
              <Link to={'/pages/myParcelList/createParcelList'}>
                <Button className="customAddButton">
                  <PlusOutlined /> เพิ่มรายการพัสดุ
                </Button>
              </Link>
          </div>

          <div>
              <span className="DatablockPL" style={{ marginTop: '-63px', marginLeft:'auto'}}> 
                    จำนวนรายการพัสดุ <></>
                    <div style={{display:'inline-block'}}> {dataParcelList.length} </div> <></>
                    <div style={{ display: 'inline-block' }}> รายการ </div>
              </span>
          </div>


        <Card style={{fontSize:'16px', marginTop:20}}>
          <Table 
                  columns={columns} 
                  dataSource={dataParcelList}
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
