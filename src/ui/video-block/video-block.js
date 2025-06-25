'use strict'
document.querySelectorAll('.video-block').forEach((videoBlock) => {
    const button = document.querySelector('.video-block__play-button')
    const video = document.querySelector('.video-block__video')
    if (!video) return
    video.addEventListener('play', () => {
        video.classList.add('playing')
        video.controls = true
    })
    video.addEventListener('pause', () => {
        video.classList.remove('playing')
        video.controls = false
    })
    button?.addEventListener('click', () => {
        if (video.classList.contains('playing')) {
            video.pause()
        } else {
            video.play()
        }
    })
})
//# sourceMappingURL=video-block.js.map
