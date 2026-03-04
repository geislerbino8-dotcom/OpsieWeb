import "../styles/Form.css"


function Form(){
    return(
        <div className="contact-container">
            <form className="contact-form">
                
                <div className="form-group"> 
                    <label htmlFor="fullName">Full Name</label>
                    <input id="fullName" name="fullName" type="text"/>
                </div>

                <div className="form-group"> 
                    <label htmlFor="email">Your Email</label>
                    <input id="email" name="email" type="email"/>
                </div>

                <div className="form-group">
                    <label htmlFor="mobile">Your Mobile Number</label>
                    <input id="mobile" name="mobile" type="text"/>
                </div>

                <div className="form-group"> 
                    <label htmlFor="address">Address</label>
                    <input id="address" name="address" type="text"/>
                </div>

                <div className="form-group">
                    <label htmlFor="referral">Where did you find us? </label>
                    <select id="referral" name="referral">
                        <option value=""> Select an option</option>
                        <option value="Facebook"> Facebook</option>
                        <option value="Tiktok"> Tiktok</option>
                        <option value="Instagram"> Instagram</option>
                        <option value="Google"> Google</option>
                        <option value="Others"> Others</option>
                    </select>
                </div>
                <textarea id="custom-box" placeholder="Your message"></textarea>
                <button type="submit" className="submit-btn">
                    Submit
                </button>
                
            </form>
        </div>
    )
}

export default Form