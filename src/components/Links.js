import React, { useEffect, useState } from "react";
import LinkForm from "./LinkForm";
import { db } from "../firebase";
import { collection, addDoc, onSnapshot, doc, deleteDoc } from "firebase/firestore";

const Links = () => {
  const [links, setLinks] = useState([]);

  // Función para agregar o editar un enlace
  const addOrEdit = async (linkObject) => {
    try {
      await addDoc(collection(db, "links"), linkObject);
      console.log("New task added");
    } catch (error) {
      console.error("Error adding link:", error);
    }
  };

  // Función para eliminar un enlace con confirmación
  const onDeleteLink = async (id) => {
    const isConfirmed = window.confirm("¿Estás seguro de que deseas eliminar este enlace?");
    if (isConfirmed) {
      try {
        await deleteDoc(doc(db, "links", id)); // Elimina el documento de Firestore
        console.log("Link deleted");
      } catch (error) {
        console.error("Error deleting link:", error);
      }
    } else {
      console.log("Eliminación cancelada");
    }
  };

  // Función para obtener los enlaces en tiempo real
  const getLinks = () => {
    const unsubscribe = onSnapshot(collection(db, "links"), (snapshot) => {
      const linksArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setLinks(linksArray); // Almacena los enlaces en el estado
    },
    (error) => {
      console.error("Error getting links:", error);
    });

    return unsubscribe; // Para detener la suscripción cuando el componente se desmonte
  };

  useEffect(() => {
    const unsubscribe = getLinks(); // Suscripción para obtener datos en tiempo real
    return () => unsubscribe(); // Desuscribirse cuando el componente se desmonte
  }, []);

  return (
    <div>
      <LinkForm addOrEdit={addOrEdit} />  
      <h1>Links</h1>
      <div className="row">
        {links.map((link) => (
          <div className="col-12 mb-3" key={link.id}> {/* Ajuste de ancho completo */}
            <div className="card">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center">
                  <h5 className="card-title">
                    <a href={link.url} target="_blank" rel="noopener noreferrer" className="text-decoration-none">
                      {link.name}
                    </a>
                  </h5>
                  <i 
                    className="material-icons text-danger" 
                    role="button" 
                    onClick={() => onDeleteLink(link.id)} // Llamada a la función onDeleteLink con confirmación
                  >
                    close
                  </i>
                  <i className="material-icons">create</i>
                </div>
                <p className="card-text">{link.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Links;
