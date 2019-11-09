import { connect } from "react-redux";
import { RootState } from "../reducers/root-reducer";
import VIP from "../../pages/VIP/VIP";
const mapState = (state: RootState) => {
    return {
    }
}

const mapDispatch = {
}


export default connect(mapState, mapDispatch)(VIP)