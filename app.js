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
    addItem: function(name, calories){
      let ID;

      //create ID
      if(data.items.length > 0){
        ID = data.items[data.items.length - 1].id + 1;
      }else {
        ID = 0;
      }

      //Calories to number
      calories = parseInt(calories);

      //create new Item
      newItem = new Item(ID, name, calories);

      data.items.push(newItem);

      return newItem;
    },
    getItems: function(){
      return data.items;
    },

    getTotalCalories: function(){
      let total = 0;

      //Loop through items and add calories
      data.items.forEach(function(item){
        total = total + item.calories;
      });

      //set total cal in data structures
      data.totalCalories = total;

      //return total
      return data.totalCalories;
    },

    logData: function(){
      return data;
    }
  }
})();


//UI Controller
const UICtrl = (function(){

  const UISelectors = {
    listItem: '#list-item',
    addBtn: '#add-btn',
    mealItem: '#meal-item',
    caloriesItem: '#calories-item',
    totalCalories: '#total-calories'
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

    showTotalCalories: function(totalCalories){
      document.querySelector(UISelectors.totalCalories).textContent = totalCalories;
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

      //Compute the number of calories
      const totalCalories = ItemCtrl.getTotalCalories()

      //show the total calories in the Ui
      UICtrl.showTotalCalories(totalCalories);

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