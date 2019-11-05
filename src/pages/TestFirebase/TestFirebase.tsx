import React, {  } from 'react';
import { getProductCategoriesAPI } from '../../redux/actions/product-category/services';


const Test: React.FC = () => {
    const getProductCategory = () => {
        getProductCategoriesAPI().then((res) => {throw new Error()})
        .catch(() => console.log(2))
    }
    return (
        <div className="Text" style={{ height: '2000px' }}>
            <header className="App-header">
                Hello World!
        </header>
            <button onClick={getProductCategory}>Get product category</button>
        </div>
    );
}

export default Test