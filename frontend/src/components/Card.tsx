import "../styles/Card.css"
import image from "../assets/opsie/Image1.jpg"


function Card() {
  return (
    <div className="container">
      <section>
        <img className="image" src={image} alt="Opsie Logo" />
        <h2>Visit Us</h2>
      
         <p> Location</p>
        <p> 
        Princeton Street, Center Shaw Blvd <br />
        Mandaluyong City
        </p>
        </section>    
    </div>
  );
}

export default Card;