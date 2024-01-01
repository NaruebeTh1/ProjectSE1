import React, { useEffect, useState, useRef} from 'react';
import {
  ArrowLeftOutlined,
  FileSearchOutlined,
  PlusOutlined,
  SearchOutlined,
} from '@ant-design/icons';

import Headers from '../../../layout/header';
import Footers from '../../../layout/footer';
import { Content } from 'antd/es/layout/layout';

import { Layout,Table, Card, Button, Input, Space, InputRef} from 'antd';
import { Link, useParams } from 'react-router-dom';
import type { ColumnsType } from 'antd/es/table';
import type { ColumnType, FilterConfirmProps, TableRowSelection } from 'antd/es/table/interface';
import { ExportParcelList, ParcelList } from '../../../interfaces';
import { CreateExportParcelList, GetParcelList } from '../../../services/https';
import Highlighter from 'react-highlight-words';
import { render } from 'react-dom';

type DataIndex = keyof ParcelList;

export default function CreateExportParcel() {

    const [dataParcelList, setDataParcelList] = useState<ParcelList[]>([]);
    const [selectedRows, setSelectedRows] = useState<ParcelList[]>([]);


    let { id } = useParams();
    
    const getParcelList = async () => {
        let res = await GetParcelList();
        if (res) {
          setDataParcelList(res);
        }
      };
    
    
    useEffect(() => {
        getParcelList();
    }, []);

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
            width: '15%',
            align: 'center',
            ...getColumnSearchProps('ParcelNumber'),
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
            width: '11%',
            align: 'center',
            render: (item) => Object.values(item.ParcelUnit),
        },
        {
            title: 'ราคาต่อชิ้น',
            dataIndex: 'PricePerPiece',
            key: 'PricePerPiece',
            width: '11%',
            align: 'center',
        },
        {
            title: 'จำนวนคงเหลือ',
            dataIndex: 'Valume',
            key: 'Valume',
            width: '11%',
            align: 'center',
        },
        {
            title: 'จำนวนที่ขอเบิก',
            dataIndex: 'ExportVolume',
            key: 'ExportVolume',
            width: '11%',
            align: 'center',
            render: (text, record) => (
              <Input
                  type="number"
                  value={text}
                 
              />
          ),
        },
        
      ];

      const rowSelection: TableRowSelection<ParcelList> = {
        type: 'checkbox',
        onChange: (selectedRowKeys, selectedRows, info) => {
          setSelectedRows(selectedRows);
        },
      };
      
      
    


    return (
        <> 
            <Headers />
                <Content style={{ backgroundColor:'darkslategrey', minHeight:'100vh' }}>
                    <div style={{padding:30, textAlign:'center'}}>
                        <Layout style={{ backgroundColor: 'darkslategrey'}}>
                            <div className='titleOfPUPL'>

                            <Link to={'/pages/pinkUpParcelList'} style={{marginRight: 'auto', color: 'white', float:'left'}}>
                                <ArrowLeftOutlined style={{fontSize:'20px'}}/>
                                <span > Back </span>
                            </Link>

                            <FileSearchOutlined style={{ fontSize: '30px', marginRight: '10px' }}/> เพิ่มรายการพัสดุที่จะขอเบิก 
                            </div>
                        </Layout>

                        <Layout className='titleofPUParcellist' style={{marginTop:'20px'}}>
                            เลือกเพื่อเพิ่มรายการพัสดุ
                        </Layout> 

                        <Card style={{}} className='PUPLCard'>
                            <Table
                                columns={columns}
                                rowSelection={{ ...rowSelection}}
                                dataSource={dataParcelList}
                                pagination={{ pageSize: 3 }}
                                size='small'/>
                        </Card>

                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '-25px' }}>
                            <Button className='AddListPL' >
                                <PlusOutlined /> เพิ่มรายการพัสดุที่จะขอเบิก
                            </Button>
                        </div>

                    </div>
                </Content>
            <Footers/>
        </>
    );
};
