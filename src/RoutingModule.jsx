import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Login from "./component/Login/Login";
import Signup from "./component/Signup/Signup";
import Header from "./component/Header/Header";
import Note from "./component/Note/Note";
import Notecard from "./component/Notecard/Notecard";
import Dashboard from "./component/Dashboard/Dashboard";
import NotesContainer from "./component/NotesContainer/NotesContainer";
import TrashContainer from "./component/TrashContainer/TrashContainer";
import ArchiveContainer from "./component/ArchiveContainer/ArchiveContainer";
import { Provider } from "react-redux";
import appStore from "./store/appStore";


function RoutingModule (){
    const appRoutes = createBrowserRouter([
        {
            path:"",
            element:<Login/>
        },
        {
            path:"/signup",
            element:<Signup/>
        },
        {
            path: "/dashboard",
            element: <Dashboard/>,
            children: [
                {
                    path: "notes",
                    element: <NotesContainer/>,
                },
                {
                    path: "archive",
                    element: <ArchiveContainer/>
                },
                {
                    path: "trash",
                    element: <TrashContainer/>
                }
            ]
        },
        {
            path:"/mainpage",
            element:<Header/>
        },
        {
            path:"/note",
            element:<Note/>
        },
        {
            path:"/notecard",
            element:<Notecard/>
        }
    ])
    return (
       <Provider store={appStore}>

           <RouterProvider router={appRoutes}/>
       </Provider> 
    )
}

export default RoutingModule;