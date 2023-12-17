export const order = async (data) => {
    return await useHttp.post(`/api/cash/order`,data);
};

export const getOrder = async (data) => {
    return await useHttp.post(`/api/cash/orders`,data);
};