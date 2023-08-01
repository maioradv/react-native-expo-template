import { useRef } from 'react'

declare global {
    var swipeId: any;
}

export default function useSwipe(swipeDistance: number = 50) {
    let { current: curposX } = useRef<number>()
    let { current: curposY } = useRef<number>()
    const id = Math.random()

    const onSwipeUpRef = useRef<() => void>()
    const onSwipeDownRef = useRef<() => void>()
    const onSwipeLeftRef = useRef<() => void>()
    const onSwipeRightRef = useRef<() => void>()

    const onTouchStart = (e: any) => {
        curposY = e.nativeEvent.pageY
        curposX = e.nativeEvent.pageX
        if (!global.swipeId) global.swipeId = id
    }

    const onTouchEnd = (e: any) => {
        if (id != global.swipeId) return
        if (onSwipeUpRef.current && curposY && curposY - e.nativeEvent.pageY > swipeDistance) onSwipeUpRef.current()
        if (onSwipeDownRef.current && curposY && e.nativeEvent.pageY - curposY > swipeDistance) onSwipeDownRef.current()
        if (onSwipeLeftRef.current && curposX && curposX - e.nativeEvent.pageX > swipeDistance) onSwipeLeftRef.current()  
        if (onSwipeRightRef.current && curposX && e.nativeEvent.pageX - curposX > swipeDistance) onSwipeRightRef.current()
        delete global.swipeId
    }

    const onSwipeUp = (callback: () => void) => onSwipeUpRef.current = callback
    const onSwipeDown = (callback: () => void) => onSwipeDownRef.current = callback
    const onSwipeLeft = (callback: () => void) => onSwipeLeftRef.current = callback
    const onSwipeRight = (callback: () => void) => onSwipeRightRef.current = callback

    return { onTouchStart, onTouchEnd, onSwipeUp, onSwipeDown, onSwipeLeft, onSwipeRight }
}