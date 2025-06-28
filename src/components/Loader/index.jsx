import { useContext } from "react";
import { ClipLoader } from "react-spinners";
import { NxtWatchContext } from "../../context/NxtWatchContext";
import { LoaderContainer } from "./styledComponents";

const LoaderView = () => {
  const { isLightTheme } = useContext(NxtWatchContext);

  return (
    <LoaderContainer data-testid="loader">
      <ClipLoader color={isLightTheme ? "#000000" : "#ffffff"} size={50} />
    </LoaderContainer>
  );
};

export default LoaderView;
