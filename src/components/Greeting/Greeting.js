import { useEffect, useState } from "react";
import "./Greeting.css";
import { GetUserByUserId } from "../../services/homeService";

export const Greeting = ({ currentUser }) => {
    const [loggedInUser, setLoggedInUser] = useState(null);

    useEffect(() => {
        GetUserByUserId(currentUser.id).then((data) => {
            console.log("user from api", data);
            setLoggedInUser(data[0]);
        });
    }, [currentUser]);
    return (
        <div className="greeting_container">
            <div className="greeting_outer">
                <div className="greeting_inner">
                    <div className="circle">
                        <div className="circle_text">
                            {loggedInUser && loggedInUser?.name.charAt(0)}
                        </div>
                    </div>
                    <div className="greeting_sliced_name">
                        {loggedInUser && loggedInUser?.name.slice(1)}
                    </div>
                    <div>

                    </div>
                </div>
            </div>
        </div>
    );
};
