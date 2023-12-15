# wasteof-push
rss feed for wasteof.money notifications

This project creates an RSS server that listens to your notifications from wasteof.money and pushes them to an RSS feed whenever you have a new one. 
Note: You should probably run this locally - the RSS feed could include private messages that you don't want to be public.

## To deploy
- Download the project or clone it
- Add the following environment variables: `USERNAME` and `PASSWORD` - These should be self explanatory.
- Install dependencies: `npm i`
- Then run the code: `node index.js`
- The server will run on port 3000 by default, and the RSS feed will be served at `/rss`

Enjoy!
I will try to add more features (better security, a feed for your homepage feed, and richer content in the RSS items are the main things) but I may not have time to. We'll see.
