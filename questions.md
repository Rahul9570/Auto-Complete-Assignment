1. What is the difference between Component and PureComponent? Give
an example where it might break my app.

ans:-In React, both `Component` and `PureComponent` are base classes that you can extend to create reusable UI components. The main difference between them lies in how they handle component updates and rerendering.

1. `Component`: The `Component` class is the base class for creating React components. When a component receives new props or its state changes, React triggers a rerender of that component and its child components by default, regardless of whether the new props or state values are actually different from the previous ones. This can potentially lead to unnecessary renders and performance implications in certain scenarios.

Example where it might break your app:
Let's say we have a parent component that renders a list of child components. If the parent component receives new props or its state changes frequently, even if the changes do not affect the child components, using `Component` as the base class for the child components can cause unnecessary rerenders of the child components, leading to decreased performance.

2. `PureComponent`: The `PureComponent` class, on the other hand, is an extension of `Component` that implements a shallow comparison of the component's `props` and `state` to determine whether a rerender is necessary. It automatically implements the `shouldComponentUpdate` method, which performs the shallow comparison and prevents rerendering if the `props` and `state` remain the same.

Example where it might break your app:
Using `PureComponent` can potentially break your app if your component relies on complex data structures or deeply nested objects. Since `PureComponent` only performs a shallow comparison, it might not detect changes in nested properties of objects or arrays, resulting in incorrect rendering. In such cases, it is recommended to use `Component` and implement a custom `shouldComponentUpdate` method to perform a deep comparison or use libraries like `Immutable.js` for handling immutable data structures.

In general, it's advisable to use `PureComponent` when you have simple props and state and want to optimize performance by avoiding unnecessary rerenders. However, you should be cautious when using `PureComponent` in scenarios where complex data structures or deeply nested objects are involved to ensure accurate rendering and prevent potential issues.


2. Context + ShouldComponentUpdate might be dangerous. Why is that?


ans:-Using Context and shouldComponentUpdate together can potentially lead to unexpected behavior and bugs in your application. This combination can be dangerous due to the way shouldComponentUpdate works in relation to the Context API.

The shouldComponentUpdate method is used to determine whether a component should rerender or not. It compares the previous and current props and state of a component to decide if a rerender is necessary. If it returns false, the component will not rerender.

When Context is used in a component hierarchy, any change in the context value will trigger a rerender of all the components that are consuming that context. This means that even if shouldComponentUpdate returns false, the components will still rerender if the context value changes.


3. Describe 3 ways to pass information from a component to its PARENT
ans:-
There are several ways to pass information from a child component to its parent component in React. Here are three commonly used methods:

Callback Functions:

The parent component can define a callback function and pass it as a prop to the child component.

The child component can invoke the callback function with the desired information as an argument whenever needed.

This allows the child component to communicate with its parent and pass data back to it.


Context API:

The Context API provides a way to share data across the component tree without explicitly passing it through props.

The parent component can create a context and provide a value that can be accessed by its child components.

The child component can consume the context and access the information provided by the parent.


Props with Arrow Functions (ES6):

Using arrow functions, you can define an anonymous function within the child component and invoke it, passing the desired information as an argument.

This allows the child component to call the function provided by the parent, passing the required data.



4. Give 2 ways to prevent components from re-rendering.

ans:-Use React.memo():

React provides the React.memo() higher-order component (HOC) to memoize functional components.

React.memo() wraps the functional component and prevents it from re-rendering if its props haven't changed.


Use the useMemo() hook:

The useMemo() hook allows you to memoize a value and prevent re-evaluation of that value on subsequent renders.

By providing a dependency array as the second argument to useMemo(), you can specify when the value should be recalculated.


5. What is a fragment and why do we need it? Give an example where it might 
break my app.

ans:-In React, a fragment is a special component that allows you to group multiple elements together without introducing an additional wrapper element in the DOM. Fragments are useful when you want to return multiple elements from a component's render method without adding extra markup to the resulting HTML structure.

Why do we need fragments?

Avoid unnecessary DOM elements: Fragments help reduce the number of unnecessary DOM elements in the rendered output, resulting in a cleaner HTML structure.
Prevent styling and layout issues: By avoiding the introduction of extra wrapper elements, fragments can help prevent potential CSS styling conflicts or layout issues caused by additional elements.
Improve performance: Fragments can have performance benefits by reducing the overall size of the rendered DOM tree, which can lead to faster rendering and improved application performance.


6. Give 3 examples of the HOC pattern.

ans:-

withErrorHandling HOC:

An withErrorHandling HOC can be used to add error handling to a component. It wraps the component and catches any errors that occur during rendering or component lifecycle methods.

It can display an error message or fallback UI in case of an error.

withLocalStorage HOC:

An withLocalStorage HOC can be used to add local storage functionality to a component. It wraps the component and provides methods to read from and write to the local storage.

It can persist data between sessions or handle caching logic.


withHoverEffect HOC:

An withHoverEffect HOC can be used to add hover effect functionality to a component. It wraps the component and provides additional props to handle hover events.

It can apply styles or trigger actions when the component is hovered over.


7. What's the difference in handling exceptions in promises, callbacks
and async…await?

ans:- Exception handling differs in Promises, callbacks, and async/await in terms of syntax and error propagation. Here's a breakdown of the differences:

Promises:

In Promises, errors are handled using .catch() or chaining .then() with a second argument for error handling.

Errors within a Promise can be caught and handled at the point where the Promise is consumed.

Callbacks:

Callbacks traditionally handle errors by passing an additional argument for the error.

The convention is to use the first argument for errors and subsequent arguments for the successful result.

Error handling usually involves checking if the error argument is present and handling it accordingly.

Async/Await:

Async/await provides a more synchronous and expressive syntax for working with Promises.

It allows you to write asynchronous code that looks and behaves like synchronous code.

Error handling in async/await is done using try/catch blocks, making the code more readable and structured.


8. How many arguments does setState take and why is it async.

ans:-setState() in React takes two arguments: an object representing the updated state and an optional callback function.

setState in react is async:-
This is because setState alters the state and causes rerendering. This can be an expensive operation and making it synchronous might leave the browser unresponsive.


9. List the steps needed to migrate a Class to Function Component.
   
ans:- To migrate a class component to a function component in React, you can follow these steps:

1. Rewrite the component as a function: Convert the class component into a regular JavaScript function.

2. Remove the `render()` method: In function components, the component logic goes directly into the function body, so you can remove the `render()` method.

3. Replace `this.props` with the `props` parameter: In function components, the component's props are passed as an argument to the function. Replace `this.props` with `props` within the function body.

4. Remove the constructor and `state` usage: Since function components don't have a constructor, you'll need to remove it. Also, remove any references to `this.state` and replace them with the `useState()` hook for managing state.

5. Move lifecycle methods to `useEffect()` hook: If your class component has lifecycle methods like `componentDidMount()`, `componentDidUpdate()`, or `componentWillUnmount()`, you can move the relevant logic into the `useEffect()` hook in the function component.

6. Remove `this` references: In function components, you don't need to use `this` to access component methods or props. Simply use the function's scope to access variables and props directly.

7. Update component name and export: Rename the component function and update the export statement to export the function component instead of the class component.


10. List a few ways styles can be used with components.

ans:-
In React, there are several ways to apply styles to components. Here are a few common methods:

Inline Styles:

Inline styles allow you to apply styles directly within the JSX of a component using the style attribute.

Styles are defined as JavaScript objects, where the keys are CSS properties in camelCase, and the values are the corresponding CSS values.


CSS Modules:

CSS Modules enable local scoping of styles by automatically generating unique class names for each component.

Styles are defined in separate CSS files and imported as objects in the component's JavaScript file.

The imported styles are then applied to the appropriate JSX elements using the defined class names.


CSS-in-JS Libraries:

CSS-in-JS libraries, such as styled-components, Emotion, or Aphrodite, allow you to write CSS directly within your JavaScript code.

Styles are defined as template literals or JavaScript objects and can be applied to components using the library's syntax.


External CSS Frameworks:

we can utilize external CSS frameworks like Bootstrap or Tailwind CSS by including their stylesheets in your React application.

The classes and styles provided by the CSS frameworks can be applied to React components using the className attribute.



11. How to render an HTML string coming from the server?

ans:- We can use dangerouslySetInnerHTML attributes to render your html strings.




