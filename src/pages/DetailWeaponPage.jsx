import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CardWeapon from '../components/dashboard/CardWeapon';
import { RibbonButtonsYesNot } from '../components/dashboard/RibbonButtonsYesNot';
import CarrouselPics from '../components/dashboard/CarrouselPics';
import { useParams } from 'react-router-dom';

export const DetailWeaponPage = () => {

    const { id } = useParams();

    return (
        <>
            <Typography variant="h5" marginBottom={2}>
                Home / Armas / {id}
            </Typography>

            <Box
                sx={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'row',
                    gap: 2,
                    mb: 2
                }}
            >
                <Box sx={{ width: '40%' }}>
                    <CarrouselPics />
                </Box>
                <Box sx={{ width: '60%' }}>
                    <CardWeapon weaponId={id} />
                    <RibbonButtonsYesNot />
                </Box>
            </Box>
        </>
    );
};