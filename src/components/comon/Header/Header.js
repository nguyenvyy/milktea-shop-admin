import React from 'react'

import './Header.scss'

export const Header = ({ title = "Title" }) => (
    <div className="header">
        <h1 className="header__titile">{title}</h1>
        <hr className="header__bottom-line"/>
    </div>
)