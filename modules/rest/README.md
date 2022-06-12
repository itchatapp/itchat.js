### REST

### Features
- [X] Lightweight
- [X] Typed Response
- [X] Deno Support
- [ ] Handles Rate Limit

### Usage
```ts
import { REST } from '@itchatapp/rest'

const rest = new REST()

rest.setToken('itchat-token-here')

const res = await rest.get('/users/@me')

console.log(res)
```