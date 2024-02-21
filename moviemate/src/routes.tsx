import {createBrowserRouter} from "react-router-dom";
import Main from "./components/Main";
import Profil from "./components/Main/Profil/Profil";
import Random from "./components/Main/Random/Random";
import Error from "./error";

export const router = createBrowserRouter( [
    {   
        path:"/Main",
        element: <Main />,
        errorElement: <Error />
    },
    {   
        path:"/Profil",
        element: <Profil />,
        errorElement: <Error />
    },
    {   
        path:"/Random",
        element: <Random />,
        errorElement: <Error />
    }

]);