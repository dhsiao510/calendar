# Read Me

# To Run the App

1. First time please cd into the directory and run `npm install`
2. Upon completion, please run `npm run start`. The Calendar should be opened on browser [http://localhost:3000]
3. Per requirement, the Calendar should render the current month by default
4. The required visual indication of the current date would have a red background
5. A day with an event would have the event name shown with an orange background
6. Clicking on a day that has an event would open the EventDetail component on the right side. Selecting a day with no event would close it
7. To run the unit test suite, please first stop the app from running. Then execute `npm run test` to see the test results in the console.

# Thought Process:

After understanding the prompt and requirements, I implemented the MVP version with only the native Javascript Date prototype methods.
And to make the Calendar application more applicable/reuseable, I decided to keep all logics and states within the Calendar component itself.
The App component only passes Events to Calendar through prop.

Thinking about potential expansion on features, I refactored and incorporated the Javascript Date-fns library. It provides cleaner solutions to deal with complications like calculating the length of February of a specific year; Especially if we later want to account for time of day. Date-fns has functions can help us handle users in different timezones and events spanning multiple days.

I wrote the unit tests using Jest and React Testing Library. The current tests cover render of the Calendar component, the amount of cells of the Calendar board, the number of days and starting index of the current month, the number of mock events and the render of Event Detail component upon clicking on the first day with a mock event.

# To Dos:

UI - the current CSS is only focused on accurately displaying the Calendar, even when screen size is being changed. A lot of visual improvemnts can be applied
Clean up - some states may be consolidated and replace "any" type with actual type/custom types

Thank you for taking the time and giving me the opportunity to learn through building this exercise!

### `npm test`
