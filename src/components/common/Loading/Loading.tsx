import React from 'react';
import { Spin } from 'antd';

import './Loading.scss'
import { SpinSize } from 'antd/lib/spin';

export const Loading = () => (
    <div className="wrap-loading d-flex-center">
        <Spin size="large" />
    </div>
)

export const LoadingFit = ({size}: {size?: SpinSize}) => (
    <div className="fit d-flex-center">
        <Spin size={size} />
    </div>
)

export const LoadingAdvance = ({loading = false, children}: {loading: boolean, children?: any}) => (
    loading ? <LoadingFit /> : children
)