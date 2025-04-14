import { useLocation } from 'react-router';

export default function GetCurrentPath() {
    const location = useLocation();

    return location.pathname.split('/').filter(Boolean);
}
