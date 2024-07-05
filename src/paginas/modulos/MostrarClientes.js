import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import ContentHeader from '../../Componentes/ContentHeader';
import Footer from '../../Componentes/Footer';
import Navbar from '../../Componentes/Navbar';
import SidebarContainer from '../../Componentes/SidebarContainer';
import APIInvoke from '../../configuracion/APIInvoke';
import swal from 'sweetalert';


const MostrarClientes = () => {
    const [clientes, setClientes] = useState([])

    const getClientes = async () => {
        const response = await APIInvoke.invokeGET('/api/clientes');
        setClientes(response.cliente); 
        console.log(response)
    }

    useEffect(() => {
        getClientes();
    }, [])

    const eliminarClientes = async (e, idCliente) => {
        e.preventDefault();
        const response = await APIInvoke.invokeDELETE(`/api/clientes/${idCliente}`);
       

        if (response.msg === "El cliente ha sido eliminado") {
            const msg = "El cliente fue eliminado correctamente";
            swal({
                title: 'Informacion',
                text: msg,
                icon: 'success',
                buttons: {
                    confirm: {
                        text: 'ok',
                        value: true,
                        visible: true,
                        className: 'btn btn-primary',
                        closeModal: true
                    }
                }
            });
            getClientes();

        } else {
            const msg = "El cliente no pudo ser eliminado correctamente";
            swal({
                title: 'Error',
                text: msg,
                icon: 'error',
                buttons: {
                    confirm: {
                        text: 'ok',
                        value: true,
                        visible: true,
                        className: 'btn btn-danger',
                        closeModal: true
                    }
                }
            });
        }
    }


    return (

        <div className='wrapper'>
            <Navbar></Navbar>
            <SidebarContainer></SidebarContainer>
            <div className='content-wrapper'>

                <ContentHeader
                    titulo={"Mecanica"}
                    breadCrumb1={"Inicio"}
                    breadCrumb2={"Dashboard"}
                    ruta1={"/home"}
                />
                <section className='content'>
                    <div className='card'>
                        <div className='card-header'>
                            <h3 className='card-title' > <Link to={"/clientes/agregar"} className='btn btn-block btn-primary btn-sm'>Crear Clientes</Link></h3>
                            <div className='card-tools'>
                                <button type='button' className='btn btn-tool' data-card-widget="collapse" title="collapse">
                                    <i className='fas fa-minus'></i>
                                </button>
                                <button type='button' className='btn btn-tool' data-card-widget="remove" title="Remove">
                                    <i className='fas fa-times'></i>
                                </button>
                            </div>
                        </div>
                        <div className='card-body'>
                            <table className='table table-bordered'>
                                <thead>
                                    <tr>
                                        <th style={{ width: '15%' }}>Nombres Clientes</th>
                                        <th style={{ width: '15%' }}>Apellidos Clientes</th>
                                        <th style={{ width: '10%' }}>Cedula</th>
                                        <th style={{ width: '15%' }}>Correo</th>
                                        <th style={{ width: '10%' }}>numeroContacto</th>
                                        <th style={{ width: '10%' }}>Nit</th>
                                        <th style={{ width: '15%' }}>Direccion</th>
                                        <th style={{ width: '10%' }}>Acciones</th>
                                    </tr>
                                </thead>
                                 <tbody>

                                 {clientes.map((cli, index) => (
                                    <tr key={index}>
                                        <td>{cli.nombres}</td>
                                        <td>{cli.apellidos}</td>
                                        <td>{cli.cedula}</td>
                                        <td>{cli.correo}</td>
                                        <td>{cli.numeroContacto}</td>
                                        <td>{cli.nit}</td>
                                        <td>{cli.direccion}</td>
                                        <td>
                                                <Link to={`/clientes/editar/${cli._id}`} className="btn btn-primary mt-2 mb-2"><i className="fa-solid fa-pen-to-square"></i> </Link>
                                                <button onClick={(e) => eliminarClientes(e, cli._id)} className="btn btn-danger"> <i className="fa-solid fa-trash"></i> </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </section>
            </div>
              <Footer></Footer>
        </div>
    );
}

export default MostrarClientes