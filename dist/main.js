(()=>{"use strict";var e={};(e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})})(e);var t=document.querySelector("#card-template").content,r=document.querySelector(".places__list");function n(e){e.remove()}e.default.forEach((function(e){var o=function(e,r){var n=t.querySelector(".card").cloneNode(!0),o=n.querySelector(".card__image"),c=n.querySelector(".card__delete-button"),a=n.querySelector(".card__title");return o.src=e.link,o.alt=e.name,a.textContent=e.name,c.addEventListener("click",(function(){return r(n)})),n}(e,n);r.append(o)}))})();