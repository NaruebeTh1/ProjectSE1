import { 
    Document, Page, 
    Text, View, 
    StyleSheet, PDFViewer, 
    Font,
  } from "@react-pdf/renderer";
  import fontTHSarabunNew from "../../../assets/fonts/THSarabunNew.ttf";
  import { 
    InterfaceRoom, 
    InterfaceParcelType,
    InterfaceParcelUnit, 
    ParcelList, } from "../../../interfaces";
  import { useEffect, useState } from "react";
  import { 
    GetParcelList, 
    GetParcelUnit, 
    GetParcelType,
    GetRoom } from "../../../services/https";
  
  function PDFparcelReader() {

    const [dataRoom, setDataRoom] = useState<InterfaceRoom[]>([]);
    const [dataParcelType, setDataParcelType] = useState<InterfaceParcelType[]>([]);
    const [dataParcelList, setDataParcelList] = useState<ParcelList[]>([]);
    const [dataParcelUnit, setDataParcelUnit] = useState<InterfaceParcelUnit[]>([]);
    


    const getParcelType = async () => {
        let res = await GetParcelType();
        if (res) {
            setDataParcelType(res);
        }
      };
      const getRoom = async () => {
        let res = await GetRoom();
        if (res) {
            setDataRoom(res);
        }
      };
    const getParcelUnit = async () => {
      let res = await GetParcelUnit();
      if (res) {
        setDataParcelUnit(res);
      }
    };
    const getParcelList = async () => {
      let res = await GetParcelList();
      if (res) {
        setDataParcelList(res);
      }
    };
  
    useEffect(() => {
        getParcelType();
        getRoom();
        getParcelList();
        getParcelUnit();
    }, []);
  
  
    return (
      <PDFViewer style={styles.viewer}>
        <Document title='รายการพัสดุโรงเรียน'>
          <Page size="A4" style={styles.page}>
  
            <View style={styles.section1}>
              <Text style={styles.textHeader1}> รายการพัสดุโรงเรียน </Text>
            </View>

  
            <View style={styles.table}> 
              <View style={styles.tableRowMain}> 
  
                <View style={styles.tableCol1}> 
                  <Text style={styles.tableCell}> รหัสพัสดุ </Text> 
                </View> 
  
                <View style={styles.tableCol2}> 
                  <Text style={styles.tableCell}> ชื่อรายการพัสดุ </Text> 
                </View> 
  
                <View style={styles.tableCol3}> 
                  <Text style={styles.tableCell}> หน่วยนับ </Text> 
                </View> 
  
                <View style={styles.tableCol4}> 
                  <Text style={styles.tableCell}> ราคาต่อชิ้น </Text> 
                </View> 
  
                <View style={styles.tableCol5}> 
                  <Text style={styles.tableCell}> จำนวน </Text> 
                </View> 
  
                <View style={styles.tableCol6}> 
                  <Text style={styles.tableCell}> ห้องจัดเก็บ </Text> 
                </View> 

                <View style={styles.tableCol7}> 
                  <Text style={styles.tableCell}> ประเภทพัสดุ </Text> 
                </View> 

                <View style={styles.tableCol8}> 
                  <Text style={styles.tableCell}> รายละเอียด </Text> 
                </View> 
  
              </View>
  
  
              <View style={styles.tableRow}>  </View>
              {dataParcelList.map((item, index) => {
                const parcel = dataParcelList.find(parcel => parcel.ID === item.ParcelTypeId);
                const unit = parcel?.ParcelUnitId ? dataParcelUnit.find(unit => unit.ID === parcel.ParcelUnitId) : undefined;
                const type = parcel?.ParcelTypeId ? dataParcelType.find(type => type.ID === parcel.ParcelTypeId) : undefined;
                const room = parcel?.RoomId ?       dataRoom.find(room => room.ID === parcel.RoomId) : undefined;

                return (
                  <View style={styles.tableRow} key={index}>
                    <View style={styles.tableCol1}>
                      <Text style={styles.tableCell}> {item.ParcelNumber} </Text>
                    </View>
                    <View style={styles.tableCol2}>
                      <Text style={styles.tableCell}> {item.ParcelName} </Text>
                    </View>
                    <View style={styles.tableCol3}>
                      <Text style={styles.tableCell}>  {unit?.ParcelUnit || 'N/A'}  </Text>
                    </View>
                    <View style={styles.tableCol4}>
                      <Text style={styles.tableCell}> {item.PricePerPiece} </Text>
                    </View>
                    <View style={styles.tableCol5}>
                      <Text style={styles.tableCell}> {item.Volume} </Text>
                    </View>
                    <View style={styles.tableCol6}>
                      <Text style={styles.tableCell}> {room?.RoomName || 'N/A'} </Text>
                    </View>
                    <View style={styles.tableCol7}>
                      <Text style={styles.tableCell}> {type?.ParcelType || 'N/A'} </Text>
                    </View>
                    <View style={styles.tableCol8}>
                      <Text style={styles.tableCell}> {item.ParcelDetail} </Text>
                    </View>
                  </View>
                );
              })}
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
    viewer: {
      width: "100vw",
      height: "100vh",
    },
    table: { 
      marginLeft:'1cm',
      marginRight:'1cm',
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
    tableRowMain: { 
        margin: "auto", 
        flexDirection: "row" ,
        fontFamily:'THSarabunNew',
        borderBottomWidth: 0,
        borderLeftWidth:0,
        borderRightWidth:0,
        borderTopWidth:0,
    }, 
    row: {
      flexDirection: 'row',
      justifyContent: 'space-between',  
      marginRight:'1cm',
    },
    tableCol1: { 
      width: "8%", 
      borderStyle: "solid", 
      borderWidth: 1, 
      borderLeftWidth: 0, 
      borderTopWidth: 0,
      fontFamily:'THSarabunNew',
      textAlign:'justify',
    },
    tableCol2: { 
      width: "17%", 
      borderStyle: "solid", 
      borderWidth: 1, 
      borderLeftWidth: 0, 
      borderTopWidth: 0,
      fontFamily:'THSarabunNew',
      textAlign:'justify',
    }, 
    tableCol3: { 
      width: "8%", 
      borderStyle: "solid", 
      borderWidth: 1, 
      borderLeftWidth: 0, 
      borderTopWidth: 0,
      fontFamily:'THSarabunNew',
      textAlign:'justify',
    }, 
    tableCol4: { 
      width: "10%", 
      borderStyle: "solid", 
      borderWidth: 1, 
      borderLeftWidth: 0, 
      borderTopWidth: 0,
      fontFamily:'THSarabunNew',
      textAlign:'justify',
    },  
    tableCol5: { 
      width: "10%", 
      borderStyle: "solid", 
      borderWidth: 1, 
      borderLeftWidth: 0, 
      borderTopWidth: 0,
      fontFamily:'THSarabunNew',
      textAlign:'justify',
    },  
    tableCol6: { 
      width: "9%", 
      borderStyle: "solid", 
      borderWidth: 1, 
      borderLeftWidth: 0, 
      borderTopWidth: 0,
      fontFamily:'THSarabunNew',
      textAlign:'justify',
    },  
    tableCol7: { 
        width: "13%", 
        borderStyle: "solid", 
        borderWidth: 1, 
        borderLeftWidth: 0, 
        borderTopWidth: 0,
        fontFamily:'THSarabunNew',
        textAlign:'justify',
    }, 
    tableCol8: { 
        width: "25%", 
        borderStyle: "solid", 
        borderWidth: 1, 
        borderLeftWidth: 0, 
        borderTopWidth: 0,
        fontFamily:'THSarabunNew',
        textAlign:'justify',
    }, 
    tableCell: { 
      margin: "auto", 
      marginTop: 10, 
      fontSize: 14 ,
      fontFamily:'THSarabunNew',
    }
  });
  
  export default PDFparcelReader;