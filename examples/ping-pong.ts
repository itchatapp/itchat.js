import { Client } from '@itchatapp/client'

const client = new Client();


client.on('ready', () => {
    console.log('Connected')
    console.log(client.user!.username)
})


client.on('messageCreate', async (msg) => {
    if (msg.content === '!ping') {
        await msg.channel.send('Pong!')
    }
})

client.login('your-token-here')