import { useRef } from 'react';

export function useSwipe2() {
	const touchStart = useRef<null | number>(null);
	const touchEnd = useRef<null | number>(null);

	const setTouchStart = (CurrValue: number) => {
		touchStart.current = CurrValue;
	};
	const setTouchEnd = (CurrValue: number | null) => {
		touchEnd.current = CurrValue;
	};

	// the required distance between touchStart and touchEnd to be detected as a swipe
	const minSwipeDistance = 100;

	const onTouchStartX = (e: React.TouchEvent<HTMLElement>): void => {
		setTouchEnd(null); // otherwise the swipe is fired even with usual touch events
		setTouchStart(e.targetTouches[0].clientX);
	};

	const onTouchMoveX = (e: React.TouchEvent<HTMLElement>): number => {
		let distance = touchStart.current! - e.targetTouches[0].clientX;

		setTouchEnd(e.targetTouches[0].clientX);
		return distance;
	};

	const onTouchEndX = (): (string | number)[] => {
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
