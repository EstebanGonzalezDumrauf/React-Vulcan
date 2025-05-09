export const getRibbonActions = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve([
                { text: 'Agregar', icon: 'Add', color: '#00C4B3' },
                { text: 'Detalles', icon: 'Info', color: '#4F6DF5' },
                { text: 'Exportar a Excel', icon: 'GridOn', color: '#5CD3FF' },
                { text: 'Exportar a PDF', icon: 'PictureAsPdf', color: '#F56C6C' }
            ]);
        }, 100); // delay para simular llamada async
    });
};

export const getRibbonActions2 = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve([
                { text: 'Aceptar', icon: 'CheckCircle', color: '#4CAF50' }, // verde
                { text: 'Cancelar', icon: 'Cancel', color: '#F44336' }     // rojo
            ]);
        }, 100); // delay para simular llamada async
    });
};
