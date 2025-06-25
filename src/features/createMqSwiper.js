import Swiper from 'swiper'
const mqSwipers = []
function createMqSwiper(swiper) {
    mqSwipers.push(getMqSwiperObj(swiper.mq, swiper.obj))
    window.addEventListener('load', function () {
        mqSwipers.forEach((swiper) => {
            if (swiper.isMqTrue()) swiper.createSwiper()
        })
    })
    window.addEventListener('resize', function () {
        mqSwipers.forEach(function (swiper) {
            if (swiper.isMqTrue()) swiper.createSwiper()
            else swiper.destroySwiper()
        })
    })
}
function getMqSwiperObj(mq, swiperObj) {
    return {
        isMqTrue: () => window.matchMedia(mq).matches,
        status: false,
        swiper: false,
        createSwiper() {
            if (this.status) return
            if (!document.querySelector(swiperObj.selector)) return
            this.swiper = new Swiper(swiperObj.selector, swiperObj.options)
            this.status = true
            if (swiperObj.callback) swiperObj.callback(this)
        },
        destroySwiper() {
            if (!this.status || typeof this.swiper === 'boolean') return
            this.swiper.destroy()
            this.status = false
            if (swiperObj.callbackOnDestroy) swiperObj.callbackOnDestroy(this)
        },
    }
}
export default createMqSwiper
//# sourceMappingURL=createMqSwiper.js.map
