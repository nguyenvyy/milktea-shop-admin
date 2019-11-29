import React, { useState, useMemo } from 'react'
import { IOrder } from '../../../model/IOrder'
import { IProduct } from '../../../model/IProduct'
import { RouteComponentProps } from 'react-router-dom'
import { Form, DatePicker, Button, Table } from 'antd'
import { RangePickerValue } from 'antd/lib/date-picker/interface'
import { formatDate } from '../../../constant'
import moment from 'moment'
import { ColumnProps } from 'antd/lib/table'

type DailySalesReportProps = {
    orders: IOrder[],
    products: IProduct[],
    routeProps?: RouteComponentProps
}
const DailySalesReport = ({
    orders, products
}: DailySalesReportProps) => {
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
        if (orders.length === 0 || products.length === 0) {
            return false
        }
        return dateRange.length === 2
    }, [dateRange, orders.length, products.length])
    // report content
    const [content, setContent] = useState<any[] | undefined>(undefined)
    const [summary, setSummary] = useState<any[] | undefined>(undefined)
    const salesTotal = useMemo(() => {
        if (summary !== undefined) {
            const salesList: number[] = Object.values(summary[0])
            return salesList.reduce((acc: number, curr: number) => acc + curr)
        }
        return 0
    }, [summary])
    // config table
    // pagination
    const [pagination, setPagination] = useState({pageSize: 20, current: 1})
    const onChangePage = (pagination: any) => {
        setPagination(pagination)
    }
    // columns
    const productColumns = useMemo(() => {
        return products.map(product => {
            const column: ColumnProps<any> = {
                title: product.name,
                align: 'center',
                key: product.id,
                dataIndex: product.id,
                sorter: (a, b) => a[product.id] - b[product.id]
            }
            return column
        })
    }, [products])
    const columns: ColumnProps<any>[] = [
        {
            title: '#',
            align: 'center',
            render: (text, recoed, index) => index + (pagination.current - 1) * pagination.pageSize,
            width: 50,
            fixed: 'left'
        },
        {
            title: 'Date',
            align: 'center',
            dataIndex: 'date',
            width: 100,
            fixed: 'left'
        },
        ...productColumns
    ]

    const summaryColumns = useMemo(() => {
        return products.map(product => {
            const column: ColumnProps<any> = {
                title: product.name,
                align: 'center',
                key: product.id + 'xxx',
                dataIndex: product.id,
            }
            return column
        })
    }, [products])
    const summaryColumnsCofig: ColumnProps<any>[] = [
        ...summaryColumns
    ]


    const handleClearReport = () => {
        setIsCreated(false)
        setDateRange([])
        setSummary(undefined)
        setContent(undefined)
    }

    const handleCreateReport = () => {
        if (orders.length > 0 && products.length > 0 && dateRange[0] !== undefined && dateRange[1] !== undefined) {
            // flag: is created
            setIsCreated(true)
            // create default row of product list
            const rowDefault = products.reduce((acc: any, curr) => {
                acc[curr.id] = 0
                return acc
            }, {})

            // convert moment to date
            const start = dateRange[0].toDate()
            start.setHours(0, 0, 0)
            const end = dateRange[1].toDate()
            end.setHours(23, 59, 59)
            // filter valid orders (paidAt must be between start and end date, idState = "eoMaQTw9eQUykUJ78ifR")
            const validOrders = orders.filter(order => {
                if (order.idState === 'eoMaQTw9eQUykUJ78ifR' && order.paidAt !== undefined) {
                    if (order.paidAt >= start && order.paidAt <= end) {
                        return true
                    }
                }
                return false
            })
            // sumary
            let summary = { ...rowDefault }
            // merge date same
            const mergedOder = validOrders.reduce((acc: any, curr) => {
                if (curr.paidAt !== undefined) {
                    const date = moment(curr.paidAt).format(formatDate)
                    if (acc[date] === undefined) {
                        acc[date] = { date, ...rowDefault, timestamp: moment(curr.paidAt).valueOf() }
                    }
                    curr.detail.forEach(item => {
                        acc[date][item.id] = acc[date][item.id] + item.count
                        summary[item.id] = summary[item.id] + item.count
                    })

                }
                return acc
            }, {})
            // map to record list  && sort by date
            const records = Object.values(mergedOder)
            records.sort((a: any, b: any) => a.timestamp - b.timestamp)

            setContent(records)
            setSummary([summary])
        }
    }

    return (
        <div className="daily-sales-report">
            <div className="daily-sales-report__panel">
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
            <div className="daily-sales-report__content"
            >
                <Table
                    title={() => <b>Daily Sales Report</b>}
                    loading={(orders.length === 0 || products.length === 0 ? true : false)}
                    bordered
                    dataSource={content}
                    size='small'
                    rowKey={(record, index) => index.toString()}
                    scroll={{ x: `calc(${productColumns.length * 200}px + 50%)`, y: 500 }}
                    pagination={pagination}
                    onChange={onChangePage}
                    columns={columns}
                />
            </div>
            <div className="daily-sales-report__summary"
            >
                <Table
                    loading={(orders.length === 0 || products.length === 0 ? true : false)}
                    title={() => <b>Summary</b>}
                    bordered
                    dataSource={summary}
                    size='small'
                    scroll={{ x: `calc(${productColumns.length * 200}px + 50%)` }}
                    pagination={false}
                    columns={summaryColumnsCofig}
                    rowKey={(record, index) => index.toString() + 'xxx'}
                    footer={() => <b>Total: {salesTotal}</b>}
                />
            </div>
        </div>
    )
}

export default DailySalesReport











// const mockup = [
//     { date: '10/11/2019', food1: 1, food2: 1, food3: 1, food4: 1, food5: 1, food6: 1, food7: 1, food8: 1, food9: 1, food10: 1, food11: 1, food12: 1, food13: 1, food14: 1, food15: 1, food16: 1, food17: 1, food18: 1, food19: 1, food20: 1, food21: 1, food22: 10, food23: 1, food24: 2, food25: 1, food26: 1 },
//     { date: '10/11/2019', food1: 1, food2: 1, food3: 1, food4: 1, food5: 1, food6: 1, food7: 1, food8: 1, food9: 1, food10: 1, food11: 1, food12: 1, food13: 1, food14: 1, food15: 1, food16: 1, food17: 1, food18: 1, food19: 1, food20: 1, food21: 1, food22: 10, food23: 1, food24: 2, food25: 1, food26: 1 },
//     { date: '10/11/2019', food1: 1, food2: 1, food3: 1, food4: 1, food5: 1, food6: 1, food7: 1, food8: 1, food9: 1, food10: 1, food11: 1, food12: 1, food13: 1, food14: 1, food15: 1, food16: 1, food17: 1, food18: 1, food19: 1, food20: 1, food21: 1, food22: 10, food23: 1, food24: 2, food25: 1, food26: 1 },
//     { date: '10/11/2019', food1: 1, food2: 1, food3: 1, food4: 1, food5: 1, food6: 1, food7: 1, food8: 1, food9: 1, food10: 1, food11: 1, food12: 1, food13: 1, food14: 1, food15: 1, food16: 1, food17: 1, food18: 1, food19: 1, food20: 1, food21: 1, food22: 10, food23: 1, food24: 2, food25: 1, food26: 1 },
//     { date: '10/11/2019', food1: 1, food2: 1, food3: 1, food4: 1, food5: 1, food6: 1, food7: 1, food8: 1, food9: 1, food10: 1, food11: 1, food12: 1, food13: 1, food14: 1, food15: 1, food16: 1, food17: 1, food18: 1, food19: 1, food20: 1, food21: 1, food22: 10, food23: 1, food24: 2, food25: 1, food26: 1 },
//     { date: '10/11/2019', food1: 1, food2: 1, food3: 1, food4: 1, food5: 1, food6: 1, food7: 1, food8: 1, food9: 1, food10: 1, food11: 1, food12: 1, food13: 1, food14: 1, food15: 1, food16: 1, food17: 1, food18: 1, food19: 1, food20: 1, food21: 1, food22: 10, food23: 1, food24: 2, food25: 1, food26: 1 },
//     { date: '10/11/2019', food1: 1, food2: 1, food3: 1, food4: 1, food5: 1, food6: 1, food7: 1, food8: 1, food9: 1, food10: 1, food11: 1, food12: 1, food13: 1, food14: 1, food15: 1, food16: 1, food17: 1, food18: 1, food19: 1, food20: 1, food21: 1, food22: 10, food23: 1, food24: 2, food25: 1, food26: 1 },
//     { date: '10/11/2019', food1: 1, food2: 1, food3: 1, food4: 1, food5: 1, food6: 1, food7: 1, food8: 1, food9: 1, food10: 1, food11: 1, food12: 1, food13: 1, food14: 1, food15: 1, food16: 1, food17: 1, food18: 1, food19: 1, food20: 1, food21: 1, food22: 10, food23: 1, food24: 2, food25: 1, food26: 1 },
//     { date: '10/11/2019', food1: 1, food2: 1, food3: 1, food4: 1, food5: 1, food6: 1, food7: 1, food8: 1, food9: 1, food10: 1, food11: 1, food12: 1, food13: 1, food14: 1, food15: 1, food16: 1, food17: 1, food18: 1, food19: 1, food20: 1, food21: 1, food22: 10, food23: 1, food24: 2, food25: 1, food26: 1 },
//     { date: '10/11/2019', food1: 1, food2: 1, food3: 1, food4: 1, food5: 1, food6: 1, food7: 1, food8: 1, food9: 1, food10: 1, food11: 1, food12: 1, food13: 1, food14: 1, food15: 1, food16: 1, food17: 1, food18: 1, food19: 1, food20: 1, food21: 1, food22: 10, food23: 1, food24: 2, food25: 1, food26: 1 },
//     { date: '10/11/2019', food1: 1, food2: 1, food3: 1, food4: 1, food5: 1, food6: 1, food7: 1, food8: 1, food9: 1, food10: 1, food11: 1, food12: 1, food13: 1, food14: 1, food15: 1, food16: 1, food17: 1, food18: 1, food19: 1, food20: 1, food21: 1, food22: 10, food23: 1, food24: 2, food25: 1, food26: 1 },
//     { date: '10/11/2019', food1: 1, food2: 1, food3: 1, food4: 1, food5: 1, food6: 1, food7: 1, food8: 1, food9: 1, food10: 1, food11: 1, food12: 1, food13: 1, food14: 1, food15: 1, food16: 1, food17: 1, food18: 1, food19: 1, food20: 1, food21: 1, food22: 10, food23: 1, food24: 2, food25: 1, food26: 1 },
//     { date: '10/11/2019', food1: 1, food2: 1, food3: 1, food4: 1, food5: 1, food6: 1, food7: 1, food8: 1, food9: 1, food10: 1, food11: 1, food12: 1, food13: 1, food14: 1, food15: 1, food16: 1, food17: 1, food18: 1, food19: 1, food20: 1, food21: 1, food22: 10, food23: 1, food24: 2, food25: 1, food26: 1 },
//     { date: '10/11/2019', food1: 1, food2: 1, food3: 1, food4: 1, food5: 1, food6: 1, food7: 1, food8: 1, food9: 1, food10: 1, food11: 1, food12: 1, food13: 1, food14: 1, food15: 1, food16: 1, food17: 1, food18: 1, food19: 1, food20: 1, food21: 1, food22: 10, food23: 1, food24: 2, food25: 1, food26: 1 },
//     { date: '10/11/2019', food1: 1, food2: 1, food3: 1, food4: 1, food5: 1, food6: 1, food7: 1, food8: 1, food9: 1, food10: 1, food11: 1, food12: 1, food13: 1, food14: 1, food15: 1, food16: 1, food17: 1, food18: 1, food19: 1, food20: 1, food21: 1, food22: 10, food23: 1, food24: 2, food25: 1, food26: 1 },
//     { date: '10/11/2019', food1: 1, food2: 1, food3: 1, food4: 1, food5: 1, food6: 1, food7: 1, food8: 1, food9: 1, food10: 1, food11: 1, food12: 1, food13: 1, food14: 1, food15: 1, food16: 1, food17: 1, food18: 1, food19: 1, food20: 1, food21: 1, food22: 10, food23: 1, food24: 2, food25: 1, food26: 1 },
//     { date: '10/11/2019', food1: 1, food2: 1, food3: 1, food4: 1, food5: 1, food6: 1, food7: 1, food8: 1, food9: 1, food10: 1, food11: 1, food12: 1, food13: 1, food14: 1, food15: 1, food16: 1, food17: 1, food18: 1, food19: 1, food20: 1, food21: 1, food22: 10, food23: 1, food24: 2, food25: 1, food26: 1 },
//     { date: '10/11/2019', food1: 1, food2: 1, food3: 1, food4: 1, food5: 1, food6: 1, food7: 1, food8: 1, food9: 1, food10: 1, food11: 1, food12: 1, food13: 1, food14: 1, food15: 1, food16: 1, food17: 1, food18: 1, food19: 1, food20: 1, food21: 1, food22: 10, food23: 1, food24: 2, food25: 1, food26: 1 },
//     { date: '10/11/2019', food1: 1, food2: 1, food3: 1, food4: 1, food5: 1, food6: 1, food7: 1, food8: 1, food9: 1, food10: 1, food11: 1, food12: 1, food13: 1, food14: 1, food15: 1, food16: 1, food17: 1, food18: 1, food19: 1, food20: 1, food21: 1, food22: 10, food23: 1, food24: 2, food25: 1, food26: 1 },
//     { date: '10/11/2019', food1: 1, food2: 1, food3: 1, food4: 1, food5: 1, food6: 1, food7: 1, food8: 1, food9: 1, food10: 1, food11: 1, food12: 1, food13: 1, food14: 1, food15: 1, food16: 1, food17: 1, food18: 1, food19: 1, food20: 1, food21: 1, food22: 10, food23: 1, food24: 2, food25: 1, food26: 1 },
//     { date: '10/11/2019', food1: 1, food2: 1, food3: 1, food4: 1, food5: 1, food6: 1, food7: 1, food8: 1, food9: 1, food10: 1, food11: 1, food12: 1, food13: 1, food14: 1, food15: 1, food16: 1, food17: 1, food18: 1, food19: 1, food20: 1, food21: 1, food22: 10, food23: 1, food24: 2, food25: 1, food26: 1 },
//     { date: '10/11/2019', food1: 1, food2: 1, food3: 1, food4: 1, food5: 1, food6: 1, food7: 1, food8: 1, food9: 1, food10: 1, food11: 1, food12: 1, food13: 1, food14: 1, food15: 1, food16: 1, food17: 1, food18: 1, food19: 1, food20: 1, food21: 1, food22: 10, food23: 1, food24: 2, food25: 1, food26: 1 },
//     { date: '10/11/2019', food1: 1, food2: 1, food3: 1, food4: 1, food5: 1, food6: 1, food7: 1, food8: 1, food9: 1, food10: 1, food11: 1, food12: 1, food13: 1, food14: 1, food15: 1, food16: 1, food17: 1, food18: 1, food19: 1, food20: 1, food21: 1, food22: 10, food23: 1, food24: 2, food25: 1, food26: 1 },
//     { date: '10/11/2019', food1: 1, food2: 1, food3: 1, food4: 1, food5: 1, food6: 1, food7: 1, food8: 1, food9: 1, food10: 1, food11: 1, food12: 1, food13: 1, food14: 1, food15: 1, food16: 1, food17: 1, food18: 1, food19: 1, food20: 1, food21: 1, food22: 10, food23: 1, food24: 2, food25: 1, food26: 1 },
//     { date: '10/11/2019', food1: 1, food2: 1, food3: 1, food4: 1, food5: 1, food6: 1, food7: 1, food8: 1, food9: 1, food10: 1, food11: 1, food12: 1, food13: 1, food14: 1, food15: 1, food16: 1, food17: 1, food18: 1, food19: 1, food20: 1, food21: 1, food22: 10, food23: 1, food24: 2, food25: 1, food26: 1 },
//     { date: '10/11/2019', food1: 1, food2: 1, food3: 1, food4: 1, food5: 1, food6: 1, food7: 1, food8: 1, food9: 1, food10: 1, food11: 1, food12: 1, food13: 1, food14: 1, food15: 1, food16: 1, food17: 1, food18: 1, food19: 1, food20: 1, food21: 1, food22: 10, food23: 1, food24: 2, food25: 1, food26: 1 },
//     { date: '10/11/2019', food1: 1, food2: 1, food3: 1, food4: 1, food5: 1, food6: 1, food7: 1, food8: 1, food9: 1, food10: 1, food11: 1, food12: 1, food13: 1, food14: 1, food15: 1, food16: 1, food17: 1, food18: 1, food19: 1, food20: 1, food21: 1, food22: 10, food23: 1, food24: 2, food25: 1, food26: 1 },
//     { date: '10/11/2019', food1: 1, food2: 1, food3: 1, food4: 1, food5: 1, food6: 1, food7: 1, food8: 1, food9: 1, food10: 1, food11: 1, food12: 1, food13: 1, food14: 1, food15: 1, food16: 1, food17: 1, food18: 1, food19: 1, food20: 1, food21: 1, food22: 10, food23: 1, food24: 2, food25: 1, food26: 1 },
//     { date: '10/11/2019', food1: 1, food2: 1, food3: 1, food4: 1, food5: 1, food6: 1, food7: 1, food8: 1, food9: 1, food10: 1, food11: 1, food12: 1, food13: 1, food14: 1, food15: 1, food16: 1, food17: 1, food18: 1, food19: 1, food20: 1, food21: 1, food22: 10, food23: 1, food24: 2, food25: 1, food26: 1 },
//     { date: '10/11/2019', food1: 1, food2: 1, food3: 1, food4: 1, food5: 1, food6: 1, food7: 1, food8: 1, food9: 1, food10: 1, food11: 1, food12: 1, food13: 1, food14: 1, food15: 1, food16: 1, food17: 1, food18: 1, food19: 1, food20: 1, food21: 1, food22: 10, food23: 1, food24: 2, food25: 1, food26: 1 },
//     { date: '10/11/2019', food1: 1, food2: 1, food3: 1, food4: 1, food5: 1, food6: 1, food7: 1, food8: 1, food9: 1, food10: 1, food11: 1, food12: 1, food13: 1, food14: 1, food15: 1, food16: 1, food17: 1, food18: 1, food19: 1, food20: 1, food21: 1, food22: 10, food23: 1, food24: 2, food25: 1, food26: 1 },
//     { date: '10/11/2019', food1: 1, food2: 1, food3: 1, food4: 1, food5: 1, food6: 1, food7: 1, food8: 1, food9: 1, food10: 1, food11: 1, food12: 1, food13: 1, food14: 1, food15: 1, food16: 1, food17: 1, food18: 1, food19: 1, food20: 1, food21: 1, food22: 10, food23: 1, food24: 2, food25: 1, food26: 1 },
//     { date: '10/11/2019', food1: 1, food2: 1, food3: 1, food4: 1, food5: 1, food6: 1, food7: 1, food8: 1, food9: 1, food10: 1, food11: 1, food12: 1, food13: 1, food14: 1, food15: 1, food16: 1, food17: 1, food18: 1, food19: 1, food20: 1, food21: 1, food22: 10, food23: 1, food24: 2, food25: 1, food26: 1 },
//     { date: '10/11/2019', food1: 1, food2: 1, food3: 1, food4: 1, food5: 1, food6: 1, food7: 1, food8: 1, food9: 1, food10: 1, food11: 1, food12: 1, food13: 1, food14: 1, food15: 1, food16: 1, food17: 1, food18: 1, food19: 1, food20: 1, food21: 1, food22: 10, food23: 1, food24: 2, food25: 1, food26: 1 },
//     { date: '10/11/2019', food1: 1, food2: 1, food3: 1, food4: 1, food5: 1, food6: 1, food7: 1, food8: 1, food9: 1, food10: 1, food11: 1, food12: 1, food13: 1, food14: 1, food15: 1, food16: 1, food17: 1, food18: 1, food19: 1, food20: 1, food21: 1, food22: 10, food23: 1, food24: 2, food25: 1, food26: 1 }
// ]
// mockup colum
// return Array.from({ length: 26 }, (v, i) => i + 1).map(item => {
//     const column: ColumnProps<any> = {
//         title: `YAKULT CHANH LEO${item}`,
//         width: 200,
//         align: 'center',
//         key: `food${item}`,
//         dataIndex: `food${item}`,
//         sorter: (a, b) => a - b
//     }
//     return column
// })