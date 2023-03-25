// Write your code here
import './index.css'
import {Component} from 'react'
import SuggestionItem from '../SuggestionItem/index'

class GoogleSuggestions extends Component {
  constructor(props) {
    super(props)
    this.state = {list: props.suggestionsList, suggestion: ''}
  }

  fn = e => {
    console.log(e.target.value)
    if (e.target.value.length > 0) {
      const {list} = this.state
      const a = list.filter(j =>
        j.suggestion.toLowerCase().includes(e.target.value.toLowerCase()),
      )
      console.log(e.target.value.length)
      const sg = new Set(e.target.value.toLowerCase().split(''))

      if (a.length < 2) {
        const obj = []
        let obj1 = []
        list.forEach(set => {
          const sn = new Set(set.suggestion)
          const sO = new Set([...sn].filter(x => sg.has(x)))
          obj.push(sO.size)
          obj1 = [...obj]
        })
        // console.log(obj.sort((first, second) => second - first))
        // console.log(obj1, obj)
        const firstVal = obj[0]
        const secVal = obj[1]
        const firstValInd = obj1.indexOf(firstVal)
        const newList = []
        let secValInd = obj1.indexOf(secVal)
        newList.push(list[firstValInd])
        if (firstValInd === secValInd) {
          console.log('same')
          for (let i = 0; i < obj.length; i += 1) {
            if (i !== firstValInd && obj1[i] !== 0) {
              secValInd = i
              break
            }
          }
        }

        newList.push(list[secValInd])
        console.log(newList)
        this.setState({list: newList, suggestion: e.target.value})
      } else {
        this.setState({list: a, suggestion: e.target.value})
        // console.log(a)
      }
    } else if (e.target.value.length === 0) {
      const {suggestionsList} = this.props
      this.setState({list: suggestionsList, suggestion: ''})
    }
  }

  f2 = p => {
    this.setState({suggestion: p})
  }

  render() {
    const {list, suggestion} = this.state

    console.log(list)
    // this.setState({list: suggestionsList})
    // console.log(list)
    // const a = list.filter(j =>
    //   j.suggestion.toLowerCase().includes(list.toLowerCase()),
    // )
    // console.log(a)

    const b = list.length > 0 ? 'p-border' : ''
    const bor = list.length > 0 ? 'over-border' : ''

    return (
      <div className="d">
        <img
          src="https://assets.ccbp.in/frontend/react-js/google-logo.png"
          alt="google logo"
          className="img"
        />
        <div className="superClass">
          <div className={`p ${b}`}>
            <img
              src="https://assets.ccbp.in/frontend/react-js/google-search-icon.png"
              alt="search icon"
              className="img1"
            />
            <input
              type="search"
              className="inp"
              placeholder="Search Google"
              onChange={this.fn}
              value={suggestion}
            />
          </div>
          {list.length > 0 ? (
            <ul className={`over ${bor} border mt-0`}>
              {list.map(e => (
                <SuggestionItem val={e} val1={this.f2} key={e.id} />
              ))}
            </ul>
          ) : null}
        </div>
      </div>
    )
  }
}
export default GoogleSuggestions
