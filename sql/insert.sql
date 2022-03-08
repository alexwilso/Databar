-- ------------------------------EMPLOYEES-------------------------------------------

-- INSERT --
INSERT INTO Employees (first_name, last_name, telephone, job_code, start_date) 
VALUES (:first_nameInput, :last_nameInput, :telephoneInput, :job_codeInput, :start_dateInput);

-- ------------------------------EVENTS-----------------------------------------


-- INSERT --
INSERT INTO Events (event_name, event_date, employee_1, employee_2, employee_3, employee_4, employee_5, guest_count, menu_item)
VALUES (:event_nameInput, :event_dateInput, :employee_1Input,:employee_2Input, :employee_3Input, :employee_4Input, :employee_5Input, :guest_countInput, :menu_itemInput);

-- ------------------------------JOBS-------------------------------------------

-- INSERT FUNCTIONALITY -- 
INSERT INTO Jobs (job_title, hourly_rate)
VALUES (:job_titleInput, :hourly_rateInput)

-- ------------------------------INVENTORY-------------------------------------------

INSERT INTO Inventory (name, category, btl_cost, cse_cost, distributor) VALUES (:nameInput, :categoryInput, :btl_costInput, :cse_costInput, :distributorInput) 

-- ------------------------------DRINKS-------------------------------------------

-- ADD INVENTORY ITEM --

INSERT INTO Drinks (drink_name, ingredient_1, ingredient_2, ingredient_3, ingredient_4. ingredient_5, price) VALUES (:drink_nameInput, :ingredient_1Input, :ingredient_2Input, :ingredient_3Input, :ingredient_4Input, :ingredient_5Input, priceInput); 