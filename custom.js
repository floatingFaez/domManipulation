
const style = document.createElement("style")
style.textContent = `
	.sliderParent{position:relative}
	.prev-arrow,.next-arrow{
		display: block;
		position: absolute;
		z-index: 1000;
		top:50%;
		transform: translateY(-50%);
		cursor:pointer;
		border: 0;
		background-color: transparent;
	}
	.next-arrow { right: 0px; }
	.prev-arrow:focus,.prev-arrow:hover,
	.next-arrow:focus,.next-arrow:hover{
		outline: 0;
    	color: #1fc3cb;
	}
	.prev-arrow svg,.next-arrow svg{
		width:16px;
	}

	.tabBar { padding-top: 8px; }
	.tabBar .tabList {
		display: flex;
		justify-content: center;
		flex-wrap: wrap;
		padding-left: 0;
		margin-bottom: 0;
		list-style: none;
		border-bottom: 1px solid #dee2e6;
	}
	.tabBar .tabList .tabLink {
		border: 1px solid transparent;
		text-decoration:none;
		border-radius: 4px 4px 0 0;
		margin-bottom: -1px;
		padding: 8px 16px;
		display: block;
	}
	.tabBar .tabList .tabLink:hover {
		color: #1fc3cb;
		background-color: #fff;
		border-color: #e9ecef #e9ecef #dee2e6;
	}
	.tabBar .tabList li.active .tabLink {
		color: #495057;
		background-color: #fff;
		border-color: #dee2e6 #dee2e6 #fff;
	}
	.grids{
		display: grid;
		grid-template-columns: 22.97% 22.97% 22.97% 22.97%;
		grid-template-rows: auto;
		gap: 30px;
	}
	.grids .grid-item {
		cursor: pointer;
		align-items: center;
		flex-direction: column;
		display: flex;
	}
	.grids .grid-item .team-name {
		font-size: 20px;
		padding-top: 10px;
		margin-bottom: 0;
	}
	.grids .grid-item .team-designation {
		font-size: 16px;
	}
	.ease{
		transition: opacity .15s linear;
	}
	.ease:not(.appear) {
		opacity: 0;
	}
	.tab-content .tab-pane{
		display: none;
	}
	.tab-content .tab-pane.active{
		display: block;
	}
	.teamSlider {
		display: flex;
		flex-direction: row;
		overflow: hidden;
		transition: width .4s;
		position: relative;
	}
	.teamSlider>.grids {
		width: 100%;
		min-width: 100%;
		transition: left .4s cubic-bezier(.47,.13,.15,.89);
	}
	
`
document.head.appendChild(style)

teamWrapper = document.getElementsByClassName('section-meet-the-team')
teamWrapper[0].classList.add('teams')
teamWrapper[0].setAttribute('id','teamSection')

conteiner = document.getElementsByClassName('teams')[0].getElementsByClassName('container')[0]
teamSection = document.getElementsByClassName('teams')[0].getElementsByClassName('row')[0]

loadMoreBtn = document.getElementsByClassName('team-load-more')[0]
loadMoreBtn.click()

document.querySelector('#teamSection').scrollIntoView({behavior: 'smooth'});

	teams = []
	newMembers = document.getElementsByClassName('teams')[0].getElementsByClassName('row')[0].getElementsByClassName('echo-team-short')

	for(i = 0;i < newMembers.length;i++){
		designation = newMembers[i].getElementsByClassName('echo-team-designation')[0].innerText
		
		priority = 0
		if(
			(designation.indexOf('Software Engineer') !== -1 && designation.indexOf('Lead') !== -1) ||
			(designation.indexOf('QA') !== -1 && designation.indexOf('Senior') !== -1)
		){
			priority = 1
		}else if(
			(designation.indexOf('Software Engineer') !== -1 && designation.indexOf('Senior') !== -1) ||
			(designation.indexOf('QA') !== -1 && designation.indexOf('Software') !== -1)
		){
			priority = 2
		}else if(
			(designation.indexOf('Software Engineer') !== -1 ) ||
			(designation.indexOf('QA') !== -1)
		){
			priority = 3
		}else{
			priority = 0
		}
		
		teams.push({
			designation,
			image:newMembers[i].querySelector('img').getAttribute('src'),
			name:newMembers[i].getElementsByClassName('echo-team-name')[0].innerText,
			priority
		})
	}

	categories = ['Management','Finance','Software Engineer','QA','Others']

	teams.map(function(team){
		if(team.designation == 'COO' || team.designation == 'CTO'){
			return team.category = 'Management'
		}else if(team.designation.indexOf('Software Engineer') !== -1){
			return team.category = 'Software_Engineer'
		}else if(team.designation.indexOf('QA') !== -1){
			return team.category = 'QA'
		}else if(team.designation.indexOf('Finance') !== -1 || team.designation.indexOf('Accounts') !== -1){
			return team.category = 'Finance'
		}else{
			return team.category = 'Others'
		}
	})

	// console.log(teams)

	navElem = document.createElement('div')
	navElem.setAttribute("class","tabBar")
	navElem.style.backgroundColor = "#F3F7FB"

	tabList = document.createElement('ul')
			tabList.setAttribute("class","tabList")
			tabList.setAttribute("id","tabList")
			tabList.setAttribute("role","tabList")

	doms = categories.map(function(cat,indx){
		replacedCat = cat.replace(/ /g,'_')
		listElem = document.createElement('li')
		listElem.setAttribute("class",`${indx === 2 ? 'active': ''}`)

		anchore = document.createElement('a')
		anchore.setAttribute("class",`tabLink`)
		anchore.setAttribute("id",`nav-${replacedCat}-tab`)
		anchore.setAttribute("data-toggle","tab")
		anchore.setAttribute("href",`#nav-${replacedCat}`)
		anchore.innerText = cat

		listElem.appendChild(anchore)
		tabList.appendChild(listElem)
	})

	navElem.appendChild(tabList)

	tabContent = document.createElement('div')
		tabContent.setAttribute("class","tab-content py-5")
		tabContent.setAttribute("id","nav-tabContent")

	teamDoms = categories.map(function(cat,indx){
		replacedCat = cat.replace(/ /g,'_')

		filteredTeams = teams.filter(team => team.category === replacedCat).sort((a, b) => a.priority > b.priority ? 1 : -1);
		isTeamsLengthMoreThan8 = filteredTeams.length > 8

		tabPan = document.createElement('div')
			tabPan.setAttribute("class",`tab-pane ease ${isTeamsLengthMoreThan8 ? 'sliderParent' : ''} ${indx === 2 ? 'appear active' : ''}`)
			tabPan.setAttribute("id",`nav-${replacedCat}`)

		rowElem = document.createElement('div')
				rowElem.setAttribute("class",`${isTeamsLengthMoreThan8 ? 'teamSlider' : 'grids'}`)
				if(isTeamsLengthMoreThan8){
					rowElem.setAttribute("data-chunksize", 8)
				}

		filteredTeams.map(function(team){
				imgElem = document.createElement('img')
				imgElem.setAttribute("src",team.image)
				imgElem.setAttribute("class",`echo-team-img`)
				imgElem.setAttribute("alt",team.name)
				imgElem.style.width = '159px'
				imgElem.style.height = '159px'

				h3Elem = document.createElement('h3')
				h3Elem.setAttribute("class",`echo-team-name`)
				h3Elem.innerText = team.name

				pElem = document.createElement('p')
				pElem.setAttribute("class",`echo-team-designation`)
				pElem.innerText = team.designation

				teamShort = document.createElement('div')
				teamShort.setAttribute("class",`grid-item`)

				teamShort.appendChild(imgElem)
				teamShort.appendChild(h3Elem)
				teamShort.appendChild(pElem)

				rowElem.appendChild(teamShort)
			})
		tabPan.appendChild(rowElem)
		tabContent.appendChild(tabPan)
	})

	conteiner.insertBefore(navElem, teamSection)
	conteiner.insertBefore(tabContent, teamSection)

	//--------------------- Tabs Code ---------------------

	tabList = document.querySelectorAll("ul.tabList > li");
	function myTabClicks(tabClickEvent) {
		for ( i = 0; i < tabList.length; i++) {
			tabList[i].classList.remove("active");
		}
		clickedTab = tabClickEvent.currentTarget;
		clickedTab.classList.add("active");
		tabClickEvent.preventDefault();
		myContentPanes = document.querySelectorAll(".tab-pane");
		for (i = 0; i < myContentPanes.length; i++) {
			myContentPanes[i].classList.remove("appear");
			myContentPanes[i].classList.remove("active");
		}
		anchorReference = tabClickEvent.target;
		activePaneId = anchorReference.getAttribute("href");
		activePane = document.querySelector(activePaneId);
		activePane.classList.add("active");
		activePane.classList.add("appear");
	}
	for (i = 0; i < tabList.length; i++) {
		tabList[i].addEventListener("click", myTabClicks)
	}
	
	//--------------------- Slider Code ---------------------

	newSlides = document.createDocumentFragment();
	slidesPerRow = 4
	rows = 2
	slidesPerSection = slidesPerRow * rows
	teamSlider = document.getElementsByClassName('teamSlider')[0]
	sliderParent = document.getElementsByClassName('sliderParent')[0]

	leftArrow = document.createElement('button')
	leftArrow.setAttribute("class",`prev-arrow`)
	leftArrow.setAttribute("type",`button`)
	leftArrow.innerHTML +=`<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="angle-left" class="svg-inline--fa fa-angle-left fa-w-8" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512"><path fill="currentColor" d="M31.7 239l136-136c9.4-9.4 24.6-9.4 33.9 0l22.6 22.6c9.4 9.4 9.4 24.6 0 33.9L127.9 256l96.4 96.4c9.4 9.4 9.4 24.6 0 33.9L201.7 409c-9.4 9.4-24.6 9.4-33.9 0l-136-136c-9.5-9.4-9.5-24.6-.1-34z"></path></svg>`

	rightArrow = document.createElement('button')
	rightArrow.setAttribute("class",`next-arrow`)
	rightArrow.setAttribute("type",`button`)
	rightArrow.innerHTML +=`<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="angle-right" class="svg-inline--fa fa-angle-right fa-w-8" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512"><path fill="currentColor" d="M224.3 273l-136 136c-9.4 9.4-24.6 9.4-33.9 0l-22.6-22.6c-9.4-9.4-9.4-24.6 0-33.9l96.4-96.4-96.4-96.4c-9.4-9.4-9.4-24.6 0-33.9L54.3 103c9.4-9.4 24.6-9.4 33.9 0l136 136c9.5 9.4 9.5 24.6.1 34z"></path></svg>`


	originalSlides = teamSlider.children;
	originalSlidesCount = teamSlider.childElementCount
	numOfSlides = Math.ceil(originalSlidesCount / slidesPerSection);

	for(a = 0; a < numOfSlides; a++){
		slide = document.createElement('div')
		slide.setAttribute("class",`grids`)
		for(b = 0; b < slidesPerSection; b++) {
			target = (a * slidesPerSection + b);
			if (originalSlides.item(0)) {
				slide.appendChild(originalSlides.item(0));
			}
		}
		newSlides.appendChild(slide);
		
	}

	teamSlider.appendChild(newSlides)
	sliderParent.insertBefore(leftArrow, teamSlider)
	sliderParent.appendChild(rightArrow)


	//------------------- Activate Carousel

	carousel = document.querySelector('.sliderParent');
	carouselContent = document.querySelector('.teamSlider');
	slides = document.querySelectorAll('.teamSlider>.grids');
	teamSlider.setAttribute('style', `height:${slides[0].offsetHeight}px`)
	arrayOfSlides = Array.prototype.slice.call(slides);
	var carouselDisplaying;
	var screenSize;
	setScreenSize();
	var lengthOfSlide;
	moving = true;

	function addClone() {
		lastSlide = carouselContent.lastElementChild.cloneNode(true);
		lastSlide.style.left = (-lengthOfSlide) + "px";
		carouselContent.insertBefore(lastSlide, carouselContent.firstChild);
	}

	function removeClone() {
		firstSlide = carouselContent.firstElementChild;
		firstSlide.parentNode.removeChild(firstSlide);
	}

	function moveSlidesRight() {
		rSlides = document.querySelectorAll('.teamSlider>.grids');
		lengthOfSlide = carouselContent.offsetWidth;
		slidesArray = Array.prototype.slice.call(rSlides);
		width = 0;

		slidesArray.forEach(function(el, i){
			el.style.left = width + "px";
			el.style.position = "absolute";
			width += lengthOfSlide;
		});
		addClone();
	}

	function moveSlidesLeft() {
		lSlides = document.querySelectorAll('.teamSlider>.grids');
		lengthOfSlide = carouselContent.offsetWidth;
		slidesArray = Array.prototype.slice.call(lSlides);
		slidesArray = slidesArray.reverse();
		maxWidth = (slidesArray.length - 1) * lengthOfSlide;

		slidesArray.forEach(function(el, i){
			maxWidth -= lengthOfSlide;
			el.style.left = maxWidth + "px";
			el.style.position = "absolute";
		});
	}
	

	window.addEventListener('resize', setScreenSize);

	function setScreenSize() {
		carouselDisplaying = 1;
		getScreenSize();
	}

	function getScreenSize() {
		gSlides = document.querySelectorAll('.teamSlider>.grids');
		slidesArray = Array.prototype.slice.call(gSlides);
		lengthOfSlide = slides.offsetWidth;
		initialWidth = -lengthOfSlide;
		slidesArray.forEach(function(el) {
			el.style.width = lengthOfSlide + "px";
			el.style.left = initialWidth + "px";
			initialWidth += lengthOfSlide;
		});
	}

	function activateAgain() {
		firstSlide = carouselContent.firstElementChild;
		moving = true;
		firstSlide.removeEventListener('transitionend', activateAgain);
	}


	function replaceToEnd() {
		firstSlide = carouselContent.firstElementChild;
		firstSlide.parentNode.removeChild(firstSlide);
		carouselContent.appendChild(firstSlide);
		firstSlide.style.left = ( (arrayOfSlides.length -1) * lengthOfSlide) + "px";
		addClone();
		moving = true;
		firstSlide.removeEventListener('transitionend', replaceToEnd);
	}

	// var moveLeftAgain = true;

	function moveLeft() {
		if ( moving ) {
			moving = false;
			removeClone();
			firstSlide = carouselContent.firstElementChild;
			firstSlide.addEventListener('transitionend', replaceToEnd);
			moveSlidesLeft();
		}
	}

	rightNav = document.querySelector('.prev-arrow');
	rightNav.addEventListener('click', moveRight);

	function moveRight() {
		if ( moving ) {
			moving = false;
			lastSlide = carouselContent.lastElementChild;
			lastSlide.parentNode.removeChild(lastSlide);
			carouselContent.insertBefore(lastSlide, carouselContent.firstChild);
			removeClone();
			firstSlide = carouselContent.firstElementChild;
			firstSlide.addEventListener('transitionend', activateAgain);
			moveSlidesRight();
		}
	}

	leftNav = document.querySelector('.next-arrow');
	leftNav.addEventListener('click', moveLeft);

	moveSlidesRight()
	moveLeft()

	teamSection.remove()
	window.newTeamMembers = teams
	