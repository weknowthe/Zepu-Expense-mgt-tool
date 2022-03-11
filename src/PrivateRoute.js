// import React, { useContext} from 'react';
// import { AuthContext } from './Auth';
// import { Route, Redirect} from 'react-router-dom';

// const PrivateRoute = ({ componnent: RouteComponent, ...rest }) => {

//     const {currentUser} = useContext(AuthContext);

//     return (
//         <Route
//         {...rest}
//             render = {
//                 routeProps =>
//                  !!currentUser ? (
//                      <RouteComponent {...routeProps} />
//                  ):(
//                      <Redirect to = {'/'}/>
//                  )
//             }
//         />

//     )
// }
// export default PrivateRoute;
// ///dcemi 4567 to 56767