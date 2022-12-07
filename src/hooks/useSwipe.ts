import { useRef } from 'react';

export function useSwipe2() {
	const touchStart = useRef(null);
	const touchEnd = useRef(null);

	const setTouchStart = (CurrValue: any) => {
		touchStart.current = CurrValue;
	};
	const setTouchEnd = (CurrValue: any) => {
		touchEnd.current = CurrValue;
	};

	// the required distance between touchStart and touchEnd to be detected as a swipe
	const minSwipeDistance = 100;

	const onTouchStartX = (e: any) => {
		setTouchEnd(null); // otherwise the swipe is fired even with usual touch events
		setTouchStart(e.targetTouches[0].clientX);
	};

	const onTouchMoveX = (e: any) => {
    let distance = touchStart.current! - e.targetTouches[0].clientX;
		
		setTouchEnd(e.targetTouches[0].clientX)
    return distance;
	};

	const onTouchEndX = () => {
		if (!touchStart || !touchEnd) return ['0 movement', 0];
		const distance = touchStart.current! - touchEnd.current!;
		const isLeftSwipe = distance > minSwipeDistance;
		const isRightSwipe = distance < -minSwipeDistance;
    setTouchEnd(null);
		if (isLeftSwipe || isRightSwipe) {
			return isLeftSwipe ? ['left', distance] : ['right', distance];
		}
		return ['0 movement', 0];
		//
	};
	return {
		onTouchStartX,
		onTouchMoveX,
		onTouchEndX,
	};
}
