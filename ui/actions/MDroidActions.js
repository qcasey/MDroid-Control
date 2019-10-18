import React from 'react';

export const CreateSocket = () => {
    return new WebSocket('ws://'+global.SERVER_HOST+'/ws/'+global.TOKEN);;
}

export const SendToSocket = async (ws, method, path, data) => {
    obj = {"output": method+";"+path+";"+data, "method":"request"}
    ws.send(JSON.stringify(obj));
}

export const postRequest = (path, values) => {
    SendToSocket(global.ws, "POST", path, values)
}
export const getRequest = (path) => {
    SendToSocket(global.ws, "GET", path, "")
}