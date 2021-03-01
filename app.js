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
      // { id: 0, name: 'Steak Dinner', calories: 1200 },
      // { id: 1, name: 'Cookie', calories: 1900 },
      // { id: 2, name: 'Cheese Bread', calories: 1300 },
      // { id: 3, name: 'Butter Toast', calories: 800 }
    ],
    currentItem: null,
    totalCalories: 0
  }

  //Public Methods
  return {
    logData: function(){
      return data;
    },
    addItem: function(name, claories){
      let ID;

      //create ID
      if(data.items.length > 0){
        ID = data.items[data.items.length - 1].id + 1;
      }else {
        ID = 0;
      }

      //Calories to number
      calories = parseInt(claories);

      //create new Item
      newItem = new Item(ID, name, claories);

      data.items.push(newItem);

      return newItem;
    },
    getItems: function(){
      return data.items;
    }
  }
})();


//UI Controller
const UICtrl = (function(){

  const UISelectors = {
    listItem: '#list-item',
    addBtn: '#add-btn',
    mealItem: '#meal-item',
    caloriesItem: '#calories-item'
  }
  
  //Public Methods
  return{
    populateListItems: function(items){
      let html = '';
       items.forEach(function(item){
         html += `
         <li class="collection-item" id="item-${item.id}">
         <strong>${item.name}: </strong><em>${item.calories}     Calories</em>
         <a href="#" class="secondary-content">
           <i class="edit-item fa fa-pencil"></i>
         </a>
       </li>`;
       });

       document.querySelector(UISelectors.listItem).innerHTML = html;
    },

    getItemInput(){
      return{
        name: document.querySelector(UISelectors.mealItem).value,
        calories: document.querySelector(UISelectors.caloriesItem).value
      }
    },

    addListItem: function(item){
      //Show the list
      document.querySelector(UISelectors.listItem).style.display = 'block';
      //create an li
      const li = document.createElement('li');

      //add a classname to the li
      li.className = 'collection-item';

      //add an id to the li
      li.id = `item-${item.id}`;

      //add HTML
      li.innerHTML = `
      <strong>${item.name}: </strong><em>${item.calories}calories</em>
      <a href="#" class="secondary-content">
        <i class="edit-item fa fa-pencil"></i>
      </a>`;

      //Insert item
      document.querySelector(UISelectors.listItem).insertAdjacentElement('beforeend', li);
    },

    clearInput: function(){
      document.querySelector(UISelectors.mealItem).value = '';
      document.querySelector(UISelectors.caloriesItem).value = '';
    },

    HideList: function(){
      document.querySelector(UISelectors.listItem).style.display = 'none';
    },

    getSelectors: function(){
      return UISelectors;
    },
  }
})()


//App Controller
const App = (function(ItemCtrl, UICtrl){

  const loadEventListeners = function(){

    //UI selectors
    const UISlectors = UICtrl.getSelectors();

    //Add food item and calorie
    document.querySelector(UISlectors.addBtn).addEventListener('click', itemAddSubmit);
  }

  const itemAddSubmit = function(e){
    e.preventDefault();

    const input = UICtrl.getItemInput();

    if(input.name !== '' && input.calories !== ''){
      const newItem = ItemCtrl.addItem(input.name, input.calories);

      //Add the item to the UI
      UICtrl.addListItem(newItem);

      //clear input
      UICtrl.clearInput()
    }

   
  }
  
  //Public Methods
  return{
    init: function(){
      //Fetch Items from ItemCtrl
      const items = ItemCtrl.getItems();


      // Check if any items
      if(items.length === 0){
        UICtrl.HideList();
      } else {
        // Populate list with items
        UICtrl.populateListItems(items);

      }

      loadEventListeners();
    }
  }
})(ItemCtrl, UICtrl);

App.init();