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
        if(this.products.find(x => x.name == product.name)){
            alert("Dodawany przedmiot istnieje ju?? na li??cie")
        }
        else{

            if (isNaN(product.name) && product.price && product.amount) {
                
                this.products.push(product)
                localStorage.setItem("products", JSON.stringify(this.products))
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
                alert("Upewnij si??, ??e dane przyd dodawaniu produktu zosta??y wprowadzone prawid??owo!!!")
            }
        }

    }

    RemoveProduct = () => {

        let editSelect = document.getElementById("editSelect");

        let removeSelect = document.getElementById("removeSelect");

        console.log(removeSelect.selectedIndex)


        let product = this.products.find(x => x.name == removeSelect.options[removeSelect.selectedIndex].text)

        this.productsContainerElement.removeChild(product.element)
        
        this.products = this.products.filter(x => x.name != removeSelect.options[removeSelect.selectedIndex].text) // zmien chyba??
        localStorage.setItem("products", JSON.stringify(this.products))


        console.log(this.products)

        editSelect.remove(removeSelect.selectedIndex)
        removeSelect.remove(removeSelect.selectedIndex)



    }

    EditProduct = (name, amount, price) => {
        let select = document.getElementById("editSelect");
        let removeSelect = document.getElementById("removeSelect")

        if(this.products.find(x => x.name == name)){
            alert("Nie mo??esz edytowa?? nazwy produktu na t?? kt??ra ju?? istnieje")
        }
        else{
            if (price != 0 && amount != 0) {
                if (isNaN(name) && !isNaN(price) && !isNaN(amount)) {
                    this.products[select.selectedIndex].name = name
                    this.products[select.selectedIndex].price = price
                    this.products[select.selectedIndex].amount = amount
                    this.products[select.selectedIndex].sum = price * amount
                    localStorage.setItem("products", JSON.stringify(this.products))

    
                    this.products[select.selectedIndex].editElement() // akutalizacja wy??wietlania
    
                    let product = this.products.find(x => x.name == name)
    
                    let option1 = document.createElement("option");
    
                    option1.text = product.name
                    let option2 = option1.cloneNode(true)
    
    
                    removeSelect.options[select.selectedIndex] = option2 // akutalizacja selecta edit
                    select.options[select.selectedIndex] = option1 // akutalizacja selecta remove
                }
                else {
                    alert("Upewnij si??, ??e dane edycji zosta??y wprowadzone prawid??owo!!!")
                }
    
            }
            else {
                alert("Ilo???? i cena nie mog?? by?? 0!!!")
            }
        }
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


