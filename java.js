
const Modal = {
    open(){
        document
        .querySelector('.modal-overlay')
        .classList.add('active')
        
    },
    close() {

        
            document
            .querySelector('.modal-overlay')
            .classList.remove('active')
        

    }
}

const transactions = [{
    id: 1,
    description: 'Luz',
    amount: -50000,
    date: '23/01/2021',
   },
   {
    id: 2,
    description: 'Internet',
    amount: -20000,
    date: '23/01/2021',
   },
  {
    id: 3,
    description: 'App',
    amount: 200000,
    date: '23/01/2021',
   },

]
// Eu preciso somar as entradas
//depois eu preciso somar as saidas e
//remover das entradas o valor das saidas
//assim, eu terei o total

const Transaction = {
    all: transactions,
    add(transaction) {
        transaction.all.push(transaction)
        App.reload()
    },
    incomes() {
        let income = 0
        // pegar todas as transações 
        transaction.all.forEach(transaction => {
        // para cada transaçao, se ela for maior que zero
          if( transaction.amount > 0 ) {
        //somar a uma variavel e retornar a variavel
            income += transaction.amount;
          }
        })
         return income;
        //somae as entradas
    }, 
    expenses(){
        let expense = 0;
        // pegar todas as transações 
        transaction.all.forEach(transaction => {
        // para cada transaçao, se ela for menor que zero
          if( transaction.amount < 0 ) {
        //somar a uma variavel e retornar a variavel
            expense += transaction.amount;
          }
        })
        //somar as saidas
         return expense;
    },
    total() {

        //entradas - saidas
        return Transaction.incomes() + Transaction.expenses();
    }
}

//Substituir os dados do HTML com os dados do JS 

const DOM = {
    transactionsContainer: document.querySelector('#data-table tbody'),
    addTransaction(transaction, index) {
        const tr = document.createElement('tr')
         tr.innerHTML = DOM.innerHTMLTransaction(transaction)
         DOM.transactionsContainer.appendChild(tr)
    },

    innerHTMLTransaction(transaction){
        const CSSclass = transaction.amount > 0 ? "income" :
        "expense"

        const amount = Utils.formatCurrency(transaction.amount)
     
    const html = `
    
        <td class="description">${transaction.description}</td>
        <td class="${CSSclass}">${amount}</td>
        <td class="date">${transaction.date}</td> 
   `

   return html
   },

   updateBalance() {
       document
       .getElementById('incomeDisplay')
       .innerHTML = Utils.formatCurrency(Transaction.incomes())

       document
       .getElementById('expenseDisplay')
       .innerHTML = Utils.formatCurrency(Transaction.expenses())

       document
       .getElementById('totalDisplay')
       .innerHTML = Utils.formatCurrency(Transaction.total())

   },

   clearTransactions() {
    DOM.transactionsContainer.innerHTML = ""

   }
}

const Utils = {
    formatCurrency(value) {
        const singnal = Number(value) < 0 ? "-" : ""
        value = String(value).replace(/\D/g,"")

        value = Number(value) / 100

        value = value.toLocaleString("pt-BR",{
            style: "currency",
            currency: "BRL"
        })

        return singnal + value
    }
}

const App = {
 init() {

    Transaction.all.forEach(transaction => {
            DOM.addTransaction(transaction)

    })
    DOM.updateBalance()

    
},
 reload () {
    DOM.clearTransactions()
    App.init()
 },
}

App.init() 

    Transaction.add({
        id: 39,
        description: 'alo',
        amount: 200,
        date: '23/01/2021'
})



