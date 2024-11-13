const clientes = [{
    id: 1,
    nome: "MARCELO OLIVEIRA",
    tipo: "F",
    documento: "99999999988",
    contato: "9999998888",
    email: "marcelo_oliveira@emailtopzeira.com"
},
{
    id: 2,
    nome: "RODRIGO PEIXOTO",
    tipo: "F",
    documento: "99999999987",
    contato: "9999998887",
    email: "rodrigo_peixoto@emailtopzeira.com"
},
{
    id: 3,
    nome: "MARCELO DIAS",
    tipo: "F",
    documento: "99999999986",
    contato: "9999998886",
    email: "marcelo_dias@emailtopzeira.com" 
},
{
    id: 4,
    nome: "MARIO TOBIAS",
    tipo: "F",
    documento: "99999999985",
    contato: "9999998885",
    email: "mario_tobias@emailtopzeira.com"
},
{
    id: 5,
    nome: "CASA DA PESCA",
    tipo: "J",
    documento: "99999999000188",
    contato: "9922338888",
    email: "casa_da_pesaca@emailtopzeira.com"
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
    if(!index) return
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