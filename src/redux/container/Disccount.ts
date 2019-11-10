import { connect } from "react-redux";
import { RootState } from "../reducers/root-reducer";
import * as actions from "../actions/discount/actions";
import Discount from "../../pages/Discount/Discount";
const mapState = (state: RootState) => {
    return {
        discounts: state.discount.items,
        isFetching: state.discount.isFetching
    }
}

const mapDispatch = {
    ...actions
}


export default connect(mapState, mapDispatch)(Discount)