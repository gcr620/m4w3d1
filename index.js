const url = "https://striveschool-api.herokuapp.com/books"
let bookUrl = "https://striveschool-api.herokuapp.com/books/"

// if (window.location.search) {
//   let activeParams = window.location.search;
//   let objParam = new URLSearchParams(activeParams);
//   let bookId = objParam.get("q");

//   fetch('${url}')
//   .then((raw) => raw.json())
//   .then((res) => info(res))
//   .catch((err) => console.error(err))
// }
if (!window.location.search) {
  window.onload = () => {
    fetchBooks()
  }
}
const fetchBooks = () => {
  fetch(url)
    .then((raw) => raw.json())
    .then((res) => {
      let cont = document.querySelector(".album .row")
      cont.innerHTML = res
        .map((book) => {
          console.log(book);
          return ` <div class='col col-3'> <div class="card mb-4 shadow-sm" id='book_${book.asin}'>
                <img src='${book.img}' />

                <div class="card-body">
                  <p class='font-weight-bold text-truncate book-title'> ${book.title} </p>
                  <div
                    class="d-flex flex-column justify-content-center align-items-center"
                  >
                   <div class="butt d-flex justify-content-between align-items-center">
                    <button class='btn btn-primary' onclick="addToCart('${book.title}', '${book.price}', '${book.asin}')"> EUR ${book.price} </button>
                    <button class='btn btn-secondary hide' onclick="yeet()"> Nascondi </button>
                    </div>
                    <a  class="btn btn-secondary mt-2" onclick="info('${book.title}', '${book.price}', '${book.asin}', '${book.img}')">Info</a>
                  </div>
                </div>
              </div> </div>`
        })
        .join("")
    })
    .catch((err) => console.error(err))
}

const addToCart = (title, price, asin) => {
  const book = document.querySelector("#book_" + asin)
  book.style.border = "2px red solid"
  const cart = document.querySelector(".list-group")
  cart.innerHTML += `
  <li class="list-group-item">${title}, ${price} <button class='btn btn-danger' onclick='removeFromCart(event, "${asin}", "${price}")'> X </button></li>
  
  `
  const totale = document.querySelector("h1 span")
  totale.innerText = (Number(totale.innerText) + Number(price)).toFixed(2)
}

const searchBook = (ev) => {
  let query = ev.target.value
  let allTitles = document.querySelectorAll(".book-title")
  console.log(
    query,
    allTitles[0].innerText.toLowerCase().includes(query.toLowerCase())
  )
  allTitles.forEach((title) => {
    const currCard = title.parentElement.parentElement.parentElement
    if (!title.innerText.toLowerCase().includes(query.toLowerCase())) {
      currCard.style.display = "none"
    } else {
      currCard.style.display = "block"
    }
  })
}

const removeFromCart = (event, asin, price) => {
  event.target.closest("li").remove()
  const totale = document.querySelector("h1 span")
  totale.innerText = (Number(totale.innerText) - Number(price)).toFixed(2)
  const book = document.querySelector("#book_" + asin)
  book.style.border = "none"
}

const emptyCart = () => {
    document.querySelector(".list-group").innerHTML = ""
    document.querySelectorAll(".card").forEach(card => card.style.border = "none")
    const totale = document.querySelector("h1 span")
    totale.innerText = "0"
}
// fatto da me
function yeet() {
  let rem = event.target.parentElement.parentElement.parentElement;
  console.log(rem);
  rem.classList.add("d-none");
}
// info singolo libro

function info(title, price, asin, img) {
  console.log("ok");
  let activeParams = window.location.search;
  let objParam = new URLSearchParams(activeParams);
  let bookId = objParam.get("q");
  fetch(bookUrl + 1940026091)
  .then((raw) => raw.json())
  .then((res) => {
    console.log(res);
  let inf = document.querySelector(".album .book");
  let arr = [res.asin, res.title, res.img, res.price, res.category]
  inf.innerHTML = arr
  .map((book) => {
    return `<div class="card">
    <div class="row g-0">
      <div class="col-5 col-sm-4">
        <img src="'${info.img}'" class="img-fluid w-100" alt="card-horizontal-image">
      </div>
      <div class="col-7 col-sm-8">
        <div class="card-body">
          <h1 class="card-title mb-3">'${book.title}'</h1>
          <div class="genre_price d-flex flex-column mb-3">
            <b>Genre: '${book.category}'</b>
            <b>Price: '${book.price}'</b>
          </div>
          <p class="card-text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi iusto quia numquam assumenda necessitatibus rem praesentium nisi est libero debitis, ratione maxime aperiam voluptatum facere itaque minus incidunt? Illum, numquam. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos, amet sit autem id nemo maxime a laboriosam neque commodi vel sunt recusandae dolorum libero ea, animi expedita modi. Atque, nemo?</p>
          <button class='btn btn-primary' onclick="addToCart('${book.title}', '${book.price}', '${book.asin}')"> EUR ${book.price} </button>
        </div>
      </div>
    </div>
  </div>`
  }).join("")
  })
  .catch((err) => console.error(err))
  }
