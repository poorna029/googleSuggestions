import './index.css'
import {useState} from 'react'

import SuggestionItem from '../SuggestionItem/index'

const GoogleSuggestions = props => {
  const {suggestionsList} = props
  const [search, setSearch] = useState({
    list: suggestionsList,
    len: 0,
    suggestion: '',
  })
  const fn = e => {
    if (e.target.value.length > 0) {
      const a = suggestionsList.filter(j =>
        j.suggestion.toLowerCase().includes(e.target.value.toLowerCase()),
      )
      const sg = new Set(e.target.value.toLowerCase().split(''))

      //   const b = console.log(e.target.value.length)
      //   console.log(a)
      if (a.length < 2) {
        const obj = []
        let obj1 = []
        suggestionsList.forEach(set => {
          const sn = new Set(set.suggestion)
          const sO = new Set([...sn].filter(x => sg.has(x)))
          obj.push(sO.size)
          obj1 = [...obj]
        })
        console.log(obj.sort((first, second) => second - first))
        console.log(obj1, obj)
        const firstVal = obj[0]
        const secVal = obj[1]
        const firstValInd = obj1.indexOf(firstVal)
        const newList = []
        let secValInd = obj1.indexOf(secVal)
        newList.push(suggestionsList[firstValInd])
        if (firstValInd === secValInd) {
          console.log('same')
          for (let i = 0; i < obj.length; i += 1) {
            if (i !== firstValInd && obj1[i] !== 0) {
              secValInd = i
              break
            }
          }
        }
        newList.push(suggestionsList[secValInd])
        setSearch({list: newList, len: e.target.value.length})
      } else {
        setSearch({list: a, len: e.target.value.length})
      }

      //   console.log(suggestionsList[firstValInd], suggestionsList[secValInd])
    } else if (e.target.value.length === 0) {
      setSearch({list: [], len: 0})
    }
  }
  const bgs = search.list.length > 0 ? 'bgs' : ''

  const f2 = p => {
    setSearch({...search, suggestion: p})
  }

  return (
    <div className="d-flex flex-row align-items-start justify-content-center main bg-white ">
      <div className="d-flex flex-col justify-content-center align-items-center d ">
        <img
          src="https://assets.ccbp.in/frontend/react-js/google-logo.png"
          alt="google logo"
          className="img"
        />
        <div className="d-flex flex-col justify-content-center align-items-center new ">
          <div
            className={`d-flex flex-row justify-content-center align-items-center bg ${bgs} m-8`}
          >
            <img
              src="https://assets.ccbp.in/frontend/react-js/google-search-icon.png"
              alt="search icon"
              className="img1"
            />
            <input
              type="search"
              className="inp"
              placeholder="Search Google"
              onChange={fn}
              value={search.suggestion}
            />
          </div>
          {search.list.length > 0 ? (
            <ul className="over bg-white ">
              {search.list.map(e => (
                <SuggestionItem val={e} val1={f2} key={e.id} />
              ))}
            </ul>
          ) : null}
        </div>
      </div>
    </div>
  )
}

export default GoogleSuggestions
