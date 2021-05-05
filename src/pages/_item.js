
function Item(prop) {
  var item = prop.match.params.item.split(",")
  var product = {}

  var request = new XMLHttpRequest();

  request.open('GET', `https://private-anon-ac7c32c199-gocco.apiary-mock.com/stores/20/products/search?category_id=${item[0]}`, false);

  request.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      var data = JSON.parse(this.responseText)

      for (var i = 0; i < data.results.length; i++) {
        if (data.results[i].modelId === item[1]) {
          product.name = data.results[i].name
          product.color = data.results[i].color
          product.price = data.results[i].finalPrice
          product.image = data.results[i].images[0]
          product.currency = data.results[i].currency
          product.sku = data.results[i].sku
          product.description = data.results[i].description
          product.care = data.results[i].care
        }
      }
    }
  };

request.send();
  return(
    <div className="m-4">
      <div className="card p-0">
        <div className="card-image">
          <figure className="image is-4by3">
            <img src={ product.image } alt={'(Image of ' + product.name + ' not available)'}/>
          </figure>
        </div>

        <div className="card-content p-3">
          <div className="media-content has-text-left">
            <p className="title is-5 mb-2">{ product.name }</p>
            <div className="columns is-mobile is-centered">
              <div className="column has-text-centered pt-0">
                <div className="mt-3">
                  <div className="has-text-left"> 
                    <p className="subtitle is-6">{ product.price + " " + product.currency }</p>
                    <p className="subtitle is-6 mb-0"><b>Color: </b>{ product.color }</p>
                    <p className="subtitle is-6 mb-2">{ product.description }</p>
                    <img src={ product.care } alt={'(Image of ' + product.name + 'care is not available)'}/>

                  </div>
                  <div className="has-text-right">
                    <p className="subtitle is-7 my-0 py-0">Modelo: { item[1] }</p>
                    <p className="subtitle is-7">Sku: { product.sku }</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Item