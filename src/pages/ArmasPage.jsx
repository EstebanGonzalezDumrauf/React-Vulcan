import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { GridTable } from '../components/dashboard';

export const ArmasPage = () => {
    return (
        <>
            <Typography variant="h5" marginBottom={2}>
                Home / Armas
            </Typography>
            

            <Box sx={{ width: '100%',
                    borderRadius: 0,
                    boxShadow: "none", display: 'flex', flexDirection: 'column'}}>
                <GridTable />                
            </Box>
        </>
    );
};
