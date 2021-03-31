const clientID = 'y5ioylmwm8h4lz58q3pf6mpe0ueldi';
// const clientPW = 'kpsf9ox854qvi8a46qvmgfp3pr9frz';
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

function getData(cb) {
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
	let url = 'https://api.twitch.tv/kraken/streams/?client_id=' + clientID +'&game=League%20of%20Legends&limit=20'
	xhr.open('GET', url, true);
	xhr.setRequestHeader('Accept', 'application/vnd.twitchtv.v5+json');
	xhr.setRequestHeader('Client-ID',clientID);
	xhr.onload = function() {
		if(this.status >= 200 && this.status < 400) {
			let response = JSON.parse(this.response);
			console.log(response);
			cb(null, response);
		}
	}
	xhr.onerror = function() {
		console.log('error heyhey!');
	}
	xhr.send();
}

getData((err, data) => {
	console.log(data);
	const {streams} = data;
	console.log(streams);
	const $row = $('.row');
	for (let stream of streams) {
		console.log(stream);
		$row.append(getColumn(stream));
	}
})

function getColumn(data) {
	return `
	<div class="col">
				<div class="preview">
					<img src="${data.preview.medium}">
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
