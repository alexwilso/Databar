let obj = { // Helper functions for handlebars file
    // Called if value is undefined, replaces with null 
    isNull: function(value){
        if (value == undefined) {
            return 'NULL';
        } else {
            return value;
        };
    },
    // Called in inventory.handlebars. Adds $ if value.
    isNullInventory: function(value){
        if (value == undefined) {
            return 'NULL';
        } else {
            return `$${value}`;
        };
    }
};
module.exports = { obj };