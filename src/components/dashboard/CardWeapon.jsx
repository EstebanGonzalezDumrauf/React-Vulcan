import React, { useState, useEffect } from 'react';
import {
    Box,
    Tabs,
    Tab,
    TextField,
    MenuItem,
    Typography,
    Paper,
    Grid,
    Divider,
    Button
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

const CardWeapon = ({ weaponId }) => {
    const [activeTab, setActiveTab] = useState("general");
    const [general, setGeneral] = useState({});
    const [details, setDetails] = useState({});

    useEffect(() => {
        // Si no hay ID, no cargar nada (opcional)
        if (!weaponId) return;
    
        // Reemplazar por lógica real de fetch si tenés
        const mockData = {
            general: {
                "NT": "00123",
                "Nro de Inventario": "INV-456",
                "NNE": "NNE-789",
                nomenclatura: "Pistola 9mm",
                apoyado: "Ejército",
                ubicacion: "Depósito Central",
                "Nro de Serie": "SER12345"
            },
            details: {
                "Situación Operativa": "OPERATIVO",
                "Documento de S. O.": "DOC-SO-001",
                "Situación Administrativa": "MATERIAL EN EL DESTINO",
                "Documento de S. A.": "DOC-SA-001",
                "Destino": "Batallón X",
                "Fecha Ultima Inspección": {
                    seconds: 1700000000,
                    nanoseconds: 0
                }
            }
        };
    
        setGeneral(mockData.general);
        setDetails(mockData.details);
    }, [weaponId]);

    function formatTimestampToDatetimeLocal(timestamp) {
        const date = new Date(timestamp.seconds * 1000 + timestamp.nanoseconds / 1_000_000);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        return `${year}-${month}-${day}T${hours}:${minutes}`;
    }

    const images = [
        { src: "./images/browning/1.jpg", label: "Foto 1" },
        { src: "./images/browning/2.jpg", label: "Foto 2" },
        { src: "./images/browning/3.webp", label: "Foto 3" },
        { src: "./images/browning/4.webp", label: "Foto 4" },
        { src: "./images/browning/5.webp", label: "Foto 5" }
    ];

    const observaciones = [
        {
            fechaHora: "2023-09-04 14:30",
            usuario: "Marcelo Díaz",
            detalle: "Revisión del estado del arma."
        },
        {
            fechaHora: "2023-09-05 10:15",
            usuario: "Ana Pérez",
            detalle: "Mantenimiento preventivo realizado."
        }
    ];

    const renderGeneral = () => (
        <Box>
            <Grid container spacing={2}>
                {Object.entries(general).map(([key, value]) => (
                    <Grid item xs={12} md={6} key={key}>
                        <TextField
                            label={key}
                            value={value}
                            fullWidth
                            variant="outlined"
                            InputProps={{ readOnly: true }}
                        />
                    </Grid>
                ))}
            </Grid>
        </Box>
    );

    const renderDetalles = () => {
        return (
            <Grid container spacing={2}>
                {Object.entries(details).map(([key, value]) => {
                    if (key === "Situación Operativa" || key === "Situación Administrativa") {
                        const options = key === "Situación Operativa"
                            ? ["OPERATIVO", "NO OPERATIVO", "CONDENA PROVISORIA", "CONDENA DEFINITIVA", "INERTIZADO"]
                            : ["MATERIAL EN EL DESTINO", "CONSIGNADO", "TRANSFERIDO"];
                        return (
                            <Grid item xs={12} md={6} key={key}>
                                <TextField
                                    select
                                    label={key}
                                    value={value}
                                    fullWidth
                                    variant="outlined"
                                    InputProps={{ readOnly: true }}
                                >
                                    {options.map(option => (
                                        <MenuItem key={option} value={option}>
                                            {option}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Grid>
                        );
                    } else if (key === "Fecha Ultima Inspección") {
                        return (
                            <Grid item xs={12} md={6} key={key}>
                                <TextField
                                    label={key}
                                    type="datetime-local"
                                    value={formatTimestampToDatetimeLocal(value)}
                                    fullWidth
                                    variant="outlined"
                                    InputProps={{ readOnly: true }}
                                />
                            </Grid>
                        );
                    } else {
                        return (
                            <Grid item xs={12} md={6} key={key}>
                                <TextField
                                    label={key}
                                    value={value}
                                    fullWidth
                                    variant="outlined"
                                    InputProps={{ readOnly: true }}
                                />
                            </Grid>
                        );
                    }
                })}
            </Grid>
        );
    };

    const renderArchivos = () => (
        <Box>
            <ul>
                {images.map((img, i) => (
                    <li key={i}>
                        <a href={img.src} download>
                            {img.label}
                        </a>
                    </li>
                ))}
            </ul>
            <Box mt={2}>
                <Button variant="contained" component="label">
                    Subir Archivo
                    <input type="file" hidden />
                </Button>
            </Box>
        </Box>
    );

    const renderObservaciones = () => (
        <Box>
            {observaciones.map((obs, i) => (
                <Paper key={i} elevation={2} sx={{ p: 2, mb: 2 }}>
                    <Typography variant="subtitle2">Fecha y Hora: {obs.fechaHora}</Typography>
                    <Typography variant="subtitle2">Usuario: {obs.usuario}</Typography>
                    <Typography variant="body1">Detalle: {obs.detalle}</Typography>
                    <Box textAlign="right" mt={1}>
                        <Button variant="outlined" size="small" startIcon={<EditIcon />}>
                            Editar
                        </Button>
                    </Box>
                </Paper>
            ))}
        </Box>
    );

    const renderTabContent = () => {
        switch (activeTab) {
            case "general":
                return renderGeneral();
            case "detalles":
                return renderDetalles();
            case "archivos":
                return renderArchivos();
            case "observaciones":
                return renderObservaciones();
            default:
                return null;
        }
    };

    return (
        <Box sx={{ p: 3 }}>
            <Tabs
                value={activeTab}
                onChange={(e, newValue) => setActiveTab(newValue)}
                indicatorColor="primary"
                textColor="primary"
                variant="scrollable"
                scrollButtons="auto"
            >
                <Tab value="general" label="General" />
                <Tab value="detalles" label="Detalles" />
                <Tab value="archivos" label="Archivos" />
                <Tab value="observaciones" label="Observaciones" />
            </Tabs>
            <Divider sx={{ my: 2 }} />
            {renderTabContent()}
        </Box>
    );
};

export default CardWeapon;
