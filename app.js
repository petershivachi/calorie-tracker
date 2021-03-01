//Storage Controller


//Item Controller
const ItemCtrl = (function(){
  //Item constructor
  const Item = function(id, name, calories){
    this.id = id,
    this.name = name
    this.calories = calories
  }

  const data = {
    items: [
      { id: 0, name: 'Steak Dinner', calories: 1200 },
      { id: 1, name: 'Cookie', calories: 1900 },
      { id: 2, name: 'Cheese Bread', calories: 1300 },
      { id: 3, name: 'Butter Toast', calories: 800 }
    ],
    currentItem: null,
    totalCalories: 0
  }

  //Public Methods
  return {
    logData: function(){
      return data;
    },
    getItems: function(){
      return data.items;
    }
  }
})()


//UI Controller
const UICtrl = (function(){

  const UISelectors = {
    listItems: '#list-items'
  }
  
  //Public Methods
  return{
    populateListItems: function(items){
      let html = '';
       items.forEach(function(item){
         html += `
         <li class="collection-item" id="item-${item.id}">
         <strong>${item.name}: </strong><em>${item.calories}calories</em>
         <a href="#" class="secondary-content">
           <i class="edit-item fa fa-pencil"></i>
         </a>
       </li>`;
       });

       document.querySelector(UISelectors.listItems).innerHTML = html;
    }
  }
})()


//App Controller
const App = (function(ItemCtrl, UICtrl){
  
  //Public Methods
  return{
    init: function(){
      //Fetch Items from ItemCtrl
      const items = ItemCtrl.getItems();

      //Populate items with the UICtrl
      UICtrl.populateListItems(items)
    }


  }
})(ItemCtrl, UICtrl);

App.init();