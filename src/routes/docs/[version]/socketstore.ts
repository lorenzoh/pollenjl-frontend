import { writable } from 'svelte/store';

export function socketStore(url) {
    const messageStore = writable('');

    console.log("Trying to connect")

    let socket = new WebSocket(url);
    let open = false

    // Connection opened
    function doOpen() {
        socket.addEventListener('open', function (event) {
            open = true;
            console.log("It's open");
            socket.addEventListener('close', function (event) {
                open = false;
                console.log("Socket closed, trying to reopen");
                //socket = new WebSocket(url);
                //doOpen()

            });
            socket.addEventListener('message', function (event) {
                messageStore.set(event.data);
            });
        });
    }

    doOpen();

    const isOpen = () => {
        return open
    }

    const sendMessage = (message) => {
        if (socket.readyState <= 1) {
            socket.send(message);
        }
    }

    return {
        subscribe: messageStore.subscribe,
        set: messageStore.set,
        //set: sendMessage,
        isOpen,
    }
}

function attachEvents(socket) {

}