const categoryBaseUrl = '/api/report';

export const age = async () => {
    return await useHttp.get(`${categoryBaseUrl}/age`);
};
export const category = async () => {
    return await useHttp.get(`${categoryBaseUrl}/category`);
};
export const login = async () => {
    return await useHttp.get(`${categoryBaseUrl}/login`);
};
export const script = async () => {
    return await useHttp.get(`${categoryBaseUrl}/script`);
};
export const ending = async () => {
    return await useHttp.get(`${categoryBaseUrl}/script-ending`);
};

export const scriptDistribution = async () => {
    return await useHttp.get(`${categoryBaseUrl}/script-distribution`);
};
