import React from 'react'
import Navbar from './../../Components/Navigation/Navbar';

function PageNotFound() {
    return (
        <div>
         <Navbar/>
            <div class="container-fluied">
                {/* <div class="card" >
                    <div class="card-header text-center">
                        <h5 class="text-center">404 Page Not Found !</h5>

                        <h6>Please retry....</h6>
                    </div>
                </div> */}
                <img src="https://assets.prestashop2.com/sites/default/files/styles/blog_750x320/public/blog/2019/10/banner_error_404.jpg?itok=eAS4swln" className="h-100 w-100"></img>
                {/* <img src="assets/Images/PageNotFound.jfif" style="height: 650px;width: 1800px;"> */}
                {/* </img> */}
            </div>
        </div>
    )
}

export default PageNotFound
