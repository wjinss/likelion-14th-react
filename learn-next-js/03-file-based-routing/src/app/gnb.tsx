import { NavLink } from '../components'
import { tw } from '../utils'

export default function GNB() {
  return (
    <header className="bg-slate-900 text-white">
      <nav className="container mx-auto" aria-label="사이트 페이지 내비게이션">
        <ul className=" flex gap-x-4 p-5">
          <li>
            <NavLink href="/">홈</NavLink>
          </li>
          <li>
            <NavLink href="/auth/sign-in">로그인</NavLink>
          </li>
          <li>
            <NavLink href="/auth/sign-up" activeClassName="text-sky-500">
              회원가입
            </NavLink>
          </li>
          <li>
            <NavLink href="/books">도서 목록</NavLink>
          </li>
          <li className="relative group">
            <NavLink href="/dashboard" exact>
              {/* exact : 현재 보여지는 path가 페이지와 정확히 일치할때 보여준다~ */}
              대시보드
            </NavLink>
            <ul
              className={tw`
                  group-hover:block
                  group-focus-within:block
                  hidden
                  absolute -left-2 
                  w-[12ch]
                  space-y-2
                  px-3 pt-2 pb-3 rounded
                  bg-slate-950
                  `}
            >
              <li>
                <NavLink href="/dashboard/profile">프로필</NavLink>
              </li>
              <li>
                <NavLink href="/dashboard/settings">설정</NavLink>
              </li>
            </ul>
          </li>
        </ul>
      </nav>
    </header>
  )
}
