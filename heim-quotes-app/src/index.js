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
//const resultsDiv = document.querySelector("#content p");
const authorDiv =  document.querySelector(".my-4 h2");
const quoteDiv = document.querySelector(".my-4 p")

const quoteComponent = json => {
  const quoteRand = randomElement(json);
  //resultsDiv.innerHTML = (`${quoteRand.author} <p><i>"${quoteRand.content}"</i></p> `);
  authorDiv.innerHTML = (`${quoteRand.author}`);
  quoteDiv.innerHTML = (`<i>"${quoteRand.content}"</i>`);
}

btnRandom.onclick = () => loadJsonXHR(jsonUrl, quoteComponent);