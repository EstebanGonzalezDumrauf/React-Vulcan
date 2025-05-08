export const getRibbonActions = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve([
                { text: 'Agregar', icon: 'Add', color: '#00C4B3' },
                { text: 'Detalles', icon: 'Info', color: '#4F6DF5' },
                { text: 'Exportar a Excel', icon: 'GridOn', color: '#5CD3FF' },
                { text: 'Exportar a PDF', icon: 'PictureAsPdf', color: '#F56C6C' }
            ]);
        }, 500); // delay para simular llamada async
    });
};