export default
class ChatInfo {
    constructor( object ) {
        this.lastMessage = object.lastMessage;
        this.userName = object.userName;
        let date = object.timeLastMessage.split("T")[0];
        let time = object.timeLastMessage.split("T")[1];
        time = time.split(':')[0] + ':' + time.split(':')[1];
        this.timeLastMessage = date.split('-')[2] + '.' + date.split('-')[1] + ', ' + time;
        this.orderId = object.orderId;
        this.messageViewed = object.messageViewed;
    }
}
