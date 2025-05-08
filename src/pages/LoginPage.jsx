import { useAuth } from '../hooks';
import { useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useSnackbar } from 'notistack';
import Swal from 'sweetalert2';
import { useForm } from 'react-hook-form';

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

export const LoginPage = () => {
    const { enqueueSnackbar } = useSnackbar();
    const { startLogin, errorMessage } = useAuth();

    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm({
        defaultValues: {
            loginEmail: '',
            loginPassword: '',
        },
    });

    const onSubmit = (data) => {
        if (!isValid) return;
        startLogin({ logon: data.loginEmail, password: data.loginPassword });
    };

    useEffect(() => {
        if (errorMessage) {
            Swal.fire({
                title: 'Error en la autenticación',
                text: errorMessage,
                icon: 'error',
            });
        }
    }, [errorMessage]);

    return (
        <Container component="main" maxWidth="xs">
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >

                <img
                src="/images/Logo.png"
                alt="Logo"
                className="brand-image img-fluid"
                style={{ width: "80%", height: "auto", opacity: 0.8 }}
                />

                <h1 className="font-weight-bold font-italic mt-2">SISTEMA VULCAN</h1>
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Identifiquese
                </Typography>
                <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="loginEmail"
                        label="Usuario"
                        autoComplete="email"
                        autoFocus
                        type="text"
                        placeholder="Usuario"
                        error={!!errors.loginEmail}
                        helperText={errors.loginEmail?.message}
                        {...register('loginEmail', {
                            required: 'El email es obligatorio',
                            pattern: {
                                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                message: 'El formato del email no es válido',
                            },
                        })}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="loginPassword"
                        label="Password"
                        autoComplete="current-password"
                        type="password"
                        placeholder="Contraseña"
                        error={!!errors.loginPassword}
                        helperText={errors.loginPassword?.message}
                        {...register('loginPassword', {
                            required: 'La contraseña es obligatoria',
                            minLength: {
                                value: 8,
                                message: 'Debe tener al menos 8 caracteres',
                            },
                            pattern: {
                                value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&+-]{8,}$/,
                                message: 'Debe contener al menos una letra, un número y un carácter especial',
                            },
                            
                        })}
                    />
                    <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                        Sign In
                    </Button>
                    <Grid container>
                        <Grid item xs>
                            <Button
                                onClick={() => enqueueSnackbar('Contacte al administrador', { variant: 'info' })}
                                variant="text"
                                sx={{ textTransform: 'none', padding: 0, color: 'primary.main' }}
                            >
                                ¿Olvidó su contraseña?
                            </Button>
                        </Grid>
                        <Grid item>
                            <Button
                                onClick={() => enqueueSnackbar('Contacte al administrador', { variant: 'info' })}
                                variant="text"
                                sx={{ textTransform: 'none', padding: 0, color: 'primary.main' }}
                            >
                                ¿No tiene una cuenta?
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
            <Copyright sx={{ mt: 6, mb: 4 }} />
        </Container>
    );
};
