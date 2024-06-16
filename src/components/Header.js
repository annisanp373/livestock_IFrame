import React from 'react';
import logo from './../assets/logo.png'; // Sesuaikan path logo dengan struktur aplikasi Anda

const Header = () => {
    return (
        <div className="header">
            <img src={logo} alt="Logo" className="logo" />
        </div>
    );
};

export default Header;
