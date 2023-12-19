export const order = async (data) => {
    return await useHttp.post(`/api/cash/order`,data);
};

export const getOrder = async (data) => {
    return await useHttp.post(`/api/cash/orders`,data);
};

export const getProducts = async () => {
    return await useHttp.get(`/api/cash/products`);
};