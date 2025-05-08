import { Box, Container, Typography } from "@mui/material";

export const Footer = () => {
    
    function Copyright(props) {
        return (
            <Typography variant="body1" color="text.secondary" align="center" {...props}>
                {'Todos Los Derechos Reservados © '}
                {new Date().getFullYear()}
                {'.'}
            </Typography>
        );
    }

    return (
        <Box component="footer" sx={{ backgroundColor: "#f8f9fa", py: 2, textAlign: "center" }}>
            <Container>
                <Copyright sx={{ mt: 2, mb: 4 }} />

                <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", mt: 1 }}>
                    <Typography variant="body1" color="textSecondary" fontWeight="bold" fontSize="1.1rem">
                        Servicio de Análisis Operativo, Armas y Guerra Electrónica - Armada Argentina
                    </Typography>
                    <Box component="img"
                        src="/images/logoARA.png"
                        alt="Logo de la Armada Argentina"
                        sx={{ width: 28, ml: 1 }}
                    />
                </Box>
            </Container>
        </Box>
    );
};
