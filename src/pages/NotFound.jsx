
import homeLogo1 from "../images/homelogo.png";

export const NotFound = () => {
    return (
        <div className="container--0-">
  <div className="text-0-1-0">Welcome to MiniMe</div>
  <div className="text-0-1-1">
    A gentle companion that helps you take care of yourself, without adding to
    your busy days.
  </div>
  <svg
    width={440}
    height={160}
    viewBox="0 0 440 160"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect width={440} height={160} rx={8} fill="#ACF3C9" />
  </svg>
  <img src={homeLogo1} />
  <svg
    width={376}
    height={39}
    viewBox="0 0 376 39"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect width={376} height={39} rx={8} fill="white" />
  </svg>
  <svg
    width={167}
    height={42}
    viewBox="0 0 167 42"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect width={167} height={42} rx={8} fill="#062310" />
  </svg>
  <div className="text-0-1-6">Get Started</div>
  <div className="text-0-1-7">Enter your name</div>
</div>
    )
}