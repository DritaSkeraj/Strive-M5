import React, { Component } from "react";
import { Button, Spinner } from "react-bootstrap";

class Cart extends Component {
  state = {
    cart: [],
    loading: true,
    cartLoading: null,
    error: null,
  };

  componentDidMount = async () => {
    await this.fetchCart();
  };

  fetchCart = async () => {
    try {
      const resp = await fetch(process.env.REACT_APP_BE + "cart");
      // http://localhost:3001/cart
      if (resp.ok) {
        let cart = await resp.json();
        setTimeout(() => {
          this.setState({
            cart,
            loading: false,
            error: null,
          });
        }, 500);
      } else {
        this.setState({
          loading: false,
          error: "500 - Server error",
        });
      }
    } catch (e) {
      this.setState({
        loading: false,
        error: "500 - Server error",
      });
    }
  };

  removeFromCart = async (id) => {
    try {
      this.setState(
        {
          cartLoading: id,
        },
        async () => {
          const resp = await fetch(process.env.REACT_APP_BE + "cart/" + id, {
            method: "DELETE",
          });
          // http://localhost:3001/cart/lksjdkasaad
          if (resp.ok) {
            setTimeout(() => {
              this.setState(
                {
                  cartLoading: null,
                  error: null,
                },
                async () => {
                  await this.fetchCart();
                }
              );
            }, 500);
          } else {
            this.setState({
              cartLoading: null,
              error: "500 - Server error",
            });
          }
        }
      );
    } catch (e) {
      this.setState({
        cartLoading: null,
        error: "500 - Server error",
      });
    }
  };

  completeOrder = async () => {
    try {
      const resp = await fetch(process.env.REACT_APP_BE + "cart/checkout", {
        method: "POST",
        body: JSON.stringify({
          emailAddress: localStorage.getItem("email"),
        }),
        headers: new Headers({
          "Content-Type": "application/json",
        }),
      });
      if (resp.ok) {
        setTimeout(() => {
          this.setState({
            loading: false,
            error: null,
          });
        }, 500);
      } else {
        this.setState({
          loading: false,
          error: "500 - Server error",
        });
      }
    } catch (e) {
      this.setState({
        loading: false,
        error: "500 - Server error",
      });
    }
  };

  render() {
    const { cart, loading } = this.state;
    return (
      <div>
        <div className="Cart">
          <section className="game-list mt-5">
            <div className="container">
              <div className="row no-gutters">
                {loading ? (
                  <div className="position-relative w-100 h-100">
                    <Spinner
                      animation="border"
                      variant="success"
                      size="lg"
                      className="position-absolute"
                      style={{
                        top: "50%",
                        left: "50%",
                      }}
                    />
                  </div>
                ) : cart && cart.length > 0 ? (
                  <>
                    {cart.map((game) => (
                      <div
                        className="col-sm-12 col-md-6 col-lg-3 px-1"
                        key={game.id}
                      >
                        <div className="card game-card mb-3">
                          <img
                            src={game.image}
                            className="card-img-top section-list"
                            alt="card-img"
                            style={{
                              height: "10rem",
                              objectFit: "cover",
                              objectPosition: "top",
                            }}
                          />
                          <div className="card-body">
                            <span className="card-title mb-0">
                              {game.title}
                            </span>
                            <div className="product-info">
                              <div>
                                <i
                                  className="fa fa-windows"
                                  aria-hidden="true"
                                ></i>
                              </div>
                              <Button
                                variant="danger"
                                size="sm"
                                className="gog-btn game-add-to-cart mx-2"
                                onClick={() => this.removeFromCart(game.id)}
                              >
                                Remove
                                {this.state.cartLoading &&
                                  this.state.cartLoading === game.id && (
                                    <Spinner
                                      animation="border"
                                      variant="light"
                                      size="sm"
                                      className="ml-2"
                                    />
                                  )}
                              </Button>
                              <div className="price text-dark">
                                {`$${game.price}`}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                    <div className="col-12 px-1">
                      <Button
                        className="gog-btn mt-2 gog-btn-primary w-100"
                        onClick={this.completeOrder}
                      >
                        Complete order
                      </Button>
                    </div>
                  </>
                ) : (
                  <div>YOUR CART IS EMPTY</div>
                )}
              </div>
            </div>
          </section>
        </div>
      </div>
    );
  }
}

export default Cart;
