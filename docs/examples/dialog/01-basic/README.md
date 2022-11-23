---
{
	"title": "Basic usage"
}
---

The `Dialog` component uses the built-in
{% code inline="true" language="html" code="<dialog/>" /%} element. It takes
advantage of the fact that a
{% code inline="true" language="html" code="<form method='dialog'/>" /%} element
closes its parent dialog element when the form is submitted. This
allows you to retrieve user-submitted values in response to the
{% code inline="true" language="javascript" code="close" /%} event. For example,
you may use the {% code inline="true" language="javascript" code="value" /%}
attribute of {% code inline="true" language="html" code="<button/>" /%} elements
to submit
values to the dialog.
