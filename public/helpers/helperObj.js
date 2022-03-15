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
    },
    // Returns formatted date
    formatDate: function(date){
        var format = { year: 'numeric', month: 'long', day: 'numeric' };
        return date.toLocaleDateString("en-US", format);
    },

    // Returns formatted date for updates
    stringDate: function(date){
        return date.toISOString().split('T')[0];
    }
};
module.exports = { obj };