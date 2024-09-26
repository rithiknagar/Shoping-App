
var itemcount=[];
        function loadcategories(){
            fetch('https://fakestoreapi.com/products/categories')

            .then(function(response){
                return response.json();
            })

            .then(function(data){

                data.unshift("All")

                for(var item of data){
                    var option=document.createElement("option")
                    option.text=item.toUpperCase();
                    option.value=item;
                    document.querySelector("select").appendChild(option)
                }
            })
        }
        function loadproduct(url){

            document.querySelector("main").innerHTML=""

            fetch(url)

            .then(function(response){
                return response.json();
            })

            .then(function(data){
                for(var item of data){
                    var div=document.createElement("div");
                    div.className="card m-2 p-2"
                    div.style.width="180px"
                    div.innerHTML=`
                     <img src=${item.image} height="150" class="card-img-top" >
                     <div class="card-header" style="height: 150px;" >
                      <p> ${item.title}</p>
                      </div>
                       <div class="card-body">
                        <dl>
                        <dt>Price</dt>
                        <dd>${item.price}</dd>
                        <dt>Rating</dt>
                        
                        <dd>
                            <i class="fa fa-star checked"></i>
                            ${item.rating.rate}[${item.rating.count}]
                            </dd>
                        </dl>
                        </div>
                         <div class="card-footer">
                           <button class="btn btn-danger w-100 " onclick="added(${item.id})" ><span class="fa fa-shopping-cart"> </span>  Add to Cart</button>
                          </div>

                    `
                    document.querySelector("main").appendChild(div)
                }
            })
        }

        function changed(){

             var category=document.getElementById("select").value;
             if(category=="All"){
                loadproduct('https://fakestoreapi.com/products/')
             }

             loadproduct(`https://fakestoreapi.com/products/category/${category}`)
        }

        function bodyload(){
            loadcategories()
            loadproduct('https://fakestoreapi.com/products/')
            cartcount()
        }

        function cartcount(){
            document.getElementById("count").innerHTML=itemcount.length
        }

        function added(id){
            fetch(`https://fakestoreapi.com/products/${id}`)
            .then(function(response){
                return response.json();
            })

            .then(function(data){
               var flag= confirm("are you sure to add this to your cart")
                if(flag==true){
                    itemcount.push(data)

                  cartcount()
                }
            })
               
        }
        function showcart(){
            
            if(itemcount.length==0){
                // document.querySelector("main").innerHTML="No Item In Your cart"
                 
                alert("No Item In Your cart")
                return 
               
            
            }
            document.querySelector("main").innerHTML=""
           
            for(var item of itemcount){
                     
                    var div=document.createElement("div");
                    div.className="card m-2 p-2"
                    div.style.width="180px"
                    div.innerHTML=`
                     <img src=${item.image} height="150" class="card-img-top" >
                     <div class="card-header" style="height: 160px;" >
                      <p> ${item.title}</p>
                      </div>
                       <div class="card-body">
                        <dl>
                        <dt>Price</dt>
                        <dd>${item.price}</dd>
                        <dt>Rating</dt>
                        
                        <dd>
                            <i class="fa fa-star checked"></i>
                            ${item.rating.rate}[${item.rating.count}]
                            </dd>
                        </dl>
                        </div>
                         <div class="card-footer">
                           <button class="btn btn-danger w-100 " onclick="added(${item.id})" ><span class="fa fa-shopping-cart"> </span>  Add to Cart</button>
                          </div>
                         

                    `
                    document.querySelector("main").appendChild(div)
                }
        }