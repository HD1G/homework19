import React from "react"

function SearchBox({ handleSearchChange }) {
    return (
      <div className="searchbox d-flex justify-content-center mx-auto">
   <form className="form-inline">
        <input
          className="form-control mr-sm-2"
          type="search"
          placeholder="Search"
          aria-label="Search"
          onChange={e => handleSearchChange(e)}
        />
        <button className="btn btn-info" type="submit">
          Search
        </button>
      </form>
      </div>
    );
  }
  export default SearchBox;
  