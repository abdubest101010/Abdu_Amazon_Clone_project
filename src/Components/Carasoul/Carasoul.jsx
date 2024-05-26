import React from 'react'
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css"; 
import "./Carasoul.css"
import {img} from "../img/data"
function Carasoul() {
  return (
    <div>
   <Carousel
     autoPlay={true}
     infiniteLoop={true}
     showIndicators={false}
     showThumbs={false}>

{
img.map((imageItems)=>{
    return <img src={imageItems}></img>
})
}

    </Carousel>   
    <div className='hero_img'>
        </div>   
    </div>
  )
}

export default Carasoul