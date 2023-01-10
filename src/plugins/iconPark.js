import {GoEnd, GoStart, Like, Pause, PlayCycle, PlayOne, ShuffleOne, VolumeNotice} from '@icon-park/vue-next'
export function IconPark (app) {
    app.component('PlayOne', PlayOne)
    app.component('GoStart', GoStart)
    app.component('GoEnd', GoEnd)
    app.component('PlayCycle', PlayCycle)
    app.component('ShuffleOne', ShuffleOne)
    app.component('Like', Like)
    app.component('Pause', Pause)
    app.component('VolumeNotice', VolumeNotice)

}
