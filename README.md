Rate speech
=========================

[Disqus](https://disqus.com) + [Perspective](https://www.perspectiveapi.com/) comment ratings for:

- TOXICITY
- ATTACK_ON_AUTHOR
- ATTACK_ON_COMMENTER
- INCOHERENT
- INFLAMMATORY
- OBSCENE
- OFF_TOPIC
- UNSUBSTANTIAL
- LIKELY_TO_REJECT

## Setup

1. Add your Google `API_KEY` to your environment variables. [Setup](https://github.com/conversationai/perspectiveapi/blob/master/quickstart.md).
2. Replace `kaffepausen` with your [Disqus shortname](https://help.disqus.com/customer/en/portal/articles/466208-what-s-a-shortname-) in `views/index.html`

    `s.src = '//kaffepausen.disqus.com/embed.js';  // IMPORTANT: Replace EXAMPLE with your forum shortname!`
