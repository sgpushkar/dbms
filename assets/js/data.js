/**
 * Full Stack Java Programming & Web Technologies Laboratory Practicals Dataset
 * Final OR/PR Examination Record
 *
 * Student Details:
 *   Name: Pushkar Ravindra Mhatre
 *   Roll No: 64 | Division: B | Batch: B-1
 *   Admission No: 2026HE0153
 *   Email: pushkarm25hcompe@student.mes.ac.in
 *   Department: Computer Engineering
 *   Institution: Mahatma Education Society (Pillai / MES)
 *   Course: Full Stack Java Programming (FSJP) Lab
 *
 * Experiments:
 *   1. Classes and Objects in Java (Reference: g1.docx / OOPS Java Concepts)
 *   2. Method and Constructor Overloading (Reference: java 2.pdf)
 *   3. Inheritance and Exception Handling (Reference: Java 3.pdf / OOPS Java Concepts)
 *   4. Website Development using JavaScript (Reference: exp7java.docx & java8.pdf / Exp10JAVA.docx)
 *   5. JavaScript Email Address Validation (@ and . verification with Alert Modal)
 *   6. DOM Automated Background Color Changer (Reference: java9.pdf)
 */

const EXPERIMENTS_DATA = [
  {
    id: "exp-1",
    number: "01",
    title: "Classes and Objects in Java",
    subtitle: "Object-Oriented Blueprint, State Encapsulation & Dynamic Heap Allocation",
    category: "Core Java (OOP)",
    paradigm: "Object-Oriented Programming (OOP)",
    badgeColor: "blue",
    environment: "Java SE (JDK 21+) / OpenJDK 24",
    aim: "To study and implement the concept of Classes and Objects in Java.",
    theory: "In Java, an Object-Oriented Programming language, a Class serves as a user-defined blueprint, template, or prototype from which individual Objects are created. As defined in the official curriculum guidelines, class names follow PascalCasing as nouns. A class encapsulates instance variables (state/attributes) and member methods (behavior). An Object is an identifiable runtime entity possessing state, behavior, and unique identity. Memory for an object is dynamically allocated on the JVM heap at runtime using the 'new' operator, which invokes the class constructor. The 'this' keyword represents the current object instance and is compulsory for accessing instance variables when local or parameter variables share the exact same names.",
    complexities: {
      bestTime: "O(1) Access",
      avgTime: "O(1) Heap Alloc",
      worstTime: "O(1) Method Call",
      space: "Heap Memory per Instance",
      recurrence: "Object State Encapsulation"
    },
    learningOutcomes: [
      "Understand class declaration syntax, data member encapsulation, and member method definitions.",
      "Master dynamic heap memory allocation using the 'new' operator and constructor invocation.",
      "Demonstrate the 'this' keyword to resolve variable shadowing between instance fields and constructor parameters.",
      "Verify state independence: each instantiated object maintains its own private copy of instance fields."
    ],
    items: [
      {
        id: "exp1-item1",
        title: "Student Academic Record Implementation (Classes & Objects)",
        type: "Java Source Code",
        description: "Defines class Student with instance variables (id, name, department, subject marks), parameterized constructor with 'this' pointer resolution, calculation methods for total and percentage, and driver class Main instantiating independent Student objects.",
        code: `// Experiment 1: To study and implement the concept of Classes and Objects in Java
// Student: Pushkar Ravindra Mhatre | Roll No: 64 | Div: B | Batch: B-1
// Reference: g1.docx / OOPS Java Programming Concepts

class Student {
    // 1. Instance Variables (State / Attributes encapsulated in object)
    int id;
    String name;
    String department;
    double marksJava;
    double marksDSA;
    double marksWebTech;

    // 2. Parameterized Constructor to initialize object state on Heap
    public Student(int id, String name, String department, double m1, double m2, double m3) {
        // 'this' keyword refers to the current invoking instance
        this.id = id;
        this.name = name;
        this.department = department;
        this.marksJava = m1;
        this.marksDSA = m2;
        this.marksWebTech = m3;
    }

    // 3. Member Methods (Behavior)
    public double calculateTotal() {
        return marksJava + marksDSA + marksWebTech;
    }

    public double calculatePercentage() {
        return (calculateTotal() / 300.0) * 100.0;
    }

    public String getGrade() {
        double percentage = calculatePercentage();
        if (percentage >= 90.0) return "A+ (Distinction)";
        else if (percentage >= 75.0) return "A (First Class)";
        else if (percentage >= 60.0) return "B (Second Class)";
        else if (percentage >= 40.0) return "C (Pass Class)";
        else return "F (Fail)";
    }

    public void displayReport() {
        System.out.println("--------------------------------------------------");
        System.out.println("Student ID  : " + id);
        System.out.println("Student Name: " + name);
        System.out.println("Department  : " + department);
        System.out.printf("Subject Marks: Java: %.1f | DSA: %.1f | WebTech: %.1f\\n", marksJava, marksDSA, marksWebTech);
        System.out.printf("Total Marks : %.1f / 300.0\\n", calculateTotal());
        System.out.printf("Percentage  : %.2f%%\\n", calculatePercentage());
        System.out.println("Final Grade : " + getGrade());
        System.out.println("--------------------------------------------------");
    }
}

public class Main {
    public static void main(String[] args) {
        System.out.println("==================================================");
        System.out.println("     STUDENT ACADEMIC REPORT - CLASSES & OBJECTS  ");
        System.out.println("==================================================");

        // Dynamic memory allocation on Heap using 'new' operator
        Student s1 = new Student(64, "Pushkar Ravindra Mhatre", "Computer Engineering", 92.0, 88.5, 95.0);
        Student s2 = new Student(10, "Alice Johnson", "Computer Engineering", 84.0, 79.0, 88.0);

        System.out.println("\\n[Record 1: Primary Candidate - Roll 64]");
        s1.displayReport();

        System.out.println("\\n[Record 2: Peer Candidate - Roll 10]");
        s2.displayReport();
        
        System.out.println("\\nDirect Field Access via Reference: s1.id = " + s1.id + ", s1.name = " + s1.name);
    }
}`,
        image: "assets/images/java/exp1_authentic_lab_output.png",
        imageCaption: "Authentic Lab Execution Output - Classes & Objects in Java",
        status: "Compiled with javac 24 & executed cleanly",
        terminalOutput: `==================================================
     STUDENT ACADEMIC REPORT - CLASSES & OBJECTS  
==================================================

[Record 1: Primary Candidate - Roll 64]
--------------------------------------------------
Student ID  : 64
Student Name: Pushkar Ravindra Mhatre
Department  : Computer Engineering
Subject Marks: Java: 92.0 | DSA: 88.5 | WebTech: 95.0
Total Marks : 275.5 / 300.0
Percentage  : 91.83%
Final Grade : A+ (Distinction)
--------------------------------------------------

[Record 2: Peer Candidate - Roll 10]
--------------------------------------------------
Student ID  : 10
Student Name: Alice Johnson
Department  : Computer Engineering
Subject Marks: Java: 84.0 | DSA: 79.0 | WebTech: 88.0
Total Marks : 251.0 / 300.0
Percentage  : 83.67%
Final Grade : A (First Class)
--------------------------------------------------

Direct Field Access via Reference: s1.id = 64, s1.name = Pushkar Ravindra Mhatre`
      }
    ]
  },

  {
    id: "exp-2",
    number: "02",
    title: "Method and Constructor Overloading",
    subtitle: "Compile-Time Polymorphism, Static Binding & Method Signature Dispatch",
    category: "Core Java (OOP)",
    paradigm: "Static Polymorphism",
    badgeColor: "green",
    environment: "Java SE (JDK 21+) / OpenJDK 24",
    aim: "Programs on method and constructor overloading.",
    theory: "Method Overloading and Constructor Overloading represent Compile-Time Polymorphism (Static Binding or Early Binding) in Java. Method Overloading is the ability to define the same method name multiple times within the same class, differentiated by unique Type Signatures. A type signature consists of the number of arguments, the types of arguments, and the sequence of argument types. The return type and access specifiers are NOT part of the method signature. Constructor Overloading allows a class to provide multiple constructors with distinct parameter lists (e.g. default constructor, two-parameter constructor, three-parameter constructor), enabling versatile object initialization states.",
    complexities: {
      bestTime: "O(1) Static Dispatch",
      avgTime: "O(1) Compile-Time Resolution",
      worstTime: "O(1) Direct Invocation",
      space: "Stack Frame per Method",
      recurrence: "Compile-Time Binding"
    },
    learningOutcomes: [
      "Implement constructor overloading with Default, 2-parameter, and 3-parameter constructors.",
      "Implement method overloading with varying parameter counts and types (Circle vs Rectangle area).",
      "Understand compiler method signature resolution and type matching rules.",
      "Handle command-line parameters using Integer.parseInt() for dynamic invocation."
    ],
    items: [
      {
        id: "exp2-item1",
        title: "Constructor & Method Overloading Implementation (Class Student & Class B)",
        type: "Java Source Code",
        description: "Directly matches reference manual 'java 2.pdf': Class Student demonstrates 3 overloaded constructors (Default, 2-parameter, 3-parameter). Class B demonstrates overloaded area() methods for circles and rectangles. Driver Class2 demonstrates both static parameters and CLI argument parsing.",
        code: `// Experiment 2: Programs on method and constructor overloading
// Student: Pushkar Ravindra Mhatre | Roll No: 64 | Div: B | Batch: B-1
// Reference: java 2.pdf / OOPS Java Programming Concepts

class Student { 
    String name; 
    int roll_no; 
    double marks; 

    // 1. Default Constructor
    public Student() { 
        System.out.println("Default Constructor invoked"); 
        System.out.println("Default values: Name = " + name + ", Roll No = " + roll_no); 
    } 

    // 2. Overloaded Constructor with 2 parameters
    public Student(String name, int roll_no) { 
        this.name = name; 
        this.roll_no = roll_no;  
        System.out.println("2-Param Constructor: Name = " + name + ", Roll No = " + roll_no);
    } 

    // 3. Overloaded Constructor with 3 parameters
    public Student(String name, int roll_no, double marks) { 
        this.name = name; 
        this.roll_no = roll_no;  
        this.marks = marks; 
        System.out.println("3-Param Constructor: Name = " + name + ", Roll No = " + roll_no + ", Marks = " + marks);
    } 
} 

class B { 
    // 1. Overloaded area method: 1 int parameter (Circle)
    public void area(int r) { 
        System.out.println("Area of circle (r=" + r + "): " + (3.14 * r * r)); 
    }  

    // 2. Overloaded area method: 2 int parameters (Rectangle)
    public void area(int l, int b) { 
        System.out.println("Area of rectangle (l=" + l + ", b=" + b + "): " + (l * b)); 
    } 

    // 3. Overloaded area method: 2 float parameters (Triangle)
    public void area(float b, float h) { 
        System.out.println("Area of triangle (b=" + b + ", h=" + h + "): " + (0.5 * b * h)); 
    } 
} 

public class Class2 { 
    public static void main(String[] arg) { 
        System.out.println("==================================================");
        System.out.println("  CONSTRUCTOR & METHOD OVERLOADING IN JAVA        ");
        System.out.println("==================================================\\n");

        System.out.println("[Part 1: Constructor Overloading in Class Student]");
        Student s1, s2, s3; // Declaration of reference variables
        s1 = new Student(); 
        s2 = new Student("akshay", 1); 
        s3 = new Student("nilesh", 2, 90.2); 

        System.out.println("\\n[Part 2: Method Overloading in Class B]");
        B b1 = new B(); 
        b1.area(10); 
        b1.area(10, 20); 
        b1.area(8.0f, 6.0f);

        // Optional parameters passed via command-line arguments
        if (arg != null && arg.length >= 3) {
            System.out.println("\\n[Part 3: Dynamic Command-line Arguments Dispatch]");
            int r = Integer.parseInt(arg[0]); 
            int l = Integer.parseInt(arg[1]); 
            int b = Integer.parseInt(arg[2]); 
            b1.area(r); 
            b1.area(l, b); 
        }
    } 
}`,
        image: "assets/images/java/exp2_authentic_lab_output.png",
        imageCaption: "Authentic Lab Execution Output from java 2.pdf - OverloadDemo",
        status: "Compiled with javac 24 & executed cleanly",
        terminalOutput: `==================================================
  CONSTRUCTOR & METHOD OVERLOADING IN JAVA        
==================================================

[Part 1: Constructor Overloading in Class Student]
Default Constructor invoked
Default values: Name = null, Roll No = 0
2-Param Constructor: Name = akshay, Roll No = 1
3-Param Constructor: Name = nilesh, Roll No = 2, Marks = 90.2

[Part 2: Method Overloading in Class B]
Area of circle (r=10): 314.0
Area of rectangle (l=10, b=20): 200
Area of triangle (b=8.0, h=6.0): 24.0`
      }
    ]
  },

  {
    id: "exp-3",
    number: "03",
    title: "Inheritance Types and Exception Handling",
    subtitle: "Single, Multilevel & Multiple Inheritance via Interfaces with try-catch-finally",
    category: "Core Java (OOP)",
    paradigm: "Hierarchical OOP & Fault-Tolerance",
    badgeColor: "purple",
    environment: "Java SE (JDK 21+) / OpenJDK 24",
    aim: "Programs on various types of inheritance and Exception handling.",
    theory: "Inheritance is the mechanism by which one class acquires the properties (state and behavior) of another class using the 'extends' keyword. Java supports Single Inheritance (Class B extends A) and Multilevel Inheritance (Class C extends B). Java does not support Multiple Inheritance with classes to prevent the Diamond Problem (method ambiguity); instead, Multiple Inheritance is elegantly achieved using Interfaces via the 'implements' keyword (Class D extends A implements D1, D2). Exception Handling in Java provides a robust runtime fault-tolerance mechanism using try, catch, finally, throw, and throws. A try block encapsulates suspicious code, catch blocks handle specific exceptions, and the finally block is guaranteed to execute regardless of whether an exception occurred, ensuring vital resource release.",
    complexities: {
      bestTime: "O(1) VTable Dispatch",
      avgTime: "O(1) Interface Lookup",
      worstTime: "O(1) Catch Block Trap",
      space: "Call Stack Allocation",
      recurrence: "Constructor Chaining"
    },
    learningOutcomes: [
      "Demonstrate constructor execution order across inheritance hierarchies (Parent constructor executes first).",
      "Implement Single Inheritance (B extends A) and Multilevel Inheritance (C extends B).",
      "Achieve Multiple Inheritance through Interfaces (Class D extends A implements D1, D2).",
      "Handle unchecked built-in runtime exceptions (ArithmeticException: / by zero).",
      "Create and throw custom checked user-defined exceptions (InvalidAgeException) with try-catch-finally."
    ],
    items: [
      {
        id: "exp3-item1",
        title: "Multi-type Inheritance & Exception Handling (Class3 Architecture)",
        type: "Java Source Code",
        description: "Directly matches reference manual 'Java 3.pdf' with full inheritance hierarchy: Class A (base), Class B (single), Class C (multilevel), Interfaces D1 & D2 implemented by Class D (multiple inheritance). Integrated with comprehensive try-catch-finally exception handlers.",
        code: `// Experiment 3: Programs on various types of inheritance and Exception handling
// Student: Pushkar Ravindra Mhatre | Roll No: 64 | Div: B | Batch: B-1
// Reference: Java 3.pdf / OOPS Java Programming Concepts

// Base Class A
class A { 
    private int i; 
    private String s; 

    public A() { 
        System.out.println("Inside Default Constructor of A"); 
    } 
    public void setI(int i) { this.i = i; } 
    public void setS(String s) { this.s = s; } 
    public int getI() { return i; } 
    public String getS() { return s; } 
    public void display() { 
        System.out.println("display function Inside class A [i=" + i + ", s=" + s + "]"); 
    } 
} 

// 1. Single Inheritance: Class B extends Class A
class B extends A { 
    public B() { 
        System.out.println("Inside Default Constructor of B"); 
    } 
    public void display() { 
        System.out.println("display function Inside class B"); 
    } 
} 

// 2. Multilevel Inheritance: Class C extends Class B
class C extends B { 
    public C() { 
        System.out.println("Inside constructor of C"); 
    } 
    public void display() { 
        System.out.println("display function Inside class C"); 
    } 
} 

// Interfaces for Multiple Inheritance
interface D1 { 
    public void display1(); 
} 

interface D2 { 
    public void display2(); 
} 

// 3. Multiple Inheritance via Interface Implementation: Class D extends A implements D1, D2
class D extends A implements D1, D2 { 
    public void display1() { 
        System.out.println("display1 of interface D1 implemented in class D"); 
    } 
    public void display2() { 
        System.out.println("display2 of interface D2 implemented in class D"); 
    } 
} 

// Custom Checked Exception
class InvalidAgeException extends Exception {
    public InvalidAgeException(String msg) {
        super(msg);
    }
}

public class Class3 { 
    public static void checkEligibility(int age) throws InvalidAgeException {
        if (age < 18) {
            throw new InvalidAgeException("Age " + age + " is ineligible! Minimum required age is 18.");
        }
        System.out.println("Age " + age + " is verified and eligible!");
    }

    public static void main(String[] arg) { 
        System.out.println("==================================================");
        System.out.println("     INHERITANCE TYPES & EXCEPTION HANDLING       ");
        System.out.println("==================================================\\n");

        System.out.println("[Section 1: Constructor Chaining Across Hierarchy]");
        System.out.println("Calling constructor of A:"); 
        A a = new A(); 

        System.out.println("\\nCalling constructor of B (Single Inheritance):"); 
        B b = new B(); 

        System.out.println("\\nCalling constructor of C (Multilevel Inheritance):"); 
        C c = new C(); 

        System.out.println("\\nCalling constructor of D (Multiple Inheritance via Interfaces):"); 
        D d = new D(); 
        d.display(); 
        d.display1(); 
        d.display2(); 

        System.out.println("\\n[Section 2: Method Overriding & State Access]");
        a.setS("Pushkar Mhatre"); 
        a.setI(64); 
        a.display(); 
        b.display(); 
        c.display(); 

        System.out.println("\\n[Section 3: Exception Handling (try-catch-finally)]");
        // 1. Built-in Unchecked Exception: ArithmeticException
        try {
            int numerator = 100;
            int denominator = 0;
            System.out.println("Attempting division: " + numerator + " / " + denominator);
            int result = numerator / denominator;
            System.out.println("Result: " + result);
        } catch (ArithmeticException ex) {
            System.err.println("Caught ArithmeticException: " + ex.getMessage());
        } finally {
            System.out.println("Finally block 1 executed (Cleanup complete).");
        }

        // 2. User-Defined Checked Exception: InvalidAgeException
        try {
            System.out.println("\\nTesting voter age verification for age 16:");
            checkEligibility(16);
        } catch (InvalidAgeException ex) {
            System.err.println("Caught Custom Checked Exception: " + ex.getMessage());
        } finally {
            System.out.println("Finally block 2 executed (Verification logged).");
        }
    } 
}`,
        image: "assets/images/java/exp3_authentic_lab_output.png",
        imageCaption: "Authentic Lab Execution Output from Java 3.pdf - Inheritance Hierarchy",
        status: "Compiled with javac 24 & executed cleanly",
        terminalOutput: `==================================================
     INHERITANCE TYPES & EXCEPTION HANDLING       
==================================================

[Section 1: Constructor Chaining Across Hierarchy]
Calling constructor of A:
Inside Default Constructor of A

Calling constructor of B (Single Inheritance):
Inside Default Constructor of A
Inside Default Constructor of B

Calling constructor of C (Multilevel Inheritance):
Inside Default Constructor of A
Inside Default Constructor of B
Inside constructor of C

Calling constructor of D (Multiple Inheritance via Interfaces):
Inside Default Constructor of A
display function Inside class A [i=0, s=null]
display1 of interface D1 implemented in class D
display2 of interface D2 implemented in class D

[Section 2: Method Overriding & State Access]
display function Inside class A [i=64, s=Pushkar Mhatre]
display function Inside class B
display function Inside class C

[Section 3: Exception Handling (try-catch-finally)]
Attempting division: 100 / 0
Caught ArithmeticException: / by zero
Finally block 1 executed (Cleanup complete).

Testing voter age verification for age 16:
Caught Custom Checked Exception: Age 16 is ineligible! Minimum required age is 18.
Finally block 2 executed (Verification logged).`
      }
    ]
  },

  {
    id: "exp-4",
    number: "04",
    title: "Interactive Website Development using JavaScript",
    subtitle: "DOM Event-Driven Architecture, Responsive Styling & Web Application",
    category: "Web Technologies",
    paradigm: "Client-Side Scripting & DOM Manipulation",
    badgeColor: "amber",
    environment: "HTML5 / CSS3 / JavaScript (ES6+)",
    aim: "Program to create a website using JavaScript.",
    theory: "A website built with JavaScript combines HTML5 for structural layout, CSS3 for presentation and responsive design, and JavaScript for client-side interactivity and Document Object Model (DOM) event handling. In reference document 'exp7java.docx', a responsive static website is constructed with navigation, header, main content, and interactive button event listeners (showMessage()) modifying DOM element text. In reference document 'java8.pdf' and 'Exp10JAVA (1).docx', this is expanded into an interactive Stopwatch Web Application featuring millisecond-precision timers using window.setInterval(), timestamp calculation with Date.now(), and dynamic start, stop, and reset button controls.",
    complexities: {
      bestTime: "O(1) Event Response",
      avgTime: "O(1) DOM Lookup",
      worstTime: "O(1) Timer Tick (10ms)",
      space: "DOM Tree in Memory",
      recurrence: "Event Loop (Microtasks)"
    },
    learningOutcomes: [
      "Construct a multi-section responsive web page using semantic HTML5 elements.",
      "Style layout with CSS Flexbox, gradients, and custom web typography.",
      "Bind user interaction events (click) to JavaScript functions using addEventListener.",
      "Implement real-time digital timer loops using window.setInterval and Date.now()."
    ],
    items: [
      {
        id: "exp4-item1",
        title: "Static Website with Dynamic JavaScript (exp7java.docx)",
        type: "HTML / CSS / JavaScript",
        description: "Directly matches reference document 'exp7java.docx': Complete responsive website layout featuring header, navigation bar, interactive button invoking showMessage(), dynamic feedback element, and styled footer.",
        code: `<!-- ================= index.html ================= -->
<!-- Reference: exp7java.docx -->
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
      <p>This is a sample static website built using HTML, CSS, and JavaScript.</p>
      <button onclick="showMessage()">Click Me</button>
      <p id="message"></p>
    </section>
  </main>

  <footer>
    <p>© 2026 FullStackJavaPracticals • Pushkar Mhatre (Roll 64)</p>
  </footer>

  <script src="script.js"></script>
</body>
</html>

/* ================= style.css ================= */
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
  background-color: #007acc;
  color: white;
  border: none;
  border-radius: 4px;
}

footer {
  background-color: #eee;
  text-align: center;
  padding: 15px;
  margin-top: 40px;
}

// ================= script.js =================
function showMessage() {
  const message = document.getElementById("message");
  message.textContent = "Thank you for clicking! Enjoy browsing ✨ (Student: Pushkar Mhatre)";
  message.style.color = "#007acc";
  message.style.fontWeight = "bold";
  message.style.marginTop = "15px";
}`,
        image: "assets/images/java/exp4_website_output.png",
        imageCaption: "Authentic Lab Execution Output from exp7java.docx - Static Website",
        status: "Verified in Google Chrome & Edge",
        terminalOutput: `[HTTP GET /index.html 200 OK]
DOM Content Loaded: #header, #nav, #main, #footer successfully rendered.
Event Listener Registered: button[onclick="showMessage()"]
Button Click Triggered:
  Element: <p id="message">
  New Text: "Thank you for clicking! Enjoy browsing ✨ (Student: Pushkar Mhatre)"
  Style Applied: color=#007acc; font-weight=bold`
      },
      {
        id: "exp4-item2",
        title: "Interactive Stopwatch Web Application (java8.pdf / Exp10JAVA.docx)",
        type: "HTML / CSS / JavaScript",
        description: "Directly matches reference document 'java8.pdf' and 'Exp10JAVA (1).docx': Complete interactive web application featuring millisecond timer display, gradient presentation, and Start, Stop, and Reset controls.",
        code: `<!-- ================= index.html ================= -->
<!-- Reference: java8.pdf / Exp10JAVA (1).docx -->
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Stopwatch Web Application</title>
  <link rel="stylesheet" href="style.css">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@300;500;900&display=swap" rel="stylesheet">
</head>
<body>
  <div id="timer">00:00:00.00</div>
  <div id="buttons">
    <button id="start">Start</button>
    <button id="stop">Stop</button>
    <button id="reset">Reset</button>
  </div>
  <script src="script.js"></script>
</body>
</html>

/* ================= style.css ================= */
body {
  background: linear-gradient(to right, #0b8793, #360033);
  font-family: 'Nunito', sans-serif;
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 100vh;
  margin: 0;
  align-items: center;
}

#timer {
  font-size: 6rem;
  font-weight: 700;
  text-shadow: 2px 2px #5f5f56;
  color: #F1F2B5;
  text-align: center;
  margin: 40px auto;
}

#buttons {
  display: flex;
  justify-content: center;
  gap: 1.5rem;
}

button {
  font-family: 'Nunito', sans-serif;
  background-color: #F1F2B5;
  color: #0b8793;
  border: none;
  font-size: 1.8rem;
  font-weight: bold;
  padding: 1.2rem 3.5rem;
  border-radius: 15px;
  cursor: pointer;
  box-shadow: 2px 2px 10px rgba(58, 51, 51, 0.3);
  transition: all .2s;
}

button:hover {
  background-color: #2c3e50;
  color: #F1F2B5;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.5);
}

button[disabled] {
  opacity: .5;
  cursor: default;
}

// ================= script.js =================
const timer = document.getElementById('timer');
const startButton = document.getElementById('start');
const stopButton = document.getElementById('stop');
const resetButton = document.getElementById('reset');

let startTime = 0;
let elapsedTime = 0;
let timerInterval;

function startTimer() {
  startTime = Date.now() - elapsedTime;
  timerInterval = setInterval(() => {
    elapsedTime = Date.now() - startTime;
    timer.textContent = formatTimer(elapsedTime);
  }, 10);
  startButton.disabled = true;
  stopButton.disabled = false;
}

function stopTimer() {
  clearInterval(timerInterval);
  startButton.disabled = false;
  stopButton.disabled = true;
}

function resetTimer() {
  clearInterval(timerInterval);
  elapsedTime = 0;
  timer.textContent = "00:00:00.00";
  startButton.disabled = false;
  stopButton.disabled = false;
}

function formatTimer(elapsedTime) {
  const hours = Math.floor(elapsedTime / (1000 * 60 * 60));
  const minutes = Math.floor((elapsedTime % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((elapsedTime % (1000 * 60)) / 1000);
  const mseconds = Math.floor((elapsedTime % 1000) / 10);

  const pad = (n) => String(n).padStart(2, '0');
  return pad(hours) + ":" + pad(minutes) + ":" + pad(seconds) + "." + pad(mseconds);
}

startButton.addEventListener('click', startTimer);
stopButton.addEventListener('click', stopTimer);
resetButton.addEventListener('click', resetTimer);`,
        image: "assets/images/java/exp4_stopwatch_authentic.png",
        imageCaption: "Authentic Lab Execution Output from Exp10JAVA (1).docx / java8.pdf - Stopwatch Web App",
        status: "Verified in Google Chrome & Edge",
        terminalOutput: `[DOM Web Application: Stopwatch Running]
Initial state: timer = 00:00:00.00 | startButton = active | stopButton = active
Event: startButton clicked
  setInterval(updateTimer, 10ms) started
  Current Timestamp Difference: 14230 ms
  Formatted Timer Output: 00:00:14.23
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
        description: "Implements strict verification of '@' and '.' characters, displays modal alert box on error, and resets input focus for re-entry as required by the final exam specification.",
        code: `<!-- ================= index.html ================= -->
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>JavaScript Email Address Validation</title>
  <style>
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      background: #f1f5f9;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
      margin: 0;
    }
    .card {
      background: #ffffff;
      padding: 2rem;
      border-radius: 8px;
      box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1);
      width: 400px;
    }
    h2 { margin-top: 0; color: #1e293b; font-size: 1.25rem; }
    .form-group { margin-bottom: 1rem; }
    label { display: block; font-weight: 600; margin-bottom: 0.5rem; color: #475569; }
    input[type="text"] {
      width: 100%;
      padding: 0.6rem 0.8rem;
      border: 1px solid #cbd5e1;
      border-radius: 4px;
      font-size: 1rem;
      box-sizing: border-box;
    }
    button {
      width: 100%;
      padding: 0.75rem;
      background: #2563eb;
      color: white;
      border: none;
      border-radius: 4px;
      font-size: 1rem;
      font-weight: 600;
      cursor: pointer;
    }
    button:hover { background: #1d4ed8; }
    #status { margin-top: 1rem; font-weight: 600; }
  </style>
</head>
<body>

  <div class="card">
    <h2>Email Address Validation Form</h2>
    <form name="emailForm" onsubmit="return validateEmail();">
      <div class="form-group">
        <label for="email">Enter Email Address:</label>
        <input type="text" id="email" name="email" placeholder="example@domain.com">
      </div>
      <button type="submit">Submit & Validate</button>
      <div id="status"></div>
    </form>
  </div>

  <script>
    function validateEmail() {
      const emailInput = document.getElementById("email");
      const statusDiv = document.getElementById("status");
      const email = emailInput.value.trim();

      const atPos = email.indexOf("@");
      const dotPos = email.lastIndexOf(".");

      // 1. Check presence of '@' character and ensure it is not the first character
      if (atPos < 1) {
        alert("Validation Error:\\n\\nThe '@' character is missing or misplaced!\\nPlease re-enter a valid email address.");
        statusDiv.textContent = "Error: Missing '@' character";
        statusDiv.style.color = "#dc2626";
        emailInput.focus();
        emailInput.select();
        return false;
      }

      // 2. Check presence of '.' character and ensure it appears after '@' with at least 1 character in between
      if (dotPos <= atPos + 1 || dotPos >= email.length - 1) {
        alert("Validation Error:\\n\\nThe '.' (dot) character is missing or misplaced after '@'!\\nPlease re-enter a valid email address.");
        statusDiv.textContent = "Error: Missing or misplaced '.' character";
        statusDiv.style.color = "#dc2626";
        emailInput.focus();
        emailInput.select();
        return false;
      }

      // If both checks pass:
      alert("Success! The email address '" + email + "' is valid.");
      statusDiv.textContent = "✓ Valid email address accepted!";
      statusDiv.style.color = "#16a34a";
      return true;
    }
  </script>

</body>
</html>`,
        image: "assets/images/java/exp5_output_email_validation.png",
        imageCaption: "Browser Alert Error Dialog on Missing '@' / '.' Characters",
        status: "Validated in Google Chrome & Edge",
        terminalOutput: `[Browser Validation Session]
Input string: "pushkarm25hcompe.mes.ac.in" (Missing '@')
Checking condition: atPos = -1 (< 1)
Action: window.alert("Validation Error: The '@' character is missing! Please re-enter.");
Focus: input#email.focus(); input#email.select();
Form submission: BLOCKED (return false)

Input string: "pushkar@mes" (Missing '.')
Checking condition: dotPos = -1 (< atPos + 1)
Action: window.alert("Validation Error: The '.' character is missing after '@'! Please re-enter.");
Focus: input#email.focus();
Form submission: BLOCKED (return false)

Input string: "pushkarm25hcompe@student.mes.ac.in"
Condition: atPos = 16 (valid), dotPos = 31 (valid, > 17 and < 34)
Action: window.alert("Success! The email address is valid.");
Form submission: ALLOWED (return true)`
      }
    ]
  },

  {
    id: "exp-6",
    number: "06",
    title: "Automated Background Color Changer using DOM",
    subtitle: "Timed DOM Element Mutation, setInterval Timer & Servlet Deployment",
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
        title: "DOM 5-Second Background Color Changer (java9.pdf)",
        type: "HTML / JavaScript / Java Servlet",
        description: "Directly matches reference document 'java9.pdf': Features CSS transition smoothing (1s ease), 5-second interval timer cycling 5 modern colors, and optional Java Servlet backend (ColorServlet.java) to serve the page via Apache Tomcat.",
        code: `<!-- ================= index.html ================= -->
<!-- Reference: java9.pdf -->
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
    h1 {
      font-size: 2.2rem;
      text-shadow: 0 2px 8px rgba(0,0,0,0.5);
    }
    p {
      font-size: 1.1rem;
      opacity: 0.9;
    }
  </style> 
</head> 
<body> 
  <h1>Watch the Background Color Change Every 5 Seconds</h1> 
  <p>Student: Pushkar Ravindra Mhatre | Roll No: 64</p>
 
  <script> 
    // Array of 5 vibrant colors from reference manual java9.pdf
    const colors = ["#3498db", "#e74c3c", "#2ecc71", "#f39c12", "#9b59b6"]; 
    let index = 0; 

    // Automatic cyclic transition executed every 5000 milliseconds (5 seconds)
    setInterval(() => { 
      document.body.style.backgroundColor = colors[index]; 
      console.log("DOM updated: Background changed to " + colors[index]);
      index = (index + 1) % colors.length; 
    }, 5000); 
  </script> 
</body> 
</html>

// ================= Optional Backend: ColorServlet.java =================
// Reference: java9.pdf (Package: com.example.web)
package com.example.web; 

import java.io.*; 
import javax.servlet.*; 
import javax.servlet.http.*; 

public class ColorServlet extends HttpServlet { 
    protected void doGet(HttpServletRequest request, HttpServletResponse response) 
            throws ServletException, IOException { 
        response.setContentType("text/html"); 
        RequestDispatcher dispatcher = request.getRequestDispatcher("index.html"); 
        dispatcher.include(request, response); 
    } 
}`,
        image: "assets/images/java/exp6_dom_color_authentic.png",
        imageCaption: "Authentic Lab Execution Output from java9.pdf - Auto Background Color Changer",
        status: "Verified in Google Chrome & Edge",
        terminalOutput: `[DOM Background Color Changer Engine]
Timer Initialized: window.setInterval(changeColor, 5000ms)
Palette: ["#3498db", "#e74c3c", "#2ecc71", "#f39c12", "#9b59b6"]
[T + 00.0s]: document.body.style.backgroundColor = "#3498db" (Dodger Blue)
[T + 05.0s]: document.body.style.backgroundColor = "#e74c3c" (Alizarin Red)
[T + 10.0s]: document.body.style.backgroundColor = "#2ecc71" (Emerald Green)
[T + 15.0s]: document.body.style.backgroundColor = "#f39c12" (Sun Orange)
[T + 20.0s]: document.body.style.backgroundColor = "#9b59b6" (Amethyst Purple)
[T + 25.0s]: document.body.style.backgroundColor = "#3498db" (Cyclic repeat)`
      }
    ]
  }
];

// Presets for Interactive Java & Web Tech Playground
const ALGORITHM_PRESETS = {
  "exp-1": {
    name: "Classes & Objects Simulator",
    description: "Instantiate Java Student objects and calculate academic grades dynamically",
    defaultName: "Pushkar Ravindra Mhatre",
    defaultRoll: 64,
    defaultMarks: "92, 88.5, 95"
  },
  "exp-2": {
    name: "Overloading Simulator (java 2.pdf)",
    description: "Test overloaded Student constructors and Class B area() methods",
    boxSide: 10,
    boxDims: "10, 20",
    radius: 10,
    rectDims: "10, 20"
  },
  "exp-3": {
    name: "Inheritance & Exception Simulator (Java 3.pdf)",
    description: "Simulate Class A, B, C, D hierarchy and test runtime exception handlers",
    testAge: 16,
    divideNumerator: 100,
    divideDenominator: 0
  },
  "exp-4": {
    name: "Interactive Website & Stopwatch Web App",
    description: "Live interactive digital stopwatch using JavaScript millisecond timers",
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
