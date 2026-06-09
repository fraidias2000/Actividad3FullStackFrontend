import './UserProfile.css'
import ProfileData from "./ProfileData.jsx";
import OrderHistory from "./OrderHistory.jsx";


export function Profile() {
    return(
        <div className="profile-page-container">
            <header className="profile-header-nav">
                <h1>Mi perfil</h1>
            </header>

            <div className="profile-layout-grid">
                <ProfileData />
                <OrderHistory/>
            </div>
        </div>

    );
};