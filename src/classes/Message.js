export default
class Message {
    constructor( object ) {
        this.id = object.id;
        this.user_name = object.user_name;
        this.is_customer = object.is_customer;
        this.order_id = object.order_id;
        this.text = object.text;
        let date = object.created_at.split("T")[0];
        let time = object.created_at.split("T")[1];
        time = time.split(':')[0] + ':' + time.split(':')[1];
        this.time = date.split('-')[2] + '.' + date.split('-')[1] + ', ' + time;
    }
}
