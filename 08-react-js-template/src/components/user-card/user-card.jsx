import './user-card.css'

// props 컴포넌트 속성
// - name: string
// - phoneNumber: number
// - age: number
// - address: string

export default function UserCard(props) {
  return (
    <article className="user-card" aria-labelledby={props.id}>
      <h2 id={props.id} className="user-name">
        {props.name}
      </h2>
      <dl className="user-info">
        <div>
          <dt>나이</dt>
          <dd>{props.age}</dd>
        </div>
        <div>
          <dt>전화번호</dt>
          <dd>{props.phoneNumber}</dd>
        </div>
        <div>
          <dt>주소</dt>
          <dd>{props.address}</dd>
        </div>
      </dl>
    </article>
  )
}
