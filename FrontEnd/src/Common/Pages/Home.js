import React, { useEffect, useState } from 'react';
import Navbar from '../../Components/Navigation/Navbar';
import AllServices from '../../Services/AllServices';
//import CameraImage from '../Images/CameraImage.jpg'
import BackgroundImage from '../Images/BackgroundImage.jpg';
import Sidebar from '../../Components/Navigation/Sidebar';

function Home(props) {
  const [equipments, setEquipments] = useState([]);
  const [categories, setCategories] = useState([]);
  // const [images, setImages] = useState([]);
  const getAllCategories = () => {
    AllServices.getAllCategories().then((res) => {
      setCategories(res.data.result);
      console.log(JSON.stringify(categories));
    })
  }
  const getAllEquipments = () => {
    AllServices.getAllEquipmentsByCategory().then((res) => {
      setEquipments(res.data.result);
      console.log(JSON.stringify(equipments));
    })
  }
  const showEquipments = (catId, catName) => {
    props.history.push(`show-equipments-under-category/${catId}/${catName}`);
  }
  const tempUser = () => {
    let size = JSON.parse(window.localStorage.getItem("cart_size"))
    if (size === null)
      JSON.stringify(window.localStorage.setItem("cart_size", 0));
    if (size !== null)
      JSON.stringify(window.localStorage.setItem("cart_size", size));

    let uId = JSON.parse(window.localStorage.getItem("user_id"))
    if (uId === null) {
      JSON.stringify(window.localStorage.setItem("user_id", 9999));
      JSON.stringify(window.localStorage.setItem("status", false));
    }
    if (uId !== null)
      JSON.stringify(window.localStorage.setItem("user_id", uId));
  }

  // const loadImages = () => {
  //   AllServices.loadImages().then(res => {
  //     setImages(res.data);
  //   })
  // }

  // const imgSlides = () =>
  //   images.map(num => (
  //     <div >
  //       <img src={num.img}  alt="Img" />
  //     </div>
  //   ));

  useEffect(() => {
    // loadImages();
    tempUser();
    getAllCategories();
    getAllEquipments();
  }, []);
  return (

    <div style={{ backgroundImage: `url(${BackgroundImage})` }} >

      <Navbar />

      <div className="row ml-2 mt-2 mb-2 mr-2 ">
        <div className="col col-md-3 mt-1  ">
          <Sidebar />
        </div>
        <div className="col mt-0 mb-0">
          <div className="card-mb-3 mt-0 content">
            <div className="card-header ">
              <h2 className="text-center">Categories</h2>
            </div>
            <div className="card-body ">
              <div className="row row-cols-1 row-cols-md-3 g-4 ">
                {
                  categories.map(category =>
                    <div key={category.id}>
                      <div className="col">
                        <div className="card border border-dark mt-3 mb-2">
                          <button className="btn btn-outline-info custom-btn" onClick={() => showEquipments(category.id, category.categoryName)} >
                            <div className="text-center">
                              <img className="card-img-top float-center  " src={category.categoryImage} alt="..." style={{ height: "300px" }} />
                            </div>
                            <div class="card-body">
                              <h4 className="card-title text-center">{category.categoryName}</h4>
                              {/* <h5 className="card-text">{category.categoryName}</h5> */}
                            </div>
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home


