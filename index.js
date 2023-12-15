import express from 'express'
import 'dotenv/config'
import rss from 'rss';
import { Wasteof2Auth } from 'wasteof-client'
const app = express();
const port = 3000;
const password = process.env.PASSWORD
const username = process.env.USERNAME
let auth = new Wasteof2Auth(username, password)
await auth.login()
const feed = new rss({
    title: 'wasteof notifier',
    description: 'wasteof.money notifications over RSS',
    feed_url: 'http://localhost:3000/rss',
    site_url: 'http://localhost:3000',
});
auth.listen(async (data) => {
    if (data.type === "updateMessageCount" && data.data > 0) {
        console.log("New message")
            var description = `You have a new message on your account "@${username}`
            const messages = await auth.getUnreadMessages(0)
            if (messages.unread && messages.unread[0].data.actor.name) {
                let user = messages.unread[0].data.actor.name
                description = `@${user} sent you a new message on your account @${username}`
            } else {
                description = `You have a new message on your account "@${username}"`
            }
            feed.item({
                title: 'New Message on wasteof.money',
                description: description,
                url: 'http://wasteof.money/messages',
                guid: messages.unread[0]._id
                // RSS feed readers may hide items if they don't have unique URLS *and* don't have unique GUIDs
            });
    }
})

// Serve the RSS feed
app.get('/rss', (req, res) => {
    res.set('Content-Type', 'application/rss+xml');
    res.send(feed.xml());
});
app.get('/', (req, res) => {
    res.send("wasteof notifier");
});
// Start the server
app.listen(port, () => {
    console.log(`RSS server is running on http://localhost:${port}`);
});
