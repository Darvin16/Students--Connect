import React from 'react'
import { Routes, Route } from "react-router-dom";

function Dashboard() {
    return (
        <div>
            <Routes>
                <Route path="/" element={<div>Dashboard</div>} />
                <Route path='/library/request' element/>
            </Routes>
        </div>
    )
}

export default Dashboard
