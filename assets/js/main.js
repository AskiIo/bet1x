'use strict';

+ function (win, doc) {

	function isMobile () {
		return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
	}

	win.onload = function () {

		if ( !isMobile() )
		{
			var videoBlock = doc.getElementById('main_video_inner')

			var ogv 	= videoBlock.getAttribute('data-ogv')
			var webm 	= videoBlock.getAttribute('data-webm')
			var mp4 	= videoBlock.getAttribute('data-mp4')

			var video 	= doc.createElement('video')

			video.setAttribute('id', 'main_video')
			video.setAttribute('preload', 'auto')

			var source1 = doc.createElement('source')

			if ( ogv ) {
				source1.setAttribute('src', ogv)
				source1.setAttribute('type', 'video/ogg; codecs="theora, vorbis"')
			}

			var source2 = doc.createElement('source')

			if ( webm ) {
				source2.setAttribute('src', webm)
				source2.setAttribute('type', 'video/webm; codecs="vp8, vorbis"')
			}

			var source3 = doc.createElement('source')

			if ( mp4 ) {
				source3.setAttribute('src', mp4)
				source3.setAttribute('type', "video/mp4")
			}

			video.appendChild(source2)
			video.appendChild(source1)
			video.appendChild(source3)

			videoBlock.appendChild(video)

			var bgVideo   = doc.getElementById('video')
			var playVideo = doc.getElementById('play-video')
			var mainVideo = doc.getElementById('main_video')

			playVideo.addEventListener('click', function () {
				doc.documentElement.classList.remove('view_text')
				bgVideo.style.opacity = 0
				setTimeout(function () {
					mainVideo.style.opacity = 1
					mainVideo.style.zIndex = 9999
					mainVideo.play()
				}, 1000)
			}, false)

			mainVideo.addEventListener('ended', function () {
				mainVideo.style.opacity = ''
				setTimeout(function () {
					doc.documentElement.classList.add('view_text')
					mainVideo.style.zIndex = ''
					bgVideo.style.opacity = 1
				})
			}, false)

		}

		doc.documentElement.classList.add('view_text')
		doc.documentElement.classList.add('ready')
		videResize()
	}

	function videResize()
	{
	    var isLandscape = window.matchMedia("(orientation: landscape)").matches;
		var video = document.getElementById('video')
		var dHeight = parseInt(win.innerHeight)
		var vHeight = 850

		// video.style.height =  ((2500 * 83) / 100) + 'px'

		var calcLeft = (video.clientWidth - parseInt(win.innerWidth))/2

		video.style.left  = (win.innerHeight > 736 && win.innerWidth > 591 ? - calcLeft + 'px' : ( isLandscape ? '0' : 'auto'))
		video.style.opacity = 1
	}

	window.addEventListener('resize', function () {
		videResize()
		var calc = window.innerWidth / 1180
	}, false)

	var hamburger = doc.getElementById('hamburger')
	var popup     = doc.getElementById('popup')
	var hActive   = false

	hamburger.addEventListener('click', function () {
		var self = this
		if ( hActive === false )
		{
			hActive = true
			popup.classList.toggle('open')
			setTimeout(function () {
				self.classList.toggle('is-active')
				// hActive = false
			}, 500)
			setTimeout(function () {
				hActive = false
			}, 1000)
		}
	}, false)

}(window, document);