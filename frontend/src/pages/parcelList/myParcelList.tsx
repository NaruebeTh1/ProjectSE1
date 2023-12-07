import React, { useState, useRef } from 'react';
import {
  PlusOutlined,
  FileDoneOutlined,
  SearchOutlined,
  DeleteOutlined,
} from '@ant-design/icons';
import { Card, Space, Button, Modal, Form, message, InputNumber, Breadcrumb, DatePicker, Select} from 'antd';


import Highlighter from "react-highlight-words";
import type { InputRef } from 'antd';
import { Input, Table } from 'antd';
import type { ColumnType, ColumnsType } from 'antd/es/table';
import type { FilterConfirmProps } from 'antd/es/table/interface';
import './buttonStyle.css' ;
import Headers from '../../layout/header';
import Footers from '../../layout/footer';
import { Content } from 'antd/es/layout/layout';

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 16 },
};

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

  const [isModalAddPLOpen, setIsModalAddPLOpen] = useState(false);
  const [isModalImportPLOpen, setIsModalImportPLOpen] = useState(false);
  const [isModalEditPLOpen, setIsModalEditPLOpen] = useState(false);

  const [form] = Form.useForm();

  const showModalAddPL = () => {
    setIsModalAddPLOpen(true);
  };
  const handleOkAddPL = () => {
    form
      .validateFields()
      .then((values) => {
        form.resetFields();
        message.success('บันทึกข้อมูลสำเร็จ');
        setIsModalAddPLOpen(false);
      })
      .catch((errorInfo) => {
        console.log('Validation failed:', errorInfo);
      });
  };
  const handleCancelAddPL = () => {
    form.resetFields();
    setIsModalAddPLOpen(false);
  };


  const showModalImportPL = () => {
    setIsModalImportPLOpen(true);
  };
  const handleOkImportPL = () => {
    form
      .validateFields()
      .then((values) => {
        form.resetFields();
        message.success('นำเข้าพัสดุสำเร็จ');
        setIsModalImportPLOpen(false);
      })
      .catch((errorInfo) => {
        console.log('Validation failed:', errorInfo);
      });
  };
  const handleCancelImportPL = () => {
    form.resetFields();
    setIsModalImportPLOpen(false);
  };


  const showModalEditPL = () => {
    setIsModalEditPLOpen(true);
  };
  const handleOkEditPL = () => {
    form
      .validateFields()
      .then((values) => {
        form.resetFields();
        message.success('แก้ไขข้อมูลสำเร็จ');
        setIsModalEditPLOpen(false);
      })
      .catch((errorInfo) => {
        console.log('Validation failed:', errorInfo);
      });
  };
  const handleCancelEditPL = () => {
    form.resetFields();
    setIsModalEditPLOpen(false);
  };


  
  const showModalDetailPL = () => {
    Modal.info({
      title: (
        <div style={{ color: 'blue', fontSize: '18px' }}>
          รายละเอียดของรายการพัสดุและการนำเข้าพัสดุ
        </div>
      ),
      content: (
        <div>
          <p>some messages...some messages...</p>
          <p>some messages...some messages...</p>
          <p>some messages...some messages...</p>
          <p>some messages...some messages...</p>
          <p>some messages...some messages...</p>
          <p>some messages...some messages...</p>
          <p>some messages...some messages...</p>
          <p>some messages...some messages...</p>    
        </div>
      ),
      onOk() {},
      okText: 'ปิดหน้าต่าง',
      okButtonProps: { style: { background: '#ee3e3e'} },
      style:{fontSize:'16px', minWidth: 500},
    });
  };

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
          <Button onClick={showModalImportPL} className='importButton'>
              นำเข้าพัสดุ
          </Button>

          <Button onClick={showModalDetailPL} className='detailButton'>
              รายละเอียด
          </Button>

          <Button onClick={showModalEditPL} className='editButton'>
              แก้ไข
          </Button>

          <Button onClick={showDeleteConfirm} className='iconDelete'>
            <DeleteOutlined style={{color: 'white'}}/>
          </Button>
        </Space>

      ),
    },
  ];

  const { Option } = Select;

  return (
    <> 
        <Headers/>
        
        <Content style={{ margin: "0 16px" }}>
        <Breadcrumb style={{ margin: "16px 0" }} />
        <div style={{padding:30,minHeight: "100%",background: ''}}>

        <div className='parcelListStyle'>
            <FileDoneOutlined className='iconparcelListStyle'/>
            รายการพัสดุโรงเรียน
        </div>

        <Button onClick={showModalAddPL} className="customAddButton">
              <PlusOutlined /> เพิ่มรายการพัสดุ
        </Button>

        <span className="Datablock" style={{ marginTop: '-63px', marginRight:'10px'}}> 
              จำนวนรายการพัสดุ <></>
              <div style={{display:'inline-block'}}> 100 </div> <></>
              <div style={{ display: 'inline-block' }}> รายการ </div>
        </span>


          <Modal open={isModalAddPLOpen} onOk={handleOkAddPL} onCancel={handleCancelAddPL} 
                title={<span style={{ color: '#FF4B4B', fontSize:20 }}> กรอกข้อมูลรายการพัสดุ </span>}
                style={{fontSize:'16px',textAlign:'center', minWidth: 800}} 
                okText= {<span style={{ color: 'white'}}> บันทึกข้อมูล </span>}
                okButtonProps={{ style: { background: '#0BB6DC', borderColor: '#0BB6DC' } }}
                cancelText= {<span style={{ color: 'white'}}> ยกเลิก </span>}
                cancelButtonProps={{ style: { background: '#FF4B4B', borderColor: '#FF4B4B' } }}>
                  
                  <Form
                      {...layout}
                      name="parcel-form"
                      form={form}
                      style={{ maxWidth: 1000, textAlign: 'left', marginTop: 30 }}
                    >
                      
                      <Form.Item name={['parcel', 'ParcelNumber']} label="รหัสพัสดุ (PID)" rules={[{ required: true, message: "กรุณากรอกข้อมูล" }]}>
                        <Input placeholder="เช่น P10001"/>
                      </Form.Item>
                      <Form.Item name={['parcel', 'ParcelName']} label="ชื่อรายการพัสดุ" rules={[{ required: true, message: "กรุณากรอกข้อมูล" }]}>
                        <Input placeholder="เช่น กระดาษถ่ายเอกสาร ชนิด 70 แกรม ขนาด A4"/>
                      </Form.Item>
                      <Form.Item name={['parcel', 'ParcelTypeId']} label="ประเภทพัสดุ" rules={[{ required: true, message: "กรุณาเลือกประเภท" }]}>
                        <Select placeholder="เลือกประเภทพัสดุ">
                          <Option value={1}>Type 1</Option>
                          <Option value={2}>Type 2</Option>
                        </Select>
                      </Form.Item>
                      <Form.Item name={['parcel', 'ParcelUnit']} label="หน่วยนับพัสดุ" rules={[{ required: true, message: "กรุณาเลือกหน่วยนับ" }]}>
                        <Select placeholder="เลือกหน่วยนับพัสดุ">
                          <Option value={1}>ชิ้น</Option>
                          <Option value={2}>อัน</Option>
                          <Option value={3}>รีม</Option>
                          <Option value={4}>กล่อง</Option>
                          <Option value={5}>แผ่น</Option>
                          <Option value={6}>ตลับ</Option>
                          <Option value={7}>ม้วน</Option>
                        </Select>
                      </Form.Item>
                      <Form.Item name={['parcel', 'PricePerPiece']} label="ราคาต่อชิ้น" 
                                  rules={[{
                                    required: true,
                                    validator: (_, value) => {
                                      if (value === undefined || value === null || value === '') {
                                        return Promise.reject('กรุณากรอกข้อมูล');
                                      }
                                      if (value < 0) {
                                        return Promise.reject('มากกว่าหรือเท่ากับ 0 เท่านั้น');
                                      }
                                      return Promise.resolve();
                                    },
                                  }]}>
                        <InputNumber />
                      </Form.Item>
                      <Form.Item name={['parcel', 'Valume']} label="จำนวนทั้งหมด" 
                                  rules={[{
                                    required: true,
                                    validator: (_, value) => {
                                      if (value === undefined || value === null || value === '') {
                                        return Promise.reject('กรุณากรอกข้อมูล');
                                      }
                                      if (value < 0) {
                                        return Promise.reject('มากกว่าหรือเท่ากับ 0 เท่านั้น');
                                      }
                                      return Promise.resolve();
                                    },
                                  }]}>
                        <InputNumber />
                      </Form.Item>
                      <Form.Item name={['parcel', 'RoomId']} label="ห้องเก็บพัสดุ" rules={[{ required: true, message: "กรุณาเลือกสถานที่เก็บพัสดุ" }]}>
                        <Select placeholder="เลือกสถานที่จัดเก็บพัสดุ">
                          <Option value={1}>Room 1</Option>
                          <Option value={2}>Room 2</Option>
                        </Select>
                      </Form.Item>
                      <Form.Item name={['parcel', 'ParcelDetail']} label="รายละเอียดพัสดุ" rules={[{ required: true, message: "กรุณากรอกข้อมูลเพิ่มเติม" }]}>
                        <Input.TextArea placeholder="รายละเอียดเพิ่มเติม เช่น สี (ถ้ามี) หรือการนำไปใช้งาน"/>
                      </Form.Item>
                      <Form.Item name={['parcel', 'PLDate']} label="วันที่" rules={[{ required: true, message: "กรุณาเลือกวันที่" }]}>
                        <DatePicker />
                      </Form.Item>
                    </Form>
          </Modal>


          <Modal open={isModalImportPLOpen} onOk={handleOkImportPL} onCancel={handleCancelImportPL} 
                title={<span style={{ color: '#FF4B4B', fontSize:20 }}> กรอกข้อมูลการนำเข้าพัสดุ </span>}
                style={{fontSize:'16px',textAlign:'center', minWidth: 800}} 
                okText= {<span style={{ color: 'white'}}> บันทึกข้อมูล </span>}
                okButtonProps={{ style: { background: '#0BB6DC', borderColor: '#0BB6DC' } }}
                cancelText= {<span style={{ color: 'white'}}> ยกเลิก </span>}
                cancelButtonProps={{ style: { background: '#FF4B4B', borderColor: '#FF4B4B' } }}>
                  
                  <Form
                      {...layout}
                      name="parcel-form"
                      form={form}
                      style={{ maxWidth: 1000, textAlign: 'left', marginTop: 30 }}
                    >
                      
                      <Form.Item name={['ImportParcelList', 'ImportNumber']} label="รหัสการนำเข้า" rules={[{ required: true, message: "กรุณากรอกข้อมูล" }]}>
                        <Input placeholder="เช่น IMP0001"/>
                      </Form.Item>

                      <Form.Item name={['ImportParcelList', 'ImportValume']} label="จำนวนการนำเข้า" 
                                  rules={[{
                                    required: true,
                                    validator: (_, value) => {
                                      if (value === undefined || value === null || value === '') {
                                        return Promise.reject('กรุณากรอกข้อมูล');
                                      }
                                      if (value < 1) {
                                        return Promise.reject('มากกว่าหรือเท่ากับ 1 เท่านั้น');
                                      }
                                      return Promise.resolve();
                                    },
                                  }]}>
                        <InputNumber />
                      </Form.Item>

                      <Form.Item name={['ImportParcelList', 'Seller']} label="ผู้ขายพัสดุ" rules={[{ required: true, message: "กรุณากรอกข้อมูล" }]}>
                          <Input placeholder="เช่น ร้านเจริญพัสดุ"/>
                      </Form.Item>

                      <Form.Item name={['ImportParcelList', 'Personnel']} label="ผู้ตรวจรับพัสดุ" rules={[{ required: true, message: "กรุณาเลือกผู้ตรวจรับพัสดุ" }]}>
                        <Select placeholder="เลือกผู้ตรวจรับพัสดุ">
                          <Option value={1}>คนที่ 1</Option>
                          <Option value={2}>คนที่ 2</Option>
                          <Option value={3}>คนที่ 3</Option>
                          <Option value={4}>คนที่ 4</Option>
                        </Select>
                      </Form.Item>

                      <Form.Item name={['ImportParcelList', 'ImportDate']} label="วันที่นำเข้าพัสดุ" rules={[{ required: true, message: "กรุณาเลือกวันที่" }]}>
                        <DatePicker />
                      </Form.Item>
                    </Form>
          </Modal>



          <Modal open={isModalEditPLOpen} onOk={handleOkEditPL} onCancel={handleCancelEditPL} 
                title={<span style={{ color: '#FF4B4B', fontSize:20 }}> แก้ไขข้อมูลรายการพัสดุ </span>}
                style={{fontSize:'16px',textAlign:'center', minWidth: 800}} 
                okText= {<span style={{ color: 'white'}}> บันทึกข้อมูล </span>}
                okButtonProps={{ style: { background: '#0BB6DC', borderColor: '#0BB6DC' } }}
                cancelText= {<span style={{ color: 'white'}}> ยกเลิก </span>}
                cancelButtonProps={{ style: { background: '#FF4B4B', borderColor: '#FF4B4B' } }}>
                  
                  <Form
                      {...layout}
                      name="parcel-form"
                      form={form}
                      style={{ maxWidth: 1000, textAlign: 'left', marginTop: 30 }}
                    >
                      
                      <Form.Item name={['parcel', 'ParcelNumber']} label="รหัสพัสดุ (PID)" rules={[{ required: true, message: "กรุณากรอกข้อมูล" }]}>
                        <Input placeholder="เช่น P10001"/>
                      </Form.Item>
                      <Form.Item name={['parcel', 'ParcelName']} label="ชื่อรายการพัสดุ" rules={[{ required: true, message: "กรุณากรอกข้อมูล" }]}>
                        <Input placeholder="เช่น กระดาษถ่ายเอกสาร ชนิด 70 แกรม ขนาด A4"/>
                      </Form.Item>
                      <Form.Item name={['parcel', 'ParcelTypeId']} label="ประเภทพัสดุ" rules={[{ required: true, message: "กรุณาเลือกประเภท" }]}>
                        <Select placeholder="เลือกประเภทพัสดุ">
                          <Option value={1}>Type 1</Option>
                          <Option value={2}>Type 2</Option>
                        </Select>
                      </Form.Item>
                      <Form.Item name={['parcel', 'ParcelUnit']} label="หน่วยนับพัสดุ" rules={[{ required: true, message: "กรุณาเลือกหน่วยนับ" }]}>
                        <Select placeholder="เลือกหน่วยนับพัสดุ">
                          <Option value={1}>ชิ้น</Option>
                          <Option value={2}>อัน</Option>
                          <Option value={3}>รีม</Option>
                          <Option value={4}>กล่อง</Option>
                          <Option value={5}>แผ่น</Option>
                          <Option value={6}>ตลับ</Option>
                          <Option value={7}>ม้วน</Option>
                        </Select>
                      </Form.Item>
                      <Form.Item name={['parcel', 'PricePerPiece']} label="ราคาต่อชิ้น" 
                                  rules={[{
                                    required: true,
                                    validator: (_, value) => {
                                      if (value === undefined || value === null || value === '') {
                                        return Promise.reject('กรุณากรอกข้อมูล');
                                      }
                                      if (value < 0) {
                                        return Promise.reject('มากกว่าหรือเท่ากับ 0 เท่านั้น');
                                      }
                                      return Promise.resolve();
                                    },
                                  }]}>
                        <InputNumber />
                      </Form.Item>
                      <Form.Item name={['parcel', 'Valume']} label="จำนวนทั้งหมด" 
                                  rules={[{
                                    required: true,
                                    validator: (_, value) => {
                                      if (value === undefined || value === null || value === '') {
                                        return Promise.reject('กรุณากรอกข้อมูล');
                                      }
                                      if (value < 0) {
                                        return Promise.reject('มากกว่าหรือเท่ากับ 0 เท่านั้น');
                                      }
                                      return Promise.resolve();
                                    },
                                  }]}>
                        <InputNumber />
                      </Form.Item>
                      <Form.Item name={['parcel', 'RoomId']} label="ห้องเก็บพัสดุ" rules={[{ required: true, message: "กรุณาเลือกสถานที่เก็บพัสดุ" }]}>
                        <Select placeholder="เลือกสถานที่จัดเก็บพัสดุ">
                          <Option value={1}>Room 1</Option>
                          <Option value={2}>Room 2</Option>
                        </Select>
                      </Form.Item>
                      <Form.Item name={['parcel', 'ParcelDetail']} label="รายละเอียดพัสดุ" rules={[{ required: true, message: "กรุณากรอกข้อมูลเพิ่มเติม" }]}>
                        <Input.TextArea placeholder="รายละเอียดเพิ่มเติม เช่น สี (ถ้ามี) หรือการนำไปใช้งาน"/>
                      </Form.Item>
                      <Form.Item name={['parcel', 'PLDate']} label="วันที่" rules={[{ required: true, message: "กรุณาเลือกวันที่" }]}>
                        <DatePicker />
                      </Form.Item>
                    </Form>
          </Modal>
      

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
