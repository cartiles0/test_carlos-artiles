import React from "react";

function Body() {

  var request = new XMLHttpRequest();

  function Store (clothes) {
    // for (var i = 0, i < )
    console.log('Store ---->', clothes)
    
    return (
      <div>
        Clothes will go here
      </div>
    )
  }

  // request.open('GET', 'https://private-anon-07d98c6cb7-gocco.apiary-mock.com/stores/10/categories');

  request.open('GET', 'https://private-anon-07d98c6cb7-gocco.apiary-mock.com/stores/10/products/search?category_id=23&order=bestsellers&dir=asc&limit=10');


  
  request.onreadystatechange = function () {
    if (this.readyState === 4) {
      // console.log('Status:', this.status);
      // console.log('Headers:', this.getAllResponseHeaders());
      // console.log('Body:', this.responseText);
      Store(JSON.parse(this.responseText))

    }
  };


  

  request.send();

  return (
    <div className="Body">
      <p>
        Agile Monkey Project Carlos Artiles
      </p>
      <br/>
      <Store />
    </div>
  );
}
  
export default Body;
  