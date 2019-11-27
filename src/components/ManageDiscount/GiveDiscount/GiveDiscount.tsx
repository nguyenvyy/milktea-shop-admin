/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useMemo, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { Header } from "../../common/Header/Header";
import { Form, Select, Button, message } from "antd";

import { IDiscount, Reward } from "../../../model/IDiscount";
import { undefinedError, success } from "../../../constant";
import { LoadingAdvance } from "../../common/Loading/Loading";
import { RootState } from "../../../redux/reducers/root-reducer";
import { fetchVIPs } from "../../../redux/actions/vip/actions";
import { realtimeUpdateMemberships } from "../../../redux/actions/membership/actions";
import { IVIP } from "../../../model/IVIP";
import { IMembership } from "../../../model/IMemebership";
import moment from "moment";
import { giveDiscountAPI } from "../../../redux/actions/discount/servives";
import { requestEditGiveCountDiscount } from "../../../redux/actions/discount/actions";
export const GiveDiscount = ({
    discount
}: { discount: null | IDiscount }) => {
    const dispatch = useDispatch()
    const { items, isFetching = false } = useSelector((state: RootState) => state.vip)
    const vips = useMemo(() => {
        return items.filter(item => item.isDeleted === false).sort((a, b) => b.point - a.point)
    }, [items])
    useEffect(() => {
        if (vips.length === 0) {
            dispatch(fetchVIPs())
        }
    }, [])
    const memberships = useSelector((state: RootState) => state.membership.items)
    useEffect(() => {
        if (memberships.length === 0) {
            dispatch(realtimeUpdateMemberships())
        }
    }, [])

    const [vipRange, setVIPRange] = useState({
        from: 'all',
        to: 'all'
    })
    useEffect(() => {
        const fromVIP = +vipRange.from.split('-')[1]
        const toVIP = +vipRange.to.split('-')[1]
        if (vipRange.from !== 'all' && vipRange.to !== 'all' && fromVIP > toVIP) {
            setVIPRange({
                from: vipRange.to,
                to: vipRange.from
            })
        }
    }, [vipRange])

    const changeRange = (value: string, name: string) => {
        if (name === 'from' && value === 'all') {
            setVIPRange({
                from: 'all',
                to: 'all'
            })
            return
        }
        setVIPRange({
            ...vipRange,
            [name]: value
        })
    }

    // create effect loading for button give
    const [isGiving, setIsGiving] = useState(false)

    /**
     * 
     * @param vipIds valid vips
     * @param activeMemberships memberships are activating
     * @returns id of valid memberships   
     */
    const filterValidMembersipIds = (vipIds: string[], activeMemberships: IMembership[]): string[] => {
        const validMembership = activeMemberships.filter(membership => {
            const vip: IVIP | undefined = vips.find(vip => vip.point <= membership.point)
            if (vip !== undefined) {
                if (vipIds.includes(vip.id)) {
                    return true
                }
            }
            return false
        })
        return validMembership.map(membership => membership.id)
    }

    const handleGiveDiscount = async () => {
        try {
            if (memberships.length > 0 && discount !== null) {
                setIsGiving(true)
                const fromVIP = +vipRange.from.split('-')[1]
                const toVIP = +vipRange.to.split('-')[1]
                const activeMemberships = memberships.filter(membership => membership.isDeleted === false)
                let validMembershipIds: string[] = []

                if (vipRange.from === 'all' && vipRange.to === 'all') {
                    validMembershipIds = activeMemberships.map(membership => membership.id)
                    
                } else if (vipRange.to === 'all' ) {
                    // get vip list are valid
                    const validVips = vips.filter(vip => vip.point >= fromVIP)
                    // map to id
                    const validVipIds = validVips.map(vip => vip.id)
                    // handle ckeck valid membership who have point in  vip range
                    validMembershipIds = filterValidMembersipIds(validVipIds, activeMemberships)
                } else if (vipRange.from !== 'all' && vipRange.to !== 'all') {
                    // get vip list are valid
                    const validVips = vips.filter(vip => vip.point >= fromVIP && vip.point <= toVIP)
                    // map to id
                    const validVipIds = validVips.map(vip => vip.id)
                    // handle ckeck valid membership who have point in  vip range
                    validMembershipIds = filterValidMembersipIds(validVipIds, activeMemberships)
                }
                // create reward for membership
                const createAt = new Date()
                const expiryDate = moment(createAt).add(discount.duration, 'days').toDate();
                const reward: Reward = {
                    idDiscount: discount.id,
                    value: discount.value,
                    createAt,
                    used: false,
                    expiryDate
                }
                // request add reward for membership
                await Promise.all([
                    validMembershipIds.map(id => giveDiscountAPI(id, reward))
                ])
                let resEdit = await dispatch(requestEditGiveCountDiscount(discount, validMembershipIds.length))
                setIsGiving(false)
                if(resEdit === undefinedError) {
                    throw "Error";
                }
                message.success(`discount is gived for ${validMembershipIds.length} membership`)
            }
        } catch (error) {
            message.error('action failed')
        }
    }


    return (
        <div className="add-discount">
            <Header className="add-discount__title" title="Give discount" />
            <div className="add-discount__form">
                <LoadingAdvance loading={discount === null ? true : false}>
                    <Form layout="horizontal" >
                        <Form.Item
                            label="From"
                            help={vipRange.from === '' ? 'From is not valid' : ''}
                            hasFeedback
                            validateStatus={vipRange.from === '' ? 'error' : 'success'}
                        >
                            <Select
                                onChange={(value: string) => changeRange(value, 'from')}
                                loading={isFetching === true ? true : false}
                                value={vipRange.from}
                            >
                                <Select.Option value={'all'}>ALL</Select.Option>
                                {vips.map(rank => <Select.Option key={rank.id} value={`${rank.id}-${rank.point}`}>{rank.name} - {rank.point}</Select.Option>)}
                            </Select>
                        </Form.Item>
                        <Form.Item
                            label="To"
                            help={vipRange.to === '' ? 'To is not valid' : ''}
                            hasFeedback
                            validateStatus={vipRange.to === '' ? 'error' : 'success'}
                        >
                            <Select
                                onChange={(value: string) => changeRange(value, 'to')}
                                loading={isFetching === true ? true : false}
                                value={vipRange.to}
                            >
                                <Select.Option value={'all'}>ALL</Select.Option>
                                {vips.map(rank => <Select.Option key={rank.id} value={`${rank.id}-${rank.point}`}>{rank.name} - {rank.point}</Select.Option>)}
                            </Select>
                        </Form.Item>
                        <Form.Item>
                            <Button loading={isGiving} onClick={handleGiveDiscount}>Give discount</Button>
                        </Form.Item>
                    </Form>
                </LoadingAdvance>
            </div>
        </div>
    )
}