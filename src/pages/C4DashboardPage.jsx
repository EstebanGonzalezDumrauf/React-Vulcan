import { useEffect, useState } from 'react';
import { SideBar } from '../components/navbar/SideBar';
import { Footer } from '../components/dashboard';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
    faHome, 
    faGun, 
    faBomb,  
    faPersonRifle, 
    faRightFromBracket,
    faScrewdriverWrench,
    faUser,
    faUsers,
    faCircleInfo,
    faGear,
    faKey
} from "@fortawesome/free-solid-svg-icons"; 
import mockDataMenu from '../store/Navbar.json';
import { useAuthStore } from '../store';

const iconMap = {
    faHome: <FontAwesomeIcon icon={faHome} size="2x" />,
    faGun: <FontAwesomeIcon icon={faGun} size="2x" />,
    faBomb: <FontAwesomeIcon icon={faBomb} size="2x" />,
    faPersonRifle: <FontAwesomeIcon icon={faPersonRifle} size="2x" />,
    faScrewdriverWrench: <FontAwesomeIcon icon={faScrewdriverWrench} size="2x" />,
    faRightFromBracket: <FontAwesomeIcon icon={faRightFromBracket} size="2x" />,
    faUser: <FontAwesomeIcon icon={faUser} size="2x" />,
    faUsers: <FontAwesomeIcon icon={faUsers} size="2x" />,
    faCircleInfo: <FontAwesomeIcon icon={faCircleInfo} size="2x" />,
    faGear: <FontAwesomeIcon icon={faGear} size="2x" />,
    faKey: <FontAwesomeIcon icon={faKey} size="2x" />
};

const mapNavLinks = (links) => {
    return links.map(link => ({
        title: link.title,
        path: link.path,
        icon: iconMap[link.icon] || <FontAwesomeIcon icon={faScrewdriverWrench} />,
        children: link.children?.length > 0 ? mapNavLinks(link.children) : []
    }));
};

export const C4DashboardPage = () => {
    const unitFromStore = useAuthStore(state => state.unit);
    const [navLinks, setNavLinks] = useState([]);

    useEffect(() => {
        const fetchNavLinks = async () => {
            try {
                // Usa Zustand si existe, sino recurre a localStorage como fallback
                const unit = unitFromStore || localStorage.getItem("unit");
                const selectedMenu = mockDataMenu[unit] || mockDataMenu.default;

                // Simula retardo de petición (como si viniera de API)
                await new Promise(resolve => setTimeout(resolve, 100));
                setNavLinks(mapNavLinks(selectedMenu));
            } catch (error) {
                console.error("Error al cargar menú:", error);
                setNavLinks([]); // Si hay error, que no quede colgado
            }
        };

        fetchNavLinks();
    }, [unitFromStore]); // Si cambia el unit, se vuelve a cargar

    return (
        <>
            <SideBar navArrayLinks={navLinks} />
            <Footer />
        </>
    );
};
