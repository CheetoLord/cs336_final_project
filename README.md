# cs336_final_project

# Project Design

## a. Screen Designs

### Quiz Search Screen
<img width="540" height="360" alt="search_screen" src="https://github.com/user-attachments/assets/973c2382-96c8-4f97-907d-77a4ca81716f" />

### Edit Quiz Screen
<img width="540" height="360" alt="edit_question_set" src="https://github.com/user-attachments/assets/4d35f0ce-bf81-449b-95bd-6a77f59e7d6a" />

### Testing With Quiz Screen
<img width="540" height="360" alt="testing_page" src="https://github.com/user-attachments/assets/feaae036-a1cd-49c3-9021-e9919363efd0" />

### Login Screen
<img width="540" height="360" alt="sign_in_screen" src="https://github.com/user-attachments/assets/5fe0be21-3ce5-41e4-a923-8beeb41059f2" />

## b. Components we will create
We will have need for only a few custom components:
- Quiz: Not the actual quiz dataset, but the bars on the Quiz Search Screen that display the title and details of a given quiz, and have buttons to take and edit the quiz
- Term: Again, not an actual piece of data, but rather the bars on the Edit Quiz Screen that allow for terms and their definitions to be edited and deleted
- And likely a page component for each screen (depends if we decide to use angular routing)

## c. Database Structure
We plan to use Firestore to store users' quiz data, and potentially to host. Our structure will consist of:
- User
  - Username
  - Password
  - list of owned quiz IDs
- Quiz
  - unique quiz ID
  - (maybe owner username)
  - title
  - question count
  - list of question IDs
- Question
  - unique question ID
  - term
  - definition

## d. Implementation Plan
We plan to start with the Quiz and Term custom components first, and ensure we are happy with the UI flow before moving on to implementing the adding and editing of quiz sets and the database queries. Once we have done this, then we will work on the username/password system and finally the ability to search for others' quizes. We aren't certain whether we will get to the username/password feature or the global search feature, but seeing as these are less integral to the core app functionality (and a proper username/password setup with recovery options is rather time consuming) we may omit these features.

## e. Team Member Responsibilities
Peter:
- Firebase database and hosting setup
- implementing UI and custom components

David:
- Revising UI to make it nicer
- implementing UI and custom components

