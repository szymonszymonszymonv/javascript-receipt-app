class Product {
    id
    constructor(name, amount, price) {
        this.id = Product.incrementId()
        this.name = name
        this.amount = parseInt(amount)
        this.price = parseInt(price)
        this.sum = amount * price

        this.element = document.createElement("div")
        this.nameElement = document.createElement("span")
        this.amountElement = document.createElement("span")
        this.priceElement = document.createElement("span")
        this.sumElement = document.createElement("span")

        this.nameElement.className = `name`
        this.amountElement.className = `amount`
        this.priceElement.className = `price`
        this.sumElement.className = 'sum'

        this.element.className = `product`
        this.element.id = `${this.id}`

    }

    static incrementId = () => {
        if (!this.lastId) {
            this.lastId = 1
        }
        else {
            this.lastId++
        }
        return this.lastId
    }

    createElement = () => {

        this.nameElement.innerHTML = this.name
        this.amountElement.innerHTML = this.amount
        this.priceElement.innerHTML = this.price
        this.sumElement.innerHTML = this.sum


        this.element.appendChild(this.nameElement)
        this.element.appendChild(this.amountElement)
        this.element.appendChild(this.priceElement)
        this.element.appendChild(this.sumElement)

        return this.element

    }

    editElement = () => {

        this.nameElement.innerHTML = this.name
        this.amountElement.innerHTML = this.amount
        this.priceElement.innerHTML = this.price
        this.sumElement.innerHTML = this.sum
    }
    removeElement = () => {

        this.element.removeChild(this.nameElement)
        this.element.removeChild(this.amountElement)
        this.element.removeChild(this.priceElement)
        this.element.removeChild(this.sumElement)


    }

}

class ProductContainer {

    products = []
    id = 0
    productsContainerElement = document.getElementsByClassName("productContainer")[0]

    AddProduct = (product) => {
        if(this.products.find(x => x.name == product.name)){
            alert("Dodawany przedmiot istnieje już na liście")
        }
        else{

            if (isNaN(product.name) && product.price && product.amount) {
    
                this.products.push(product)
                this.productsContainerElement.appendChild(product.createElement())
                let editSelect = document.getElementById("editSelect");
    
                let removeSelect = document.getElementById("removeSelect");
    
                let option1 = document.createElement("option");
    
    
                option1.text = product.name
    
                let option2 = option1.cloneNode(true)
    
                editSelect.add(option1)
                removeSelect.add(option2)
    
                console.log(this.products)
            }
            else {
                alert("Upewnij się, że dane przyd dodawaniu produktu zostały wprowadzone prawidłowo!!!")
            }
        }

    }

    RemoveProduct = () => {

        let editSelect = document.getElementById("editSelect");

        let removeSelect = document.getElementById("removeSelect");

        console.log(removeSelect.selectedIndex)


        let product = this.products.find(x => x.name == removeSelect.options[removeSelect.selectedIndex].text)


        product.removeElement()
        this.products = this.products.filter(x => x.name != removeSelect.options[removeSelect.selectedIndex].text) // zmien chyba??

        console.log(this.products)

        editSelect.remove(removeSelect.selectedIndex)
        removeSelect.remove(removeSelect.selectedIndex)



    }

    EditProduct = (name, amount, price) => {
        let select = document.getElementById("editSelect");
        let removeSelect = document.getElementById("removeSelect")

        if(this.products.find(x => x.name == name)){
            alert("Nie możesz edytować nazwy produktu na tą która już istnieje")
        }
        else{
            if (price != 0 && amount != 0) {
                if (isNaN(name) && !isNaN(price) && !isNaN(amount)) {
                    this.products[select.selectedIndex].name = name
                    this.products[select.selectedIndex].price = price
                    this.products[select.selectedIndex].amount = amount
                    this.products[select.selectedIndex].sum = price * amount
    
                    this.products[select.selectedIndex].editElement() // akutalizacja wyświetlania
    
                    let product = this.products.find(x => x.name == name)
    
                    let option1 = document.createElement("option");
    
                    option1.text = product.name
                    let option2 = option1.cloneNode(true)
    
    
                    removeSelect.options[select.selectedIndex] = option2 // akutalizacja selecta edit
                    select.options[select.selectedIndex] = option1 // akutalizacja selecta remove
                }
                else {
                    alert("Upewnij się, że dane edycji zostały wprowadzone prawidłowo!!!")
                }
    
            }
            else {
                alert("Ilość i cena nie mogą być 0!!!")
            }
        }
    }

    SwapProducts = () => {

    }
}


let buttonAdd = document.getElementsByClassName("add")[0]
let inputName = document.getElementsByClassName("name")[0]
let inputPrice = document.getElementsByClassName("price")[0]
let inputAmount = document.getElementsByClassName("amount")[0]

let buttonEdit = document.getElementsByClassName("edit")[0]
let inputEditName = document.getElementsByClassName("editName")[0]
let inputEditPrice = document.getElementsByClassName("editPrice")[0]
let inputEditAmount = document.getElementsByClassName("editAmount")[0]

let buttonRemove = document.getElementsByClassName("remove")[0]


let productContainer = new ProductContainer()

buttonAdd.addEventListener("click", (e) => {
    e.preventDefault()
    let product = new Product(inputName.value, inputPrice.value, inputAmount.value)
    productContainer.AddProduct(product)






})

buttonEdit.addEventListener("click", (e) => {
    e.preventDefault()

    productContainer.EditProduct(inputEditName.value, inputEditPrice.value, inputEditAmount.value)


})

buttonRemove.addEventListener("click", (e) => {
    e.preventDefault()

    productContainer.RemoveProduct()


})


