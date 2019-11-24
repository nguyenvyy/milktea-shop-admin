import React from 'react'

import './Header.scss'
interface HeaderProps {
    title: string,
    className?: string
}
export const Header = ({ title, className }: HeaderProps) => (
    <div className="header">
        <h1 className={`header__title ${className}`}>{title}</h1>
        <hr className="header__bottom-line"/>
    </div>
)