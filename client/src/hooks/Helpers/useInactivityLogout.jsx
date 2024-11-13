import { useEffect, useRef } from 'react';

const useInactivityLogout = (onLogout, timeout = 300000, isActive = true) => {
  const timerRef = useRef(null);

  const resetTimer = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(onLogout, timeout);
  };

  const handleUserActivity = () => resetTimer();

  useEffect(() => {
    if(isActive) {
      resetTimer();
      window.addEventListener('mousemove', handleUserActivity);
      window.addEventListener('keydown', handleUserActivity);
    }

    return () => {
      clearTimeout(timerRef.current);
      window.removeEventListener('mousemove', handleUserActivity);
      window.removeEventListener('keydown', handleUserActivity);
    };
  }, [timeout, onLogout, isActive]);
};

export default useInactivityLogout;