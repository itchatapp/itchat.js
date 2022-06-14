```ts
// For deno runtime use this: 
// import { Client } from 'https://deno.land/x/itchatjs'
import { Client } from '@itchatapp/client'

const client = new Client()

client.on('message', (msg) => {
    if (msg.content === '!ping') {
        msg.reply('Pong!')
    }
})

client.login('your-token-here')
```