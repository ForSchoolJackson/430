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

function loadJsonXHR(url, callback) {

  const xhr = new XMLHttpRequest();

  xhr.onload = () => {
    if (xhr.status == "404") {
      console.log(`NOT FOUND:${url}`);
      callback([{ author:"", content: `NOT FOUND:${url}` }])
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
  xhr.send();

}

const jsonUrl = "data/quotes-data.json"
const btnRandom = document.querySelector("#btn-random");
const resultsDiv = document.querySelector("#content p");

const quoteComponent = json => {
  const quoteRand = randomElement(json);
  resultsDiv.innerHTML = ` <a class="relative bg-gray-900 block p-6 border border-gray-100 rounded-lg max-w-sm mx-auto mt-24" href="#">
      
      <span class="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-green-300 via-blue-500 to-purple-600"></span>

      <div class="my-4">
          <h2 class="text-white text-2xl font-bold pb-2">${quoteRand.author}</h2>
          <p class="text-gray-300 py-1"><i>"${quoteRand.content}"</i></p>
      </div>

      <div class="flex justify-end">
          <button class="px-2 py-1 text-white border border-gray-200 font-semibold rounded hover:bg-gray-800">Click Me</button>
      </div>
    </a>`
}

btnRandom.onclick = () => loadJsonXHR(jsonUrl, quoteComponent);