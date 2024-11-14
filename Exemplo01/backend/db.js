const clientes = []

function selectClientes(){
    return clientes
}

function selectCliente(id){
    return clientes.find(c => c.id === id)
}

function selectClienteByName(name){
    return clientes.filter((el) => el.nome.toLocaleLowerCase().includes(name.toLowerCase()));
}

function selectClienteByDocument(document){
    return clientes.find(c => c.documento === document)
}

function insertCliente(cliente) {
   clientes.push(cliente)
}

function updateCliente(id, clienteData) {
    const cliente = clientes.find(c => c.id === id)
    if(!cliente) return
    cliente.nome = clienteData.nome
    cliente.tipo = clienteData.tipo
    cliente.documento = clienteData.documento
    cliente.contato = clienteData.contato
    cliente.email = clienteData.email
 }

 function deleteCliente(id) {
    const index = clientes.findIndex(c => c.id === id)
    if(index < 0) return
    clientes.splice(index, 1)
 }


module.exports = {
    selectClientes,
    selectCliente,
    selectClienteByName,
    selectClienteByDocument,
    insertCliente,
    updateCliente,
    deleteCliente
}