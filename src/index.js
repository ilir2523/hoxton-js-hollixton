const state = {
    store: [],
    itemType: ['Girls', 'Guys', 'Sale'],
    tab: null,
    modal: '',
    search: '',
    user: null,
    selectedItem: null,
    bag:[]
}

function fetchStore() {
    return fetch("http://localhost:3000/store").then(resp => resp.json())
}

function watchNumberOfItem() {
    return state.bag.length
}

function removeItemFromBag() {
    
}

function renderHeader() {
    const headerEl =  document.createElement('header')

    const h1El = document.createElement('h1')
    h1El.textContent = 'Hollixton'
    h1El.addEventListener('click', function() {
        state.selectedItem = null
        state.tab = 'Home'
        watchTabAndAddItemToStore()
        render()
    })

    const navUlEl = document.createElement('ul')

    for (type of state.itemType) {
        const typeLiEl = document.createElement('li')

        const typeLinkEl = document.createElement('a')
        typeLinkEl.textContent = type
        let selectedType = type
        typeLinkEl.addEventListener('click', function() {
            state.selectedItem = null
            state.tab = selectedType
            console.log(selectedType)
            watchTabAndAddItemToStore()
            render()
        })

        typeLiEl.append(typeLinkEl)
        navUlEl.append(typeLiEl)
    }

    const navIconUlEl = document.createElement('ul')
    const searchLiEl = document.createElement('li')
    const searchButtonEl = document.createElement('button')
    const searchImgEl = document.createElement('img')
    searchImgEl.setAttribute('src', 'icons/search_black_24dp.svg')

    searchButtonEl.append(searchImgEl)
    searchLiEl.append(searchButtonEl)

    const personLiEl = document.createElement('li')
    const personButtonEl = document.createElement('button')
    const personImgEl = document.createElement('img')
    personImgEl.setAttribute('src', 'icons/person_black_24dp.svg')

    personButtonEl.append(personImgEl)
    personLiEl.append(personButtonEl)

    const shoppingLiEl = document.createElement('li')
    const shoppingButtonEl = document.createElement('button')
    shoppingButtonEl.setAttribute('class', 'shopping-list')
    const shoppingImgEl = document.createElement('img')
    shoppingImgEl.setAttribute('src', 'icons/shopping_bag_black_24dp.svg')

    const itemInShopingEl = document.createElement('span')
    itemInShopingEl.setAttribute('class', 'item-in-shopping-list')
    itemInShopingEl.textContent = watchNumberOfItem()

    shoppingButtonEl.append(shoppingImgEl, itemInShopingEl)
    shoppingLiEl.append(shoppingButtonEl)


    navIconUlEl.append(searchLiEl, personLiEl, shoppingLiEl)

    headerEl.append(h1El, navUlEl, navIconUlEl)

    document.body.append(headerEl)
}

function renderMain() {
    const mainEl = document.createElement('main')

    const h2El = document.createElement('h2')
    h2El.textContent = state.tab

    const mainUlEl = document.createElement('ul')
    mainUlEl.setAttribute('class', 'list-secction')


    for (const item of state.store) {

        const itemLiEl = document.createElement('li')
        itemLiEl.setAttribute('class', 'item-list-secction')

        itemLiEl.addEventListener('click', function(){
            state.selectedItem = item.id
            // console.log(item.id)
            render()
        })

        const itemImageEl = document.createElement('img')
        itemImageEl.setAttribute('class', 'image-list-secction')
        itemImageEl.setAttribute('src', `${item.image}`)
        itemImageEl.setAttribute('alt', 'item image')

        const itemNameEl = document.createElement('h3')
        itemNameEl.setAttribute('class', 'name-list-secction')
        itemNameEl.textContent = item.name

        const itemPriceEl = document.createElement('p')
        itemPriceEl.setAttribute('class', 'price-list-secction')
        if (item.discountedPrice === undefined) {
            itemPriceEl.textContent = `£${item.price}`
        } else {
            itemPriceEl.innerHTML = `<span style="text-decoration-line: line-through;">£${item.price}</span> <span style="color: red;">£${item.discountedPrice}</span>`
        }

        if (item.dateEntered[6] >= 8) {
            const newEl = document.createElement('span')
            newEl.setAttribute('class', 'new-item')
            newEl.textContent = 'NEW!'

            itemLiEl.append(newEl)
        }

        itemLiEl.append(itemImageEl, itemNameEl, itemPriceEl)

        mainUlEl.append(itemLiEl)
    }

    mainEl.append(h2El, mainUlEl)

    document.body.append(mainEl)
}

function renderFooter() {
    const footerEl = document.createElement('footer')


    const footerTitleEl = document.createElement('h2')
    footerTitleEl.setAttribute('class', 'tile-footer')
    footerTitleEl.textContent = 'Footer'

    const countryEl = document.createElement('p')
    countryEl.setAttribute('class', 'country-footer')
    countryEl.textContent = 'UK'

    footerEl.append(footerTitleEl, countryEl)

    document.body.append(footerEl)
}


function renderOneItem(items) {
    // console.log(items)
    let item = null
    for (const myitem of items){
        if (myitem.id === state.selectedItem){
            item = myitem
        }
    }
    const mainEl = document.createElement('main')
    mainEl.setAttribute('class', 'one-item-main')

    const itemImageEl = document.createElement('img')
        itemImageEl.setAttribute('class', 'one-item-image')
        itemImageEl.setAttribute('src', item.image)
        itemImageEl.setAttribute('alt', 'one item image')

    const oneItemSeccionEl = document.createElement('secction')
    oneItemSeccionEl.setAttribute('class', 'one-item-secction')

    const itemNameEl = document.createElement('h3')
    itemNameEl.setAttribute('class', 'name-list-secction')
    itemNameEl.textContent = item.name.toUpperCase()

    const buttonEl = document.createElement('button')
    buttonEl.setAttribute('class', 'one-item-button')
    buttonEl.textContent = 'ADD TO BAG'

    buttonEl.addEventListener('click', function() {
        state.bag.push(item.name)
        render()
    })

    oneItemSeccionEl.append(itemNameEl, buttonEl)
    
    mainEl.append(itemImageEl, oneItemSeccionEl)

    document.body.append(mainEl)

}

function render() {
    document.body.innerHTML = ''

    renderHeader()
    if (state.selectedItem === null){
        renderMain()
    } else {
        renderOneItem(state.store)
    }
    
    renderFooter()
}

function addItemToStore() {
    fetchStore().then(function(items) {
        state.store = items
        render()
    })
}

function addGirlsItemToStore() {
    fetchStore().then(function(items) {
        state.store = items.filter(item => item.type === "Girls")
        render()
    })
}

function addGuysItemToStore() {
    fetchStore().then(function(items) {
        state.store = items.filter(item => item.type === "Guys")
        render()
    })
}

function watchTabAndAddItemToStore() {
    if (state.tab === "Girls") {
        addGirlsItemToStore()
    } else if (state.tab === "Guys") {
        addGuysItemToStore()
    } else if (state.tab === null || "Sale" ||"Home") {
        addItemToStore()
    }
}

watchTabAndAddItemToStore()

render()
