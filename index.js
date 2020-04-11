const core = require('@actions/core');
const github = require('@actions/github');
const axios = require('axios');

async function sendMessage(roomId, text, token, messageId, ref, eventName, actionUrl) {
    console.log("RoomID: " + roomId);
    console.log("MessageID: " + messageId);
    console.log("Ref: " + ref);
    console.log("EventName: " + eventName);
    console.log("ActionUrl: " + actionUrl);


    let url = `https://api.gitter.im/v1/rooms/${roomId}/chatMessages`;

    const headers = {
        "Content-Type": 'application/json',
        "Accept": 'application/json',
        "Authorization": `Bearer ${token}`
    };

    const completeText = `**Ref:** ${ref}\n**Event:** ${eventName}\n**Action:** ${actionUrl}\n**Message:** ${text}`;

    const body = {
        "text": completeText
    };

    const config = {
        headers: headers
    };

    if (messageId != null && messageId !== '') {
        url = `${url}/${messageId}`;

        console.log(`PUT: ${url}, Body: ${JSON.stringify(body)}`);

        await axios.put(url, body, config);
        return messageId;
    } else {
        console.log(`POST: ${url}, Body: ${JSON.stringify(body)}`);

        const response = await axios.post(url, body, config);
        return response.data.id;
    }
}

async function run() {
    try {
        const roomId = core.getInput('room-id');
        const text = core.getInput('text');
        const token = core.getInput('token');
        const messageId = core.getInput('message-id');

        const ref = github.context.ref;
        const eventName = github.context.eventName;
        const repository = github.context.repo;
        const sha = github.context.sha;

        const actionUrl = `https://github.com/${repository.owner}/${repository.repo}/commit/${sha}/checks`;

        const newMessageId = await sendMessage(roomId, text, token, messageId, ref, eventName, actionUrl);
        core.setOutput('message-id', newMessageId);
    }
    catch (error) {
        core.setFailed(error.message);
    }
}

run();
