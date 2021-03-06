import { text } from './text';
import { setChildren } from './setchildren';

export function mount (parent, child, before) {
  if (child == null) {
    return;
  }

  var parentEl = parent.el || parent;
  var childEl = child.el || child;

  if (child === childEl && childEl.__redom_view) {
    // try to look up the view if not provided 
    child = childEl.__redom_view;
  }

  if (childEl.nodeType) {
    if (child !== childEl) {
      childEl.__redom_view = child;
    }
    if (before) {
      parentEl.insertBefore(childEl, before.el || before);
    } else {
      parentEl.appendChild(childEl);
    }
    if (child.isMounted) {
      child.remounted && child.remounted();
    } else {
      child.isMounted = true;
      child.mounted && child.mounted();
    }
    return true;
  }
  return false;
}

export function unmount (parent, child) {
  var parentEl = parent.el || parent;
  var childEl = child.el || child;

  if (child === childEl && childEl.__redom_view) {
    // try to look up the view if not provided
    child = childEl.__redom_view;
  }

  parentEl.removeChild(childEl);

  child.isMounted = false;
  child.unmounted && child.unmounted();
}
