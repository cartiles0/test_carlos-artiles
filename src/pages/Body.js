import 'bulma/bulma.sass'

var clothesCategories = [];
var store = {};

var request = new XMLHttpRequest();

request.open('GET', 'https://private-anon-07d98c6cb7-gocco.apiary-mock.com/stores/20/categories', false);

request.onreadystatechange = function () {
  if (this.readyState === 4 && this.status === 200) {
      var data = JSON.parse(this.responseText)
      
      for (var i = 0; i < data.length; i++) {
        clothesCategories.push(data[i].name)
        var category = data[i].name;
        store[`${category}`] = {};

        var request2 = new XMLHttpRequest();
        request2.open('GET', `https://private-anon-07d98c6cb7-gocco.apiary-mock.com/stores/20/products/search?category_id=${data[i].categoryId}&order=bestsellers`, false);

        request2.onreadystatechange = function () {
          if (this.readyState === 4 && this.status === 200) {
            var response = JSON.parse(this.responseText);
            
            var prodName = [];
            var prodImage = [];
            var prodPrice = [];
            var prodDetails = [];

            for (var j = 0; j < response.resultsCount; j++) {
            prodName.push(response.results[j].name)
            prodImage.push(response.results[j].images[0])
            prodPrice.push(response.results[j].finalPrice)
            prodDetails.push(response.results[j].description)

            for (var k = 0; k < clothesCategories.length; k++) {
              store[`${clothesCategories[k]}`].name = prodName
              store[`${clothesCategories[k]}`].image = prodImage
              store[`${clothesCategories[k]}`].price = prodPrice
              store[`${clothesCategories[k]}`].description = prodDetails
              }
            }
          }
        }
        request2.send();
      }
  }
}

request.send();

function Body() { 
  var menuItems = []

    for (var x = 0; x < clothesCategories.length; x++) {
    
      for (var y = 0; y < store[`${clothesCategories[x]}`].name.length; y++) {
        menuItems.push(
          <div key={ clothesCategories[x] + store[`${clothesCategories[x]}`].name[y] }>
            { clothesCategories[x] }
            <div className="card">
              <div className="card-image">
                <figure className="image is-4by3">
                  <img src={ store[`${clothesCategories[x]}`].image[y] } alt={'(Image of ' + store[`${clothesCategories[x]}`].name[y] + ' not available)'}/>
                </figure>
              </div>
  
              <div className="card-content">
                <div className="media-content">
                  <p className="title is-4">{ store[`${clothesCategories[x]}`].name[y] }</p>
                  <p className="subtitle is-6">{ store[`${clothesCategories[x]}`].price[y] }</p>
                </div>
              </div>
              <div className="content">
                { store[`${clothesCategories[x]}`].description[y] }
              </div>
            </div>
          </div>
        )
      }
    }

  return (
    <div className="Body row">
      { menuItems } 
    </div>
  );
}
  
export default Body;
  