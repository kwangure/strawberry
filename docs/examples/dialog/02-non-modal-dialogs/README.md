---
{
	"title": "Non-modal dialogs"
}
---

Non-modal dialogs allow users to interact with other sections of the page while
the dialog is open, by hiding the backdrop. Use Svelte's
{% code inline="true" language="javascript" code="bind:" /%} directive to get
the {% code inline="true" language="javascript" code="showModal()" /%} and
{% code inline="true" language="javascript" code="show()" /%} methods
which open the
{% code inline="true" language="html" code="<dialog/>" /%} element in modal
and non-modal modes respectively.
