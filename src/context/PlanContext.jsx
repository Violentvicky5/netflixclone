import { createContext, useState, useEffect } from "react";

export const PlanContext = createContext();

export const PlanProvider = ({ children }) => {
  const [selectedPlan, setSelectedPlan] = useState(() => {
    try {
      const savedPlan = localStorage.getItem("selectedPlan");
      return savedPlan ? JSON.parse(savedPlan) : null;
    } catch (error) {
      console.error("Failed to parse selectedPlan from localStorage", error);
      return null;
    }
  });

  useEffect(() => {
    try {
      if (selectedPlan) {
        localStorage.setItem("selectedPlan", JSON.stringify(selectedPlan));
      } else {
        localStorage.removeItem("selectedPlan");
      }
    } catch (error) {
      console.error("Failed to save selectedPlan to localStorage", error);
    }
  }, [selectedPlan]);

  return (
    <PlanContext.Provider value={{ selectedPlan, setSelectedPlan }}>
      {children}
    </PlanContext.Provider>
  );
};
