export const userValidator = {
  type: "object",
  properties: {
    name: { type: "string" },
  },
  required: ["name"],
} as const;
