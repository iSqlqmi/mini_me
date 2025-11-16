import { useNavigate } from "react-router-dom";
import homepageLogo from "../images/Homepage_logo.png";

export const Home = () => {
  return (
    <div>
      <div className="title">
        <h1>Welcome to MiniMe!</h1>
        <img src={homepageLogo} alt="Homepage Logo" width="800px" height="1000px"/>
      </div>

      <div className="description">
        <p>Hi welcome to MiniMe! MiniMe can help you keep track of your daily needs </p>
        <p>sending you basic reminders to eat, sleep, and take a break! To get started </p>
        <p>click on the "Get Started" button below to try MiniMe today!</p>
      </div>

      <div className="title-button">
        <GetStartedButton />
      </div>
    </div>
  );
};

function GetStartedButton() {
  const navigate = useNavigate();  

  function handleClick() {
    navigate("/dashboard");        
  }

  return (
    <button onClick={handleClick}>
      Get Started!
    </button>
  );
}

export default Home;