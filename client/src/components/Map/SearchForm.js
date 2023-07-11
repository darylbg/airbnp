import React from 'react'
import './Map.css'

function SearchForm(props) {
  return (
    <>
    <div className='search'>
    <input

  proximity="0,0"
  onChange={props.handleInputChange}
  value={props.value}
//   handleFormSubmit={handleFormSubmit}

/> 

<button
          onClick={props.handleFormSubmit}
          className="btn btn-primary"
          type="submit"
        >
          Search
        </button>
    </div>
    </>
  )
  
}


export default SearchForm;