'use client';
import { createContext, useContext, useRef, useState, useCallback } from 'react';
import { Check } from 'lucide-react';

const ToastContext = createContext(null);

export function useToast() {
  return useContext(ToastContext);
}

export function ToastProvider({ children }) {
  const [msg, setMsg] = useState('Done');
  const [show, setShow] = useState(false);
  const timerRef = useRef(null);

  const toast = useCallback((message) => {
    setMsg(message);
    setShow(true);
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setShow(false), 2200);
  }, []);

  return (
    <ToastContext.Provider value={toast}>
      {children}
      <div className={`toast${show ? ' show' : ''}`} id="toast">
        <span className="ico sm"><Check /></span>
        <span>{msg}</span>
      </div>
    </ToastContext.Provider>
  );
}
