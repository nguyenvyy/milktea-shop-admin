import { connect } from "react-redux";
import ProductCategoryPage from "../../pages/ProductCategory/ProductCategory";
import {
    fetchProductCategories,
    requestAddProductCategory,
    requestEditProductCategory,
    requestDeleteProductCategory
} from "../actions/product-category/actions";
import { RootState } from "../reducers/root-reducer";
const mapState = (state: RootState) => {
    return {
        categories: state.productCategory.items,
        isFetching: state.productCategory.isFetching
    }
}

const mapDispatch = {
    fetchProductCategories,
    requestAddProductCategory,
    requestEditProductCategory,
    requestDeleteProductCategory

}

const ProductCategoryContainer = connect(mapState, mapDispatch)(ProductCategoryPage)
export default ProductCategoryContainer