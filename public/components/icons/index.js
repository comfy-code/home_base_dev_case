import Info from "../icons/Info";
import Nearby from "../icons/Nearby.js";
import Popular from "../icons/Popular.js";
import Check from "../icons/Check.js";

const Icon = ({ name }) => {
  switch (name) {
    case "info":
      return <Info />;
    case "nearby":
      return <Nearby />;
    case "popular":
      return <Popular />;
    case "check":
      return <Check />;
    default:
      return <div />;
  }
};
export default Icon;
