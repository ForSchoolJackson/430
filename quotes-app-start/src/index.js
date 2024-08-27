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
      callback([{ content: `NOT FOUND:${url}` }])
      return;
    }

    const text = xhr.responseText;
    let json;

    try {
      json = JSON.parse(text);
    } 
    catch (err) {
      console.log(`ERR: ${err}`)
      json = [{content: `Dont take any wooden nickles!`}]
    }
    finally{
      callback(json);
    }



  }
  xhr.open("GET", url);
  xhr.send();

}

const jsonUrl = "data/quotes-data.json";
const btnRandom = document.querySelector("#btn-random");
const resultsDiv = document.querySelector("#results");

const quoteComponent = json => {
  resultsDiv.innerHTML = randomElement(json).content;
}

btnRandom.onclick = () => loadJsonXHR(jsonUrl, quoteComponent);