import React from "react";

const Carousel = () => (
  <div className="container-fluid">
    <div
      id="carouselExampleIndicators"
      className="carousel slide"
      data-ride="carousel"
    >
      <ol className="carousel-indicators ind">
        <li
          data-target="#carouselExampleIndicators"
          data-slide-to="0"
          className="active"
        ></li>
        <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
        <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
        <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
        <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
        <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
      </ol>
      <div className="carousel-inner">
        <div className="carousel-item active">
          <img
            src="/img/carousel6.jpg"
            className="d-block w-100 active target"
            alt="..."
          />
          <div className="carousel-text">
            <div className="container d-flex align-items-center mb-4">
              <div>
                <span style={{ fontSize: "20px" }}>Cyberpunk 2077</span>
              </div>
              <div>
                <span className="price ml-3">$ 56.99</span>
                <button type="button" className="btn-add ml-4">
                  <i className="fa fa-cart-plus pr-1" aria-hidden="true"></i>
                  Add to cart
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="carousel-item">
          <img src="/img/carousel5.jpg" className="d-block w-100" alt="..." />
        </div>
        <div className="carousel-item">
          <img src="/img/carousel3.jpg" className="d-block w-100" alt="..." />
        </div>
        <div className="carousel-item">
          <img src="/img/carousel2.jpg" className="d-block w-100" alt="..." />
        </div>
        <div className="carousel-item">
          <img src="/img/carousel1.jpg" className="d-block w-100" alt="..." />
        </div>
      </div>
      <a
        className="carousel-control-prev slider-btn-left"
        href="#carouselExampleIndicators"
        role="button"
        data-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="sr-only">Previous</span>
      </a>
      <a
        className="carousel-control-next slider-btn-right"
        href="#carouselExampleIndicators"
        role="button"
        data-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="sr-only">Next</span>
      </a>
    </div>
  </div>
);

export default Carousel;
