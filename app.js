const workers = [
    {
        id: 1,
        firstName: 'Jon',
        lastName: 'Addams',
        department: 'IT',
        salary: '2000'
    },
    {
        id: 2,
        firstName: 'Jane',
        lastName: 'Dee',
        department: 'IT',
        salary: '3000.5'
    },
    {
        id: 3,
        firstName: 'Bob',
        lastName: 'Roben',
        department: 'Sales',
        salary: '7000'
    },
    {
        id: 4,
        firstName: 'Barb',
        lastName: "Colman",
        department: 'Sales',
        salary: '11000'
    },
    {
        id: 5,
        firstName: 'Adam',
        lastName: 'Murphy',
        department: 'Administration',
        salary: '4000'
    },
]

class AddUsers{
    constructor(){
        this.firstName = document.querySelector('#firstName')
        this.lastName = document.querySelector('#lastName')
        this.select = document.querySelector('#department')
        this.salary = document.querySelector('#salary')
        this.submit = document.querySelector('.main__pannel-submit')
        this.inputs = [...document.querySelectorAll('.main__pannel-input')]

        this.table = document.querySelector('.main__table-body')
        this.datalist = document.querySelector('#filter-name-date')

        this.filterNames = document.querySelector('#filter-names')
        this.filterDepartments = [...document.querySelectorAll('.main__filter-multipleChoice input')]
        this.filterRange = document.querySelector('.main__filter-range')
        this.filterSubmit = document.querySelector('.main__filter-submit')

        this.it = document.querySelector('.main__filter-multipleChoice-it')
        this.sales = document.querySelector('.main__filter-multipleChoice-sales')
        this.administration = document.querySelector('.main__filter-multipleChoice-administration')

        this.summary = document.querySelector('.main__table-data-salary')

        this.isChecked = ''

        this.mapWorkers = []
        this.arrSalary = []

        this.init()
    }
    init(){
        window.onload = () => this.createTable()
        this.submit.addEventListener('click', this.addUser)
        this.filterSubmit.addEventListener('click', this.filterUser)
    }
    createTable = () => {
        this.arrSalary = []
        this.table.innerHTML = ''
        workers.forEach(worker => {                    
            this.table.innerHTML += `
                <tr class="main__table-row">
                    <td class="main__table-data">${worker.id}.</td>
                    <td class="main__table-data">${worker.firstName}</td>
                    <td class="main__table-data">${worker.lastName}</td>
                    <td class="main__table-data">${worker.department}</td>
                    <td class="main__table-data">${worker.salary} USD</td>
                </tr>
            `
            this.arrSalary.push(Number(worker.salary))
            const sum = this.arrSalary.reduce((a, b) => a + b, 0)
            this.summary.textContent = `${sum} USD`
            })
    }
    addUser = () => {
        this.inputs.forEach(input => {
            input.value ? input.style.outline = '1px solid white' : (input.style.outline = '1px solid red', input.value = '')
        })
        const pushWroker = this.inputs.every(input => input.value !== '')
        pushWroker && (
            workers.push({
            id: (workers.length + 1),
            firstName: this.firstName.value,
            lastName: this.lastName.value,
            department: this.select.value,
            salary: this.salary.value
            }),
            this.inputs.forEach(input => input.value = ''),
            this.createTable(),
            this.refreshDatalist()
        )
    }
    refreshDatalist = () => {
        this.datalist.innerHTML += `
            <option value="${workers[workers.length - 1].firstName} ${workers[workers.length - 1].lastName}">
        `
    }
    filterUser = () => {
        const check = this.filterDepartments.some(input => input.checked)
        this.isChecked = check
        this.table.innerHTML = ''
        if(this.filterNames.value == '' && this.isChecked == false && this.filterRange.value == 0){
            this.createTable()
        }else{
            this.filterLogicName()
        }
    }
    filterLogicName = () => {
        this.arrSalary = []
        workers.filter(user => {
            const fullname = `${user.firstName} ${user.lastName}`
            if(this.filterNames.value == fullname && this.filterRange.value <= Number(user.salary) && ((this.it.checked && this.it.value) == user.department || (this.sales.checked && this.sales.value) == user.department || (this.administration.checked && this.administration.value) == user.department)){
                this.addToTable(user)
            }else if(this.filterNames.value == fullname && this.filterRange.value <= Number(user.salary) && this.isChecked == false){
                this.addToTable(user)
            }else if(((this.it.checked && this.it.value) == user.department || (this.sales.checked && this.sales.value) == user.department || (this.administration.checked && this.administration.value) == user.department) && this.filterRange.value <= Number(user.salary) && this.filterNames.value == ''){
                this.addToTable(user)
            }else if(this.filterRange.value <= Number(user.salary) && (this.it.checked == false && this.sales.checked == false && this.administration.checked == false) && this.filterNames.value == ''){
                this.addToTable(user)
            }
            this.table.innerHTML == '' && (this.summary.textContent = '0 USD')
            this.mapWorkers = []
        })
    }
    addToTable = (user) => {
        this.mapWorkers.push(user)
        this.mapWorkers.forEach(worker => {
            this.table.innerHTML += `
                <tr class="main__table-row">
                    <td class="main__table-data">${worker.id}.</td>
                    <td class="main__table-data">${worker.firstName}</td>
                    <td class="main__table-data">${worker.lastName}</td>
                    <td class="main__table-data">${worker.department}</td>
                    <td class="main__table-data">${worker.salary} USD</td>
                </tr>
            `
            this.arrSalary.push(Number(worker.salary))
            const sum = this.arrSalary.reduce((a, b) => a + b, 0)
            this.summary.textContent = `${sum} USD`
            console.log(this.mapWorkers)
        })
    }
}
const addUsers = new AddUsers()

class HandlerActions{
    constructor() {
        this.addButton = document.querySelector('.main__header-add')
        this.filtrButton = document.querySelector('.main__header-filtr')
        this.panelAddWorker = document.querySelector('.main__pannel')
        this.panelFiltrWorker = document.querySelector('.main__filter')

        this.addWorkerFlag = false
        this.filterWorkerFlag = false

        this.init()
    }
    init(){
        this.addButton.addEventListener('click', () => {
            this.addWorkerFlag = !this.addWorkerFlag
            this.filterWorkerFlag = false
            this.handleDisplay()
        })
        this.filtrButton.addEventListener('click', () => {
            this.filterWorkerFlag = !this.filterWorkerFlag
            this.addWorkerFlag = false
            this.handleDisplay()
        })
    }
    handleDisplay = () => {
        if(this.filterWorkerFlag){
            this.panelFiltrWorker.style.right = '-46%', this.panelFiltrWorker.style.scale = '1'
        }else{
            this.panelFiltrWorker.style.right = '0', this.panelFiltrWorker.style.scale = '0'
        }

        if(this.addWorkerFlag){
            this.panelAddWorker.style.right = '-36%', this.panelAddWorker.style.scale = '1'
        }else{
            this.panelAddWorker.style.right = '0', this.panelAddWorker.style.scale = '0'
        }
    }
}
const handlerActions = new HandlerActions()




  