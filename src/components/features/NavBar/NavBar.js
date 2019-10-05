import React from 'react';
import MainMenu from '../../layouts/MainMenu/MainMenu';
import './NavBar.scss';

class NavBar extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            links: [
                { path: '/', title: 'Home' },
                { path: '/faq', title: 'FAQ' },
                { path: '/regulamin', title: 'Regulamin' },
                { path: '/kontakt', title: 'Kontakt' }
            ]
        };
    }
    render() {
        const { links } = this.state;

        return (
            <nav className="navbar">
                <img className='logo' src='logo_zicherka.png' alt={'ZICHERKA'}/>
                <MainMenu links={links} />
            </nav>
        );
    }

}

export default NavBar;