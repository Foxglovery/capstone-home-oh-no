import "./FilterBar.css"

export const FilterBar = ({setSearchTerm}) => {

    return (
        <div className="search-box">
        <input
            onChange={(event) => {
              setSearchTerm(event.target.value);
            }}
            type="text"
            placeholder="Search Homes"
            className="search-input"
          />
          <a className="search-btn" href="#">
            {/* search icon */}
            <i className="fas fa-search"></i>
          </a>
          </div>
    )
}