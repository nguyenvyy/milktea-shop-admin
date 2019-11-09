import { connect } from "react-redux";
import { RootState } from "../reducers/root-reducer";
import ProductPage from "../../pages/Product/Product";
import {
    fetchProducts,
    requestAddProduct,
    requestEditProduct,
    requestDeleteProduct
} from '../actions/product/actions'
import { fetchProductCategories } from "../actions/product-category/actions";
import { getActiveProductCategory } from "../selectors/product-category";
const mapState = (state: RootState) => {
    const categories = getActiveProductCategory(state.productCategory.items)
    return {
        products: state.product.items,
        categories,
        isFetching: state.product.isFetching
    }
}

const mapDispatch = {
    fetchProducts,
    fetchProductCategories,
    requestAddProduct,
    requestEditProduct,
    requestDeleteProduct
}

export default connect(mapState, mapDispatch)(ProductPage)
 