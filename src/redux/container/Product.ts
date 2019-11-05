import { connect } from "react-redux";
import { RootState } from "../reducers/root-reducer";
import ProductPage from "../../pages/Product/Product";
import {
    featchProducts,
    requestAddProduct,
    requestEditProduct,
    requestDeleteProductCategory
} from '../actions/product/actions'
const mapState = (state: RootState) => {
    return {
        product: state.product.items,
        isFeatching: state.product.isFeatching
    }
}

const mapDispatch = {
    featchProducts,
    requestAddProduct,
    requestEditProduct,
    requestDeleteProductCategory
}

const ProductCategoryContainer = connect(mapState, mapDispatch)(ProductPage)
export default ProductCategoryContainer