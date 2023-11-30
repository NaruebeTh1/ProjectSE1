import { Space } from "antd";
import { Footer } from "antd/es/layout/layout";

export default function Footers() {
    return (

            <Footer style={{ textAlign: 'center', position: 'fixed', bottom: 0, width: '100%'}}>
                <Space>
                    <div style={{fontWeight: 'bold'}}> 
                        Project SE ©2023 School Management System 
                    </div>
                </Space>
           </Footer>

  )
}