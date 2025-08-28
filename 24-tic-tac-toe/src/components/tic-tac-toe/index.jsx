import { useState } from 'react'
import { GRID, INITIAL_SQUARES, PLAYER } from './constants'
import './style.css'

export default function TicTacToe() {
  return (
    <div className="Game">
      <Board />
      <History />
    </div>
  )
}

// --------------------------------------------------------------------------

function Board() {
  return (
    <div className="Board">
      <Status />
      <Squares />
    </div>
  )
}

function Status() {
  return (
    <h2 className="Status" role="status">
      다음 플레이어 🟨
    </h2>
  )
}

function Squares() {
  // 게임 상태 설정
  // 게임 보드를 구성하는 사각형을 관리하는 상태
  const [squares, setSquares] = useState(INITIAL_SQUARES)
  // 게임 진행하는 순서 상태
  const [gameIndex, setGameIndex] = useState(0)

  // 게임 진행되는 순서(상태)에 의존하는 데이터(상태)
  // 파생된 상태(React: derived state / Vue: computed property)
  const nextPlayer = gameIndex % 2 === 0 ? PLAYER.ONE : PLAYER.TWO

  // 부수 효과
  // - 이벤트 핸들러 (handle*)
  // - 이펙트 훅 (useEffect)
  const playGame = (squareIndex, e) => {
    // 접근성 (리액트 처리 못함)
    if (e.target.getAttribute('aria-disabled') === 'true') return

    // 사용자가 게임을 진행하면 인덱스가 변경
    const nextGameIndex = gameIndex + 1
    setGameIndex(nextGameIndex)

    // 사용자가 클릭한 사각형(인덱스)에 nextPlayer를 설정
    // ['⚫️', null, '🟨', ..., null]
    const nextSquares = squares.map((square, index) =>
      index === squareIndex ? nextPlayer : square
    )

    setSquares(nextSquares)
  }

  return (
    <div
      className="Squares"
      role="grid"
      aria-label="틱택토 게임판"
      aria-rowcount={GRID.ROWS}
      aria-colcount={GRID.COLS}
    >
      {squares.map((square, index) => {
        return (
          <SquareButton key={index} index={index} onPlay={playGame}>
            {square}
          </SquareButton>
        )
      })}
    </div>
  )
}

function SquareButton({ children, index, onPlay }) {
  const isEmpty = !children
  const isDisabled = !isEmpty
  const label = `${index + 1}번째 칸, ${isEmpty ? '비어 있음' : children}`

  return (
    <button
      role="gridcell"
      className="Square"
      aria-disabled={isDisabled}
      aria-rowindex={Math.floor(index / GRID.ROWS) + 1}
      aria-colindex={(index % GRID.COLS) + 1}
      aria-label={label}
      onClick={(e) => onPlay(index, e)}
    >
      {children}
    </button>
  )
}

// --------------------------------------------------------------------------

function History() {
  return (
    <div className="History">
      <ol className="HistoryList">
        <li className="HistoryListItem">
          <button type="button" className="HistoryButton">
            게임 시작!
          </button>
        </li>
        <li className="HistoryListItem">
          <button
            type="button"
            className="HistoryButton"
            aria-label="게임 #1 이동"
          >
            게임 #1
          </button>
        </li>
        <li className="HistoryListItem">
          <button
            type="button"
            className="HistoryButton"
            aria-label="게임 #2 이동"
            disabled
          >
            게임 #2
          </button>
        </li>
      </ol>
    </div>
  )
}
