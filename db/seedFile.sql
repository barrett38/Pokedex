CREATE TABLE Users (
        ID INTEGER PRIMARY KEY,
        FullName VARCHAR(40),
        Email UNIQUE VARCHAR(40),
        Password VARCHAR(40),
        TermsAcceted BOOLEAN,
        );
        
-- Should I create another table that 
-- contains all the 150 Pokmemon from 
-- the API to compare to the user's
-- to make sure that the User gets a new
-- Pokemon each time they log in?