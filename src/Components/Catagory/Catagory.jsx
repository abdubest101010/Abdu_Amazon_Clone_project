import React from "react";
import { CatagoryInfos } from "./CatagoryInfo";
import CatagoryCard from "./CatagoryCard";
import "./CatagoryCard.css";

function Catagory() {
  return (
    <section className="catagory_Container">
      {CatagoryInfos.map((infos, index) => (
        <CatagoryCard key={index} data={infos} />
      ))}
    </section>
  );
}

export default Catagory;
