import React, { useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import './VIP.scss'
import { Header } from "../../components/common/Header/Header";
import { vipPath } from "../../config/route-config";
import { Empty } from "antd";
import { AddVIP } from "../../components/MangeVIP/AddVIP/AddVIP";
import { VIPPanel } from "../../components/MangeVIP/Panel/Panel";
import { ListVIP } from "../../components/MangeVIP/ListVIP/ListVIP";
import { EditVIP } from "../../components/MangeVIP/EditVIP/EditVIP";

const VIP = ({
    vips = [],
    isFetching,
    fetchVIPs,
    requestAddVIP,
    requestEditVIP,
    requestDeleteVIP,
}: any) => {
    useEffect(() => {
        if(vips.length === 0)
            fetchVIPs()
    }, [])
    return (
        <div className="vip">
            <Header title="VIP" />
            <div className="vip__wrapper">
                <div className="vip__wrapper-left">
                    <VIPPanel />
                    <ListVIP 
                    isFetching={isFetching}
                    requestEditVIP={requestEditVIP} 
                    requestDeleteVIP={requestDeleteVIP} 
                    vips={vips} />
                </div>
                <div className="vip__wrapper-right">
                    <Switch>
                        <Route exact path={`${vipPath}`} render={() => <Empty />} />
                        <Route path={`${vipPath}/add`} render={props => (
                            <AddVIP
                                {...props}
                                isFetching={isFetching}
                                requestAddVIP={requestAddVIP}
                            />
                        )} />
                        <Route path={`${vipPath}/edit/:id`} render={props => {
                            const id = props.match.params.id;
                            const vip = vips.find((item: any) => item.id === id)
                            return (
                                <EditVIP
                                    {...props}
                                    vip={vip ? vip : false}
                                    requestEditVIP={requestEditVIP}
                                />)
                        }} />
                    </Switch>
                </div>
            </div>
        </div>
    )
}

export default VIP