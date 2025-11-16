import { useNavigate } from "react-router-dom";

export const Home = () => {
  return (
    <div>
      <div>
        <h1>Welcome to MiniMe!</h1>
      </div>

      <div>
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