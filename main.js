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
        this.beDraggable()

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
    
    beDraggable = () => {
        this.element.setAttribute("draggable", "true")
        this.element.classList.add("draggable")
        this.element.addEventListener("dragstart", () => {
            this.element.classList.add("dragging")
        })

        this.element.addEventListener("dragend", () => {
            this.element.classList.remove("dragging")
        })

        this.element.addEventListener("dragover", (e) => {
            e.preventDefault()
        })
    }

}

class ProductContainer {

    products = []
    id = 0
    productsContainerElement = document.getElementsByClassName("productContainer")[0]

    AddProduct = (product) => {
        this.products.push(product)
        this.productsContainerElement.appendChild(product.createElement())
        let select1 = document.getElementById("editSelect");

        let select2 = document.getElementById("removeSelect");

        let option1 = document.createElement("option");


        option1.text = product.name

        let option2 = option1.cloneNode(true)

        select1.add(option1)
        select2.add(option2)

    }

    RemoveProduct = () => {

        // let select1 = document.getElementById("editSelect");

        // let select2 = document.getElementById("removeSelect");

        // select1.remove()
        // select2.remove()

        console.log(this.products)



        // this.products(idx).splice(idx, 1)
    }

    EditProduct = (name, price, amount) => {
        let select = document.getElementById("editSelect");
        let value = select.options[select.selectedIndex].value;

        this.products[select.selectedIndex].name = name
        this.products[select.selectedIndex].price = price
        this.products[select.selectedIndex].amount = amount
        this.products[select.selectedIndex].sum = price * amount
        this.products[select.selectedIndex].editElement()
    }

    handleDragging = () => {
        this.productsContainerElement.addEventListener("dragover", (e) => {
            e.preventDefault()
            let currentlyDragging = document.querySelector(".dragging")
            let draggableProducts = [...document.querySelectorAll(".product:not(.dragging)")]

            let elemObj = draggableProducts.reduce((closest, element) => {
                let box = element.getBoundingClientRect()
                let offset = e.clientY - (box.top + box.height / 2)
                if(offset < 0 && offset > closest.offset){
                    return { offset: offset, element: element}
                }
                else{
                    return closest
                }
            }, { offset: Number.NEGATIVE_INFINITY }) 
            if(elemObj.element == null) { 
                this.productsContainerElement.appendChild(currentlyDragging)
            }
            else{
                this.productsContainerElement.insertBefore(currentlyDragging, elemObj.element)
            }
        })
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
productContainer.handleDragging()

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


