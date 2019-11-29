import React, { useState, useMemo } from 'react'
import { IOrder } from '../../../model/IOrder'
import { RangePickerValue } from 'antd/lib/date-picker/interface'
import Table, { ColumnProps } from 'antd/lib/table'
import { formatVND } from '../../utils'
import { RevenueReportType } from '../../../model/RevenueReportType'
import { Form, DatePicker, Button } from 'antd'
import { formatDate } from '../../../constant'
import moment from 'moment'


const DailyRevenueReport = ({ orders }: { orders: IOrder[] }) => {
    // clear report
    const [isCreated, setIsCreated] = useState(false)
    // store start date and end date
    const [dateRange, setDateRange] = useState<RangePickerValue>([])
    // handle change dates
    const onChangeDateRange = (dates: RangePickerValue) => {
        setDateRange(dates)
    }
    // validate 
    const dateRangeValid = useMemo(() => {
        if (orders.length === 0) {
            return false
        }
        return dateRange.length === 2
    }, [dateRange, orders.length])
    // report content
    const [content, setContent] = useState<any[] | undefined>(undefined)
    const [summary, setSummary] = useState<any[] | undefined>(undefined)

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
            title: 'Date',
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
    const handleClearReport = () => {
        setIsCreated(false)
        setDateRange([])
        setSummary(undefined)
        setContent(undefined)
    }

    const handleCreateReport = () => {
        if (orders.length > 0 && dateRange[0] !== undefined && dateRange[1] !== undefined) {
            // flag: is created
            setIsCreated(true)
            // create default row of product list

            // convert moment to date
            const start = dateRange[0].toDate()
            start.setHours(0, 0, 0)
            const end = dateRange[1].toDate()
            end.setHours(23, 59, 59)
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
                    const date = moment(curr.paidAt).format(formatDate)
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
        <div className="daily-revenue-report">
            <div className="daily-revenue-report__panel">
                <Form layout="inline"  >
                    <Form.Item
                        label="Select start date and end date"
                        help={dateRangeValid ? '' : 'Dates are not valid'}
                        hasFeedback
                        validateStatus={dateRangeValid ? 'success' : 'error'}
                    >
                        <DatePicker.RangePicker
                            value={dateRange}
                            onChange={onChangeDateRange}
                            format={formatDate}
                        />
                    </Form.Item>
                    <Form.Item
                    >
                        <Button disabled={dateRangeValid ? false : true} onClick={isCreated ? handleClearReport : handleCreateReport}>
                            {isCreated ? 'Clear' : 'Create'}
                        </Button>
                    </Form.Item>
                </Form>
            </div>
            <div className="daily-revenue-report__content"
            >
                <Table
                    title={() => <b>Daily Revenue Report</b>}
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
            <div className="daily-revenue-report__summary"
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

export default DailyRevenueReport