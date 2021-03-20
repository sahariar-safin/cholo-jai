import { React, useContext } from 'react';
import { Redirect, Route } from 'react-router';
import { UserCotex } from '../../App';

const PrivetRoute = ({children, ...rest}) => {
    const [loggedInUser, setLoggedInUser] = useContext(UserCotex);
    return (
        <div>
            <Route
                {...rest}
                render={({ location }) =>
                    loggedInUser.email ? (
                        children
                    ) : (
                        <Redirect
                            to={{
                                pathname: "/login",
                                state: { from: location }
                            }}
                        />
                    )
                }
            />
        </div>
    );
};

export default PrivetRoute;