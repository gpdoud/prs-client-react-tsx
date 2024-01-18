import React from 'react'
import ReactDOM from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Home from './misc/Home';
import About from './misc/About';
import UserList from './prs/user/userlist/UserList';
import UserChange from './prs/user/userchange/UserChange';
import UserCreate from './prs/user/usercreate/UserCreate';
import UserDetail from './prs/user/userdetail/UserDetail';
import UserLogin from './prs/user/userlogin/UserLogin';

const routes = createBrowserRouter([
  { path: '/', element: <Home /> },
  { path: '/login', element: <UserLogin /> },
  { path: '/user/list', element: <UserList /> },
  { path: '/user/create', element: <UserCreate /> },
  { path: '/user/detail/:id', element: <UserDetail /> },
  { path: '/user/change/:id', element: <UserChange /> },
  { path: '/about', element: <About /> }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={routes} />
  </React.StrictMode>,
)
