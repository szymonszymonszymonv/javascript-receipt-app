


class Product {
    id
    constructor(name, amount, price){
        this.id = Product.incrementId()
        this.name = name
        this.amount = parseInt(amount)
        this.price = parseInt(price)
        this.sum = amount * price
    }

    static incrementId = () => {
        if(!this.lastId){
            this.lastId = 1
        }
        else{
            this.lastId++
        }
        return this.lastId
    }

    createElement = () => {
        let element = document.createElement("div")
        let nameElement = document.createElement("span")
        let amountElement = document.createElement("span")
        let priceElement = document.createElement("span")
        let sumElement = document.createElement("span")

        nameElement.className = `name`
        amountElement.className = `amount`
        priceElement.className = `price`
        sumElement.className = 'sum'

        nameElement.innerHTML = this.name
        amountElement.innerHTML = this.amount
        priceElement.innerHTML = this.price
        sumElement.innerHTML = this.sum

        element.className = `product`
        element.id = `${this.id}`
        element.appendChild(nameElement)
        element.appendChild(amountElement)
        element.appendChild(priceElement)
        element.appendChild(sumElement)

        return element
        
    }
}

class ProductContainer {
    products = []
    productsContainerElement = document.getElementsByClassName("productContainer")[0]

    AddProduct = (product) => {
        this.products.push(product)
        this.productsContainerElement.appendChild(product.createElement())
    }

    RemoveProduct = (idx) => {
        this.products(idx).splice(idx, 1)
    }

    EditProduct = () => {

    }

    SwapProducts = () => {

    }
}

let buttonAdd = document.getElementsByClassName("add")[0]
let inputName = document.getElementsByClassName("name")[0]
let inputPrice = document.getElementsByClassName("price")[0]
let inputAmount = document.getElementsByClassName("amount")[0]
let productContainer = new ProductContainer()

buttonAdd.addEventListener("click", (e) => {
    e.preventDefault()
    let product = new Product(inputName.value, inputPrice.value, inputAmount.value)
    productContainer.AddProduct(product)
})