var $ = require('jquery');

var I18N = {
	en: require('./lang-en.js'),
	zh: require('./lang-zh-tw.js')
}



const clientID = 'y5ioylmwm8h4lz58q3pf6mpe0ueldi';
let nowIndex = 0;
let isLoading = false;
let LANG = 'zh';

function changeLang(lang) {
	$('.menu h1').text(I18N[lang]['TITLE']);
	LANG = lang;
	$('.row').empty();
	nowIndex = 0;
	appendData(LANG);
}

// let token;
// let response;
// let xhr = new XMLHttpRequest();
// let url ='https://id.twitch.tv/oauth2/token?client_id=' + clientID + '&client_secret=' + clientPW + '&grant_type=client_credentials';
// xhr.open('POST',url,true);
// xhr.send();
// xhr.onreadystatechange = function(){
// 	if(this.readyState ===4 && this.status === 200){
// 		response = JSON.parse(this.response);
// 		console.log(response);
// 		token = response.access_token;
// 		console.log(token);
// 	}
// };
// token = '78muxu5xvziwq791n0xfa423c2vvfz';

function getData(lang, cb) {
	// $.ajax({
	// 	url: 'https://api.twitch.tv/kraken/streams/?client_id=' + clientID +'&game=League%20of%20Legends&limit=20',
	// 	beforeSend:(xhr) => {
	// 		xhr.setRequestHeader('Accept', 'application/vnd.twitchtv.v5+json');
	// 		xhr.setRequestHeader('Client-ID',clientID);
			
	// 		// xhr.setRequestHeader('Authorization',`Bearer ${token}`);
	// 		// console.log(`bearer ${token}`);
	// 	},
	// 	sucess: (response) => {
	// 		console.log(response);
	// 		cb(null, response);
	// 	}
	// })
	
	let xhr = new XMLHttpRequest();
	let url = 'https://api.twitch.tv/kraken/streams/?client_id=' + clientID +'&game=League%20of%20Legends&limit=20&offset=' + nowIndex + '&language=' + lang;
	xhr.open('GET', url, true);
	xhr.setRequestHeader('Accept', 'application/vnd.twitchtv.v5+json');
	xhr.setRequestHeader('Client-ID',clientID);
	xhr.onload = function() {
		if(this.status >= 200 && this.status < 400) {
			let response = JSON.parse(this.response);
			cb(null, response);
		}
	}
	isLoading = true;
	xhr.onerror = function() {
		console.log('error heyhey!');
	}
	xhr.send();
}
function appendData(lang) {
	getData(lang, (err, data) => {
		const {streams} = data;
		const $row = document.querySelector('.row');
		for (let stream of streams) {
			const div = document.createElement('div');
			$row.appendChild(div);
			div.outerHTML = getColumn(stream);
			// $row.append(getColumn(stream));
		}
		nowIndex += 20
		isLoading = false;
	})
}
// getData((err, data) => {
// 	const {streams} = data;
// 	const $row = $('.row');
// 	for (let stream of streams) {
// 		$row.append(getColumn(stream));
// 	}
// })

$(document).ready(function() {
	appendData(LANG);
	$(window).scroll(function() {
		if ($(window).scrollTop() + $(window).height() > $(document).height() - 150){
			if(!isLoading) {
				appendData(LANG);
			} 
		}
	})

	$('.change_en').click(() => {
		changeLang('en');
	})

	$('.change_zh').click(() => {
		changeLang('zh');
	})
})

// document.addEventListener("DOMContentLoaded", function() {
// 	appendData();
// 	window.addEventListener('scroll', function() {
// 		if(document.body.scrollTop + window.innerHeight > document.documentElement.scrollHeight - 150){
// 			if(!isLoading) {
// 				appendData();
// 			} 
// 		}
// 	})
// })

function getColumn(data) {
	return `
	<div class="col">
				<div class="preview">
					<img src="${data.preview.medium}" onload=this.style.opacity=1>
				</div>
				<div class="bottom"> 
					<div class="avatar">
						<img src="${data.channel.logo}" alt="sixtail.png">
					</div>
					<div class="intro">
						<div class="channel_name">${data.channel.status}</div>
						<div class="streamer_name">${data.channel.display_name}</div>
					</div>
				</div>
			</div>`;
}



