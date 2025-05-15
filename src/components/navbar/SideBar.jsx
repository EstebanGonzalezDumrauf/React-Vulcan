import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse'; // <-- Para los submenús
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { NavLink } from 'react-router-dom';
import { DashboardArea } from './DashboardArea';
import { Button } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import { useAuth } from '../../hooks';
import { useNavigate } from 'react-router-dom';
import { NotificationBell } from '../../components/dashboard/NotificationBell';

const drawerWidth = 260;

const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme) => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
        ...openedMixin(theme),
        '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
        ...closedMixin(theme),
        '& .MuiDrawer-paper': closedMixin(theme),
    }),
}));

export const SideBar = ({ navArrayLinks }) => {
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const { startLogout } = useAuth();
    const navigate = useNavigate();
    const [expanded, setExpanded] = React.useState({}); // Estado para submenús

    const [user, setUser] = React.useState({ nombre: '' });

    React.useEffect(() => {
        const fetchUserData = () => {
            const nombre = localStorage.getItem("auth_name") || "";
            const unit = localStorage.getItem("unit") || "";
            setUser({ nombre }, { unit });
        };
    
        fetchUserData();
    
        // Escuchar cambios en el localStorage (en otras pestañas)
        const handleStorageChange = () => fetchUserData();
        window.addEventListener("storage", handleStorageChange);
    
        // También forzar actualización en la misma pestaña
        const interval = setInterval(() => {
            fetchUserData();
        }, 1000); // Revisa cada segundo (ajústalo según sea necesario)
    
        return () => {
            window.removeEventListener("storage", handleStorageChange);
            clearInterval(interval); // Limpia el intervalo cuando se desmonte
        };
    }, []);
    
    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const handleLogout = () => {
        startLogout();
        localStorage.removeItem("auth_name"); // Elimina el usuario
        setUser({ nombre: "" }); // Asegura que el estado se actualice
        navigate('/login');
    };

    const toggleSubMenu = (title) => {
        setExpanded((prev) => ({ ...prev, [title]: !prev[title] }));
    };

    return (
        <Box sx={{ display: 'flex' }}>
            <AppBar position="fixed" open={open}>
    <Toolbar>
        <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={() => setOpen(true)}
            edge="start"
            sx={{
                marginRight: 5,
                ...(open && { display: 'none' }),
            }}
        >
            <MenuIcon />
        </IconButton>

        {/* Contenedor del logo y el título */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Box
                component="img"
                src="/images/LogoBlue.png"
                alt="Logo"
                sx={{
                    width: 80,  // Controla el ancho
                    height: 'auto', // Mantiene la relación de aspecto
                    maxHeight: 90, // Evita que sea demasiado alto
                }}
            />
            <Typography variant="h5" noWrap component="div">
                SISTEMA VULCAN
            </Typography>
        </Box>

        <Box sx={{ flexGrow: 1 }} />

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <NotificationBell count={3} />
            <Typography variant="body1" sx={{ color: theme.palette.secondary.contrastText }}>
                {user.nombre}
            </Typography>
            <Button
                variant="outlined"
                sx={{
                    borderColor: theme.palette.secondary.contrastText,
                    color: theme.palette.secondary.contrastText,
                    '&:hover': {
                        borderColor: theme.palette.secondary.contrastText,
                        backgroundColor: theme.palette.secondary.light,
                    },
                    fontSize: '0.75rem',
                }}
                onClick={handleLogout}
                startIcon={<LogoutIcon />}
            >
                Salir
            </Button>
        </Box>
    </Toolbar>
</AppBar>

            <Drawer variant="permanent" open={open}>
                <DrawerHeader>
                    <IconButton onClick={() => setOpen(false)}>
                        {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                    </IconButton>
                </DrawerHeader>
                <Divider />

                <List>
                    {navArrayLinks.map((item) => (
                        <React.Fragment key={item.title}>
                            <ListItem disablePadding sx={{ display: 'block' }}>
                                <ListItemButton
                                    component={item.children.length === 0 ? NavLink : undefined}
                                    to={item.children.length === 0 ? item.path : undefined}
                                    onClick={() => {
                                        if (item.children.length > 0) toggleSubMenu(item.title);
                                    }}
                                    sx={{
                                        minHeight: 48,
                                        justifyContent: open ? 'initial' : 'center',
                                        px: 2.5,
                                    }}
                                >
                                    <ListItemIcon sx={{ minWidth: 0, mr: open ? 3 : 'auto', justifyContent: 'center' }}>
                                        {item.icon}
                                    </ListItemIcon>
                                    <ListItemText primary={item.title} sx={{ opacity: open ? 1 : 0 }} />
                                    {item.children.length > 0 ? (expanded[item.title] ? <ExpandLess /> : <ExpandMore />) : null}
                                </ListItemButton>
                            </ListItem>
                            
                            {item.children.length > 0 && (
                                <Collapse in={expanded[item.title]} timeout="auto" unmountOnExit>
                                    <List component="div" disablePadding>
                                        {item.children.map((child) => (
                                            <ListItemButton
                                                key={child.title}
                                                component={NavLink}
                                                to={child.path}
                                                sx={{ pl: open ? 4 : 2 }}
                                            >
                                                <ListItemIcon>{child.icon}</ListItemIcon>
                                                <ListItemText primary={child.title} />
                                            </ListItemButton>
                                        ))}
                                    </List>
                                </Collapse>
                            )}
                        </React.Fragment>
                    ))}
                </List>
            </Drawer>
            <Box component="main" sx={{ flexGrow: 1, ml: 4, mt: 3 }}>
                <DrawerHeader />
                <DashboardArea />
            </Box>
        </Box>
    );
};
