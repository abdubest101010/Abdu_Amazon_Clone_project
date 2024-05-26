import React from 'react'
import { AiOutlineMenu } from "react-icons/ai";

function LowerContainer() {
  return (
    <>
    <div className='lower_container'>
        <ul>
            <li>
                <AiOutlineMenu/>
                <p>All</p>
            </li>
            <li>Today's Deal</li>
            <li>customer service</li>
            <li>Registry</li>
            <li>Gift cards</li>
            <li>Sell</li>
        </ul>
        </div>
    </>
  )
}

export default LowerContainer