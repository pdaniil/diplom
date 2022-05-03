export default
    class Product {
        constructor(obj) {
            this.article =  obj.article ? obj.article : "–",
            this.brand =  obj.brand ? obj.brand : "–",
            this.description = obj.title ? obj.title : "–",
            this.storage = obj.storage ? obj.storage : "–",
            this.time = obj.delivery_time ? Math.ceil(obj.delivery_time) : 0,
            this.price = obj.price ? Math.ceil(obj.price) : "–",
            this.exist = obj.exist ? obj.exist : "–",
            this.darkBack = false
        }

        valid() {
            if (this.article == '–' || this.brand == '–' || this.price == '–' )
                return false
        }
    }
