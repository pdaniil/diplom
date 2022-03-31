export default
    class Product {
        constructor(obj) {
            this.article =  obj.article ? obj.article : "–",
            this.brand =  obj.brand ? obj.brand : "–",
            this.description = obj.description ? obj.description : "–",
            this.storage = obj.storage ? obj.storage : "–",
            this.time = obj.time ? obj.time : "–",
            this.price = obj.price ? obj.price : "–",
            this.exist = obj.exist ? obj.exist : "–",
            this.darkBack = false
        }

        valid() {
            if (this.article == '–' || this.brand == '–' || this.price == '–' )
                return false
        }
    }
