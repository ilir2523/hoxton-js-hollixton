const state = {
    store: [],
    itemType: ['Girls', 'Guys', 'Sale'],
    tab: null,
    modal: '',
    search: null,
    user: null,
    selectedItem: null,
    bag: [],
    email: null,
    password: null
}

function fetchStore() {
    return fetch("http://localhost:3000/store").then(resp => resp.json())
}

function fetchUsers() {
    return fetch('http://localhost:3000/users').then(resp => resp.json())
}

function watchNumberOfItem() {
    return state.bag.length
}

function removeItemFromBag() {

}

// Render Functions
function renderHeader() {
    const headerEl = document.createElement('header')

    const h1El = document.createElement('h1')
    h1El.textContent = 'Hollixton'
    h1El.addEventListener('click', function () {
        state.selectedItem = null
        state.tab = 'Home'
        watchTabAndAddItemToStore()
        render()
    })

    const navUlEl = document.createElement('ul')

    for (type of state.itemType) {
        const typeLiEl = document.createElement('li')

        const typeLinkEl = document.createElement('a')
        typeLinkEl.setAttribute('href', `#`)
        typeLinkEl.textContent = type
        let selectedType = type
        typeLinkEl.addEventListener('click', function () {
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
    searchButtonEl.addEventListener('click', function () {
        state.modal = "search"
        render()
    })

    searchButtonEl.append(searchImgEl)
    searchLiEl.append(searchButtonEl)

    const personLiEl = document.createElement('li')
    const personButtonEl = document.createElement('button')
    const personImgEl = document.createElement('img')
    personImgEl.setAttribute('src', 'icons/person_black_24dp.svg')
    personLiEl.addEventListener('click', function () {
        state.modal = "profile"
        render()
    })
    
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

    let itemsToDisplay = state.store
    if (state.search !== null) {
        itemsToDisplay = filterItemFromStore()

        const searchH2El = document.createElement('h2')
        searchH2El.setAttribute('class', 'search-h2-el')
        searchH2El.textContent = `Current search: ${state.search}`

        const closeSearchEl = document.createElement('button')
        closeSearchEl.setAttribute('class', 'search-close-btn')
        closeSearchEl.textContent = 'X'
        closeSearchEl.addEventListener('click', function () {
            state.search = null
            render()
        })

        searchH2El.append(closeSearchEl)
        mainEl.append(searchH2El)
    }

    for (const item of itemsToDisplay) {

        const itemLiEl = document.createElement('li')
        itemLiEl.setAttribute('class', 'item-list-secction')

        itemLiEl.addEventListener('click', function () {
            state.selectedItem = item.id
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
    for (const myitem of items) {
        if (myitem.id === state.selectedItem) {
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
    itemNameEl.setAttribute('class', 'one-name-list-secction')
    itemNameEl.textContent = item.name.toUpperCase()

    const buttonEl = document.createElement('button')
    buttonEl.setAttribute('class', 'one-item-button')
    buttonEl.textContent = 'ADD TO BAG'

    buttonEl.addEventListener('click', function () {
        state.bag.push(item.name)
        render()
    })

    oneItemSeccionEl.append(itemNameEl, buttonEl)

    mainEl.append(itemImageEl, oneItemSeccionEl)

    document.body.append(mainEl)

}

function renderSearchModal() {
    const modalWrapperEl = document.createElement('div')
    modalWrapperEl.setAttribute('class', 'modal-wrapper')
    modalWrapperEl.addEventListener('click', function () {
        state.modal = ''
        render()
    })

    const modalEl = document.createElement('div')
    modalEl.setAttribute('class', 'modal')
    modalEl.addEventListener('click', function (event) {
        event.stopPropagation()
    })

    const closeModalBtn = document.createElement('button')
    closeModalBtn.setAttribute('class', 'modal__close-btn')
    closeModalBtn.textContent = 'X'
    closeModalBtn.addEventListener('click', function () {
        state.modal = ''
        render()
    })

    const titleEl = document.createElement('h2')
    titleEl.setAttribute('class', 'search-title')
    titleEl.textContent = 'Search for yor favorite items!'

    const formEl = document.createElement('form')
    // formEl.setAttribute()
    formEl.addEventListener('submit', function (event) {
        event.preventDefault()
        state.search = searchInputEl.value
        state.modal = ''
        // state.tab = 'You are searching for: ' + searchInputEl.value
        state.selectedItem = null
        // watchTabAndAddItemToStore()
        render()
    })

    const searchInputEl = document.createElement('input')
    searchInputEl.setAttribute('class', 'search-input')
    searchInputEl.setAttribute('placeholder', 'Search...')
    searchInputEl.setAttribute('type', 'search')


    formEl.append(searchInputEl)
    modalEl.append(closeModalBtn, titleEl, formEl)
    modalWrapperEl.append(modalEl)

    document.body.append(modalWrapperEl)
}

function renderProfileModal() {
    const modalWrapperEl = document.createElement('div')
    modalWrapperEl.setAttribute('class', 'modal-wrapper')
    modalWrapperEl.addEventListener('click', function () {
        state.modal = ''
        render()
    })

    const modalEl = document.createElement('div')
    modalEl.setAttribute('class', 'modal')
    modalEl.addEventListener('click', function (event) {
        event.stopPropagation()
    })

    const closeModalBtn = document.createElement('button')
    closeModalBtn.setAttribute('class', 'modal__close-btn')
    closeModalBtn.textContent = 'X'
    closeModalBtn.addEventListener('click', function () {
        state.modal = ''
        render()
    })

    const titleEl = document.createElement('h2')
    titleEl.setAttribute('class', 'search-title')
    titleEl.textContent = 'Sign in'

// <form action="">
//     <label for="user-email">Email</label>
//     <input type="email" id="user-email">

//     <label for="user-password">Password</label>
//     <input type="password" id="user-password">
// </form>

    const profileFormEl = document.createElement('form')
    profileFormEl.setAttribute('class', 'profile-form')
    profileFormEl.addEventListener('submit', function (event) {
        event.preventDefault()
        state.email = emailInputEl.value
        state.password = passwordInputEl.value
        state.modal = ''
        render()
        getUsers()
    })

    const emailLabelEl = document.createElement('label')
    emailLabelEl.setAttribute('for', 'user-email')
    emailLabelEl.textContent = 'Email'

    const emailInputEl = document.createElement('input')
    emailInputEl.setAttribute('type', 'email')
    emailInputEl.setAttribute('id', 'user-email')


    const passwordLabelEl = document.createElement('label')
    passwordLabelEl.setAttribute('for', 'user-password')
    passwordLabelEl.textContent = 'Password'

    const passwordInputEl = document.createElement('input')
    passwordInputEl.setAttribute('type', 'password')
    passwordInputEl.setAttribute('id', 'user-password')

    const buttonEl = document.createElement('button')
    buttonEl.setAttribute('class', 'signin-button')
    buttonEl.setAttribute('type', 'submit')
    buttonEl.textContent = 'Sign In'

    profileFormEl.append(emailLabelEl, emailInputEl, passwordLabelEl, passwordInputEl, buttonEl)

    modalEl.append(closeModalBtn, titleEl, profileFormEl)
    modalWrapperEl.append(modalEl)

    document.body.append(modalWrapperEl)
}

function renderModal() {
    if (state.modal === 'search') {
        renderSearchModal()
    } else if (state.modal === 'profile') {
        renderProfileModal()
    }
}


function render() {
    document.body.innerHTML = ''

    renderHeader()
    if (state.selectedItem === null) {
        renderMain()
    } else {
        renderOneItem(state.store)
    }
    renderFooter()
    renderModal()
}

function getUsers() {
    fetchUsers().then(function (users) {
        for (user of users){
            if(user.id === state.email && user.password === state.password) {
                console.log("Nicolas is signed in")
                console.log(user.bag)
                state.bag = user.bag
            }
        }
    })
}

function addItemToStore() {
    fetchStore().then(function (items) {
        state.store = items
        render()
    })
}

function addGirlsItemToStore() {
    fetchStore().then(function (items) {
        state.store = items.filter(item => item.type === "Girls")
        render()
    })
}

function addGuysItemToStore() {
    fetchStore().then(function (items) {
        state.store = items.filter(item => item.type === "Guys")
        render()
    })
}

function addSaleItemToStore() {
    fetchStore().then(function (items) {
        state.store = items.filter(item => item.discountedPrice)
        render()
    })
}

// function addItemsFromSearchToStore(){
//     fetchStore().then(function (items) {
//         state.store = items.filter(item =>
//             item.name.toLowerCase().includes(state.search.toLowerCase()))
//         render()
//     })
// }
function filterItemFromStore() {
    let itemsToDisplay = state.store.filter(item =>
        item.name.toLowerCase().includes(state.search.toLowerCase())
    )

    return itemsToDisplay
}


function watchTabAndAddItemToStore() {
    if (state.tab === "Girls") {
        addGirlsItemToStore()
    } else if (state.tab === "Guys") {
        addGuysItemToStore()
    } else if (state.tab === "Sale") {
        addSaleItemToStore()
    } /*else if (state.search !== null) {
        addItemsFromSearchToStore()
    } */else if (state.tab === null || "Home") {
        addItemToStore()
    }
}

watchTabAndAddItemToStore()

render()
