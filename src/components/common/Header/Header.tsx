import React from 'react'

import './Header.scss'

export const Header = ({ title = "Title", className }: any) => (
    <div className="header">
        <h1 className={`header__title ${className}`}>{title}</h1>
        <hr className="header__bottom-line"/>
    </div>
)