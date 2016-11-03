import React from 'react'
import {Route, IndexRoute} from 'react-router'
import Container from './Container'
import MapComponent from './Map/Map'
import Detail from './Detail/Detail'

export const makeMainRoutes = () => {

  return (
    <Route path="/" component={Container}>
      <Route path="map" component={MapComponent} >
        <Route path="detail/:placeId" component={Detail} />
    </Route>
          <IndexRoute component={Map} />
    </Route>
  )
}

export default makeMainRoutes;
