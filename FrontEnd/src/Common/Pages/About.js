import Navbar from "../../Components/Navigation/Navbar";

const About = () => {
    return (
        <div>
            <Navbar />
            <div className="main1" style={{ fontSize: 25 }}
            >
                <h3 className="text-center">About Us : </h3>
                <tab>&emsp;</tab>
                “Rental System for Camera Accessories” is an e-commerce webapp allows consumers to electronically
                exchange goods and services online. End user visits website to rent products from pre-added
                products. Administrator adds products. We have included functionalities like adding/removing
                products from admin side, contact, notifications, user agreement, payments etc.
                <br />
                <p>1.The system can provide easy interface so user can easily see categories,equipment and add equipment in rent.</p>

                <p>2.system can navigate the user on next page based on role.</p>

                <p>3.System can show latest product on top list.</p>

                <p>4.Admin add or remove category,equipment easily.</p>

                <p>5.System provide lots of security i.e. without the valid information no one can able to send request for the equipment.</p>

                <p>6.After sending request for equipment by user Billpdf is send on UserMail and when request is accepted by admin conformation mail is send to user.</p>

            </div>
        </div>
    );
};
export default About;