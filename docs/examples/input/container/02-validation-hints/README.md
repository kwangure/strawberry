---
{
	"title": "Hints and validation"
}
---

`Container` simplifies displaying input hints and validating inputs. The
provided `validate` action uses the built-in input HTML
[`ValidityState` API](https://developer.mozilla.org/en-US/docs/Web/API/ValidityState),
which provides internationalized errors for dozens of languages.

Alternatively, you may use custom validation by providing an object
to {% code language="javascript" inline="true" code="validate" /%} with the
following signature:

```javascript
{
	error: (errorCode: string, input: HTMLInputElement) => string,
	invalid: (input: HTMLElement) => string
}
```

If the input satisfies the built-in validation constraints,
{% code language="javascript" inline="true" code="invalid(input)" /%} is called
and returns an error code,
then {% code language="javascript" inline="true" code="error(errorCode, input)" /%}
is called and returns a string that is the error message. If the input failed
built-in validation, only
{% code language="javascript" inline="true" code="error(input.validity.<property>, input)" /%} is called with the name of the
built-in `Validity`state property it failed. Read more about the
[`validity` state API on MDN](https://developer.mozilla.org/en-US/docs/Web/API/ValidityState)
for details about input validation.