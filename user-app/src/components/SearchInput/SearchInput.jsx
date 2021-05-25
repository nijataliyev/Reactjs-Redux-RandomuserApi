import React, { useRef, useState } from 'react'

function SearchInput(props) {

    const inputEl = useRef("");
    const getSearchTerm = () => {
        props.searchKeyword(inputEl.current.value)
    }

    return (
        <div className="form-group">
            <input type="text" ref={inputEl} value={props.term} onChange={getSearchTerm} className="form-control"/>
        </div>
    )
}

export default SearchInput
