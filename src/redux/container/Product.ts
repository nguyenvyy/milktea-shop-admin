import { connect } from "react-redux";
import { RootState } from "../reducers/root-reducer";
import ProductPage from "../../pages/Product/Product";
import {
    featchProducts,
    requestAddProduct,
    requestEditProduct,
    requestDeleteProduct
} from '../actions/product/actions'
import { featchProductCategories } from "../actions/product-category/actions";
import { getActiveProductCategory } from "../selectors/product-category";
const mapState = (state: RootState) => {
    const categories = getActiveProductCategory(state.productCategory.items)
    return {
        products: state.product.items,
        categories,
        isFeatching: state.product.isFeatching
    }
}

const mapDispatch = {
    featchProducts,
    featchProductCategories,
    requestAddProduct,
    requestEditProduct,
    requestDeleteProduct
}

const ProductCategoryContainer = connect(mapState, mapDispatch)(ProductPage)
export default ProductCategoryContainer