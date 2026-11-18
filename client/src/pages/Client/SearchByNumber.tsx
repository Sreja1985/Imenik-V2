import { useState } from "react";
import { RoutesEnum } from "../../routsEnum";
import SearchBar from "../../components/Shared/SearchBar";
import BookData from "../../Data.json";

function SearchByNumber() {
  return (
    <section className="page">
      <div className="row">
        <div className="col-2"></div>
        <div className="col-8">
          {/** 
        <SearchBar
        placeholder="Search headquarters..."
        type="text"
        //data={headquarter}
        //onFilter={handleFilter} // Pass the filtering function
      />
      */}
        </div>
        <div className="col-1"></div>
        <div className="col-1">
          
        </div>
      </div>
    </section>
  );
}
export default SearchByNumber;
