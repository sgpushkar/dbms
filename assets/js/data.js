/**
 * DBMS Laboratory Practicals Complete Dataset
 * Experiments 02 through 08
 * Covers DDL, DML, DCL/TCL, Aggregate & Set Operations, String Functions, Joins, and Subqueries
 */

const EXPERIMENTS_DATA = [
  {
    id: "exp-2",
    number: "02",
    title: "Data Definition Language (DDL) Commands",
    subtitle: "Schema Creation, Table Alteration & Structure Modification",
    category: "DDL",
    badgeColor: "blue",
    student: {
      name: "Gargi Mahesh Malvi",
      rollNo: "18",
      division: "B",
      batch: "B1"
    },
    rdbms: "Oracle Database 21c Express Edition",
    aim: "To study and implement Data Definition Language (DDL) commands in Oracle Database, including CREATE TABLE to define table schemas, ALTER TABLE to modify column definitions (ADD, DROP, MODIFY), and inspect structural metadata using DESCRIBE.",
    theory: "Data Definition Language (DDL) is a subset of SQL used to define and modify the database structure and schema. DDL statements are auto-committed in Oracle, meaning changes take effect immediately and cannot be rolled back. The primary DDL commands are CREATE (builds a new table/object), ALTER (modifies existing structures such as adding, deleting, or altering column datatypes), DROP (deletes an existing table/schema), and TRUNCATE (empties a table while keeping its structure).",
    learningOutcomes: [
      "Understand table schema constraints and Oracle SQL datatypes (VARCHAR2, NCHAR, NUMBER).",
      "Gain hands-on proficiency in modifying table structures dynamically using ALTER TABLE.",
      "Understand the irreversibility of auto-committed DDL commands."
    ],
    items: [
      {
        id: "exp2-item1",
        title: "1. Create Base Table (STUDENT27)",
        type: "CREATE TABLE",
        description: "Creates the primary STUDENT27 table defining columns for Name, Email, Address, Date of Birth (DOB), and Phone Number.",
        sql: `CREATE TABLE STUDENT27 (
    NAME VARCHAR2(20),
    EMAIL VARCHAR2(30),
    ADDRESS VARCHAR2(20),
    DOB VARCHAR2(20),
    PHONE_NO VARCHAR2(20)
);`,
        outputType: "schema",
        outputData: {
          headers: ["Column", "Data Type", "Length", "Precision", "Scale", "Primary Key", "Nullable"],
          rows: [
            ["NAME", "VARCHAR2", "20", "-", "-", "No", "Yes"],
            ["EMAIL", "VARCHAR2", "30", "-", "-", "No", "Yes"],
            ["ADDRESS", "VARCHAR2", "20", "-", "-", "No", "Yes"],
            ["DOB", "VARCHAR2", "20", "-", "-", "No", "Yes"],
            ["PHONE_NO", "VARCHAR2", "20", "-", "-", "No", "Yes"]
          ]
        },
        image: "assets/images/exp2/exp2_01_create_student27.png",
        imageCaption: "Oracle XE SQL Commands - Table STUDENT27 created with 5 VARCHAR2 columns",
        status: "Table created (5 columns defined)"
      },
      {
        id: "exp2-item2",
        title: "2. Alter Table - Add Column (ROLL_NO)",
        type: "ALTER TABLE ADD",
        description: "Alters table STUDENT27 by dynamically appending a new column ROLL_NO of type VARCHAR2(20).",
        sql: `ALTER TABLE STUDENT27
ADD (ROLL_NO VARCHAR2(20));`,
        outputType: "schema",
        outputData: {
          headers: ["Column", "Data Type", "Length", "Precision", "Scale", "Primary Key", "Nullable"],
          rows: [
            ["NAME", "VARCHAR2", "20", "-", "-", "No", "Yes"],
            ["EMAIL", "VARCHAR2", "30", "-", "-", "No", "Yes"],
            ["ADDRESS", "VARCHAR2", "20", "-", "-", "No", "Yes"],
            ["DOB", "VARCHAR2", "20", "-", "-", "No", "Yes"],
            ["PHONE_NO", "VARCHAR2", "20", "-", "-", "No", "Yes"],
            ["ROLL_NO", "VARCHAR2", "20", "-", "-", "No", "Yes"]
          ]
        },
        image: "assets/images/exp2/exp2_02_alter_add_rollno.jpeg",
        imageCaption: "Table STUDENT27 schema altered: ROLL_NO appended as 6th attribute",
        status: "Table altered (Column ROLL_NO added)"
      },
      {
        id: "exp2-item3",
        title: "3. Alter Table - Drop Column (ROLL_NO)",
        type: "ALTER TABLE DROP",
        description: "Removes the newly created ROLL_NO column from STUDENT27 using the DROP COLUMN clause.",
        sql: `ALTER TABLE STUDENT27
DROP COLUMN ROLL_NO;`,
        outputType: "schema",
        outputData: {
          headers: ["Column", "Data Type", "Length", "Precision", "Scale", "Primary Key", "Nullable"],
          rows: [
            ["NAME", "VARCHAR2", "20", "-", "-", "No", "Yes"],
            ["EMAIL", "VARCHAR2", "30", "-", "-", "No", "Yes"],
            ["ADDRESS", "VARCHAR2", "20", "-", "-", "No", "Yes"],
            ["DOB", "VARCHAR2", "20", "-", "-", "No", "Yes"],
            ["PHONE_NO", "VARCHAR2", "20", "-", "-", "No", "Yes"]
          ]
        },
        image: "assets/images/exp2/exp2_03_alter_drop_rollno.jpeg",
        imageCaption: "Table STUDENT27 structure updated: ROLL_NO removed successfully (5 columns remain)",
        status: "Table altered (Column ROLL_NO dropped)"
      },
      {
        id: "exp2-item4",
        title: "4. Alter Table - Modify Column Datatype (DOB)",
        type: "ALTER TABLE MODIFY",
        description: "Modifies the datatype of attribute DOB from VARCHAR2 to NCHAR(30) on table STUDENT26.",
        sql: `ALTER TABLE STUDENT26
MODIFY (DOB NCHAR(30));`,
        outputType: "schema",
        outputData: {
          headers: ["Column", "Data Type", "Length", "Precision", "Scale", "Primary Key", "Nullable"],
          rows: [
            ["NAME", "VARCHAR2", "20", "-", "-", "No", "Yes"],
            ["EMAIL", "VARCHAR2", "30", "-", "-", "No", "Yes"],
            ["ADDRESS", "VARCHAR2", "20", "-", "-", "No", "Yes"],
            ["DOB", "NCHAR", "30", "-", "-", "No", "Yes"],
            ["PHONE_NO", "VARCHAR2", "20", "-", "-", "No", "Yes"],
            ["ROLL_NO", "VARCHAR2", "20", "-", "-", "No", "Yes"]
          ]
        },
        image: "assets/images/exp2/exp2_04_alter_modify_dob.png",
        imageCaption: "Table STUDENT26 column DOB modified to NCHAR(30)",
        status: "Table altered (Column DOB datatype modified)"
      },
      {
        id: "exp2-item5",
        title: "5. Create Table REGISTRATION26",
        type: "CREATE TABLE",
        description: "Creates registration log table containing student Name, Registration ID, Date, and Fee.",
        sql: `CREATE TABLE REGISTRATION26 (
    NAME VARCHAR2(20),
    REG_ID VARCHAR2(30),
    REG_DATE VARCHAR2(20),
    REG_FEE VARCHAR2(20)
);

-- Describe table structure
DESC REGISTRATION26;`,
        outputType: "schema",
        outputData: {
          headers: ["Column", "Data Type", "Length", "Precision", "Scale", "Primary Key", "Nullable"],
          rows: [
            ["NAME", "VARCHAR2", "20", "-", "-", "No", "Yes"],
            ["REG_ID", "VARCHAR2", "30", "-", "-", "No", "Yes"],
            ["REG_DATE", "VARCHAR2", "20", "-", "-", "No", "Yes"],
            ["REG_FEE", "VARCHAR2", "20", "-", "-", "No", "Yes"]
          ]
        },
        image: "assets/images/exp2/exp2_05_create_registration26.png",
        imageCaption: "Describe output of REGISTRATION26 showing 4 attributes in Oracle XE",
        status: "Table REGISTRATION26 created"
      },
      {
        id: "exp2-item6",
        title: "6. Create Table FACULTY26",
        type: "CREATE TABLE",
        description: "Creates faculty management table holding Faculty Name, ID, Phone Number, Salary, and Subject.",
        sql: `CREATE TABLE FACULTY26 (
    NAME VARCHAR2(20),
    ID VARCHAR2(30),
    PHONE_NO VARCHAR2(20),
    SALARY VARCHAR2(20),
    SUBJECT VARCHAR2(20)
);

-- Describe table structure
DESC FACULTY26;`,
        outputType: "schema",
        outputData: {
          headers: ["Column", "Data Type", "Length", "Precision", "Scale", "Primary Key", "Nullable"],
          rows: [
            ["NAME", "VARCHAR2", "20", "-", "-", "No", "Yes"],
            ["ID", "VARCHAR2", "30", "-", "-", "No", "Yes"],
            ["PHONE_NO", "VARCHAR2", "20", "-", "-", "No", "Yes"],
            ["SALARY", "VARCHAR2", "20", "-", "-", "No", "Yes"],
            ["SUBJECT", "VARCHAR2", "20", "-", "-", "No", "Yes"]
          ]
        },
        image: "assets/images/exp2/exp2_06_create_faculty26.png",
        imageCaption: "Describe output of FACULTY26 table with 5 attributes",
        status: "Table FACULTY26 created"
      },
      {
        id: "exp2-item7",
        title: "7. Create Table COLLEGE2",
        type: "CREATE TABLE",
        description: "Creates college reference table with College Name, Email, and Location.",
        sql: `CREATE TABLE COLLEGE2 (
    NAME VARCHAR2(20),
    EMAIL VARCHAR2(30),
    LOCATION VARCHAR2(20)
);

-- Describe table structure
DESC COLLEGE2;`,
        outputType: "schema",
        outputData: {
          headers: ["Column", "Data Type", "Length", "Precision", "Scale", "Primary Key", "Nullable"],
          rows: [
            ["NAME", "VARCHAR2", "20", "-", "-", "No", "Yes"],
            ["EMAIL", "VARCHAR2", "30", "-", "-", "No", "Yes"],
            ["LOCATION", "VARCHAR2", "20", "-", "-", "No", "Yes"]
          ]
        },
        image: "assets/images/exp2/exp2_07_create_college2.png",
        imageCaption: "Describe output of COLLEGE2 in Oracle SQL Commands",
        status: "Table COLLEGE2 created"
      }
    ]
  },
  {
    id: "exp-3",
    number: "03",
    title: "Data Manipulation Language (DML) Commands",
    subtitle: "Record Insertion, Conditional Deletion & Data Updating",
    category: "DML",
    badgeColor: "emerald",
    student: {
      name: "Pranali Rajesh Karande",
      rollNo: "06",
      division: "B",
      batch: "B1"
    },
    rdbms: "Oracle Database Express Edition",
    aim: "To demonstrate Data Manipulation Language (DML) operations in Oracle Database: inserting tuples with INSERT INTO, modifying existing column values with UPDATE, and removing specific records conditionally using DELETE FROM.",
    theory: "Data Manipulation Language (DML) commands handle the retrieval, insertion, modification, and deletion of table records. Unlike DDL commands, DML commands are not auto-committed in standard SQL and require explicit transaction control (COMMIT / ROLLBACK). Key commands include INSERT INTO (populates rows), UPDATE ... SET ... WHERE (modifies attribute values for matching rows), and DELETE FROM ... WHERE (removes matching rows).",
    learningOutcomes: [
      "Master tuple insertion syntax into multi-attribute relational tables.",
      "Safely target and filter records using WHERE clauses to prevent accidental bulk modifications.",
      "Observe relational table state transitions following INSERT, DELETE, and UPDATE commands."
    ],
    items: [
      {
        id: "exp3-item1",
        title: "1. Bulk Insert Records into student2",
        type: "INSERT INTO",
        description: "Populates student2 with 8 initial student tuples (gargi, pranali, riya, mansi, nishita, aarya, hary, monu) followed by verification using SELECT.",
        sql: `INSERT INTO student2(name, email, phone_no, dob) VALUES ('gargi', 12, 12345, 17);
INSERT INTO student2(name, email, phone_no, dob) VALUES ('pranali', 'pranali.com', 15678, 15/05);
INSERT INTO student2(name, email, phone_no, dob) VALUES ('riya', 'riya.com', 16583, 12/03);
INSERT INTO student2(name, email, phone_no, dob) VALUES ('mansi', 'mansi.com', 46789, 10/04);
INSERT INTO student2(name, email, phone_no, dob) VALUES ('nishita', 'nishita.com', 14237, 11/04);
INSERT INTO student2(name, email, phone_no, dob) VALUES ('aarya', 'aarya.com', 345, 10/08);
INSERT INTO student2(name, email, phone_no, dob) VALUES ('hary', 'hary.com', 9865, 34/05);
INSERT INTO student2(name, email, phone_no, dob) VALUES ('monu', 'monu.com', 7895, 04/1);

SELECT * FROM student2;`,
        outputType: "table",
        outputData: {
          headers: ["NAME", "EMAIL", "ADDRESS", "PHONE_NO", "DOB"],
          rows: [
            ["gargi", "12", "-", "12345", "17"],
            ["pranali", "pranali.com", "-", "15678", "3"],
            ["riya", "riya.com", "-", "16583", "4"],
            ["mansi", "mansi.com", "-", "46789", "2.5"],
            ["nishita", "nishita.com", "-", "14237", "2.75"],
            ["aarya", "aarya.com", "-", "345", "1.25"],
            ["hary", "hary.com", "-", "9865", "6.8"],
            ["monu", "monu.com", "-", "7895", "4"]
          ]
        },
        image: "assets/images/exp3/exp3_01_insert_all_records.jpg",
        imageCaption: "Query output showing 8 rows returned after bulk INSERT",
        status: "8 rows returned in 0.00 seconds"
      },
      {
        id: "exp3-item2",
        title: "2. Delete Specific Record (riya)",
        type: "DELETE FROM",
        description: "Executes conditional record removal to delete student 'riya' from the table.",
        sql: `DELETE FROM student2
WHERE name = 'riya';

SELECT * FROM student2;`,
        outputType: "table",
        outputData: {
          headers: ["NAME", "EMAIL", "ADDRESS", "PHONE_NO", "DOB"],
          rows: [
            ["gargi", "12", "-", "12345", "17"],
            ["pranali", "pranali.com", "-", "15678", "3"],
            ["mansi", "mansi.com", "-", "46789", "2.5"],
            ["nishita", "nishita.com", "-", "14237", "2.75"],
            ["aarya", "aarya.com", "-", "345", "1.25"],
            ["hary", "hary.com", "-", "9865", "6.8"],
            ["monu", "monu.com", "-", "7895", "4"]
          ]
        },
        image: "assets/images/exp3/exp3_02_delete_riya.jpg",
        imageCaption: "Verification output showing 7 rows returned (riya deleted)",
        status: "1 row deleted, 7 rows returned in 0.00 seconds"
      },
      {
        id: "exp3-item3",
        title: "3. Update Record Email for gargi",
        type: "UPDATE",
        description: "Modifies the EMAIL column value for student 'gargi' from '12' to 'gargi.com'.",
        sql: `UPDATE student2
SET EMAIL = 'gargi.com'
WHERE NAME = 'gargi';

SELECT * FROM student2;`,
        outputType: "table",
        outputData: {
          headers: ["NAME", "EMAIL", "ADDRESS", "PHONE_NO", "DOB"],
          rows: [
            ["gargi", "gargi.com", "-", "12345", "17"],
            ["pranali", "pranali.com", "-", "15678", "3"],
            ["mansi", "mansi.com", "-", "46789", "2.5"],
            ["nishita", "nishita.com", "-", "14237", "2.75"],
            ["aarya", "aarya.com", "-", "345", "1.25"],
            ["hary", "hary.com", "-", "9865", "6.8"],
            ["monu", "monu.com", "-", "7895", "4"]
          ]
        },
        image: "assets/images/exp3/exp3_03_update_gargi_email.jpeg",
        imageCaption: "Verification output showing EMAIL updated to gargi.com for student gargi",
        status: "1 row updated, 7 rows returned in 0.00 seconds"
      }
    ]
  },
  {
    id: "exp-4",
    number: "04",
    title: "Data Control & Transaction Control Languages",
    subtitle: "DCL (CREATE USER, GRANT, REVOKE) & TCL (COMMIT, ROLLBACK)",
    category: "DCL & TCL",
    badgeColor: "purple",
    student: {
      name: "Gargi Mahesh Malvi",
      rollNo: "18",
      division: "B",
      batch: "B1"
    },
    rdbms: "Oracle Database Express Edition",
    aim: "To demonstrate database administration, authorization security, and transaction reliability using Data Control Language (DCL) commands: CREATE USER, GRANT, REVOKE, and Transaction Control Language (TCL) commands: COMMIT and ROLLBACK.",
    theory: "Data Control Language (DCL) commands control user privileges and database access permissions. Key DCL commands are GRANT (provides access rights such as SELECT, INSERT, ALL) and REVOKE (withdraws permissions previously granted). Transaction Control Language (TCL) commands manage database transactions to uphold ACID properties (Atomicity, Consistency, Isolation, Durability). Key commands are COMMIT (permanently saves changes made in the current transaction) and ROLLBACK (undoes uncommitted changes).",
    learningOutcomes: [
      "Create isolated user accounts with password authentication in Oracle XE.",
      "Implement the principle of least privilege using granular GRANT and REVOKE commands.",
      "Understand transaction demarcation and rollback mechanics."
    ],
    items: [
      {
        id: "exp4-item1",
        title: "1. Create New Database User (JOY)",
        type: "CREATE USER",
        description: "Creates user account JOY identified with password 'a1234' for role-based authorization.",
        sql: `CREATE USER JOY IDENTIFIED BY a1234;`,
        outputType: "message",
        outputData: {
          message: "User created."
        },
        image: "assets/images/exp4/exp4_01_create_user_joy.png",
        imageCaption: "Oracle XE: User JOY successfully created with password authentication",
        status: "Statement processed. 0.00 seconds"
      },
      {
        id: "exp4-item2",
        title: "2. Grant SELECT Privilege to JOY",
        type: "GRANT SELECT",
        description: "Grants read-only (SELECT) permission on table STUDENT27 to user JOY.",
        sql: `GRANT SELECT ON STUDENT27 TO JOY;`,
        outputType: "message",
        outputData: {
          message: "Grant succeeded."
        },
        image: "assets/images/exp4/exp4_02_grant_select.png",
        imageCaption: "Oracle XE: Read privilege on STUDENT27 granted to JOY",
        status: "Statement processed. 0.02 seconds"
      },
      {
        id: "exp4-item3",
        title: "3. Grant Multi-Action Privileges (SELECT, INSERT)",
        type: "GRANT SELECT, INSERT",
        description: "Grants dual permissions (read and insert) on STUDENT27 to user JOY in a single command.",
        sql: `GRANT SELECT, INSERT ON STUDENT27 TO JOY;`,
        outputType: "message",
        outputData: {
          message: "Grant succeeded."
        },
        image: "assets/images/exp4/exp4_03_grant_select_insert.png",
        imageCaption: "Oracle XE: SELECT and INSERT privileges granted to JOY",
        status: "Statement processed. 0.00 seconds"
      },
      {
        id: "exp4-item4",
        title: "4. Grant ALL Privileges to JOY",
        type: "GRANT ALL",
        description: "Bestows complete object permissions (SELECT, INSERT, UPDATE, DELETE, ALTER) on table STUDENT27 to JOY.",
        sql: `GRANT ALL ON STUDENT27 TO JOY;`,
        outputType: "message",
        outputData: {
          message: "Grant succeeded."
        },
        image: "assets/images/exp4/exp4_04_grant_all.png",
        imageCaption: "Oracle XE: Full object access (ALL) on STUDENT27 granted to JOY",
        status: "Statement processed. 0.01 seconds"
      },
      {
        id: "exp4-item5",
        title: "5. Revoke SELECT Privilege from JOY",
        type: "REVOKE SELECT",
        description: "Withdraws SELECT query permission on table STUDENT27 from user JOY.",
        sql: `REVOKE SELECT ON STUDENT27 FROM JOY;`,
        outputType: "message",
        outputData: {
          message: "Revoke succeeded."
        },
        image: "assets/images/exp4/exp4_05_revoke_select.png",
        imageCaption: "Oracle XE: SELECT privilege successfully revoked from JOY",
        status: "Statement processed. 0.02 seconds"
      },
      {
        id: "exp4-item6",
        title: "6. Transaction COMMIT",
        type: "COMMIT",
        description: "Executes COMMIT to write and permanently save all pending DML transaction changes to disk.",
        sql: `COMMIT;`,
        outputType: "message",
        outputData: {
          message: "Commit complete."
        },
        image: "assets/images/exp4/exp4_06_commit.png",
        imageCaption: "Oracle XE: Transaction state permanently committed",
        status: "Statement processed. 0.03 seconds"
      },
      {
        id: "exp4-item7",
        title: "7. Transaction ROLLBACK",
        type: "ROLLBACK",
        description: "Executes ROLLBACK to discard uncommitted DML transactions and restore the database to the prior savepoint/commit state.",
        sql: `ROLLBACK;`,
        outputType: "message",
        outputData: {
          message: "Rollback complete."
        },
        image: "assets/images/exp4/exp4_07_rollback.png",
        imageCaption: "Oracle XE: Uncommitted transaction changes rolled back",
        status: "Statement processed. 0.02 seconds"
      }
    ]
  },
  {
    id: "exp-5",
    number: "05",
    title: "Aggregate Functions, Set Operations, GROUP BY & HAVING",
    subtitle: "Built-in Statistical Aggregation, Relational Set Theory & Grouping",
    category: "Aggregation & Sets",
    badgeColor: "amber",
    student: {
      name: "DBMS Lab Class (Div B)",
      rollNo: "Batch B1",
      division: "B",
      batch: "B1"
    },
    rdbms: "Oracle Database Express Edition",
    aim: "To implement SQL Built-in Aggregate Functions (MIN, MAX, AVG, SUM, COUNT), Relational Set Operations (UNION, UNION ALL, INTERSECT, MINUS), and categorized aggregations using GROUP BY with conditional group filtering via HAVING.",
    theory: "SQL aggregate functions perform a calculation on a set of values and return a single summary value. The GROUP BY clause divides query results into subset groups based on identical column values, while the HAVING clause filters groups produced by GROUP BY (whereas WHERE filters individual rows prior to grouping). SQL Set Operations combine tuples from multiple SELECT statements with union compatibility (identical column count and compatible types).",
    learningOutcomes: [
      "Differentiate between scalar single-row functions and multi-row aggregate functions.",
      "Understand the difference between UNION (removes duplicate tuples) and UNION ALL (retains all tuples).",
      "Correctly construct queries combining WHERE row filtering, GROUP BY aggregation, and HAVING group filtering."
    ],
    fullPages: [
      { page: 1, image: "assets/images/exp5/exp5_page_1.png", title: "Page 1: Aggregate Functions (MIN, MAX, AVG)" },
      { page: 2, image: "assets/images/exp5/exp5_page_2.png", title: "Page 2: SUM, COUNT & String Conversion (LOWER)" },
      { page: 3, image: "assets/images/exp5/exp5_page_3.png", title: "Page 3: UPPER & Set Operations (UNION)" },
      { page: 4, image: "assets/images/exp5/exp5_page_4.png", title: "Page 4: UNION ALL, INTERSECT & MINUS" },
      { page: 5, image: "assets/images/exp5/exp5_page_5.png", title: "Page 5: GROUP BY (COUNT, AVG, SUM)" },
      { page: 6, image: "assets/images/exp5/exp5_page_6.png", title: "Page 6: MAX/MIN per Group & HAVING Clause" },
      { page: 7, image: "assets/images/exp5/exp5_page_7.png", title: "Page 7: Complex HAVING & Combined WHERE-GROUP-HAVING" }
    ],
    items: [
      {
        id: "exp5-item1",
        title: "1. Minimum Salary - MIN()",
        type: "AGGREGATE",
        description: "Returns the lowest salary value recorded in the Employee relation.",
        sql: `SELECT MIN(salary) FROM Employee;`,
        outputType: "table",
        outputData: {
          headers: ["MIN(SALARY)"],
          rows: [["20000"]]
        },
        image: "assets/images/exp5/p1_img1.png",
        imageCaption: "MIN(salary) output: 20000",
        status: "1 row returned in 0.00 seconds"
      },
      {
        id: "exp5-item2",
        title: "2. Maximum Salary - MAX()",
        type: "AGGREGATE",
        description: "Calculates the highest salary value from the Employee table.",
        sql: `SELECT MAX(salary) FROM Employee;`,
        outputType: "table",
        outputData: {
          headers: ["MAX(SALARY)"],
          rows: [["40000"]]
        },
        image: "assets/images/exp5/p1_img2.png",
        imageCaption: "MAX(salary) output: 40000",
        status: "1 row returned in 0.00 seconds"
      },
      {
        id: "exp5-item3",
        title: "3. Average Salary - AVG()",
        type: "AGGREGATE",
        description: "Computes the arithmetic mean of all employee salaries.",
        sql: `SELECT AVG(salary) FROM Employee;`,
        outputType: "table",
        outputData: {
          headers: ["AVG(SALARY)"],
          rows: [["28400"]]
        },
        image: "assets/images/exp5/p1_img3.png",
        imageCaption: "AVG(salary) output: 28400",
        status: "1 row returned in 0.00 seconds"
      },
      {
        id: "exp5-item4",
        title: "4. Total Salary Expenditure - SUM()",
        type: "AGGREGATE",
        description: "Sums all salary values across all employee rows.",
        sql: `SELECT SUM(salary) FROM Employee;`,
        outputType: "table",
        outputData: {
          headers: ["SUM(SALARY)"],
          rows: [["142000"]]
        },
        image: "assets/images/exp5/p2_img1.png",
        imageCaption: "SUM(salary) output: 142000",
        status: "1 row returned in 0.00 seconds"
      },
      {
        id: "exp5-item5",
        title: "5. Total Employee Count - COUNT(*)",
        type: "AGGREGATE",
        description: "Counts total number of rows present in the Employee relation.",
        sql: `SELECT COUNT(*) FROM Employee;`,
        outputType: "table",
        outputData: {
          headers: ["COUNT(*)"],
          rows: [["5"]]
        },
        image: "assets/images/exp5/p2_img2.png",
        imageCaption: "COUNT(*) output: 5 records",
        status: "1 row returned in 0.00 seconds"
      },
      {
        id: "exp5-item6",
        title: "6. Lowercase Conversion - LOWER()",
        type: "SCALAR FUNCTION",
        description: "Converts employee names to lowercase text.",
        sql: `SELECT LOWER(EMPNAME) FROM Employee;`,
        outputType: "table",
        outputData: {
          headers: ["LOWER(EMPNAME)"],
          rows: [["rahul"], ["priya"], ["sneha"], ["karan"], ["amit"]]
        },
        image: "assets/images/exp5/p2_img3.png",
        imageCaption: "LOWER(EMPNAME) returns all names in lowercase format",
        status: "5 rows returned in 0.01 seconds"
      },
      {
        id: "exp5-item7",
        title: "7. Uppercase Conversion - UPPER()",
        type: "SCALAR FUNCTION",
        description: "Converts employee names to uppercase text.",
        sql: `SELECT UPPER(EMPNAME) FROM Employee;`,
        outputType: "table",
        outputData: {
          headers: ["UPPER(EMPNAME)"],
          rows: [["RAHUL"], ["PRIYA"], ["SNEHA"], ["KARAN"], ["AMIT"]]
        },
        image: "assets/images/exp5/p3_img1.png",
        imageCaption: "UPPER(EMPNAME) returns all names capitalized",
        status: "5 rows returned in 0.00 seconds"
      },
      {
        id: "exp5-item8",
        title: "8. Set Operation: UNION",
        type: "SET OPERATION",
        description: "Combines records from Employee1 and Employee2 relations, eliminating duplicate tuples.",
        sql: `SELECT EMPID, EMPNAME FROM Employee1
UNION
SELECT EMPID, EMPNAME FROM Employee2;`,
        outputType: "table",
        outputData: {
          headers: ["EMPID", "EMPNAME"],
          rows: [
            ["101", "Rahul"],
            ["102", "Priya"],
            ["103", "Sneha"],
            ["104", "Karan"],
            ["105", "Amit"]
          ]
        },
        image: "assets/images/exp5/p3_img2.png",
        imageCaption: "UNION output returning 5 distinct rows (duplicates omitted)",
        status: "5 rows returned in 0.00 seconds"
      },
      {
        id: "exp5-item9",
        title: "9. Set Operation: UNION ALL",
        type: "SET OPERATION",
        description: "Combines records from Employee1 and Employee2 retaining all duplicates.",
        sql: `SELECT EMPID, EMPNAME FROM Employee1
UNION ALL
SELECT EMPID, EMPNAME FROM Employee2;`,
        outputType: "table",
        outputData: {
          headers: ["EMPID", "EMPNAME"],
          rows: [
            ["101", "Rahul"],
            ["102", "Priya"],
            ["103", "Sneha"],
            ["104", "Karan"],
            ["101", "Rahul"],
            ["102", "Priya"],
            ["105", "Amit"]
          ]
        },
        image: "assets/images/exp5/p4_img1.png",
        imageCaption: "UNION ALL output returning 7 rows (duplicate records preserved)",
        status: "7 rows returned in 0.00 seconds"
      },
      {
        id: "exp5-item10",
        title: "10. Set Operation: INTERSECT",
        type: "SET OPERATION",
        description: "Returns only tuples that appear in both Employee1 and Employee2.",
        sql: `SELECT EMPID, EMPNAME FROM Employee1
INTERSECT
SELECT EMPID, EMPNAME FROM Employee2;`,
        outputType: "table",
        outputData: {
          headers: ["EMPID", "EMPNAME"],
          rows: [
            ["101", "Rahul"],
            ["102", "Priya"]
          ]
        },
        image: "assets/images/exp5/p4_img2.png",
        imageCaption: "INTERSECT output showing intersecting common employees",
        status: "Common rows returned in 0.00 seconds"
      },
      {
        id: "exp5-item11",
        title: "11. Set Operation: MINUS",
        type: "SET OPERATION",
        description: "Returns tuples belonging to Employee1 that do not exist in Employee2.",
        sql: `SELECT EMPID, EMPNAME FROM Employee1
MINUS
SELECT EMPID, EMPNAME FROM Employee2;`,
        outputType: "table",
        outputData: {
          headers: ["EMPID", "EMPNAME"],
          rows: [
            ["103", "Sneha"],
            ["104", "Karan"]
          ]
        },
        image: "assets/images/exp5/p4_img3.png",
        imageCaption: "MINUS output showing distinct tuples in Employee1 not in Employee2",
        status: "2 rows returned in 0.00 seconds"
      },
      {
        id: "exp5-item12",
        title: "12. GROUP BY: Headcount per Department",
        type: "GROUP BY",
        description: "Groups employee records by department and calculates the total employee count per group.",
        sql: `SELECT Department, COUNT(*) AS TOTAL_EMPLOYEES
FROM Employee
GROUP BY Department;`,
        outputType: "table",
        outputData: {
          headers: ["DEPARTMENT", "TOTAL_EMPLOYEES"],
          rows: [
            ["HR", "3"],
            ["IT", "2"],
            ["Sales", "2"]
          ]
        },
        image: "assets/images/exp5/p5_img1.png",
        imageCaption: "GROUP BY Department with COUNT(*) aggregate",
        status: "3 rows returned in 0.00 seconds"
      },
      {
        id: "exp5-item13",
        title: "13. GROUP BY: Average Salary per Department",
        type: "GROUP BY",
        description: "Calculates the average salary across each departmental group.",
        sql: `SELECT Department, AVG(Salary) AS AVG_SALARY
FROM Employee
GROUP BY Department;`,
        outputType: "table",
        outputData: {
          headers: ["DEPARTMENT", "AVG_SALARY"],
          rows: [
            ["HR", "25000"],
            ["IT", "28500"],
            ["Sales", "36000"]
          ]
        },
        image: "assets/images/exp5/p5_img2.png",
        imageCaption: "Department-wise average salary calculations",
        status: "3 rows returned in 0.00 seconds"
      },
      {
        id: "exp5-item14",
        title: "14. GROUP BY: Total Salary per Department",
        type: "GROUP BY",
        description: "Computes total departmental payroll cost using SUM(Salary).",
        sql: `SELECT Department, SUM(Salary) AS TOTAL_SALARY
FROM Employee
GROUP BY Department;`,
        outputType: "table",
        outputData: {
          headers: ["DEPARTMENT", "TOTAL_SALARY"],
          rows: [
            ["HR", "75000"],
            ["IT", "57000"],
            ["Sales", "72000"]
          ]
        },
        image: "assets/images/exp5/p5_img3.png",
        imageCaption: "Department-wise payroll sum results",
        status: "3 rows returned in 0.00 seconds"
      },
      {
        id: "exp5-item15",
        title: "15. GROUP BY: Department Salary Range (MAX & MIN)",
        type: "GROUP BY",
        description: "Determines the highest and lowest salary paid inside each department.",
        sql: `SELECT Department, MAX(Salary) AS MAX_SALARY, MIN(Salary) AS MIN_SALARY
FROM Employee
GROUP BY Department;`,
        outputType: "table",
        outputData: {
          headers: ["DEPARTMENT", "MAX_SALARY", "MIN_SALARY"],
          rows: [
            ["HR", "28000", "22000"],
            ["IT", "30000", "27000"],
            ["Sales", "40000", "32000"]
          ]
        },
        image: "assets/images/exp5/p6_img1.png",
        imageCaption: "Max and Min salaries per department",
        status: "3 rows returned in 0.00 seconds"
      },
      {
        id: "exp5-item16",
        title: "16. HAVING: Filter Groups by Headcount (> 2)",
        type: "HAVING",
        description: "Filters grouped departments to retain only those with more than 2 employees.",
        sql: `SELECT Department, COUNT(*) AS TOTAL_EMPLOYEES
FROM Employee
GROUP BY Department
HAVING COUNT(*) > 2;`,
        outputType: "table",
        outputData: {
          headers: ["DEPARTMENT", "TOTAL_EMPLOYEES"],
          rows: [
            ["HR", "3"]
          ]
        },
        image: "assets/images/exp5/p6_img2.png",
        imageCaption: "HAVING COUNT(*) > 2 filters out IT and Sales, retaining only HR",
        status: "1 row returned in 0.02 seconds"
      },
      {
        id: "exp5-item17",
        title: "17. HAVING: Filter Groups by Average Salary (> 27000)",
        type: "HAVING",
        description: "Returns departments having an average salary strictly greater than 27,000.",
        sql: `SELECT Department, AVG(Salary) AS AVG_SALARY
FROM Employee
GROUP BY Department
HAVING AVG(Salary) > 27000;`,
        outputType: "table",
        outputData: {
          headers: ["DEPARTMENT", "AVG_SALARY"],
          rows: [
            ["IT", "28500"],
            ["Sales", "36000"]
          ]
        },
        image: "assets/images/exp5/p6_img3.png",
        imageCaption: "HAVING AVG(Salary) > 27000 filters out HR (25000), leaving IT and Sales",
        status: "2 rows returned in 0.00 seconds"
      },
      {
        id: "exp5-item18",
        title: "18. HAVING: Filter Groups by Total Payroll (> 50000)",
        type: "HAVING",
        description: "Selects departments whose aggregate salary budget exceeds 50,000.",
        sql: `SELECT Department, SUM(Salary) AS TOTAL_SALARY
FROM Employee
GROUP BY Department
HAVING SUM(Salary) > 50000;`,
        outputType: "table",
        outputData: {
          headers: ["DEPARTMENT", "TOTAL_SALARY"],
          rows: [
            ["HR", "75000"],
            ["IT", "57000"],
            ["Sales", "72000"]
          ]
        },
        image: "assets/images/exp5/p7_img1.png",
        imageCaption: "All 3 departments exceed 50,000 total payroll expenditure",
        status: "3 rows returned in 0.01 seconds"
      },
      {
        id: "exp5-item19",
        title: "19. Combined WHERE, GROUP BY & HAVING",
        type: "COMPLEX QUERY",
        description: "Demonstrates query pipeline: filters employees with salary > 20000 (WHERE), groups by Department, then filters departments whose average salary > 25000 (HAVING).",
        sql: `SELECT Department, AVG(Salary) AS AVG_SALARY
FROM Employee
WHERE salary > 20000
GROUP BY Department
HAVING AVG(Salary) > 25000;`,
        outputType: "table",
        outputData: {
          headers: ["DEPARTMENT", "AVG_SALARY"],
          rows: [
            ["IT", "28500"],
            ["Sales", "36000"]
          ]
        },
        image: "assets/images/exp5/p7_img2.png",
        imageCaption: "Combined WHERE pre-filter and HAVING group-filter execution output",
        status: "2 rows returned in 0.02 seconds"
      }
    ]
  },
  {
    id: "exp-6",
    number: "06",
    title: "Built-in SQL String Functions & Dual Table",
    subtitle: "Scalar String Manipulation via Oracle's DUAL System Table",
    category: "String Functions",
    badgeColor: "cyan",
    student: {
      name: "DBMS Lab Class (Div B)",
      rollNo: "Batch B1",
      division: "B",
      batch: "B1"
    },
    rdbms: "Oracle Database Express Edition",
    aim: "To demonstrate Oracle SQL built-in character and string manipulation functions (LENGTH, CONCAT, UPPER, LOWER, REPLACE, SUBSTR, INSTR, TRIM) utilizing Oracle's DUAL single-row evaluation table.",
    theory: "Oracle provides a comprehensive library of scalar string functions. The DUAL table is a special one-row, one-column system table present in Oracle databases used for evaluating expressions, functions, pseudo-columns, and arithmetic operations that do not require querying a specific user table. Key functions include LENGTH (character count), CONCAT (joins strings), UPPER/LOWER (case normalization), REPLACE (substitutes substrings), SUBSTR (extracts substring segments), INSTR (finds character index positions), and TRIM (strips leading/trailing whitespace).",
    learningOutcomes: [
      "Understand the operational purpose and mechanics of Oracle's DUAL system table.",
      "Extract substrings using both positive (left-to-right) and negative (right-to-left) indices with SUBSTR.",
      "Cleanse input strings and search substring patterns with TRIM and INSTR."
    ],
    items: [
      {
        id: "exp6-item1",
        title: "1. String Length - LENGTH()",
        type: "LENGTH",
        description: "Returns character count of string 'Hello'.",
        sql: `SELECT LENGTH('Hello') AS STRINGLENGTH
FROM dual;`,
        outputType: "table",
        outputData: {
          headers: ["STRINGLENGTH"],
          rows: [["5"]]
        },
        image: "assets/images/exp6/exp6_01_length.png",
        imageCaption: "LENGTH('Hello') returns 5",
        status: "1 row returned in 0.01 seconds"
      },
      {
        id: "exp6-item2",
        title: "2. String Concatenation - CONCAT()",
        type: "CONCAT",
        description: "Combines 'John' and 'Doe' with a separating whitespace using nested CONCAT functions.",
        sql: `SELECT CONCAT(CONCAT('John', ' '), 'Doe') AS FULLNAME
FROM dual;`,
        outputType: "table",
        outputData: {
          headers: ["FULLNAME"],
          rows: [["John Doe"]]
        },
        image: "assets/images/exp6/exp6_02_concat.png",
        imageCaption: "CONCAT output: 'John Doe'",
        status: "1 row returned in 0.00 seconds"
      },
      {
        id: "exp6-item3",
        title: "3. Uppercase Transformation - UPPER()",
        type: "UPPER",
        description: "Converts literal 'hello' to uppercase.",
        sql: `SELECT UPPER('hello') AS UPPERCASE
FROM dual;`,
        outputType: "table",
        outputData: {
          headers: ["UPPERCASE"],
          rows: [["HELLO"]]
        },
        image: "assets/images/exp6/exp6_03_upper.png",
        imageCaption: "UPPER('hello') output: 'HELLO'",
        status: "1 row returned in 0.00 seconds"
      },
      {
        id: "exp6-item4",
        title: "4. Lowercase Transformation - LOWER()",
        type: "LOWER",
        description: "Converts literal 'HELLO' to lowercase.",
        sql: `SELECT LOWER('HELLO') AS LOWERCASE
FROM dual;`,
        outputType: "table",
        outputData: {
          headers: ["LOWERCASE"],
          rows: [["hello"]]
        },
        image: "assets/images/exp6/exp6_04_lower.png",
        imageCaption: "LOWER('HELLO') output: 'hello'",
        status: "1 row returned in 0.00 seconds"
      },
      {
        id: "exp6-item5",
        title: "5. Substring Replacement - REPLACE()",
        type: "REPLACE",
        description: "Replaces substring 'world' with 'SQL' inside 'Hello world'.",
        sql: `SELECT REPLACE('Hello world', 'world', 'SQL') AS UPDATEDSTRING
FROM dual;`,
        outputType: "table",
        outputData: {
          headers: ["UPDATEDSTRING"],
          rows: [["Hello SQL"]]
        },
        image: "assets/images/exp6/exp6_05_replace.png",
        imageCaption: "REPLACE output: 'Hello SQL'",
        status: "1 row returned in 0.00 seconds"
      },
      {
        id: "exp6-item6",
        title: "6. Substring Extraction - SUBSTR()",
        type: "SUBSTR",
        description: "Extracts 5 characters starting at index position 1 from 'Hello world'.",
        sql: `SELECT SUBSTR('Hello world', 1, 5) AS SUBSTRINGEXAMPLE
FROM dual;`,
        outputType: "table",
        outputData: {
          headers: ["SUBSTRINGEXAMPLE"],
          rows: [["Hello"]]
        },
        image: "assets/images/exp6/exp6_06_substr.png",
        imageCaption: "SUBSTR starting at 1 with length 5 yields 'Hello'",
        status: "1 row returned in 0.00 seconds"
      },
      {
        id: "exp6-item7",
        title: "7. Left Substring Extraction",
        type: "SUBSTR (LEFT)",
        description: "Extracts initial prefix substring from index 1.",
        sql: `SELECT SUBSTR('Hello world', 1, 5) AS LEFTSTRING
FROM dual;`,
        outputType: "table",
        outputData: {
          headers: ["LEFTSTRING"],
          rows: [["Hello"]]
        },
        image: "assets/images/exp6/exp6_07_leftstr.png",
        imageCaption: "Left substring output: 'Hello'",
        status: "1 row returned in 0.00 seconds"
      },
      {
        id: "exp6-item8",
        title: "8. Right Substring with Negative Index",
        type: "SUBSTR (NEGATIVE)",
        description: "Extracts the trailing 5 characters using negative starting position -5.",
        sql: `SELECT SUBSTR('Hello world', -5) AS RIGHTSTRING
FROM dual;`,
        outputType: "table",
        outputData: {
          headers: ["RIGHTSTRING"],
          rows: [["world"]]
        },
        image: "assets/images/exp6/exp6_08_rightstr.png",
        imageCaption: "Negative index SUBSTR -5 extracts 'world'",
        status: "1 row returned in 0.00 seconds"
      },
      {
        id: "exp6-item9",
        title: "9. Pattern Index Search - INSTR()",
        type: "INSTR",
        description: "Finds the 1-based start index of substring 'World' inside 'Hello World'.",
        sql: `SELECT INSTR('Hello World', 'World') AS SUBSTRINGPOS
FROM dual;`,
        outputType: "table",
        outputData: {
          headers: ["SUBSTRINGPOS"],
          rows: [["7"]]
        },
        image: "assets/images/exp6/exp6_09_instr.png",
        imageCaption: "INSTR finds 'World' starting at index 7",
        status: "1 row returned in 0.00 seconds"
      },
      {
        id: "exp6-item10",
        title: "10. Whitespace Stripping - TRIM()",
        type: "TRIM",
        description: "Strips leading and trailing padding whitespaces from ' Hello World '.",
        sql: `SELECT TRIM('   Hello World   ') AS TRIMMEDSTRING
FROM dual;`,
        outputType: "table",
        outputData: {
          headers: ["TRIMMEDSTRING"],
          rows: [["Hello World"]]
        },
        image: "assets/images/exp6/exp6_10_trim.png",
        imageCaption: "TRIM strips leading and trailing spaces yielding clean string",
        status: "1 row returned in 0.00 seconds"
      }
    ]
  },
  {
    id: "exp-7",
    number: "07",
    title: "SQL Joins & Relational Operations",
    subtitle: "INNER, LEFT, RIGHT, FULL OUTER, NATURAL & NON-EQUI JOINS",
    category: "Joins",
    badgeColor: "rose",
    student: {
      name: "DBMS Lab Class (Div B)",
      rollNo: "Batch B1",
      division: "B",
      batch: "B1"
    },
    rdbms: "Oracle Database Express Edition",
    aim: "To demonstrate relational multi-table data querying using SQL Join operators: INNER JOIN, LEFT OUTER JOIN, RIGHT OUTER JOIN, FULL OUTER JOIN, NATURAL JOIN, and NON-EQUI JOIN between students and courses relations.",
    theory: "SQL Joins combine columns from one or more tables based on a related column between them. INNER JOIN returns rows with matching values in both tables. LEFT OUTER JOIN returns all rows from the left table and matched rows from the right table (with NULLs for unmatched right rows). RIGHT OUTER JOIN returns all rows from the right table and matched rows from the left. FULL OUTER JOIN combines all rows from both tables, filling with NULL where matches do not exist. NATURAL JOIN automatically joins on columns sharing identical names.",
    learningOutcomes: [
      "Understand relational algebra join mechanics and Venn diagram intersections.",
      "Handle NULL value representations in OUTER joins effectively.",
      "Compare equi-joins against non-equi Cartesian combinations."
    ],
    fullPages: [
      { page: 1, image: "assets/images/exp7/exp7_page_1.png", title: "Page 1: Schema Definition & Table Data Population" },
      { page: 2, image: "assets/images/exp7/exp7_page_2.png", title: "Page 2: INNER JOIN, LEFT JOIN & RIGHT JOIN Executions" },
      { page: 3, image: "assets/images/exp7/exp7_page_3.png", title: "Page 3: FULL OUTER JOIN, NATURAL JOIN & NON-EQUI JOIN" }
    ],
    schemas: [
      {
        name: "courses",
        sql: `CREATE TABLE courses (
    course_id NUMBER(10) PRIMARY KEY,
    course_name VARCHAR2(40)
);

INSERT INTO courses VALUES (101, 'Data_Structures');
INSERT INTO courses VALUES (102, 'Web_Development');
INSERT INTO courses VALUES (103, 'Machine_Learning');
INSERT INTO courses VALUES (104, 'Cyber_security');`,
        records: [
          ["101", "Data_Structures"],
          ["102", "Web_Development"],
          ["103", "Machine_Learning"],
          ["104", "Cyber_security"]
        ]
      },
      {
        name: "students",
        sql: `CREATE TABLE students (
    student_id NUMBER(10) PRIMARY KEY,
    student_name VARCHAR2(40),
    course_id NUMBER(10),
    FOREIGN KEY (course_id) REFERENCES courses(course_id)
);

INSERT INTO students VALUES (1, 'Liam', 101);
INSERT INTO students VALUES (2, 'Emma', 102);
INSERT INTO students VALUES (3, 'Noah', 103);
INSERT INTO students VALUES (4, 'Olivia', NULL);`,
        records: [
          ["1", "Liam", "101"],
          ["2", "Emma", "102"],
          ["3", "Noah", "103"],
          ["4", "Olivia", "NULL"]
        ]
      }
    ],
    items: [
      {
        id: "exp7-item1",
        title: "1. INNER JOIN",
        type: "INNER JOIN",
        description: "Returns only student records that have an enrolled matching course.",
        sql: `SELECT Students.Student_Name, Courses.Course_Name
FROM Students
INNER JOIN Courses
ON Students.Course_ID = Courses.Course_ID;`,
        outputType: "table",
        outputData: {
          headers: ["STUDENT_NAME", "COURSE_NAME"],
          rows: [
            ["Liam", "Data_Structures"],
            ["Emma", "Web_Development"],
            ["Noah", "Machine_Learning"]
          ]
        },
        image: "assets/images/exp7/p2_img2.png",
        imageCaption: "INNER JOIN: 3 matching records returned (Olivia excluded)",
        status: "3 rows returned in 0.00 seconds"
      },
      {
        id: "exp7-item2",
        title: "2. LEFT OUTER JOIN",
        type: "LEFT JOIN",
        description: "Returns all student records, including Olivia who has no course enrolled (Course_Name displayed as NULL).",
        sql: `SELECT Students.Student_Name, Courses.Course_Name
FROM Students
LEFT JOIN Courses
ON Students.Course_ID = Courses.Course_ID;`,
        outputType: "table",
        outputData: {
          headers: ["STUDENT_NAME", "COURSE_NAME"],
          rows: [
            ["Liam", "Data_Structures"],
            ["Emma", "Web_Development"],
            ["Noah", "Machine_Learning"],
            ["Olivia", "NULL"]
          ]
        },
        image: "assets/images/exp7/p2_img4.png",
        imageCaption: "LEFT JOIN: 4 rows returned (Olivia preserved with NULL course)",
        status: "4 rows returned in 0.00 seconds"
      },
      {
        id: "exp7-item3",
        title: "3. RIGHT OUTER JOIN",
        type: "RIGHT JOIN",
        description: "Returns all courses from the Courses table, including Cyber_security which has no student enrolled.",
        sql: `SELECT Students.Student_Name, Courses.Course_Name
FROM Students
RIGHT JOIN Courses
ON Students.Course_ID = Courses.Course_ID;`,
        outputType: "table",
        outputData: {
          headers: ["STUDENT_NAME", "COURSE_NAME"],
          rows: [
            ["Liam", "Data_Structures"],
            ["Emma", "Web_Development"],
            ["Noah", "Machine_Learning"],
            ["NULL", "Cyber_security"]
          ]
        },
        image: "assets/images/exp7/p2_img6.png",
        imageCaption: "RIGHT JOIN: 4 rows returned (Cyber_security preserved with NULL student)",
        status: "4 rows returned in 0.00 seconds"
      },
      {
        id: "exp7-item4",
        title: "4. FULL OUTER JOIN",
        type: "FULL OUTER JOIN",
        description: "Combines records from both Students and Courses, keeping unmatched records from both tables with NULLs.",
        sql: `SELECT Students.Student_Name, Courses.Course_Name
FROM Students
FULL OUTER JOIN Courses
ON Students.Course_ID = Courses.Course_ID;`,
        outputType: "table",
        outputData: {
          headers: ["STUDENT_NAME", "COURSE_NAME"],
          rows: [
            ["Liam", "Data_Structures"],
            ["Emma", "Web_Development"],
            ["Noah", "Machine_Learning"],
            ["Olivia", "NULL"],
            ["NULL", "Cyber_security"]
          ]
        },
        image: "assets/images/exp7/p3_img2.png",
        imageCaption: "FULL OUTER JOIN: 5 rows returned (both Olivia and Cyber_security preserved)",
        status: "5 rows returned in 0.00 seconds"
      },
      {
        id: "exp7-item5",
        title: "5. NATURAL JOIN",
        type: "NATURAL JOIN",
        description: "Automatically joins Students and Courses on the shared column COURSE_ID without an explicit ON clause.",
        sql: `SELECT *
FROM Students
NATURAL JOIN Courses;`,
        outputType: "table",
        outputData: {
          headers: ["COURSE_ID", "STUDENT_ID", "STUDENT_NAME", "COURSE_NAME"],
          rows: [
            ["101", "1", "Liam", "Data_Structures"],
            ["102", "2", "Emma", "Web_Development"],
            ["103", "3", "Noah", "Machine_Learning"]
          ]
        },
        image: "assets/images/exp7/p3_img4.png",
        imageCaption: "NATURAL JOIN joins automatically on shared COURSE_ID attribute",
        status: "3 rows returned in 0.00 seconds"
      },
      {
        id: "exp7-item6",
        title: "6. NON-EQUI JOIN (Mismatched Pairings)",
        type: "NON-EQUI JOIN",
        description: "Pairs students with all courses other than the course they are enrolled in using the inequality operator (!=).",
        sql: `SELECT Students.Student_Name, Courses.Course_Name
FROM Students
INNER JOIN Courses
ON Students.Course_ID != Courses.Course_ID;`,
        outputType: "table",
        outputData: {
          headers: ["STUDENT_NAME", "COURSE_NAME"],
          rows: [
            ["Liam", "Web_Development"],
            ["Liam", "Machine_Learning"],
            ["Liam", "Cyber_security"],
            ["Emma", "Data_Structures"],
            ["Emma", "Machine_Learning"],
            ["Emma", "Cyber_security"],
            ["Noah", "Data_Structures"],
            ["Noah", "Web_Development"],
            ["Noah", "Cyber_security"]
          ]
        },
        image: "assets/images/exp7/p3_img6.png",
        imageCaption: "Non-equi join on != operator returning 9 mismatched pairings",
        status: "9 rows returned in 0.00 seconds"
      }
    ]
  },
  {
    id: "exp-8",
    number: "08",
    title: "Subqueries & Nested Queries",
    subtitle: "Single-Row, Multi-Row, Multi-Level Subqueries & DML Subqueries",
    category: "Subqueries",
    badgeColor: "indigo",
    student: {
      name: "Gargi Mahesh Malvi",
      rollNo: "20",
      division: "B",
      batch: "B1"
    },
    rdbms: "Oracle Database Express Edition",
    aim: "To design and execute nested SQL queries and subqueries: single-row subqueries using relational comparisons, multi-row subqueries with the IN operator, multi-level nested queries, table population using INSERT INTO ... SELECT, and data modification with subquery-driven UPDATE statements.",
    theory: "A Subquery (or Inner query) is a query embedded within another SQL query (Outer query). The inner query executes first, and its result is passed to the outer query. Single-row subqueries return one row and use comparison operators (=, >, <, >=, <=). Multi-row subqueries return multiple rows and use operators like IN, ANY, ALL. Subqueries can also be used inside DDL/DML statements like INSERT INTO ... SELECT and UPDATE ... SET ... WHERE.",
    learningOutcomes: [
      "Distinguish between single-row and multi-row subquery operators.",
      "Chain subqueries across foreign-key relationships without explicit JOIN syntax.",
      "Populate derivative reporting tables using subquery-driven DML operations."
    ],
    schemas: [
      {
        name: "DEPARTMENT",
        sql: `CREATE TABLE DEPARTMENT (
    DEPTNO NUMBER(2) PRIMARY KEY,
    DNAME VARCHAR2(20),
    LOCATION VARCHAR2(20)
);

INSERT INTO DEPARTMENT VALUES (10, 'HR', 'MUMBAI');
INSERT INTO DEPARTMENT VALUES (20, 'IT', 'PUNE');
INSERT INTO DEPARTMENT VALUES (30, 'SALES', 'DELHI');
INSERT INTO DEPARTMENT VALUES (40, 'FINANCE', 'NAGPUR');`,
        records: [
          ["10", "HR", "MUMBAI"],
          ["20", "IT", "PUNE"],
          ["30", "SALES", "DELHI"],
          ["40", "FINANCE", "NAGPUR"]
        ]
      },
      {
        name: "EMPLOYEE",
        sql: `CREATE TABLE EMPLOYEE (
    EMPNO NUMBER(4) PRIMARY KEY,
    ENAME VARCHAR2(20),
    JOB VARCHAR2(20),
    SALARY NUMBER(8,2),
    DEPTNO NUMBER(2),
    FOREIGN KEY (DEPTNO) REFERENCES DEPARTMENT(DEPTNO)
);

INSERT INTO EMPLOYEE VALUES (101, 'AMIT', 'MANAGER', 50000, 10);
INSERT INTO EMPLOYEE VALUES (102, 'RAHUL', 'DEVELOPER', 40000, 20);
INSERT INTO EMPLOYEE VALUES (103, 'PRIYA', 'ANALYST', 35000, 20);
INSERT INTO EMPLOYEE VALUES (104, 'NEHA', 'SALESMAN', 30000, 30);`,
        records: [
          ["101", "AMIT", "MANAGER", "50000", "10"],
          ["102", "RAHUL", "DEVELOPER", "40000", "20"],
          ["103", "PRIYA", "ANALYST", "35000", "20"],
          ["104", "NEHA", "SALESMAN", "30000", "30"]
        ]
      }
    ],
    items: [
      {
        id: "exp8-item1",
        title: "1. Create Schema: DEPARTMENT & EMPLOYEE",
        type: "DDL RELATIONS",
        description: "Creates DEPARTMENT and EMPLOYEE tables linked by DEPTNO foreign key constraint.",
        sql: `CREATE TABLE DEPARTMENT (
    DEPTNO NUMBER(2) PRIMARY KEY,
    DNAME VARCHAR2(20),
    LOCATION VARCHAR2(20)
);

CREATE TABLE EMPLOYEE (
    EMPNO NUMBER(4) PRIMARY KEY,
    ENAME VARCHAR2(20),
    JOB VARCHAR2(20),
    SALARY NUMBER(8,2),
    DEPTNO NUMBER(2),
    FOREIGN KEY (DEPTNO) REFERENCES DEPARTMENT(DEPTNO)
);`,
        outputType: "message",
        outputData: {
          message: "Table created."
        },
        image: "assets/images/exp8/exp8_01_create_dept_emp.png",
        imageCaption: "DDL execution: Tables DEPARTMENT and EMPLOYEE created with relational foreign key",
        status: "Table created. 0.00 seconds"
      },
      {
        id: "exp8-item2",
        title: "2. Populate & Verify DEPARTMENT Data",
        type: "DML POPULATE",
        description: "Inserts 4 departments (HR, IT, SALES, FINANCE) and verifies with SELECT *.",
        sql: `INSERT INTO DEPARTMENT VALUES (10, 'HR', 'MUMBAI');
INSERT INTO DEPARTMENT VALUES (20, 'IT', 'PUNE');
INSERT INTO DEPARTMENT VALUES (30, 'SALES', 'DELHI');
INSERT INTO DEPARTMENT VALUES (40, 'FINANCE', 'NAGPUR');

SELECT * FROM DEPARTMENT;`,
        outputType: "table",
        outputData: {
          headers: ["DEPTNO", "DNAME", "LOCATION"],
          rows: [
            ["10", "HR", "MUMBAI"],
            ["20", "IT", "PUNE"],
            ["30", "SALES", "DELHI"],
            ["40", "FINANCE", "NAGPUR"]
          ]
        },
        image: "assets/images/exp8/exp8_02_select_dept.png",
        imageCaption: "SELECT * FROM DEPARTMENT showing 4 department rows",
        status: "4 rows returned in 0.01 seconds"
      },
      {
        id: "exp8-item3",
        title: "3. Populate & Verify EMPLOYEE Data",
        type: "DML POPULATE",
        description: "Inserts 4 employee tuples and verifies baseline records.",
        sql: `INSERT INTO EMPLOYEE VALUES (101, 'AMIT', 'MANAGER', 50000, 10);
INSERT INTO EMPLOYEE VALUES (102, 'RAHUL', 'DEVELOPER', 40000, 20);
INSERT INTO EMPLOYEE VALUES (103, 'PRIYA', 'ANALYST', 35000, 20);
INSERT INTO EMPLOYEE VALUES (104, 'NEHA', 'SALESMAN', 30000, 30);

SELECT * FROM EMPLOYEE;`,
        outputType: "table",
        outputData: {
          headers: ["EMPNO", "ENAME", "JOB", "SALARY", "DEPTNO"],
          rows: [
            ["101", "AMIT", "MANAGER", "50000", "10"],
            ["102", "RAHUL", "DEVELOPER", "40000", "20"],
            ["103", "PRIYA", "ANALYST", "35000", "20"],
            ["104", "NEHA", "SALESMAN", "30000", "30"]
          ]
        },
        image: "assets/images/exp8/exp8_03_select_emp.png",
        imageCaption: "SELECT * FROM EMPLOYEE displaying 4 initial employee records",
        status: "4 rows returned in 0.00 seconds"
      },
      {
        id: "exp8-item4",
        title: "4. Single-Row Subquery: Salary > Average",
        type: "SINGLE-ROW SUBQUERY",
        description: "Finds employees earning higher than the company-wide average salary (AVG = 38750).",
        sql: `SELECT ENAME, SALARY
FROM EMPLOYEE
WHERE SALARY > (SELECT AVG(SALARY) FROM EMPLOYEE);`,
        outputType: "table",
        outputData: {
          headers: ["ENAME", "SALARY"],
          rows: [
            ["AMIT", "50000"],
            ["RAHUL", "40000"]
          ]
        },
        image: "assets/images/exp8/exp8_04_subquery_salary_gt_avg.png",
        imageCaption: "Employees earning above company average: AMIT (50000) and RAHUL (40000)",
        status: "2 rows returned in 0.00 seconds"
      },
      {
        id: "exp8-item5",
        title: "5. Multi-Row Subquery: Employees in IT Department",
        type: "IN SUBQUERY",
        description: "Uses the IN operator to retrieve all employees assigned to the 'IT' department without hardcoding DEPTNO.",
        sql: `SELECT ENAME, JOB
FROM EMPLOYEE
WHERE DEPTNO IN (
    SELECT DEPTNO 
    FROM DEPARTMENT 
    WHERE DNAME = 'IT'
);`,
        outputType: "table",
        outputData: {
          headers: ["ENAME", "JOB"],
          rows: [
            ["RAHUL", "DEVELOPER"],
            ["PRIYA", "ANALYST"]
          ]
        },
        image: "assets/images/exp8/exp8_05_subquery_in_it_dept.png",
        imageCaption: "Employees in IT department returned via dynamic DEPTNO resolution",
        status: "2 rows returned in 0.00 seconds"
      },
      {
        id: "exp8-item6",
        title: "6. Multi-Level Nested Subquery",
        type: "NESTED SUBQUERY",
        description: "Finds employees earning more than the average salary of the IT department (IT Avg = 37500).",
        sql: `SELECT ENAME, SALARY
FROM EMPLOYEE
WHERE SALARY > (
    SELECT AVG(SALARY)
    FROM EMPLOYEE
    WHERE DEPTNO = (
        SELECT DEPTNO
        FROM DEPARTMENT
        WHERE DNAME = 'IT'
    )
);`,
        outputType: "table",
        outputData: {
          headers: ["ENAME", "SALARY"],
          rows: [
            ["AMIT", "50000"],
            ["RAHUL", "40000"]
          ]
        },
        image: "assets/images/exp8/exp8_06_nested_subquery_avg_it.png",
        imageCaption: "Multi-level query resolving DNAME -> DEPTNO -> AVG(SALARY) -> matching employees",
        status: "2 rows returned in 0.00 seconds"
      },
      {
        id: "exp8-item7",
        title: "7. Create Table HIGH_SALARY",
        type: "DDL",
        description: "Creates destination table to store records of top earning employees.",
        sql: `CREATE TABLE HIGH_SALARY (
    EMPNO NUMBER(4),
    ENAME VARCHAR2(20),
    SALARY NUMBER(8,2)
);`,
        outputType: "message",
        outputData: {
          message: "Table created."
        },
        image: "assets/images/exp8/exp8_07_create_high_salary.png",
        imageCaption: "Table HIGH_SALARY created to receive subquery insert",
        status: "Table created. 0.00 seconds"
      },
      {
        id: "exp8-item8",
        title: "8. INSERT INTO ... SELECT Subquery",
        type: "INSERT SUBQUERY",
        description: "Populates HIGH_SALARY directly from EMPLOYEE for all staff earning above company average.",
        sql: `INSERT INTO HIGH_SALARY
SELECT EMPNO, ENAME, SALARY
FROM EMPLOYEE
WHERE SALARY > (SELECT AVG(SALARY) FROM EMPLOYEE);

SELECT * FROM HIGH_SALARY;`,
        outputType: "table",
        outputData: {
          headers: ["EMPNO", "ENAME", "SALARY"],
          rows: [
            ["101", "AMIT", "50000"],
            ["102", "RAHUL", "40000"]
          ]
        },
        image: "assets/images/exp8/exp8_08_insert_select_high_salary.png",
        imageCaption: "HIGH_SALARY populated and verified with 2 qualifying records",
        status: "2 rows inserted, 2 rows returned in 0.00 seconds"
      },
      {
        id: "exp8-item9",
        title: "9. UPDATE with Subquery (10% Raise for IT)",
        type: "UPDATE SUBQUERY",
        description: "Increments salaries by 10% specifically for employees belonging to the 'IT' department resolved via subquery.",
        sql: `UPDATE EMPLOYEE
SET SALARY = SALARY * 1.10
WHERE DEPTNO IN (
    SELECT DEPTNO
    FROM DEPARTMENT
    WHERE DNAME = 'IT'
);

SELECT * FROM EMPLOYEE;`,
        outputType: "table",
        outputData: {
          headers: ["EMPNO", "ENAME", "JOB", "SALARY", "DEPTNO"],
          rows: [
            ["101", "AMIT", "MANAGER", "50000", "10"],
            ["102", "RAHUL", "DEVELOPER", "44000", "20"],
            ["103", "PRIYA", "ANALYST", "38500", "20"],
            ["104", "NEHA", "SALESMAN", "30000", "30"]
          ]
        },
        image: "assets/images/exp8/exp8_09_update_emp_salary.png",
        imageCaption: "Salaries updated for IT dept: Rahul (40000 -> 44000), Priya (35000 -> 38500)",
        status: "2 rows updated in 0.00 seconds"
      },
      {
        id: "exp8-item10",
        title: "10. Final Verification: EMPLOYEE State",
        type: "SELECT VERIFY",
        description: "Confirms final state of EMPLOYEE table with all updated compensation values.",
        sql: `SELECT * FROM EMPLOYEE;`,
        outputType: "table",
        outputData: {
          headers: ["EMPNO", "ENAME", "JOB", "SALARY", "DEPTNO"],
          rows: [
            ["101", "AMIT", "MANAGER", "50000", "10"],
            ["102", "RAHUL", "DEVELOPER", "44000", "20"],
            ["103", "PRIYA", "ANALYST", "38500", "20"],
            ["104", "NEHA", "SALESMAN", "30000", "30"]
          ]
        },
        image: "assets/images/exp8/exp8_10_select_emp_final.png",
        imageCaption: "Final EMPLOYEE verification confirming persisted 10% salary revisions",
        status: "4 rows returned in 0.00 seconds"
      }
    ]
  }
];

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { EXPERIMENTS_DATA };
}

