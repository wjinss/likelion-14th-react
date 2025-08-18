import { LOGO_COLOR, LOGO_PATH } from './constants'
import './style.css'

/**
 * Logo 컴포넌트
 * @param {Object} props
 * @param {'primary' | 'secondary'} props.type - 로고 타입
 * @param {boolean} props.outline - 로고 모양 (fill | outline)
 */
export default function Logo({ type = 'primary', outline = false }) {
  let path = ''
  let color = ''

  const isPrimary = type === 'primary'

  if (isPrimary) {
    path = !outline ? LOGO_PATH.PRIMARY : LOGO_PATH.PRIMARY_OUTLINE
    color = LOGO_COLOR.PRIMARY
  } else {
    path = !outline ? LOGO_PATH.SECONDARY : LOGO_PATH.SECONDARY_OUTLINE
    color = LOGO_COLOR.SECONDARY
  }

  const colorAttr = { [outline ? 'stroke' : 'fill']: color }

  return (
    <figure className="logo">
      <svg width={210} height={57} viewBox="0 0 210 57" fill="none">
        <path d={path} {...colorAttr} />

        {/* {React.createElement('path', {
          d: path,
          ...colorAttr,
        })} */}
      </svg>
    </figure>
  )
}
