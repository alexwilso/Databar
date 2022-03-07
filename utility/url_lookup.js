// This object is used for deleting items from each table.
let urls = {
    'http://flip3.engr.oregonstate.edu:2412/events': ['Events', 'event_ID'],
    'http://flip3.engr.oregonstate.edu:2412/employees': ['Employees', 'employee_ID'],
    'http://flip3.engr.oregonstate.edu:2412/menu': ['Drinks', 'menu_item'],
    'http://flip3.engr.oregonstate.edu:2412/jobs': ['Jobs', 'job_code'],
    'http://flip3.engr.oregonstate.edu:2412/inventory': ['Inventory', 'product_ID']
};
module.exports = { urls }; 