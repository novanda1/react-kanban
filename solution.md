## Kanban in ReactJS

In this project, I have implemented a Kanban board using the react-beautiful-dnd library. This library allows for the creation of drag-and-drop interfaces in React, and can be used to build features such as a Kanban board where users can move cards between different columns to track the progress of a task.

To provide a real-time experience, I have implemented a solution to update the data immediately when a user moves a card on the Kanban board. To do this, I loop through the items in the state and update the state when an item is moved, while simultaneously fetching the API without waiting for a response.

I have not yet implemented error handling for cases where the server response is not successful (not a 2xx status code). My plan is to show a notification to the users and disable the Kanban for interaction in these cases, as the communication between the frontend and backend is predictable when moving items between Todos. If the server response is not successful, it is likely that the error is on our end.

For state management, I initially considered using SWR as it has an option for optimistic UI when mutating the cache. However, I found that SWR did not offer good options for manipulating the current state. As a result, I am using zustand for state management to support real-time interactions.

There is currently a known bug in my code where the behavior is inconsistent when a card is moved left or right using the arrow icon in the menu. I have not yet determined the cause of this behavior, but my best guess is that the code for getting the previous (for moving left) and next (for moving right) indexes is incorrect. One potential solution I am considering is mapping the todoId to the column index and getting the index from that, for example: [todoId, columnIndex].

In conclusion, this project involves the creation of a Kanban board in ReactJS using the react-beautiful-dnd library. Real-time updates are achieved by looping through the items in the state and updating the state when an item is moved, while simultaneously fetching the API without waiting for a response. Error handling for server responses has not yet been implemented, but the plan is to show a notification to the users and disable the Kanban for interaction in these cases. State management is handled using zustand, although there is currently a known bug in the code related to inconsistent behavior when moving cards left or right using the arrow icon.
