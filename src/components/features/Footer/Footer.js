import React from 'react';
import MainMenu from '../../layouts/MainMenu/MainMenu';

class Footer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            links: [
                { path: '/', title: 'Home' },
                { path: '/faq', title: 'FAQ' },
                { path: '/regulamin', title: 'Regulamin' },
                { path: '/contact', title: 'Kontakt' },
            ]
        };
    }

    render() {
        const { links } = this.state;

        return (
            <nav className='navbar'>
                <p>Copyright by ZICHERKA 2019</p>
                <MainMenu links={links} />
            </nav>
        );
    }

}

export default Footer;