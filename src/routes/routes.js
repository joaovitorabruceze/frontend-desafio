import React from 'react'
import { Routes as RoutesDom, Route } from 'react-router-dom';
import UploadTimeSeries from '../pages/upload-time-series';

const Routes = () => {


    return (
        <RoutesDom>
            <Route path='/' element={<UploadTimeSeries />}></Route>
        </RoutesDom>
    )

}

export default Routes;