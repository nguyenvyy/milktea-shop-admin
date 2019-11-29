import React, { useMemo, useState, useEffect } from 'react'
import { IOrder } from '../../../model/IOrder'
import { IProduct } from '../../../model/IProduct'
import { RouteComponentProps } from 'react-router-dom'
import moment from 'moment'
import Table, { ColumnProps } from 'antd/lib/table'
import { Button, Form, Select } from 'antd'

type YearlySalesReportProps = {
    orders: IOrder[],
    products: IProduct[],
    routeProps?: RouteComponentProps
}
type YearRangeType = {
    start: number,
    end: number
}

const YearlySalesReport = ({
    orders, products
}: YearlySalesReportProps) => {
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
            title: 'Year',
            align: 'center',
            dataIndex: 'year',
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
        setYearRange({
            start: yearList[0],
            end: yearList[1]
        })
        setSummary(undefined)
        setContent(undefined)
    }
    const handleCreateReport = () => {
        if (orders.length !== 0 && products.length !== 0) {
            // flag: is created
            setIsCreated(true)
            // create default row of product list
            const rowDefault = products.reduce((acc: any, curr) => {
                acc[curr.id] = 0
                return acc
            }, {})
            const start = new Date(yearRange.start, 1, 1, 0, 0, 0)
            const end = new Date(yearRange.end, 12, 31, 23, 59, 59)
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
            const mergedOder = validOrders.reduce((acc: any, curr, idex) => {
                if (curr.paidAt !== undefined) {
                    const year = moment(curr.paidAt).format("YYYY")
                    if (acc[year] === undefined) {
                        acc[year] = { year, ...rowDefault, timestamp: moment(curr.paidAt).valueOf() }
                    }
                    curr.detail.forEach(item => {
                        acc[year][item.id] = acc[year][item.id] + item.count
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
        <div className="yearly-sales-report">
            <div className="yearly-sales-report__panel">
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
            <div className="yearly-sales-report__content"
            >
                <Table
                    title={() => <b>Yearly Sales Report</b>}
                    loading={(orders.length === 0 || products.length === 0 ? true : false)}
                    bordered
                    dataSource={content}
                    size='small'
                    rowKey={(record, index) => index.toString()}
                    scroll={{ x: `calc(${productColumns.length * 200}px + 50%)`, y: 500 }}
                    pagination={false}
                    columns={columns}
                />
            </div>
            <div className="yearly-sales-report__summary"
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

export default YearlySalesReport