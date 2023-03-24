import React, { useState, useEffect, useRef } from 'react';
import { IconMapPin } from '@tabler/icons-react';
import { IconTrash } from '@tabler/icons-react';
import { IconCirclePlus } from '@tabler/icons-react';
import { IconCircleMinus } from '@tabler/icons-react';



function SideBar({ data, onSearch }) {
    let refForm = useRef()
    const [searchValue, setSearchValue] = useState('');
    const [filteredData, setFilteredData] = useState(data);
    const [showForm, setShowForm] = useState(false);
    const [newName, setNewName] = useState('');
    const [newWkt, setNewWkt] = useState('');

    useEffect(() => {
        setFilteredData(data.filter(item =>
            item.nombre.toLowerCase().includes(searchValue.toLowerCase())
        ));
        // return () => document.removeEventListener('click', handleClick)
    }, [data, searchValue]);

    function handleClickDelete(e, id) {
        fetch(`http://localhost:3000/poligons/${id}`, {
            method: 'DELETE'
        })
            .then(() => {
                const updatedData = data.filter(item => item.id !== id);
                setFilteredData(updatedData);
            })
            window.location.reload()
    };

    function handleClickGetById(e, id) {
        fetch(`http://localhost:3000/poligons/${id}`)
            .then(response => response.json())
            .then(data => {
                // console.log(data)
                onSearch(data);
            }
            )
            .catch(error => console.error(error));

    };

    const handleClickOpen = (e) => {
        setShowForm(true);
    }

    const handleClickClose = (e) => {
        setShowForm(false);

    }

    function handleFormSubmit(e) {
        e.preventDefault();
        const newField = { nombre: newName, wkt: newWkt };
        fetch('http://localhost:3000/poligons', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newField),
        })
            .then((response) => response.json())
            .then((data) => {
                
                setFilteredData([...filteredData, data]);
                setShowForm(false);
                setNewName('');
                setNewWkt('');
            })
            .catch((error) => {
                console.error(error)
            });
            refForm.current.reset();
            window.location.reload()
    }

    return (
        <div>
            <ul className="list-group ">
                <input
                    className='list-group-item list-group-flush my-3 m-1'
                    type="text"
                    placeholder="Search..."
                    value={searchValue}
                    onChange={e => setSearchValue(e.target.value)}
                />
                <li className="list-group-item list-group-item-dark m-1 fs-5" onClick={showForm ? handleClickClose : handleClickOpen}>
                    <i className={showForm ? "text-danger m-2" : "text-success m-2"} id='iconCirclePlus'>{showForm ? <IconCircleMinus /> : <IconCirclePlus />}</i>
                    <b>New Field</b>
                </li>

                {showForm && (
                    <form ref={refForm} className='list-group m-1' onSubmit={handleFormSubmit}>
                        <input maxLength={22} type="text" name="nombre" placeholder='Nombre' onChange={(e) => setNewName(e.target.value)} />
                        <br />
                        <input type="text" name="wkt" placeholder='wkt' onChange={(e) => setNewWkt(e.target.value)}/>
                        <br />
                        <button className='btn btn-success' type="submit">Submit</button>
                    </form>
                )}
                {filteredData.map(item => (
                    <li key={item.id} className="list-group-item list-group-item-dark m-1">
                        <i className="text-success m-2" onClick={(e) => handleClickGetById(e, item.id)}><IconMapPin /></i>
                        <b>{item.nombre}</b>
                        <i className='float-end' onClick={(e) => handleClickDelete(e, item.id)}><IconTrash/></i>
                    </li>

                    
                ))}
            </ul>
        </div>
    );
}

export default SideBar