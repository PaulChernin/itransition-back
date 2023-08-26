import morgan from 'morgan'

const format = '[:date[iso]] :remote-addr :method :url'

export default morgan(format, {
    immediate: true
})