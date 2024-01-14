// Selecting the DOM element for displaying tasks
const tasksDOM = document.querySelector('.tasks')
// Selecting the DOM element for displaying a loading message
const loadingDOM = document.querySelector('.loading-text')
// Selecting the DOM element for the task input form
const formDOM = document.querySelector('.task-form')
// Selecting the DOM element for the task input field
const taskInputDOM = document.querySelector('.task-input')
// Selecting the DOM element for displaying form alerts
const formAlertDOM = document.querySelector('.form-alert')


// Function to fetch and display tasks from the server
const showTasks = async () => {
  // Shows the loading message
  loadingDOM.style.visibility = 'visible'
  try {
    // Fetching tasks from the server
    const {
      data: { tasks },
    } = await axios.get('/api/v1/tasks')

    // Handling case where there are no tasks
    if (tasks.length < 1) {
      tasksDOM.innerHTML = '<h5 class="empty-list">No tasks in your list</h5>'
      // Hides the loading message
      loadingDOM.style.visibility = 'hidden'
      return
    }

    // Creating HTML markup for each task and joining them
    const allTasks = tasks
      .map((task) => {
        const { completed, _id: taskID, name } = task
        return `<div class="single-task ${completed && 'task-completed'}">
                  <h5><span><i class="far fa-check-circle"></i></span>${name}</h5>
                  <div class="task-links">
                    <!-- edit link -->
                    <a href="task.html?id=${taskID}"  class="edit-link">
                      <i class="fas fa-edit"></i>
                    </a>
                    <!-- delete btn -->
                    <button type="button" class="delete-btn" data-id="${taskID}">
                      <i class="fas fa-trash"></i>
                    </button>
                  </div>
                </div>
              `
      })
      .join('')
    //Inserts the HTML markup into the tasks container
    tasksDOM.innerHTML = allTasks
  } catch (error) {
    tasksDOM.innerHTML =
      '<h5 class="empty-list">There was an error, please try later....</h5>'
  }
  // Hides the loading message
  loadingDOM.style.visibility = 'hidden'
}

showTasks()


// Event listener for deleting tasks
tasksDOM.addEventListener('click', async (e) => {
  // Represents the clicked element
  const el = e.target
  if (el.parentElement.classList.contains('delete-btn')) {
    // Shows the loading message
    loadingDOM.style.visibility = 'visible'
    // Retrieves the task ID from the dataset
    const id = el.parentElement.dataset.id
    try {
      // Sends a request to delete the task
      await axios.delete(`/api/v1/tasks/${id}`)
      // Refreshes the displayed tasks
      showTasks()
    } catch (error) {
      console.log(error)
    }
  }
  // Hides the loading message
  loadingDOM.style.visibility = 'hidden'
})


// Event listener for the task input form
formDOM.addEventListener('submit', async (e) => {
  e.preventDefault()
  // Retrieves the task name from the input field
  const name = taskInputDOM.value
  try {
    // Sends a request to add a new task
    await axios.post('/api/v1/tasks', { name })
    // Refreshes the displayed tasks
    showTasks()
    // Clears the task input field
    taskInputDOM.value = ''
    // Displays the form success alert
    formAlertDOM.style.display = 'block'
    // Sets the alert message
    formAlertDOM.textContent = `success, task added`
    // Adds a style for success
    formAlertDOM.classList.add('text-success')
  } catch (error) {
    // Displays the form error alert
    formAlertDOM.style.display = 'block'
    // Sets the alert message
    formAlertDOM.innerHTML = `error, please try again`
  }
  setTimeout(() => {
    // Hides the form alert
    formAlertDOM.style.display = 'none'
    // Removes the success style
    formAlertDOM.classList.remove('text-success')
  }, 3000)
})
