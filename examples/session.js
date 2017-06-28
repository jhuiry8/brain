const mineflayer = require('mineflayer')
const path = require('path')

if (process.argv.length !== 5) {
  console.log('Usage : node session.js <host> <port> <pathToLauncherProfiles>')
  process.exit(1)
}

const profile = require(path.resolve(process.argv[4], 'launcher_profiles.json'))
const auth = profile.authenticationDatabase[profile.selectedUser]

const session = {
  accessToken: auth.accessToken,
  clientToken: profile.clientToken,
  selectedProfile: {
    id: profile.selectedUser,
    name: auth.displayName
  }
}

const bot = mineflayer.createBot({
  host: process.argv[2],
  port: parseInt(process.argv[3]),
  session
})

bot.once('login', () => {
  console.log('loged in')
  bot.quit()
})
