import React from 'react';
import Typed from 'typed.js';

function Type() {
  const el = React.useRef(null);

  React.useEffect(() => {
    const typed = new Typed(el.current, {
      strings: [" MITian.",
                    " Programmer.",
                    " Gamer.",
                    " Student.",
                    " Developer.",],
      typeSpeed: 50,
      backSpeed: 50,
      loop: true
    });

    return () => {
      typed.destroy();
    };
  }, []);

  return (
    <div className="type-wrap">
    <h3>
        A<span className="typed" ref={el} />
    </h3>
    </div>
  );
}

export default Type;
