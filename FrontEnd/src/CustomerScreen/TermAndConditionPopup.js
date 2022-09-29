import { Button } from 'bootstrap'
import React from 'react'
const TermAndConditionPopup = () => {
   
    return (
        <div>
            <div className="modal-header" >
                <h5 className="modal-title"> * Terms And Conditions</h5>
            </div>
            <div className=" modal-body">
                <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike" />
                <label for="vehicle1"> I have a bike</label><br />
                <input type="checkbox" id="vehicle2" name="vehicle2" value="Car" />
                <label for="vehicle2"> I have a car</label><br />
                <input type="checkbox" id="vehicle3" name="vehicle3" value="Boat" />
                <label for="vehicle3"> I have a boat</label><br />
                <button class="btn btn-success">* Agree Witth All  </button>
            </div>
           
        </div>
    )
}

export default TermAndConditionPopup
