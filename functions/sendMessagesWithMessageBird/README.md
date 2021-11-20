### How this function works

Use this function to send omnichannel messages (SMS, WhatsApp, Google's Business Messages, Messenger, Telegram, Line, Viber, etc.) with MessageBird. The function uses the MessageBird Conversations API and will be triggered by a Pub/Sub event published with the specific topic SEND_MESSAGEBIRD_MESSAGE. The type of message you want to send will define which field is required within the message content.

### Prerequisites

-   You must have previous knowledge of **MessageBird**.

### Function details

In order to complete the installation process, you must add the required info to the form with the following parameters from your MessageBird account:

> MESSAGEBIRD_LIVE_API_KEY: The API key that MessageBird uses to identify the user.

> CHANNEL_ID: The channel ID from which the message should be sent.

Here is an example of how to use the function when it is installed:

```js
const dataBuffer = Buffer.from(
    JSON.stringify({
        type: 'text',
        to: '16175551212',
        from: `123qwe456asd789zxc`,
        content: {
            text: 'Hello World',
        },
    })
);
await pubsub.topic('SEND_MESSAGEBIRD_MESSAGE').publish(dataBuffer);
```

After you implement the previous code, MessageBird will send a message with the content "Hello World".

> Note that if you need to access the body of the request and the response that the MessageBird Conversations API returns, you can do so from the function registers called messagebird_request and messagebird_response.

### Resources

For more information about all the other types of messages you can send with MessageBird, see:
[MessageBird Documentation](https://developers.messagebird.com/api/conversations/#send-message)
