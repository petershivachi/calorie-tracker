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
    }
  }
})()




//UI Controller
const UICtrl = (function(){
  
  //Public Methods
  return{

  }
})()




//App Controller
const App = (function(ItemCtrl, UICtrl){
  
  //Public Methods
  return{
    init: function(){
      console.log('Initializing App..')
    }
  }
})(ItemCtrl, UICtrl);

App.init();