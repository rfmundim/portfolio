const clientes = [{
    id: 1,
    nome: "MARCELO OLIVEIRA"
},
{
    id: 2,
    nome: "RODRIGO PEIXOTO" 
},
{
    id: 3,
    nome: "MARCELO DIAS" 
},
{
    id: 4,
    nome: "MARIO DIAS" 
}
]

function selectClientes(){
    return clientes
}

function selectCliente(id){
    return clientes.find(c => c.id === id)
}

function selectClienteByName(name){
    return clientes.filter((el) => el.nome.toLocaleLowerCase().includes(name.toLowerCase()));
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
    selectClienteByName,
    insertCliente,
    updateCliente,
    deleteCliente
}