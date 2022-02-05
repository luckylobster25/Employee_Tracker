USE casino_db;

INSERT INTO department(name)
VALUES
("Slot"),
("Blackjack"),
("Hotel"),
("Security"),
("Surveillance");

INSERT INTO role(title, salary, department_id)
VALUES
("Slot specialist", 50000, 1),
("Slot supervisor", 53000, 1),
("Slot manager", 64000, 1),
("Blackjack dealer", 55000, 2),
("Blackjack floor supervisor", 52000, 2),
("Blackjack pitboss", 65000, 2),
("Hotel housekeeper", 45000, 3),
("Hotel supervisor", 50000, 3),
("Hotel manager", 55000, 3),
("Security dispatch", 47000, 4),
("Security supervisor", 50000, 4),
("Surveillance specialist", 51000, 5),
("Surveillance manager", 60000, 5);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
-- slot department start
("Tam", "Nguyen", 1, 1),
("Michael", "Smith", 1, 1),
("Michelle", "Co", 1, 1),
("Tony", "Ally", 1, 1),
("Kelly", "Birdie", 2, 2),
("Larry", "Downfall", 2, 2),
("Chris", "Long", 3, NULL),
-- slot department end

-- Blackjack department start
("Xang", "Chang", 4, 3),
("Allen", "Calvin", 4, 3),
("Many", "Sexton", 4, 3),
("Brandon", "Steven", 4, 3),
("Jojo", "Birdie", 4, 3),
("Larry", "Larock", 4, 3),
("Steven", "Stone", 5, 4),
("Kyle", "Bastin", 5, 4),
("Louis", "Peacock", 5, 5),
("Adam", "Reed", 5, 5),
("Kong", "Xiong", 6, NULL),
("Jennifer", "Lynn", 6, NULL),
-- Blackjack department end

-- Hotel department start
("Kristin", "Ton", 7, 6),
("Stephen", "Callin", 7, 6),
("Mary", "Popin", 7, 6),
("Ian", "Madness", 8, 7),
("George", "Lakorn", 8, 7),
("Synn", "Mona", 9, NULL),
-- Hotel department end

-- Security department start
("Tou", "Lee", 10, 8),
("Stephanie", "Lincoln", 10, 8),
("Steve", "Harden", 10, 9),
("Van", "Den", 10, 9),
("Hugo", "Merlin", 10, 9),
("George", "Kris", 11, NULL),
("Peace", "Loud", 11, NULL),
-- Security department end

-- Surveillance department start
("Albert", "Fox", 12, 10),
("Susie", "Coin", 12, 10),
("Matthew", "Jony", 12, 10),
("Shane", "Cutthroat", 13, NULL);
-- Surveillance department end
