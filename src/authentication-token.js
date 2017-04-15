import moment from 'moment-timezone'
import sha from 'sha.js'

export default password => sha('sha256')
    .update(`${password}:${moment.tz("Europe/London").format('YYYYMMDD:HH')}`, 'utf8')
    .digest('hex')