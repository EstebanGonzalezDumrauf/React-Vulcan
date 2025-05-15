import React, { useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Box, Typography, Grid, Paper } from '@mui/material';
import { faGun, faBomb, faPersonRifle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useAuthStore } from '../store';

function Description() {
    useEffect(() => {
        const isReload = sessionStorage.getItem('isReload');
        if (isReload === 'true') {
            sessionStorage.setItem('isReload', false);
            window.location.reload(true);
        }
    }, []);

    //const usuarioId = localStorage.getItem("userId");
    const unitFromStore = useAuthStore(state => state.unit);
    //console.log(unitFromStore);
    
    
    const sections = useMemo(() => {
        if (unitFromStore === 'SIAG') {
            return [
                {
                    title: "ARMAS",
                    path: "/armas",
                    description: "Inventario digital correspondiente a la existencia del armamento menor de la Armada, con sus respectivos movimientos, incorporación y condición operativa.",
                    icon: faGun,
                    color: "#17a2b8"
                },
                {
                    title: "MUNICION",
                    path: "/municion",
                    description: "Inventario digital correspondiente a la existencia del material explosivo y munición de la Armada, con sus respectivos movimientos, incorporación y consumo.",
                    icon: faBomb,
                    color: "#28a745"
                },
                {
                    title: "ADIESTRAMIENTO",
                    path: "/adiestramiento",
                    description: "Información relativa a las condiciones de tiro del personal, historial por destino, municiones consumidas, etc.",
                    icon: faPersonRifle,
                    color: "#6c757d"
                }
            ];
        } else if (unitFromStore === 'DIEJ') {
            return [
                {
                    title: "ARMAS",
                    path: "/armas",
                    description: "Inventario digital correspondiente a la existencia del armamento menor de la Armada, con sus respectivos movimientos, incorporación y condición operativa.",
                    icon: faGun,
                    color: "#17a2b8"
                }
            ];
        } else {
            // En caso de que no sea ninguno, podés devolver un array vacío o un mensaje
            return [];
        }
    }, [unitFromStore]);

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 3 }}>
            <Grid container spacing={3} sx={{ width: '100%' }}>
                {sections.map(({ title, path, description, icon, color }) => (
                    <Grid item xs={12} key={title}>
                        <Paper elevation={5} sx={{
                            paddingTop: 4,
                            paddingBottom: 4,
                            paddingLeft: 2,
                            backgroundColor: color,
                            color: 'white',
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            textAlign: 'left',
                            borderRadius: 3,
                            boxShadow: 3,
                            width: '100%',
                            paddingRight: 2
                        }}>
                            <Box sx={{ flex: 1 }}>
                                <Typography variant="h4" fontWeight="bold">{title}</Typography>
                                <Typography variant="h6" sx={{ marginBottom: 2 }}>{description}</Typography>
                                <Link to={path} style={{
                                    color: 'white',
                                    textDecoration: 'none',
                                    fontWeight: 'bold',
                                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                                    padding: '10px 20px',
                                    borderRadius: '5px'
                                }}>Más Información</Link>
                            </Box>
                            <FontAwesomeIcon icon={icon} size="6x" style={{ opacity: 0.3 }} />
                        </Paper>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}

export default Description;
