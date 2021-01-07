import React, { Component } from "react";
import Carousel from "./Carousel";
import { Button, Spinner } from "react-bootstrap";
import CartPreview from "./CartPreview";
class Home extends Component {
  state = {
    games: [],
    cart: [],
    loading: true,
    error: null,
    cartLoading: null,
  };

  fetchCart = async () => {
    try {
      const resp = await fetch(process.env.REACT_APP_BE + "cart");
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
        this.setState({ loading: false, error: "500 - Server error" });
      }
    } catch (e) {
      this.setState({ loading: false, error: "500 - Server error" });
    }
  };

  fetchGames = async () => {
    try {
      const resp = await fetch(process.env.REACT_APP_BE + "games");
      if (resp.ok) {
        let games = await resp.json();
        setTimeout(() => {
          this.setState({
            games,
            loading: false,
            error: null,
          });
        }, 500);
      } else {
        this.setState({ loading: false, error: "500 - Server error" });
      }
    } catch (e) {
      this.setState({ loading: false, error: "500 - Server error" });
    }
  };

  componentDidMount() {
    this.fetchGames();
    this.fetchCart();

    this.props.hideCartPreview(); // prevents state remaining true after a page change
  }

  addToCart = async (id) => {
    try {
      this.setState(
        {
          cartLoading: id,
        },
        async () => {
          const resp = await fetch(process.env.REACT_APP_BE + "cart/" + id, {
            method: "POST",
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

  render() {
    const { games, cart } = this.state;
    const { hideCartPreview, showCartPreview } = this.props;
    return (
      <div className="position-relative">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <h5 className="text-wrapper mt-3">
                <i className="fa fa-highlighter pr-2"></i>Highlights
              </h5>
              <hr />
            </div>
          </div>
        </div>
        <Carousel />
        <section className="game-list mt-5">
          <div className="container">
            <div className="row">
              {games.map((game) => (
                <div className="col-sm-12 col-md-6 col-lg-3" key={game.id}>
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
                      <span className="card-title mb-0">{game.title}</span>
                      <div className="product-info">
                        <div>
                          <i className="fa fa-windows" aria-hidden="true"></i>
                        </div>
                        <Button
                          variant="success"
                          size="sm"
                          className="gog-btn gog-btn-primary game-add-to-cart mx-2"
                          onClick={() => this.addToCart(game.id)}
                        >
                          Add to cart
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
            </div>
          </div>
        </section>
        <div className="section-wrapper mt-4">
          <div className="container">
            <div className="row d-flex align-items-center info-explore">
              <div className="col-8">
                <p style={{ paddingTop: "15px" }}>
                  We are GOG.COM, the{" "}
                  <span data-toggle="tooltip" data-placement="top">
                    DRM-free
                  </span>{" "}
                  home for a <span>curated selection</span>
                  of games. This place was <span>made for gamers,</span> so make
                  yourself at home.
                </p>
              </div>

              <div className="col-4 explore d-flex align-items-center">
                <img
                  src="https://images.gog-statics.com/0164e24124875d6b41560cbcd29e44bbe9efbbaf0097e694900aabf43677ca08.png"
                  style={{ width: "30px", height: "30px" }}
                  alt="gog-circle"
                />
                <span className="pl-2">The new GOG GALAXY 2.0</span>
              </div>
            </div>
          </div>
        </div>

        <div className="container">
          <div className="row">
            <div className="col-12 pad-top">
              <h5 className="text-wrapper mt-3">
                <i className="fa fa-star pr-2" aria-hidden="true"></i>What's
                good?
              </h5>
              <hr />
            </div>
          </div>
        </div>

        <div className="container">
          <div className="row">
            <div
              className="col-sm-12 col-lg-6 col-md-12 mb-1"
              style={{ float: "left" }}
            >
              <div className="card h-100">
                <img
                  src="/img/tile (6).jpg"
                  className="card-img-top img-first-col"
                  alt="..."
                />
                <div className="card-body d-flex flex-column justify-content-between">
                  <span className="card-title">
                    Kingdom Under Fire: The Crusaders
                  </span>
                  <div className="product-info">
                    <div className="icon">
                      <i className="fa fa-windows" aria-hidden="true"></i>
                    </div>
                    <div className="price text-dark">$19.99</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-sm-12 col-md-12 col-lg-6">
              <div className="row mb-2">
                <div className="col-6" style={{ float: "left" }}>
                  <div className="card">
                    <img
                      src="/img/tile (7).jpg"
                      className="card-img-top"
                      alt="..."
                    />
                    <div className="card-body">
                      <span className="card-title">
                        Kingdom Under Fire: The Crusaders
                      </span>
                      <div className="product-info">
                        <div className="icon">
                          <i className="fa fa-windows" aria-hidden="true"></i>
                        </div>
                        <div className="price text-dark">$19.99</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-6" style={{ float: "left" }}>
                  <div className="card">
                    <img
                      src="/img/tile (8).jpg"
                      className="card-img-top"
                      alt="..."
                    />
                    <div className="card-body">
                      <span className="card-title">
                        Kingdom Under Fire: The Crusaders
                      </span>
                      <div className="product-info">
                        <div className="icon">
                          <i className="fa fa-windows" aria-hidden="true"></i>
                        </div>
                        <div className="price text-dark">$19.99</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-6" style={{ float: "left" }}>
                  <div className="card">
                    <img
                      src="/img/tile (9).jpg"
                      className="card-img-top"
                      alt="..."
                    />
                    <div className="card-body">
                      <span className="card-title">
                        Kingdom Under Fire: The Crusaders
                      </span>
                      <div className="product-info">
                        <div className="icon">
                          <i className="fa fa-windows" aria-hidden="true"></i>
                        </div>
                        <div className="price text-dark">$19.99</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-6" style={{ float: "left" }}>
                  <div className="card">
                    <img
                      src="/img/tile (10).jpg"
                      className="card-img-top"
                      alt="..."
                    />
                    <div className="card-body">
                      <span className="card-title">
                        Kingdom Under Fire: The Crusaders
                      </span>
                      <div className="product-info">
                        <div className="icon">
                          <i className="fa fa-windows" aria-hidden="true"></i>
                        </div>
                        <div className="price text-dark">$19.99</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container">
          <div className="row">
            <div className="col-12 pad-top">
              <h5 className="text-wrapper mt-3">
                <i className="fa fa-bullhorn pr-2" aria-hidden="true"></i>
                Releases you might have missed
              </h5>
              <hr />
            </div>
          </div>
        </div>
        <div className="container">
          <div
            id="multi-item-example"
            className="carousel slide carousel-multi-item"
            data-ride="carousel"
          >
            <div className="row no-gutters">
              <div
                className="col-xs-12 col-sm-6 col-md-4"
                style={{ float: "left" }}
              >
                <div className="card">
                  <img
                    src="/img/tile (7).jpg"
                    className="card-img-top section-list"
                    alt="..."
                  />
                  <div className="card-body">
                    <span className="card-title">
                      Kingdom Under Fire: The Crusaders
                    </span>
                    <div className="product-info">
                      <div className="icon">
                        <i className="fa fa-windows" aria-hidden="true"></i>
                      </div>
                      <div className="price text-dark">$19.99</div>
                    </div>
                  </div>
                </div>
              </div>

              <div
                className="col-xs-12 col-sm-6 col-md-4"
                style={{ float: "left" }}
              >
                <div className="card">
                  <img
                    src="/img/tile (8).jpg"
                    className="card-img-top section-list"
                    alt="..."
                  />
                  <div className="card-body">
                    <span className="card-title">
                      Kingdom Under Fire: The Crusaders
                    </span>
                    <div className="product-info">
                      <div className="icon">
                        <i className="fa fa-windows" aria-hidden="true"></i>
                      </div>
                      <div className="price text-dark">$19.99</div>
                    </div>
                  </div>
                </div>
              </div>

              <div
                className="col-xs-12 col-sm-6 col-md-4"
                style={{ float: "left" }}
              >
                <div className="card">
                  <img
                    src="/img/tile (11).jpg"
                    className="card-img-top section-list"
                    alt="..."
                  />
                  <div className="card-body">
                    <span className="card-title">
                      Kingdom Under Fire: The Crusaders
                    </span>
                    <div className="product-info">
                      <div className="icon">
                        <i className="fa fa-windows" aria-hidden="true"></i>
                      </div>
                      <div className="price text-dark">$19.99</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container mt-3">
          <div className="row">
            <div className="col-12">
              <h5 className="text-wrapper mt-5">
                <i className="fa fa-compass pr-2"></i>Recommended for you
              </h5>
              <hr />
            </div>
          </div>
        </div>
        <div className="container">
          <div
            id="multi-item-example"
            className="carousel slide carousel-multi-item"
            data-ride="carousel"
          >
            <div className="row no-gutters">
              <div
                className="col-xs-12 col-sm-6 col-md-4"
                style={{ float: "left" }}
              >
                <div className="card">
                  <img
                    src="/img/tile (1).jpg"
                    className="card-img-top section-list"
                    alt="..."
                  />
                  <div className="card-body">
                    <span className="card-title">
                      Kingdom Under Fire: The Crusaders
                    </span>
                    <div className="product-info">
                      <div className="icon">
                        <i className="fa fa-windows" aria-hidden="true"></i>
                      </div>
                      <div className="price text-dark">$19.99</div>
                    </div>
                  </div>
                </div>
              </div>

              <div
                className="col-xs-12 col-sm-6 col-md-4"
                style={{ float: "left" }}
              >
                <div className="card">
                  <img
                    src="/img/tile (1).jpg"
                    className="card-img-top section-list"
                    alt="..."
                  />
                  <div className="card-body">
                    <span className="card-title">
                      Kingdom Under Fire: The Crusaders
                    </span>
                    <div className="product-info">
                      <div className="icon">
                        <i className="fa fa-windows" aria-hidden="true"></i>
                      </div>
                      <div className="price text-dark">$19.99</div>
                    </div>
                  </div>
                </div>
              </div>

              <div
                className="col-xs-12 col-sm-6 col-md-4"
                style={{ float: "left" }}
              >
                <div className="card">
                  <img
                    src="/img/tile (1).jpg"
                    className="card-img-top section-list"
                    alt="..."
                  />
                  <div className="card-body">
                    <span className="card-title">
                      Kingdom Under Fire: The Crusaders
                    </span>
                    <div className="product-info">
                      <div className="icon">
                        <i className="fa fa-windows" aria-hidden="true"></i>
                      </div>
                      <div className="price text-dark">$19.99</div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="col-xs-12 col-sm-6 col-md-4"
                style={{ float: "left" }}
              >
                <div className="card">
                  <img
                    src="/img/tile (2).jpg"
                    className="card-img-top section-list"
                    alt="..."
                  />
                  <div className="card-body">
                    <span className="card-title">
                      Kingdom Under Fire: The Crusaders
                    </span>
                    <div className="product-info">
                      <div className="icon">
                        <i className="fa fa-windows" aria-hidden="true"></i>
                      </div>
                      <div className="price text-dark">$19.99</div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="col-xs-12 col-sm-6 col-md-4"
                style={{ float: "left" }}
              >
                <div className="card">
                  <img
                    src="/img/tile (2).jpg"
                    className="card-img-top section-list"
                    alt="..."
                  />
                  <div className="card-body">
                    <span className="card-title">
                      Kingdom Under Fire: The Crusaders
                    </span>
                    <div className="product-info">
                      <div className="icon">
                        <i className="fa fa-windows" aria-hidden="true"></i>
                      </div>
                      <div className="price text-dark">$19.99</div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="col-xs-12 col-sm-6 col-md-4"
                style={{ float: "left" }}
              >
                <div className="card">
                  <img
                    src="/img/tile (2).jpg"
                    className="card-img-top section-list"
                    alt="..."
                  />
                  <div className="card-body">
                    <span className="card-title">
                      Kingdom Under Fire: The Crusaders
                    </span>
                    <div className="product-info">
                      <div className="icon">
                        <i className="fa fa-windows" aria-hidden="true"></i>
                      </div>
                      <div className="price text-dark">$19.99</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container pt-5">
          <div className="row">
            <div className="col-sm-12 col-md-12 col-lg-8">
              <div className="row">
                <div className="col-4">
                  <h5 className="text-wrapper">
                    <i className="fa fa-compass pr-2"></i>Discover games
                  </h5>
                </div>
                <div className="col-8">
                  <div className="list-group-horizontal nav-2 justify-content-end d-flex">
                    <a href="/" className="link">
                      Games for you
                    </a>
                    <a href="/" className="link active-color">
                      Bestselling
                    </a>
                    <a href="/" className="link">
                      New
                    </a>
                    <a href="/" className="link">
                      Upcoming
                    </a>
                  </div>
                </div>
              </div>

              <hr />

              <div className="row d-flex justify-content-between list-games">
                <div className="col-8">
                  <img src="/img/tile (30).jpg" alt="cover" />
                  <span className="pl-3"> Cyberpunk 2077 </span>
                </div>
                <div className="col-4 align-end d-flex align-items-center">
                  <span>$ 56.99</span>
                  <span>
                    <i
                      className="fa fa-cart-plus add-to-cart"
                      aria-hidden="true"
                    ></i>
                  </span>
                </div>
              </div>

              <div className="row d-flex justify-content-between list-games">
                <div className="col-8">
                  <img src="/img/tile (29).jpg" alt="cover" />
                  <span className="pl-3"> Cyberpunk 2077 </span>
                </div>
                <div className="col-4 align-end d-flex align-items-center">
                  <span className="sale">-15%</span>
                  <div className="new_price-col">
                    <span className="small-price">$9.99</span>
                    <span>$ 56.99</span>
                  </div>
                  <span>
                    <i
                      className="fa fa-cart-plus add-to-cart"
                      aria-hidden="true"
                    ></i>
                  </span>
                </div>
              </div>

              <div className="row d-flex justify-content-between list-games">
                <div className="col-8">
                  <img src="/img/tile (28).jpg" alt="cover" />
                  <span className="pl-3"> Cyberpunk 2077 </span>
                </div>
                <div className="col-4 align-end d-flex align-items-center">
                  <span>$ 56.99</span>
                  <span>
                    <i
                      className="fa fa-cart-plus add-to-cart"
                      aria-hidden="true"
                    ></i>
                  </span>
                </div>
              </div>

              <div className="row d-flex justify-content-between list-games">
                <div className="col-8">
                  <img src="/img/tile (27).jpg" alt="cover" />
                  <span className="pl-3"> Cyberpunk 2077 </span>
                </div>
                <div className="col-4 align-end d-flex align-items-center">
                  <span>$ 56.99</span>
                  <span>
                    <i
                      className="fa fa-cart-plus add-to-cart"
                      aria-hidden="true"
                    ></i>
                  </span>
                </div>
              </div>

              <div className="row d-flex justify-content-between list-games">
                <div className="col-8">
                  <img src="/img/tile (26).jpg" alt="cover" />
                  <span className="pl-3"> Cyberpunk 2077 </span>
                </div>
                <div className="col-4 align-end d-flex align-items-center">
                  <span>$ 56.99</span>
                  <span>
                    <i
                      className="fa fa-cart-plus add-to-cart"
                      aria-hidden="true"
                    ></i>
                  </span>
                </div>
              </div>

              <div className="row d-flex justify-content-between list-games">
                <div className="col-8">
                  <img src="/img/tile (25).jpg" alt="cover" />
                  <span className="pl-3"> Cyberpunk 2077 </span>
                </div>
                <div className="col-4 align-end d-flex align-items-center">
                  <span>$ 56.99</span>
                  <span>
                    <i
                      className="fa fa-cart-plus add-to-cart"
                      aria-hidden="true"
                    ></i>
                  </span>
                </div>
              </div>

              <div className="row d-flex justify-content-between list-games">
                <div className="col-8">
                  <img src="/img/tile (24).jpg" alt="cover" />
                  <span className="pl-3"> Cyberpunk 2077 </span>
                </div>
                <div className="col-4 align-end d-flex align-items-center">
                  <span>$ 56.99</span>
                  <span>
                    <i
                      className="fa fa-cart-plus add-to-cart"
                      aria-hidden="true"
                    ></i>
                  </span>
                </div>
              </div>

              <div className="row d-flex justify-content-between list-games">
                <div className="col-8">
                  <img src="/img/tile (23).jpg" alt="cover" />
                  <span className="pl-3"> Cyberpunk 2077 </span>
                </div>
                <div className="col-4 align-end d-flex align-items-center">
                  <span>$ 56.99</span>
                  <span>
                    <i
                      className="fa fa-cart-plus add-to-cart"
                      aria-hidden="true"
                    ></i>
                  </span>
                </div>
              </div>

              <div className="row d-flex justify-content-between list-games">
                <div className="col-8">
                  <img src="/img/tile (22).jpg" alt="cover" />
                  <span className="pl-3"> Cyberpunk 2077 </span>
                </div>
                <div className="col-4 align-end d-flex align-items-center">
                  <span>$ 56.99</span>
                  <span>
                    <i
                      className="fa fa-cart-plus add-to-cart"
                      aria-hidden="true"
                    ></i>
                  </span>
                </div>
              </div>

              <div className="row text-center pt-5">
                <div className="col-12">
                  <button type="button" className="btn btn-secondary">
                    Show more
                  </button>
                </div>
              </div>
            </div>

            <div className="col-sm-12 col-md-12 col-lg-4 grid-img">
              <div className="row">
                <h5 className="text-wrapper">
                  <i className="fa fa-compass pr-2"></i>Featured
                </h5>
              </div>
              <hr />

              <div className="col-12 no-des">
                <img
                  className="img-responsive"
                  width="100%"
                  src="https://images-2.gog-statics.com/0ed40368e681aa68c76c34ade88e9776ae485fac84b2c5977b49a5e8946f2543_curated_collection_huge_tile_2x.webp"
                  alt="gog-galaxy"
                />
              </div>

              <div className="row" style={{ marginRight: 0, marginLeft: 0 }}>
                <div className="col-sm-12 col-md-6 col-lg-6 no-des">
                  <img
                    style={{ paddingBottom: "2px" }}
                    className="img-responsive"
                    height="50%"
                    width="100%"
                    src="https://images-2.gog-statics.com/3fbdf4c41773efe656882b7ce9da3918dd8d941776b53f980c45bea94a2838b1_product_tile_256_2x.webp"
                    alt=""
                  />
                  <img
                    className="img-responsive"
                    height="50%"
                    width="100%"
                    src="https://images-4.gog-statics.com/a18a7017bdca7bdd14fb003a46522e320051d3e9c1fb939559a4517d90f86170_product_tile_349_2x.webp"
                    alt=""
                  />
                </div>
                <div className="col-sm-12 col-md-6 col-lg-6 no-des">
                  <img
                    className="img-responsive"
                    height="100%"
                    width="100%"
                    src="https://images-2.gog-statics.com/77a2edcd428fdf3de24519cc024ebfd5835460d6e51db0aeee79ba634b87ea03_curated_collection_vertical_tile_2x.webp"
                    alt="cyber"
                  />
                </div>
              </div>
              <div
                className="row float-img"
                style={{ marginRight: 0, marginLeft: 0 }}
              >
                <div className="col-sm-12 col-md-6 col-lg-6 no-des">
                  <img
                    className="img-responsive"
                    height="100%"
                    width="100%"
                    src="https://images-4.gog-statics.com/b8262ef6118c82574733903ec8919e797138287d2883967ceeb273150f77d6b6_product_tile_256_2x.webp"
                    alt=""
                  />
                </div>
                <div className="col-sm-12 col-md-6 col-lg-6 no-des">
                  <img
                    className="img-responsive"
                    height="100%"
                    width="100%"
                    src="https://images-4.gog-statics.com/d0dd06614b0fdf1f006e77bb6a1e39c0441995eaaed2d06105166216d5af6776_curated_collection_small_tile_2x.webp"
                    alt=""
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <CartPreview
          cart={cart}
          show={showCartPreview}
          hideCartPreview={hideCartPreview}
          fetchCart={this.fetchCart}
        />
      </div>
    );
  }
}

export default Home;
