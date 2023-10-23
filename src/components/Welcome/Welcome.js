import { Logo } from "../Logo/Logo";
import "./Welcome.css";

export const Welcome = () => {
  return (
    <>
      <Logo />
      <div className="welcome-container">
        <h1>
          <span>Where Dreams</span>
          <span>Suddenly Become Way Too Real</span>
        </h1>
        <div>Click The Home Button To See What Everyone Is Talking About</div>
      </div>
    </>
  );
};
