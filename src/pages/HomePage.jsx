import React from 'react';
import Typography from '@mui/material/Typography';
import Description from './Description';

export const HomePage = () => {
    return (
        <>
            <Typography variant="h5" marginBottom={2}>
                Home
                <Description />
            </Typography>
        </>
    );
};
