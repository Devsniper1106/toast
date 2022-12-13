import React from 'react';

import styles from './VisuallyHidden.module.css';

const VisuallyHidden = ({
  children,
  className = '',
  ...delegated
}) => {
  const [forceShow, setForceShow] = React.useState(false);

  React.useEffect(() => {
    if (process.env.NODE_ENV !== 'production') {
      const handleKeyDown = (ev) => {
        if (ev.key === 'Alt') {
          setForceShow(true);
        }
      };

      const handleKeyUp = () => {
        setForceShow(false);
      };

      window.addEventListener('keydown', handleKeyDown);
      window.addEventListener('keyup', handleKeyUp);

      return () => {
        window.removeEventListener(
          'keydown',
          handleKeyDown
        );
        window.removeEventListener('keydown', handleKeyUp);
      };
    }
  }, []);

  if (forceShow) {
    return (
      <div className={styles.showWrapper}>{children}</div>
    );
  }

  return (
    <div
      className={`${className} ${styles.wrapper}`}
      {...delegated}
    >
      {children}
    </div>
  );
};

export default VisuallyHidden;
