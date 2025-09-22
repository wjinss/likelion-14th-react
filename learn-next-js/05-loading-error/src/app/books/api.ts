// 리액트의 use 함수 활용
// const { quotes } = use<QuoteResponse>(
//   fetch('https://dummyjson.com/quotes').then((response) => response.json())
// )

// --------------------------------------------------------------------------

// import type { QuoteResponse } from './types'

// // 데이터 가져오기 비동기 함수
// export const fetchQuotes = async (): Promise<QuoteResponse['quotes']> => {
//   // 서버 컴포넌트의 데이터 가져오기 (✅ 권장!!! 정적 렌더링 1회)
//   const response = await fetch('https://dummyjson.com/quotes')
//   const { quotes } = await response.json()

//   // await wait(2)
//   // throw new Error('도서 목록 가져오기에 실패했습니다.')

//   return quotes
// }

// --------------------------------------------------------------------------
import { wait } from '@/utils'
import type { KakaoBooksResponse } from './types'

const headersList = {
  'Content-Type': 'Application/json',
  Authorization: `KakaoAK ${process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY}`,
}

interface Options {
  query: string
}

// 데이터 가져오기 비동기 함수
export const fetchKakaoBooks = async ({
  query,
}: Options): Promise<KakaoBooksResponse> => {
  const encodedQuery = encodeURIComponent(query)

  await wait()

  const response = await fetch(
    `https://dapi.kakao.com/v3/search/book?query=${encodedQuery}`,
    {
      headers: headersList,
    }
  )

  if (!response.ok) {
    throw new Error('카카오 도서 API에서 데이터 가져오기에 실패했습니다.')
  }

  return response.json()
}
