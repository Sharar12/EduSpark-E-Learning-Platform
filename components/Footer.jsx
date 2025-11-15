import React from 'react';
import './Footer.css';

const Logo = () => (
  <div className="footer-logo">
     <svg className="logo-icon" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 7.5V6.108c0-1.135.845-2.098 1.976-2.192.353-.026.692-.026 1.038 0 1.13.094 1.976 1.057 1.976 2.192V7.5M8.25 7.5h7.5M8.25 7.5-6 15l-2.25-2.25" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 15.75a.75.75 0 0 1 .75.75v2.25a.75.75 0 0 1-1.5 0v-2.25a.75.75 0 0 1 .75-.75Zm0 0h.01M16.5 15.75a.75.75 0 0 1 .75.75v2.25a.75.75 0 0 1-1.5 0v-2.25a.75.75 0 0 1 .75-.75Zm0 0h.01M7.5 15.75a.75.75 0 0 1 .75.75v2.25a.75.75 0 0 1-1.5 0v-2.25a.75.75 0 0 1 .75-.75Zm0 0h.01" />
    </svg>
    <span className="logo-text">EduSpark</span>
  </div>
);

const FooterLink = ({ href, children }) => (
    <a href={href} className="footer-link">{children}</a>
);

const SocialIcon = ({ href, children }) => (
    <a href={href} className="social-icon">{children}</a>
);

const Footer = () => {
    return (
        <footer className="footer" id="contact">
            <div className="container footer-container">
                <div className="footer-grid">
                    <div className="footer-about">
                        <Logo />
                        <p className="about-text">
                            Empowering individuals with affordable and accessible education.
                        </p>
                    </div>

                    <div className="footer-links-group">
                        <h3 className="footer-heading">Platform</h3>
                        <div className="footer-links">
                            <FooterLink href="#">Browse Courses</FooterLink>
                            <FooterLink href="#">For Business</FooterLink>
                            <FooterLink href="#">Teach on EduSpark</FooterLink>
                        </div>
                    </div>
                    
                    <div className="footer-links-group">
                        <h3 className="footer-heading">Company</h3>
                        <div className="footer-links">
                            <FooterLink href="#">About Us</FooterLink>
                            <FooterLink href="#">Careers</FooterLink>
                            <FooterLink href="#">Press</FooterLink>
                        </div>
                    </div>
                    
                    <div className="footer-links-group">
                        <h3 className="footer-heading">Resources</h3>
                        <div className="footer-links">
                            <FooterLink href="#">Blog</FooterLink>
                            <FooterLink href="#">Help Center</FooterLink>
                            <FooterLink href="#">Affiliates</FooterLink>
                        </div>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p className="copyright">&copy; {new Date().getFullYear()} EduSpark, Inc. All rights reserved.</p>
                    <div className="social-links">
                         <SocialIcon href="#">
                            <svg className="icon" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" /></svg>
                        </SocialIcon>
                        <SocialIcon href="#">
                           <svg className="icon" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.024.06 1.378.06 3.808s-.012 2.784-.06 3.808c-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.024.048-1.378.06-3.808.06s-2.784-.012-3.808-.06c-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.048-1.024-.06-1.378-.06-3.808s.012-2.784.06-3.808c.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.06-1.064.049-1.79.218-2.315.451a3.02 3.02 0 00-1.15 1.15c-.232.525-.402 1.25-.451 2.315-.049 1.023-.06 1.351-.06 3.807s.011 2.784.06 3.808c.049 1.064.218 1.79.451 2.315a3.02 3.02 0 001.15 1.15c.525.232 1.25.402 2.315.451 1.023.049 1.351.06 3.807.06h.468c2.456 0 2.784-.011 3.807-.06 1.064-.049 1.79-.218 2.315-.451a3.02 3.02 0 001.15-1.15c.232-.525.402-1.25.451-2.315.049-1.023.06-1.351.06-3.807s-.011-2.784-.06-3.808c-.049-1.064-.218-1.79-.451-2.315a3.02 3.02 0 00-1.15-1.15c-.525-.232-1.25.402-2.315-.451-1.023-.049-1.351-.06-3.807-.06zm-1.163 2.902a4.25 4.25 0 110 8.5 4.25 4.25 0 010-8.5zm0 1.802a2.45 2.45 0 100 4.9 2.45 2.45 0 000-4.9zM16.533 5.57a1.2 1.2 0 11-2.4 0 1.2 1.2 0 012.4 0z" clipRule="evenodd" /></svg>
                        </SocialIcon>
                         <SocialIcon href="#">
                           <svg className="icon" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.71v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" /></svg>
                        </SocialIcon>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;