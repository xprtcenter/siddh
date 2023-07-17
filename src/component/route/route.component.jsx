import React from 'react'

function RouteComponent(props) {
    return (
        
            <Route path = {props.pathname} render={(props)=> React.createElement({props.componentname})} />
        
    )
}

export default RouteComponent

