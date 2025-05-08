import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import {
    ResponsiveGridLayout
} from '../components/dashboard';



export const DashboardPage = () => {
    return (
        <>
            <Typography variant="h5" marginBottom={2}>
                Dashboard
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <ResponsiveGridLayout />
            </Box>
        </>
    );
};
