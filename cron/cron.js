const cron = require('node-cron');
const mysql = require("mysql");

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    port: '3306',
    database: 'auction_master'
});

//開催しているオークションの終了時間を取得
connection.query("SELECT id, end_time FROM auction WHERE status_flag = 0;", (error, results) => {
    if(error){
        console.log('error connecting:' + error.stack);
        return;
    }
    console.log("オークションの終了時間を取得");
    console.log(results);

    for(i = 0; i < results.length; i++){
        endTime = new Date(results[i].end_time);
        let auctionid = results[i].id;
        let month = endTime.getMonth() + 1;
        let date = endTime.getDate();
        let hour = endTime.getHours();
        let min = endTime.getMinutes() + 1;
        if(min == 60){
            min = 0;
            hour++;
        }
        console.log(month + '月' + date + '日' + hour + '時' + min + '分');

        cron.schedule('00 ' + min + ' ' + hour + ' ' + date + ' ' + month + ' *', () => {
            let values = [
                auctionid
            ]
            connection.query("UPDATE auction SET status_flag = 2 WHERE id = ?;", values, (error, results) => {
                if(error){
                    console.log('error connecting:' + error.stack);
                    return;
                }
                console.log("オークションの終了時にstatus変更");
                console.log(results);

                values = [
                    auctionid
                ]
                connection.query("SELECT id, user_info_id, bid_price FROM auction WHERE id = ? AND status_flag = 2;", values, (error, results) => {
                    if(error){
                        console.log('error connecting:' + error.stack);
                        return;
                    }
                    console.log("オークションの終了時のオークション情報取得");
                    console.log(results);
    
                    
                });
            });
        });
    }
});