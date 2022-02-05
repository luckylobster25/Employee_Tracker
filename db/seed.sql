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

SET FOREIGN_KEY_CHECKS=0;

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
("Tam", "Nguyen", 1, 5),
("Michael", "Smith", 1, 5),
("Michelle", "Co", 1, 6),
("Tony", "Ally", 1, 6),
("Kelly", "Birdie", 2, 7),
("Larry", "Downfall", 2, 7),
("Chris", "Long", 3, NULL),
("Xang", "Chang", 4, 14),
("Allen", "Calvin", 4, 14),
("Many", "Sexton", 4, 15),
("Brandon", "Steven", 4, 15),
("Jojo", "Birdie", 4, 16),
("Larry", "Larock", 4, 17),
("Steven", "Stone", 5, 18),
("Kyle", "Bastin", 5, 18),
("Louis", "Peacock", 5, 19),
("Adam", "Reed", 5, 19),
("Kong", "Xiong", 6, NULL),
("Jennifer", "Lynn", 6, NULL),
("Kristin", "Ton", 7, 23),
("Stephen", "Callin", 7, 23),
("Mary", "Popin", 7, 24),
("Ian", "Madness", 8, 25),
("Georgie", "Lakorn", 8, 25),
("Synn", "Mona", 9, NULL),
("Tou", "Lee", 10, 31),
("Stephanie", "Lincoln", 10, 31),
("Steve", "Harden", 10, 32),
("Van", "Den", 10, 32),
("Hugo", "Merlin", 10, 32),
("George", "Kris", 11, NULL),
("Peace", "Loud", 11, NULL),
("Albert", "Fox", 12, 36),
("Susie", "Coin", 12, 36),
("Matthew", "Jony", 12, 36),
("Shane", "Cutthroat", 13, NULL);