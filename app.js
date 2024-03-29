// Project: Build a Instagram for Cats (Catstagram)
// API: https://api.thecatapi.com/v1/breeds
// Example: https://yap-catstagram.netlify.app/
// Create a Card that contain each cat's information
// For each of the card, please include the image, name, and description of the cat.
// Feel free to use any stylings or structure, the part that you have to focus on is the Cats API fetching. Make sure you got all the cats' information mentioned in the previous point.

let catAllContainer = document.querySelector(".catAllContainer")
let catImgContainer = document.querySelectorAll(".catImgContainer")
const freezeScroll = document.querySelector(".freezeScroll")
const navBar = document.querySelector(".navBar")
const navBarMenu1 = document.querySelector(".navBarMenu1")
const navBarMenu2 = document.querySelector(".navBarMenu2")
const navBarMenu3 = document.querySelector(".navBarMenu3")
const navBarMenuItems1 = document.querySelector(".navBarMenuItems1")
const navBarMenuItems2 = document.querySelector(".navBarMenuItems2")
const navBarMenuItems3 = document.querySelector(".navBarMenuItems3")
const navBarSensor = document.querySelector(".navBarSensor")
const closeBtn = document.querySelectorAll(".closeBtn")
const x_menu = document.querySelector(".x-menu")
const ham_menu = document.querySelector(".ham-menu")
const slideInMenu = document.querySelector(".navBarMenuUL")

const catInfoBox = document.querySelector(".catInfoBox")
const infoBoxBackground = document.querySelector(".infoBoxBackground")
let catInfoBoxToggle = document.querySelector(".catInfoBoxToggle")
let displayBlockOnly = document.querySelector(".displayBlockOnly")
let myScrOrientation = "";
let nameGlobal = ""; describeGlobal = ""; imgurlGlobal = "";
const ENDPOINT = "https://gist.githubusercontent.com/zulfidly/c8378f290a8a80b2ba938624baece894/raw/3e6731b31b69c958dd459e076b36aea7afd998e6/catstagram"
// const ENDPOINT = "./cat-JSON/cat2.json"
let isInfoBoxPresent = false;
let setY = 0;
let offsetTopPortrait = 0; offsetTopLandscape = 0;

// fetch API and pops info box when clicked
async function getCats() {
  const response = await fetch(ENDPOINT)
  const data = await response.json(); // structure response into JSON format
  console.log(data)

  data.forEach((catObj, ind) => {
    constructCatAlbum (data[ind].name, data[ind].image?.url, data[ind].description)
  });
  // pops catbox when clicked
  document.querySelectorAll(".catImgContainer").forEach(n => n.addEventListener("click", () => {
    isInfoBoxPresent = true;
    nameGlobal = n.textContent; describeGlobal = n.getAttribute("descr"); imgurlGlobal = n.getAttribute("imgURL");

    setY = document.documentElement.scrollTop;
    console.log(n)
    console.log("index clicked :", [...catAllContainer.children].indexOf(n))
    // console.log(n.offsetWidth, n.offsetHeight)
    // console.log(n.offsetTop, '***', catAllContainer.offsetHeight)
    
  
    catAllContainer.classList.add("freezeScroll")
    // console.log(n.getAttribute("imgURL"));
    // console.log(catImgContainer)
    if(myScrOrientation === "Portrait") {
      navBar.classList.remove("slide_down");
      navBar.classList.add("slide_up");
      infoBoxPortraitScr(nameGlobal, describeGlobal, imgurlGlobal)
      // console.log("MOBILE")
    } else {
      navBar.classList.remove("slide_down");
      navBar.classList.add("slide_up");
      // console.log("DESKTOP")
      infoBoxLandscapeScr(n.textContent, n.getAttribute("descr"), n.getAttribute("imgURL"))
    }
    catInfoBox.classList.add("catInfoBoxToggle")
    infoBoxBackground.classList.add("displayBlockOnly")  
  }))
}


/* prepare landing page */
function constructCatAlbum (catName, isImgAvailable, catDescription) {
  let noImgURL = "./imgNotAvailable.png"
  if (isImgAvailable == undefined) {
      let new_catImgContainer = document.createElement("section");
      new_catImgContainer.setAttribute("class", "catImgContainer");
      new_catImgContainer.setAttribute("id", catName);
      new_catImgContainer.setAttribute("descr", catDescription);
      new_catImgContainer.setAttribute("imgURL", noImgURL);
      new_catImgContainer.style.backgroundImage = `url(${noImgURL})`;
      catAllContainer.append(new_catImgContainer)

      let catNameTag = document.createElement("p");
      catNameTag.setAttribute("class", "catNameTag");
      catNameTag.innerHTML = catName  + " " + "(Image not available)";
      new_catImgContainer.append(catNameTag);
      catAllContainer.append(new_catImgContainer);

      let tapIcon = document.createElement("img");
      tapIcon.setAttribute("class", "tapIconNoImg");
      tapIcon.setAttribute("src", "tapNoImg.png");
      new_catImgContainer.append(tapIcon);
      catAllContainer.append(new_catImgContainer);
  } else {
      var catImgURL = isImgAvailable.toString();
      let new_catImgContainer = document.createElement("section");
      new_catImgContainer.setAttribute("class", "catImgContainer");
      new_catImgContainer.setAttribute("id", catName);
      new_catImgContainer.setAttribute("descr", catDescription);
      new_catImgContainer.setAttribute("imgURL", catImgURL);

      new_catImgContainer.style.backgroundImage = `url(${catImgURL})`;
      // console.log(fetch(catImgURL, 'no-cors'))
      let catNameTag = document.createElement("p");
      catNameTag.setAttribute("class", "catNameTag");
      catNameTag.innerHTML = catName;
      new_catImgContainer.append(catNameTag);
      catAllContainer.append(new_catImgContainer);

      let tapIcon = document.createElement("img");
      tapIcon.setAttribute("class", "tapIcon");
      tapIcon.setAttribute("src", "tap.png");
      new_catImgContainer.append(tapIcon);
      catAllContainer.append(new_catImgContainer);

  }
}
function infoBoxLandscapeScr(name, describe, imgURL) {
  let x = document.querySelector(".catInfoBox").childNodes.length
  removeChildNodes(x);

  let catInfoBox = document.querySelector(".catInfoBox")

  let newUL =  document.createElement("ul");
    newUL.setAttribute("class", "infoBoxUL")

      let newNameLi =  document.createElement("h1");
      newNameLi.innerHTML = name;
      newUL.append(newNameLi)

      let newDescrLi =  document.createElement("h4");
      newDescrLi.innerHTML = describe;
      newUL.append(newDescrLi)

    let newImg = document.createElement("img");
      newImg.setAttribute("class", "infoBoxImg")
      newImg.setAttribute("src", imgURL)

  // console.log(name, describe)
  catInfoBox.append(newImg)
  catInfoBox.append(newUL)
  catInfoBox.style.flexWrap = "nowrap";
  document.querySelector(".infoBoxImg").style.width = "85%";
  document.querySelector(".infoBoxImg").style.height = "85%";
  catAllContainer.classList.add("freezeScroll")

}
//
function infoBoxPortraitScr(name, describe, imgURL) {
  let x = document.querySelector(".catInfoBox").childNodes.length
  removeChildNodes(x);

  let catInfoBox = document.querySelector(".catInfoBox")

  let newUL =  document.createElement("ul");
    newUL.setAttribute("class", "infoBoxUL")

      let newNameLi =  document.createElement("h1");
      newNameLi.innerHTML = name;
      newUL.append(newNameLi)

      let newDescrLi =  document.createElement("h4");
      newDescrLi.innerHTML = describe;
      newUL.append(newDescrLi)

  let newImgDiv = document.createElement("div");
    newImgDiv.setAttribute("class", "infoBoxImgDiv")

    let newImg = document.createElement("img");
      newImg.setAttribute("class", "infoBoxImg")
      newImg.setAttribute("src", imgURL)
    newImgDiv.append(newImg)

  // console.log(name, describe)
  catInfoBox.append(newImgDiv)
  catInfoBox.append(newUL)
  catInfoBox.style.flexWrap = "wrap";
}
/* close info box when clicked */ 
catInfoBox.addEventListener("click", () => {
  isInfoBoxPresent = false;
  catInfoBox.classList.remove("catInfoBoxToggle")
  infoBoxBackground.classList.remove("displayBlockOnly")
  navBar.classList.add("slide_down");
  navBar.classList.remove("slide_up");

  let x = catInfoBox.childNodes.length
  removeChildNodes(x);

  document.querySelector(".catAllContainer").classList.remove("freezeScroll")
  document.documentElement.scrollTop = setY;
})

// maintaining knowledge of screen orientation
window.addEventListener("load", async() => {
  const data = await getCats();
  navBar.classList.add("slide_down");
  navBar.classList.remove("slide_up");
  fitOutScrDisp()

  let isPortrait = window.matchMedia("(orientation: portrait)");
  isPortrait.matches ? (myScrOrientation = "Portrait") : (myScrOrientation = "Landscape");

    // reconstruct infobox when screen rotated while infobox presently open
  isPortrait.addEventListener("change", function(e) {
    initNavBar();
    fitOutScrDisp()
    if(e.matches && isInfoBoxPresent) {           //to portrait mode + infobox presence
        console.log("isPortrait ?", e.matches)
        myScrOrientation = "Portrait"
        infoBoxPortraitScr(nameGlobal, describeGlobal, imgurlGlobal)  
    } else if (!e.matches && isInfoBoxPresent) {  // to landscape mode + infobox presence
        infoBoxLandscapeScr(nameGlobal, describeGlobal, imgurlGlobal)
        console.log("isPortrait ?", e.matches) 
        myScrOrientation = "Landscape"
    } else if (e.matches && !isInfoBoxPresent) {  // to portrait mode - infobox presence
        myScrOrientation = "Portrait"
          console.log("SCROLLTOP: ",document.documentElement.scrollTop)
          fitOutScrDisp()
    } else {                                      // to landscape mode - infobox presence
        myScrOrientation = "Landscape"
        console.log("SCROLLTOP: ",document.documentElement.scrollTop)
        fitOutScrDisp()}
  })
})

function removeChildNodes (x) {
  for(i=0; i < x ; i++) {
    // console.log(i, catInfoBox.childNodes.length)
    catInfoBox.removeChild(catInfoBox.childNodes[0]);
    // console.log(i, catInfoBox.childNodes.length)
  }
}
/* belows are for nav bar */
window.addEventListener ("scroll", function() {
  // console.log("scrollTop:", document.documentElement.scrollTop)
  // console.log("scrollTop:", catAllContainer.children[66].scrollTop)
  // console.log("ratio", catAllContainer.offsetWidth / catAllContainer.offsetHeight)
  // console.log("ratio", catAllContainer.offsetHeight / catAllContainer.offsetWidth)
})

document.body.addEventListener ("wheel", function(e) {
  // console.log("scrollY :", scrollY) //coordinate
  // console.log("deltaY :", e.deltaY)
  if(scrollY !== 0) {
    if(e.deltaY >= 100) {
      navBar.classList.add("slide_down");
      navBar.classList.remove("slide_up");
    } else if (e.deltaY < 100) {
        navBar.classList.add("slide_up");
        navBar.classList.remove("slide_down");    
    } else { void(0) }
  } else {
    navBar.classList.add("slide_down");
    navBar.classList.remove("slide_up");
  }
}) 
navBarSensor.addEventListener("mousemove", () => {
  navBar.classList.add("slide_down");
  navBar.classList.remove("slide_up");
})
navBarSensor.addEventListener("mouseleave", () => {
  setTimeout (addDelay, 2000);
})
function addDelay () {
  navBar.classList.remove("slide_down");
  navBar.classList.add("slide_up");
}
navBarMenu1.addEventListener("click", () => {
  navBarMenuItems1.style.display = "block"
  navBarMenuItems2.style.display = "none"
  navBarMenuItems3.style.display = "none"
  infoBoxBackground.classList.add("displayBlockOnly")
  setY = document.documentElement.scrollTop;
  document.querySelector(".catAllContainer").classList.add("freezeScroll")
})
navBarMenu2.addEventListener("click", () => {
  navBarMenuItems1.style.display = "none"
  navBarMenuItems2.style.display = "block"
  navBarMenuItems3.style.display = "none"
  infoBoxBackground.classList.add("displayBlockOnly")
  setY = document.documentElement.scrollTop;
  document.querySelector(".catAllContainer").classList.add("freezeScroll")
})
navBarMenu3.addEventListener("click", () => {
  navBarMenuItems1.style.display = "none"
  navBarMenuItems2.style.display = "none"
  navBarMenuItems3.style.display = "block"
  infoBoxBackground.classList.add("displayBlockOnly")
  setY = document.documentElement.scrollTop;
  document.querySelector(".catAllContainer").classList.add("freezeScroll")
})
closeBtn.forEach(n => n.addEventListener("click", () => {
  navBarMenuItems1.style.display = "none"
  navBarMenuItems2.style.display = "none"
  navBarMenuItems3.style.display = "none"
  infoBoxBackground.classList.remove("displayBlockOnly")
  document.querySelector(".catAllContainer").classList.remove("freezeScroll")
  document.documentElement.scrollTop = setY;
}))
x_menu.addEventListener("click", () => {
  navBarMenuItems1.style.display = "none"
  navBarMenuItems2.style.display = "none"
  navBarMenuItems3.style.display = "none"
  slideInMenu.classList.toggle("slideToLeft")
  infoBoxBackground.classList.toggle("displayBlockOnly")
  document.querySelector(".catAllContainer").classList.remove("freezeScroll")
  document.documentElement.scrollTop = setY;
})
ham_menu.addEventListener("click", () => {
  slideInMenu.classList.toggle("slideToLeft")
  infoBoxBackground.classList.toggle("displayBlockOnly")
  navBarMenuItems1.style.display = "block"
  navBarMenuItems2.style.display = "block"
  navBarMenuItems3.style.display = "block"
  setY = document.documentElement.scrollTop;
  document.querySelector(".catAllContainer").classList.add("freezeScroll")
})
function initNavBar() {
  navBarMenuItems1.style.display = "none"
  navBarMenuItems2.style.display = "none"
  navBarMenuItems3.style.display = "none"
  slideInMenu.classList.remove("slideToLeft")
  infoBoxBackground.classList.remove("displayBlockOnly")
  document.querySelector(".catAllContainer").classList.remove("freezeScroll")
}
function fitOutScrDisp() {
  numOfColumns = Math.trunc(catAllContainer.offsetWidth / document.querySelector(".catImgContainer").offsetWidth);
  numOfRows = Math.ceil(catAllContainer.children.length / numOfColumns);

  let x = document.querySelector(".catImgContainer").offsetHeight * numOfColumns
  // console.log("R x C : ", numOfRows, numOfColumns ,x)

  let dispRatio = catAllContainer.offsetWidth / catAllContainer.offsetHeight;
// console.log(catAllContainer.offsetWidth, catAllContainer.offsetHeight)
  let y = document.documentElement.scrollTop
  // console.log("scrollTop: ", y)
  if(myScrOrientation == "Portrait") {
    y = y / dispRatio * numOfColumns
    // console.log("toPortrait: ", y)
  } else if (myScrOrientation == "Landscape") {
    let q = document.querySelector(".catImgContainer").offsetWidth / numOfColumns
    y = y * 2;
    // console.log("toLandscape: ", y)
  }
}