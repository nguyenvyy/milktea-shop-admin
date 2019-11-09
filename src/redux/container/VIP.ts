import { connect } from "react-redux";
import { RootState } from "../reducers/root-reducer";
import * as actions from "../actions/vip/actions";
import VIP from "../../pages/VIP/VIP";
const mapState = (state: RootState) => {
    return {
        vips: state.vip.items,
        isFetching: state.vip.isFetching
    }
}

const mapDispatch = {
    ...actions
}


export default connect(mapState, mapDispatch)(VIP)