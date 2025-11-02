import React, { useState } from 'react';
import './Header.css';




const Logo = ({ onNavigate }) => (
  <button className="logo-button" onClick={() => onNavigate('home')}>
    <div className="logo">
      <svg className="logo-icon" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 7.5V6.108c0-1.135.845-2.098 1.976-2.192.353-.026.692-.026 1.038 0 1.13.094 1.976 1.057 1.976 2.192V7.5M8.25 7.5h7.5M8.25 7.5-6 15l-2.25-2.25" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 15.75a.75.75 0 0 1 .75.75v2.25a.75.75 0 0 1-1.5 0v-2.25a.75.75 0 0 1 .75-.75Zm0 0h.01M16.5 15.75a.75.75 0 0 1 .75.75v2.25a.75.75 0 0 1-1.5 0v-2.25a.75.75 0 0 1 .75-.75Zm0 0h.01M7.5 15.75a.75.75 0 0 1 .75.75v2.25a.75.75 0 0 1-1.5 0v-2.25a.75.75 0 0 1 .75-.75Zm0 0h.01" />
      </svg>
      <span className="logo-text">EduSpark</span>
    </div>
  </button>
);



const NavLinks = ({ className, onNavigate, onLinkClick, currentUser }) => {
    const handleLinkClick = (e, targetId) => {
        e.preventDefault();
        onNavigate('home', targetId);
        if (onLinkClick) {
            onLinkClick();
        }
    };
    
    const handleCoursesClick = (e) => {
        e.preventDefault();
        if (currentUser?.role === 'student') {
            onNavigate('browseCourses');
        } else {
            onNavigate('home', 'courses');
        }
        if (onLinkClick) onLinkClick();
    };

    return (
        <nav className={className}>
            <a href="#courses" onClick={handleCoursesClick}>Courses</a>
            <a href="#about-us" onClick={(e) => handleLinkClick(e, 'about-us')}>About Us</a>
            <a href="#contact" onClick={(e) => handleLinkClick(e, 'contact')}>Contact</a>
        </nav>
    );
};




const Header = ({ onNavigate, currentUser, onSignOut, cartItemCount }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="header">
      <div className="container header-container">
        <Logo onNavigate={onNavigate} />
        <NavLinks className="nav-links-desktop" onNavigate={onNavigate} currentUser={currentUser} />
        <div className="header-actions">
           {currentUser ? (
            <div className="user-info">
              {currentUser.role === 'student' && (
                <button className="cart-button" onClick={() => onNavigate('cart')}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c.51 0 .962-.343 1.087-.835l1.823-6.836a.75.75 0 0 0-.44-1.022L8.25 4.5M3 7.5h18" />
                  </svg>
                  {cartItemCount > 0 && <span className="cart-count">{cartItemCount}</span>}
                </button>
              )}
              <span className="user-name">Welcome, {currentUser.fullName.split(' ')[0]}</span>
              <button className="btn btn-signout" onClick={onSignOut}>Sign Out</button>
            </div>
          ) : (
            <>
              <button className="btn btn-signin" onClick={() => onNavigate('signin')}>Sign In</button>
              <button className="btn btn-signup" onClick={() => onNavigate('signup')}>Sign Up</button>
            </>
          )}
        </div>
        <div className="mobile-menu-button">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <svg className="menu-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}></path></svg>
          </button>
        </div>
      </div>
      {isMenuOpen && (
        <div className="mobile-menu">
           <NavLinks className="nav-links-mobile" onNavigate={onNavigate} onLinkClick={() => setIsMenuOpen(false)} currentUser={currentUser} />
           <div className="mobile-menu-actions">
            {currentUser ? (
              <>
                 <span className="user-name">Welcome, {currentUser.fullName.split(' ')[0]}</span>
                 <button className="btn btn-signout" onClick={() => { onSignOut(); setIsMenuOpen(false); }}>Sign Out</button>
              </>
            ) : (
              <>
                <button className="btn btn-signin" onClick={() => { onNavigate('signin'); setIsMenuOpen(false); }}>Sign In</button>
                <button className="btn btn-signup" onClick={() => { onNavigate('signup'); setIsMenuOpen(false); }}>Sign Up</button>
              </>
            )}
           </div>
        </div>
      )}
    </header>
  );
};

export default Header;