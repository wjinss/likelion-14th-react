import { useEffect, useState } from 'react'

const ALBUM_API_URL = 'https://jsonplaceholder.typicode.com/albums'

export default function ProfileTable() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [data, setData] = useState(null)

  useEffect(() => {
    console.log('앱 렌더링')

    const abortController = new AbortController()
    const fetchOptions = { signal: abortController.signal }

    async function fetchProfile() {
      try {
        setLoading(true)
        setError(null)

        const response = await fetch(ALBUM_API_URL, fetchOptions)

        if (!response.ok && response.status === 404) {
          throw new Error('응답에 따른 데이터를 찾을 수 없습니다.')
        }

        const responseData = await response.json()
        setData(responseData)
        console.log(responseData)
      } catch (error) {
        if (error.name === 'AbortError') return
        setError(error)
      } finally {
        setLoading(false)
      }
    }
    fetchProfile()

    return () => {
      abortController.abort()
    }
  }, [])

  return (
    <table className="min-w-200 border-2 border-sky-900">
      <caption className="sr-only">사용자 프로필</caption>
      <thead>
        <tr>
          <th scope="col" className="p-1 border-1  border-sky-900 bg-sky-50">
            이름
          </th>
          <th scope="col" className="p-1 border-1  border-sky-900 bg-sky-50">
            아이디
          </th>
          <th scope="col" className="p-1 border-1  border-sky-900 bg-sky-50">
            이메일
          </th>
          <th scope="col" className="p-1 border-1  border-sky-900 bg-sky-50">
            도시
          </th>
          <th scope="col" className="p-1 border-1  border-sky-900 bg-sky-50">
            회사명
          </th>
          <th scope="col" className="p-1 border-1  border-sky-900 bg-sky-50">
            슬로건
          </th>
          <th scope="col" className="p-1 border-1  border-sky-900 bg-sky-50">
            주요사업
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td className="p-1 border-1 text-center border-sky-900">김민수</td>
          <td className="p-1 border-1 text-center border-sky-900">
            <code>minsoo.kim</code>
          </td>
          <td className="p-1 border-1 text-center border-sky-900">
            <a
              href="email:minsoo.kim@example.com"
              className="text-sky-600 hover:text-sky-700"
            >
              minsoo.kim@example.com
            </a>
          </td>
          <td className="p-1 border-1 text-center border-sky-900">서울</td>
          <td className="p-1 border-1 text-center border-sky-900">삼성전자</td>
          <td className="p-1 border-1 text-center border-sky-900">
            혁신적인 기술 선도
          </td>
          <td className="p-1 border-1 text-center border-sky-900">
            미래를 창조하다
          </td>
        </tr>
      </tbody>
    </table>
  )
}
