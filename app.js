// MODULE PATTERN

const budgetController = (function() {
    
    const Expense = function(id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };

    const Income = function(id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };

    const data = {
        allItems: {
            exp: [],
            inc: []
        },
        totals: {
            exp: 0,
            inc: 0
        }
    };

    return {
        addItem: function(type, des, val) {
            let newItem, ID;

            // create new ID
            if (data.allItems[type].length > 0) {
                ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
            } else {
                ID = 0;
            }

            // Create new item based on 'inc' or 'exp' type
            if(type === 'exp') {
                newItem = new Expense(ID, des, val);

            } else if (type === 'inc') {
                newItem = new Income(ID, des, val);

            }

            // push it into our data structure
            data.allItems[type].push(newItem);

            // return the new element
            return newItem;

        },

        testing: function() {
            console.log(data);
        }
    };

})();

const UIController = (function() {
    // some code+
    let DOMstrings = {
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        inputBtn: '.add__btn'
    };
    return {
        getInput: function () {
            return {
                type: document.querySelector(DOMstrings.inputType).value, // will be either inc or exp
                description: document.querySelector(DOMstrings.inputDescription).value,
                value: document.querySelector(DOMstrings.inputValue).value
            };
        },
        getDOMstrings: function() {
            return DOMstrings;
        }
    };
})();

const controller = (function(budgetCtrl, UICtrl) {

    let setupListeners = function() {
        let DOM = UICtrl.getDOMstrings();

        document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);
    
        document.addEventListener('keypress', function(event) {
            if (event.keyCode === 13 || event.which === 13) {
                ctrlAddItem();
            }
        });
    };

    let ctrlAddItem = function() {
        let input, newItem;
        //    1. get the field input data
        input = UICtrl.getInput();
        
    //  2. add the item to the budget controller
        newItem = budgetCtrl.addItem(input.type, input.description, input.value);
    // 3. add the item to the ui

    //  4. calculate the budget

    // 5. display the budget on the UI
        
    };

   return {
       init: function() {
           console.log('application started');
           setupListeners();
       }
   }
})(budgetController, UIController);

controller.init();