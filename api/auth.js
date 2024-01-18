const categoryBaseUrl = '/auth';

export const signup = async (data) => {
    return await useHttp.post(`${categoryBaseUrl}/signup`,data);
};

export const sendVerificationLetter = async (data) => {
    return await useHttp.post(`${categoryBaseUrl}/mail`,data);
};

export const googleRegister = async () => {
    return await useHttp.get(`${categoryBaseUrl}/google-signup`)
};

export const googleLogin = async () => {
    return await useHttp.get(`${categoryBaseUrl}/google-login`)
};

export const resendMail = async (data) => {
    return await useHttp.post(`${categoryBaseUrl}/mail`,data)
};

export const sendResetPwdMail = async (data) => {
    return await useHttp.post(`${categoryBaseUrl}/mail/resetpwd`,data)
};

export const resetPwd = async (data) => {
    return await useHttp.post(`${categoryBaseUrl}/reset`,data)
};

export const getEndQrUrl = async (taskId) => {
    return await useHttp.get(`${categoryBaseUrl}/download/qrcode/${taskId}`)
};




