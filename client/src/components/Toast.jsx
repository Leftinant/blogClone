import { useEffect, useState } from "react";

const Toast = ({ message, type = "success", onClose }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Animate in
    setVisible(true);

    // Animate out after 3s
    const hideTimeout = setTimeout(() => {
      setVisible(false);
      // Remove from DOM after animation
      setTimeout(onClose, 300); // match duration-300
    }, 3000);

    return () => clearTimeout(hideTimeout);
  }, []);

  return (
    <div
      className={`alert alert-${type} shadow-lg transition-all duration-300 ease-in-out
        ${visible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"}`}
    >
      <span>{message}</span>
    </div>
  );
};

export default Toast;
