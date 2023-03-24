import React, { useEffect, useState, useRef } from 'react';
import MapView from './MapView';
import './mapa.css'
import SideBar from './SideBar';




export function List() {
    const [data, setData] = useState([]);
    const [list, setList] = useState([]);
    const [clickValue, setClickValue] = useState([]);
    const prevDataRef = useRef();


    useEffect(() => {
        const getCordinates = async (url) => {
            try {
                let res = await fetch(url),
                    json = await res.json();
    
                const tarjetas = await json.map((el) => {
                    const geo = JSON.parse(el.geometry);
                    return {
                        id: el.id,
                        nombre: el.nombre,
                        poligono: [geo.coordinates],
                    };
                });
                    setData(tarjetas)
            } catch (err) {
                console.error(err);
            }
        };
        if (JSON.stringify(data) != JSON.stringify(prevDataRef.current)) {
            getCordinates("http://localhost:3000/poligons");
            console.log('se llamo a la api')
            prevDataRef.current = data;
            console.log(...data
                )

          }
        
    }, [data]);

    useEffect(() => {
        const dataList = data.map(e => {
            return e.poligono
        })

        
        setList(dataList);

        document.addEventListener('click', clickOver)

        function clickOver(e) {
            setClickValue([])
        };

        return () => {
            document.removeEventListener('click', clickOver)
        };
    }, [data]);

    const handleSearch = (data) => {
        setClickValue(data);
    };

    return (
        <div className="container-fluid vh-100">
            <div className="row">
                <div className="col">
                    <div className="col-12" >
                        <ul className="list-group ">
                            <SideBar data={data} onSearch={handleSearch} />
                        </ul>
                    </div>
                </div>
                <div className="col-9 caja">
                    <MapView 
                    list={clickValue.length !== 0 ? JSON.parse(clickValue.geometry).coordinates : list} 
                    />
                </div>
            </div>
        </div>
    );
}








