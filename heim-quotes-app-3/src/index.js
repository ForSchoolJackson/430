// HELPERS
// NOTE: You can test this in the browser console
const randomElement = array => {
  if (!array.length) throw new Error("Array is empty!");
  return array[Math.floor(Math.random() * array.length)];
}

// NOTE: How about implementing const getJsonXHR = (url, callback) => {...}

// MAIN
// Note: The page is already loaded (that's what <script defer ...> does) 
// ... so go to town!
// ... get a reference to "random" button
// ... get a reference to "results" <div>
// ... and so on

const jsonUrl = "http://localhost:3000/quotes"
const btnRandom = document.querySelector("#btn-random");
const resultsDiv = document.querySelector("#content p");
const btnSearch = document.querySelector("#btn-search");
const inputTerm = document.querySelector("#input-term");

function loadJsonXHR(url, callback) {

  const xhr = new XMLHttpRequest();

  xhr.onload = () => {
    if (xhr.status == "404") {
      console.log(`NOT FOUND:${url}`);
      callback([{ author: "", content: `NOT FOUND:${url}` }])
      return;
    }

    const text = xhr.responseText;
    let json;

    try {
      json = JSON.parse(text);
    }
    catch (err) {
      console.log(`ERR: ${err}`)
      json = [{ author: "Billy Joe", content: `Dont take any wooden nickles!` }]
    }
    finally {
      callback(json);
    }


  }
  xhr.open("GET", url);
  xhr.setRequestHeader("accept", "application/json");
  xhr.send();

}

const getJsonFetch = async (url, callback) => {
  let json;
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Accept": "application/json"
      }
    });
    json = await response.json();
  }
  catch (error) {
    console.log(`ERR: ${err}`)
    json = [{ author: `Cant parse data file '${url}'` }]
  }
  callback(json);

}


const quoteComponent = ([{ author, content }]) => {
  resultsDiv.innerHTML = ` <a class="relative bg-gray-900 block p-6 border border-gray-100 rounded-lg max-w-sm mx-auto mt-24" href="#">
      
      <span class="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-green-300 via-blue-500 to-purple-600"></span>

      <div class="my-4">
          <h2 class="text-white text-2xl font-bold pb-2">${author}</h2>
          <p class="text-gray-300 py-1"><i>"${content}"</i></p>
      </div>

      <div class="flex justify-end">
          <button class="px-2 py-1 text-white border border-gray-200 font-semibold rounded hover:bg-gray-800">Click Me</button>
      </div>
    </a>`
}

btnRandom.onclick = () => {
  getJsonFetch(jsonUrl, data => {
    if (data.length > 0) {
      const randQuote = randomElement(data);
      const { author, content } = randQuote
      quoteComponent([{ author, content }])
    } else {
      resultsDiv.innerHTML = "ERROR: Quote not found!"
    }

  });
}

btnSearch.onclick = (evt) => {

  evt.preventDefault(); // disable defualt sumbit

  // now grab the `.value` of #input-term
  const index = inputTerm.value.trim();
  if (index === "" || isNaN(index)) {
    resultsDiv.innerHTML = "ERROR: Not a valid index!"
  } else {
    // now build the URL to fetch that specific quote
    const url = `${jsonUrl}?index=${index}`;
    // now call `getJsonFetch()`
    getJsonFetch(url, data => {
      if (data.length > 0) {
        quoteComponent(data);
      } else {
        resultsDiv.innerHTML = "ERROR: Quote not found!"
      }
    })

  }


}

