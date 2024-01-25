import { 
  Document, Page, 
  Text, View, 
  StyleSheet, PDFViewer, 
  Font,
} from "@react-pdf/renderer";
import fontTHSarabunNew from "../../../assets/font/THSarabunNew.ttf";
import { 
  ExportParcelList, 
  InterfaceParcelUnit, 
  InterfacePersonnel, 
  ParcelList, 
  PickUpParcelList } from "../../../interfaces";
import { useEffect, useState } from "react";
import { 
  GetExportParcelListByPickUpParcelListId, 
  GetParcelList, GetParcelUnit, GetPersonnel, 
  GetPickUpParcelListById } from "../../../services/https";
import { useParams } from "react-router-dom";
import moment from 'moment-timezone';
import 'moment/locale/th'; // Import Thai locale
moment.locale('th'); // Set Thai locale

function PDFReader() {

  const [dataPickUpParcelList, setDataPickUpParcelList] = useState<PickUpParcelList>();
  const [exportParcelList, setExportParcelList] = useState<ExportParcelList[]>([]);
  const [dataParcelList, setDataParcelList] = useState<ParcelList[]>([]);
  const [dataParcelUnit, setDataParcelUnit] = useState<InterfaceParcelUnit[]>([]);
  

  let { id } = useParams();
  
  const getPickUpParcelListById = async () => {
    let res = await GetPickUpParcelListById(Number(id));
      if (res) {
        setDataPickUpParcelList(res);

      }
  };
  const getdataPersonnels = async () => {
    let res = await GetPersonnel();
    if (res) {
      setDataPersonnels(res);
    }
  };
  const getParcelUnit = async () => {
    let res = await GetParcelUnit();
    if (res) {
      setDataParcelUnit(res);
    }
  };

  const getExportParcelListByPickUpParcelListId = async () => {
    try {
      const res = await GetExportParcelListByPickUpParcelListId(Number(id));
      if (res) {
        setExportParcelList(res);
      }
    } catch (error) {
      console.error('Error fetching ExportParcelList', error);
    }
  };
  const getParcelList = async () => {
    let res = await GetParcelList();
    if (res) {
      setDataParcelList(res);
    }
  };

  useEffect(() => {
    getPickUpParcelListById();
    getdataPersonnels();
    getExportParcelListByPickUpParcelListId();
    getParcelList();
    getParcelUnit();
  }, []);

  const [dataPersonnels, setDataPersonnels] = useState<InterfacePersonnel[]>([]);
  const getdataPersonnelsName = (id: number) => {
    const personnels: InterfacePersonnel | undefined = dataPersonnels.find((personnel: InterfacePersonnel) => personnel.ID === id);
    return personnels ? `${personnels.TitleName}${personnels.FirstName} ${personnels.LastName}` : 'Unknown Personnel';
  };
  

  return (
    <PDFViewer style={styles.viewer}>
      <Document title={`ใบเบิกจ่ายพัสดุ เลขที่ ${dataPickUpParcelList?.BillNumber || 'N/A'}`}>
        <Page size="A4" style={styles.page}>

          <View style={styles.section1}>
            <Text style={styles.textHeader1}> ใบเบิกจ่ายพัสดุ </Text>
          </View>

          <View style={styles.section2}>
            <Text style={styles.textContent1}> 
              ใบเบิกเลขที่ {dataPickUpParcelList?.BillNumber || 'N/A'}
            </Text>
            <Text style={styles.textContent1}> 
              วันที่ {dataPickUpParcelList?.PUPLDate ? 
              moment(dataPickUpParcelList.PUPLDate).add(543, 'years').format('DD MMMM พ.ศ. YYYY') : 'N/A'}
            </Text>
          </View>

          <View style={styles.section3}>
            <Text style={styles.textContent2}> {'       '}
              ข้าพเจ้า {dataPickUpParcelList?.PersonnelId ? getdataPersonnelsName(dataPickUpParcelList.PersonnelId) : 'N/A'}
              {'  '}
              มีความประสงค์ในการขอเบิกรายการพัสดุต่อไปนี้ เพื่อ {dataPickUpParcelList?.DetailOfRequest || 'N/A'}
            </Text>
          </View>

          <View style={styles.table}> 
            <View style={styles.tableRow}> 

              <View style={styles.tableCol1}> 
                <Text style={styles.tableCell}> ลำดับที่ </Text> 
              </View> 

              <View style={styles.tableCol2}> 
                <Text style={styles.tableCell}> รายการพัสดุ </Text> 
              </View> 

              <View style={styles.tableCol3}> 
                <Text style={styles.tableCell}> หน่วยนับ </Text> 
              </View> 

              <View style={styles.tableCol4}> 
                <Text style={styles.tableCell}> จำนวนที่ขอเบิก </Text> 
              </View> 

              <View style={styles.tableCol5}> 
                <Text style={styles.tableCell}> จำนวนที่อนุมัติ </Text> 
              </View> 

              <View style={styles.tableCol6}> 
                <Text style={styles.tableCell}>หมายเหตุ</Text> 
              </View> 

            </View>


            <View style={styles.tableRow}>  </View>
            {exportParcelList.map((item, index) => {
              const parcel = dataParcelList.find(parcel => parcel.ID === item.ParcelListId);
              const unit = parcel?.ParcelUnitId ? dataParcelUnit.find(unit => unit.ID === parcel.ParcelUnitId) : undefined;
              return (
                <View style={styles.tableRow} key={index}>
                  <View style={styles.tableCol1}>
                    <Text style={styles.tableCell}> {index + 1} </Text>
                  </View>
                  <View style={styles.tableCol2}>
                    <Text style={styles.tableCell}> {parcel?.ParcelName || 'N/A'} </Text>
                  </View>
                  <View style={styles.tableCol3}>
                    <Text style={styles.tableCell}> {unit?.ParcelUnit || 'N/A'} </Text>
                  </View>
                  <View style={styles.tableCol4}>
                    <Text style={styles.tableCell}> {item.ExportVolume} </Text>
                  </View>
                  <View style={styles.tableCol5}>
                    <Text style={styles.tableCell}> {item.ExportVolume} </Text>
                  </View>
                  <View style={styles.tableCol6}>
                    <Text style={styles.tableCell}>  </Text>
                  </View>
                </View>
              );
            })}
            </View>


          <View style={styles.section4}>
            <View style={styles.row}>
              <Text style={styles.textContentpersonnel}> 
                (ลงชื่อ).......................................ผู้เบิก
              </Text>
              <Text style={styles.textContentpersonnel3a}> 
                (ลงชื่อ).......................................ผู้ตรวจ
              </Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.textContentpersonnel2}> 
                ({dataPickUpParcelList?.PersonnelId ? getdataPersonnelsName(dataPickUpParcelList.PersonnelId) : 'N/A'})
              </Text>
              <Text style={styles.textContentpersonnel3b}> 
                (......................................)
              </Text>
            </View>
          </View>
        </Page>
      </Document> 
    </PDFViewer>
  );
}

Font.register({
  family: "THSarabunNew",
  src: fontTHSarabunNew,
});

const styles = StyleSheet.create({
  page: {
    backgroundColor: "#ffff",
    width: "100%",
    height: "100%",
    flexDirection: 'column',
  },
  section1: {
    marginTop:'2.54cm',
  },
  section2: {
    marginTop:'1cm',
  },
  section3: {
    marginTop:'1cm',
  },
  section4: {
    marginTop:'1cm',
  },
  textHeader1: {
    color: "black",
    textAlign:'center',
    fontSize:'20px',
    fontWeight:'bold',
    fontFamily:'THSarabunNew',
  },
  textContent1: {
    color: "black",
    fontSize:'16px',
    textAlign:'right',
    marginRight:'2.54cm',
    fontFamily:'THSarabunNew',
  },
  textContent2: {
    color: "black",
    fontSize:'16px',
    marginRight:'2.54cm',
    marginLeft:'2.54cm',
    fontFamily:'THSarabunNew',
    textAlign:'justify',
  },
  textContent3: {
    fontFamily: 'THSarabunNew',
  },
  textFooter: {
    fontFamily: 'THSarabunNew',
  },
  viewer: {
    width: "100vw",
    height: "100vh",
  },
  textContentpersonnel: {
    color: "black",
    fontSize:'16px',
    marginRight:'2.54cm',
    marginLeft:'2.54cm',
    fontFamily:'THSarabunNew',
    marginTop:'3cm',
  },
  textContentpersonnel2: {
    color: "black",
    fontSize:'16px',
    marginRight:'2.54cm',
    marginLeft:'3.5cm',
    fontFamily:'THSarabunNew',
  },
  textContentpersonnel3a: {
    color: "black",
    fontSize:'16px',
    textAlign:'right',
    marginRight:'2.54cm',
    marginLeft:'3.75cm',
    marginTop:'3cm',
    fontFamily:'THSarabunNew',
  },
  textContentpersonnel3b: {
    color: "black",
    fontSize:'16px',
    textAlign:'right',
    marginRight:'1.8cm',
    marginLeft:'3.75cm',
    fontFamily:'THSarabunNew',
  },
  table: { 
    marginLeft:'2.54cm',
    marginRight:'2.54cm',
    marginTop:'1cm',
    width: "auto", 
    borderStyle: "solid", 
    borderWidth: 1, 
    borderRightWidth: 0, 
    borderBottomWidth: 0 ,
    fontFamily:'THSarabunNew',
  }, 
  tableRow: { 
    margin: "auto", 
    flexDirection: "row" ,
    fontFamily:'THSarabunNew',
  }, 
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',  
    marginRight:'2.54cm',
  },
  tableCol1: { 
    width: "10%", 
    borderStyle: "solid", 
    borderWidth: 1, 
    borderLeftWidth: 0, 
    borderTopWidth: 0,
    fontFamily:'THSarabunNew',
  },
  tableCol2: { 
    width: "30%", 
    borderStyle: "solid", 
    borderWidth: 1, 
    borderLeftWidth: 0, 
    borderTopWidth: 0,
    fontFamily:'THSarabunNew',
  }, 
  tableCol3: { 
    width: "10%", 
    borderStyle: "solid", 
    borderWidth: 1, 
    borderLeftWidth: 0, 
    borderTopWidth: 0,
    fontFamily:'THSarabunNew',
  }, 
  tableCol4: { 
    width: "15%", 
    borderStyle: "solid", 
    borderWidth: 1, 
    borderLeftWidth: 0, 
    borderTopWidth: 0,
    fontFamily:'THSarabunNew',
  },  
  tableCol5: { 
    width: "15%", 
    borderStyle: "solid", 
    borderWidth: 1, 
    borderLeftWidth: 0, 
    borderTopWidth: 0,
    fontFamily:'THSarabunNew',
  },  
  tableCol6: { 
    width: "20%", 
    borderStyle: "solid", 
    borderWidth: 1, 
    borderLeftWidth: 0, 
    borderTopWidth: 0,
    fontFamily:'THSarabunNew',
  },  
  tableCell: { 
    margin: "auto", 
    marginTop: 10, 
    fontSize: 14 ,
    fontFamily:'THSarabunNew',
  }
});

export default PDFReader;