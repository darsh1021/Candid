import Statement from "./Statement";
import './card.css';
import { useNavigate } from "react-router-dom";


function Card()
{
    const navigate = useNavigate();

    
     function nextPage()
      {
       navigate("/Login");
      }

    return(<>

        <div className="d">
      <ul>
        <li><Statement quote="Make sure not to reveal Identity"/></li>
        <li><Statement quote="Each group must talk about respective topic"/></li>
        <li><Statement quote="Feel free to talk"/></li>
      </ul>
      <div className="d2">
        <button onClick={nextPage}>Accept</button> 
        </div>
      </div>
       
    </>);
}

export default Card;