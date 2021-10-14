(function($){
	function dynamicallyLoadScript(url) {
		var script = document.createElement("script");  
		script.src = url;  
		document.head.appendChild(script);
	}

	function dynamicallyLoadStyle(url) {
		var link = document.createElement("link");  
		link.href = url;  
		link.rel = 'stylesheet';  
		document.head.appendChild(link);
	}

	document.getElementById('jQuery-js').remove()

	dynamicallyLoadStyle('https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.8.1/slick.min.css')
	dynamicallyLoadStyle('https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.8.1/slick-theme.min.css')
	dynamicallyLoadStyle('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css')

	dynamicallyLoadScript('https://sandbox.echologyx.com/wp-content/themes/echologyx/assets/js/jquery-3.4.1.min.js')
	dynamicallyLoadScript('https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js')
	dynamicallyLoadScript('https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.8.1/slick.min.js')


	const style = document.createElement("style")
	style.textContent = `
		.prev {
			display: block;
			position: absolute;
			z-index: 1000;
			top:50%;
			transform: translateY(-50%);
			cursor:pointer;
		}
	  
		.next {
			display: block;
			position: absolute;
			right: 0px;
			top:50%;
			transform: translateY(-50%);
			z-index: 1000;
			cursor:pointer;
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
	setTimeout(function(){
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

		navElem = document.createElement('nav')
		navElem.setAttribute("class","pt-2")
		navElem.style.backgroundColor = "#F3F7FB"

		tabList = document.createElement('div')
				tabList.setAttribute("class","nav nav-tabs justify-content-center")
				tabList.setAttribute("id","nav-tab")
				tabList.setAttribute("role","tablist")

		doms = categories.map(function(cat,indx){
			var replacedCat = cat.replace(/ /g,'_')
			anchore = document.createElement('a')
		anchore.setAttribute("class",`nav-item nav-link ${indx === 0 ? 'active': ''}`)
		anchore.setAttribute("id",`nav-${replacedCat}-tab`)
		anchore.setAttribute("data-toggle","tab")
		anchore.setAttribute("href",`#nav-${replacedCat}`)
		anchore.setAttribute("role","tab")
		anchore.setAttribute("aria-controls",`nav-${replacedCat}`)
		anchore.setAttribute("aria-selected",indx === 0)
		anchore.innerText = cat
		tabList.appendChild(anchore)
		})

		navElem.appendChild(tabList)

		tabContent = document.createElement('div')
			tabContent.setAttribute("class","tab-content py-5")
			tabContent.setAttribute("id","nav-tabContent")

		teamDoms = categories.map(function(cat,indx){
			var replacedCat = cat.replace(/ /g,'_')
			tabPan = document.createElement('div')
				tabPan.setAttribute("class",`tab-pane fade ${indx === 0 ? 'show active' : ''}`)
				tabPan.setAttribute("id",`nav-${replacedCat}`)
				tabPan.setAttribute("role","tabpanel")
				tabPan.setAttribute("aria-labelledby",`nav-${replacedCat}-tab`)

			filteredTeams = teams.filter(team => team.category === replacedCat).sort((a, b) => a.priority > b.priority ? 1 : -1);
			isTeamsLengthMoreThan8 = filteredTeams.length > 8
			rowElem = document.createElement('div')
					rowElem.setAttribute("class",`row ${isTeamsLengthMoreThan8 ? 'teamSlider' : ''}`)
					
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
					teamShort.setAttribute("class",`echo-team-short d-flex flex-column align-items-center`)

					teamShort.appendChild(imgElem)
					teamShort.appendChild(h3Elem)
					teamShort.appendChild(pElem)

					colElem = document.createElement('div')
					colElem.setAttribute("class",`col-6 col-sm-6 col-md-4 col-lg-3 col-xl-3 aos-init aos-animate`)
				
					if(isTeamsLengthMoreThan8)
						rowElem.appendChild(teamShort)
					else{
						colElem.appendChild(teamShort)
						rowElem.appendChild(colElem)
					}
				})
			tabPan.appendChild(rowElem)
			tabContent.appendChild(tabPan)
		})

		conteiner.insertBefore(navElem, teamSection)
		conteiner.insertBefore(tabContent, teamSection)

		$('.teamSlider').slick({
			rows: 2,
			dots: false,
			arrows: true,
			infinite: true,
			speed: 300,
			slidesToShow: 4,
			slidesToScroll: 4,
			prevArrow: '<span class="prev"><i class="fa fa-angle-left fa-2x" aria-hidden="true"></i></span>',
			nextArrow: '<span class="next"><i class="fa fa-angle-right fa-2x" aria-hidden="true"></i></span>'
		});

		$('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
			$('.teamSlider').slick('setPosition');
		})

		teamSection.remove()

		window.newTeamMembers = teams
	},1000)
	

})(jQuery);