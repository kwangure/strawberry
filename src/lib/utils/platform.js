import { canUseDOM } from './dom.js';

/**
 * Detects Firefox browser.
 */
export function isFirefox() {
	return canUseDOM && (/firefox\//i).test(navigator.userAgent);
}
