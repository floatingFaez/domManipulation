
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
	.echo-team-img {
		width: 159px;
		height: 159px;
		border-radius: 100%;
	}
	
`
document.head.appendChild(style)

const moreInfo = {
	backGround : `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et 
	dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.`,
	likes : `Love to Play with Code`,
	disLikes : `Same snack every day`,
	skills : `Ninja in Reack`,
}

teamWrapper = document.getElementsByClassName('section-meet-the-team')
teamWrapper[0].classList.add('teams')
teamWrapper[0].setAttribute('id','teamSection')

conteiner = document.getElementsByClassName('teams')[0].getElementsByClassName('container')[0]
teamSection = document.getElementsByClassName('teams')[0].getElementsByClassName('row')[0]

loadMoreWrap = document.querySelector('.col-12.text-center.aos-init.aos-animate')
loadMoreBtn = document.getElementsByClassName('team-load-more')[0]
loadMoreBtn.click()

document.querySelector('#teamSection').scrollIntoView({behavior: 'smooth'});

members = teamSection.querySelectorAll('.col-6.col-sm-6.col-md-4.col-lg-3.col-xl-3.aos-init.aos-animate')

for (const [key, member] of Object.entries(window.newTeamMembers)) {
	const rendNum = Math.floor(1000 + Math.random() * 9000);
	
	var teamDom = members[0].cloneNode(true)
	teamDom.setAttribute('class','hide')
	teamDom.querySelector('.echo-team-short').dataset.echoteamid = rendNum
	descriptionBox = teamDom.querySelector('.echo-team-description-box')
	indx = descriptionBox.getAttribute('id').lastIndexOf('_id_')
	idName = descriptionBox.getAttribute('id').substr(0,indx+4) + rendNum
	descriptionBox.dataset.echoteamid = rendNum
	descriptionBox.setAttribute('id',idName)
	teamDom.querySelector('.echo-team-img').src = member.image
	teamDom.querySelector('.echo-team-img').alt = member.name

	teamDesBox = teamDom.querySelector('.echo-team-image-box')
	teamDesBox.getElementsByTagName('img')[0].src = member.image
	teamDesBox.getElementsByTagName('img')[0].alt = member.name
	teamDesBox.querySelector('.echo-team-name-designation').querySelector('.echo-team-name').textContent = member.name
	teamDesBox.querySelector('.echo-team-name-designation').querySelector('.echo-team-designation').textContent = member.designation

	teamDom.querySelector('.echo-team-name').textContent = member.name
	teamDom.querySelector('.echo-team-designation').textContent = member.designation
	teamDom.querySelector('.echo-team-background').getElementsByTagName('p')[0].textContent = moreInfo.backGround
	teamDom.querySelector('.echo-team-likes').getElementsByTagName('p')[0].textContent = moreInfo.likes
	teamDom.querySelector('.echo-team-dislikes').getElementsByTagName('p')[0].textContent = moreInfo.disLikes
	teamDom.querySelector('.echo-team-special-skill').getElementsByTagName('p')[0].textContent = moreInfo.skills

	teamSection.appendChild(teamDom)
}


	// ------------------------------------>>> Nav Tabs

	newTeamMembers = teamSection.querySelectorAll('.col-6.col-sm-6.col-md-4.col-lg-3.col-xl-3.aos-init.aos-animate')
	categories = ['Management','Finance','Software Engineer','QA','Others']

	
	for(i = 0;i < newTeamMembers.length;i++){
		memberDom = newTeamMembers[i].getElementsByClassName('echo-team-short')[0].getElementsByClassName('echo-team-designation')[0]
		designation = memberDom.innerText

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
		
		category = 'Others'

		if(designation == 'COO' || designation == 'CTO'){
			category = 'Management'
		}else if(designation.indexOf('Software Engineer') !== -1){
			category = 'Software_Engineer'
		}else if(designation.indexOf('QA') !== -1){
			category = 'QA'
		}else if(designation.indexOf('Finance') !== -1 || designation.indexOf('Accounts') !== -1){
			category = 'Finance'
		}else{
			category = 'Others'
		}

		newTeamMembers[i].setAttribute('class','hide')
		newTeamMembers[i].setAttribute('data-category',category)
		newTeamMembers[i].setAttribute('data-priority',priority)
		
	}

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
		listElem.setAttribute("class",`${indx === 0 ? 'active': ''}`)

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
	conteiner.insertBefore(navElem, teamSection)

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

	//---------------------- TabPan

	tabContent = document.createElement('div')
	tabContent.setAttribute("class","tab-content py-5")
	tabContent.setAttribute("id","nav-tabContent")

	categories.map(function(cat,indx){
	replacedCat = cat.replace(/ /g,'_')

	filteredTeams = document.createDocumentFragment();

	for(i=0;i<newTeamMembers.length;i++){
		teamMember = newTeamMembers[i]
		teamMember.setAttribute('class','aos-init aos-animate')
		if(teamMember.dataset.category  === replacedCat){
			filteredTeams.appendChild(teamMember)
		}
	}
	isTeamsLengthMoreThan8 = filteredTeams.length > 8

	tabPan = document.createElement('div')
		tabPan.setAttribute("class",`tab-pane ease ${isTeamsLengthMoreThan8 ? 'sliderParent' : ''} ${indx === 0 ? 'appear active' : ''}`)
		tabPan.setAttribute("id",`nav-${replacedCat}`)



	rowElem = document.createElement('div')
	rowElem.setAttribute("class",`${isTeamsLengthMoreThan8 ? 'teamSlider' : 'grids'}`)
	if(isTeamsLengthMoreThan8){
		rowElem.setAttribute("data-chunksize", 8)
	}
	rowElem.appendChild(filteredTeams)
	tabPan.appendChild(rowElem)
	tabContent.appendChild(tabPan)
	})
	conteiner.insertBefore(tabContent, teamSection)

	for (i = 0; i < tabList.length; i++) {
	tabList[i].addEventListener("click", myTabClicks)
	// activateAgain()
	}



