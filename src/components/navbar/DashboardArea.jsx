import { Navigate, Route, Routes } from 'react-router-dom';
import { HomePage, DashboardPage, SettingsPage, ArmasPage, DetailWeaponPage, AmmunitionPage } from '../../pages';

export const DashboardArea = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/home" element={<HomePage />} />
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/armas" element={<ArmasPage />} />
                <Route path="/armas/:id" element={<DetailWeaponPage />} />
                <Route path="/municion" element={<AmmunitionPage />} />
                <Route path="/settings" element={<SettingsPage />} />
                <Route path="/*" element={<Navigate to="/" />} />
            </Routes>
        </>
    );
};
