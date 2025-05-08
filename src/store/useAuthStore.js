// import { create } from 'zustand';

// const initialState = {
//     status: 'checking', //'checking', 'authenticated' , 'not-authenticated'
//     uid: null,
//     name: null,
//     email: null,
//     unit: null,
//     photoURL: null,
//     errorMessage: null,
// };

// export const useAuthStore = create((set) => ({
//     ...initialState,
//     checking: () => set(initialState),
//     onLogin: (payload) =>
//         set(() => ({
//             status: 'authenticated',
//             uid: payload.uid,
//             name: payload.name,
//             logon: payload.logon,
//             unit: payload.unit,
//             photoURL: payload.photoURL,
//             errorMessage: null,
//         })),
//     onLogout: (payload) => set({ ...initialState, status: 'not-authenticated', errorMessage: payload }),
//     clearErrorMesage: () => set({ errorMessage: null }),
// }));


import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useAuthStore = create(persist(
    (set) => ({
        status: 'checking',
        uid: null,
        name: null,
        email: null,
        unit: null,
        photoURL: null,
        errorMessage: null,
        checking: () => set({ status: 'checking' }),
        onLogin: (payload) =>
            set(() => ({
                status: 'authenticated',
                uid: payload.uid,
                name: payload.name,
                logon: payload.logon,
                unit: payload.unit,
                photoURL: payload.photoURL ?? null,
                errorMessage: null,
            })),
        onLogout: (payload) => set({ 
            status: 'not-authenticated',
            uid: null,
            name: null,
            email: null,
            unit: null,
            photoURL: null,
            errorMessage: payload 
        }),
        clearErrorMesage: () => set({ errorMessage: null }),
    }),
    {
        name: 'auth-storage', // nombre en localStorage
    }
));
