export default
class Cookie {
    static storeByCookie( name,  value )  {
        document.cookie = name + "=" + value + '; path=/; expires=Tue, 19 Jan 2038 03:14:07 GMT';
    }

    static resetCookie( name ) {
        document.cookie = name + "=";
    }

    static getByCookie( name ) {
        let matches = document.cookie.match(new RegExp(
            "(?:^|; )" + name.replace(/([.$?*|{}()[\]\\/+^])/g, '\\$1') + "=([^;]*)"
        ));
        return matches ? decodeURIComponent(matches[1]) : '';
    }
}