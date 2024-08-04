import { FC } from "react";

export const PasswordStrength: FC<{ strength: number }> = ({ strength }) => {
  return (
    <div className="mt-2">
      <div className="h-2 relative max-w-xl rounded-full overflow-hidden">
        <div className="w-full h-full bg-gray-200 absolute"></div>
        <div
          className={`h-full ${
            strength === 0
              ? "bg-red-500"
              : strength === 1
              ? "bg-yellow-500"
              : strength === 2
              ? "bg-yellow-500"
              : strength === 3
              ? "bg-green-500"
              : "bg-green-700"
          } absolute`}
          style={{ width: `${(strength / 4) * 100}%` }}
        ></div>
      </div>
      <p className="text-sm mt-2">
        Password strength:
        {strength === 0
          ? " Very Weak"
          : strength === 1
          ? " Weak"
          : strength === 2
          ? " Moderate"
          : strength === 3
          ? " Strong"
          : " Very Strong"}
      </p>
    </div>
  );
};
