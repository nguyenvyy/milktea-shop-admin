import React from 'react';
import { Spin } from 'antd';

import './Loading.scss'

export const Loading = () => (
    <div className="wrap-loading d-flex-center">
        <Spin size="large" />
    </div>
)

export const LoadingFit = () => (
    <div className="fit d-flex-center">
        <Spin size="large" />
    </div>
)

export const LoadingAdvance = ({loading = false, children}: {loading: boolean, children?: any}) => (
    loading ? <LoadingFit /> : children
)