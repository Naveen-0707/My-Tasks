import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import './App.css'

// These are the lists used in the application. You can move them to any component needed.

const tagsList = [
  {
    optionId: 'HEALTH',
    displayText: 'Health',
  },
  {
    optionId: 'EDUCATION',
    displayText: 'Education',
  },
  {
    optionId: 'ENTERTAINMENT',
    displayText: 'Entertainment',
  },
  {
    optionId: 'SPORTS',
    displayText: 'Sports',
  },
  {
    optionId: 'TRAVEL',
    displayText: 'Travel',
  },
  {
    optionId: 'OTHERS',
    displayText: 'Others',
  },
]

class App extends Component {
  state = {
    myTasks: [],
    input: {taskInput: '', tagOption: 'HEALTH'},
    tagSelected: '',
  }

  tagClicked = event => {
    const {tagSelected} = this.state

    if (tagSelected === event.target.value) {
      this.setState({tagSelected: ''})
    } else {
      this.setState({tagSelected: event.target.value})
    }
  }

  formSubmitted = event => {
    event.preventDefault()
    const {input} = this.state
    const {tagOption, taskInput} = input
    const newTask = {
      id: uuidv4(),
      task: taskInput,
      tag: tagOption[0] + tagOption.toLowerCase().slice(1),
    }
    this.setState(prevState => ({
      input: {taskInput: '', tagOption: 'HEALTH'},
      myTasks: [...prevState.myTasks, newTask],
    }))
  }

  tagChanged = event => {
    const {input} = this.state
    const {taskInput} = input
    const newInput = {tagOption: event.target.value, taskInput}
    this.setState({
      input: newInput,
    })
  }

  inputChanged = event => {
    const {input} = this.state
    const {tagOption} = input
    const newInput = {taskInput: event.target.value, tagOption}
    this.setState({
      input: newInput,
    })
  }

  render() {
    const {myTasks, input, tagSelected} = this.state

    let filteredTasks
    if (tagSelected === '') {
      filteredTasks = myTasks
    } else {
      filteredTasks = myTasks.filter(
        each =>
          each.tag === tagSelected[0] + tagSelected.toLowerCase().slice(1),
      )
    }

    return (
      <div className="main-cont">
        <div className="create-cont">
          <h1>Create a task!</h1>
          <form onSubmit={this.formSubmitted}>
            <div>
              <label htmlFor="taskInput">Task</label>
              <br />
              <input
                value={input.taskInput}
                onChange={this.inputChanged}
                placeholder="Enter the task here"
                id="taskInput"
                type="text"
              />
            </div>
            <br />
            <div>
              <label htmlFor="tagSelect">Tags</label>
              <br />
              <select
                value={input.tagOption}
                onChange={this.tagChanged}
                id="tagSelect"
              >
                {tagsList.map(each => (
                  <option key={each.optionId} value={each.optionId}>
                    {each.displayText}
                  </option>
                ))}
              </select>
            </div>
            <div className="btn-con">
              <button className="submit-btn" type="submit">
                Add Task
              </button>
            </div>
          </form>
        </div>
        <div className="view-cont">
          <h2>Tags</h2>
          <ul className="tag-cont">
            {tagsList.map(each => (
              <li className="tag-item" key={each.optionId}>
                <button
                  onClick={this.tagClicked}
                  className={
                    tagSelected === each.optionId
                      ? 'act-tag tag-btn'
                      : 'tag-btn'
                  }
                  value={each.optionId}
                  type="button"
                >
                  {each.displayText}
                </button>
              </li>
            ))}
          </ul>
          <h2>Tasks</h2>
          {filteredTasks.length === 0 ? (
            <div className="empty-cont">
              <p className="empty-para">No Tasks Added Yet</p>
            </div>
          ) : (
            <ul className="task-cont">
              {filteredTasks.map(each => (
                <li className="task-item" key={each.id}>
                  <p>{each.task}</p>
                  <p className="tag-para">{each.tag}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    )
  }
}

export default App
