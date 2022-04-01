export default
class Filter {

    constructor() {
        this.minPrice = 999999999;
        this.maxPrice = 0;
    }

    setMinPrice( price ) {
        if (price < this.minPrice)
            this.minPrice = price;
    }

    setMaxPrice(price) {
        if (price > this.maxPrice)
            this.maxPrice = price;
    }
}