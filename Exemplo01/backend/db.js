const clientes = [{
    id: 1,
    nome: "MARCELO"
},
{
    id: 2,
    nome: "RODRIGO" 
}
]

function selectClientes(){
    return clientes
}

function selectCliente(id){
    return clientes.find(c => c.id === id)
}

function insertCliente(cliente) {
   clientes.push(cliente)
}


function updateCliente(id, clienteData) {
    const cliente = clientes.find(c => c.id === id)
    if(!cliente) return
    cliente.nome = clienteData.nome
 }

 function deleteCliente(id) {
    const index = clientes.findIndex(c => c.id === id)
    if(!index) return
    clientes.splice(index, 1)
 }


module.exports = {
    selectClientes,
    selectCliente,
    insertCliente,
    updateCliente,
    deleteCliente
}