import { isLoggedIn } from "../users/userSlice";
import { useSelector } from "react-redux";
import { results } from "./historySlice";
import History from "./History";
import NoHistory from "./NoHistory";
import NotLoggedIn from "./NotLoggedIn";
const DashBoard = () => {
  const loggedIn = useSelector(isLoggedIn);
  const history = useSelector(results);

  return (
    <>
      {!loggedIn ? (
        <NotLoggedIn></NotLoggedIn>
      ) : (
        <div>
          {history?.length == 0 ? <NoHistory></NoHistory> : <History history={history}></History>}
        </div>
      )}
    </>
  );
};

export default DashBoard;
