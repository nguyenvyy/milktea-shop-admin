import React from 'react'

export const ListItem = ({ className, items, collapsed}: any) => (
    <ul className={className}>
        {items.map(({Component, title, to, items, ...rest}: any, index: number) => (
            <Component  title={title} to={to} items={items} key={index} collapsed={collapsed} {...rest} />
        ))}
    </ul>
) 