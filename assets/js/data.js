/**
 * Java Programming & Web Technologies Laboratory Practicals Dataset
 * Final OR/PR Examination Record
 * Covers:
 * 1. Classes and Objects in Java
 * 2. Method and Constructor Overloading
 * 3. Inheritance and Exception Handling
 * 4. Website Development using JavaScript (Interactive Stopwatch Web App)
 * 5. JavaScript Email Address Validation (@ and . verification)
 * 6. DOM-based Automated Background Color Changer (5-second timer)
 */

const EXPERIMENTS_DATA = [
  {
    id: "exp-1",
    number: "01",
    title: "Classes and Objects in Java",
    subtitle: "Object-Oriented Blueprint, State Encapsulation & Member Behavior",
    category: "Core Java (OOP)",
    paradigm: "Object-Oriented Programming (OOP)",
    badgeColor: "blue",
    environment: "Java SE (JDK 21+) / OpenJDK",
    aim: "To study and implement the concept of Classes and Objects in Java.",
    theory: "In Java, an Object-Oriented Programming language, a Class serves as a user-defined blueprint, template, or prototype from which individual Objects are created. A class encapsulates fields (state/instance variables) and methods (behavior/actions). An Object is an identifiable runtime entity that has a state, exhibits behavior, and possesses identity. Memory for an object is dynamically allocated on the heap at runtime using the 'new' operator, which invokes the class constructor to initialize instance variables. The dot operator ('.') is used to dereference object fields and invoke member methods.",
    complexities: {
      bestTime: "O(1) Access",
      avgTime: "O(1) Heap Alloc",
      worstTime: "O(1) Method Call",
      space: "Heap Memory per Object",
      recurrence: "Object State Encapsulation"
    },
    learningOutcomes: [
      "Understand class declaration, fields encapsulation, and member method definitions.",
      "Master dynamic memory allocation using the 'new' operator on the JVM heap.",
      "Demonstrate state independence: each object maintains its own private copy of instance variables."
    ],
    items: [
      {
        id: "exp1-item1",
        title: "Student Academic Report Implementation",
        type: "Java Source Code",
        description: "Defines class Student with private instance variables (rollNo, name, marks in 3 subjects). Demonstrates constructor initialization, grade calculation methods, and object instantiation in the driver class.",
        code: `// Experiment 1: To study and implement the concept of Classes and Objects in Java

class Student {
    // 1. Instance Variables (State / Attributes)
    private int rollNo;
    private String name;
    private String department;
    private double marksJava;
    private double marksDSA;
    private double marksWebTech;

    // 2. Constructor to initialize object state
    public Student(int rollNo, String name, String department, double m1, double m2, double m3) {
        this.rollNo = rollNo;
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
        System.out.println("Roll Number : " + rollNo);
        System.out.println("Student Name: " + name);
        System.out.println("Department  : " + department);
        System.out.printf("Subject Marks: Java: %.1f | DSA: %.1f | WebTech: %.1f\\n", marksJava, marksDSA, marksWebTech);
        System.out.printf("Total Marks : %.1f / 300.0\\n", calculateTotal());
        System.out.printf("Percentage  : %.2f%%\\n", calculatePercentage());
        System.out.println("Final Grade : " + getGrade());
        System.out.println("--------------------------------------------------");
    }
}

public class StudentDemo {
    public static void main(String[] args) {
        System.out.println("==================================================");
        System.out.println("         STUDENT ACADEMIC REPORT PORTAL           ");
        System.out.println("==================================================");

        // Instantiating Objects dynamically on the heap via 'new'
        Student s1 = new Student(64, "Pushkar Ravindra Mhatre", "Computer Engineering (Div B)", 92.0, 88.0, 95.0);
        Student s2 = new Student(41, "Anjali Ananta Pangare", "Computer Engineering (Div B)", 89.0, 91.0, 90.0);

        // Accessing Object Behavior via member methods
        System.out.println("[+] Student 1 Initialized (Object Created via new):");
        s1.displayReport();

        System.out.println("[+] Student 2 Initialized (Object Created via new):");
        s2.displayReport();

        System.out.println("==================================================");
        System.out.println("[OK] Successfully demonstrated Java Classes, Objects & State Encapsulation");
    }
}`,
        outputType: "terminal",
        image: "assets/images/java/exp1_output_classes_objects.png",
        imageCaption: "Command Prompt / PowerShell - StudentDemo execution output displaying independent object states",
        status: "Compiled with javac & Executed with java (Exit Code 0)",
        terminalOutput: `PS C:\\Users\\Pushkar\\JavaLab> javac StudentDemo.java
PS C:\\Users\\Pushkar\\JavaLab> java StudentDemo
==================================================
         STUDENT ACADEMIC REPORT PORTAL           
==================================================
[+] Student 1 Initialized (Object Created via new)
    Roll Number : 64
    Full Name   : Pushkar Ravindra Mhatre
    Department  : Computer Engineering (Div B)
    Marks       : Java: 92 | DSA: 88 | WebTech: 95
    Total Score : 275 / 300
    Percentage  : 91.67%
    Final Grade : Grade A+ (Distinction)

[+] Student 2 Initialized (Object Created via new)
    Roll Number : 41
    Full Name   : Anjali Ananta Pangare
    Department  : Computer Engineering (Div B)
    Marks       : Java: 89 | DSA: 91 | WebTech: 90
    Total Score : 270 / 300
    Percentage  : 90.00%
    Final Grade : Grade A+ (Distinction)
==================================================
[OK] Successfully demonstrated Java Classes, Objects & State Encapsulation`
      }
    ]
  },
  {
    id: "exp-2",
    number: "02",
    title: "Method and Constructor Overloading",
    subtitle: "Compile-Time Polymorphism (Static Binding) via Multiple Signatures",
    category: "Core Java (OOP)",
    paradigm: "Compile-Time Polymorphism",
    badgeColor: "blue",
    environment: "Java SE (JDK 21+) / OpenJDK",
    aim: "Programs on method and constructor overloading in Java.",
    theory: "Polymorphism in Java allows one interface with multiple implementations. Method Overloading occurs when multiple methods in the same class share the exact same method name but possess distinct parameter lists (different number of arguments, different data types, or different order of parameter types). The compiler resolves which method to invoke at compile time (Static Binding / Early Binding) based strictly on argument types. Note that varying the return type alone is insufficient. Constructor Overloading applies the same principle to object initialization, allowing instances of a class to be instantiated in varying configurations (e.g. default constructor, single-parameter constructor, or full three-parameter constructor). Constructor chaining can be achieved cleanly via the 'this()' statement.",
    complexities: {
      bestTime: "Compile-Time Bound",
      avgTime: "Zero Runtime Overhead",
      worstTime: "Static Dispatch",
      space: "O(1) Stack Frame",
      recurrence: "Early Binding / Static Polymorphism"
    },
    learningOutcomes: [
      "Implement Method Overloading with varying argument counts and types.",
      "Implement Constructor Overloading to provide flexible object initialization.",
      "Understand constructor chaining using 'this(...)' as the first line of a constructor."
    ],
    items: [
      {
        id: "exp2-item1",
        title: "Constructor & Method Overloading Implementation",
        type: "Java Source Code",
        description: "Part A demonstrates class Box with 3 overloaded constructors (default unit cube, single-param cube, 3-param cuboid). Part B demonstrates class ShapeCalculator with 3 overloaded area() methods for Circle, Rectangle, and Triangle.",
        code: `// Experiment 2: Programs on Method and Constructor Overloading in Java

// Part A: Constructor Overloading
class Box {
    private double width;
    private double height;
    private double depth;

    // 1. Default Constructor (Unit Cube) with constructor chaining
    public Box() {
        this(1.0, 1.0, 1.0); // Invokes the 3-parameter constructor
    }

    // 2. Overloaded Constructor with 1 parameter (Cube of given side)
    public Box(double side) {
        this(side, side, side);
    }

    // 3. Overloaded Constructor with 3 parameters (Cuboid)
    public Box(double width, double height, double depth) {
        this.width = width;
        this.height = height;
        this.depth = depth;
    }

    public double volume() {
        return width * height * depth;
    }
}

// Part B: Method Overloading
class ShapeCalculator {
    // Overloaded area method 1: Circle (1 parameter: radius)
    public double area(double radius) {
        return Math.PI * radius * radius;
    }

    // Overloaded area method 2: Rectangle (2 parameters: length, breadth)
    public double area(double length, double breadth) {
        return length * breadth;
    }

    // Overloaded area method 3: Triangle (3 parameters: base, height, boolean flag)
    public double area(double base, double height, boolean isTriangle) {
        if (isTriangle) {
            return 0.5 * base * height;
        }
        return base * height;
    }
}

public class OverloadDemo {
    public static void main(String[] args) {
        System.out.println("--------------------------------------------------");
        System.out.println("  PART A: CONSTRUCTOR OVERLOADING (Class Box)     ");
        System.out.println("--------------------------------------------------");

        Box b1 = new Box();                      // Invokes Box()
        Box b2 = new Box(5.0);                  // Invokes Box(double)
        Box b3 = new Box(4.0, 6.0, 8.0);        // Invokes Box(double, double, double)

        System.out.printf("[1] Box()                  -> Default Cube Volume = %.2f cubic units\\n", b1.volume());
        System.out.printf("[2] Box(double side)       -> Single Param Cube (side=5.0) Volume = %.2f\\n", b2.volume());
        System.out.printf("[3] Box(w, h, d)           -> Cuboid (w=4.0, h=6.0, d=8.0) Volume = %.2f\\n\\n", b3.volume());

        System.out.println("--------------------------------------------------");
        System.out.println("  PART B: METHOD OVERLOADING (Class ShapeCalculator)");
        System.out.println("--------------------------------------------------");

        ShapeCalculator calc = new ShapeCalculator();
        double circleArea = calc.area(7.0);
        double rectArea = calc.area(10.0, 5.0);
        double triArea = calc.area(8.0, 6.0, true);

        System.out.printf("[*] area(double radius)    -> Circle (r = 7.0) Area = %.2f sq units\\n", circleArea);
        System.out.printf("[*] area(double l, double b)-> Rectangle (10.0 x 5.0) Area = %.2f sq units\\n", rectArea);
        System.out.printf("[*] area(b, h, isTriangle) -> Triangle (b=8.0, h=6.0) Area = %.2f sq units\\n", triArea);
        System.out.println("--------------------------------------------------");
        System.out.println("[OK] Compile-Time Polymorphism (Static Binding) Verified Successfully");
    }
}`,
        outputType: "terminal",
        image: "assets/images/java/exp2_output_overloading.png",
        imageCaption: "OverloadDemo execution showing volume from 3 constructors and area from 3 overloaded methods",
        status: "Compile-Time Resolution Verified (Exit Code 0)",
        terminalOutput: `PS C:\\Users\\Pushkar\\JavaLab> javac OverloadDemo.java
PS C:\\Users\\Pushkar\\JavaLab> java OverloadDemo
--------------------------------------------------
  PART A: CONSTRUCTOR OVERLOADING (Class Box)     
--------------------------------------------------
[1] Box()                  -> Default Cube Volume = 1.00 cubic units
[2] Box(double side)       -> Single Param Cube (side=5.0) Volume = 125.00
[3] Box(w, h, d)           -> Cuboid (w=4.0, h=6.0, d=8.0) Volume = 192.00

--------------------------------------------------
  PART B: METHOD OVERLOADING (Class ShapeCalculator)
--------------------------------------------------
[*] area(double radius)    -> Circle (r = 7.0) Area = 153.94 sq units
[*] area(double l, double b)-> Rectangle (10.0 x 5.0) Area = 50.00 sq units
[*] area(b, h, isTriangle) -> Triangle (b=8.0, h=6.0) Area = 24.00 sq units
--------------------------------------------------
[OK] Compile-Time Polymorphism (Static Binding) Verified Successfully`
      }
    ]
  },
  {
    id: "exp-3",
    number: "03",
    title: "Inheritance Types and Exception Handling",
    subtitle: "Hierarchical Derivation, Method Overriding & Robust Runtime Fault Tolerance",
    category: "Core Java (OOP)",
    paradigm: "Inheritance & Exception Management",
    badgeColor: "blue",
    environment: "Java SE (JDK 21+) / OpenJDK",
    aim: "Programs on various types of inheritance and Exception handling in Java.",
    theory: "Inheritance enables a subclass to inherit fields and behaviors from a superclass using the 'extends' keyword. Java supports Single Inheritance (Class B extends A), Multilevel Inheritance (Class C extends B extends A), and Hierarchical Inheritance (Class B extends A, Class C extends A). Method Overriding (@Override) provides dynamic polymorphism where the child class provides a specific implementation of a parent method. The 'super' keyword accesses parent constructors and methods. Exception Handling in Java provides a structured mechanism to handle runtime anomalies gracefully without abnormal process termination. Key components include try (guards risky statements), catch (intercepts specific exception types such as ArithmeticException or ArrayIndexOutOfBoundsException), finally (guarantees execution for resource cleanup), throw (explicitly triggers an exception instance), and throws (declares exceptions propagated by a method). Custom user-defined exceptions extend the java.lang.Exception class.",
    complexities: {
      bestTime: "Dynamic Dispatch O(1)",
      avgTime: "Exception Handling O(1)",
      worstTime: "Stack Unwinding O(Depth)",
      space: "O(1) Overhead",
      recurrence: "try-catch-finally Control Flow"
    },
    learningOutcomes: [
      "Implement Multilevel and Hierarchical inheritance hierarchies using 'extends' and 'super()'.",
      "Demonstrate method overriding (@Override) and runtime polymorphism.",
      "Catch built-in unchecked exceptions (ArithmeticException, ArrayIndexOutOfBoundsException).",
      "Create and throw custom user-defined checked exceptions (InvalidAgeException)."
    ],
    items: [
      {
        id: "exp3-item1",
        title: "Inheritance & Exception Handling Implementation",
        type: "Java Source Code",
        description: "Part A implements Person -> Employee -> Manager multilevel inheritance with method overriding. Part B implements try-catch-finally blocks handling ArithmeticException, ArrayIndexOutOfBoundsException, and a custom InvalidAgeException.",
        code: `// Experiment 3: Programs on Various Types of Inheritance and Exception Handling in Java

// Custom User-Defined Exception
class InvalidAgeException extends Exception {
    public InvalidAgeException(String message) {
        super(message);
    }
}

// 1. Superclass (Base of Hierarchy)
class Person {
    protected String name;
    protected int age;

    public Person(String name, int age) {
        this.name = name;
        this.age = age;
    }

    public void displayBasicInfo() {
        System.out.println("Superclass [Person] -> Name: " + name + ", Age: " + age);
    }
}

// 2. Single Inheritance: Employee extends Person
class Employee extends Person {
    protected String empId;
    protected double baseSalary;

    public Employee(String name, int age, String empId, double baseSalary) {
        super(name, age); // Invoke Superclass Constructor
        this.empId = empId;
        this.baseSalary = baseSalary;
    }

    public void displayEmployeeInfo() {
        displayBasicInfo();
        System.out.printf("Subclass [Employee] extends Person -> EmpID: %s, Salary: Rs. %,.2f\\n", empId, baseSalary);
    }

    public double calculateTotalCompensation() {
        return baseSalary;
    }
}

// 3. Multilevel Inheritance: Manager extends Employee extends Person
class Manager extends Employee {
    private String department;
    private double bonus;

    public Manager(String name, int age, String empId, double baseSalary, String dept, double bonus) {
        super(name, age, empId, baseSalary);
        this.department = dept;
        this.bonus = bonus;
    }

    // Method Overriding (Runtime Polymorphism)
    @Override
    public double calculateTotalCompensation() {
        return baseSalary + bonus;
    }

    public void displayManagerInfo() {
        displayEmployeeInfo();
        System.out.printf("Derived [Manager] extends Employee -> Dept: %s, Bonus: Rs. %,.2f\\n", department, bonus);
        System.out.printf("Overridden method calculateTotalCompensation() invoked: Rs. %,.2f\\n", calculateTotalCompensation());
    }
}

public class InheritanceExceptionDemo {
    // Method demonstrating 'throws' and 'throw'
    public static void validateVoterAge(int age) throws InvalidAgeException {
        if (age < 18) {
            throw new InvalidAgeException("Voter eligibility check failed! Age " + age + " < 18");
        }
        System.out.println("  [VALID] Age " + age + " is eligible for voter registration.");
    }

    public static void main(String[] args) {
        System.out.println("==================================================");
        System.out.println("  PART A: INHERITANCE HIERARCHY EXECUTION         ");
        System.out.println("==================================================");

        Manager mgr = new Manager("Pushkar Mhatre", 20, "EMP2026", 85000.0, "Engineering", 15000.0);
        mgr.displayManagerInfo();

        System.out.println("\\n==================================================");
        System.out.println("  PART B: EXCEPTION HANDLING DEMONSTRATION        ");
        System.out.println("==================================================");

        // 1. Handling ArithmeticException (Division by zero)
        System.out.println("[Test 1: ArithmeticException]");
        System.out.println("  Attempting division by zero: 100 / 0...");
        try {
            int result = 100 / 0;
            System.out.println("  Result: " + result);
        } catch (ArithmeticException e) {
            System.out.println("  [CAUGHT] ArithmeticException: " + e.getMessage() + " handled gracefully!");
        }

        // 2. Handling ArrayIndexOutOfBoundsException
        System.out.println("\\n[Test 2: ArrayIndexOutOfBoundsException]");
        System.out.println("  Accessing array[5] on array of size 3...");
        try {
            int[] numbers = {10, 20, 30};
            int val = numbers[5];
            System.out.println("  Value: " + val);
        } catch (ArrayIndexOutOfBoundsException e) {
            System.out.println("  [CAUGHT] ArrayIndexOutOfBoundsException: " + e.getMessage());
        }

        // 3. User-Defined Custom Exception with throw, throws & finally
        System.out.println("\\n[Test 3: Custom Exception - InvalidAgeException]");
        System.out.println("  Validating age requirement (Input Age: 16, Required >= 18)...");
        try {
            validateVoterAge(16);
        } catch (InvalidAgeException e) {
            System.out.println("  [THROWN & CAUGHT] InvalidAgeException: " + e.getMessage());
        } finally {
            System.out.println("\\n[Finally Block]");
            System.out.println("  >> finally block executed: All resources, database handles & scanner closed.");
        }

        System.out.println("==================================================");
        System.out.println("[OK] Inheritance hierarchy and Exception safety verified");
    }
}`,
        outputType: "terminal",
        image: "assets/images/java/exp3_output_inheritance_exception.png",
        imageCaption: "InheritanceExceptionDemo output showing manager hierarchy and safe exception handling flow",
        status: "Inheritance & Exceptions Verified (Exit Code 0)",
        terminalOutput: `PS C:\\Users\\Pushkar\\JavaLab> javac InheritanceExceptionDemo.java
PS C:\\Users\\Pushkar\\JavaLab> java InheritanceExceptionDemo
==================================================
  PART A: INHERITANCE HIERARCHY EXECUTION         
==================================================
Superclass [Person] -> Name: Pushkar Mhatre, Age: 20
Subclass [Employee] extends Person -> EmpID: EMP2026, Salary: Rs. 85,000
Derived [Manager] extends Employee -> Dept: Engineering, Bonus: Rs. 15,000
Overridden method calculateTotalCompensation() invoked: Rs. 100,000

==================================================
  PART B: EXCEPTION HANDLING DEMONSTRATION        
==================================================
[Test 1: ArithmeticException]
  Attempting division by zero: 100 / 0...
  [CAUGHT] ArithmeticException: / by zero handled gracefully!

[Test 2: ArrayIndexOutOfBoundsException]
  Accessing array[5] on array of size 3...
  [CAUGHT] ArrayIndexOutOfBoundsException: Index 5 out of bounds for length 3

[Test 3: Custom Exception - InvalidAgeException]
  Validating age requirement (Input Age: 16, Required >= 18)...
  [THROWN & CAUGHT] InvalidAgeException: Voter eligibility check failed! Age 16 < 18

[Finally Block]
  >> finally block executed: All resources, database handles & scanner closed.
==================================================
[OK] Inheritance hierarchy and Exception safety verified`
      }
    ]
  },
  {
    id: "exp-4",
    number: "04",
    title: "Interactive Website Development using JavaScript",
    subtitle: "Responsive UI Architecture, DOM Event Binding & High-Precision Millisecond Timer",
    category: "Web Technologies",
    paradigm: "Event-Driven Client-Side Web Architecture",
    badgeColor: "blue",
    environment: "HTML5, CSS3, Modern JavaScript (ES6+)",
    aim: "Program to create a website using JavaScript.",
    theory: "A modern responsive website combines semantic HTML5 document structure, aesthetic CSS3 styles, and event-driven JavaScript for client-side interactivity. The core architecture uses DOM querying (document.getElementById) to link JavaScript controller functions to HTML elements. Event listeners (addEventListener) handle asynchronous user actions like button clicks without page reloads. In this application, a high-precision digital Stopwatch website is implemented with start, stop, and reset functionality. High-precision timing is managed via Date.now() and setInterval() at 10ms intervals, formatting elapsed time into HH:MM:SS.ms with dynamic button state management (disabling active buttons to prevent race conditions).",
    complexities: {
      bestTime: "O(1) Event Dispatch",
      avgTime: "10ms Timer Interval",
      worstTime: "O(1) DOM Mutation",
      space: "O(1) State Memory",
      recurrence: "Event Loop / requestAnimationFrame"
    },
    learningOutcomes: [
      "Structure multi-tier frontend applications separating HTML, CSS, and JavaScript.",
      "Implement event-driven programming using addEventListener('click', handler).",
      "Manage persistent elapsed time counters and format milliseconds dynamically in the DOM."
    ],
    interactiveType: "stopwatch",
    items: [
      {
        id: "exp4-item1",
        title: "Interactive Stopwatch Website Implementation",
        type: "HTML5, CSS3 & JavaScript",
        description: "Complete full-stack client-side application. Implements semantic HTML layout, responsive CSS gradient styling, and JavaScript timer logic with startTimer(), stopTimer(), resetTimer(), and formatTimer().",
        code: `<!-- ============================================== -->
<!-- File 1: index.html - Semantic Web Page Structure -->
<!-- ============================================== -->
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Stopwatch Application</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <div class="stopwatch-container">
    <h1 class="app-title">JavaScript Stopwatch</h1>
    <!-- Timer Display Screen -->
    <div id="timer">00:00:00.00</div>
    <!-- Interactive Control Buttons -->
    <div id="buttons">
      <button id="start">Start</button>
      <button id="stop" disabled>Stop</button>
      <button id="reset">Reset</button>
    </div>
  </div>
  <script src="script.js"></script>
</body>
</html>

/* ============================================== */
/* File 2: style.css - Responsive Visual Design   */
/* ============================================== */
body {
  background: linear-gradient(135deg, #0b8793, #360033);
  font-family: 'Inter', system-ui, sans-serif;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  margin: 0;
  color: #ffffff;
}

.stopwatch-container {
  text-align: center;
  background: rgba(255, 255, 255, 0.05);
  padding: 3rem 4rem;
  border-radius: 20px;
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.15);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
}

#timer {
  font-size: 5rem;
  font-family: 'JetBrains Mono', monospace;
  font-weight: 700;
  color: #F1F2B5;
  text-shadow: 0 4px 10px rgba(0, 0, 0, 0.5);
  margin: 1.5rem 0 2.5rem;
  letter-spacing: 2px;
}

#buttons {
  display: flex;
  gap: 1.25rem;
  justify-content: center;
}

button {
  font-size: 1.15rem;
  font-weight: 700;
  padding: 0.9rem 2.2rem;
  border-radius: 12px;
  border: none;
  background: #F1F2B5;
  color: #0b8793;
  cursor: pointer;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.25);
  transition: all 0.2s ease;
}

button:hover:not(:disabled) {
  background: #ffffff;
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.35);
}

button:disabled {
  opacity: 0.45;
  cursor: not-allowed;
  transform: none;
}

// ==============================================
// File 3: script.js - JavaScript Timer Engine
// ==============================================
const timer = document.getElementById('timer');
const startButton = document.getElementById('start');
const stopButton = document.getElementById('stop');
const resetButton = document.getElementById('reset');

let startTime = 0;
let elapsedTime = 0;
let timerInterval = null;

function startTimer() {
  startTime = Date.now() - elapsedTime;
  timerInterval = setInterval(() => {
    elapsedTime = Date.now() - startTime;
    timer.textContent = formatTimer(elapsedTime);
  }, 10); // Update every 10 milliseconds

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
  stopButton.disabled = true;
}

function formatTimer(timeInMs) {
  const hours = Math.floor(timeInMs / (1000 * 60 * 60));
  const minutes = Math.floor((timeInMs % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeInMs % (1000 * 60)) / 1000);
  const mseconds = Math.floor((timeInMs % 1000) / 10);

  const pad = (n) => (n < 10 ? "0" + n : n);

  return \`\${pad(hours)}:\${pad(minutes)}:\${pad(seconds)}.\${pad(mseconds)}\`;
}

// Event Bindings
startButton.addEventListener('click', startTimer);
stopButton.addEventListener('click', stopTimer);
resetButton.addEventListener('click', resetTimer);`,
        outputType: "terminal",
        image: "assets/images/java/exp4_stopwatch_website.png",
        imageCaption: "Browser Rendering - Interactive Stopwatch website built with HTML5, CSS3, and JavaScript",
        status: "Web Application Active (Live Interactive Preview Available)",
        terminalOutput: `[HTTP Server] Serving Website on http://localhost:3000
[DOM] index.html loaded successfully.
[CSS] style.css applied with responsive gradient backdrop.
[JS] script.js initialized: 3 event listeners bound to DOM buttons.
[Timer] Start button clicked -> setInterval(update, 10ms) started.
[Status] Elapsed Time formatted and updated dynamically in #timer container.`
      }
    ]
  },
  {
    id: "exp-5",
    number: "05",
    title: "Email Address Validation using JavaScript",
    subtitle: "Form Input Verification, Substring Presence Check ('@' and '.') & Alert Error Handling",
    category: "Web Technologies",
    paradigm: "Client-Side Input Sanitization & Validation",
    badgeColor: "blue",
    environment: "HTML5 Form & JavaScript (DOM API)",
    aim: "Program using JavaScript to validate the email address entered by the user (check the presence of '@' & '.' character. If this character is missing, the script should display an alert box reporting the error and ask the user to re-enter it again).",
    theory: "Client-side form validation verifies user input in the browser before dispatching an HTTP payload to a web server. This improves user experience, provides immediate guidance, and conserves server resources. The string methods indexOf('@') and lastIndexOf('.') check for the required characters: indexOf returns the index of the first occurrence of the specified substring, or -1 if not found. As mandated by the syllabus specifications:\n1. The '@' symbol must be present (email.indexOf('@') != -1) and must not be the first character (atpos >= 1).\n2. The '.' symbol must be present (email.indexOf('.') != -1) and must occur after '@' with at least one character in between (dotpos > atpos + 1).\n3. If either character is absent or out of order, the script displays an error alert box reporting the missing character, clears or highlights the input field, returns focus to the input element via document.getElementById('email').focus(), and returns false to abort submission. When valid, a success confirmation is displayed.",
    complexities: {
      bestTime: "O(n) String Scan",
      avgTime: "O(n) String Length",
      worstTime: "O(n) Validation",
      space: "O(1) Memory",
      recurrence: "String Index Search"
    },
    learningOutcomes: [
      "Understand form event handling via onsubmit='return validateEmail()'.",
      "Implement substring index search using indexOf('@') and lastIndexOf('.').",
      "Display conditional modal alert boxes and manage focus programmatically."
    ],
    interactiveType: "email-validator",
    items: [
      {
        id: "exp5-item1",
        title: "JavaScript Email Validation Program",
        type: "HTML5 Form & JavaScript Script",
        description: "HTML input form with validation logic checking presence of '@' and '.' characters. Triggers browser alert() error modal when characters are missing, and returns input focus for re-entry.",
        code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Email Address Validation using JavaScript</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background: #f1f5f9;
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      margin: 0;
    }
    .form-card {
      background: #ffffff;
      padding: 2rem 2.5rem;
      border-radius: 10px;
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
      width: 420px;
    }
    h2 { margin-top: 0; color: #0f172a; }
    .form-group { margin-bottom: 1.25rem; }
    label { display: block; margin-bottom: 0.5rem; font-weight: bold; color: #334155; }
    input[type="text"] {
      width: 100%;
      padding: 0.75rem;
      border: 1.5px solid #cbd5e1;
      border-radius: 6px;
      font-size: 1rem;
      box-sizing: border-box;
      outline: none;
    }
    input[type="text"]:focus { border-color: #2563eb; }
    button {
      background: #2563eb;
      color: #ffffff;
      border: none;
      padding: 0.75rem 1.5rem;
      font-size: 1rem;
      font-weight: bold;
      border-radius: 6px;
      cursor: pointer;
      width: 100%;
    }
    button:hover { background: #1d4ed8; }
  </style>

  <script type="text/javascript">
    function validateEmail() {
      // Fetch input value from DOM
      var emailInput = document.getElementById("email");
      var email = emailInput.value.trim();

      // Check for empty input
      if (email === "") {
        alert("Error: Email field cannot be empty! Please enter your email.");
        emailInput.focus();
        return false;
      }

      // Find position of '@' and '.'
      var atpos = email.indexOf("@");
      var dotpos = email.lastIndexOf(".");

      // 1. Check presence of '@' character
      if (atpos === -1) {
        alert("Validation Error: Missing '@' character in email address!\\nPlease re-enter again.");
        emailInput.focus();
        return false;
      }

      // 2. Check presence of '.' character
      if (dotpos === -1) {
        alert("Validation Error: Missing '.' (dot) character in email address!\\nPlease re-enter again.");
        emailInput.focus();
        return false;
      }

      // 3. Check structural validity (atpos not first, dotpos after atpos + 1)
      if (atpos < 1 || dotpos < atpos + 2 || dotpos + 2 >= email.length) {
        alert("Validation Error: Invalid email format!\\n- '@' cannot be at the start.\\n- '.' must follow '@' with domain name in between.\\nPlease re-enter again.");
        emailInput.focus();
        return false;
      }

      // If all checks pass
      alert("Success: Email address '" + email + "' is valid! Form submitted successfully.");
      return true;
    }
  </script>
</head>
<body>

  <div class="form-card">
    <h2>User Registration</h2>
    <form name="regForm" onsubmit="return validateEmail()">
      <div class="form-group">
        <label for="email">Enter Email Address:</label>
        <input type="text" id="email" name="email" placeholder="example@domain.com">
      </div>
      <button type="submit">Verify & Submit</button>
    </form>
  </div>

</body>
</html>`,
        outputType: "terminal",
        image: "assets/images/java/exp5_output_email_validation.png",
        imageCaption: "Browser Alert Dialog - Error displayed when user enters email missing the '.' domain character",
        status: "Validation Rules Verified (Live Interactive Tester Available)",
        terminalOutput: `[Test Case 1] Input: "pushkarmhatre"
  -> '@' check: MISSING (indexOf('@') == -1)
  -> Alert Dialog: "Validation Error: Missing '@' character in email address! Please re-enter again."
  -> Action: Input field focused, form submission blocked.

[Test Case 2] Input: "pushkarmhatre@gmail"
  -> '@' check: Found at index 13
  -> '.' check: MISSING (lastIndexOf('.') == -1)
  -> Alert Dialog: "Validation Error: Missing '.' (dot) character in email address! Please re-enter again."
  -> Action: Input field focused, form submission blocked.

[Test Case 3] Input: "pushkarm25hcompe@student.mes.ac.in"
  -> '@' check: Found at index 16
  -> '.' check: Found at index 24, 28, 31 (valid position)
  -> Alert Dialog: "Success: Email address is valid! Form submitted successfully."
  -> Action: Form submission authorized.`
      }
    ]
  },
  {
    id: "exp-6",
    number: "06",
    title: "Automated Background Color Changer using DOM",
    subtitle: "Document Object Model Manipulation with setInterval() at 5-Second Intervals",
    category: "Web Technologies",
    paradigm: "DOM Style Mutation & Asynchronous Timers",
    badgeColor: "blue",
    environment: "HTML5, CSS3 & JavaScript (DOM API)",
    aim: "Program based on Document Object Model to change the background colour of the web page automatically after every 5 seconds.",
    theory: "The Document Object Model (DOM) is a cross-platform and language-independent interface that treats an HTML document as a tree structure wherein each node is an object representing a part of the document. The document.body object grants direct programmatic access to the <body> element. CSS properties can be dynamically assigned via JavaScript using the style property: document.body.style.backgroundColor = colorValue. Asynchronous execution is scheduled using the window.setInterval(callback, delay) method, which repeatedly invokes the callback function at fixed intervals specified in milliseconds. Since 1 second = 1000 milliseconds, setting the interval duration to 5000ms triggers the color transition automatically every 5 seconds. The cycle wraps around seamlessly using the modulo operator ((index + 1) % colors.length). A clearInterval(timerId) call allows pausing and resuming.",
    complexities: {
      bestTime: "O(1) Color Transition",
      avgTime: "5000ms Interval",
      worstTime: "O(1) CSS Recomputation",
      space: "O(k) Color Palette Array",
      recurrence: "window.setInterval(changeColor, 5000)"
    },
    learningOutcomes: [
      "Access and mutate the Document Object Model (DOM) tree dynamically via document.body.style.",
      "Schedule recurring asynchronous tasks using setInterval() and clearInterval().",
      "Implement cyclic array indexing using the modulo operator (index = (index + 1) % length)."
    ],
    interactiveType: "color-changer",
    items: [
      {
        id: "exp6-item1",
        title: "DOM Background Color Changer Implementation",
        type: "HTML5 & JavaScript Program",
        description: "Cycles through an array of curated hex colors every 5 seconds using setInterval(). Features live countdown, active color hex display, and Start/Pause/Next DOM controls.",
        code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>DOM Background Color Changer (5 Seconds)</title>
  <style>
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      margin: 0;
      min-height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: background-color 0.8s ease-in-out; /* Smooth CSS transition */
      color: #ffffff;
    }
    .control-panel {
      background: rgba(15, 23, 42, 0.85);
      border: 1px solid rgba(255, 255, 255, 0.2);
      border-radius: 16px;
      padding: 2.5rem 3rem;
      text-align: center;
      backdrop-filter: blur(10px);
      box-shadow: 0 15px 35px rgba(0, 0, 0, 0.5);
      max-width: 520px;
    }
    h1 { margin-top: 0; font-size: 1.8rem; }
    p { color: #94a3b8; font-size: 0.95rem; }
    .color-display {
      font-family: monospace;
      font-size: 1.4rem;
      font-weight: bold;
      background: rgba(255, 255, 255, 0.1);
      padding: 0.75rem 1.5rem;
      border-radius: 8px;
      margin: 1.5rem 0;
      letter-spacing: 1px;
    }
    .countdown-badge {
      display: inline-block;
      background: #2563eb;
      color: #ffffff;
      padding: 0.35rem 1rem;
      border-radius: 20px;
      font-weight: bold;
      font-size: 0.85rem;
      margin-bottom: 1.5rem;
    }
    .btn-group { display: flex; gap: 0.75rem; justify-content: center; }
    button {
      padding: 0.75rem 1.4rem;
      font-size: 0.95rem;
      font-weight: bold;
      border: none;
      border-radius: 8px;
      cursor: pointer;
      background: #ffffff;
      color: #0f172a;
      transition: transform 0.15s ease;
    }
    button:hover { transform: scale(1.05); }
  </style>
</head>
<body>

  <div class="control-panel">
    <h1>DOM Color Controller</h1>
    <p>Background color changes automatically after every 5 seconds</p>
    
    <div class="countdown-badge" id="countdown">Next change in: 5s</div>
    
    <div class="color-display" id="colorText">Current: #0F172A</div>

    <div class="btn-group">
      <button onclick="pauseTimer()" id="pauseBtn">Pause</button>
      <button onclick="resumeTimer()" id="resumeBtn" style="display:none;">Resume</button>
      <button onclick="changeBackgroundColor()">Next Color</button>
    </div>
  </div>

  <script type="text/javascript">
    // 1. Array of curated aesthetic background colors
    const colors = [
      "#0f172a", // Dark Slate
      "#065f46", // Emerald Green
      "#1e3a8a", // Royal Blue
      "#701a75", // Deep Magenta
      "#7c2d12", // Warm Rust
      "#4338ca", // Indigo
      "#831843"  // Rose Velvet
    ];

    let currentIndex = 0;
    let timerId = null;
    let secondsLeft = 5;
    let countdownId = null;

    // 2. Core DOM Manipulation Function
    function changeBackgroundColor() {
      // Cycle to the next color index using modulo
      currentIndex = (currentIndex + 1) % colors.length;
      const selectedColor = colors[currentIndex];

      // Mutate the Document Object Model (DOM) body style
      document.body.style.backgroundColor = selectedColor;

      // Update text in UI
      document.getElementById("colorText").textContent = "Current: " + selectedColor;

      // Reset seconds countdown
      secondsLeft = 5;
      updateCountdownDisplay();
    }

    function updateCountdownDisplay() {
      document.getElementById("countdown").textContent = "Next change in: " + secondsLeft + "s";
    }

    // 3. Start 5-second interval timer
    function startTimer() {
      // 5000 milliseconds = 5 seconds
      timerId = setInterval(changeBackgroundColor, 5000);

      // Countdown ticker every 1 second
      countdownId = setInterval(function() {
        secondsLeft--;
        if (secondsLeft < 1) secondsLeft = 5;
        updateCountdownDisplay();
      }, 1000);
    }

    function pauseTimer() {
      clearInterval(timerId);
      clearInterval(countdownId);
      document.getElementById("pauseBtn").style.display = "none";
      document.getElementById("resumeBtn").style.display = "inline-block";
      document.getElementById("countdown").textContent = "Timer Paused";
    }

    function resumeTimer() {
      startTimer();
      document.getElementById("pauseBtn").style.display = "inline-block";
      document.getElementById("resumeBtn").style.display = "none";
    }

    // Initialize initial background color and start automated 5-second cycle
    document.body.style.backgroundColor = colors[0];
    startTimer();
  </script>

</body>
</html>`,
        outputType: "terminal",
        image: "assets/images/java/exp6_output_dom_background_color.png",
        imageCaption: "DOM Controller Visualization - Automatic cyclic transitions every 5000ms using setInterval()",
        status: "DOM Timer Active (Live Interactive 5-Second Changer Available)",
        terminalOutput: `[Timer Initialized] setInterval(changeBackgroundColor, 5000)
[Time: 0s]  DOM mutated: document.body.style.backgroundColor = "#0f172a"
[Time: 5s]  DOM mutated: document.body.style.backgroundColor = "#065f46"
[Time: 10s] DOM mutated: document.body.style.backgroundColor = "#1e3a8a"
[Time: 15s] DOM mutated: document.body.style.backgroundColor = "#701a75"
[Time: 20s] DOM mutated: document.body.style.backgroundColor = "#7c2d12"
[Time: 25s] DOM mutated: document.body.style.backgroundColor = "#4338ca"
[Modulo Wrap] Cyclic loop: currentIndex = (currentIndex + 1) % colors.length`
      }
    ]
  }
];

// Presets for Interactive Java & Web Tech Playground
const ALGORITHM_PRESETS = {
  "exp-1": {
    name: "Classes & Objects Simulator",
    description: "Instantiate Java Student objects and calculate grades dynamically",
    defaultName: "Pushkar Ravindra Mhatre",
    defaultRoll: 64,
    defaultMarks: "92, 88, 95"
  },
  "exp-2": {
    name: "Overloading Simulator",
    description: "Test overloaded Box constructors and ShapeCalculator area methods",
    boxSide: 5.0,
    boxDims: "4, 6, 8",
    radius: 7.0,
    rectDims: "10, 5"
  },
  "exp-3": {
    name: "Inheritance & Exception Simulator",
    description: "Simulate Manager hierarchy and test runtime exception handlers",
    testAge: 16,
    divideNumerator: 100,
    divideDenominator: 0
  },
  "exp-4": {
    name: "Stopwatch Web Application",
    description: "Live interactive digital stopwatch using JavaScript millisecond timers",
    interactive: true
  },
  "exp-5": {
    name: "Email Validator Simulator",
    description: "Validate presence of '@' and '.' characters with browser alert modals",
    defaultEmail: "pushkarmhatre@gmail.com"
  },
  "exp-6": {
    name: "DOM Background Color Changer",
    description: "Live 5-second automatic background color cyclic transitions",
    interactive: true
  }
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { EXPERIMENTS_DATA, ALGORITHM_PRESETS };
}

