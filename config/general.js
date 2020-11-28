// General bonjour configuration
exports.name = "user"

// components/calendar configuration
exports.calendar = {
    key: require("./X.json").private_key,
    serviceAcctId: 'X.gserviceaccount.com',
    timezone: '+01:00',
    calendars: [
        'X',
    ],
}

// components/japanese configuration
exports.japanese = {
    levels: [4, 3, 2, 1],
}