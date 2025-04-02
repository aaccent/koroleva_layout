function convertRuTubeLink(link: string) {
    const url = new URL(link)
    const pathName = url.pathname.toString().replace('video', 'play/embed')
    return url.origin.toString() + pathName
}

function convertVkVideoLink(link: string) {
    const url = new URL(link)
    const oid = url.pathname.match(/-\d+/)![0]
    const id = url.pathname.match(/_(\d+)/)![1]
    const newUrl = new URL(url.origin.toString() + '/video_ext.php')
    newUrl.searchParams.set('oid', oid)
    newUrl.searchParams.set('id', id)
    newUrl.searchParams.set('autoplay', '1')
    return newUrl.toString()
}

export function createIframe(
    container: HTMLElement,
    link: string,
    options:
        | {
              loop?: boolean
              autoplay?: boolean
              width?: string
              height?: string
          }
        | {} = {},
) {
    const iframe = document.createElement('iframe')
    let src
    if (link.includes('rutube')) {
        src = convertRuTubeLink(link)
    } else if (link.includes('vkvideo')) {
        src = convertVkVideoLink(link)
    }

    iframe.src = src || ''
    iframe.classList.add('video-player')
    container.append(iframe)
}
