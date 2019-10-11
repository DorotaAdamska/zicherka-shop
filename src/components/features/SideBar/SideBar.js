import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import { Button } from 'reactstrap';
import products from '../../../data/products.js';

import './SideBar.scss';
class SideBar extends React.Component {
 
    sortByPrice(key) {
        console.log('siema', key);
        let temp = products.sort((a, b) => {
            if (key === 'asc') {
                return parseFloat(a['price']) - parseFloat(b['price']);
            } else if (key === 'desc') {
                return parseFloat(b['price']) - parseFloat(a['price']);
            } else {
                return 0;
            }
        });
        console.log('temp', temp);
        // this.setState({
        //     data: temp
        // });
      
        console.log(this.state);
    }

    sortByTitle(key) {
        this.setState({
            data: products.sort((a, b) => {
                if (key === 'asc') {
                    return a['name'].localeCompare(b['name']);
                } else if (key === 'desc') {
                    return b['name'].localeCompare(a['name']);
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
                <Button onClick={(e) => {
                    console.log('klik', e);
                    console.log('this', this);
                    console.log(this.sortByPrice);
                    this.sortByPrice('asc');
                    }}>Cena rosnąco</Button>
                <Button onClick={() => this.sortByPrice('desc')}>Cena malejąco</Button>
                </div>
            </div>
        );
    }
}

export default SideBar;