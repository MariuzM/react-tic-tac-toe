import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'

import './App.scss'

const Boxx = ({ onClick, value }) => {
  const useStyles = makeStyles(theme => ({
    button: {
      margin: theme.spacing(0),
      width: '100px',
      height: '100px',
      borderRadius: '0',
      outline: 'none',
      fontSize: '50px',
    },
  }))

  return (
    <Button
      className={useStyles().button}
      type="button"
      variant="contained"
      color="primary"
      onClick={onClick}
    >
      {value}
    </Button>
  )
}

Boxx.propTypes = {
  onClick: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
}

export default function App() {
  const setArray = Array(9).fill('')
  const [boxValues, setBoxValues] = useState(setArray)
  const [x, setX] = useState(true)
  const winLines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]

  const calcWinner = boxVal => {
    for (let i = 0; i < winLines.length; i += 1) {
      const [a, b, c] = winLines[i]
      if (boxVal[a] && boxVal[a] === boxVal[b] && boxVal[b] === boxVal[c])
        return boxVal[a]
    }
    for (let i = 0; i < boxVal.length; i += 1) {
      if (boxVal[i] === '') return false
    }
    return 'a DRAW'
  }

  const handleClick = e => {
    if (calcWinner(boxValues) || boxValues[e]) return
    boxValues[e] = x ? 'X' : 'O'
    setBoxValues(boxValues)
    setX(!x)
  }

  const renderSquare = i => <Boxx value={boxValues[i]} onClick={() => handleClick(i)} />

  const flexStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  }

  const useStyles = makeStyles(theme => ({
    button: {
      margin: theme.spacing(0),
      marginTop: '20px',
      borderRadius: '0',
    },
  }))

  const RenderDiv = () => {
    const renderDiv = []
    for (let i = 0; i < 3; i += 1) {
      renderDiv.push(
        <div key={i}>
          {() => {
            const renderanother = []
            for (let p = 0; p < 6; p += 1) {
              renderanother.push(
                <>
                  {renderSquare(p)}
                  {renderSquare(p)}
                  {renderSquare(p)}
                </>,
              )
            }
          }}
        </div>,
      )
    }
    return renderDiv
  }

  // const RenderInnerDiv = () => {
  //   const renderInnerDiv = []
  //   for (let p = 0; p < 6; p += 1)
  //     renderInnerDiv.push(<div key={p}>{renderSquare(p)}</div>)
  //   return renderInnerDiv
  // }

  return (
    <>
      <div style={flexStyle}>
        {calcWinner(boxValues)
          ? `Winner winner chicken dinner is ${calcWinner(boxValues)}`
          : `Player ${x ? 'X' : 'O'} your move`}
      </div>
      <br />

      {/* <RenderDiv /> */}

      <div>
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div>
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div>
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
      <div style={flexStyle}>
        <Button
          className={useStyles().button}
          variant="contained"
          color="secondary"
          onClick={() => setBoxValues(setArray)}
        >
          New Game
        </Button>
      </div>
    </>
  )
}
