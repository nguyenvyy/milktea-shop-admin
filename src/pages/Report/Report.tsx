import React, { Suspense } from 'react'
import { Switch } from 'react-router-dom'
import { Loading } from '../../components/common/Loading/Loading'
import { RouteWithSubRoutes } from '../../routes/RouteWithSubRoutes'

const Report = ({ routes= [] }) => {
    return (
        <Suspense fallback={<Loading />}>
            <Switch>
                {routes.map((route, index) => (
                    <RouteWithSubRoutes key={index} {...route} />
                ))}
            </Switch>
        </Suspense>
    )
}
export default Report



/*
const [isLoading, setIsLoading] = useState(false)
const handleChangeProcessedState = (idState = 'eoMaQTw9eQUykUJ78ifR') => {
    const randomDay = getRandom(1, 30)
    const randomMonth = getRandom(1, 12)
    const randomYear = getRandom(2019, 2019)
    const ramdomHour = getRandom(8, 20)
    setIsLoading(true)
    const order: IOrder = {
        createAt: new Date(randomYear, randomMonth, randomDay, ramdomHour),
        detail: [
            {
                count: 7,
                id: 'EvJdTn8lq6GC3pG9jKOP',
                price: 49000
            },
            {
                count: 5,
                id: '5aXdrT8vU6myTId7M2lA',
                price: 30000
            },
            {
                count: 5,
                id: 'eP1lp2DDdidmq5XSMtvZ',
                price: 30000
            },
            {
                count: 9,
                id: 'Wq73MlSzgMOvjbPNPmSG',
                price: 48000
            },
            {
                count: 7,
                id: 'fAfX5oKaMYI9ewKchHwa',
                price: 30000
            },
            {
                count: 5,
                id: 'vrz7QQiO5eUlc6fm4tYD',
                price: 45000
            },
            {
                count: 9,
                id: '5TyHLDwuVesGXgt6Tay1',
                price: 29000
            },
            {
                count: 6,
                id: 'S5QzyvYoaBHNNFRh7h4m',
                price: 49000
            },
            {
                count: 7,
                id: 'TswjycKERRVhq2dsWv5d',
                price: 49000
            },
            {
                count: 5,
                id: '3NpQYRst7aYb3aThzYzr',
                price: 49000
            },
            {
                count: 7,
                id: '6uz2jQ8PGxbOIqy4QH76',
                price: 49000
            },
            {
                count: 5,
                id: 'oFyfA3GbtyBWlWGXlZGL',
                price: 49000
            }
        ],
        id: 'GcNdFFHzuZpP9QKCKnZT',
        idPaymentMethod: 'dgVFdZxX89bHpPJRkNW0',
        idState: 'Y8E2WTnlr7WRE3yeZoeO',
        priceTotal: 3241000,
        receiverInfo: {
            address: '5376/2 le hong phong p10 q 10',
            name: 'XXXX',
            phoneNumber: '0983939013'
        },
        updateAt: new Date(randomYear, randomMonth, randomDay, ramdomHour)
    }
    const employee: IEmployee = {
        address: 'dqwdqw',
        birthday: new Date('1998-11-07T17:00:00.000Z'),
        createAt: new Date('2010-10-21T15:33:21.000Z'),
        email: 'nguyenphucnguyenvy@gmail.com',
        id: 'EYi1tcdwjuVx8fFdG7m7y8S5WqA2',
        idRole: '72y6x8BpGphfRnKVWWEl',
        isDeleted: false,
        name: 'NGUYEN VY',
        orderCount: 32,
        phoneNumber: '010101',
        point: 0,
        updateAt: new Date('2019-11-27T04:34:47.519Z')
    }
    if (order !== undefined && employee !== null) {
        const newOrder = { ...order }
        newOrder.idEmployee = employee.id
        newOrder.idState = idState
        if (newOrder.paidAt === undefined) {
            newOrder.paidAt = new Date(randomYear, randomMonth, randomDay, ramdomHour + 2)
        }
        addOrderToProcessedOrderMock(newOrder)
            .then(_ => {
                updateOrderCountForEmployee(employee.id)
                if (newOrder.idMembership !== undefined) {
                    updatePointForMembership(newOrder.idMembership, calculateExtraPoint(newOrder.priceTotal))
                }
                setIsLoading(false)
                message.success('action failed')
                if (newOrder.paidAt !== undefined)
                    console.log(newOrder.paidAt.getDay(), newOrder.paidAt.getMonth(), newOrder.paidAt.getFullYear())
            })
            .catch(_ => {
                message.error('action failed')
            })
    }
}

useEffect(() => {
    const timeout = setInterval(handleChangeProcessedState, 3000)
    return () => clearInterval(timeout)
}, [])
*/