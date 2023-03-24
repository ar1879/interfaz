import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, useMap, Marker, Popup, Polygon } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';
import './mapa.css'

function MapView({ list }) {
    const redOptions = { color: 'red' }
    return (
        <MapContainer center={[24.2171566, -102.1044558]} zoom={5} scrollWheelZoom={true} className='vh-100'>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Polygon pathOptions={redOptions} positions={list} />
        </MapContainer>
    )
}
export default MapView