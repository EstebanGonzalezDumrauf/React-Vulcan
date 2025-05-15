import React from 'react';
import { Badge, IconButton } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { useNavigate } from 'react-router-dom';

export const NotificationBell = ({ count = 0 }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/notificaciones');
    };

    return (
        <IconButton onClick={handleClick} sx={{ color: 'white' }}>
            <Badge badgeContent={count} color="warning" invisible={count === 0}>
                <NotificationsIcon />
            </Badge>
        </IconButton>
    );
};
