import React from "react";
import { getPasswordStrength } from "@/utils/validators";

interface PasswordStrengthProps {
  password: string;
}

const PasswordStrength: React.FC<PasswordStrengthProps> = ({ password }) => {
  if (!password) return null;

  const strength = getPasswordStrength(password);

  const labels = ["Muy débil", "Débil", "Regular", "Fuerte", "Muy fuerte"];
  const colors = [
    "bg-red-500",
    "bg-orange-500",
    "bg-yellow-500",
    "bg-blue-500",
    "bg-green-500",
  ];

  return (
    <div className="mt-2">
      <div className="flex gap-1 mb-1">
        {[1, 2, 3, 4, 5].map((level) => (
          <div
            key={level}
            className={`h-2 flex-1 rounded-full transition-all duration-300 ${
              level <= strength ? colors[strength - 1] : "bg-gray-200"
            }`}
          ></div>
        ))}
      </div>
      <p className="text-sm text-gray-600">
        Fortaleza: <span className="font-semibold">{labels[strength - 1]}</span>
      </p>
    </div>
  );
};

export default PasswordStrength;
