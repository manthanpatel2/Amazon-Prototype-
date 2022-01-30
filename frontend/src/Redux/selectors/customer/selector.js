export const getProducts = (productData) => {
    if(productData){
        return productData.products;
    }
    return [];
};

export const getFilterName = (productData) => {
    if(productData){
        return productData.name;
    }
}

export const getFilterCategories = (productData) => {
    if(productData){
        return productData.categories;
    }
}

export const getFilterSort = (productData) => {
    if(productData){
        return productData.sort;
    }
}