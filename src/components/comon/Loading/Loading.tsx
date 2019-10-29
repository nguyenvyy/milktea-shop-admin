import React from 'react';
import { Spin } from 'antd';

import './Loading.scss'

export const Loading = () => (
    <div className="wrap-loading d-flex-center">
        <Spin size="large" />
    </div>
)