const socketio = io();

var sendData = {
    auction:auctionid
}

socketio.emit('c2s-join', sendData);

const form = document.getElementById("chatForm");
form.addEventListener("submit", function(event){
    event.preventDefault();
    sendData = {
        auctionid:auctionid,
        userid:userid,
        price:parseInt(document.getElementById("price").value) + parseInt(document.getElementById("nowprice").textContent)
    }
    console.log(sendData);
    socketio.emit('c2s-chat', sendData);
});

socketio.on('s2c-chat', function(maxprice, bidnum){
    var nowprice = document.getElementById("nowprice");
    var bid_num = document.getElementById("bid_num");
    console.log('ソケットs2c-chat1:' + maxprice + ' ' + bidnum);
    nowprice.innerHTML = maxprice;
    bid_num.innerHTML = bidnum;
});