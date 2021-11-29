import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from './../../hooks/UserContext';

export default function Sidebar() {

    const { user, isLoading } = useContext(UserContext);
    const [users, setUsers] = useState([]);

    React.useEffect(() => {

       
        console.log(user);
        setUsers(user);
    }, [])

    return(
        <div class="side-bar">
            <ul>
                <li> 
                    <Link to='/dashboard'>
                    Dashboard
                    </Link>
                </li>
                <li>
                    <Link to='/articles'>
                        Articles
                    </Link>
                </li>
                <li>
                    <Link to='/blog'>
                        Blogs
                    </Link>
                </li>                
                <li>
                    <Link to='/events'>
                        Events
                    </Link>
                </li>
                <li>
                    <Link to='/forum'>
                        Forums
                    </Link>
                </li>
                <li>
                    <Link to='/dashboard'>
                        Group Sessions
                    </Link>
                </li>
                <li>
                    <Link to='/video'>
                       Informational Videos
                    </Link>
                </li>
                <li>
                    <Link to='/dashboard'>
                       Professional Development
                    </Link>
                </li>                
                {users.role == 3 && <span><li>
                    <Link to='/dashboard'>
                        Studies/Research
                    </Link>
                </li>
                <li>
                    <Link to='/dashboard'>
                        My Studies
                    </Link>
                </li>
                <li>
                    <Link to='/dashboard'>
                        Participants in my Studies
                    </Link>
                </li></span>}
            </ul>
        </div>
    )
}