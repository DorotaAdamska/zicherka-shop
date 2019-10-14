import React from 'react';
import Sorting from '../../common/Sorting/Sorting';
import './Products.scss'


class SideBar extends React.Component {

    render() {
        let { presentSorting, changeSorting } = this.props;

        // if (request.pending === false && request.success === true && products.length > 0) {
        return (
            <div className='side-bar'>
                <Sorting presentSorting={presentSorting} onSortChange={changeSorting} />
            </div>
        );
    }
}



export default SideBar;