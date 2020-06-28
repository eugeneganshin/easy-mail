const socketIO = require('socket.io')

const createSocket = (server) => {
    const io = socketIO(server)

    io.on('connection', (socket) => {
        console.log("Socket connected: " + socket.id);

        socket.on('action', (action) => {
            if (action.type === 'server/hello') {
                console.log('Got hello data!', action.data);
                socket.emit('action', { type: 'data', data: 'good day!' });
            }
        });

        socket.on('disconnect', () => {
            console.log('a user disconnected')
        })
    });

    return io
}

module.exports = createSocket