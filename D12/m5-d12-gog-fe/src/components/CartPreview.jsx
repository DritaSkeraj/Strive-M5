import React, { Component } from "react";
import { Button, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
class CartPreview extends Component {
  state = { cartLoading: null };

  removeFromCart = async (id) => {
    try {
      this.setState({
        cartLoading: id,
      });
      const resp = await fetch(process.env.REACT_APP_BE + "cart/" + id, {
        method: "DELETE",
      });
      if (resp.ok) {
        setTimeout(() => {
          this.setState(
            {
              cartLoading: null,
              error: null,
            },
            async () => {
              await this.props.fetchCart(true);
            }
          );
        }, 500);
      } else {
        this.setState({ cartLoading: null, error: "500 - Server error" });
      }
    } catch (e) {
      this.setState({ cartLoading: null, error: "500 - Server error" });
    }
  };

  render() {
    const { cart, show, hideCartPreview } = this.props;
    return (
      <>
        {show && (
          <>
            <div className="cart-preview card shadow-lg py-3 px-4">
              {cart && cart.length > 0 && (
                <ul className="pl-0">
                  {cart.map((item, i) => (
                    <li
                      key={i}
                      className="cart-preview-item d-flex justify-content-between mb-1"
                    >
                      <div>
                        <img src={item.image} width="50" className="mr-2" />
                        <span>{item.title}</span>
                      </div>

                      <div
                        className="d-flex justify-content-end"
                        style={{ minWidth: "80px" }}
                      >
                        <Button
                          size="sm"
                          variant="danger"
                          className="remove-from-cart"
                          style={{ padding: "0.15rem 0.5rem" }}
                          onClick={() => this.removeFromCart(item.id)}
                        >
                          {this.state.cartLoading &&
                          this.state.cartLoading === item.id ? (
                            <Spinner
                              animation="border"
                              variant="light"
                              size="sm"
                            />
                          ) : (
                            <i className="fa fa-times" />
                          )}
                        </Button>
                        <span className="item-price ml-2">{item.price}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
              {cart && cart.length > 0 && (
                <Link to={"/cart"} className="w-100">
                  <Button className="gog-btn gog-btn-primary w-100">
                    {" "}
                    Go to Checkout
                  </Button>
                </Link>
              )}
              {(!cart || cart.length === 0) && (
                <div style={{ width: 354.11 }} className="text-center my-3">
                  <p className="mb-0">
                    <i className="fa fa-frown-o text-danger mr-2" />
                    Cart is empty, add some products to proceed.
                  </p>
                </div>
              )}
            </div>
            <div
              className="cart-preview-outer"
              onMouseEnter={hideCartPreview}
            ></div>
          </>
        )}
      </>
    );
  }
}

export default CartPreview;
