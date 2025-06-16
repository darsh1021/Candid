import React from "react";
import './header.css';
function Header({value})
{
    return(<>
        <h1 className="c1">{value}</h1>
    </>);
}

export default Header;