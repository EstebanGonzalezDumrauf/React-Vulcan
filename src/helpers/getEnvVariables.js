// export const getEnvVariables = () => {
//     return { ...import.meta.env };
// };


export const getEnvVariables = () => {
    return {
        REACT_APP_API_BASE_URL: process.env.REACT_APP_API_BASE_URL,
    };
};


