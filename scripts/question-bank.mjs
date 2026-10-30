import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

let sequence = 0;

function q(fields) {
  sequence += 1;
  return {
    cert: ['Java'],
    difficulty: 'medium',
    type: 'single',
    ...fields,
    id: `q${String(sequence).padStart(3, '0')}`,
  };
}

function tf(statement, isTrue, fields) {
  return q({
    type: 'truefalse',
    difficulty: 'easy',
    question: statement,
    options: [
      { id: 'a', text: 'True' },
      { id: 'b', text: 'False' },
    ],
    correctOptionIds: [isTrue ? 'a' : 'b'],
    ...fields,
  });
}

const questions = [
  q({
    category: 'Types and OOP',
    difficulty: 'easy',
    question: 'What is the default value of an uninitialized instance field of type int?',
    options: [
      { id: 'a', text: '0' },
      { id: 'b', text: 'null' },
      { id: 'c', text: 'undefined' },
      { id: 'd', text: '1' },
    ],
    correctOptionIds: ['a'],
    explanation:
      'An instance field receives a default when the object is created. A numeric primitive defaults to zero, so an int field is 0 until the program assigns it. null is the default for a reference field, not for int.',
    reference: 'Java Language Specification — Initial Values of Variables (§4.12.5)',
  }),
  q({
    category: 'Types and OOP',
    difficulty: 'easy',
    question: 'Which of these is a primitive type?',
    options: [
      { id: 'a', text: 'int' },
      { id: 'b', text: 'Integer' },
      { id: 'c', text: 'String' },
      { id: 'd', text: 'int[]' },
    ],
    correctOptionIds: ['a'],
    explanation:
      'int is one of the eight primitive types. Integer and String are classes, and an array type is a reference type even when its component type is primitive.',
    reference: 'Java Language Specification — Primitive Types and Values (§4.2)',
  }),
  q({
    category: 'Types and OOP',
    difficulty: 'easy',
    question: 'What does new String("java") == new String("java") evaluate to?',
    options: [
      { id: 'a', text: 'false' },
      { id: 'b', text: 'true' },
      { id: 'c', text: 'The expression does not compile' },
      { id: 'd', text: 'The expression throws NullPointerException' },
    ],
    correctOptionIds: ['a'],
    explanation:
      '== on reference types compares identity, not character contents. Each new String(...) expression allocates a distinct object, so the references differ and the comparison is false. String.equals would compare the characters.',
    reference: 'Java Language Specification — Reference Equality Operators (§15.21.3)',
  }),
  tf(
    'Reassigning a method parameter that holds an object reference does not change the caller variable, because Java passes that reference by value.',
    true,
    {
      category: 'Types and OOP',
      explanation:
        'The method receives a copy of the reference value. Assigning a new object to the parameter updates only that copy. Mutating the object that both references point at is still visible to the caller.',
      reference: 'Java Language Specification — Formal Parameters (§8.4.1)',
    },
  ),
  tf('A Java class may extend two concrete classes at the same time.', false, {
    category: 'Types and OOP',
    explanation:
      'A class has at most one direct superclass. A class may implement several interfaces, but it cannot extend more than one class.',
    reference: 'Java Language Specification — Superclasses and Subclasses (§8.1.4)',
  }),
  tf('An interface may extend more than one interface.', true, {
    category: 'Types and OOP',
    explanation:
      'An interface can list several superinterfaces. A class that implements it must then provide every abstract method those interfaces declare.',
    reference: 'Java Language Specification — Superinterfaces and Subinterfaces (§9.1.3)',
  }),
  q({
    category: 'Types and OOP',
    difficulty: 'easy',
    type: 'multiple',
    question: 'Which of these are primitive types?',
    options: [
      { id: 'a', text: 'int' },
      { id: 'b', text: 'boolean' },
      { id: 'c', text: 'char' },
      { id: 'd', text: 'String' },
      { id: 'e', text: 'Integer' },
    ],
    correctOptionIds: ['a', 'b', 'c'],
    explanation:
      'int, boolean, and char are primitive types. String and Integer are reference types, so they are not primitives.',
    reference: 'Java Language Specification — Primitive Types and Values (§4.2)',
  }),
  q({
    category: 'Types and OOP',
    question: 'What does final on an instance method mean?',
    options: [
      { id: 'a', text: 'Subclasses cannot override that method' },
      { id: 'b', text: 'The method can be called only once' },
      { id: 'c', text: 'The method cannot read instance fields' },
      { id: 'd', text: 'The method is abstract' },
    ],
    correctOptionIds: ['a'],
    explanation:
      'A final method has a fixed implementation. A subclass may call it, but it cannot override it. final does not limit how many times the method runs.',
    reference: 'Java Language Specification — final Methods (§8.4.3.3)',
  }),
  q({
    category: 'Types and OOP',
    question: 'Which statement distinguishes overloading from overriding?',
    options: [
      {
        id: 'a',
        text: 'Overloading declares several methods with the same name and different parameter lists; overriding replaces an inherited instance method that has a compatible signature',
      },
      { id: 'b', text: 'Overloading and overriding both require the exact same parameter list' },
      {
        id: 'c',
        text: 'Overloading is chosen at run time and overriding is chosen at compile time',
      },
      { id: 'd', text: 'Only static methods can be overridden' },
    ],
    correctOptionIds: ['a'],
    explanation:
      'The compiler chooses an overload from the compile-time parameter types. An override applies to an instance method, and the implementation is chosen from the run-time class of the receiver.',
    reference: 'Java Language Specification — Overloading (§8.4.9) and Overriding (§8.4.8.1)',
  }),
  q({
    category: 'Types and OOP',
    question:
      'Integer a = 128; Integer b = 128; What does the language specification guarantee about a == b?',
    options: [
      { id: 'a', text: 'a == b is not required to be true' },
      { id: 'b', text: 'a == b is always true' },
      { id: 'c', text: 'The declarations do not compile' },
      { id: 'd', text: 'The comparison throws NullPointerException' },
    ],
    correctOptionIds: ['a'],
    explanation:
      'Autoboxing must reuse one cached Integer only for values from -128 through 127. 128 is outside that range, so the two boxed results are not required to be the same object and == need not be true.',
    reference: 'Java Language Specification — Boxing Conversion (§5.1.7)',
  }),
  q({
    category: 'Types and OOP',
    question: 'Can an abstract class declare a constructor?',
    options: [
      {
        id: 'a',
        text: 'Yes. Subclass constructors invoke it, even though the abstract class cannot be instantiated with new',
      },
      { id: 'b', text: 'No. Constructors are allowed only on concrete classes' },
      { id: 'c', text: 'Yes, but only if the constructor itself is abstract' },
      { id: 'd', text: 'No. An abstract class is compiled without a constructor' },
    ],
    correctOptionIds: ['a'],
    explanation:
      'An abstract class cannot be created with new, but it still initializes its state through a constructor. Each concrete subclass constructor must invoke a superclass constructor, directly or through another constructor of the subclass.',
    reference: 'Java Language Specification — Constructor Declarations (§8.8)',
  }),
  q({
    category: 'Types and OOP',
    question:
      'A subclass declares a static method with the same signature as a static method in its superclass. A variable whose compile-time type is the superclass refers to a subclass instance, and the static method is invoked on that variable. Which method runs?',
    options: [
      { id: 'a', text: 'The superclass method' },
      { id: 'b', text: 'The subclass method' },
      { id: 'c', text: 'The code does not compile' },
      { id: 'd', text: 'The call throws AbstractMethodError' },
    ],
    correctOptionIds: ['a'],
    explanation:
      'A static method is hidden, not overridden. The compiler selects the method from the compile-time type of the reference, so the superclass method runs even when the object is a subclass instance.',
    reference: 'Java Language Specification — Hiding (§8.4.8.2)',
  }),
  q({
    category: 'Types and OOP',
    type: 'multiple',
    question: 'Which of these may be members of an interface?',
    options: [
      { id: 'a', text: 'A default method' },
      { id: 'b', text: 'A static method' },
      { id: 'c', text: 'A constructor' },
      { id: 'd', text: 'An instance field' },
      { id: 'e', text: 'A private method' },
    ],
    correctOptionIds: ['a', 'b', 'e'],
    explanation:
      'An interface may declare default methods, static methods, and, since Java 9, private methods that those methods can share. It has no constructors and no instance fields. A field in an interface is public, static, and final.',
    reference: 'Java Language Specification — Interfaces (§9)',
  }),
  q({
    category: 'Types and OOP',
    difficulty: 'hard',
    question:
      'A superclass method returns Number. Which return type may an overriding method in a subclass use?',
    options: [
      { id: 'a', text: 'Integer' },
      { id: 'b', text: 'Object' },
      { id: 'c', text: 'void' },
      { id: 'd', text: 'String' },
    ],
    correctOptionIds: ['a'],
    explanation:
      'An overriding method may use a covariant return type, which must be a subtype of the original return type. Integer is a subtype of Number. Object and String are not, and void does not match a Number result.',
    reference: 'Java Language Specification — Overriding (§8.4.8.1)',
  }),
  q({
    category: 'Types and OOP',
    difficulty: 'hard',
    question:
      'A superclass has only constructors that take arguments. Its subclass constructor does not start with super(...) or this(...). What happens?',
    options: [
      {
        id: 'a',
        text: 'The subclass does not compile, because the compiler inserts super() and the superclass has no accessible constructor with no arguments',
      },
      { id: 'b', text: 'The compiler inserts super(null)' },
      { id: 'c', text: 'The subclass compiles and the superclass fields stay uninitialized' },
      { id: 'd', text: 'The subclass compiles only when it is abstract' },
    ],
    correctOptionIds: ['a'],
    explanation:
      'A constructor that does not start with an explicit constructor invocation gets an inserted call to the superclass constructor that takes no arguments. Compilation fails when that constructor does not exist or is not accessible.',
    reference: 'Java Language Specification — Constructor Body (§8.8.7)',
  }),
  q({
    category: 'Types and OOP',
    question: 'Where is a protected member visible?',
    options: [
      {
        id: 'a',
        text: 'In the declaring class, in other classes of the same package, and in subclasses',
      },
      { id: 'b', text: 'Only inside the declaring class' },
      { id: 'c', text: 'In every class of every package' },
      { id: 'd', text: 'Only in subclasses, and never in another class of the same package' },
    ],
    correctOptionIds: ['a'],
    explanation:
      'protected access covers the declaring class, the rest of its package, and subclasses. private would stop at the declaring top-level class, and public would not limit the package.',
    reference: 'Java Language Specification — Determining Accessibility (§6.6.1)',
  }),
  q({
    category: 'Types and OOP',
    difficulty: 'hard',
    question: 'What is the result of the expression null instanceof String?',
    options: [
      { id: 'a', text: 'false' },
      { id: 'b', text: 'true' },
      { id: 'c', text: 'NullPointerException' },
      { id: 'd', text: 'The expression does not compile' },
    ],
    correctOptionIds: ['a'],
    explanation:
      'instanceof tests the run-time type of a reference. A null reference is not an instance of any type, so the operator evaluates to false and does not throw.',
    reference: 'Java Language Specification — instanceof (§15.20.2)',
  }),
  q({
    category: 'Types and OOP',
    question: 'Which statement about enum types is correct?',
    options: [
      {
        id: 'a',
        text: 'An enum may implement interfaces, and it implicitly extends java.lang.Enum',
      },
      { id: 'b', text: 'An enum may extend any class the programmer names' },
      { id: 'c', text: 'An enum cannot declare methods' },
      { id: 'd', text: 'An enum cannot declare fields' },
    ],
    correctOptionIds: ['a'],
    explanation:
      'The compiler makes an enum a subclass of Enum, so the enum cannot extend another class. It may implement interfaces, and it may declare its own fields and methods.',
    reference: 'Java Language Specification — Enum Classes (§8.9)',
  }),
  q({
    category: 'Types and OOP',
    difficulty: 'hard',
    question: 'A subclass is initialized and an instance is then created. Which order is correct?',
    options: [
      {
        id: 'a',
        text: 'Superclass static initializers, subclass static initializers, superclass instance initializers, superclass constructor, subclass instance initializers, subclass constructor',
      },
      { id: 'b', text: 'Subclass static initializers before any superclass static initializers' },
      { id: 'c', text: 'The subclass constructor before the superclass instance initializers' },
      { id: 'd', text: 'Instance initializers before any static initializers of that class' },
    ],
    correctOptionIds: ['a'],
    explanation:
      'Class initialization completes a superclass before its subclass, and static initialization finishes before instance initialization. Creating the object then runs the superclass instance initializers and constructor before the subclass instance initializers and constructor.',
    reference:
      'Java Language Specification — Initialization (§12.4) and Creation of New Class Instances (§12.5)',
  }),
  q({
    category: 'Types and OOP',
    question: 'Which local declaration is legal?',
    options: [
      { id: 'a', text: 'var count = 0;' },
      { id: 'b', text: 'var missing = null;' },
      { id: 'c', text: 'var numbers = {1, 2, 3};' },
      { id: 'd', text: 'A class field written as var size = 1;' },
    ],
    correctOptionIds: ['a'],
    explanation:
      'var asks the compiler to infer the type of a local variable from an initializer that already has a type. The literal 0 has type int. null and a bare array initializer do not provide one, and var is not allowed on a field.',
    reference: 'Java Language Specification — Local Variable Declarations (§14.4)',
  }),
  tf('HashMap permits one null key and many null values.', true, {
    category: 'Collections',
    explanation:
      'HashMap reserves a bucket for a single null key and stores null values like any other value. A TreeMap that uses natural ordering, and a ConcurrentHashMap, both reject a null key.',
    reference: 'java.util.HashMap',
  }),
  tf('A HashSet decides membership with equals and hashCode, not with ==.', true, {
    category: 'Collections',
    explanation:
      'HashSet stores its elements as keys in a HashMap. Lookup uses hashCode to choose a bucket and equals to match an element, so two distinct objects can count as the same element when those methods say they are equal.',
    reference: 'java.util.HashSet',
  }),
  q({
    category: 'Collections',
    difficulty: 'easy',
    type: 'multiple',
    question: 'Which of these preserve insertion order?',
    options: [
      { id: 'a', text: 'ArrayList' },
      { id: 'b', text: 'LinkedHashSet' },
      { id: 'c', text: 'HashSet' },
      { id: 'd', text: 'LinkedHashMap created with the default constructor' },
      { id: 'e', text: 'HashMap' },
    ],
    correctOptionIds: ['a', 'b', 'd'],
    explanation:
      'ArrayList keeps elements at stable indexes. LinkedHashSet and a default LinkedHashMap link entries in insertion order. HashSet and HashMap do not promise any iteration order.',
    reference: 'java.util.ArrayList and java.util.LinkedHashMap',
  }),
  q({
    category: 'Collections',
    type: 'multiple',
    question:
      'Which of these are safe for concurrent readers and writers without extra locking by the caller?',
    options: [
      { id: 'a', text: 'ConcurrentHashMap' },
      { id: 'b', text: 'CopyOnWriteArrayList' },
      { id: 'c', text: 'ArrayList' },
      { id: 'd', text: 'HashMap' },
      { id: 'e', text: 'ConcurrentLinkedQueue' },
    ],
    correctOptionIds: ['a', 'b', 'e'],
    explanation:
      'ConcurrentHashMap, CopyOnWriteArrayList, and ConcurrentLinkedQueue implement their individual operations for concurrent use. ArrayList and HashMap do not synchronize their structure, so sharing them across threads without external locking can lose updates.',
    reference: 'java.util.concurrent',
  }),
  q({
    category: 'Collections',
    difficulty: 'easy',
    question: 'Which List is the usual choice for frequent access by index?',
    options: [
      { id: 'a', text: 'ArrayList' },
      { id: 'b', text: 'LinkedList' },
      { id: 'c', text: 'PriorityQueue' },
      { id: 'd', text: 'TreeSet' },
    ],
    correctOptionIds: ['a'],
    explanation:
      'ArrayList stores elements in a contiguous array, so get and set by index are constant-time operations. LinkedList must walk nodes to reach an index. PriorityQueue and TreeSet are not random-access lists.',
    reference: 'java.util.ArrayList',
  }),
  q({
    category: 'Collections',
    question: 'How is HashSet implemented in the JDK?',
    options: [
      { id: 'a', text: 'It is backed by a HashMap whose keys are the set elements' },
      { id: 'b', text: 'It is backed by an array that is always kept sorted' },
      { id: 'c', text: 'It stores elements in a TreeMap' },
      { id: 'd', text: 'It compares elements only with ==' },
    ],
    correctOptionIds: ['a'],
    explanation:
      'HashSet uses a HashMap, with the set element as the map key and a dummy object as the value. Membership therefore follows hashCode and equals.',
    reference: 'java.util.HashSet',
  }),
  q({
    category: 'Collections',
    question: 'What does a TreeMap use to order its keys when no Comparator is supplied?',
    options: [
      { id: 'a', text: 'The natural order of keys that implement Comparable' },
      { id: 'b', text: 'Insertion order' },
      { id: 'c', text: 'Hash codes' },
      { id: 'd', text: 'System.identityHashCode' },
    ],
    correctOptionIds: ['a'],
    explanation:
      'With no Comparator, TreeMap compares keys through Comparable.compareTo. A key that does not implement Comparable causes a ClassCastException when it is inserted. Insertion order is what a default LinkedHashMap keeps.',
    reference: 'java.util.TreeMap',
  }),
  q({
    category: 'Collections',
    question: 'What does Collections.unmodifiableList return?',
    options: [
      {
        id: 'a',
        text: 'A view that throws on mutating operations, while a later change to the original list can still appear through the view',
      },
      { id: 'b', text: 'A deep copy that stays frozen even if the original list changes' },
      { id: 'c', text: 'A list that ignores mutating calls and returns normally' },
      { id: 'd', text: 'A concurrent list' },
    ],
    correctOptionIds: ['a'],
    explanation:
      'The wrapper delegates reads to the backing list and rejects mutators such as add with UnsupportedOperationException. It does not copy the elements, so a later change to the backing list is visible through the wrapper.',
    reference: 'java.util.Collections.unmodifiableList',
  }),
  q({
    category: 'Collections',
    question: 'In which order does iterating a PriorityQueue yield its elements?',
    options: [
      { id: 'a', text: 'No sorted order is promised; the iterator walks the heap structure' },
      { id: 'b', text: 'Always sorted order' },
      { id: 'c', text: 'Always insertion order' },
      { id: 'd', text: 'Always reverse sorted order' },
    ],
    correctOptionIds: ['a'],
    explanation:
      'A priority queue is a heap. The head is the least element according to its ordering, but the iterator does not promise to visit the remaining elements in sorted order.',
    reference: 'java.util.PriorityQueue',
  }),
  q({
    category: 'Collections',
    difficulty: 'hard',
    question: 'What happens when ArrayDeque.add(null) is called?',
    options: [
      { id: 'a', text: 'It throws NullPointerException' },
      { id: 'b', text: 'The null element is stored' },
      { id: 'c', text: 'The call is ignored' },
      { id: 'd', text: 'It throws IllegalStateException' },
    ],
    correctOptionIds: ['a'],
    explanation:
      'ArrayDeque forbids null elements so that null can be used as an internal marker. add therefore rejects null immediately with NullPointerException.',
    reference: 'java.util.ArrayDeque',
  }),
  q({
    category: 'Collections',
    difficulty: 'hard',
    question:
      'What are the default initial capacity and load factor of a HashMap created with new HashMap<>()?',
    options: [
      { id: 'a', text: 'Capacity 16 and load factor 0.75' },
      { id: 'b', text: 'Capacity 10 and load factor 1.0' },
      { id: 'c', text: 'Capacity 8 and load factor 0.5' },
      { id: 'd', text: 'Capacity 32 and load factor 0.5' },
    ],
    correctOptionIds: ['a'],
    explanation:
      'The no-argument constructor uses the default initial capacity of 16 and a load factor of 0.75. The map resizes when the number of entries passes capacity times that load factor.',
    reference: 'java.util.HashMap',
  }),
  q({
    category: 'Collections',
    question: 'Which statement about Comparable and Comparator is correct?',
    options: [
      {
        id: 'a',
        text: 'Comparable is implemented by the element type to define its natural order; a Comparator is a separate object that supplies an order from outside',
      },
      {
        id: 'b',
        text: 'Comparator must be implemented by the element, and Comparable is always external',
      },
      { id: 'c', text: 'The two interfaces declare the same method' },
      { id: 'd', text: 'TreeSet can use only a Comparator and never Comparable' },
    ],
    correctOptionIds: ['a'],
    explanation:
      'compareTo lives on the elements and defines the order those elements treat as natural. compare belongs to a Comparator the collection can be given, which is how one type can be sorted in more than one way.',
    reference: 'java.lang.Comparable and java.util.Comparator',
  }),
  q({
    category: 'Collections',
    difficulty: 'hard',
    question: 'How does IdentityHashMap compare keys?',
    options: [
      { id: 'a', text: 'With ==, so two equal but distinct objects can both be keys' },
      { id: 'b', text: 'With equals and hashCode, like HashMap' },
      { id: 'c', text: 'With Comparable' },
      { id: 'd', text: 'It rejects any key whose class overrides equals' },
    ],
    correctOptionIds: ['a'],
    explanation:
      'IdentityHashMap uses reference equality on purpose. Two objects that equals would treat as the same value can still occupy two entries.',
    reference: 'java.util.IdentityHashMap',
  }),
  q({
    category: 'Collections',
    question: 'Which statement about List.of("a", "b") is correct?',
    options: [
      { id: 'a', text: 'It returns a list that rejects add and set, and it rejects null elements' },
      { id: 'b', text: 'It returns a resizable ArrayList that accepts null' },
      {
        id: 'c',
        text: 'It returns a view of a caller-supplied array that the caller can still modify',
      },
      { id: 'd', text: 'It allows null elements and forbids duplicates' },
    ],
    correctOptionIds: ['a'],
    explanation:
      'List.of copies the values into an unmodifiable list. add and set throw UnsupportedOperationException, and a null argument throws NullPointerException. Duplicate values are allowed because a list may contain the same value twice.',
    reference: 'java.util.List.of',
  }),
  q({
    category: 'Collections',
    question: 'What does Set.of("a", "a") do?',
    options: [
      { id: 'a', text: 'It throws IllegalArgumentException' },
      { id: 'b', text: 'It returns a set containing one "a"' },
      { id: 'c', text: 'It returns a set containing two "a" entries' },
      { id: 'd', text: 'It returns null' },
    ],
    correctOptionIds: ['a'],
    explanation:
      'The Set.of factories reject duplicate elements at construction time with IllegalArgumentException. They do not silently keep a single copy the way a HashSet constructor would.',
    reference: 'java.util.Set.of',
  }),
  q({
    category: 'Collections',
    question: 'What does Map.put return when the key was already present?',
    options: [
      { id: 'a', text: 'The previous value associated with that key' },
      { id: 'b', text: 'true' },
      { id: 'c', text: 'The new value' },
      { id: 'd', text: 'The map itself' },
    ],
    correctOptionIds: ['a'],
    explanation:
      'put replaces the mapping and returns the value that was stored for that key before the call. When the key was absent, the return value is null.',
    reference: 'java.util.Map.put',
  }),
  q({
    category: 'Collections',
    difficulty: 'hard',
    question: 'What does ConcurrentHashMap do with a null key or a null value?',
    options: [
      { id: 'a', text: 'It throws NullPointerException' },
      { id: 'b', text: 'It stores one null key, like HashMap' },
      { id: 'c', text: 'It stores null values but not a null key' },
      { id: 'd', text: 'It ignores the entry' },
    ],
    correctOptionIds: ['a'],
    explanation:
      'ConcurrentHashMap forbids null keys and null values. A null result from get would otherwise be ambiguous while other threads update the map, so a null argument fails with NullPointerException.',
    reference: 'java.util.concurrent.ConcurrentHashMap',
  }),
  q({
    category: 'Collections',
    question:
      'How can code remove the current element while iterating an ArrayList with an Iterator?',
    options: [
      { id: 'a', text: 'By calling iterator.remove()' },
      { id: 'b', text: 'By calling list.remove(index) and then continuing with the same iterator' },
      { id: 'c', text: 'By calling list.clear() during the iteration' },
      { id: 'd', text: 'By assigning null to the loop variable' },
    ],
    correctOptionIds: ['a'],
    explanation:
      'iterator.remove() updates the expected structure of that iterator, so the following next() stays consistent. A structural change made through the list itself can make the iterator throw ConcurrentModificationException.',
    reference: 'java.util.Iterator.remove',
  }),
  tf(
    'A checked exception that can leave a method must be caught in that method or listed in its throws clause.',
    true,
    {
      category: 'Exceptions',
      explanation:
        'The compiler tracks checked exceptions. A method that does not catch one must declare it so callers handle or declare it too. Unchecked exceptions are outside that rule.',
      reference: 'Java Language Specification — Compile-Time Checking of Exceptions (§11.2)',
    },
  ),
  tf('RuntimeException is a checked exception.', false, {
    category: 'Exceptions',
    explanation:
      'RuntimeException and its subclasses are unchecked. The compiler does not require them to be caught or declared, although a catch clause may still handle them.',
    reference: 'Java Language Specification — The Kinds of Exceptions (§11.1.1)',
  }),
  q({
    category: 'Exceptions',
    type: 'multiple',
    question: 'Which of these are unchecked?',
    options: [
      { id: 'a', text: 'NullPointerException' },
      { id: 'b', text: 'IllegalArgumentException' },
      { id: 'c', text: 'IOException' },
      { id: 'd', text: 'OutOfMemoryError' },
      { id: 'e', text: 'SQLException' },
    ],
    correctOptionIds: ['a', 'b', 'd'],
    explanation:
      'NullPointerException and IllegalArgumentException extend RuntimeException, and Error, including OutOfMemoryError, is unchecked as well. IOException and SQLException are checked and must be caught or declared.',
    reference: 'Java Language Specification — The Kinds of Exceptions (§11.1.1)',
  }),
  q({
    category: 'Exceptions',
    question:
      'A try block executes return, and its finally block runs a statement that does not itself return or throw. What happens?',
    options: [
      { id: 'a', text: 'The finally block runs before the return from try completes' },
      { id: 'b', text: 'finally is skipped because try already returned' },
      { id: 'c', text: 'finally runs only when try throws' },
      { id: 'd', text: 'The method returns twice' },
    ],
    correctOptionIds: ['a'],
    explanation:
      'A return inside try completes only after finally finishes, unless finally itself returns or throws. The finally block therefore runs for cleanup on the normal path as well as on the exceptional path.',
    reference: 'Java Language Specification — Execution of try-finally (§14.20.2)',
  }),
  q({
    category: 'Exceptions',
    question:
      'In try (A a = openA(); B b = openB()), both resources open successfully. In which order are they closed?',
    options: [
      { id: 'a', text: 'b, then a' },
      { id: 'b', text: 'a, then b' },
      { id: 'c', text: 'Only a is closed' },
      { id: 'd', text: 'The order is unspecified' },
    ],
    correctOptionIds: ['a'],
    explanation:
      'try-with-resources closes resources that were opened in the reverse of their declaration order. b closes first, then a, so a later resource can still use an earlier one while it closes.',
    reference: 'Java Language Specification — try-with-resources (§14.20.3)',
  }),
  q({
    category: 'Exceptions',
    difficulty: 'hard',
    question:
      'The body of a try-with-resources throws an IOException, and close on the resource then throws a different IOException. What does the caller observe?',
    options: [
      {
        id: 'a',
        text: 'The exception from the body propagates, and the exception from close is attached with addSuppressed',
      },
      {
        id: 'b',
        text: 'Only the exception from close propagates, and the body exception is discarded',
      },
      { id: 'c', text: 'The method completes normally' },
      { id: 'd', text: 'Both exceptions are thrown as two separate completions of the method' },
    ],
    correctOptionIds: ['a'],
    explanation:
      'When the body already completed with an exception, an exception from closing a resource does not replace it. The close failure is recorded as a suppressed exception and can be read with getSuppressed().',
    reference: 'Java Language Specification — try-with-resources (§14.20.3)',
  }),
  q({
    category: 'Exceptions',
    question: 'Which catch order is required when both clauses are present?',
    options: [
      { id: 'a', text: 'catch (FileNotFoundException) before catch (IOException)' },
      { id: 'b', text: 'catch (IOException) before catch (FileNotFoundException)' },
      { id: 'c', text: 'Either order compiles' },
      { id: 'd', text: 'The two types cannot be caught in the same try statement' },
    ],
    correctOptionIds: ['a'],
    explanation:
      'A catch for a subtype must precede a catch for its supertype. FileNotFoundException is an IOException, so the more specific clause comes first. The reverse order does not compile.',
    reference: 'Java Language Specification — The try statement (§14.20)',
  }),
  q({
    category: 'Exceptions',
    difficulty: 'hard',
    question:
      'A try block throws IllegalStateException and its finally block throws IllegalArgumentException. Which exception does the caller see?',
    options: [
      {
        id: 'a',
        text: 'The IllegalArgumentException from finally; the exception from try is discarded',
      },
      {
        id: 'b',
        text: 'The IllegalStateException, with the finally exception attached as suppressed',
      },
      { id: 'c', text: 'A single exception whose type is the common superclass of both' },
      { id: 'd', text: 'No exception; the method returns null' },
    ],
    correctOptionIds: ['a'],
    explanation:
      'If a finally block completes abruptly, that abrupt reason becomes the result of the try statement and the earlier exception is discarded. A finally block that throws therefore hides the original failure. Suppressed exceptions are the try-with-resources rule, not the rule for a plain finally.',
    reference: 'Java Language Specification — Execution of try-finally (§14.20.2)',
  }),
  q({
    category: 'Exceptions',
    difficulty: 'easy',
    question: 'What is the root class of every exception and every error?',
    options: [
      { id: 'a', text: 'Throwable' },
      { id: 'b', text: 'Exception' },
      { id: 'c', text: 'Error' },
      { id: 'd', text: 'RuntimeException' },
    ],
    correctOptionIds: ['a'],
    explanation:
      'Throwable is the superclass of both Exception and Error. Only a Throwable can be thrown. A catch of Exception does not cover Error.',
    reference: 'java.lang.Throwable',
  }),
  q({
    category: 'Exceptions',
    difficulty: 'hard',
    question: 'Which multi-catch is legal?',
    options: [
      { id: 'a', text: 'catch (FileNotFoundException | SQLException ex)' },
      { id: 'b', text: 'catch (IOException | FileNotFoundException ex)' },
      { id: 'c', text: 'catch (Exception | RuntimeException ex)' },
      { id: 'd', text: 'catch (Throwable | Exception ex)' },
    ],
    correctOptionIds: ['a'],
    explanation:
      'The alternatives in a multi-catch must be disjoint: one cannot be a subclass of another. FileNotFoundException and SQLException are unrelated, so that union compiles. FileNotFoundException is an IOException, and RuntimeException and Exception are related, so those unions are rejected.',
    reference: 'Java Language Specification — The try statement (§14.20)',
  }),
  q({
    category: 'Exceptions',
    difficulty: 'hard',
    question:
      'A superclass method declares no checked exception. Which throws clause may an overriding method in a subclass declare?',
    options: [
      { id: 'a', text: 'throws IllegalArgumentException' },
      { id: 'b', text: 'throws IOException' },
      { id: 'c', text: 'throws Exception' },
      { id: 'd', text: 'throws Throwable' },
    ],
    correctOptionIds: ['a'],
    explanation:
      'An overriding method must not add checked exceptions that the overridden method does not allow. IllegalArgumentException is unchecked, so declaring it does not broaden the checked set. IOException, Exception, and Throwable would, and those overrides do not compile.',
    reference: 'Java Language Specification — Requirements in Overriding (§8.4.8.3)',
  }),
  q({
    category: 'Exceptions',
    question: 'Which statement about Error is correct?',
    options: [
      {
        id: 'a',
        text: 'Error signals a serious problem that ordinary application code is not expected to catch, and Error is not a subclass of Exception',
      },
      { id: 'b', text: 'Error is a checked subclass of Exception' },
      { id: 'c', text: 'A catch (Exception) clause also catches OutOfMemoryError' },
      { id: 'd', text: 'Every Error must be listed in a throws clause' },
    ],
    correctOptionIds: ['a'],
    explanation:
      'Throwable splits into Exception and Error. OutOfMemoryError is an Error, so catch (Exception) does not handle it. Errors are unchecked and are not required in throws.',
    reference: 'java.lang.Error',
  }),
  q({
    category: 'Exceptions',
    question: 'What must a resource in a try-with-resources statement implement?',
    options: [
      { id: 'a', text: 'AutoCloseable' },
      { id: 'b', text: 'Serializable' },
      { id: 'c', text: 'Closeable, and AutoCloseable is not accepted' },
      { id: 'd', text: 'Runnable' },
    ],
    correctOptionIds: ['a'],
    explanation:
      'The resource type must be a subtype of AutoCloseable, whose close method performs the cleanup. Closeable extends AutoCloseable, and types such as Stream implement AutoCloseable directly.',
    reference: 'Java Language Specification — try-with-resources (§14.20.3)',
  }),
  q({
    category: 'Exceptions',
    question: 'Which statement distinguishes throw from throws?',
    options: [
      {
        id: 'a',
        text: 'throw raises an exception object; throws on a method declares checked exceptions that may leave the method',
      },
      { id: 'b', text: 'throws raises an exception, and throw declares it' },
      { id: 'c', text: 'throw can appear only in a method signature' },
      { id: 'd', text: 'throws can appear only inside a method body' },
    ],
    correctOptionIds: ['a'],
    explanation:
      'throw is a statement and completes abruptly with an exception. throws is a clause on a method or constructor that tells callers which checked exceptions they must handle or declare.',
    reference: 'Java Language Specification — The throw statement (§14.18) and throws (§8.4.6)',
  }),
  tf(
    'Type arguments such as the String in List<String> are erased and are not reified at run time.',
    true,
    {
      category: 'Generics',
      explanation:
        'The compiler checks List<String> and then erases the type argument, so the running program sees a raw List. That is why a parameterized type cannot be tested with instanceof and why related casts are unchecked.',
      reference: 'Java Language Specification — Type Erasure (§4.6)',
    },
  ),
  tf('Inside a generic class with type parameter T, the expression new T() is legal.', false, {
    category: 'Generics',
    explanation:
      'Erasure removes T, so the compiler has no run-time class to allocate. Creating a T requires a factory or a Class<T> token supplied by the caller.',
    reference: 'Java Language Specification — Type Erasure (§4.6)',
  }),
  q({
    category: 'Generics',
    type: 'multiple',
    question: 'Which of these are rejected by the compiler?',
    options: [
      { id: 'a', text: 'new T[10], where T is a type parameter' },
      { id: 'b', text: 'names instanceof ArrayList<String>' },
      { id: 'c', text: 'List<String>.class' },
      { id: 'd', text: 'new ArrayList<String>()' },
      { id: 'e', text: 'List<String> names = new ArrayList<>()' },
    ],
    correctOptionIds: ['a', 'b', 'c'],
    explanation:
      'Erasure means the run time does not keep the type argument, so the compiler rejects a generic array creation, an instanceof test of a parameterized type, and a class literal that carries type arguments. Constructing an ArrayList<String>, including with the diamond, is ordinary generic code and compiles.',
    reference: 'Java Language Specification — instanceof (§15.20.2) and Class Literals (§15.8.2)',
  }),
  q({
    category: 'Generics',
    type: 'multiple',
    question: 'Which statements about wildcards and subtyping are correct?',
    options: [
      {
        id: 'a',
        text: 'From a List<? extends Number> you can read a Number, and you cannot add an Integer',
      },
      { id: 'b', text: 'To a List<? super Integer> you can add an Integer' },
      { id: 'c', text: 'List<Integer> is a subtype of List<Number>' },
      { id: 'd', text: 'A List<? extends Number> accepts add of any Number' },
      { id: 'e', text: 'List<String> is a subtype of List<Object>' },
    ],
    correctOptionIds: ['a', 'b'],
    explanation:
      'extends makes a producer: the list yields Number values, and the compiler rejects adding an Integer because the exact element type is unknown. super makes a consumer: an Integer is safe to add. Generic types are invariant, so List<Integer> is not a List<Number> and List<String> is not a List<Object>.',
    reference: 'Java Language Specification — Type Arguments of Parameterized Types (§4.5.1)',
  }),
  q({
    category: 'Generics',
    question: 'Which value may be passed to add on a List<?>?',
    options: [
      { id: 'a', text: 'null' },
      { id: 'b', text: 'A String' },
      { id: 'c', text: 'An Object created with new Object()' },
      { id: 'd', text: 'An Integer' },
    ],
    correctOptionIds: ['a'],
    explanation:
      'The wildcard stands for an unknown element type. null is the only reference that can be stored in every type, so add accepts null and rejects String, Object, and Integer. Elements read from the list have static type Object.',
    reference: 'Java Language Specification — Type Arguments of Parameterized Types (§4.5.1)',
  }),
  q({
    category: 'Generics',
    difficulty: 'easy',
    question: 'What does the diamond in new ArrayList<>() do?',
    options: [
      { id: 'a', text: 'It asks the compiler to infer the type arguments from the context' },
      { id: 'b', text: 'It creates a raw ArrayList and turns off generic checking' },
      { id: 'c', text: 'It creates one list that holds unrelated types with no casts' },
      { id: 'd', text: 'It allocates an array of the generic type parameter' },
    ],
    correctOptionIds: ['a'],
    explanation:
      'The diamond stands for type arguments the compiler can already see, for example from a List<String> target type. The created value is still a parameterized ArrayList, not a raw type.',
    reference: 'Java Language Specification — Class Instance Creation Expressions (§15.9)',
  }),
  q({
    category: 'Generics',
    difficulty: 'hard',
    question:
      'A method performs List<String> strings = (List<String>) (List<?>) integers, and integers is a List<Integer> containing 1. When does this fail?',
    options: [
      {
        id: 'a',
        text: 'It can compile with an unchecked warning, and ClassCastException is thrown later when an element is read as a String',
      },
      {
        id: 'b',
        text: 'The cast to List<String> is fully checked at run time and fails immediately',
      },
      { id: 'c', text: 'The code cannot compile at all' },
      { id: 'd', text: 'Reading the element returns the String "1"' },
    ],
    correctOptionIds: ['a'],
    explanation:
      'Erasure makes List<Integer> and List<String> the same List class at run time, so the cast does not check the element type. The integer stays in the list until a read that expects a String inserts a failing check cast.',
    reference: 'Java Language Specification — Raw Types (§4.8) and Checked Casts (§5.5)',
  }),
  q({
    category: 'Generics',
    question: 'What does the bound in <T extends Comparable<T>> require?',
    options: [
      { id: 'a', text: 'T must be a type that can be compared with another T' },
      { id: 'b', text: 'T must be a superclass of Comparable' },
      { id: 'c', text: 'T must be exactly Comparable and not a subtype' },
      { id: 'd', text: 'The bound is erased to Object and is not checked at the call' },
    ],
    correctOptionIds: ['a'],
    explanation:
      'The bound limits callers to types that implement Comparable<T>, so the method body can call compareTo on values of type T. The compiler checks the bound at each call site.',
    reference: 'Java Language Specification — Type Variables (§4.4)',
  }),
  q({
    category: 'Generics',
    difficulty: 'hard',
    question: 'Why does new List<String>[10] fail to compile?',
    options: [
      {
        id: 'a',
        text: 'Arrays are reified, and after erasure a List<String> array could not check its component type on store',
      },
      { id: 'b', text: 'A List cannot be stored in any array' },
      { id: 'c', text: 'Only arrays of primitive types are legal' },
      { id: 'd', text: 'The expression is legal when the array stays empty' },
    ],
    correctOptionIds: ['a'],
    explanation:
      'An array store checks the component type and can throw ArrayStoreException. Erasure would leave a generic array unable to perform that check for List<String>, so the language rejects the creation.',
    reference: 'Java Language Specification — Array Variables (§10.2)',
  }),
  q({
    category: 'Generics',
    difficulty: 'hard',
    question: 'What is the effect of adding an element through a raw List reference?',
    options: [
      {
        id: 'a',
        text: 'The compiler allows the add with an unchecked warning, and a later read that expects a specific type can throw ClassCastException',
      },
      { id: 'b', text: 'The add is rejected because a raw list is immutable' },
      { id: 'c', text: 'The add is checked at run time against String' },
      { id: 'd', text: 'Assigning a parameterized list to a raw List variable does not compile' },
    ],
    correctOptionIds: ['a'],
    explanation:
      'A raw type turns off generic checking for uses of that variable. An add through the raw view is unchecked, so a List<String> seen as a raw List can be polluted and fail when a caller later reads a String.',
    reference: 'Java Language Specification — Raw Types (§4.8)',
  }),
  q({
    category: 'Generics',
    difficulty: 'hard',
    question:
      'A method has a List<?> and needs to pass that same list to void swap(List<T> list). What is the usual way to make the call compile?',
    options: [
      {
        id: 'a',
        text: 'Pass the wildcard list to a generic helper <T> void helper(List<T> list) that then calls swap',
      },
      { id: 'b', text: 'Cast the list to List<Object> and pass that' },
      {
        id: 'c',
        text: 'Change the variable type to List<Object> with no cast, which is always legal for a List<?>',
      },
      { id: 'd', text: 'Call list.getClass().newInstance()' },
    ],
    correctOptionIds: ['a'],
    explanation:
      'The compiler captures the unknown element type of List<?>. A generic helper gives that captured type the name T, and List<T> then matches the method that needs a named type argument. A List<Object> is a different type.',
    reference: 'Java Language Specification — Capture Conversion (§5.1.10)',
  }),
  q({
    category: 'Generics',
    question: 'Which call is legal on a variable of type List<? super Integer>?',
    options: [
      { id: 'a', text: 'numbers.add(Integer.valueOf(1))' },
      { id: 'b', text: 'numbers.add(new Object())' },
      { id: 'c', text: 'Number n = numbers.get(0), with no cast' },
      { id: 'd', text: 'numbers.add(Double.valueOf(1.0))' },
    ],
    correctOptionIds: ['a'],
    explanation:
      '? super Integer means the element type is Integer or some supertype, so storing an Integer is safe. An Object or a Double might not belong in a List<Integer>. get is known only as Object, not as Number.',
    reference: 'Java Language Specification — Type Arguments of Parameterized Types (§4.5.1)',
  }),
  q({
    category: 'Generics',
    question: 'Why is List<String> not a subtype of List<Object>?',
    options: [
      {
        id: 'a',
        text: 'Generics are invariant. If the list were covariant, a List<Object> reference could add an Integer to a list of strings',
      },
      { id: 'b', text: 'String does not extend Object' },
      { id: 'c', text: 'Arrays are invariant too, so lists follow the same rule' },
      { id: 'd', text: 'String is final, and final classes cannot be type arguments' },
    ],
    correctOptionIds: ['a'],
    explanation:
      'If List<String> were a List<Object>, code could add an Integer through the broader reference and break the list. The compiler treats different type arguments as unrelated. Arrays are covariant, which is a different rule, and they check stores at run time.',
    reference: 'Java Language Specification — Subtyping (§4.10)',
  }),
  q({
    category: 'Generics',
    question: 'What does Collections.emptyList() return?',
    options: [
      {
        id: 'a',
        text: 'A shared immutable empty list, with the type argument inferred at the call',
      },
      { id: 'b', text: 'A fresh ArrayList that the caller is expected to fill' },
      { id: 'c', text: 'null' },
      { id: 'd', text: 'A raw list with checking disabled' },
    ],
    correctOptionIds: ['a'],
    explanation:
      'emptyList returns an immutable list that contains nothing, and the generic method lets the caller treat that list as List<String> or another list type. An attempt to add throws UnsupportedOperationException.',
    reference: 'java.util.Collections.emptyList',
  }),
  tf(
    'If two objects are equal according to equals, Object.hashCode requires them to return the same hash code.',
    true,
    {
      category: 'equals and hashCode',
      explanation:
        'Hash-based collections choose a bucket with hashCode and then compare with equals. Equal objects that hashed differently would be stored apart, and a later lookup would miss the match.',
      reference: 'java.lang.Object.hashCode',
    },
  ),
  tf('If two objects return the same hashCode, equals must return true.', false, {
    category: 'equals and hashCode',
    explanation:
      'Hash codes may collide. Distinct objects can share a bucket, and equals then decides whether they are the same key. The contract requires only the other direction: equal objects must share a hash code.',
    reference: 'java.lang.Object.hashCode',
  }),
  q({
    category: 'equals and hashCode',
    type: 'multiple',
    question: 'Which properties does the equals contract require?',
    options: [
      { id: 'a', text: 'x.equals(x) is true' },
      { id: 'b', text: 'x.equals(y) has the same result as y.equals(x)' },
      { id: 'c', text: 'Equality is transitive' },
      { id: 'd', text: 'Two equal objects may return different hash codes' },
      { id: 'e', text: 'x.equals(null) is false' },
    ],
    correctOptionIds: ['a', 'b', 'c', 'e'],
    explanation:
      'equals must be reflexive, symmetric, and transitive, and it must return false for a null argument. Equal objects that returned different hash codes would also break the hashCode contract, so that option is not a permitted property.',
    reference: 'java.lang.Object.equals',
  }),
  q({
    category: 'equals and hashCode',
    question: 'What does the equals method inherited from Object do?',
    options: [
      { id: 'a', text: 'It returns true only when both references are the same object' },
      { id: 'b', text: 'It compares every field by reflection' },
      { id: 'c', text: 'It compares hash codes' },
      { id: 'd', text: 'It always returns false' },
    ],
    correctOptionIds: ['a'],
    explanation:
      'Object.equals is reference equality, the same test as == for the two receivers. A class that wants value equality overrides equals and compares the fields that define that value.',
    reference: 'java.lang.Object.equals',
  }),
  q({
    category: 'equals and hashCode',
    difficulty: 'hard',
    question:
      'An object is placed in a HashSet. Code then changes a field that its equals and hashCode methods use, and a later contains call with that same object returns false. Why?',
    options: [
      {
        id: 'a',
        text: 'The set looks in the bucket for the new hash code, while the object still sits in the bucket for the old hash code',
      },
      { id: 'b', text: 'HashSet copied the fields at insertion and ignores the live object' },
      { id: 'c', text: 'HashSet throws as soon as a field of an element is written' },
      { id: 'd', text: 'contains switches to == after the first mutation' },
    ],
    correctOptionIds: ['a'],
    explanation:
      'The set does not move an element when its hash changes. Lookup hashes the object as it is now and searches that bucket, so it never inspects the bucket where the element was stored. Fields that participate in equals and hashCode need to stay fixed while the object is in the set.',
    reference: 'java.lang.Object.hashCode and java.util.HashSet',
  }),
  q({
    category: 'equals and hashCode',
    difficulty: 'hard',
    question:
      'Parent.equals uses instanceof Parent and compares id. Child.equals uses instanceof Child and compares id plus another field. A Parent and a Child have the same id. What is wrong when parent.equals(child) is true?',
    options: [
      { id: 'a', text: 'child.equals(parent) is false, so symmetry fails' },
      { id: 'b', text: 'The methods cannot compile' },
      { id: 'c', text: 'Reflexivity fails for every Parent' },
      { id: 'd', text: 'The contract is satisfied because only one direction needs to be true' },
    ],
    correctOptionIds: ['a'],
    explanation:
      'Symmetry requires both directions to agree. The parent accepts the child because the child is a Parent with the same id, while the child rejects the parent because a Parent is not a Child. Equality must not depend on which object is the receiver.',
    reference: 'java.lang.Object.equals',
  }),
  q({
    category: 'equals and hashCode',
    question:
      'Which hashCode implementation stays consistent with an equals method that uses two fields?',
    options: [
      { id: 'a', text: 'Objects.hash of those same two fields' },
      { id: 'b', text: 'System.identityHashCode(this)' },
      { id: 'c', text: 'A fresh Random.nextInt() on every call' },
      { id: 'd', text: 'The length of the class name only' },
    ],
    correctOptionIds: ['a'],
    explanation:
      'Objects.hash mixes the hash codes of the values it receives. Passing the fields that equals compares means equal objects produce the same hash. identityHashCode follows the reference, so two equal but distinct objects would disagree, and a new random value would change between calls.',
    reference: 'java.util.Objects.hash',
  }),
  q({
    category: 'equals and hashCode',
    question: 'What does the hashCode contract say about stability?',
    options: [
      {
        id: 'a',
        text: 'The result must stay the same during one execution while the equals fields do not change, and it may differ in another execution',
      },
      { id: 'b', text: 'The result must be identical across JVM restarts' },
      {
        id: 'c',
        text: 'The result must change when any field changes, including fields that equals ignores',
      },
      { id: 'd', text: 'The result must be the time at which the object was constructed' },
    ],
    correctOptionIds: ['a'],
    explanation:
      'Collections need a stable hash only while an object is used as a key or set element. The specification does not require the same integer in a later process, so a stored hash code is not a permanent identifier.',
    reference: 'java.lang.Object.hashCode',
  }),
  q({
    category: 'equals and hashCode',
    question: 'Two unequal objects return the same hashCode. What may a HashMap do?',
    options: [
      { id: 'a', text: 'Store both in the same bucket and distinguish them with equals' },
      { id: 'b', text: 'Reject the second key' },
      { id: 'c', text: 'Treat them as one key' },
      { id: 'd', text: 'Throw IllegalArgumentException' },
    ],
    correctOptionIds: ['a'],
    explanation:
      'A collision means the search starts in the same bucket. equals then tells the keys apart, so both entries can be stored. The map does not require hash codes to be unique.',
    reference: 'java.util.HashMap',
  }),
  q({
    category: 'equals and hashCode',
    question: 'How does String.equals decide that two strings are equal?',
    options: [
      { id: 'a', text: 'It compares the sequence of characters' },
      { id: 'b', text: 'It compares the references only' },
      { id: 'c', text: 'It compares the hash codes and ignores the characters' },
      { id: 'd', text: 'It returns true only when both strings were string literals' },
    ],
    correctOptionIds: ['a'],
    explanation:
      'String overrides equals and compares characters, so two distinct String objects with the same contents are equal. == would still test identity, and equal hash codes alone would treat a collision as equality.',
    reference: 'java.lang.String.equals',
  }),
  q({
    category: 'equals and hashCode',
    difficulty: 'easy',
    question: 'What do the equals and hashCode methods generated for a record use?',
    options: [
      { id: 'a', text: 'The record components' },
      { id: 'b', text: 'Only the object identity' },
      { id: 'c', text: 'The simple name of the record class' },
      { id: 'd', text: 'Nothing, because a record cannot be stored in a HashSet' },
    ],
    correctOptionIds: ['a'],
    explanation:
      'A record is a transparent carrier of its components. The generated equals and hashCode use those component values, so two records of the same class with equal components are equal and share a hash code.',
    reference: 'Java Language Specification — Record Classes (§8.10)',
  }),
  q({
    category: 'equals and hashCode',
    difficulty: 'hard',
    question: 'What is true of new BigDecimal("1.0") and new BigDecimal("1.00")?',
    options: [
      { id: 'a', text: 'equals returns false, and compareTo returns 0' },
      { id: 'b', text: 'equals and compareTo both report that the values are equal' },
      { id: 'c', text: 'equals returns true, and compareTo returns a nonzero value' },
      { id: 'd', text: 'Both methods throw ArithmeticException' },
    ],
    correctOptionIds: ['a'],
    explanation:
      'BigDecimal.equals requires the same numeric value and the same scale, so 1.0 and 1.00 are not equal. compareTo compares the numeric value only and returns 0. A HashSet therefore keeps both, while a TreeSet ordered by compareTo can treat them as duplicates.',
    reference: 'java.math.BigDecimal.equals and compareTo',
  }),
  tf(
    'Methods such as concat and replace leave the original String instance unchanged and return a new string.',
    true,
    {
      category: 'Immutability',
      explanation:
        'A String never mutates its character sequence. An operation that looks like an edit allocates another String, so a shared string can be passed to other code without copying its text first.',
      reference: 'java.lang.String',
    },
  ),
  tf('Declaring a class final is enough to make its instances immutable.', false, {
    category: 'Immutability',
    explanation:
      'final prevents subclassing, which closes one route to extra mutable behavior. The instances are still mutable if the class has setters, assigns its fields after construction, or shares a mutable object with callers.',
    reference: 'Java Language Specification — final Classes (§8.1.1.2)',
  }),
  q({
    category: 'Immutability',
    type: 'multiple',
    question: 'Which practices are part of making instances deeply immutable?',
    options: [
      { id: 'a', text: 'No method writes the fields after construction' },
      {
        id: 'b',
        text: 'Mutable components are copied when they are stored and when they are returned',
      },
      { id: 'c', text: 'A public non-final primitive field is acceptable' },
      {
        id: 'd',
        text: 'Subclasses cannot override the methods, for example because the class is final',
      },
      {
        id: 'e',
        text: 'The constructor stores a caller Date and depends on the caller to drop that reference',
      },
    ],
    correctOptionIds: ['a', 'b', 'd'],
    explanation:
      'Deep immutability means no code can observe a change in the object. Fields stay fixed after construction, mutable components are not shared, and a subclass cannot override a getter so that the observed state starts changing. A public non-final field can be assigned by any caller, and a stored Date can still be mutated through the caller reference.',
    reference: 'Java Language Specification — final Field Semantics (§17.5)',
  }),
  q({
    category: 'Immutability',
    question: 'Which statement about StringBuilder is correct?',
    options: [
      {
        id: 'a',
        text: 'StringBuilder modifies its own buffer; it is not a substitute for an immutable String',
      },
      { id: 'b', text: 'StringBuilder is immutable, like String' },
      { id: 'c', text: 'Both String and StringBuilder reject append' },
      {
        id: 'd',
        text: 'append on a StringBuilder that is a HashMap key cannot affect later lookups',
      },
    ],
    correctOptionIds: ['a'],
    explanation:
      'append and the related methods change the builder in place. Its contents can change after it is created, so it does not have the value semantics of a String. Using a mutable buffer as a map key is unsafe once those contents affect equality.',
    reference: 'java.lang.StringBuilder',
  }),
  q({
    category: 'Immutability',
    question: 'final List<String> names = new ArrayList<>(); What is restricted?',
    options: [
      { id: 'a', text: 'names cannot be reassigned, but names.add is still allowed' },
      { id: 'b', text: 'The list cannot be modified' },
      { id: 'c', text: 'The list is unmodifiable, and the variable can still be reassigned' },
      { id: 'd', text: 'The compiler rejects the ArrayList creation' },
    ],
    correctOptionIds: ['a'],
    explanation:
      'final fixes the variable, not the object. The variable must keep referring to the same list, while that ArrayList can still gain or lose elements.',
    reference: 'Java Language Specification — final Variables (§4.12.4)',
  }),
  q({
    category: 'Immutability',
    difficulty: 'hard',
    question:
      'A class stores the Date passed to its constructor and returns that same Date from a getter. The caller then calls setTime on the Date. What is visible?',
    options: [
      { id: 'a', text: 'The state the class stored has changed, so the class is not immutable' },
      { id: 'b', text: 'setTime fails because a Date becomes immutable once it is stored' },
      { id: 'c', text: 'The getter returned a defensive copy, so the stored Date is unaffected' },
      { id: 'd', text: 'The constructor throws NullPointerException for every Date' },
    ],
    correctOptionIds: ['a'],
    explanation:
      'Date is mutable. Keeping and returning the caller reference lets the caller change a value the object treats as its state. An immutable holder copies the instant on the way in and does not hand out the stored Date.',
    reference: 'java.util.Date',
  }),
  q({
    category: 'Immutability',
    question: 'Why is a loop of text = text + piece a poor way to build a large string?',
    options: [
      {
        id: 'a',
        text: 'Each concatenation allocates a new String and copies the characters accumulated so far',
      },
      { id: 'b', text: 'The + operator is illegal on String' },
      { id: 'c', text: 'The loop mutates one shared String' },
      { id: 'd', text: 'The compiler rejects + inside a loop' },
    ],
    correctOptionIds: ['a'],
    explanation:
      'String is immutable, so each use of + allocates another string and copies the previous characters. A StringBuilder appends into one buffer and produces a single String at the end.',
    reference: 'java.lang.String and java.lang.StringBuilder',
  }),
  q({
    category: 'Immutability',
    difficulty: 'easy',
    question: 'Can code change the int stored inside an existing Integer object?',
    options: [
      { id: 'a', text: 'No. Integer provides no mutator for that value' },
      { id: 'b', text: 'Yes, through Integer.setValue' },
      { id: 'c', text: 'Yes, by assigning to the result of intValue' },
      { id: 'd', text: 'Yes, because every wrapper type is a mutable JavaBean' },
    ],
    correctOptionIds: ['a'],
    explanation:
      'The wrapped value is fixed for the life of the Integer. intValue reads it, and no method replaces it. A calculation that needs another number boxes a different Integer.',
    reference: 'java.lang.Integer',
  }),
  q({
    category: 'Immutability',
    difficulty: 'hard',
    question:
      'Why can another thread safely read an object that was safely published after construction, when its fields are final and this did not escape during construction?',
    options: [
      {
        id: 'a',
        text: 'A freeze at the end of the constructor happens-before a later read of those final fields',
      },
      { id: 'b', text: 'final fields are stored in thread-local memory forever' },
      { id: 'c', text: 'The JVM locks every final field on each read' },
      { id: 'd', text: 'The guarantee applies only to String' },
    ],
    correctOptionIds: ['a'],
    explanation:
      'The memory model gives final fields initialization safety. After the constructor finishes and the reference becomes visible, another thread that reads the reference also sees the final field values written by that constructor. Later writes to those fields do not get the same guarantee, and an immutable object does not perform them.',
    reference: 'Java Language Specification — final Field Semantics (§17.5)',
  }),
  q({
    category: 'Immutability',
    question:
      'What does List.copyOf(source) guarantee that Collections.unmodifiableList(source) does not?',
    options: [
      {
        id: 'a',
        text: 'Later modifications of the source list are not visible in the returned list',
      },
      { id: 'b', text: 'The result is a live view of the source' },
      { id: 'c', text: 'The result still accepts add' },
      { id: 'd', text: 'The result shares the source storage and reflects replacements' },
    ],
    correctOptionIds: ['a'],
    explanation:
      'copyOf places the elements in an unmodifiable list that is independent of later updates to the source. unmodifiableList only wraps the original list, so changes to that source remain visible.',
    reference: 'java.util.List.copyOf',
  }),
  q({
    category: 'Immutability',
    question: 'Why is an immutable value a sound HashMap key?',
    options: [
      {
        id: 'a',
        text: 'The fields that equals and hashCode use cannot change, so the key stays in the bucket where it was inserted',
      },
      { id: 'b', text: 'HashMap copies every key onto the calling thread stack' },
      { id: 'c', text: 'Immutable keys are stored in insertion order' },
      { id: 'd', text: 'hashCode is skipped for an immutable key' },
    ],
    correctOptionIds: ['a'],
    explanation:
      'Lookup hashes the key the caller supplies and searches that bucket. If a field that affects the hash could change after insertion, the entry would remain in the old bucket. An immutable key removes that mutation.',
    reference: 'java.util.HashMap',
  }),
  q({
    category: 'Immutability',
    question: 'What is the practical difference between StringBuffer and StringBuilder?',
    options: [
      { id: 'a', text: 'StringBuffer synchronizes its methods; StringBuilder does not' },
      { id: 'b', text: 'StringBuffer is immutable and StringBuilder is not' },
      { id: 'c', text: 'StringBuilder is safe for concurrent appends with no external locking' },
      { id: 'd', text: 'They write different character encodings' },
    ],
    correctOptionIds: ['a'],
    explanation:
      'Both types are mutable character buffers with the same essential operations. StringBuffer synchronizes those methods so one buffer can be shared across threads. StringBuilder omits that locking and is the usual choice when one thread owns the buffer.',
    reference: 'java.lang.StringBuffer and java.lang.StringBuilder',
  }),
  tf('A stream that has already performed a terminal operation cannot perform another one.', true, {
    category: 'Streams',
    explanation:
      'A terminal operation consumes the pipeline. A second terminal operation on that same stream throws IllegalStateException. The source has to supply a new stream.',
    reference: 'java.util.stream.Stream',
  }),
  tf(
    'Intermediate operations such as map and filter do not process elements until a terminal operation runs.',
    true,
    {
      category: 'Streams',
      explanation:
        'map and filter only record stages of the pipeline. The source is pulled when a terminal operation such as collect or count starts, which is why a pipeline with no terminal operation does no work.',
      reference: 'java.util.stream package',
    },
  ),
  q({
    category: 'Streams',
    type: 'multiple',
    question: 'Which of these are terminal stream operations?',
    options: [
      { id: 'a', text: 'collect' },
      { id: 'b', text: 'forEach' },
      { id: 'c', text: 'filter' },
      { id: 'd', text: 'count' },
      { id: 'e', text: 'map' },
    ],
    correctOptionIds: ['a', 'b', 'd'],
    explanation:
      'collect, forEach, and count traverse the pipeline and finish it. filter and map are intermediate: each returns another stream and waits for a terminal operation.',
    reference: 'java.util.stream.Stream',
  }),
  q({
    category: 'Streams',
    type: 'multiple',
    question: 'Which of these are intermediate stream operations?',
    options: [
      { id: 'a', text: 'map' },
      { id: 'b', text: 'filter' },
      { id: 'c', text: 'sorted' },
      { id: 'd', text: 'reduce' },
      { id: 'e', text: 'peek' },
    ],
    correctOptionIds: ['a', 'b', 'c', 'e'],
    explanation:
      'map, filter, sorted, and peek each return a stream and stay lazy. reduce combines the elements into a result and is terminal.',
    reference: 'java.util.stream.Stream',
  }),
  q({
    category: 'Streams',
    question: 'What is the role of flatMap?',
    options: [
      {
        id: 'a',
        text: 'It maps each element to a stream and concatenates those inner streams into one stream',
      },
      {
        id: 'b',
        text: 'It maps each element to exactly one element and cannot change how many results there are',
      },
      { id: 'c', text: 'It is a terminal operation that joins a list into one string' },
      { id: 'd', text: 'It removes duplicates' },
    ],
    correctOptionIds: ['a'],
    explanation:
      'map would leave a Stream of streams when the function itself returns a stream. flatMap splices the inner elements into a single stream, which is how one outer element becomes zero or more results.',
    reference: 'java.util.stream.Stream.flatMap',
  }),
  q({
    category: 'Streams',
    question: 'What does filter do?',
    options: [
      { id: 'a', text: 'It keeps elements for which the predicate returns true' },
      { id: 'b', text: 'It transforms each element into another type' },
      { id: 'c', text: 'It sorts the elements' },
      { id: 'd', text: 'It ends the stream and returns a count' },
    ],
    correctOptionIds: ['a'],
    explanation:
      'The predicate decides which elements continue. An element for which it returns false is dropped, and an element that passes is otherwise unchanged. Changing the element type is the job of map.',
    reference: 'java.util.stream.Stream.filter',
  }),
  q({
    category: 'Streams',
    difficulty: 'hard',
    question: 'Which statement about Stream.parallel() is correct?',
    options: [
      {
        id: 'a',
        text: 'Work may run on the common ForkJoinPool, and a parallel stream is not automatically faster than a sequential one',
      },
      { id: 'b', text: 'It is always faster than sequential()' },
      { id: 'c', text: 'It lets several terminal operations share one stream safely' },
      { id: 'd', text: 'findFirst is required to ignore encounter order' },
    ],
    correctOptionIds: ['a'],
    explanation:
      'parallel() can split the work across the common pool. Splitting and joining have a cost, and a small pipeline can be slower than the sequential form, so the choice needs a measurement. The stream can still be consumed only once. findFirst still respects encounter order.',
    reference: 'java.util.stream.BaseStream.parallel',
  }),
  q({
    category: 'Streams',
    difficulty: 'hard',
    question:
      'A stream is created from an ArrayList, and the forEach lambda calls list.add. What does the stream contract say?',
    options: [
      {
        id: 'a',
        text: 'The pipeline must not interfere with its source; this update can throw ConcurrentModificationException or otherwise have an undefined result',
      },
      { id: 'b', text: 'The stream copies the list first, so add is always safe' },
      { id: 'c', text: 'forEach locks the list for the whole pipeline' },
      { id: 'd', text: 'Intermediate operations never read the source' },
    ],
    correctOptionIds: ['a'],
    explanation:
      'The source of a pipeline is required to stay stable while the pipeline runs. Adding to the ArrayList during forEach is interference. A fail-fast spliterator may throw ConcurrentModificationException, and the stream documentation does not define the result.',
    reference: 'java.util.stream package — non-interference',
  }),
  q({
    category: 'Streams',
    question: 'What does findFirst return for an empty stream?',
    options: [
      { id: 'a', text: 'An empty Optional' },
      { id: 'b', text: 'null' },
      { id: 'c', text: 'Optional.of(null)' },
      { id: 'd', text: '0' },
    ],
    correctOptionIds: ['a'],
    explanation:
      'findFirst uses Optional so that a missing element is explicit. An empty stream produces Optional.empty(). Optional.of(null) would itself throw NullPointerException, and findFirst does not return a raw null.',
    reference: 'java.util.stream.Stream.findFirst',
  }),
  q({
    category: 'Streams',
    question: 'What does Collectors.groupingBy(Person::city) produce from a Stream<Person>?',
    options: [
      { id: 'a', text: 'A Map from each city to a list of the people in that city' },
      { id: 'b', text: 'One list sorted by city' },
      { id: 'c', text: 'A map from each person to that person city' },
      { id: 'd', text: 'A set containing only the city names' },
    ],
    correctOptionIds: ['a'],
    explanation:
      'groupingBy uses the classifier result as the map key and collects the matching elements under it. The default downstream collector is toList, so each city maps to the people who classified to that city.',
    reference: 'java.util.stream.Collectors.groupingBy',
  }),
  q({
    category: 'Streams',
    difficulty: 'hard',
    question:
      'Why must the identity given to reduce be a real identity for the accumulator, especially on a parallel stream?',
    options: [
      {
        id: 'a',
        text: 'Each partition can start from that identity, so a value that is not neutral is combined into the result more than once',
      },
      {
        id: 'b',
        text: 'The identity is used only for an empty stream and is ignored when elements exist',
      },
      { id: 'c', text: 'Parallel streams reject reduce' },
      { id: 'd', text: 'The identity is compared with equals instead of being accumulated' },
    ],
    correctOptionIds: ['a'],
    explanation:
      'The identity must satisfy accumulator.apply(identity, t) equal to t. A parallel reduction can apply that identity once per partition. Zero is an identity for addition; starting each partition at 1 would change the sum.',
    reference: 'java.util.stream.Stream.reduce',
  }),
  q({
    category: 'Streams',
    question:
      'What happens when a terminal operation runs on Stream.of(new Object(), new Object()).sorted()?',
    options: [
      { id: 'a', text: 'ClassCastException, because Object does not implement Comparable' },
      { id: 'b', text: 'The objects are ordered by identity hash code' },
      { id: 'c', text: 'The stream is empty' },
      { id: 'd', text: 'The call to sorted does not compile' },
    ],
    correctOptionIds: ['a'],
    explanation:
      'sorted() with no comparator casts elements to Comparable. Object does not implement Comparable, so the terminal operation fails with ClassCastException. A Comparator argument is how a stream of such objects can be ordered.',
    reference: 'java.util.stream.Stream.sorted',
  }),
  q({
    category: 'Streams',
    question: 'What is peek intended for?',
    options: [
      { id: 'a', text: 'A debugging action as elements pass an intermediate stage' },
      { id: 'b', text: 'A terminal collection into a list' },
      { id: 'c', text: 'The supported way to mutate the source collection' },
      { id: 'd', text: 'A replacement for filter' },
    ],
    correctOptionIds: ['a'],
    explanation:
      'peek returns the same elements and is intermediate, so it can observe a value as it flows. It does not collect a result. Using it to modify the source violates the non-interference requirement of the pipeline.',
    reference: 'java.util.stream.Stream.peek',
  }),
  q({
    category: 'Streams',
    difficulty: 'hard',
    question:
      'Which operations can finish without pulling every remaining element from the source?',
    options: [
      { id: 'a', text: 'anyMatch, findFirst, and limit' },
      { id: 'b', text: 'sorted and distinct only' },
      { id: 'c', text: 'map and filter' },
      { id: 'd', text: 'forEach' },
    ],
    correctOptionIds: ['a'],
    explanation:
      'anyMatch stops when one element matches, findFirst stops at the first element in encounter order, and limit stops after the requested count. map and filter do not end the pipeline by themselves, and forEach consumes what the pipeline produces.',
    reference: 'java.util.stream package — short-circuiting',
  }),
  q({
    category: 'Streams',
    question: 'Which values does IntStream.range(1, 4) contain?',
    options: [
      { id: 'a', text: '1, 2, and 3' },
      { id: 'b', text: '1, 2, 3, and 4' },
      { id: 'c', text: '0, 1, 2, and 3' },
      { id: 'd', text: '4 only' },
    ],
    correctOptionIds: ['a'],
    explanation:
      'range is exclusive at the end, so the stream stops before 4 and contains 1, 2, and 3. rangeClosed(1, 4) is the method that includes the end value.',
    reference: 'java.util.stream.IntStream.range',
  }),
  q({
    category: 'Streams',
    difficulty: 'easy',
    question:
      'A pipeline calls filter and map and never calls a terminal operation. What does the source do?',
    options: [
      { id: 'a', text: 'Nothing. The stages are lazy, and the source is not traversed' },
      { id: 'b', text: 'The source is fully traversed as soon as filter is called' },
      { id: 'c', text: 'The source is traversed when map is called' },
      { id: 'd', text: 'The pipeline throws IllegalStateException immediately' },
    ],
    correctOptionIds: ['a'],
    explanation:
      'Calling filter and map only builds the pipeline. With no terminal operation there is no demand for elements, so the predicate and the mapping function are not applied to the source.',
    reference: 'java.util.stream package',
  }),
  q({
    category: 'Streams',
    question: 'What is true of Stream.toList() since Java 16?',
    options: [
      { id: 'a', text: 'It is a terminal operation that returns an unmodifiable list' },
      { id: 'b', text: 'It returns a list that callers are guaranteed to be able to mutate' },
      { id: 'c', text: 'It is an intermediate operation' },
      { id: 'd', text: 'It rejects every non-parallel stream' },
    ],
    correctOptionIds: ['a'],
    explanation:
      'toList() ends the pipeline and accumulates an unmodifiable list. That is a stronger contract than Collectors.toList(), which does not promise an unmodifiable result.',
    reference: 'java.util.stream.Stream.toList',
  }),
  q({
    category: 'Streams',
    question: 'How does distinct decide that two elements are the same?',
    options: [
      { id: 'a', text: 'With equals' },
      { id: 'b', text: 'With == only' },
      { id: 'c', text: 'With hashCode only, ignoring equals' },
      { id: 'd', text: 'With compareTo' },
    ],
    correctOptionIds: ['a'],
    explanation:
      'distinct keeps one element from each group of elements that equals treats as the same, using hashCode the way a set does to find candidates. Two equal objects are not both kept merely because they are different references.',
    reference: 'java.util.stream.Stream.distinct',
  }),
  tf('A synchronized instance method acquires the monitor of the receiver, this.', true, {
    category: 'Concurrency',
    explanation:
      'The synchronized modifier on an instance method is the same exclusion as a synchronized (this) block around the body. A static synchronized method locks on the Class object instead.',
    reference: 'Java Language Specification — synchronized Methods (§8.4.3.6)',
  }),
  tf('Declaring a counter volatile makes counter++ an atomic increment.', false, {
    category: 'Concurrency',
    explanation:
      'volatile orders the read and the write of the variable. ++ is still a read, an add, and a write, and another thread can interleave between those steps. AtomicInteger or a synchronized block covers the whole update.',
    reference: 'java.util.concurrent.atomic.AtomicInteger',
  }),
  q({
    category: 'Concurrency',
    type: 'multiple',
    question: 'Which of these establish a happens-before relationship?',
    options: [
      {
        id: 'a',
        text: 'A write to a volatile variable happens-before a later read of that same variable',
      },
      {
        id: 'b',
        text: 'Releasing a monitor happens-before a later acquisition of that same monitor',
      },
      { id: 'c', text: 'A call to Thread.start happens-before the actions of the started thread' },
      {
        id: 'd',
        text: 'Thread.sleep by itself publishes a write to a plain field for other threads',
      },
      {
        id: 'e',
        text: 'A write to a non-volatile field, with no other synchronization, happens-before a read of that field in another thread',
      },
    ],
    correctOptionIds: ['a', 'b', 'c'],
    explanation:
      'The memory model defines happens-before for a volatile write followed by a read of that variable, for unlocking a monitor before a later lock of it, and for Thread.start before the new thread runs. sleep does not publish writes, and a data race on a plain field has no happens-before edge.',
    reference: 'Java Language Specification — Happens-before Order (§17.4.5)',
  }),
  q({
    category: 'Concurrency',
    type: 'multiple',
    question: 'Which of these types are in java.util.concurrent?',
    options: [
      { id: 'a', text: 'CountDownLatch' },
      { id: 'b', text: 'Semaphore' },
      { id: 'c', text: 'CyclicBarrier' },
      { id: 'd', text: 'The synchronized keyword' },
      { id: 'e', text: 'ArrayList' },
    ],
    correctOptionIds: ['a', 'b', 'c'],
    explanation:
      'CountDownLatch, Semaphore, and CyclicBarrier are concurrency utilities in java.util.concurrent. synchronized is a language keyword, and ArrayList is in java.util.',
    reference: 'java.util.concurrent',
  }),
  q({
    category: 'Concurrency',
    question: 'What is a data race?',
    options: [
      {
        id: 'a',
        text: 'Conflicting accesses to the same variable, at least one of them a write, that are not ordered by happens-before',
      },
      { id: 'b', text: 'Two threads calling a synchronized method on the same object' },
      { id: 'c', text: 'A thread waiting on a CountDownLatch' },
      { id: 'd', text: 'Two threads that each hold one lock and wait for the other' },
    ],
    correctOptionIds: ['a'],
    explanation:
      'The memory model defines a data race as conflicting accesses with no happens-before between them. Synchronization on the same monitor supplies that order. Threads that wait on each other locks are deadlocked, which is a different failure.',
    reference: 'Java Language Specification — Happens-before Order (§17.4.5)',
  }),
  q({
    category: 'Concurrency',
    question:
      'Why submit tasks to an ExecutorService instead of calling new Thread for every task?',
    options: [
      { id: 'a', text: 'The pool reuses threads and bounds how many tasks run at once' },
      { id: 'b', text: 'The pool runs every task on the caller thread' },
      { id: 'c', text: 'A pooled task no longer needs synchronization for shared state' },
      { id: 'd', text: 'submit returns only after the task has finished' },
    ],
    correctOptionIds: ['a'],
    explanation:
      'A thread per task spends memory and scheduling time. A pool keeps a limited set of workers and queues the rest. submit returns a Future without waiting for the task, and shared state inside the task still needs its own synchronization.',
    reference: 'java.util.concurrent.ExecutorService',
  }),
  q({
    category: 'Concurrency',
    question: 'Which difference between Callable and Runnable is correct?',
    options: [
      {
        id: 'a',
        text: 'Callable.call may return a value and may throw a checked exception; Runnable.run returns void and has no checked exception in its signature',
      },
      { id: 'b', text: 'Runnable returns a value and Callable cannot' },
      { id: 'c', text: 'The two interfaces declare the same method' },
      { id: 'd', text: 'An ExecutorService cannot accept a Callable' },
    ],
    correctOptionIds: ['a'],
    explanation:
      'call is declared to return a value and to throw Exception, so the result and checked failures are part of the type. run returns void and does not declare a checked exception. ExecutorService.submit accepts both.',
    reference: 'java.util.concurrent.Callable and java.lang.Runnable',
  }),
  q({
    category: 'Concurrency',
    difficulty: 'hard',
    question:
      'Two threads each need lock A and lock B. How does one locking order avoid a deadlock between them?',
    options: [
      {
        id: 'a',
        text: 'Both threads acquire A before B, so the thread that does not hold A waits for A instead of holding B while it waits',
      },
      { id: 'b', text: 'Each thread acquires the two locks in the opposite order from the other' },
      { id: 'c', text: 'Each thread sleeps between the two acquisitions' },
      { id: 'd', text: 'Deadlock cannot occur once a program uses more than one lock' },
    ],
    correctOptionIds: ['a'],
    explanation:
      'This deadlock needs each thread to hold one lock and wait for the other. If every thread takes A first, the second thread blocks on A and cannot already hold B. Opposite orders are what create the cycle. Sleep does not establish an acquisition order.',
    reference: 'Java Language Specification — Synchronization (§17.1)',
  }),
  q({
    category: 'Concurrency',
    question: 'What does ConcurrentHashMap.compute guarantee for one key?',
    options: [
      {
        id: 'a',
        text: 'The remapping function is applied atomically for that key with respect to other map updates of the same key',
      },
      { id: 'b', text: 'The entire map is locked for every compute call' },
      { id: 'c', text: 'A null key is stored when the function returns null' },
      { id: 'd', text: 'The function runs with no atomicity' },
    ],
    correctOptionIds: ['a'],
    explanation:
      'compute performs the read-modify-write of a single key atomically relative to other updates of that key, so two threads do not lose one of the updates. Null keys and null values are still rejected.',
    reference: 'java.util.concurrent.ConcurrentHashMap.compute',
  }),
  q({
    category: 'Concurrency',
    question:
      'What does Thread.interrupt do to a thread that is running ordinary code and is not blocked in an interruptible wait?',
    options: [
      {
        id: 'a',
        text: 'It sets the interrupt status. The thread keeps running until it checks that status or calls a method that honors the interrupt',
      },
      { id: 'b', text: 'It stops the thread at once and rolls its stack back' },
      { id: 'c', text: 'It terminates the JVM' },
      { id: 'd', text: 'It has no effect, and the interrupt status stays clear' },
    ],
    correctOptionIds: ['a'],
    explanation:
      'Interruption is cooperative. When the target is not inside sleep, wait, or a similar interruptible park, interrupt only sets a flag. The thread observes it by calling interrupted or isInterrupted, or by entering a method that throws InterruptedException.',
    reference: 'java.lang.Thread.interrupt',
  }),
  q({
    category: 'Concurrency',
    difficulty: 'hard',
    question: 'Why is the field in the classic double-checked locking idiom declared volatile?',
    options: [
      {
        id: 'a',
        text: 'So a thread that sees the published reference also sees the writes performed by the constructor',
      },
      { id: 'b', text: 'So the constructor is required to run twice' },
      { id: 'c', text: 'Because volatile makes construction throw checked exceptions' },
      { id: 'd', text: 'Because a non-volatile field cannot be read from a static method' },
    ],
    correctOptionIds: ['a'],
    explanation:
      'Without volatile, a thread can observe the stored reference before it observes the field writes from the constructor. A volatile write of the reference orders those constructor writes before a later read of the reference.',
    reference: 'Java Language Specification — Memory Model (§17.4)',
  }),
  q({
    category: 'Concurrency',
    question: 'What must the caller of ReentrantLock.lock() do?',
    options: [
      {
        id: 'a',
        text: 'Call unlock in a finally block so the lock is released when the body throws',
      },
      { id: 'b', text: 'Nothing, because the lock releases itself when the method returns' },
      { id: 'c', text: 'Call lock a second time to release it' },
      { id: 'd', text: 'Call Thread.interrupt to release it' },
    ],
    correctOptionIds: ['a'],
    explanation:
      'ReentrantLock is not tied to a lexical block the way synchronized is. If the protected code throws before unlock, the lock stays held. finally runs on that path, so unlock belongs there.',
    reference: 'java.util.concurrent.locks.ReentrantLock',
  }),
  q({
    category: 'Concurrency',
    difficulty: 'easy',
    question: 'What is the difference between thread.start() and thread.run()?',
    options: [
      {
        id: 'a',
        text: 'start schedules run on a new thread of execution; a direct call to run executes it on the caller thread',
      },
      {
        id: 'b',
        text: 'run creates the operating-system thread, and start only contains user code',
      },
      { id: 'c', text: 'The two calls have the same effect' },
      { id: 'd', text: 'start may be called any number of times on the same Thread object' },
    ],
    correctOptionIds: ['a'],
    explanation:
      'start creates the new thread and then invokes run on it. A direct run call is an ordinary method call on the current thread. The same Thread object accepts start only once; a second start throws IllegalThreadStateException.',
    reference: 'java.lang.Thread.start',
  }),
  q({
    category: 'Concurrency',
    question: 'What does an iterator from a CopyOnWriteArrayList observe?',
    options: [
      {
        id: 'a',
        text: 'A snapshot of the array from iterator creation, so a later update of the list does not throw ConcurrentModificationException',
      },
      { id: 'b', text: 'Every add that happens after the iterator is created' },
      { id: 'c', text: 'A fail-fast view that throws as soon as the list changes' },
      { id: 'd', text: 'No elements, because the list cannot be iterated' },
    ],
    correctOptionIds: ['a'],
    explanation:
      'A writer replaces the backing array instead of mutating it in place. The iterator keeps the array it started with, so later updates are invisible to it and do not invalidate it.',
    reference: 'java.util.concurrent.CopyOnWriteArrayList',
  }),
  q({
    category: 'Concurrency',
    difficulty: 'hard',
    question: 'Why does a class often synchronize on a private final object instead of on this?',
    options: [
      {
        id: 'a',
        text: 'External code cannot acquire that monitor, so it cannot interfere with the internal locking policy',
      },
      {
        id: 'b',
        text: 'A private object is not a real monitor, so the block is faster by definition',
      },
      { id: 'c', text: 'synchronized (this) does not exclude any other thread' },
      { id: 'd', text: 'A private lock is released without leaving the synchronized block' },
    ],
    correctOptionIds: ['a'],
    explanation:
      'When the public instance is the lock, caller code can synchronize on it and deadlock against, or accidentally widen, the class own exclusion. A private final lock is visible only inside the class. The synchronized block is still what releases it.',
    reference: 'Java Language Specification — The synchronized Statement (§14.19)',
  }),
  q({
    category: 'Concurrency',
    question:
      'What does AtomicInteger.incrementAndGet guarantee that a plain int increment does not?',
    options: [
      {
        id: 'a',
        text: 'The read, the addition, and the write happen as one atomic update, and the returned value is the result of that update',
      },
      { id: 'b', text: 'The field becomes volatile and the increment stays non-atomic' },
      { id: 'c', text: 'The increment is deferred until the thread exits' },
      { id: 'd', text: 'Every other field of the surrounding object is copied' },
    ],
    correctOptionIds: ['a'],
    explanation:
      'incrementAndGet uses an atomic hardware operation or a compare-and-set loop, so another atomic update of that integer cannot land in the middle. A plain i++ can lose updates when threads interleave. The method returns the updated value.',
    reference: 'java.util.concurrent.atomic.AtomicInteger',
  }),
  tf('The JDK and the JVM are two names for the same component.', false, {
    category: 'JVM',
    explanation:
      'The JVM executes bytecode. The JDK is the development kit and includes a JVM together with tools such as javac. The two names refer to different things.',
    reference: 'Java SE documentation — JDK and JVM',
  }),
  tf('javac writes bytecode into class files, and the JVM executes that bytecode.', true, {
    category: 'JVM',
    explanation:
      'javac does not have to emit a native executable. It writes bytecode that the JVM verifies and runs. A JIT may later compile hot methods to machine code inside that process.',
    reference: 'Java Virtual Machine Specification — The class File Format',
  }),
  q({
    category: 'JVM',
    type: 'multiple',
    question: 'Which statements match the JVM run-time data areas?',
    options: [
      { id: 'a', text: 'The heap is shared by application threads' },
      { id: 'b', text: 'Each Java thread has its own JVM stack' },
      { id: 'c', text: 'All Java threads share a single JVM stack' },
      { id: 'd', text: 'Each Java thread has its own program counter' },
      { id: 'e', text: 'Class metadata is stored in Metaspace' },
    ],
    correctOptionIds: ['a', 'b', 'd', 'e'],
    explanation:
      'Instances live on a heap that threads share. Each thread has its own stack of frames and its own program counter, so threads can execute different methods at the same time. Metaspace holds class metadata. There is no single JVM stack shared by every thread.',
    reference: 'Java Virtual Machine Specification — Run-Time Data Areas (§2.5)',
  }),
  q({
    category: 'JVM',
    type: 'multiple',
    question: 'Which situations can throw OutOfMemoryError?',
    options: [
      { id: 'a', text: 'The Java heap cannot satisfy an allocation' },
      { id: 'b', text: 'Metaspace cannot store more class metadata' },
      { id: 'c', text: 'The JVM cannot create a native thread' },
      { id: 'd', text: 'A method catches a NullPointerException' },
    ],
    correctOptionIds: ['a', 'b', 'c'],
    explanation:
      'OutOfMemoryError is raised when the JVM cannot obtain heap space, Metaspace, or a native thread. Catching an unrelated NullPointerException is ordinary control flow and does not by itself exhaust those resources.',
    reference: 'java.lang.OutOfMemoryError',
  }),
  q({
    category: 'JVM',
    question:
      'A local variable holds a reference to an ordinary object. Where do the reference and the object live?',
    options: [
      {
        id: 'a',
        text: 'The reference is in the method frame on that thread stack, and the object is on the heap',
      },
      { id: 'b', text: 'Both always live on the stack' },
      { id: 'c', text: 'Both live in Metaspace' },
      { id: 'd', text: 'The object is on the stack and the reference is on the heap' },
    ],
    correctOptionIds: ['a'],
    explanation:
      'A frame stores the local variables of one invocation, including the bits of a reference. The instance is allocated on the heap so it can outlive the call when the reference escapes. Metaspace stores class metadata, not ordinary instances.',
    reference: 'Java Virtual Machine Specification — Run-Time Data Areas (§2.5)',
  }),
  q({
    category: 'JVM',
    question: 'What does System.gc() guarantee?',
    options: [
      { id: 'a', text: 'Nothing about a collection actually running. The call is a hint' },
      { id: 'b', text: 'A full collection finishes before the call returns' },
      { id: 'c', text: 'Every unreachable object is finalized before the call returns' },
      { id: 'd', text: 'The heap is resized to the -Xmx limit' },
    ],
    correctOptionIds: ['a'],
    explanation:
      'The specification allows System.gc to do nothing. A runtime may start a collection, but portable code cannot depend on that timing. Resources that must be released use close or try-with-resources.',
    reference: 'java.lang.System.gc',
  }),
  q({
    category: 'JVM',
    question: 'Which order describes how a class is brought into use?',
    options: [
      {
        id: 'a',
        text: 'Loading, then linking (verification, preparation, and resolution), then initialization',
      },
      { id: 'b', text: 'Initialization, then loading, then verification' },
      { id: 'c', text: 'main runs, and only then is its class loaded' },
      { id: 'd', text: 'Symbolic references are resolved before the class bytes are loaded' },
    ],
    correctOptionIds: ['a'],
    explanation:
      'Loading finds the class bytes. Linking verifies them, prepares static storage, and resolves symbolic references as required. Initialization runs the static initializers and is the step that executes the class own initialization code.',
    reference: 'Java Virtual Machine Specification — Linking (§5.4) and Initialization (§5.5)',
  }),
  q({
    category: 'JVM',
    difficulty: 'hard',
    question: 'When do static initializers of a class run?',
    options: [
      {
        id: 'a',
        text: 'Before the class is first actively used, and the JVM runs them once even if several threads race to use the class',
      },
      { id: 'b', text: 'On every new expression, including the second instance' },
      { id: 'c', text: 'Only when main is declared in that same class' },
      { id: 'd', text: 'Twice when two threads call a static method at the same moment' },
    ],
    correctOptionIds: ['a'],
    explanation:
      'An active use, such as creating an instance or invoking a static method, triggers initialization. The JVM synchronizes that procedure so one thread runs the static initializers and waiters observe a class that has already been initialized.',
    reference: 'Java Virtual Machine Specification — Initialization (§5.5)',
  }),
  q({
    category: 'JVM',
    question: 'What does the JIT compiler do?',
    options: [
      {
        id: 'a',
        text: 'It compiles frequently executed bytecode to native machine code while the program runs',
      },
      { id: 'b', text: 'It replaces javac and reads source files as the program starts' },
      { id: 'c', text: 'It interprets .java files directly' },
      { id: 'd', text: 'It only verifies class-file headers' },
    ],
    correctOptionIds: ['a'],
    explanation:
      'The JVM executes bytecode and identifies methods that run often. The JIT compiles those methods to native code so later invocations skip interpretation. javac has already produced the class files before the process starts.',
    reference: 'HotSpot Virtual Machine — JIT compilation',
  }),
  q({
    category: 'JVM',
    difficulty: 'hard',
    question: 'What may the JIT do with an object that never escapes the allocating method?',
    options: [
      {
        id: 'a',
        text: 'It may remove the heap allocation and keep the fields in registers or on the stack',
      },
      { id: 'b', text: 'It must allocate the object in Metaspace' },
      { id: 'c', text: 'It must publish the object to other threads' },
      { id: 'd', text: 'It refuses to compile that method' },
    ],
    correctOptionIds: ['a'],
    explanation:
      'Escape analysis can prove that no other method or thread can observe the reference. The JIT may then scalar-replace the object so the allocation does not occur. Application code should not rely on that optimization for correctness.',
    reference: 'HotSpot Virtual Machine — escape analysis',
  }),
  q({
    category: 'JVM',
    difficulty: 'hard',
    question: 'Where does a current JVM store interned String objects?',
    options: [
      { id: 'a', text: 'On the heap' },
      { id: 'b', text: 'In the permanent generation, which Java 8 still uses for the pool' },
      { id: 'c', text: 'On the stack of the thread that called intern' },
      { id: 'd', text: 'In the program counter' },
    ],
    correctOptionIds: ['a'],
    explanation:
      'Since Java 7 the interned-string pool has lived on the ordinary heap, so those strings follow normal heap limits and collection. Permanent generation was removed in Java 8. Metaspace holds class metadata, not the string pool.',
    reference: 'Java SE 7 — interned strings on the heap',
  }),
  q({
    category: 'JVM',
    question: 'What does the -Xmx launcher flag set?',
    options: [
      { id: 'a', text: 'The maximum size of the Java heap' },
      { id: 'b', text: 'The maximum size of every thread stack' },
      { id: 'c', text: 'The filesystem location of the JDK' },
      { id: 'd', text: 'The number of JIT compiler threads only' },
    ],
    correctOptionIds: ['a'],
    explanation:
      '-Xmx caps how large the heap may grow. An allocation that cannot be satisfied inside that limit throws OutOfMemoryError. The per-thread stack size is controlled separately by -Xss.',
    reference: 'java launcher — -Xmx',
  }),
  q({
    category: 'JVM',
    question: 'What does the java launcher do with a class that declares the standard main method?',
    options: [
      { id: 'a', text: 'It starts a JVM and invokes that main method' },
      {
        id: 'b',
        text: 'It recompiles the class into a native executable and deletes the class file',
      },
      { id: 'c', text: 'It verifies the class and exits before main' },
      { id: 'd', text: 'It runs main inside the javac process' },
    ],
    correctOptionIds: ['a'],
    explanation:
      'The launcher starts the process that hosts the JVM, loads the named class, and calls main with the program arguments. javac is the separate tool that produced the class file.',
    reference: 'java launcher tool',
  }),
  q({
    category: 'JVM',
    question: 'Why is Object.finalize a poor way to release a resource?',
    options: [
      {
        id: 'a',
        text: 'It may never run, its timing is unspecified, and it is deprecated for removal',
      },
      {
        id: 'b',
        text: 'It runs at a specified moment before every return from the allocating method',
      },
      { id: 'c', text: 'It is the required replacement for AutoCloseable' },
      { id: 'd', text: 'The JVM calls it synchronously at the end of the constructor' },
    ],
    correctOptionIds: ['a'],
    explanation:
      'Finalization is not prompt, and the JVM is not required to finalize every object before exit. The method is deprecated for removal. Deterministic cleanup implements AutoCloseable and uses try-with-resources.',
    reference: 'java.lang.Object.finalize',
  }),
  q({
    category: 'JVM',
    question: 'What is the difference between a stack frame and Metaspace?',
    options: [
      {
        id: 'a',
        text: 'A frame holds the state of one method invocation, including locals; Metaspace holds class metadata such as the runtime representation of methods',
      },
      { id: 'b', text: 'They are two names for the same area' },
      { id: 'c', text: 'Metaspace holds ordinary instances, and frames hold class metadata' },
      { id: 'd', text: 'One frame is shared by every thread in the process' },
    ],
    correctOptionIds: ['a'],
    explanation:
      'Each call pushes a frame on that thread stack. The frame stores locals and operand state and is discarded when the call returns. Metaspace is process-wide storage for loaded classes, not for one invocation.',
    reference: 'Java Virtual Machine Specification — Frames (§2.6) and Method Area (§2.5.4)',
  }),
];

const difficulties = new Set(['easy', 'medium', 'hard']);
const types = new Set(['single', 'multiple', 'truefalse']);
const ids = new Set();
const difficultyCount = { easy: 0, medium: 0, hard: 0 };
const typeCount = { single: 0, multiple: 0, truefalse: 0 };
const categoryCount = {};

for (const question of questions) {
  if (ids.has(question.id)) throw new Error(`Duplicate id ${question.id}`);
  ids.add(question.id);
  if (!question.question || !question.explanation || !question.reference)
    throw new Error(`Missing copy ${question.id}`);
  if (!difficulties.has(question.difficulty) || !types.has(question.type))
    throw new Error(`Bad enum ${question.id}`);
  if (!question.cert.includes('Java')) throw new Error(`Missing Java cert ${question.id}`);
  const optionIds = new Set(question.options.map((option) => option.id));
  if (optionIds.size !== question.options.length)
    throw new Error(`Duplicate options ${question.id}`);
  const correct = new Set(question.correctOptionIds);
  if ([...correct].some((id) => !optionIds.has(id)))
    throw new Error(`Bad correct id ${question.id}`);
  if ((question.type === 'single' || question.type === 'truefalse') && correct.size !== 1) {
    throw new Error(`Single answer expected ${question.id}`);
  }
  if (question.type === 'multiple' && correct.size < 2)
    throw new Error(`Multiple answer expected ${question.id}`);
  if (question.type === 'truefalse' && question.options.length !== 2)
    throw new Error(`True/false shape ${question.id}`);
  difficultyCount[question.difficulty] += 1;
  typeCount[question.type] += 1;
  categoryCount[question.category] = (categoryCount[question.category] ?? 0) + 1;
}

if (questions.length !== 139) throw new Error(`Expected 139 questions, found ${questions.length}`);
if (typeCount.single !== 105 || typeCount.multiple !== 15 || typeCount.truefalse !== 19) {
  throw new Error(`Unexpected type mix ${JSON.stringify(typeCount)}`);
}
if (difficultyCount.easy !== 31 || difficultyCount.medium !== 77 || difficultyCount.hard !== 31) {
  throw new Error(`Unexpected difficulty mix ${JSON.stringify(difficultyCount)}`);
}

const output = resolve(dirname(fileURLToPath(import.meta.url)), '../public/assets/questions.json');
await mkdir(dirname(output), { recursive: true });
await writeFile(output, `${JSON.stringify(questions, null, 2)}\n`);
console.log(`Wrote ${questions.length} questions to ${output}`);
console.log(JSON.stringify({ difficultyCount, typeCount, categoryCount }, null, 2));
