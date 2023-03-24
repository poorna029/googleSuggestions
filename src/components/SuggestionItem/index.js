// Write your code here
import './index.css'

const SuggestionItem = props => {
  const {val, val1} = props
  const {id, suggestion} = val
  const f1 = e => {
    console.log(suggestion)
    val1(suggestion)
  }

  return (
    <li className="d-flex flex-row justify-content-between align-items-center s">
      <p>{suggestion}</p>
      <button type="submit" className="b" onClick={f1}>
        <img
          src="https://assets.ccbp.in/frontend/react-js/diagonal-arrow-left-up.png"
          alt="arrow"
          className="arrow"
        />
      </button>
    </li>
  )
}

export default SuggestionItem
