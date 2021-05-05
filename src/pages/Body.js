import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
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
            var prodCurrency = [];
            var prodDetails = [];

            for (var j = 0; j < response.resultsCount; j++) {
            prodName.push(response.results[j].name)
            prodImage.push(response.results[j].images[0])
            prodPrice.push(response.results[j].finalPrice)
            prodCurrency.push(response.results[j].currency)
            prodDetails.push(response.results[j].description)

            for (var k = 0; k < clothesCategories.length; k++) {
              store[`${clothesCategories[k]}`].name = prodName
              store[`${clothesCategories[k]}`].image = prodImage
              store[`${clothesCategories[k]}`].price = prodPrice
              store[`${clothesCategories[k]}`].currency = prodCurrency
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
    var clothesArray = []
    for (var y = 0; y < store[`${clothesCategories[x]}`].name.length; y++) {
      clothesArray.push(
        <div className="m-4 columns is-multiline" key={ clothesCategories[x] + store[`${clothesCategories[x]}`].name[y] }>
          <div className="card column p-0 is-flex-direction-row" style={{width: 250}}>
            <div className="card-image">
              <figure className="image is-4by3">
                <img src={ store[`${clothesCategories[x]}`].image[y] } alt={'(Image of ' + store[`${clothesCategories[x]}`].name[y] + ' not available)'}/>
              </figure>
            </div>
  
            <div className="card-content p-3">
              <div className="media-content has-text-left">
                <p className="title is-6 mb-2">{ store[`${clothesCategories[x]}`].name[y] }</p>
                <p className="subtitle is-7 my-0 py-0">{ store[`${clothesCategories[x]}`].price[y] + " " + store[`${clothesCategories[x]}`].currency[y] }</p>
                <p className="subtitle is-6">{ store[`${clothesCategories[x]}`].description[y] }</p>
              </div>
            </div>
          </div>
        </div>
      )
    }
    menuItems.push(clothesArray)
  }
  return (
    <div className="section is-max-desktop has-background-white mx-4">
        <Tabs>
          <TabList>
            { clothesCategories.map(category => (
            <Tab>
              <div className="title is-5">
                { category }
              </div>
            </Tab>
            ))}
          </TabList>

          { clothesCategories.map((category, index) => ( 
            <TabPanel>
              <div className=" is-flex is-flex-wrap-wrap is-justify-content-space-evenly mb-5" key={ category }>
                { menuItems[index] }              
              </div>
            </TabPanel>
          ))}
        </Tabs>
    </div>
  );
}
  
export default Body;
