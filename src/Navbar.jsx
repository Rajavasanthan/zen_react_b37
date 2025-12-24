import React from 'react'
import { Link } from 'react-router'

function Navbar() {
  return (<nav className="w-full">
        <div className="w-7xl mx-auto flex justify-between items-center p-5">
          <div>
            <img
              className="w-[45px]"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRgm0xw9RnQAGQxrwu2Oo8Ib2_Oxji3gGn9AQ&s"
              alt=""
            />
          </div>
          <div>
            <ul className="flex">
              <li className="px-5">
                <Link to={"/"}>Dashbaord</Link>
              </li>
              <li className="px-5">
                <Link to={"/user-list"}>Users</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>)
}

export default Navbar