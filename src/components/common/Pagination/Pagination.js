import React from 'react';
import PropTypes from 'prop-types';
import './Pagination.scss';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight, faAngleLeft } from "@fortawesome/free-solid-svg-icons";

class Pagination extends React.Component {

	state = {
		presentPage: this.props.initialPage || 1
	}

	changePage = (newPage) => {
		const { onPageChange  } = this.props;
		this.setState({ presentPage: newPage });
		onPageChange(newPage);
    }

    nextPage = increment => {
		const { changePage } = this;
		const { presentPage } = this.state;
		const targetPage = presentPage + increment;
		changePage(targetPage);
    }
    render() {

        const { pages, onPageChange } = this.props;
        const { presentPage } = this.state;
        const { changePage, nextPage } = this;

        return (
          <div className="pagination">
          <ul className="pagination__list">

              {presentPage >= 2 && (
                  <li className="pagination__list__item">
                      <FontAwesomeIcon
                          icon={faAngleLeft}
                          onClick={() => {
                              nextPage(-1);
                          }}
                      />
                  </li>
              )}

              {[...Array(pages)].map((el, page) =>
                  <li
                      key={++page}
                      onClick={() => { changePage(page) }}
                      className={`pagination__list__item${((page) === presentPage) ? ' pagination__list__item--active' : ''}`}>
                      {page}
                  </li>
              )}

              {presentPage !== pages && (
                  <li className="pagination__list__item">
                      <FontAwesomeIcon
                          icon={faAngleRight}
                          onClick={() => {
                              nextPage(1);
                          }}
                      />
                  </li>
              )}

          </ul>
      </div>
        );
      }

}

Pagination.propTypes = {
  pages: PropTypes.number.isRequired,
  initialPage: PropTypes.number,
  onPageChange: PropTypes.func.isRequired,
};

export default Pagination;