import { useAuthStore } from '../store';
import { authApi } from '../api/authApi';

export const useAuth = () => {
    const { status, errorMessage, checking, onLogin, onLogout } = useAuthStore();

    const startLogin = async ({ logon, password }) => {
        checking();
        try {
            const { data } = await authApi.post(`/users/authenticate`, { logon, password });

            localStorage.setItem('token', data.token);
            localStorage.setItem('userId', data.userId);
            //localStorage.setItem('unit', data.unit);
            localStorage.setItem('auth_email', logon);
            localStorage.setItem('token-init-date', new Date().getTime());

            onLogin({
                userId: data.userId,
                name: data.name,
                logon: logon,
                unit: data.unit,
                photoURL: data.photoURL ?? null,
            });

            // Llamar a getUser después de iniciar sesión
            await getUser(data.userId);

        } catch (error) {
            const message = error.response?.data?.message || 'Error al iniciar sesión';
            onLogout(message);
        }
    };

    const getUser = async (userId) => {
        try {
            const token = localStorage.getItem('token'); 
            if (!token) throw new Error('No hay token disponible');
    
            const { data } = await authApi.get(`/users/${userId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
    
            const nombreUsuario = `${data.rank || ''} ${data.firstName || ''} ${data.lastName || ''}`.trim() || "Usuario";
    
            localStorage.setItem("auth_name", nombreUsuario);
            localStorage.setItem("auth_email", data.logon);
            localStorage.setItem("level", data.level);  
            localStorage.setItem("unit", data.unit);  

            onLogin({
                userId: data.userId,
                name: data.name,
                unit: data.unit,
                photoURL: data.photoURL ?? null,
            });
    
        } catch (error) {
            const message = error.response?.data?.message || 'Error al obtener usuario';
            onLogout(message);
        }
    };
    

    const startLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('token-init-date');
        localStorage.removeItem('userId');
        localStorage.removeItem("auth_name");
        localStorage.removeItem("auth_email");
        localStorage.removeItem("level");
        localStorage.removeItem("unit");
        onLogout();
    };


    const checkAuthToken = async () => {
        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('userId');
        const logon = localStorage.getItem('auth_email');
        const name = localStorage.getItem('auth_name');
        const unit = localStorage.getItem('unit');
    
        if (!token || !userId) {
            return startLogout(); // debería cambiar status a 'not-authenticated'
        }
    
        const tokenInitDate = Number(localStorage.getItem('token-init-date'));
        const now = new Date().getTime();
        const tokenLife = 1000 * 60 * 60 * 4; // 4 horas
    
        if (tokenInitDate && (now - tokenInitDate) > tokenLife) {
            return startLogout(); // token vencido
        }
    
        // Esto debe cambiar status a 'authenticated' y establecer el usuario en el estado
        onLogin({
            uid: userId,
            logon,
            name,
            unit,
            photoURL: null,
        });
    };
    

    return {
        status,
        errorMessage,
        startLogin,
        getUser,
        checkAuthToken,
        startLogout,
    };
};
