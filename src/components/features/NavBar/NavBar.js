import React from 'react';
import MainMenu from '../../layouts/MainMenu/MainMenu';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingBasket } from '@fortawesome/free-solid-svg-icons';
import './NavBar.scss';

class NavBar extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            links: [
                { path: '/', title: 'Home' },
                { path: '/faq', title: 'FAQ' },
                { path: '/regulamin', title: 'Regulamin' },
                { path: '/kontakt', title: 'Kontakt' },
                { path: '/cart', title: <FontAwesomeIcon icon={faShoppingBasket} />}
            ]
        };
    }
    render() {
        const { links } = this.state;

        return (
            <nav className="navbar">
                <img className='logo' src='/logo_zicherka.png' alt={'ZICHERKA'}/>
                <MainMenu links={links} />
            </nav>
        );
    }

}

export default NavBar;