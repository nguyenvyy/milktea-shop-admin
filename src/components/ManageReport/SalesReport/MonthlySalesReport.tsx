import React, { useState, useMemo, useEffect } from 'react'
import { IOrder } from '../../../model/IOrder'
import { IProduct } from '../../../model/IProduct'
import { RouteComponentProps } from 'react-router-dom'
import { Form, Button, DatePicker, Table } from 'antd'
import moment, { Moment } from 'moment'
import { formatMonth } from '../../../constant'
import { ColumnProps } from 'antd/lib/table'

type MonthlySalesReportProps = {
    orders: IOrder[],
    products: IProduct[],
    routeProps?: RouteComponentProps
}

type MonthRangeType = {
    start: Moment | undefined,
    end: Moment | undefined
}

const MonthlySalesReport = ({
    orders, products
}: MonthlySalesReportProps) => {
    // month range
    const [monthRange, setMonthRange] = useState<MonthRangeType>({
        start: undefined,
        end: undefined
    })
    // clear report
    const [isCreated, setIsCreated] = useState(false)
    // reverse position when start > end
    useEffect(() => {
        if(monthRange.start !== undefined && monthRange.end !== undefined && monthRange.start > monthRange.end) {
            setMonthRange({
                start: monthRange.end,
                end: monthRange.start
            })
        } 
    }, [monthRange])
    // handle change month range
    const onChangeMonthRange = (value: null | Moment, name: string) => {
        let realValue: null | Moment | undefined = value
        if(realValue === null ) {
            realValue = undefined
        }
        setMonthRange({
            ...monthRange,
            [name]: realValue
        })
    }
    // validate month range
    const monthRangeValid = useMemo(() => {
        if (orders.length === 0 || products.length === 0) {
            return false
        }
        return monthRange.end !== undefined && monthRange.start !== undefined
    }, [monthRange, orders.length, products.length])

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
            title: 'Month',
            align: 'center',
            dataIndex: 'month',
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
        setMonthRange({
            start: undefined,
            end: undefined
        })
        setSummary(undefined)
        setContent(undefined)
    }
    const handleCreateReport = () => {
        if (orders.length !== 0 && products.length !== 0 && monthRange.start !== undefined && monthRange.end !== undefined) {
            // flag: is created
            setIsCreated(true)
            // create default row of product list
            const rowDefault = products.reduce((acc: any, curr) => {
                acc[curr.id] = 0
                return acc
            }, {})

            // convert moment to date 
            const start = monthRange.start.toDate()
            start.setDate(1)
            start.setHours(0, 0, 0)
            const end = monthRange.end.clone().add(1, 'months').toDate()
            end.setDate(1)
            end.setHours(0, 0, 0)
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
                    const month = moment(curr.paidAt).format(formatMonth)
                    if (acc[month] === undefined) {
                        acc[month] = { month, ...rowDefault, timestamp: moment(curr.paidAt).valueOf() }
                    }
                    curr.detail.forEach(item => {
                        acc[month][item.id] = acc[month][item.id] + item.count
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
        <div className="monthly-sales-report">
            <div className="monthly-sales-report__panel">
                <Form layout="inline"  >
                    <Form.Item
                        label="Start month"
                        help={monthRange.start !== undefined ? '' : 'month are not valid'}
                        hasFeedback
                        validateStatus={monthRange.start !== undefined ? 'success' : 'error'}
                    > 
                        <DatePicker.MonthPicker
                        value={monthRange.start}
                        format={formatMonth}
                        onChange={value => onChangeMonthRange(value, 'start')}
                        />
                    </Form.Item>
                    <Form.Item
                        label="End month"
                        help={monthRange.end !== undefined ? '' : 'month are not valid'}
                        hasFeedback
                        validateStatus={monthRange.end !== undefined ? 'success' : 'error'}
                    > 
                        <DatePicker.MonthPicker
                        value={monthRange.end}
                        format={formatMonth}
                        onChange={value => onChangeMonthRange(value, 'end')}
                        />
                    </Form.Item>
                    <Form.Item
                    >
                        <Button disabled={monthRangeValid ? false : true} onClick={isCreated ?  handleClearReport : handleCreateReport}>
                            {isCreated ?  'Clear' : 'Create'}
                            </Button>
                    </Form.Item>
                </Form>
            </div>
            <div className="monthly-sales-report__content"
            >
                <Table
                    title={() => <b>Monthly Sales Report</b>}
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
            <div className="monthly-sales-report__summary"
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

export default MonthlySalesReport