import React from 'react';
import { Form, Input } from 'reactstrap';
import PropTypes from 'prop-types';
import './Sorting.scss';
class Sorting extends React.Component {
    
    onChange = (event) => {
        const { onSortChange } = this.props;
        const newSort = parseInt(event.target.value);
        onSortChange(newSort);
      }
    
      render() {
        const { presentSorting } = this.props;
    
        return (
            <div className={'side-bar'}>
                <h3>Sortowanie</h3>
                <div className='side-bar-buttons'>
                <Form>
              <Input type="select" className='select-options' name="sort" id="sort"
                onChange={(event) => this.onChange(event)}
                value={presentSorting}>
                <option value="0">A do Z</option>
                <option value="1">Z do A</option>
                <option value="2">Cena rosnąco</option>
                <option value="3">Cena malejąco</option>
              </Input>
          </Form>
                </div>
            </div>
        );
    }
}

Sorting.propTypes = {
    presentSorting: PropTypes.number,
    onSortChange: PropTypes.func.isRequired,
  };

export default Sorting;