<template>
  <div id="" class="container">
    <div id="mapPlace" style="width: 100%; height: 400px"></div>
    <div class="address-line">
      {{ addressLine }}
    </div>
  </div>
</template>

<script>
/* eslint-disable */
export default {

  name: "YandexMap",
  data() {
      return {
        addressLine: 'Тут отобразится адрес',
        mapCont: null
      }
  },
  methods: {
      changeAddressLine( address ) {
        this.addressLine = address;
        this.setAddrToStore( address );
      },
      fetchAddressLine( coords ) {
        let url = "https://suggestions.dadata.ru/suggestions/api/4_1/rs/geolocate/address";
        let token = "87bfb8bb6b77697833bf017cf66f365308c78a18";
        let query = { lat: coords[0], lon: coords[1] };

        let options = {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": "Token " + token
          },
          body: JSON.stringify(query)
        }

        fetch(url, options)
            .then(response => response.json())
            .then(result => this.changeAddressLine( result.suggestions[0].value ))
            .catch(error => console.log("error", error));
      },
      initMap( link ) {
        this.mapCont = link;
      },
      setAddrToStore( addr ) {
        this.$store.dispatch('delivery', 'Доставка по адресу - ' + addr);
      }
  },
  mounted() {
    const getAddress = this.fetchAddressLine;
    const initMap = this.initMap;
    ymaps.ready(function () {
      let map = new ymaps.Map("mapPlace", {
            center: [55.76, 37.64],
            zoom: 10
          }, {
            searchControlProvider: 'yandex#search'
          }),

          // Создаем геообъект с типом геометрии "Точка".
          myGeoObject = new ymaps.GeoObject({
            // Описание геометрии.
            geometry: {
              type: "Point",
              coordinates: [55.76, 37.64]
            },
            properties: {
            }
          }, {
          });

       map.geoObjects
           .add(myGeoObject);
       map.events.add('click', (e) => {
          myGeoObject.geometry.setCoordinates( e.get( 'coords' ) );
         getAddress( e.get( 'coords' ) );
       });
      initMap( map );
      });
  },
}
</script>

<style scoped>
  .address-line {
    font-size: 18px;
    font-weight: 500;
    color: var(--gray-800);
    text-align: center;
    margin-top: 20px;
  }
</style>