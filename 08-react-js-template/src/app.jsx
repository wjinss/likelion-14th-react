import users from './data/user.json' // js가 아닌 모듈 불러오기(css, img, json)
import { UserCard, UserCardClass } from './components/user-card'
export default function App() {
  const userList = users.map((user) => (
    <UserCard
      key={user.id}
      id={user.id}
      name={user.name}
      age={user.age}
      phoneNumber={user.phoneNumber}
      address={user.address}
    />
  ))
  return (
    <section className="app">
      <h1>UserCard 커스텀 컴포넌트</h1>
      {userList}
    </section>
  )
}
