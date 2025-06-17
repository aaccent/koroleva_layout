import { ScriptStatus, ScriptTypes } from '@/features/loadScript'
import { YMap } from '@yandex/ymaps3-types'

declare global {
    interface Window {
        initMap: () => void
        onYouTubeIframeAPIReady: () => void
        globalScripts: {
            [key in ScriptTypes]?: ScriptStatus
        }
        map: YMap | null
    }
}

export {}
