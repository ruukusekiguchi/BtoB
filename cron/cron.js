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
        let min = endTime.getMinutes();
        let sec = endTime.getSeconds() + 1;
        if(sec == 60){
            sec = 0;
            min++;
        }
        console.log(month + '月' + date + '日' + hour + '時' + min + '分' + sec + '秒');

        //指定時間になると動く
        cron.schedule( sec + ' ' + min + ' ' + hour + ' ' + date + ' ' + month + ' *', (req, res) => {
            let dt = new Date();
            date = new Date(dt.getFullYear(), dt.getMonth() + 2, 0); //翌月の末日取得
            
            //オークション終了時にステータス変更
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

                //オークション終了時にオークション情報取得
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
    
                    //オークション終了時にpaymentテーブルに落札情報を挿入
                    values = [
                        results[0].id,
                        results[0].user_info_id,
                        results[0].bid_price,
                        dt,
                        date,
                        0
                    ]
                    connection.query("INSERT INTO payment(auction_id,user_info_id,payment_money,payment_date,payment_limit,payment_flag) VALUES(?,?,?,?,?,?);", values, (error, results) => {
                        if(error){
                            console.log('error connecting:' + error.stack);
                            return;
                        }
                        console.log("落札者情報挿入");
                        console.log(results);
                    });
                });
            });
        });
    }
});