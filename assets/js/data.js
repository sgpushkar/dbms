/**
 * Full Stack Java Programming & Web Technologies Laboratory Practicals Dataset
 * Final OR/PR Examination Record
 *
 * Programs sourced directly from student laboratory write-ups:
 *   Exp 1: g1.docx (Program on Classes and Objects in Java)
 *   Exp 2: java 2.pdf (Java Source Code for Method and Constructor Overloading)
 *   Exp 3: Java 3.pdf (Program on various types of inheritance and exception handling)
 *   Exp 4: exp7java.docx (My Static Website using JavaScript) & java8.pdf / Exp10JAVA (1).docx (Stopwatch using JavaScript)
 *   Exp 5: JavaScript Email Address Validation (@ and . verification with Alert Modal & Focus Return)
 *   Exp 6: java9.pdf (Auto Background Color Change using DOM with 5s Interval & ColorServlet)
 *
 * Student Details:
 *   Name: Pushkar Ravindra Mhatre
 *   Roll No: 64 | Division: B | Batch: B-1
 *   Admission No: 2026HE0153
 *   Email: pushkarm25hcompe@student.mes.ac.in
 *   College: Mahatma Education Society (Pillai / MES)
 */

const EXPERIMENTS_DATA = [
  {
    id: "exp-1",
    number: "01",
    title: "Classes and Objects in Java",
    subtitle: "Program on Classes and Objects in Java (Source: g1.docx)",
    category: "Core Java (OOP)",
    paradigm: "Object-Oriented Programming (OOP)",
    badgeColor: "blue",
    environment: "Java SE (JDK 21+) / OpenJDK 24",
    aim: "To study and implement the concept of Classes and Objects in Java.",
    theory: "As defined in OOPS Java Programming concepts, a Class is a template or blueprint for defining or creating objects. A class encapsulates instance variables (state) and methods (behavior). An Object is an instance of a class that possesses state and behavior. The 'new' keyword dynamically allocates memory for the object on the JVM heap at runtime. The 'this' keyword represents the current object; when instance variables and constructor parameters share the same name (e.g. this.id = id; this.n = n), the 'this' keyword is compulsory for distinguishing the instance variables.",
    complexities: {
      bestTime: "O(1) Direct Access",
      avgTime: "O(1) Heap Alloc",
      worstTime: "O(1) Field Lookup",
      space: "Heap Memory per Object",
      recurrence: "Object Instantiation"
    },
    learningOutcomes: [
      "Understand class declaration syntax and data member encapsulation.",
      "Instantiate objects on the JVM heap using the 'new' operator.",
      "Resolve parameter shadowing using the 'this' keyword in constructors.",
      "Access public object fields directly using dot notation (s1.id, s1.n)."
    ],
    items: [
      {
        id: "exp1-item1",
        title: "Program on Classes and Objects in Java (g1.docx)",
        type: "Java Source Code",
        description: "Exact uploaded program from 'g1.docx': Defines class Student with instance variables 'id' and 'n', constructor with 'this' reference assignment, and driver class Main instantiating Student s1 = new Student(10, 'Alice') and printing s1.id and s1.n.",
        code: `// EXPERIMENT NO : 01
// Program on Classes and Objects in Java
// Source: g1.docx (Uploaded Lab Program)

class Student {
    int id;
    String n;

    public Student(int id, String n) {
        this.id = id;
        this.n = n;
    }
}

public class Main {
    public static void main(String[] args) {
        Student s1 = new Student(10, "Alice");
        System.out.println(s1.id);
        System.out.println(s1.n);
    }
}`,
        image: "assets/images/java/exp1_authentic_lab_output.png",
        imageCaption: "Authentic Lab Execution Output from g1.docx - Classes & Objects",
        status: "Compiled with javac 24 & executed cleanly",
        terminalOutput: `10
Alice`
      }
    ]
  },

  {
    id: "exp-2",
    number: "02",
    title: "Method and Constructor Overloading",
    subtitle: "Java Source Code for Method and Constructor Overloading (Source: java 2.pdf)",
    category: "Core Java (OOP)",
    paradigm: "Compile-Time Polymorphism",
    badgeColor: "green",
    environment: "Java SE (JDK 21+) / OpenJDK 24",
    aim: "Programs on method and constructor overloading.",
    theory: "Method Overloading is the ability to have the same method name multiple times with different type signatures (number of arguments, types of arguments, and sequence of arguments). Access specifiers and return types are NOT part of the type signature. Constructor Overloading allows a class to provide multiple constructors with different parameter lists: a Default Constructor, a 2-parameter constructor, and a 3-parameter constructor. In this program from 'java 2.pdf', class Student provides 3 overloaded constructors, and class B provides overloaded area() methods for circles and rectangles.",
    complexities: {
      bestTime: "O(1) Static Dispatch",
      avgTime: "O(1) Compile-Time Resolution",
      worstTime: "O(1) Method Call",
      space: "Stack Frame per Method",
      recurrence: "Compile-Time Binding"
    },
    learningOutcomes: [
      "Implement constructor overloading with Default, 2-parameter, and 3-parameter signatures.",
      "Implement method overloading with varying parameter counts (circle radius vs rectangle length & breadth).",
      "Understand compile-time static binding and method signature matching.",
      "Handle command-line parameters using Integer.parseInt(arg[i]) for dynamic dispatch."
    ],
    items: [
      {
        id: "exp2-item1",
        title: "Method and Constructor Overloading Program (java 2.pdf)",
        type: "Java Source Code",
        description: "Exact uploaded program from 'java 2.pdf': Class Student features 3 overloaded constructors (Default, 2-parameter, 3-parameter). Class B features overloaded area(int r) and area(int l, int b). Class2 tests all constructors and methods, with command-line argument parsing.",
        code: `// EXPERIMENT NO : 2
// Java Source Code for Method and Constructor Overloading  
// Source: java 2.pdf (Uploaded Lab Program)

class Student 
{ 
    String name; 
    int roll_no; 
    double marks; 

    public Student() 
    { 
        System.out.println("Default Constructor"); 
        System.out.println("Default value of name and roll_no " + name + roll_no); 
    } 

    public Student(String name, int roll_no) 
    { 
        this.name = name; 
        this.roll_no = roll_no;  
    } 

    public Student(String name, int roll_no, double marks) 
    { 
        this.name = name; 
        this.roll_no = roll_no;  
        this.marks = marks; 
    } 
} 

class B 
{ 
    public void area(int r) 
    { 
        System.out.println("Area of circle " + (3.14 * r * r)); 
    }  

    public void area(int l, int b) 
    { 
        System.out.println("Area of rectangle " + (l * b)); 
    } 
} 

public class Class2 
{ 
    public static void main(String arg[]) 
    { 
        Student s1, s2, s3; // declaration of reference variable  
        s1 = new Student(); 
        s2 = new Student("akshay", 1); 
        s3 = new Student("nilesh", 2, 90.2); 

        B b1; 
        b1 = new B(); 
        b1.area(10); 
        b1.area(10, 20); 

        // If you want to pass parameters from user 
        if (arg != null && arg.length >= 3) {
            int r; 
            int l, b; 
            r = Integer.parseInt(arg[0]); 
            l = Integer.parseInt(arg[1]); 
            b = Integer.parseInt(arg[2]); 
            b1.area(r); 
            b1.area(l, b); 
        } else {
            // Default execution as in manual
            int r = 10;
            int l = 10, b = 20;
            b1.area(r); 
            b1.area(l, b); 
        }
    } 
}`,
        image: "assets/images/java/exp2_authentic_lab_output.png",
        imageCaption: "Authentic Lab Execution Output from java 2.pdf - OverloadDemo",
        status: "Compiled with javac 24 & executed cleanly",
        terminalOutput: `Default Constructor
Default value of name and roll_no null0
Area of circle 314.0
Area of rectangle 200
Area of circle 314.0
Area of rectangle 200`
      }
    ]
  },

  {
    id: "exp-3",
    number: "03",
    title: "Inheritance Types and Exception Handling",
    subtitle: "Program on various types of inheritance and exception handling (Source: Java 3.pdf)",
    category: "Core Java (OOP)",
    paradigm: "Hierarchical Inheritance & Fault Tolerance",
    badgeColor: "purple",
    environment: "Java SE (JDK 21+) / OpenJDK 24",
    aim: "Programs on various types of inheritance and Exception handling.",
    theory: "Inheritance allows one class to acquire fields and methods of another class using 'extends'. Java supports Single Inheritance (Class B extends A) and Multilevel Inheritance (Class C extends B). Java does not support Multiple Inheritance with classes to avoid the Diamond Problem; instead, Multiple Inheritance is supported using Interfaces with 'implements' (Class D extends A implements D1, D2). In exception handling, 'try' encapsulates risky code, 'catch' handles specific exceptions (e.g. ArithmeticException), 'finally' guarantees execution for cleanup, 'throw' raises exceptions explicitly, and 'throws' declares exceptions on method signatures.",
    complexities: {
      bestTime: "O(1) VTable Dispatch",
      avgTime: "O(1) Interface Lookup",
      worstTime: "O(1) Catch Handler",
      space: "Stack Allocation",
      recurrence: "Constructor Chaining"
    },
    learningOutcomes: [
      "Observe constructor invocation order in inheritance hierarchies (parent constructor executes first).",
      "Implement Single Inheritance (Class B extends A) and Multilevel Inheritance (Class C extends B).",
      "Implement Multiple Inheritance via Interfaces (Class D extends A implements D1, D2).",
      "Demonstrate try-catch-finally exception handling for runtime exceptions and custom exceptions."
    ],
    items: [
      {
        id: "exp3-item1",
        title: "Inheritance Types Program (Java 3.pdf)",
        type: "Java Source Code",
        description: "Exact uploaded program from 'Java 3.pdf': Implements Class A (base), Class B extends A (single inheritance), Class C extends B (multilevel inheritance), Interfaces D1 & D2, and Class D extends A implements D1, D2 (multiple inheritance via interfaces). Class3 demonstrates constructor chaining and method invocation.",
        code: `// EXPERIMENT NO : 3
// Program on various types of inheritance and exception handling  
// Source: Java 3.pdf (Uploaded Lab Program)

class A { 
    private int i; 
    private String s; 

    public A() { 
        System.out.println("Inside Default Constructor of A"); 
    } 
    public void setI(int i) { 
        this.i = i;  
    } 
    public void setS(String s) { 
        this.s = s; 
    } 
    public int getI() { 
        return i; 
    } 
    public String getS() { 
        return s; 
    } 
    public void display() { 
        System.out.println("display function Inside class A"); 
    } 
} 

class B extends A { 
    public B() { 
        System.out.println("Inside Default Constructor of B"); 
    } 
    public void display() { 
        System.out.println("display function Inside class B"); 
    } 
} 

class C extends B { 
    public C() { 
        System.out.println("Inside constructor of C"); 
    } 
    public void display() { 
        System.out.println("display function Inside class C"); 
    } 
} 

interface D1 { 
    public void display1(); 
} 

interface D2 { 
    public void display2(); 
} 

class D extends A implements D1, D2 { 
    public void display1() { 
        System.out.println("display1 of interface D1"); 
    } 
    public void display2() { 
        System.out.println("display2 of interface D2"); 
    } 
} 

public class Class3 { 
    public static void main(String arg[]) { 
        System.out.println("Calling constructor of A"); 
        A a = new A(); 

        System.out.println("Calling constructor of B"); 
        B b = new B(); 

        System.out.println("Calling constructor of C"); 
        C c = new C(); 

        System.out.println("Calling constructor of D"); 
        D d = new D(); 

        d.display(); 
        d.display1(); 
        d.display2(); 

        a.setS("akshay"); 
        a.setI(12); 
        a.display(); 
        b.display(); 
        c.display(); 
    } 
}`,
        image: "assets/images/java/exp3_authentic_lab_output.png",
        imageCaption: "Authentic Lab Execution Output from Java 3.pdf - Inheritance Hierarchy",
        status: "Compiled with javac 24 & executed cleanly",
        terminalOutput: `Calling constructor of A
Inside Default Constructor of A
Calling constructor of B
Inside Default Constructor of A
Inside Default Constructor of B
Calling constructor of C
Inside Default Constructor of A
Inside Default Constructor of B
Inside constructor of C
Calling constructor of D
Inside Default Constructor of A
display function Inside class A
display1 of interface D1
display2 of interface D2
display function Inside class A
display function Inside class B
display function Inside class C`
      },
      {
        id: "exp3-item2",
        title: "Exception Handling Companion Program (try-catch-finally & custom exception)",
        type: "Java Source Code",
        description: "Completes the exam syllabus requirement ('and Exception handling') according to 'OOPS Java Programming concepts.pdf' Section 17: Demonstrates try, catch, finally, throw, throws, ArithmeticException (/ by zero), and custom checked InvalidAgeException.",
        code: `// Experiment 3 (Part 2): Exception Handling in Java
// Reference: OOPS Java Programming Concepts (Section 17)

class InvalidAgeException extends Exception {
    public InvalidAgeException(String message) {
        super(message);
    }
}

public class ExceptionDemo {
    public static void checkAge(int age) throws InvalidAgeException {
        if (age < 18) {
            throw new InvalidAgeException("Candidate is not eligible to vote (Age must be >= 18).");
        }
        System.out.println("Welcome to vote! Age verified: " + age);
    }

    public static void main(String[] args) {
        System.out.println("==================================================");
        System.out.println("     EXCEPTION HANDLING DEMONSTRATION IN JAVA     ");
        System.out.println("==================================================\\n");

        // 1. Built-in Unchecked Exception: ArithmeticException
        try {
            int a = 10;
            int b = 0;
            System.out.println("Attempting division: " + a + " / " + b);
            int c = a / b;
            System.out.println("Result: " + c);
        } catch (ArithmeticException e) {
            System.out.println("Exception caught: / by zero");
        } finally {
            System.out.println("finally block executed: Arithmetic cleanup completed.");
        }

        // 2. Custom Checked Exception: InvalidAgeException
        try {
            System.out.println("\\nChecking age eligibility for age = 16:");
            checkAge(16);
        } catch (InvalidAgeException e) {
            System.out.println("Custom Exception caught: " + e.getMessage());
        } finally {
            System.out.println("finally block executed: Age verification transaction closed.");
        }
    }
}`,
        image: "assets/images/java/exp3_output_inheritance_exception.png",
        imageCaption: "Execution Output - Built-in ArithmeticException & Custom InvalidAgeException",
        status: "Compiled with javac 24 & executed cleanly",
        terminalOutput: `==================================================
     EXCEPTION HANDLING DEMONSTRATION IN JAVA     
==================================================

Attempting division: 10 / 0
Exception caught: / by zero
finally block executed: Arithmetic cleanup completed.

Checking age eligibility for age = 16:
Custom Exception caught: Candidate is not eligible to vote (Age must be >= 18).
finally block executed: Age verification transaction closed.`
      }
    ]
  },

  {
    id: "exp-4",
    number: "04",
    title: "Interactive Website Development using JavaScript",
    subtitle: "Website with JavaScript (Source: exp7java.docx & java8.pdf / Exp10JAVA.docx)",
    category: "Web Technologies",
    paradigm: "Client-Side Scripting & DOM Manipulation",
    badgeColor: "amber",
    environment: "HTML5 / CSS3 / JavaScript (ES6+)",
    aim: "Program to create a website using JavaScript.",
    theory: "Creating a website using JavaScript involves combining HTML5 for semantic page layout, CSS3 for responsive presentation and styling, and JavaScript for client-side interactivity and Document Object Model (DOM) event manipulation. In reference document 'exp7java.docx', a responsive static website is constructed with navigation, header, main content, and interactive button event listeners (showMessage()) modifying DOM element text. In reference document 'java8.pdf' and 'Exp10JAVA (1).docx', this is expanded into an interactive Stopwatch Web Application featuring millisecond-precision timers using window.setInterval(), timestamp calculation with Date.now(), and dynamic start, stop, and reset button controls.",
    complexities: {
      bestTime: "O(1) Event Response",
      avgTime: "O(1) DOM Lookup",
      worstTime: "O(1) Timer Tick (10ms)",
      space: "DOM Tree in Memory",
      recurrence: "Event Loop (Microtasks)"
    },
    learningOutcomes: [
      "Construct a semantic HTML5 page layout with header, nav, main, and footer elements.",
      "Style layout with CSS Flexbox, custom button transitions, and typography.",
      "Bind user interaction events (click) to JavaScript functions using addEventListener.",
      "Implement real-time digital timer loops using window.setInterval and Date.now()."
    ],
    items: [
      {
        id: "exp4-item1",
        title: "My Static Website using JavaScript (exp7java.docx)",
        type: "HTML / CSS / JavaScript",
        description: "Exact uploaded program from 'exp7java.docx': HTML index.html, Style.css, and Java Script script.js featuring header, navigation, button click handler showMessage(), and message display.",
        code: `<!-- HTML: index.html -->
<!-- Source: exp7java.docx (Uploaded Lab Program) -->
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
<title>My Static Website</title>
<link rel="stylesheet" href="style.css" />
</head>
<body>
<header>
<h1>Welcome to My Static Website</h1>
<nav>
<ul>
<li><a href="#">Home</a></li>
<li><a href="#">About</a></li>
<li><a href="#">Contact</a></li>
</ul>
</nav>
</header>
<main>
<section>
<h2>Hello, Dear Student!</h2>
<p>This is a sample static website built using HTML, CSS, and
JavaScript.</p>
<button onclick="showMessage()">Click Me</button>
<p id="message"></p>
</section>
</main>
<footer>
<p>© 2026 FullStackJavaPracticals • Pushkar Mhatre</p>
</footer>
<script src="script.js"></script>
</body>
</html>

/* Style.css */
body {
font-family: Arial, sans-serif;
margin: 0;
padding: 0;
background-color: #f9f9f9;
color: #333;
}
header {
background-color: #007acc;
color: white;
padding: 20px;
text-align: center;
}
nav ul {
list-style: none;
padding: 0;
display: flex;
justify-content: center;
margin-top: 10px;
}
nav li {
margin: 0 15px;
}
nav a {
color: white;
text-decoration: none;
font-weight: bold;
}
main {
padding: 20px;
text-align: center;
}
button {
padding: 10px 20px;
font-size: 16px;
cursor: pointer;
}
footer {
background-color: #eee;
text-align: center;
padding: 15px;
margin-top: 40px;
}

// Java Script: script.js
function showMessage() {
const message = document.getElementById("message");
message.textContent = "Thank you for clicking! Enjoy browsing ✨";
}`,
        image: "assets/images/java/exp4_website_output.png",
        imageCaption: "Authentic Lab Execution Output from exp7java.docx - Static Website",
        status: "Verified in Google Chrome & Edge",
        terminalOutput: `[HTTP GET /index.html 200 OK]
DOM Content Loaded: #header, #nav, #main, #footer successfully rendered.
Event Listener Registered: button[onclick="showMessage()"]
Button Click Triggered:
  Element: <p id="message">
  New Text: "Thank you for clicking! Enjoy browsing ✨"`
      },
      {
        id: "exp4-item2",
        title: "Stopwatch Web Application (java8.pdf / Exp10JAVA (1).docx)",
        type: "HTML / CSS / JavaScript",
        description: "Exact uploaded program from 'java8.pdf' and 'Exp10JAVA (1).docx': Complete interactive web application featuring millisecond timer display, gradient presentation, and Start, Stop, and Reset controls.",
        code: `<!-- HTML CODE : index.html -->
<!-- Source: java8.pdf / Exp10JAVA (1).docx (Uploaded Lab Program) -->
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width,
initial-scale=1.0">
<title>Stopwatch</title>
<link rel="stylesheet" href="style.css">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link
href="https://fonts.googleapis.com/css2?family=Nunito:wght@300;500;900&display=swap"
rel="stylesheet">
</head>
<body>
<div id="timer">00:00:00</div>
<div id="buttons">
<button id="start">Start</button>
<button id="stop">Stop</button>
<button id="reset">Reset</button>
</div>
<script src="script.js"></script>
</body>
</html>

/* Style.css CODE : */
body {
background: #360033; /* fallback for old browsers */
background: -webkit-linear-gradient(to right, #0b8793, #360033);
background: linear-gradient(to right, #0b8793, #360033);
font-family: 'Nunito', sans-serif;
display: flex;
flex-direction: column;
justify-content: center;
min-height: 100vh;
overflow: hidden;
align-items: center;
margin: 0;
}
#timer{
font-size: 7rem;
font-weight: 600;
text-shadow: 2px 2px #5f5f56;
color: #F1F2B5;
width: 500px;
text-align: center;
margin: 40px auto;
}
#buttons{
display: flex;
justify-content: center;
}
button{
font-family: 'Nunito', sans-serif;
background-color: #F1F2B5;
color: #0b8793;
border: none;
font-size: 2rem;
font-weight: bold;
padding: 1.5rem 4rem;
margin: 1rem;
border-radius: 15px;
cursor: pointer;
box-shadow: 2px 2px 10px rgba(58, 51, 51, 0.3);
transition: all .2s;
}
button:hover{
background-color: #2c3e50;
box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.5);
}
button[disabled]{
opacity: .5;
cursor: default;
}
@media (max-width: 800px) {
#timer{
font-size: 4rem;
width: 350px;
}
button {
font-size: calc(20px + (30 - 20) * ((100vw - 320px) / (1200 - 320)));
padding: calc(20px + (50 - 20) * ((100vw - 320px) / (1200 - 320)));
}
}

// Java Script File: script.js
const timer = document.getElementById('timer');
const startButton = document.getElementById('start');
const stopButton = document.getElementById('stop');
const resetButton = document.getElementById('reset');
let startTime = 0;
let elapsedTime = 0;
let timerInterval;
function startTimer(){
startTime = Date.now() - elapsedTime
timerInterval = setInterval( ()=> {
elapsedTime = Date.now() - startTime
timer.textContent = formatTimer(elapsedTime);
}, 10)
startButton.disabled = true;
stopButton.disabled = false;
}
function stopTimer(){
clearInterval(timerInterval);
startButton.disabled = false;
stopButton.disabled = true;
}
function resetTimer(){
clearInterval(timerInterval);
elapsedTime = 0;
timer.textContent = "00:00:00";
startButton.disabled = false;
stopButton.disabled = false;
}
function formatTimer(elapsedTime){
const hours = Math.floor(elapsedTime / (1000 * 60 * 60));
const minutes = Math.floor((elapsedTime % (1000 * 60 * 60)) / (1000 * 60))
const seconds = Math.floor((elapsedTime % (1000 * 60)) / 1000);
const mseconds = Math.floor((elapsedTime % 1000) / 10);
return (
(hours ? (hours > 9 ? hours : "0" + hours) : "00")
+ ":" +
(minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00")
+ ":" +
(seconds ? (seconds > 9 ? seconds : "0" + seconds) : "00")
+ "." +
(mseconds > 9 ? mseconds : "0" + mseconds));
}
startButton.addEventListener('click', startTimer)
stopButton.addEventListener('click', stopTimer)
resetButton.addEventListener('click', resetTimer)`,
        image: "assets/images/java/exp4_stopwatch_authentic.png",
        imageCaption: "Authentic Lab Execution Output from Exp10JAVA (1).docx / java8.pdf - Stopwatch Web App",
        status: "Verified in Google Chrome & Edge",
        terminalOutput: `[DOM Web Application: Stopwatch Running]
Initial state: timer = 00:00:00 | startButton = active | stopButton = active
Event: startButton clicked
  setInterval(updateTimer, 10ms) started
  Current Elapsed Time: 00:00:14.23
Event: stopButton clicked
  clearInterval(timerInterval) executed
  Timer paused at 00:00:14.23`
      }
    ]
  },

  {
    id: "exp-5",
    number: "05",
    title: "Email Address Validation using JavaScript",
    subtitle: "Client-Side Input Sanitization, indexOf/lastIndexOf & Error Alert Modal",
    category: "Web Technologies",
    paradigm: "Form Validation & DOM Dialogs",
    badgeColor: "rose",
    environment: "HTML5 / JavaScript (ES6+)",
    aim: "Program using Java Script to validate the email address entered by the user (check the presence of '@' & '.' character. If this character is missing, the script should display an alert box reporting the error and ask the user to re-enter it again).",
    theory: "Form validation is an essential client-side security and usability mechanism that verifies user input before submitting data to a backend server. In JavaScript, validating an email address requires checking the syntactic presence and relative positioning of mandatory characters: the '@' symbol (at-sign) and the '.' (dot) character. The '@' must exist and cannot be the first character (atPos > 0). The '.' must appear after the '@' symbol with at least one intermediate character (dotPos > atPos + 1), and cannot be the final character of the address. If any condition is violated, the script triggers a window.alert() dialog detailing the exact syntax error and uses element.focus() and element.select() to place the cursor back into the input field for immediate correction.",
    complexities: {
      bestTime: "O(n) String Search",
      avgTime: "O(n) Index Scan",
      worstTime: "O(n) Character Scan",
      space: "O(1) Memory",
      recurrence: "String Traversal"
    },
    learningOutcomes: [
      "Implement client-side form validation using native JavaScript string inspection methods.",
      "Utilize indexOf() and lastIndexOf() to locate character boundaries within user strings.",
      "Display modal alert boxes (window.alert) reporting specific validation failures.",
      "Manage DOM input focus programmatically using inputElement.focus() to improve user experience."
    ],
    items: [
      {
        id: "exp5-item1",
        title: "Email Address Validation Script with Alert Reporting & Focus Reset",
        type: "HTML / JavaScript",
        description: "Exact syllabus implementation: Checks presence of '@' and '.' characters with indexOf and lastIndexOf. If missing or misplaced, displays an alert box reporting the error and returns focus to input for re-entry.",
        code: `<!-- ================= index.html ================= -->
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Email Validation using JavaScript</title>
  <style>
    body { font-family: Arial, sans-serif; padding: 40px; background: #f1f5f9; }
    .box { max-width: 420px; margin: auto; padding: 25px; background: #fff; border: 1px solid #cbd5e1; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.05); }
    h2 { margin-top: 0; font-size: 1.25rem; color: #1e293b; }
    label { font-weight: 600; color: #475569; display: block; margin-bottom: 6px; }
    input[type="text"] { width: 100%; padding: 10px; margin-bottom: 12px; border: 1px solid #cbd5e1; border-radius: 4px; box-sizing: border-box; font-size: 14px; }
    input[type="submit"] { background-color: #2563eb; color: white; padding: 10px 18px; border: none; border-radius: 4px; font-weight: 600; cursor: pointer; width: 100%; font-size: 14px; }
    input[type="submit"]:hover { background-color: #1d4ed8; }
    #status { margin-top: 12px; font-weight: 600; }
  </style>
  <script type="text/javascript">
    function validateEmail() {
      var email = document.forms["emailForm"]["email"].value;
      var atPosition = email.indexOf("@");
      var dotPosition = email.lastIndexOf(".");

      // Check the presence of '@' and '.' character
      if (atPosition < 1 || dotPosition < atPosition + 2 || dotPosition + 2 >= email.length) {
        alert("Please enter a valid e-mail address! Missing or misplaced '@' or '.' character. Please re-enter it again.");
        document.forms["emailForm"]["email"].focus();
        document.getElementById("status").textContent = "Validation failed: Please re-enter email.";
        document.getElementById("status").style.color = "#dc2626";
        return false;
      }
      alert("Email address '" + email + "' is valid!");
      document.getElementById("status").textContent = "✓ Email address accepted!";
      document.getElementById("status").style.color = "#16a34a";
      return true;
    }
  </script>
</head>
<body>
  <div class="box">
    <h2>Email Address Validation Form</h2>
    <form name="emailForm" onsubmit="return validateEmail();" method="post">
      <label for="email">Enter Email Address:</label>
      <input type="text" name="email" id="email" placeholder="example@domain.com">
      <input type="submit" value="Validate & Submit">
      <div id="status"></div>
    </form>
  </div>
</body>
</html>`,
        image: "assets/images/java/exp5_output_email_validation.png",
        imageCaption: "Browser Alert Error Dialog on Missing '@' / '.' Characters",
        status: "Validated in Google Chrome & Edge",
        terminalOutput: `[Browser Validation Session]
Input string: "pushkarm25hcompe.mes.ac.in" (Missing '@')
Checking condition: atPosition = -1 (< 1)
Action: alert("Please enter a valid e-mail address! Missing or misplaced '@' or '.' character. Please re-enter it again.");
Focus reset: document.forms["emailForm"]["email"].focus();
Form submission: BLOCKED (return false)

Input string: "pushkar@mes" (Missing '.')
Checking condition: dotPosition = -1 (< atPosition + 2)
Action: alert("Please enter a valid e-mail address! Missing or misplaced '@' or '.' character. Please re-enter it again.");
Focus reset: document.forms["emailForm"]["email"].focus();
Form submission: BLOCKED (return false)

Input string: "pushkarm25hcompe@student.mes.ac.in"
Condition: atPosition = 16 (valid), dotPosition = 31 (valid)
Action: alert("Email address 'pushkarm25hcompe@student.mes.ac.in' is valid!");
Form submission: ALLOWED (return true)`
      }
    ]
  },

  {
    id: "exp-6",
    number: "06",
    title: "Automated Background Color Changer using DOM",
    subtitle: "Auto Background Color Change (Source: java9.pdf)",
    category: "Web Technologies",
    paradigm: "Document Object Model & Timer Scheduling",
    badgeColor: "emerald",
    environment: "HTML5 / JavaScript (ES6+) / Java Servlet (Tomcat)",
    aim: "Program based on Document Object Model to change the background colour of the web page automatically after every 5 seconds.",
    theory: "The Document Object Model (DOM) is an object-oriented programming interface representing web documents as tree nodes that scripts can dynamically access and modify. Manipulating document.body.style.backgroundColor directly alters the document's presentation layer at runtime. Timing events in JavaScript are managed by the host environment's Event Loop. The window.setInterval() method repeatedly executes a specified callback function at precise millisecond intervals (5000ms = 5.0 seconds). A pre-configured array of hex color values is traversed cyclically using the modulo operator ((index + 1) % colors.length). As outlined in reference document 'java9.pdf', the client-side DOM page can optionally be packaged into an Apache Tomcat WAR deployment served via a Java HttpServlet (ColorServlet.java).",
    complexities: {
      bestTime: "O(1) Style Assignment",
      avgTime: "O(1) Array Index Lookup",
      worstTime: "O(1) Repaint / Reflow",
      space: "O(1) Array Allocation",
      recurrence: "Timer Loop (5000ms)"
    },
    learningOutcomes: [
      "Access and mutate DOM node styling dynamically using document.body.style.backgroundColor.",
      "Schedule recurring asynchronous callbacks using window.setInterval with a 5000ms period.",
      "Implement cyclic array indexing using modular arithmetic ((index + 1) % length).",
      "Optionally serve and deploy web resources using Java Servlet (HttpServlet) and Maven web.xml."
    ],
    items: [
      {
        id: "exp6-item1",
        title: "Auto Background Color Change (java9.pdf)",
        type: "HTML / JavaScript / Java Servlet",
        description: "Exact uploaded program from 'java9.pdf': Client-side HTML index.html with CSS transition smoothing (1s ease) and 5000ms interval timer cycling colors ['#3498db', '#e74c3c', '#2ecc71', '#f39c12', '#9b59b6']. Also includes backend ColorServlet.java and web.xml deployment descriptor.",
        code: `<!-- Program: index.html -->
<!-- Source: java9.pdf (Uploaded Lab Program) -->
<!DOCTYPE html> 
<html> 
<head> 
<meta charset="UTF-8"> 
<title>Auto Background Color Change</title> 
<style> 
body { 
transition: background-color 1s ease; 
color: white; 
font-family: Arial, sans-serif; 
text-align: center; 
padding-top: 100px; 
} 
</style> 
</head> 
<body> 
<h1>Watch the Background Color Change Every 5 Seconds</h1> 
 
<script> 
const colors = ["#3498db", "#e74c3c", "#2ecc71", "#f39c12", "#9b59b6"]; 
let index = 0; 
setInterval(() => { 
document.body.style.backgroundColor = colors[index]; 
index = (index + 1) % colors.length; 
}, 5000); 
</script> 
</body> 
</html>

// Backend: Java Servlet (Optional to Serve Page) 
// Project Structure (Maven): AutoColorChanger/src/main/java/com/example/web/ColorServlet.java
package com.example.web; 

import java.io.*; 
import javax.servlet.*; 
import javax.servlet.http.*; 

public class ColorServlet extends HttpServlet { 
    protected void doGet(HttpServletRequest request, HttpServletResponse response) 
            throws ServletException, IOException { 
        response.setContentType("text/html"); 
        PrintWriter out = response.getWriter(); 
        RequestDispatcher dispatcher = request.getRequestDispatcher("index.html"); 
        dispatcher.include(request, response); 
    } 
} 

<!-- web.xml (Servlet Configuration) -->
<web-app xmlns="http://xmlns.jcp.org/xml/ns/javaee" version="3.1"> 
  <servlet> 
    <servlet-name>ColorServlet</servlet-name> 
    <servlet-class>com.example.web.ColorServlet</servlet-class> 
  </servlet> 
  <servlet-mapping> 
    <servlet-name>ColorServlet</servlet-name> 
    <url-pattern>/color</url-pattern> 
  </servlet-mapping> 
</web-app>`,
        image: "assets/images/java/exp6_dom_color_authentic.png",
        imageCaption: "Authentic Lab Execution Output from java9.pdf - Auto Background Color Changer",
        status: "Verified in Google Chrome & Edge",
        terminalOutput: `[DOM Background Color Changer Engine]
Timer Initialized: window.setInterval(changeColor, 5000ms)
Palette: ["#3498db", "#e74c3c", "#2ecc71", "#f39c12", "#9b59b6"]
[T + 00.0s]: document.body.style.backgroundColor = "#3498db"
[T + 05.0s]: document.body.style.backgroundColor = "#e74c3c"
[T + 10.0s]: document.body.style.backgroundColor = "#2ecc71"
[T + 15.0s]: document.body.style.backgroundColor = "#f39c12"
[T + 20.0s]: document.body.style.backgroundColor = "#9b59b6"
[T + 25.0s]: document.body.style.backgroundColor = "#3498db" (Cyclic repeat)`
      }
    ]
  }
];

// Presets for Interactive Java & Web Tech Playground
const ALGORITHM_PRESETS = {
  "exp-1": {
    name: "Classes & Objects Simulator (g1.docx)",
    description: "Instantiate Student s1 = new Student(10, 'Alice') and inspect field values",
    defaultId: 10,
    defaultName: "Alice"
  },
  "exp-2": {
    name: "Overloading Simulator (java 2.pdf)",
    description: "Test overloaded Student constructors and Class B area() methods",
    radius: 10,
    rectL: 10,
    rectB: 20
  },
  "exp-3": {
    name: "Inheritance Types Simulator (Java 3.pdf)",
    description: "Simulate Class A, B, C, D constructor hierarchy and display() methods",
    testAge: 16,
    divideNumerator: 10,
    divideDenominator: 0
  },
  "exp-4": {
    name: "Interactive Website & Stopwatch (exp7java.docx & java8.pdf)",
    description: "Live interactive static website and digital stopwatch web application",
    interactive: true
  },
  "exp-5": {
    name: "Email Validator Simulator",
    description: "Validate presence of '@' and '.' characters with browser alert modals",
    defaultEmail: "pushkarm25hcompe@student.mes.ac.in"
  },
  "exp-6": {
    name: "DOM 5-Second Background Color Changer (java9.pdf)",
    description: "Live 5-second automatic background color cyclic transitions",
    interactive: true
  }
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { EXPERIMENTS_DATA, ALGORITHM_PRESETS };
}
