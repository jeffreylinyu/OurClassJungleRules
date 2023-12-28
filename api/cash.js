export const order = async (data) => {
    return await useHttp.post(`/api/cash/order`,data);
};

export const getOrder = async (data) => {
    return await useHttp.post(`/api/cash/orders`,data);
};

export const getProducts = async () => {
    return await useHttp.get(`/api/cash/products`);
};
export const addProduct = async (data) => {
    return await useHttp.post(`/api/cash/products`,data);
};
export const editProduct = async (id,data) => {
    return await useHttp.put(`/api/cash/products/${id}`,data);
};
export const deleteProduct = async (id) => {
    return await useHttp.delete(`/api/cash/products/${id}`);
};