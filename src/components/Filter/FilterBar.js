export const FilterBar = ({setSearchTerm}) => {

    return (
        <input
            onChange={(event) => {
              setSearchTerm(event.target.value);
            }}
            type="text"
            placeholder="Search Homes"
            className="home-search"
          />
    )
}