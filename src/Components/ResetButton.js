import React from 'react'
const RestButton = (props) => {
    return (
        <>
            <button className="reset--button" onClick={props.onClick}>
                Reset Game!
            </button>
        </>
    )
}
export default RestButton