import { Noto_Sans_KR, Gothic_A1 } from 'next/font/google'
import localFont from 'next/font/local'

// --------------------------------------------------------------------------
// Google Fonts

// Noto Sans KR
export const notoSansKR = Noto_Sans_KR({
  subsets: ['latin'],
  variable: '--noto-sans-kr',
})

// Gothid A1
export const gothicA1 = Gothic_A1({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  variable: '--gothic-a1',
})

// --------------------------------------------------------------------------
// Local Fonts

// Pretendard Variable

export const pretendard = localFont({
  variable: '--pretendard',
  src: './PretendardVariable.woff2',
  display: 'swap',
  weight: '45 920',
})

// Spoka Han Sans

const fonts = {
  notoSansKR,
  gothicA1,
  pretendard,
}

export default fonts
