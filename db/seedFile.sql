CREATE TABLE Users (
        ID INTEGER PRIMARY KEY,
        FullName VARCHAR(40),
        Email UNIQUE VARCHAR(40),
        Password VARCHAR(40),
        TermsAcceted BOOLEAN,
        );