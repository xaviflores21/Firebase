import React, { useEffect, useState } from 'react';
import DatosForm from '../DatosForms';
import Dropdown from '../Dropdown';

import { collection, addDoc, onSnapshot, query, orderBy, limit, startAfter } from 'firebase/firestore';
import db from '../../Firebase';

const Datos = () => {

    const [links, setLinks] = useState([]);

    const addDataBaseFirebase = async (linkObjet) => {
        // await db.collection('datos').doc().set(linkObjet);
        // console.log(linkObjet);
        // console.log('nueva tarea agregada ');

        try {
            const docRef = await addDoc(collection(db, "datos"), linkObjet);
            console.log("datos registrado con ID: ", docRef.id);

        } catch (error) {
            console.log("Error al registrar datos: ", error);
        }
    }

    const getDatos = () => {
        // const queryDatos = await getDocs(collection(db, "datos"));
        // queryDatos.forEach((doc) => {
        //     console.log(doc.data());
        // })

        onSnapshot(query(
            collection(db, "datos"),
            orderBy("codigo", "asc"),
            limit(2),
            // startAfter(0)
        ),
            (querySnapshot) => {
                const datos = [];
                querySnapshot.forEach((doc) => {
                    datos.push({ ...doc.data(), id: doc.id });
                })
                console.log(datos);
                setLinks(datos);
            })

    }

    useEffect(() => {
        getDatos();
    }, []);
 

    function ShowAll() {
        return (
            <div className="container col-md-8">
                {links.map((link) => (

                    <div className="card mb-1" key={link.id}>
                        <div className="card-body">
                            <h5 className="card-title">Codigo: {link.codigo}</h5>
                            <p className="card-text">Nombre: {link.nombre}</p>
                            <p className="card-text">Razon Social: {link.razon}</p>
                            <p className="card-text">Nit: {link.nit}</p>
                            <p className="card-text">Telefono: {link.telefono}</p>
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    return (
        <div className='container row'>
            <div className='col-md-12'>
                <Dropdown />
            </div>
            <div className='container col-md-6'>
                <div className="p-2">
                    <DatosForm addDataBaseFirebase={addDataBaseFirebase} />
                </div>

                {ShowAll()}

                <div style={{ textAlign: "center" }}>
                    <button onClick={() => getDatos()}>Cargar mas...</button>
                </div>
            </div>


        </div>
    );
}

export default Datos;