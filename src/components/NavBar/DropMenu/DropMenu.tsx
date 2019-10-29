import React, { useMemo } from 'react';

import './DropMenu.scss'
import { ListItem } from '../ListItem/ListItem';

export const DOWN = 'DOWN'
export const RIGHT = 'RIGHT'

export const DropMenu = ({type = DOWN, items, ...rest}: any) => {
    const dropClassType = useMemo(() => {
        switch (type) {
            case DOWN:
                return 'dropdown-menu'
            case RIGHT:
                return 'drop-right-menu'
            default:
                throw new Error('Drop type is invalid')
        }
    }, [type])
    return (
        <div className={`${dropClassType}`}>
            <ListItem className="drop-menu" items={items}  {...rest} />
        </div>
    )
}