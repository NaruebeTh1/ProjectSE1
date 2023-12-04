import React from 'react';
import './footerStyle.css';
import {
    GithubOutlined,
    FacebookOutlined,
    GitlabOutlined,
    GoogleOutlined,
  } from '@ant-design/icons';
const Footers: React.FC = () => {
  return (
    <div className="footer-basic" style={{ textAlign: 'center', bottom: 0, width: '100%'}}>
      <footer>
        <div className="social" style={{marginTop:'10px'}}>
          <a href="https://github.com/dashboard"> <GithubOutlined /> </a>
          <a href="https://www.facebook.com/"> <FacebookOutlined /> </a>
          <a href="https://about.gitlab.com/"> <GitlabOutlined /> </a>
          <a href="https://www.google.com/?authuser=0"> <GoogleOutlined /> </a>
        </div>

        <p className="copyright"> Project SE ©2023 School Management System </p>
      </footer>
    </div>
  );
};

export default Footers;
