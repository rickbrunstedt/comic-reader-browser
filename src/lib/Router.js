import { h, createContext } from 'preact';
import { useState, useContext } from 'preact/hooks';

export const routerContext = createContext();
const RouterProvider = routerContext.Provider;

export function Router({ children }) {
  const [path, setPath] = useState(window.location.pathname);

  function push(path) {
    window.history.pushState(null, 'null', path);
    setPath(path);
  }

  const value = {
    path,
    push,
  };

  return <RouterProvider value={value}>{children}</RouterProvider>;
}

export function Route({ path, children }) {
  const routerCtx = useContext(routerContext);

  if (path === routerCtx.path) {
    return children;
  }

  return null;
}

export function Link({ to, children, ...restProps }) {
  const { push, path } = useContext(routerContext);

  function handleOnClick(event) {
    event.preventDefault();
    push(to);
  }

  function getAriaCurrent() {
    if (path === to) return 'page';
    return false;
  }

  return (
    <a
      href={to}
      aria-current={getAriaCurrent()}
      onClick={handleOnClick}
      {...restProps}
    >
      {children}
    </a>
  );
}
