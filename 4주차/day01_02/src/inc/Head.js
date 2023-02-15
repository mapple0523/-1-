import React, { useState, useEffect } from 'react';

function Header(props) {

    return (
        <>
            <h3>MENU</h3>
            <p>
                <a href="/">Main</a><br/>
                <a href="/profile">Profile</a><br/>
                <a href="/gallery">Gallery</a><br/>
                <a href="/lecture">Lecture</a><br/>
                <a href="/contact">Contact</a><br/>
                <a href="/abc">abc</a><br/>
                <a href="/abcd">abcd</a><br/>
            </p>
            <hr/>
        </>
    )
}

export default Header;