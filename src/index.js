const state = {
    store: [],
    tab: '',
    modal: '',
    search: '',
    user: null,
    selectedItem: null,
    bag:[]
}

function fetchStore() {
    return fetch("http://localhost:3000/store").then(resp => resp.json())
}

function addItemToStore() {
    fetchStore().then(function(item) {
        state.store = item
        render()
    })
}

addItemToStore()

function renderHeader() {
    const headerEl =  document.createElement('header')

    const h1El = document.createElement('h1')
    h1El.textContent = 'Hollixton'

    const navUlEl = document.createElement('ul')
    navUlEl.innerHTML = `
    <li><a href="">Girls</a></li>
    <li><a href="">Guys</a></li>
    <li><a href="">Sale</a></li>
    `

    const navIconUlEl = document.createElement('ul')
    navIconUlEl.innerHTML = `
    <li><a href="">Search</a></li>
    <li><a href="">Sign-in</a></li>
    <li><a href="">Bag</a></li>
    `

    headerEl.append(h1El, navUlEl, navIconUlEl)

    document.body.append(headerEl)
}

function renderMain() {
    const mainEl = document.createElement('main')

    const h2El = document.createElement('h2')
    h2El.textContent = 'Home'

    const mainUlEl = document.createElement('ul')
    mainUlEl.setAttribute('class', 'list-secction')


    for (const item of state.store) {

        const itemLiEl = document.createElement('li')
        itemLiEl.setAttribute('class', 'item-list-secction')

        const itemImageEl = document.createElement('img')
        itemImageEl.setAttribute('class', 'image-list-secction')
        itemImageEl.setAttribute('src', `${item.image}`)
        itemImageEl.setAttribute('alt', 'item image')

        const itemNameEl = document.createElement('h3')
        itemNameEl.setAttribute('class', 'name-list-secction')
        itemNameEl.textContent = item.name

        const itemPriceEl = document.createElement('p')
        itemPriceEl.setAttribute('class', 'price-list-secction')
        itemPriceEl.textContent = `£${item.price}`

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



function render() {
    document.body.innerHTML = ''

    renderHeader()
    renderMain()
    renderFooter()
}

render()
