import React from 'react'

function Carousel() {
    return (
        <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
            <ol class="carousel-indicators">
                <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
                <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
                <li data-target="#carouselExampleIndicators" data-slide-to="3"></li>
                <li data-target="#carouselExampleIndicators" data-slide-to="4"></li>
                <li data-target="#carouselExampleIndicators" data-slide-to="5"></li>
                <li data-target="#carouselExampleIndicators" data-slide-to="6"></li>
                <li data-target="#carouselExampleIndicators" data-slide-to="7"></li>
            </ol>
            <div class="carousel-inner">
                <div class="carousel-item active">
                    <img class="d-block w-100" style={{ height: "250px" }} src="CarouselImages/1.jfif" alt="First slide" />
                </div>
                <div class="carousel-item ">
                    <img class="d-block w-100" style={{ height: "250px" }} src="CarouselImages/2.jfif" alt="First slide" />
                </div>
                <div class="carousel-item">
                    <img class="d-block w-100" style={{ height: "250px" }} src="CarouselImages/3.jfif" alt="First slide" />
                </div>
                <div class="carousel-item">
                    <img class="d-block w-100" style={{ height: "250px" }} src="CarouselImages/4.jfif" alt="First slide" />
                </div>
                <div class="carousel-item">
                    <img class="d-block w-100" style={{ height: "250px" }} src="CarouselImages/5.jfif" alt="First slide" />
                </div>
                <div class="carousel-item">
                    <img class="d-block w-100" style={{ height: "250px" }} src="CarouselImages/6.jfif" alt="First slide" />
                </div>
                <div class="carousel-item">
                    <img class="d-block w-100" style={{ height: "250px" }} src="CarouselImages/7.jfif" alt="First slide" />
                </div>
                {/* <div class="carousel-item">
                    <img class="d-block w-100" style={{ height: "250px" }} src="Images/2.jpeg" alt="Second slide" />
                </div> */}
                <div class="carousel-item">
                    <img class="d-block w-100" style={{ height: "250px" }} src="Images/3.jpeg" alt="Third slide" />
                </div>
            </div>
            <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="sr-only">Previous</span>
            </a>
            <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="sr-only">Next</span>
            </a>
        </div>
    )
}

export default Carousel
