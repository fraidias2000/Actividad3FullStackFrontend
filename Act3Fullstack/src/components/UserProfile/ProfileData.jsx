import './ProfileData.css'
import {useAuth} from "../../context/AuthContext.jsx";
import {OrderContext} from "../../context/OrderContext.jsx";
import {useContext} from "react";

const ProfileData = () => {
    const { user } = useAuth();
    const { stats } = useContext(OrderContext);

    const getMemberLevel = (books) => {
        if (books > 20) return 'Platinum';
        if (books > 10) return 'Gold';
        return 'Silver';
    };

    return (
        <div className="profile-card">
            {/* Header con foto y nombre */}
            <div className="profile-card-header">
                <div className="avatar-wrapper">
                    <img src={user.avatar} alt="Avatar" className="profile-avatar" />
                    <span className="status-indicator online"></span>
                </div>
                <div className="header-info">
                    <h2>{user.name}</h2>
                    <p>{user.email}</p>
                </div>
            </div>
            
            <div className="profile-stats">
                <div className="stat-item">
                    <span className="stat-value">{stats.totalOrders}</span>
                    <span className="stat-label">Pedidos</span>
                </div>
                <div className="stat-divider"></div>
                <div className="stat-item">
                    <span className="stat-value">{stats.totalBooks}</span>
                    <span className="stat-label">Libros leídos</span>
                </div>
                <div className="stat-divider"></div>
                <div className="stat-item">
                    <span className="stat-value">{getMemberLevel(stats.totalBooks)}</span>
                    <span className="stat-label">Nivel Socio</span>
                </div>
            </div>

            {/* Info Detallada */}
            <div className="profile-card-body">
                <div className="info-group">
                    <div className="info-icon">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                    </div>
                    <div className="info-text">
                        <label>Teléfono</label>
                        <span>+34 123 456 789</span>
                    </div>
                </div>

                <div className="info-group">
                    <div className="info-icon">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                    </div>
                    <div className="info-text">
                        <label>Dirección de envío principal</label>
                        <span>Calle Mayor, 123</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default ProfileData