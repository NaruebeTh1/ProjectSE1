import React, { useState, useRef } from 'react';
import {
  PlusOutlined,
  FileDoneOutlined,
  SearchOutlined,
  DeleteOutlined,
} from '@ant-design/icons';
import { Avatar, Card, Layout, Menu, Space, Button, Divider} from 'antd';
import {
  Link,
} from "react-router-dom";


import Highlighter from "react-highlight-words";
import type { InputRef } from 'antd';
import { Input, Table } from 'antd';
import type { ColumnType, ColumnsType } from 'antd/es/table';
import type { FilterConfirmProps } from 'antd/es/table/interface';

interface DataType {
  key: string;
  name: string;
  age: number;
  address: string;
}

type DataIndex = keyof DataType;

const data: DataType[] = [
  {
    key: '1',
    name: 'John Brown',
    age: 10,
    address: 'New',
  },
  {
    key: '2',
    name: 'Joe Black',
    age: 20,
    address: 'London',
  },
  {
    key: '3',
    name: 'Jim Green',
    age: 30,
    address: 'Sydney',
  },
  {
    key: '4',
    name: 'Jim Red',
    age: 40,
    address: 'London',
  },

  {
    key: '5',
    name: 'Jim Red',
    age: 40,
    address: 'London',
  },

  {
    key: '6',
    name: 'Jim Red',
    age: 40,
    address: 'London',
  },

  {
    key: '7',
    name: 'Jim Red',
    age: 40,
    address: 'London',
  },

];

export default function MyParcelList() {


  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef<InputRef>(null);

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

  const getColumnSearchProps = (dataIndex: DataIndex): ColumnType<DataType> => ({
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

  const columns: ColumnsType<DataType> = [
    {
      title: 'ลำดับ',
      dataIndex: 'name',
      key: 'name',
      width: '10%',
      align: 'center',
      sorter: (a, b) => a.address.length - b.address.length,
      sortDirections: ['descend', 'ascend'],
      
    },
    {
      title: 'รหัสพัสดุ',
      dataIndex: 'name',
      key: 'name',
      width: '10%',
      align: 'center',
      sorter: (a, b) => a.address.length - b.address.length,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'ชื่อรายการพัสดุ',
      dataIndex: 'name',
      key: 'name',
      width: '30%',
      align: 'center',
      ...getColumnSearchProps('name'),
    },
    {
      title: 'หน่วยนับ',
      dataIndex: 'name',
      key: 'name',
      width: '10%',
      align: 'center',
    },
    {
      title: 'ราคา',
      dataIndex: 'age',
      key: 'age',
      width: '10%',
      align: 'center',
      sorter: (a, b) => a.address.length - b.address.length,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'จำนวน',
      dataIndex: 'address',
      key: 'address',
      width: '10%',
      align: 'center',
      sorter: (a, b) => a.address.length - b.address.length,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'จัดการข้อมูลพัสดุ',
      dataIndex: 'address',
      key: 'address',
      align: 'center',
      
      render: (record) => (

        <Space >
          <Button style={{backgroundColor: '#FF9F2D',color: '#ffffff'}}>
              นำเข้าพัสดุ
          </Button>

          <Button style={{backgroundColor: '#FF6060',color: '#ffffff'}}>
              แก้ไข
          </Button>

          <Button >
            <DeleteOutlined style={{color: 'red'}}/>
          </Button>
        </Space>

      ),
    },
  ];

  return (
    <> 
    
      <div style={{display: 'flex', alignItems: 'center',fontSize:'24px', fontWeight: 'bold'}}>
        <FileDoneOutlined style={{fontSize: '40px', color: 'black', marginRight:5}} />
        รายการพัสดุโรงเรียน
      </div>

      <Button
        style={{fontSize:'16px', marginTop:30, textAlign:'center', display: 'flex', 
                alignItems: 'center', justifyContent: 'center', backgroundColor: '#45a',
                color: '#ffffff',  border: 'none', borderRadius: '7px', 
                padding: '20px 20px'}} >
        <PlusOutlined />
        เพิ่มรายการพัสดุ
      </Button>

      <Card style={{fontSize:'16px', marginTop:30}}>
        
        <Table 
                columns={columns} 
                dataSource={data}
                pagination={{ pageSize: 4 }}
                size='small'/>
        
      </Card>

  
    
    </>
  );
};
