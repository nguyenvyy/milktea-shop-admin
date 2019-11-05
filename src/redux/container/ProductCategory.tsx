import { connect } from "react-redux";
import ProductCategoryPage from "../../pages/ProductCategory/ProductCategory";
import {
    featchProductCategories,
    requestAddProductCategory,
    requestEditProductCategory,
    requestDeleteProductCategory
} from "../actions/product-category/action";
import { RootState } from "../reducers/root-reducer";
const mapState = (state: RootState) => {
    return {
        categories: state.productCategory.items,
        isFeatching: state.productCategory.isFeatching
    }
}

const mapDispatch = {
    featchProductCategories,
    requestAddProductCategory,
    requestEditProductCategory,
    requestDeleteProductCategory

}

const ProductCategoryContainer = connect(mapState, mapDispatch)(ProductCategoryPage)
export default ProductCategoryContainer