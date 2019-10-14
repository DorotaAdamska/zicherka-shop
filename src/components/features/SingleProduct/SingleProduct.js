import React from 'react';
import { PropTypes } from 'prop-types';
import Spinner from '../../common/Spinner/Spinner';
import { Alert, Card, CardImg, CardText, CardBody, CardTitle, Button, } from 'reactstrap';
import { Modal, ModalBody, ModalFooter } from 'reactstrap';
import './SingleProduct.scss';


class SingleProduct extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            modal: false
        };
    }

    componentDidMount() {
        const { loadSingleProduct, resetRequest, match } = this.props;
        resetRequest();
        loadSingleProduct(match.params.id);
    }

    addToCart = () => {
        const { addProductToCart, match } = this.props;
        addProductToCart(match.params.id);
        this.toggleModal();
    }

    toggleModal = () => {
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
    }

    render() {
        const { singleProduct, request } = this.props;
        const product = singleProduct;


        if (!request.pending && request.success && singleProduct !== null)
            return (
                <div className="single-product">
                    <Card>
                        <CardImg src={product.image} />
                        <CardBody>
                            <CardTitle>{product.name}</CardTitle>
                            <CardText>{product.info}</CardText>
                            <CardText className='additional-info'>{product.additionalInfo}</CardText>
                            <CardText>{product.price} {product.currency}</CardText>
                            <Button onClick={() => this.addToCart()}>DODAJ DO KOSZYKA</Button>
                        </CardBody>
                    </Card>
                    <Modal className='modal' isOpen={this.state.modal} toggle={this.toggleModal}>
                        <ModalBody>
                            Produkt został dodany do koszyka
                        </ModalBody>
                        <ModalFooter>
                            <Button onClick={this.toggleModal}>ZAMKNIJ</Button>
                        </ModalFooter>
                    </Modal>
                </div>
            ); else if (request.pending || request.success === null) {
                return (
                    <div>
                        <Spinner />
                    </div>
                );
            }
        else if (!request.pending && request.error !== null) {
            return (
                <div>
                    <Alert color={'error'}>{request.error}</Alert>
                </div>
            );
        }
        else if (!request.pending && request.success && singleProduct === null) {
            return (
                <div>
                    <Alert color={'info'}>-- brak produktów --</Alert>
                </div>
            );
        }

        else {
            return (
                <div>
                    <Alert color={'info'}>Coś poszło NIE TAK...</Alert>
                </div>
            );
        }


    }
}
SingleProduct.propTypes = {
    singleProduct: PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        currency: PropTypes.string.isRequired,
        additionalInfo: PropTypes.string.isRequired,
        info: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,


    }),
    loadSingleProduct: PropTypes.func.isRequired,
};

export default SingleProduct;