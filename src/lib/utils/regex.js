// Adapted from https://github.com/sindresorhus/matcher/blob/main/index.js
import escapeStringRegexp from 'escape-string-regexp';

const regexpCache = new Map();

function sanitizeArray(input, inputName) {
	if (!Array.isArray(input)) {
		switch (typeof input) {
			case 'string':
				input = [input];
				break;
			case 'undefined':
				input = [];
				break;
			default:
				throw new TypeError(`Expected '${inputName}' to be a string \
                or an array, but got a type of '${typeof input}'`);
		}
	}

	return input.filter((string) => {
		if (typeof string !== 'string') {
			if (typeof string === 'undefined') {
				return false;
			}

			throw new TypeError(`Expected '${inputName}' to be an array of \
            strings, but found a type of '${typeof string}' in the array`);
		}

		return true;
	});
}

function makeRegexp(pattern) {
	const cacheKey = pattern;

	if (regexpCache.has(cacheKey)) {
		return regexpCache.get(cacheKey);
	}

	pattern = escapeStringRegexp(pattern).replace(/\\\*/g, '[\\s\\S]*');

	const regexp = new RegExp(`^${pattern}$`);
	regexpCache.set(cacheKey, regexp);

	return regexp;
}

export function matchSome(input, patterns) {
	patterns = sanitizeArray(patterns, 'patterns');
	patterns = patterns.map(makeRegexp);

	for (const pattern of patterns) {
		if (pattern.test(input)) {
			return true;
		}
	}

	return false;
}
