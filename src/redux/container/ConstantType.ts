import { connect } from "react-redux";
import {
    fetchConstantTypes
} from "../actions/constant-type/actions";
import { RootState } from "../reducers/root-reducer";
import ConstantType from "../../pages/ConstantType/ConstantType";
const mapState = (state: RootState) => {
    return {
        ...state.constantType
    }
}

const mapDispatch = {
    fetchConstantTypes
}

const ProductCategoryContainer = connect(mapState, mapDispatch)(ConstantType)
export default ProductCategoryContainer