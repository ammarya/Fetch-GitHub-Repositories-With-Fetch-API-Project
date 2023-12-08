// Main variable
let theInput = document.querySelector(".get-repos input");
let getButton = document.querySelector(".get-button");
let reposData = document.querySelector(".show-data");

getButton.onclick = function () {

  getRepos();
};

// Get Repos Function
function getRepos() {

  if (theInput.value == "") { // If Value Is Empty

    reposData.innerHTML = "<span>please write github username.</span>"

  } else {

    fetch(`https://api.github.com/users/${theInput.value}/repos`)
      .then((Response) => Response.json())

      .then((repositories) => {
        // empty the container
        reposData.innerHTML = "";

        // loop on repositories
        repositories.forEach(repo => {

          // create the main div element
          let mainDiv = document.createElement("div");

          // create repo name text 
          let repoNameText = document.createTextNode(repo.name);

          // append the text to main div
          mainDiv.appendChild(repoNameText);

          // create repo url anchor
          let theUrl = document.createElement("a");

          // create repo url text 
          let theUrlText = document.createTextNode("Visit");

          // append the repo url text to anchor tag
          theUrl.appendChild(theUrlText);

          // add the hypertext reference "href"
          theUrl.href = `https://github.com/${theInput.value}/${repo.name}`;

          // set the href to open in new blank
          theUrl.setAttribute("target", "_blank");

          // append url anchor to main div
          mainDiv.appendChild(theUrl);

          // create stars count span
          let starsSpan = document.createElement("span");

          // create the stars count text
          let starsText = document.createTextNode(`Stars ${repo.stargazers_count}`);

          // add stars count text to stars span
          starsSpan.appendChild(starsText);

          // append stars count span to main div
          mainDiv.appendChild(starsSpan);

          // add class on main div
          mainDiv.className = "repo-box";

          let childDiv = document.createElement("div");
          childDiv.className = "child";
          mainDiv.appendChild(childDiv);
          childDiv.appendChild(starsSpan)
          childDiv.appendChild(theUrl);
          
          // append the main div to container
          reposData.appendChild(mainDiv);

          // append the main div to the container
          reposData.appendChild(mainDiv);
        });
      });
  }
};