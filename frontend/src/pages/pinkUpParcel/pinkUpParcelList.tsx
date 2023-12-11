import React, { useState, useRef } from 'react';
import {
  PlusOutlined,
  FileSearchOutlined,
  SearchOutlined,
  DeleteOutlined,
  FilePdfOutlined,
} from '@ant-design/icons';
import { Card, Space, Button, Modal, message,Breadcrumb} from 'antd';


import Highlighter from "react-highlight-words";
import type { InputRef } from 'antd';
import { Input, Table } from 'antd';
import type { ColumnType, ColumnsType } from 'antd/es/table';
import type { FilterConfirmProps } from 'antd/es/table/interface';
import './buttonPUPStyle.css' ;
import Headers from '../../layout/header';
import Footers from '../../layout/footer';
import { Content } from 'antd/es/layout/layout';
import { Link } from 'react-router-dom';



interface PickUpParcelList {
  key: string;
  Personnel: string;
  PUPLDate: string;
  BillNumber: string;
}


type DataIndex = keyof PickUpParcelList;

const data: PickUpParcelList[] = [
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


export default function PinkUpParcelList() {


  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef<InputRef>(null);

  const { confirm } = Modal;
  const showDeleteConfirm = () => {
    confirm({
      title: (
        <div style={{ color: 'red', fontSize: '18px' }}>
          คำเตือน!! คุณแน่ใจหรือไม่ว่าต้องการลบข้อมูล
        </div>
      ),
      content: (
        <div>
          <p> ข้อมูลของรายการพัสดุและข้อมูลการนำเข้าจะถูกลบออกทั้งหมด</p>
          <p></p>
  
        </div>
      ),
      okText: 'ยืนยันการลบ',
      okType: 'danger',
      cancelText: 'ยกเลิก',
      style:{fontSize:'16px', minWidth: 500},
      onOk() {
        console.log('ยืนยันการลบ');
        message.success('ลบข้อมูลสำเร็จ');
      },
      onCancel() {
        console.log('ยกเลิก');
      },
    });
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

  const columns: ColumnsType<PickUpParcelList> = [
    {
      title: 'ลำดับ',
      dataIndex: 'key',
      key: 'key',
      width: '10%',
      align: 'center',
      sorter: (a, b) => a.key.length - b.key.length,
      sortDirections: ['descend', 'ascend'],
      
    },
    {
      title: 'วันที่ขอเบิก',
      dataIndex: 'PUPLDate',
      key: 'PUPLDate',
      width: '20%',
      align: 'center',
      sorter: (a, b) => a.PUPLDate.length - b.PUPLDate.length,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'เลขที่ใบเบิก',
      dataIndex: 'BillNumber',
      key: 'BillNumber',
      width: '20%',
      align: 'center',
    },
    {
      title: 'ผู้ขอเบิก',
      dataIndex: 'Personnel',
      key: 'Personnel',
      width: '40%',
      align: 'center',
      ...getColumnSearchProps('Personnel'),
    },
    {
      title: 'จัดการข้อมูลรายการเบิกจ่ายพัสดุ',
      align: 'center',
      
      render: (record) => (

        <Space >
          <Button className='printPDF'>
            <FilePdfOutlined /> พิมพ์เอกสาร
          </Button>

          <Link to={'/pages/pinkUpParcel/editPUPL'}>
            <Button className='editButtonPUPL'>
                แก้ไข
            </Button>
          </Link>

          <Button onClick={showDeleteConfirm} className='iconDeletePUPL'>
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


          <div className='titlePUPL'>
                <FileSearchOutlined className='iconPUPL'/>
                รายการเบิกจ่ายพัสดุ
          </div>

          <div>
              <Link to={'/pages/pinkUpParcelList/createPinkUpParcelList'}>
                <Button className="AddPUPButton">
                  <PlusOutlined /> เพิ่มรายการเบิกจ่ายพัสดุ
                </Button>
              </Link>
          </div>

          <div>
              <span className="DatablockPUP" style={{ marginTop: '-63px', marginLeft:'auto'}}> 
                    จำนวนรายการเบิกจ่ายพัสดุ <></>
                    <div style={{display:'inline-block'}}> 100 </div> <></>
                    <div style={{ display: 'inline-block' }}> รายการ </div>
              </span>
          </div>


        <Card style={{fontSize:'16px', marginTop:20}}>
          <Table 
                  columns={columns} 
                  dataSource={data}
                  pagination={{ pageSize: 4 }}
                  size='small'/>
        </Card>
        </div>
        </Content>
      <Footers/>
    </>
  );
};
