# Genopets Take-Home Challenge::Logan Call

## Task 1

Implement the full survey functionality and allow submission to the API. For “ranked” questions, you must allow the user to select the choices in order of preference, as seen here:

![task-one-image-1](/.readme-assets/task-one-image-1.png)

### Explanation of Completion

1. Move form values into controlled state
2. Add ranked field logic
3. Connect API
4. Submit data to API and handle success/error

## Task 2

In the README.md, you will see the original design. Using the tools and components available to you, make the app as close to the original design as possible.

![task-two-original-design](/.readme-assets/task-two-original-design.png)

### Explanation of Completion

When adding additional components I first looked at Storybook and then Chakra Docs for existing components.

1. Open Chakra docs, take a look at theming
2. Add heading
3. Update width and margin on Survey, wrap content with Panel
4. Update body background to include images & gradient
5. Typography adjustments

## Task 3

Using whichever technology you prefer, persist the submitted survey results once
they are passed to the API.

### Explanation of Completion

1. Init Mongo DB w/Nest
2. Setup Survey Schema,
3. Connect Survey Schema to AppModel & AppController

To test the persistence be sure to have mongo running locally and submit the survey. You can then view the stored data [here](http://localhost:8080/)
