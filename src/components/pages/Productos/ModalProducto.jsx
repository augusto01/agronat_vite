import React from 'react';

const ModalProducto = ({ openModal, handleCloseModal, selectedProduct, handleEdit, handleDelete, handleChange }) => {
  return (
    <div>
      {/* Contenido del modal */}
      {openModal && (
        <div>
          <h2>Editar Producto</h2>
          <p>{selectedProduct?.name}</p>
          {/* Más lógica y contenido aquí */}
        </div>
      )}
    </div>
  );
};

export default ModalProducto;
