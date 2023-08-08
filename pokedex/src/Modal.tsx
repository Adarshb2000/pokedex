import { useEffect, useRef, ReactElement, MutableRefObject } from 'react'
import { createPortal } from 'react-dom'

const Modal = ({
  children,
  closeModal,
  className = '',
  closeWhenClickedOutside = true,
}: {
  children: ReactElement
  closeModal: { (): void }
  className?: string
  closeWhenClickedOutside?: boolean
}) => {
  const elRef: MutableRefObject<HTMLDivElement | null> = useRef(null)
  if (!elRef.current) {
    elRef.current = document.createElement('div')
    elRef.current.style.height = '100%'
  }

  useEffect(() => {
    const modalRoot = document.getElementById('modal')!
    modalRoot.appendChild(elRef.current!)
    if (closeWhenClickedOutside) {
      modalRoot.onclick = (e) => {
        if (
          !elRef.current?.children[0]?.contains(
            document.elementFromPoint(e.pageX, e.pageY)
          )
        )
          closeModal()
      }
    }
    return () => {
      modalRoot.removeChild(elRef.current!)
    }
  }, [closeModal, closeWhenClickedOutside])

  return createPortal(children, elRef.current)
}

export default Modal
