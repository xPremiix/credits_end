window.addEventListener('onWidgetLoad', function (obj) {
    const recents = obj.detail.recents;
    let mentionedEvents = [];
    let fieldData = obj.detail.fieldData;
    let locale = fieldData["locale"];

    function isUserMentioned(username, type) {
        for (let i = 0; i < mentionedEvents.length; i++) {
            if ((mentionedEvents[i].name.toLowerCase() === username.toLowerCase()) && (mentionedEvents[i].type === type)) {
                return true;
            }
        }
        return false;
    }

    for (eventIndex in recents) {
        const event = recents[eventIndex];
        if (!fieldData[`enable${event.type}`]) continue;

        if (event.type === "subscriber") {
            if (!isUserMentioned(event.name, event.type)) {
                mentionedEvents.push(event);
                if (event.amount > 1) {
                    addElement(event.type, `${event.name} resubscribed for ${event.amount} months`);
                } else {
                    addElement(event.type, `${event.name} subscribed for 1 month`);
                }
            }
        } else if (event.type === "tip") {
            if (!isUserMentioned(event.name, event.type)) {
                mentionedEvents.push(event);
                addElement(event.type, event.name);
            }
        } else if (event.type === "follower") {
            if (!isUserMentioned(event.name, event.type)) {
                mentionedEvents.push(event);
                addElement(event.type, event.name);
            }
        } else if (event.type === "cheer") {
            if (!isUserMentioned(event.name, event.type)) {
                mentionedEvents.push(event);
                addElement(event.type, event.name);
            }
        }
    }
});

function addElement(type, entry) {
    const element = `<li class="user">${entry}</li>`

    $('.' + type).append(element)
    $('.' + type).css('display', 'flex');
    $('.' + type).closest('.credits-subsection').css('display', 'block');
}
