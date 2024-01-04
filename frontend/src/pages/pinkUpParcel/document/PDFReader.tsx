import { Document, Page, Text, View, StyleSheet, PDFViewer, Font } from "@react-pdf/renderer";

Font.register({
  family: 'THSarabunNew',
  src: '../assets/fonts/THSarabunNew.ttf',
});
Font.register({
  family: 'Oswald',
  src: 'https://fonts.gstatic.com/s/oswald/v13/Y_TKV6o8WovbUd3m_X9aAA.ttf'
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
  textHeader1: {
    color: "black",
    textAlign:'center',
    fontSize:'12px',
    fontWeight:'bold',
    fontFamily:'Oswald',
  },
  textContent1: {
    color: "black",
    fontSize:'12px',
    textAlign:'right',
    marginRight:'2.54cm',
    fontFamily:'Oswald',
  },
  textContent2: {
    color: "black",
    fontSize:'12px',
    marginRight:'2.54cm',
    marginLeft:'3.75cm',
    fontFamily:'Oswald',
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
  table: { 
    marginLeft:'2.54cm',
    marginRight:'2.54cm',
    marginTop:'1cm',
    width: "auto", 
    borderStyle: "solid", 
    borderWidth: 1, 
    borderRightWidth: 0, 
    borderBottomWidth: 0 
  }, 
  tableRow: { 
    margin: "auto", 
    flexDirection: "row" ,
  }, 
  tableCol: { 
    width: "20%", 
    borderStyle: "solid", 
    borderWidth: 1, 
    borderLeftWidth: 0, 
    borderTopWidth: 0 
  }, 
  tableCell: { 
    margin: "auto", 
    marginTop: 5, 
    fontSize: 8 
  }
});

function PDFPrinter() {

  const billNumber = "123456";
  const currentDate = "2024-01-01";
  const requesterName = "John Doe";
  const purpose = "personal use";

  return (
    <PDFViewer style={styles.viewer}>
      <Document>
        <Page size="A4" style={styles.page}>

          <View style={styles.section1}>
            <Text style={styles.textHeader1}> Material Requisition Form</Text>
          </View>

          <View style={styles.section2}>
            <Text style={styles.textContent1}> 
              Requisition No: {billNumber}
            </Text>
            <Text style={styles.textContent1}> 
              Date: {currentDate}
            </Text>
          </View>

          <View style={styles.section3}>
            <Text style={styles.textContent2}> 
              I, {requesterName}, wish to withdraw this parcel for {purpose}.
            </Text>
          </View>

          <View style={styles.table}> 


            <View style={styles.tableRow}> 

              <View style={styles.tableCol}> 
                <Text style={styles.tableCell}>Product</Text> 
              </View> 

              <View style={styles.tableCol}> 
                <Text style={styles.tableCell}>Type</Text> 
              </View> 

              <View style={styles.tableCol}> 
                <Text style={styles.tableCell}>Type</Text> 
              </View> 

              <View style={styles.tableCol}> 
                <Text style={styles.tableCell}>Period</Text> 
              </View> 

              <View style={styles.tableCol}> 
                <Text style={styles.tableCell}>Price</Text> 
              </View> 

            </View>


            <View style={styles.tableRow}> 

              <View style={styles.tableCol}> 
                <Text style={styles.tableCell}>React-PDF</Text> 
              </View> 

              <View style={styles.tableCol}> 
                <Text style={styles.tableCell}>React-PDF</Text> 
              </View> 

              <View style={styles.tableCol}> 
                <Text style={styles.tableCell}>3 User </Text> 
              </View>

              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>2019-02-20 - 2020-02-19</Text> 
              </View>

              <View style={styles.tableCol}> 
                <Text style={styles.tableCell}>5€</Text> 
              </View> 

            </View> 
          </View>
          
        </Page>
      </Document>
    </PDFViewer>
  );
}

export default PDFPrinter;