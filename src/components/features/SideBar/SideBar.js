import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import { Button } from 'reactstrap';
import products from '../../../data/products.js';

import './SideBar.scss';

class SideBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: products,
            direction: 'asc'
            
        };

    }

    sortByPrice(direction) {
        this.setState({
            data: products.sort((a, b) => {
                if (direction === 'asc') {
                    return parseFloat(a['price']) - parseFloat(b['price'])
;                } else if (direction === 'desc') {
                    return parseFloat(b['price']) - parseFloat(a['price'])
                } else {
                    return 0;
                }

            })
        });
    }
    sortByTitle(direction) {
        this.setState({
            data: products.sort((a, b) => {
                if (direction === 'asc') {
                    return a['name'].localeCompare(b['name'])
                } else if (direction === 'desc') {
                    return b['name'].localeCompare(a['name'])
                } else {
                    return 0;
                }
            })
        });
    }

    render() {
        return (
                <div className={'side-bar'}>
                    <h3>Sortowanie</h3>
                    <div className='side-bar-buttons'>
                    <Button onClick={() => this.sortByTitle('asc')}>Nazwa rosnąco</Button>
                    <Button onClick={() => this.sortByTitle('desc')}>Nazwa malejąco</Button>
                    <Button onClick={() => this.sortByPrice('asc')}>Cena rosnąco</Button>
                    <Button onClick={() => this.sortByPrice('desc')}>Cena malejąco</Button>
                    </div>
                </div>
                        )
    }
}

export default SideBar;