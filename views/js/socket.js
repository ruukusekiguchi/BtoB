const socketio = io();

var sendData = {
    auction:auctionid
}

socketio.emit('c2s-join', sendData);

const form = document.getElementById("chatForm");
form.addEventListener("submit", function(event){
    event.preventDefault();
    sendData = {
        auction:auctionid,
        user:document.getElementById("userid").value,
        price:parseInt(document.getElementById("price").value) + parseInt(document.getElementById("nowprice").textContent)
    }
    console.log(sendData);
    socketio.emit('c2s-chat', sendData);
});

socketio.on('s2c-chat', function(msg, maxprice){
    var ul = document.getElementById("output");
    var nowprice = document.getElementById("nowprice");
    var li = document.createElement('li');
    console.log('ソケットs2c-chat1:' + msg.user + maxprice);
    nowprice.innerHTML = maxprice;
    li.innerHTML = msg.user + '　　' + maxprice;
    ul.appendChild(li);
});