import React, { useState } from 'react';

function formGroup(descripcion, nombre, icon, handleInputChange, value) {
    return (
        <div style={{ paddingBottom: 10 }}>
            <form className='card card-body'>
                <div className="form-group input-group">
                    <div className='input-group-text bg-light'>
                        <i className="material-icons">{icon}</i>
                    </div>
                    <input
                        type="text"
                        className='form-control'
                        placeholder={descripcion}
                        name={nombre}
                        onChange={handleInputChange}
                        value={value} />
                </div>
            </form>
        </div>
    );
}

const DatosForm = (props) => {

    const initialStateValues = {
        codigo: '',
        nombre: '',
        razon: '',
        nit: '',
        telefono: '',
    }

    const [values, setValues] = useState(initialStateValues);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        //console.log(name, value);
        setValues({ ...values, [name]: value });

    }

    const handleSubmit = (e) => {
        e.preventDefault();
        //console.log(values);
        props.addDataBaseFirebase(values);
        setValues({ ...initialStateValues });
    }

    return (
        <div>
            {formGroup("Codigo", "codigo", "confirmation_number", handleInputChange, values.codigo)}
            {formGroup("Nombre", "nombre", "book", handleInputChange, values.nombre)}
            {formGroup("Razon Social", "razon", "book", handleInputChange, values.razon)}
            {formGroup("Nit", "nit", "account_balance", handleInputChange, values.nit)}
            {formGroup("Telefono", "telefono", "local_phone", handleInputChange, values.telefono)}

            <form className='card card-body' onSubmit={handleSubmit}>
                <button className='btn btn-primary btn-block'>
                    GUARDAR
                </button>
            </form>
        </div>
    );
}

export default DatosForm;