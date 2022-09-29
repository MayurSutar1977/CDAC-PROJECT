import React, { Component } from 'react';
import AdminNavbar from '../AdminNavbar';
import AdminSidebar from '../AdminSidebar';
import "../HomePage.css";
import IconImage from '../Images/CameraImage.jpg'
import CategoryServices from '../Services/CategoryServices';
import EquipmentService from '../Services/EquipmentService';

class AddEquipment extends Component {
    constructor(props) {
        super(props)

        this.state = {
            categories: [],
            id: this.props.match.params.id,
            equipmentName: '',
            brand: '',
            avialableQuantity: '',
            rentPerDay: '',
            offerDiscount: '',
            finalRent: '',
            delayCharges: '',
            image: '',
            decription: '',

        }
        this.changeFinalPriceCalculatetor = this.changeFinalPriceCalculatetor.bind(this);
        this.changeDiscountOfferHandler = this.changeDiscountOfferHandler.bind(this);
        this.changeImageUrlHandler = this.changeImageUrlHandler.bind(this);
        this.saveProduct = this.saveProduct.bind(this);
        this.cancel = this.cancel.bind(this);
    }

    onChange = (event) => {
        console.log(event.target.value)
        this.setState({ [event.target.name]: event.target.value });
    }
    changeFinalPriceCalculatetor = (discount, price) => {
        let tempPrice = parseFloat((price - ((price * discount) / 100))).toFixed(2)
        this.setState({ finalRent: tempPrice });
    }
    changeDiscountOfferHandler = (event) => {
        this.setState({ offerDiscount: event.target.value });
        this.changeFinalPriceCalculatetor(event.target.value, this.state.rentPerDay)
    }

    changeImageUrlHandler = (event) => {
        //this.setState({ productImage: event.target.files[0] })
        const formData = new FormData();
        formData.append('file', event.target.files[0]);
        EquipmentService.fileUpload(formData).then(res => {
            res.data.result != null && this.setState({ image: res.data.result });
            console.log(res.data.result);
            // return res.data.result;
        });
    }

    saveProduct = (e) => {
        e.preventDefault()

        let equipment = {
            equipmentName: this.state.equipmentName,
            brand: this.state.brand,
            avialableQuantity: this.state.avialableQuantity,
            rentPerDay: this.state.rentPerDay,
            offerDiscount: this.state.offerDiscount,
            finalRent: this.state.finalRent,
            delayCharges: parseInt(this.state.rentPerDay / 24),
            decription: this.state.decription,
            image: this.state.image
        }
        console.log('equipment => ' + JSON.stringify(equipment))
        EquipmentService.AddEquipmentByCategory(this.state.id, equipment).then(res => {
            res.data.result !== null && alert(res.data.message + "😃");
            res.data.result === null && alert(res.data.message + "🙃");
            this.props.history.push(`/equipment-under-category/${this.state.id}`)
        });
    }
    cancel() {
        window.history.back();
        // this.props.history.push(`/equipment-under-category/${this.state.id}`)
    }
    componentDidMount() {
        // if (this.state.id < 0) {
        CategoryServices.getAllCategory().then(res => {
            this.setState({ categories: res.data.result });
            console.log(res.data.result)
        })
        //}
    }
    /*
    componentDidMount() {
        CategoryServices.getCategory().then((res) => {
            this.setState({ category: res.data });
            console.log(res.data)
        });
        this.state.id !== null && CategoryServices.getCategoryById(this.state.id).then((res) => {
            let category = res.data;
            this.setState({ categoryName: category.categoryName });
            console.log(category)
        });

    }*/
    render(props) {
        return (
            <div >
                <div className="main ml-0 mr-0" >
                    <div className="row">
                        <div className="container-fluid mt-0">
                            <AdminNavbar />
                        </div>
                    </div>
                    <div className="row ">
                        <div className="col-md-2 mt-1 ">
                            <AdminSidebar />
                        </div>
                        <div className="col mt-0 ml-2" >
                            <div className="row">
                                <div className="col-md-4  mt-2" style={{ marginLeft: "-10px", marginRight: "-28px", backgroundColor: "dark" }}>
                                    <div className="cart sidebar bg-dark text-center rounded">
                                        <div className="card-body">
                                            <div className="">
                                                <img
                                                    src={IconImage}
                                                    alt="profile-img"
                                                    className="rounded-circle"
                                                    style={{ width: "100%", height: "770px" }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col mt-2 ">
                                    <div className="card rounded content">
                                        <div className="card-header">
                                            <h3 className="text-center card-title mt-2">Add Equipment</h3>
                                        </div>
                                        <div className="card-body rounded">
                                            <div className="row  mt-4">
                                                <label className="col-sm-4 col-form-label col-form-label-lg"><i class="far fa-image"></i> Choose images :</label>
                                                <div className="col-sm-8">
                                                    <input type="file" onChange={this.changeImageUrlHandler} />
                                                </div>
                                            </div>
                                            {this.state.id === "undefined" && <div className="row mb-3 mt-4">
                                                <label className="col-sm-4 col-form-label col-form-label-lg"><i class="far fa-image"></i> Choose Category :</label>
                                                <div className="col-sm-8">
                                                    <select className="form-control form-control-lg" name="id" value={this.state.id} onChange={this.onChange} placeholder="">
                                                        <option value="">Select Category</option>
                                                        {this.state.categories.map(category =>
                                                            <option key={category.id} value={category.id}>{category.categoryName}</option>
                                                        )}
                                                    </select>

                                                </div>
                                            </div>}
                                            <div className="row mb-3">
                                                <label className="col-sm-4 col-form-label col-form-label-lg"><i class="fab fa-product-hunt"></i> Equipment Name :</label>
                                                <div className="col-sm-8">
                                                    <input type="text" className="form-control form-control-lg" name="equipmentName" value={this.state.equipmentName} onChange={this.onChange} />
                                                </div>
                                            </div>
                                            <div className="row mb-3">
                                                <label className="col-sm-4 col-form-label col-form-label-lg"><i class="fas fa-industry"></i>Equipment Brand </label>
                                                <div className="col-sm-8">
                                                    <input type="text" className="form-control form-control-lg" name="brand" value={this.state.brand} onChange={this.onChange} />
                                                </div>
                                            </div>
                                            <div className="row mb-3">
                                                <label className="col-sm-4 col-form-label col-form-label-lg"><i class="fab fa-wolf-pack-battalion"></i> AvialableQuantity </label>
                                                <div className="col-sm-8">
                                                    <input type="text" className="form-control form-control-lg" name="avialableQuantity" value={this.state.avialableQuantity} onChange={this.onChange} />
                                                </div>
                                            </div>
                                            <div className="row mb-3">
                                                <label className="col-sm-4 col-form-label col-form-label-lg"><i class="fas fa-rupee-sign"></i> Rent Per Day </label>
                                                <div className="col-sm-8">
                                                    <input type="text" className="form-control form-control-lg" name="rentPerDay" value={this.state.rentPerDay} onChange={this.onChange} />
                                                </div>
                                            </div>
                                            <div className="row mb-3">
                                                <label className="col-sm-4 col-form-label col-form-label-lg"><i class="fas fa-percent"></i> Discount </label>
                                                <div className="col-sm-8">
                                                    <input type="text" className="form-control form-control-lg" name="offerDiscount" value={this.state.offerDiscount} onChange={this.changeDiscountOfferHandler} />
                                                </div>
                                            </div>
                                            <div className="row mb-3">
                                                <label className="col-sm-4 col-form-label col-form-label-lg"><i class="fas fa-rupee-sign"></i> Equipment Final Rent</label>
                                                <div className="col-sm-8">
                                                    <input type="text" className="form-control form-control-lg" name="finalRent" value={this.state.finalRent} readOnly />
                                                </div>
                                            </div>
                                            <div className="row mb-3">
                                                <label className="col-sm-4 col-form-label col-form-label-lg"><i class="fas fa-audio-description"></i> Equipment Description</label>
                                                <div className="col-sm-8">
                                                    <textarea type="text" className="form-control form-control-lg" name="decription" value={this.state.decription} onChange={this.onChange} />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="card-footer">
                                            <button className="btn btn-outline-success" onClick={this.saveProduct} ><i class="fas fa-plus-square"></i>Save</button>
                                            <button className="btn btn-outline-danger " onClick={this.cancel} style={{ marginLeft: "10px" }}><i class="fas fa-backward"></i>Cancel</button>
                                        </div>
                                    </div>
                                    <br />
                                </div>
                            </div>
                        </div>
                    </div></div>
            </div>
        )
    }
}
export default AddEquipment;







/*
import EquipmentService from '../Services/EquipmentService';

class AddEquipment extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            equipmentName: '',
            brand: '',
            avialableQuantity: '',
            rentPerDay: '',
            offerDiscount: '',
            finalRent: '',
            delayCharges: '',
            image: '',
            decription: '',

        }
        this.changeFinalPriceCalculatetor = this.changeFinalPriceCalculatetor.bind(this);
        this.changeDiscountOfferHandler = this.changeDiscountOfferHandler.bind(this);
        this.changeImageUrlHandler = this.changeImageUrlHandler.bind(this);
        this.saveProduct = this.saveProduct.bind(this);
        this.cancel = this.cancel.bind(this);
        this.getTitle = this.getTitle.bind(this);
    }

    onChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }
    changeFinalPriceCalculatetor = (discount, price) => {
        let tempPrice = parseFloat((price - ((price * discount) / 100))).toFixed(2)
        this.setState({ finalRent: tempPrice });
    }
    changeDiscountOfferHandler = (event) => {
        this.setState({ offerDiscount: event.target.value });
        this.changeFinalPriceCalculatetor(event.target.value, this.state.rentPerDay)
    }

    changeImageUrlHandler = (event) => {
        //this.setState({ productImage: event.target.files[0] })
        const formData = new FormData();
        formData.append('file', event.target.files[0]);
        EquipmentService.fileUpload(formData).then(res => {
            res.data.result != null && this.setState({ image: res.data.result });
            console.log(res.data.result);
            // return res.data.result;
        });
    }

    saveProduct = (e) => {
        e.preventDefault()

        let equipment = {
            equipmentName: this.state.equipmentName,
            brand: this.state.brand,
            avialableQuantity: this.state.avialableQuantity,
            rentPerDay: this.state.rentPerDay,
            offerDiscount: this.state.offerDiscount,
            finalRent: this.state.finalRent,
            delayCharges: this.state.delayCharges,
            decription: this.state.decription,
            image: this.state.image
        }
        console.log('equipment => ' + JSON.stringify(equipment))
        EquipmentService.AddEquipmentByCategory(this.state.id, equipment).then(res => {
            res.data.result !== null && alert(res.data.message + "😃");
            res.data.result === null && alert(res.data.message + "🙃");
            this.props.history.push(`/equipment-under-category/${this.state.id}`)
        });
    }
    cancel() {
        this.props.history.push(`/equipment-under-category/${this.state.id}`)
    }/*
    componentDidMount() {
        CategoryServices.getCategory().then((res) => {
            this.setState({ category: res.data });
            console.log(res.data)
        });
        this.state.id !== null && CategoryServices.getCategoryById(this.state.id).then((res) => {
            let category = res.data;
            this.setState({ categoryName: category.categoryName });
            console.log(category)
        });

    }


    render() {
        return (
            <div >
                <div className="main ml-0 mr-0" >
                    <AdminNavbar />
                    < div className="row ">
                        <AdminSidebar />
                        <div className="col mt-0">
                            <div className="card-mb-3 mt-0 content">
                                <h1 className="m-3 pt-3 text-center"></h1>
                                <div className="card-body">
                                <h3 className="text-center">Add Equipment</h3>
                                        <form>
                                            <div className="row mb-3">
                                                <label className="col-sm-3 col-form-label"><i class="far fa-image"></i> Choose images :</label>
                                                <div className="col-sm-5">
                                                    <input type="file" onChange={this.changeImageUrlHandler} />
                                                </div>
                                            </div>
                                            <div className="row mb-3">
                                                <label className="col-sm-3 col-form-label"><i class="fab fa-product-hunt"></i> Equipment Name :</label>
                                                <div className="col-sm-5">
                                                    <input type="text" className="form-control" name="equipmentName" value={this.state.equipmentName} onChange={this.onChange} />
                                                </div>
                                            </div>

                                            <div className="row mb-3">
                                                <label className="col-sm-3 col-form-label"><i class="fas fa-industry"></i>Equipment Brand </label>
                                                <div className="col-sm-5">
                                                    <input type="text" className="form-control" name="brand" value={this.state.brand} onChange={this.onChange} />
                                                </div>
                                            </div>
                                            <div className="row mb-3">
                                                <label className="col-sm-3 col-form-label"><i class="fab fa-wolf-pack-battalion"></i> AvialableQuantity </label>
                                                <div className="col-sm-5">
                                                    <input type="text" className="form-control" name="avialableQuantity" value={this.state.avialableQuantity} onChange={this.onChange} />
                                                </div>
                                            </div>
                                            <div className="row mb-3">
                                                <label className="col-sm-3 col-form-label"><i class="fas fa-rupee-sign"></i> Rent Per Day </label>
                                                <div className="col-sm-5">
                                                    <input type="text" className="form-control" name="rentPerDay" value={this.state.rentPerDay} onChange={this.onChange} />
                                                </div>
                                            </div>
                                            <div className="row mb-3">
                                                <label className="col-sm-3 col-form-label"><i class="fas fa-percent"></i> Discount </label>
                                                <div className="col-sm-5">
                                                    <input type="text" className="form-control" name="offerDiscount" value={this.state.offerDiscount} onChange={this.changeDiscountOfferHandler} />
                                                </div>
                                            </div>
                                            <div className="row mb-3">
                                                <label className="col-sm-3 col-form-label"><i class="fas fa-rupee-sign"></i> Equipment Final Rent</label>
                                                <div className="col-sm-5">
                                                    <input type="text" className="form-control" name="finalRent" value={this.state.finalRent} readOnly />
                                                </div>
                                            </div>
                                            <div className="row mb-3">
                                                <label className="col-sm-3 col-form-label"><i class="fas fa-audio-description"></i> Equipment Description</label>
                                                <div className="col-sm-5">
                                                    <textarea type="text" className="form-control" name="decription" value={this.state.decription} onChange={this.onChange} />
                                                </div>
                                            </div>

                                            <button className="btn btn-outline-success" onClick={this.saveProduct} ><i class="fas fa-plus-square"></i>Save</button>
                                            <button className="btn btn-outline-danger" onClick={this.cancel.bind(this)} style={{ marginLeft: "10px" }}><i class="fas fa-backward"></i>Cancel</button>
                                        </form>
                                    </div>
                                    <br />
                                </div>
                            </div>
                        </div>

                    </div>

            </div>


        );
    }
}


export default AddEquipment;
*/

/*
😃 Smileys & People
Emojis for smileys, people, families, hand gestures, clothing and accessories.

😀 Grinning Face
😃 Grinning Face with Big Eyes
😄 Grinning Face with Smiling Eyes
😁 Beaming Face with Smiling Eyes
😆 Grinning Squinting Face
😅 Grinning Face with Sweat
🤣 Rolling on the Floor Laughing
😂 Face with Tears of Joy
🙂 Slightly Smiling Face
🙃 Upside-Down Face
😉 Winking Face
😊 Smiling Face with Smiling Eyes
😇 Smiling Face with Halo
🥰 Smiling Face with Hearts
😍 Smiling Face with Heart-Eyes
🤩 Star-Struck
😘 Face Blowing a Kiss
😗 Kissing Face
☺️ Smiling Face
😚 Kissing Face with Closed Eyes
😙 Kissing Face with Smiling Eyes
🥲 Smiling Face with Tear
😋 Face Savoring Food
😛 Face with Tongue
😜 Winking Face with Tongue
🤪 Zany Face
😝 Squinting Face with Tongue
🤑 Money-Mouth Face
🤗 Hugging Face
🤭 Face with Hand Over Mouth
🤫 Shushing Face
🤔 Thinking Face
🤐 Zipper-Mouth Face
🤨 Face with Raised Eyebrow
😐 Neutral Face
😑 Expressionless Face
😶 Face Without Mouth
😏 Smirking Face
😒 Unamused Face
🙄 Face with Rolling Eyes
😬 Grimacing Face
🤥 Lying Face
😌 Relieved Face
😔 Pensive Face
😪 Sleepy Face
🤤 Drooling Face
😴 Sleeping Face
😷 Face with Medical Mask
🤒 Face with Thermometer
🤕 Face with Head-Bandage
🤢 Nauseated Face
🤮 Face Vomiting
🤧 Sneezing Face
🥵 Hot Face
🥶 Cold Face
🥴 Woozy Face
😵 Dizzy Face
🤯 Exploding Head
🤠 Cowboy Hat Face
🥳 Partying Face
🥸 Disguised Face
😎 Smiling Face with Sunglasses
🤓 Nerd Face
🧐 Face with Monocle
😕 Confused Face
😟 Worried Face
🙁 Slightly Frowning Face
☹️ Frowning Face
😮 Face with Open Mouth
😯 Hushed Face
😲 Astonished Face
😳 Flushed Face
🥺 Pleading Face
😦 Frowning Face with Open Mouth
😧 Anguished Face
😨 Fearful Face
😰 Anxious Face with Sweat
😥 Sad but Relieved Face
😢 Crying Face
😭 Loudly Crying Face
😱 Face Screaming in Fear
😖 Confounded Face
😣 Persevering Face
😞 Disappointed Face
😓 Downcast Face with Sweat
😩 Weary Face
😫 Tired Face
🥱 Yawning Face
😤 Face with Steam From Nose
😡 Pouting Face
😠 Angry Face
🤬 Face with Symbols on Mouth
😈 Smiling Face with Horns
👿 Angry Face with Horns
💀 Skull
☠️ Skull and Crossbones
💩 Pile of Poo
🤡 Clown Face
👹 Ogre
👺 Goblin
👻 Ghost
👽 Alien
👾 Alien Monster
🤖 Robot
😺 Grinning Cat
😸 Grinning Cat with Smiling Eyes
😹 Cat with Tears of Joy
😻 Smiling Cat with Heart-Eyes
😼 Cat with Wry Smile
😽 Kissing Cat
🙀 Weary Cat
😿 Crying Cat
😾 Pouting Cat
💋 Kiss Mark
👋 Waving Hand
🤚 Raised Back of Hand
🖐️ Hand with Fingers Splayed
✋ Raised Hand
🖖 Vulcan Salute
👌 OK Hand
🤌 Pinched Fingers
🤏 Pinching Hand
✌️ Victory Hand
🤞 Crossed Fingers
🤟 Love-You Gesture
🤘 Sign of the Horns
🤙 Call Me Hand
👈 Backhand Index Pointing Left
👉 Backhand Index Pointing Right
👆 Backhand Index Pointing Up
🖕 Middle Finger
👇 Backhand Index Pointing Down
☝️ Index Pointing Up
👍 Thumbs Up
👎 Thumbs Down
✊ Raised Fist
👊 Oncoming Fist
🤛 Left-Facing Fist
🤜 Right-Facing Fist
👏 Clapping Hands
🙌 Raising Hands
👐 Open Hands
🤲 Palms Up Together
🤝 Handshake
🙏 Folded Hands
✍️ Writing Hand
💅 Nail Polish
🤳 Selfie
💪 Flexed Biceps
🦾 Mechanical Arm
🦿 Mechanical Leg
🦵 Leg
🦶 Foot
👂 Ear
🦻 Ear with Hearing Aid
👃 Nose
🧠 Brain
🫀 Anatomical Heart
🫁 Lungs
🦷 Tooth
🦴 Bone
👀 Eyes
👁️ Eye
👅 Tongue
👄 Mouth
👶 Baby
🧒 Child
👦 Boy
👧 Girl
🧑 Person
👱 Person: Blond Hair
👨 Man
🧔 Person: Beard
👨‍🦰 Man: Red Hair
👨‍🦱 Man: Curly Hair
👨‍🦳 Man: White Hair
👨‍🦲 Man: Bald
👩 Woman
👩‍🦰 Woman: Red Hair
🧑‍🦰 Person: Red Hair
👩‍🦱 Woman: Curly Hair
🧑‍🦱 Person: Curly Hair
👩‍🦳 Woman: White Hair
🧑‍🦳 Person: White Hair
👩‍🦲 Woman: Bald
🧑‍🦲 Person: Bald
👱‍♀️ Woman: Blond Hair
👱‍♂️ Man: Blond Hair
🧓 Older Person
👴 Old Man
👵 Old Woman
🙍 Person Frowning
🙍‍♂️ Man Frowning
🙍‍♀️ Woman Frowning
🙎 Person Pouting
🙎‍♂️ Man Pouting
🙎‍♀️ Woman Pouting
🙅 Person Gesturing No
🙅‍♂️ Man Gesturing No
🙅‍♀️ Woman Gesturing No
🙆 Person Gesturing OK
🙆‍♂️ Man Gesturing OK
🙆‍♀️ Woman Gesturing OK
💁 Person Tipping Hand
💁‍♂️ Man Tipping Hand
💁‍♀️ Woman Tipping Hand
🙋 Person Raising Hand
🙋‍♂️ Man Raising Hand
🙋‍♀️ Woman Raising Hand
🧏 Deaf Person
🧏‍♂️ Deaf Man
🧏‍♀️ Deaf Woman
🙇 Person Bowing
🙇‍♂️ Man Bowing
🙇‍♀️ Woman Bowing
🤦 Person Facepalming
🤦‍♂️ Man Facepalming
🤦‍♀️ Woman Facepalming
🤷 Person Shrugging
🤷‍♂️ Man Shrugging
🤷‍♀️ Woman Shrugging
🧑‍⚕️ Health Worker
👨‍⚕️ Man Health Worker
👩‍⚕️ Woman Health Worker
🧑‍🎓 Student
👨‍🎓 Man Student
👩‍🎓 Woman Student
🧑‍🏫 Teacher
👨‍🏫 Man Teacher
👩‍🏫 Woman Teacher
🧑‍⚖️ Judge
👨‍⚖️ Man Judge
👩‍⚖️ Woman Judge
🧑‍🌾 Farmer
👨‍🌾 Man Farmer
👩‍🌾 Woman Farmer
🧑‍🍳 Cook
👨‍🍳 Man Cook
👩‍🍳 Woman Cook
🧑‍🔧 Mechanic
👨‍🔧 Man Mechanic
👩‍🔧 Woman Mechanic
🧑‍🏭 Factory Worker
👨‍🏭 Man Factory Worker
👩‍🏭 Woman Factory Worker
🧑‍💼 Office Worker
👨‍💼 Man Office Worker
👩‍💼 Woman Office Worker
🧑‍🔬 Scientist
👨‍🔬 Man Scientist
👩‍🔬 Woman Scientist
🧑‍💻 Technologist
👨‍💻 Man Technologist
👩‍💻 Woman Technologist
🧑‍🎤 Singer
👨‍🎤 Man Singer
👩‍🎤 Woman Singer
🧑‍🎨 Artist
👨‍🎨 Man Artist
👩‍🎨 Woman Artist
🧑‍✈️ Pilot
👨‍✈️ Man Pilot
👩‍✈️ Woman Pilot
🧑‍🚀 Astronaut
👨‍🚀 Man Astronaut
👩‍🚀 Woman Astronaut
🧑‍🚒 Firefighter
👨‍🚒 Man Firefighter
👩‍🚒 Woman Firefighter
👮 Police Officer
👮‍♂️ Man Police Officer
👮‍♀️ Woman Police Officer
🕵️ Detective
🕵️‍♂️ Man Detective
🕵️‍♀️ Woman Detective
💂 Guard
💂‍♂️ Man Guard
💂‍♀️ Woman Guard
🥷 Ninja
👷 Construction Worker
👷‍♂️ Man Construction Worker
👷‍♀️ Woman Construction Worker
🤴 Prince
👸 Princess
👳 Person Wearing Turban
👳‍♂️ Man Wearing Turban
👳‍♀️ Woman Wearing Turban
👲 Person With Skullcap
🧕 Woman with Headscarf
🤵 Person in Tuxedo
🤵‍♂️ Man in Tuxedo
🤵‍♀️ Woman in Tuxedo
👰 Person With Veil
👰‍♂️ Man with Veil
👰‍♀️ Woman with Veil
🤰 Pregnant Woman
🤱 Breast-Feeding
👩‍🍼 Woman Feeding Baby
👨‍🍼 Man Feeding Baby
🧑‍🍼 Person Feeding Baby
👼 Baby Angel
🎅 Santa Claus
🤶 Mrs. Claus
🧑‍🎄 Mx Claus
🦸 Superhero
🦸‍♂️ Man Superhero
🦸‍♀️ Woman Superhero
🦹 Supervillain
🦹‍♂️ Man Supervillain
🦹‍♀️ Woman Supervillain
🧙 Mage
🧙‍♂️ Man Mage
🧙‍♀️ Woman Mage
🧚 Fairy
🧚‍♂️ Man Fairy
🧚‍♀️ Woman Fairy
🧛 Vampire
🧛‍♂️ Man Vampire
🧛‍♀️ Woman Vampire
🧜 Merperson
🧜‍♂️ Merman
🧜‍♀️ Mermaid
🧝 Elf
🧝‍♂️ Man Elf
🧝‍♀️ Woman Elf
🧞 Genie
🧞‍♂️ Man Genie
🧞‍♀️ Woman Genie
🧟 Zombie
🧟‍♂️ Man Zombie
🧟‍♀️ Woman Zombie
💆 Person Getting Massage
💆‍♂️ Man Getting Massage
💆‍♀️ Woman Getting Massage
💇 Person Getting Haircut
💇‍♂️ Man Getting Haircut
💇‍♀️ Woman Getting Haircut
🚶 Person Walking
🚶‍♂️ Man Walking
🚶‍♀️ Woman Walking
🧍 Person Standing
🧍‍♂️ Man Standing
🧍‍♀️ Woman Standing
🧎 Person Kneeling
🧎‍♂️ Man Kneeling
🧎‍♀️ Woman Kneeling
🧑‍🦯 Person with White Cane
👨‍🦯 Man with White Cane
👩‍🦯 Woman with White Cane
🧑‍🦼 Person in Motorized Wheelchair
👨‍🦼 Man in Motorized Wheelchair
👩‍🦼 Woman in Motorized Wheelchair
🧑‍🦽 Person in Manual Wheelchair
👨‍🦽 Man in Manual Wheelchair
👩‍🦽 Woman in Manual Wheelchair
🏃 Person Running
🏃‍♂️ Man Running
🏃‍♀️ Woman Running
💃 Woman Dancing
🕺 Man Dancing
🕴️ Person in Suit Levitating
👯 People with Bunny Ears
👯‍♂️ Men with Bunny Ears
👯‍♀️ Women with Bunny Ears
🧖 Person in Steamy Room
🧖‍♂️ Man in Steamy Room
🧖‍♀️ Woman in Steamy Room
🧘 Person in Lotus Position
🧑‍🤝‍🧑 People Holding Hands
👭 Women Holding Hands
👫 Woman and Man Holding Hands
👬 Men Holding Hands
💏 Kiss
👩‍❤️‍💋‍👨 Kiss: Woman, Man
👨‍❤️‍💋‍👨 Kiss: Man, Man
👩‍❤️‍💋‍👩 Kiss: Woman, Woman
💑 Couple with Heart
👩‍❤️‍👨 Couple with Heart: Woman, Man
👨‍❤️‍👨 Couple with Heart: Man, Man
👩‍❤️‍👩 Couple with Heart: Woman, Woman
👪 Family
👨‍👩‍👦 Family: Man, Woman, Boy
👨‍👩‍👧 Family: Man, Woman, Girl
👨‍👩‍👧‍👦 Family: Man, Woman, Girl, Boy
👨‍👩‍👦‍👦 Family: Man, Woman, Boy, Boy
👨‍👩‍👧‍👧 Family: Man, Woman, Girl, Girl
👨‍👨‍👦 Family: Man, Man, Boy
👨‍👨‍👧 Family: Man, Man, Girl
👨‍👨‍👧‍👦 Family: Man, Man, Girl, Boy
👨‍👨‍👦‍👦 Family: Man, Man, Boy, Boy
👨‍👨‍👧‍👧 Family: Man, Man, Girl, Girl
👩‍👩‍👦 Family: Woman, Woman, Boy
👩‍👩‍👧 Family: Woman, Woman, Girl
👩‍👩‍👧‍👦 Family: Woman, Woman, Girl, Boy
👩‍👩‍👦‍👦 Family: Woman, Woman, Boy, Boy
👩‍👩‍👧‍👧 Family: Woman, Woman, Girl, Girl
👨‍👦 Family: Man, Boy
👨‍👦‍👦 Family: Man, Boy, Boy
👨‍👧 Family: Man, Girl
👨‍👧‍👦 Family: Man, Girl, Boy
👨‍👧‍👧 Family: Man, Girl, Girl
👩‍👦 Family: Woman, Boy
👩‍👦‍👦 Family: Woman, Boy, Boy
👩‍👧 Family: Woman, Girl
👩‍👧‍👦 Family: Woman, Girl, Boy
👩‍👧‍👧 Family: Woman, Girl, Girl
🗣️ Speaking Head
👤 Bust in Silhouette
👥 Busts in Silhouette
🫂 People Hugging
👣 Footprints
🧳 Luggage
🌂 Closed Umbrella
☂️ Umbrella
🎃 Jack-O-Lantern
🧵 Thread
🧶 Yarn
👓 Glasses
🕶️ Sunglasses
🥽 Goggles
🥼 Lab Coat
🦺 Safety Vest
👔 Necktie
👕 T-Shirt
👖 Jeans
🧣 Scarf
🧤 Gloves
🧥 Coat
🧦 Socks
👗 Dress
👘 Kimono
🥻 Sari
🩱 One-Piece Swimsuit
🩲 Briefs
🩳 Shorts
👙 Bikini
👚 Woman’s Clothes
👛 Purse
👜 Handbag
👝 Clutch Bag
🎒 Backpack
🩴 Thong Sandal
👞 Man’s Shoe
👟 Running Shoe
🥾 Hiking Boot
🥿 Flat Shoe
👠 High-Heeled Shoe
👡 Woman’s Sandal
🩰 Ballet Shoes
👢 Woman’s Boot
👑 Crown
👒 Woman’s Hat
🎩 Top Hat
🎓 Graduation Cap
🧢 Billed Cap
🪖 Military Helmet
⛑️ Rescue Worker’s Helmet
💄 Lipstick
💍 Ring
💼 Briefcase
🩸 Drop of Blood
😮‍💨 Face Exhaling
😵‍💫 Face with Spiral Eyes
😶‍🌫️ Face in Clouds
*/