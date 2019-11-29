import React, { useMemo, useState, useEffect } from 'react'
import { IOrder } from '../../../model/IOrder'
import moment from 'moment'
import Table, { ColumnProps } from 'antd/lib/table'
import { Button, Form, Select } from 'antd'
import { RevenueReportType } from '../../../model/RevenueReportType'
import { formatVND } from '../../utils'
type YearRangeType = {
    start: number,
    end: number
}
const YearlyRevenueReport = ({ orders }: { orders: IOrder[] }) => {
    const yearList = useMemo(() => {
        const curr = new Date()
        const startYear = 2012
        const endYear = curr.getFullYear()
        return Array.from({ length: endYear - startYear + 1 }, (v: number, index) => startYear + index)
    }, [])
    // clear report
    const [isCreated, setIsCreated] = useState(false)
    // year range
    const [yearRange, setYearRange] = useState<YearRangeType>({
        start: yearList[0],
        end: yearList[1]
    })
    // reverse position when start > end
    useEffect(() => {
        if (yearRange.start > yearRange.end) {
            setYearRange({
                start: yearRange.end,
                end: yearRange.start
            })
        }
    }, [yearRange])

    // handle change year range
    const onChangeYearRange = (value: number, name: string) => {
        console.log(typeof value)
        setYearRange({
            ...yearRange,
            [name]: value
        })
    }
    // config table
    // pagination
    const [pagination, setPagination] = useState({ pageSize: 20, current: 1 })
    const onChangePage = (pagination: any) => {
        setPagination(pagination)
    }
    // columns
    const columns: ColumnProps<RevenueReportType>[] = [
        {
            title: '#',
            align: 'center',
            render: (text, recoed, index) => index + (pagination.current - 1) * pagination.pageSize,
            width: 50,
            key: 'index',
        },
        {
            title: 'Year',
            align: 'center',
            dataIndex: 'date',
            key: 'date',
            width: 100,
        },
        {
            title: 'Number of _',
            children: [
                {
                    title: 'Orders',
                    dataIndex: 'orders',
                    key: 'orders',
                    align: 'center',
                    sorter: (a: RevenueReportType, b: RevenueReportType) => a.orders - b.orders,
                },
                {
                    title: 'Successed Orders',
                    dataIndex: 'success',
                    key: 'success',
                    sorter: (a: RevenueReportType, b: RevenueReportType) => a.success - b.success,
                    align: 'center'
                },
                {
                    title: 'Cancled Orders',
                    dataIndex: 'cancels',
                    key: 'cancels',
                    sorter: (a: RevenueReportType, b: RevenueReportType) => a.cancels - b.cancels,
                    align: 'center'
                },
                {
                    title: 'Returned Orders',
                    dataIndex: 'returns',
                    key: 'returns',
                    sorter: (a: RevenueReportType, b: RevenueReportType) => a.returns - b.returns,
                    align: 'center'
                }
            ]
        },
        {
            title: 'Total Revenue',
            dataIndex: 'total',
            render: total => formatVND(total),
            sorter: (a: RevenueReportType, b: RevenueReportType) => a.total - b.total,
            align: 'center'
        }
    ]

    const summaryColumns: ColumnProps<RevenueReportType>[] = [
        {
            title: 'Orders',
            dataIndex: 'orders',
            align: 'center'
        },
        {
            title: 'Successed Orders',
            dataIndex: 'success',
            align: 'center'
        },
        {
            title: 'Cancled Orders',
            dataIndex: 'cancels',
            align: 'center'
        },
        {
            title: 'Returned Orders',
            dataIndex: 'returns',
            align: 'center'
        },
        {
            title: 'Total Revenue',
            dataIndex: 'total',
            render: total => formatVND(total),
            align: 'center'
        }
    ]

    const [content, setContent] = useState<any[] | undefined>(undefined)
    const [summary, setSummary] = useState<any[] | undefined>(undefined)

    const handleClearReport = () => {
        setIsCreated(false)
        setYearRange({
            start: yearList[0],
            end: yearList[1]
        })
        setSummary(undefined)
        setContent(undefined)
    }

    const handleCreateReport = () => {
        if (orders.length > 0) {
            // flag: is created
            setIsCreated(true)
            // create default row of product list

            const start = new Date(yearRange.start, 1, 1, 0, 0, 0)
            const end = new Date(yearRange.end, 12, 31, 23, 59, 59)
            // filter valid orders (paidAt must be between start and end date, idState = "eoMaQTw9eQUykUJ78ifR")
            const validOrders = orders.filter(order => {
                if (order.paidAt !== undefined) {
                    if (order.paidAt >= start && order.paidAt <= end) {
                        return true
                    }
                }
                return false
            })
            // sumary
            let summary: RevenueReportType = {
                date: '',
                orders: 0,
                cancels: 0,
                returns: 0,
                total: 0,
                success: 0,
                timestamp: 0
            }
            // default recoed
            const record: RevenueReportType = {
                date: '',
                orders: 0,
                cancels: 0,
                returns: 0,
                total: 0,
                success: 0,
                timestamp: 0
            }
            // merge date same
            const mergedOder = validOrders.reduce((acc: any, curr) => {
                if (curr.paidAt !== undefined) {
                    const date = moment(curr.paidAt).format('YYYY')
                    if (acc[date] === undefined) {
                        acc[date] = { ...record, date, timestamp: moment(curr.paidAt).valueOf() }
                    }
                    acc[date].orders = acc[date].orders + 1
                    switch (curr.idState) {
                        case 'eoMaQTw9eQUykUJ78ifR': { // success
                            acc[date].success = acc[date].success + 1
                            acc[date].total = acc[date].total + curr.priceTotal
                            break;
                        }
                        case 'pqVXUj9onmC07620vaZD': {  // cancel
                            acc[date].cancels = acc[date].cancels + 1
                            break;
                        }
                        case 'yrYfuApHLrAmr2UijfUf': { // return
                            acc[date].returns = acc[date].returns + 1
                            break;
                        }
                        default:
                            break;
                    }
                }
                return acc
            }, {})
            // map to record list  && sort by date
            const records: RevenueReportType[] = Object.values(mergedOder)
            records.forEach(item => {
                summary.orders = summary.orders + item.orders
                summary.cancels = summary.cancels + item.cancels
                summary.success = summary.success + item.success
                summary.returns = summary.returns + item.returns
                summary.total = summary.total + item.total
            })
            records.sort((a: any, b: any) => a.timestamp - b.timestamp)
            setContent(records)
            setSummary([summary])
        }
    }

    return (
        <div className="yearly-revenue-report">
            <div className="yearly-revenue-report__panel">
                <Form layout="inline"  >
                    <Form.Item
                        label="Start year"
                    >
                        <Select
                            className="select-year"
                            value={yearRange.start}
                            onChange={(value: number) => onChangeYearRange(value, 'start')}
                        >
                            {yearList.map(item => <Select.Option key={item} value={item}>{item}</Select.Option>)}
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label="End year"
                    >
                        <Select
                            className="select-year"
                            value={yearRange.end}
                            onChange={(value: number) => onChangeYearRange(value, 'end')}
                        >
                            {yearList.map(item => <Select.Option key={item} value={item}>{item}</Select.Option>)}
                        </Select>
                    </Form.Item>
                    <Form.Item
                    >
                        <Button onClick={isCreated ? handleClearReport : handleCreateReport}>
                            {isCreated ? 'Clear' : 'Create'}
                        </Button>
                    </Form.Item>
                </Form>
            </div>
            <div className="yearly-revenue-report__content"
            >
                <Table
                    title={() => <b>Yearly Revenue Report</b>}
                    loading={(orders.length === 0 ? true : false)}
                    bordered
                    dataSource={content}
                    size='small'
                    rowKey={record => record.date}
                    scroll={{ y: 500 }}
                    pagination={pagination}
                    onChange={onChangePage}
                    columns={columns}
                />
            </div>
            <div className="yearly-revenue-report__summary"
            >
                <Table
                    loading={(orders.length === 0 ? true : false)}
                    title={() => <b>Summary</b>}
                    bordered
                    dataSource={summary}
                    size='small'
                    pagination={false}
                    columns={summaryColumns}
                />
            </div>
        </div>
    )
}

export default YearlyRevenueReport